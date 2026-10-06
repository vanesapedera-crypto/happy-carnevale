"use server";

import { getAdminConfig, STORAGE_BUCKET } from "./config";
import { deleteItem, listItems, setSortOrder, updateItem } from "./items";
import { planReorder } from "./reorder";
import { revalidateSection } from "./revalidate";
import { getSection } from "./sections";
import { clearSessionCookie, getSession, setSessionCookie } from "./session";
import { passwordLogin, storageRemove } from "./supabase";
import type { ActionResult, SectionItem } from "./types";
import { isUuid, parseItemPatch } from "./validation";

const LOGIN_FAILED = "Nepareizs e-pasts vai parole.";
const SESSION_EXPIRED = "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz.";
const SAVE_FAILED = "Neizdevās saglabāt. Lūdzu, mēģini vēlreiz.";
const REORDER_FAILED = "Neizdevās saglabāt secību. Lūdzu, mēģini vēlreiz.";
const MAX_REORDER_ITEMS = 2000;
const REORDER_BATCH = 6;

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const config = getAdminConfig();
  if (!config) {
    return { ok: false, error: "Admin panelis vēl nav iestatīts." };
  }

  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim().toLowerCase() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !password || email.length > 254 || password.length > 200) {
    return { ok: false, error: LOGIN_FAILED };
  }

  // Ielogoties drīkst tikai ADMIN_EMAILS sarakstā esošie e-pasti,
  // pat ja Supabase projektā ir citi lietotāji.
  if (!config.adminEmails.includes(email)) {
    console.warn("[admin] login blocked: e-pasts nav ADMIN_EMAILS sarakstā");
    return { ok: false, error: LOGIN_FAILED };
  }

  const result = await passwordLogin(config, config.anonKey, email, password);
  if (!result.ok) {
    // Iestatīšanas kļūdas rādām skaidri: tās nav atkarīgas no paroles
    // un pareizi iestatītā projektā nekad neparādās.
    const messages: Record<typeof result.reason, string> = {
      invalid: LOGIN_FAILED,
      unconfirmed:
        "Šis lietotājs Supabase nav apstiprināts. Izveido to no jauna ar atzīmi Auto Confirm User.",
      provider_disabled:
        "Supabase ir izslēgta ielogošanās ar e-pastu. Ieslēdz Email sadaļā Authentication, Sign In / Providers.",
      config:
        "Supabase noraidīja atslēgu vai adresi. Pārbaudi SUPABASE_URL un SUPABASE_ANON_KEY Vercel iestatījumos.",
      rate_limited: "Pārāk daudz mēģinājumu. Pamēģini pēc brīža.",
      error: "Neizdevās pieslēgties. Lūdzu, mēģini vēlreiz.",
    };
    return { ok: false, error: messages[result.reason] };
  }
  if (result.email !== email) {
    return { ok: false, error: LOGIN_FAILED };
  }

  await setSessionCookie(email, config.sessionSecret);
  return { ok: true, data: null };
}

export async function logoutAction(): Promise<ActionResult> {
  await clearSessionCookie();
  return { ok: true, data: null };
}

export async function updateItemAction(
  id: string,
  input: unknown
): Promise<ActionResult<SectionItem>> {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) return { ok: false, error: SESSION_EXPIRED };

  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };
  const parsed = parseItemPatch(input);
  if (!parsed.ok) return { ok: false, error: parsed.error };

  try {
    const item = await updateItem(config, id, parsed.patch);
    if (!item) return { ok: false, error: "Ieraksts vairs neeksistē." };

    const section = getSection(item.sectionKey);
    if (section) revalidateSection(section);
    return { ok: true, data: item };
  } catch (error) {
    console.error("[admin] updateItem failed", error);
    return { ok: false, error: SAVE_FAILED };
  }
}

export async function deleteItemAction(id: string): Promise<ActionResult> {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) return { ok: false, error: SESSION_EXPIRED };

  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };

  try {
    const item = await deleteItem(config, id);
    if (!item) return { ok: true, data: null };

    if (item.imagePath) {
      try {
        await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [item.imagePath]);
      } catch (error) {
        // Ieraksts ir izdzēsts; fails paliek krātuvē, bet lapā vairs netiek rādīts.
        console.error("[admin] storage remove failed", error);
      }
    }

    const section = getSection(item.sectionKey);
    if (section) revalidateSection(section);
    return { ok: true, data: null };
  } catch (error) {
    console.error("[admin] deleteItem failed", error);
    return { ok: false, error: "Neizdevās izdzēst. Lūdzu, mēģini vēlreiz." };
  }
}

/**
 * Saglabā sadaļas ierakstu secību. `orderedIds` ir visi sadaļas ieraksti
 * (arī paslēptie) tādā secībā, kādā tiem jābūt.
 */
export async function reorderItemsAction(
  sectionKey: string,
  orderedIds: unknown
): Promise<ActionResult> {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) return { ok: false, error: SESSION_EXPIRED };

  const section = getSection(typeof sectionKey === "string" ? sectionKey : null);
  if (!section) return { ok: false, error: "Nederīga sadaļa." };

  if (
    !Array.isArray(orderedIds) ||
    orderedIds.length === 0 ||
    orderedIds.length > MAX_REORDER_ITEMS ||
    !orderedIds.every(isUuid) ||
    new Set(orderedIds).size !== orderedIds.length
  ) {
    return { ok: false, error: "Nederīga secība." };
  }
  const ids: string[] = orderedIds;

  let changed = false;
  try {
    const current = await listItems(config, section.key);
    const known = new Set(current.map((item) => item.id));
    if (current.length !== ids.length || !ids.every((id) => known.has(id))) {
      // Kāds attēls pa to laiku ir pievienots vai izdzēsts.
      return { ok: false, error: "Saraksts ir mainījies. Pārlādē lapu un mēģini vēlreiz." };
    }

    const updates = planReorder(current, ids);
    for (let start = 0; start < updates.length; start += REORDER_BATCH) {
      changed = true;
      await Promise.all(
        updates
          .slice(start, start + REORDER_BATCH)
          .map((update) => setSortOrder(config, section.key, update.id, update.sortOrder))
      );
    }

    if (changed) revalidateSection(section);
    return { ok: true, data: null };
  } catch (error) {
    console.error("[admin] reorderItems failed", error);
    // Daļa izmaiņu var būt saglabāta: publiskā lapa jāatjauno jebkurā gadījumā.
    if (changed) revalidateSection(section);
    return { ok: false, error: REORDER_FAILED };
  }
}
