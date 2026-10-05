/** Supabase Storage "bucket", kurā glabājas augšupielādētie attēli. */
export const STORAGE_BUCKET = "section-images";

const MIN_SECRET_LENGTH = 32;

export interface PublicConfig {
  supabaseUrl: string;
  anonKey: string;
}

export interface AdminConfig extends PublicConfig {
  serviceKey: string;
  adminEmails: string[];
  sessionSecret: string;
}

function readSupabaseUrl(): string | null {
  const raw = process.env.SUPABASE_URL?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol !== "https:" && !(isLocal && url.protocol === "http:")) {
      return null;
    }
    return url.origin;
  } catch {
    return null;
  }
}

function readAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/** Publiskajai lapai pietiek ar adresi un anon atslēgu (tikai lasīšana). */
export function getPublicConfig(): PublicConfig | null {
  const supabaseUrl = readSupabaseUrl();
  const anonKey = process.env.SUPABASE_ANON_KEY?.trim();
  if (!supabaseUrl || !anonKey) return null;
  return { supabaseUrl, anonKey };
}

/** Admin panelim vajag visus mainīgos. null nozīmē, ka panelis vēl nav iestatīts. */
export function getAdminConfig(): AdminConfig | null {
  const publicConfig = getPublicConfig();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim();
  const adminEmails = readAdminEmails();

  if (
    !publicConfig ||
    !serviceKey ||
    !sessionSecret ||
    sessionSecret.length < MIN_SECRET_LENGTH ||
    adminEmails.length === 0
  ) {
    return null;
  }

  return { ...publicConfig, serviceKey, sessionSecret, adminEmails };
}

/** Trūkstošo mainīgo nosaukumi (bez vērtībām), ko parādīt iestatīšanas paziņojumā. */
export function getMissingEnv(): string[] {
  const missing: string[] = [];
  if (!readSupabaseUrl()) missing.push("SUPABASE_URL");
  if (!process.env.SUPABASE_ANON_KEY?.trim()) missing.push("SUPABASE_ANON_KEY");
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  }
  if (readAdminEmails().length === 0) missing.push("ADMIN_EMAILS");
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";
  if (secret.length < MIN_SECRET_LENGTH) {
    missing.push(`ADMIN_SESSION_SECRET (vismaz ${MIN_SECRET_LENGTH} rakstzīmes)`);
  }
  return missing;
}
