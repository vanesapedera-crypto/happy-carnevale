/**
 * Publicēšana Instagram caur Instagram API (Instagram Login).
 * Vajag profesionālu (Business/Creator) kontu un Vercel mainīgos:
 *   INSTAGRAM_USER_ID       – konta ID (no Meta lietotnes iestatījumiem)
 *   INSTAGRAM_ACCESS_TOKEN  – ilgtermiņa piekļuves atslēga (derīga ~60 dienas)
 * Atslēgu serveris pats atjauno (reizi nedēļā, publicējot) un glabā tabulā site_settings,
 * tāpēc Vercel vērtība vajadzīga tikai pirmo reizi.
 */
import type { AdminConfig } from "@/lib/admin/config";
import { restSelect, restUpsert } from "@/lib/admin/supabase";

const GRAPH = "https://graph.instagram.com";
const API_VERSION = "v23.0";
const SETTINGS_TABLE = "site_settings";
const KEY_TOKEN = "instagram_access_token";
const KEY_REFRESHED = "instagram_token_refreshed_at";
const REFRESH_AFTER_MS = 7 * 24 * 60 * 60 * 1000;
const TIMEOUT_MS = 20_000;

export const CAPTION_MAX = 2200;

export class InstagramError extends Error {}

export function isInstagramConfigured(): boolean {
  return Boolean(process.env.INSTAGRAM_USER_ID?.trim() && process.env.INSTAGRAM_ACCESS_TOKEN?.trim());
}

async function readSettings(config: AdminConfig): Promise<Record<string, string>> {
  try {
    const rows = await restSelect<{ key: string; value: string }>(
      config,
      config.serviceKey,
      SETTINGS_TABLE,
      `select=key,value&key=in.(${KEY_TOKEN},${KEY_REFRESHED})`
    );
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  } catch {
    return {};
  }
}

async function saveSetting(config: AdminConfig, key: string, value: string) {
  await restUpsert(config, config.serviceKey, SETTINGS_TABLE, {
    key,
    value,
    updated_at: new Date().toISOString(),
  });
}

async function call(url: string, init?: RequestInit): Promise<Record<string, unknown>> {
  let response: Response;
  try {
    response = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch {
    throw new InstagramError("Instagram neatbildēja. Pamēģini vēlreiz.");
  }
  const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  if (!response.ok || data.error) {
    const error = (data.error ?? {}) as { message?: string; code?: number };
    if (error.code === 190) {
      throw new InstagramError(
        "Instagram piekļuves atslēga nav derīga vai beigusies. Jāiestata jauna INSTAGRAM_ACCESS_TOKEN."
      );
    }
    throw new InstagramError(`Instagram kļūda: ${error.message ?? `HTTP ${response.status}`}`);
  }
  return data;
}

/** Derīgā atslēga: no site_settings (ja atjaunota) vai no Vercel; vajadzības gadījumā atjauno. */
async function getToken(config: AdminConfig): Promise<string> {
  const settings = await readSettings(config);
  let token = settings[KEY_TOKEN] || process.env.INSTAGRAM_ACCESS_TOKEN?.trim() || "";
  if (!token) throw new InstagramError("Instagram nav pieslēgts (trūkst INSTAGRAM_ACCESS_TOKEN).");

  const refreshedAt = Date.parse(settings[KEY_REFRESHED] ?? "");
  if (!Number.isFinite(refreshedAt) || Date.now() - refreshedAt > REFRESH_AFTER_MS) {
    try {
      const data = await call(
        `${GRAPH}/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`
      );
      if (typeof data.access_token === "string" && data.access_token) {
        token = data.access_token;
        await saveSetting(config, KEY_TOKEN, token);
        await saveSetting(config, KEY_REFRESHED, new Date().toISOString());
      }
    } catch (error) {
      // Atjaunošana neizdevās: mēģinām publicēt ar esošo atslēgu.
      console.warn("[instagram] token refresh failed", error);
    }
  }
  return token;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Publicē vienu bildi. imageUrl jābūt publiski pieejamam JPEG.
 * Atgriež saiti uz ierakstu (ja Instagram to iedod).
 */
export async function publishImage(
  config: AdminConfig,
  imageUrl: string,
  caption: string
): Promise<{ id: string; permalink: string | null }> {
  const userId = process.env.INSTAGRAM_USER_ID?.trim();
  if (!userId) throw new InstagramError("Instagram nav pieslēgts (trūkst INSTAGRAM_USER_ID).");
  const token = await getToken(config);
  const base = `${GRAPH}/${API_VERSION}`;
  const auth = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

  // 1. Konteiners
  const container = await call(`${base}/${userId}/media`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ image_url: imageUrl, caption: caption.slice(0, CAPTION_MAX) }),
  });
  const containerId = String(container.id ?? "");
  if (!containerId) throw new InstagramError("Instagram neizveidoja ierakstu.");

  // 2. Gaida, kamēr Instagram apstrādā bildi
  for (let attempt = 0; attempt < 15; attempt += 1) {
    const status = await call(`${base}/${containerId}?fields=status_code`, { headers: auth });
    if (status.status_code === "FINISHED") break;
    if (status.status_code === "ERROR" || status.status_code === "EXPIRED") {
      throw new InstagramError("Instagram nepieņēma bildi (formāts vai izmēri).");
    }
    await sleep(2000);
  }

  // 3. Publicē
  const published = await call(`${base}/${userId}/media_publish`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify({ creation_id: containerId }),
  });
  const id = String(published.id ?? "");

  let permalink: string | null = null;
  try {
    const info = await call(`${base}/${id}?fields=permalink`, { headers: auth });
    permalink = typeof info.permalink === "string" ? info.permalink : null;
  } catch {
    // Nav būtiski.
  }
  return { id, permalink };
}
