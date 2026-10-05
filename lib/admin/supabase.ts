/**
 * Plāns Supabase REST API ietvars ar parasto fetch.
 * Apzināti bez @supabase/supabase-js, lai projektam nav jāinstalē jaunas pakotnes.
 * Visi izsaukumi notiek tikai serverī.
 */

const TIMEOUT_MS = 20_000;

export interface Connection {
  supabaseUrl: string;
}

export class SupabaseError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "SupabaseError";
    this.status = status;
  }
}

function authHeaders(key: string): Record<string, string> {
  return { apikey: key, Authorization: `Bearer ${key}` };
}

async function send(url: string, init: RequestInit): Promise<Response> {
  return fetch(url, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
}

async function readErrorMessage(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as Record<string, unknown>;
    const message =
      data.message ?? data.msg ?? data.error_description ?? data.error;
    if (typeof message === "string" && message) return message;
  } catch {
    // Atbilde nav JSON.
  }
  return response.statusText || `HTTP ${response.status}`;
}

async function ensureOk(response: Response): Promise<Response> {
  if (!response.ok) {
    throw new SupabaseError(response.status, await readErrorMessage(response));
  }
  return response;
}

/* ============================== Auth ============================== */

export type LoginResult =
  | { ok: true; email: string }
  | { ok: false; reason: "invalid" | "rate_limited" | "error" };

/** Pārbauda e-pastu un paroli pret Supabase Auth. */
export async function passwordLogin(
  conn: Connection,
  anonKey: string,
  email: string,
  password: string
): Promise<LoginResult> {
  let response: Response;
  try {
    response = await send(`${conn.supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: { ...authHeaders(anonKey), "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    return { ok: false, reason: "error" };
  }

  if (response.status === 429) return { ok: false, reason: "rate_limited" };
  if (response.status === 400 || response.status === 401 || response.status === 422) {
    return { ok: false, reason: "invalid" };
  }
  if (!response.ok) return { ok: false, reason: "error" };

  try {
    const data = (await response.json()) as { user?: { email?: unknown } };
    const userEmail = data.user?.email;
    if (typeof userEmail !== "string" || !userEmail) {
      return { ok: false, reason: "error" };
    }
    return { ok: true, email: userEmail.toLowerCase() };
  } catch {
    return { ok: false, reason: "error" };
  }
}

/* ============================ Datubāze ============================ */

const JSON_RETURN_HEADERS = {
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

function tableUrl(conn: Connection, table: string, query: string): string {
  return `${conn.supabaseUrl}/rest/v1/${table}${query ? `?${query}` : ""}`;
}

export async function restSelect<T>(
  conn: Connection,
  key: string,
  table: string,
  query: string
): Promise<T[]> {
  const response = await ensureOk(
    await send(tableUrl(conn, table, query), { headers: authHeaders(key) })
  );
  return (await response.json()) as T[];
}

export async function restInsert<T>(
  conn: Connection,
  key: string,
  table: string,
  row: Record<string, unknown>
): Promise<T> {
  const response = await ensureOk(
    await send(tableUrl(conn, table, ""), {
      method: "POST",
      headers: { ...authHeaders(key), ...JSON_RETURN_HEADERS },
      body: JSON.stringify(row),
    })
  );
  const rows = (await response.json()) as T[];
  if (!rows[0]) throw new SupabaseError(500, "Ieraksts netika izveidots.");
  return rows[0];
}

/** Atgriež mainīto rindu vai null, ja filtram neatbilst neviena rinda. */
export async function restUpdate<T>(
  conn: Connection,
  key: string,
  table: string,
  filter: string,
  patch: Record<string, unknown>
): Promise<T | null> {
  const response = await ensureOk(
    await send(tableUrl(conn, table, filter), {
      method: "PATCH",
      headers: { ...authHeaders(key), ...JSON_RETURN_HEADERS },
      body: JSON.stringify(patch),
    })
  );
  const rows = (await response.json()) as T[];
  return rows[0] ?? null;
}

/** Atgriež izdzēsto rindu vai null, ja tādas nebija. */
export async function restDelete<T>(
  conn: Connection,
  key: string,
  table: string,
  filter: string
): Promise<T | null> {
  const response = await ensureOk(
    await send(tableUrl(conn, table, filter), {
      method: "DELETE",
      headers: { ...authHeaders(key), Prefer: "return=representation" },
    })
  );
  const rows = (await response.json()) as T[];
  return rows[0] ?? null;
}

/* ============================ Storage ============================= */

function encodePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

export function storagePublicUrl(conn: Connection, bucket: string, path: string): string {
  return `${conn.supabaseUrl}/storage/v1/object/public/${bucket}/${encodePath(path)}`;
}

export async function storageUpload(
  conn: Connection,
  key: string,
  bucket: string,
  path: string,
  body: ArrayBuffer,
  contentType: string
): Promise<void> {
  await ensureOk(
    await send(`${conn.supabaseUrl}/storage/v1/object/${bucket}/${encodePath(path)}`, {
      method: "POST",
      headers: {
        ...authHeaders(key),
        "Content-Type": contentType,
        "Cache-Control": "max-age=31536000",
        "x-upsert": "false",
      },
      body,
    })
  );
}

export async function storageRemove(
  conn: Connection,
  key: string,
  bucket: string,
  paths: string[]
): Promise<void> {
  if (paths.length === 0) return;
  await ensureOk(
    await send(`${conn.supabaseUrl}/storage/v1/object/${bucket}`, {
      method: "DELETE",
      headers: { ...authHeaders(key), "Content-Type": "application/json" },
      body: JSON.stringify({ prefixes: paths }),
    })
  );
}
