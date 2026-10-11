import type { AdminConfig } from "@/lib/admin/config";
import {
  SupabaseError,
  restInsert,
  restSelect,
  restUpdate,
  restUpsert,
} from "@/lib/admin/supabase";
import type { ReviewKind } from "./whatsapp";

export const SETTINGS_TABLE = "site_settings";
export const REQUESTS_TABLE = "review_requests";

export const SETTING_REVIEW_URL = "google_review_url";

export type ReviewSource = ReviewKind;
export type ReviewStatus = "scheduled" | "sending" | "sent" | "cancelled" | "failed";
export type ReviewChannel = "email" | "whatsapp";

export interface ReviewSettings {
  reviewUrl: string;
}

export interface ReviewRequest {
  id: string;
  source: ReviewSource;
  name: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string | null;
  sendAt: string;
  status: ReviewStatus;
  channel: ReviewChannel | null;
  sentAt: string | null;
  error: string | null;
  createdAt: string;
}

interface ReviewRequestRow {
  id: string;
  source: ReviewSource;
  name: string;
  email: string;
  phone: string;
  service: string;
  event_date: string | null;
  send_at: string;
  status: ReviewStatus;
  channel: ReviewChannel | null;
  sent_at: string | null;
  error: string | null;
  created_at: string;
}

function rowToRequest(row: ReviewRequestRow): ReviewRequest {
  return {
    id: row.id,
    source: row.source,
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    eventDate: row.event_date,
    sendAt: row.send_at,
    status: row.status,
    channel: row.channel ?? null,
    sentAt: row.sent_at,
    error: row.error,
    createdAt: row.created_at,
  };
}

/** true, ja Supabase atbild, ka tabula neeksistē (SQL vēl nav palaists). */
export function isMissingTable(error: unknown): boolean {
  return (
    error instanceof SupabaseError &&
    (error.status === 404 || /PGRST205|does not exist|schema cache/i.test(error.message))
  );
}

export async function getReviewSettings(config: AdminConfig): Promise<ReviewSettings> {
  const rows = await restSelect<{ key: string; value: string }>(
    config,
    config.serviceKey,
    SETTINGS_TABLE,
    `select=key,value&key=eq.${SETTING_REVIEW_URL}`
  );
  return { reviewUrl: rows.find((row) => row.key === SETTING_REVIEW_URL)?.value ?? "" };
}

export async function saveSetting(config: AdminConfig, key: string, value: string): Promise<void> {
  await restUpsert(config, config.serviceKey, SETTINGS_TABLE, {
    key,
    value,
    updated_at: new Date().toISOString(),
  });
}

export interface NewReviewRequest {
  source: ReviewSource;
  name: string;
  email: string;
  phone: string;
  service: string;
  eventDate: string | null;
  /** Ar roku ievadītiem klientiem: uzreiz "sent" vai "failed". */
  status?: ReviewStatus;
  channel?: ReviewChannel | null;
  sentAt?: string | null;
}

export async function insertReviewRequest(
  config: AdminConfig,
  request: NewReviewRequest
): Promise<void> {
  await restInsert(config, config.serviceKey, REQUESTS_TABLE, {
    source: request.source,
    name: request.name,
    email: request.email,
    phone: request.phone,
    service: request.service,
    event_date: request.eventDate,
    ...(request.status ? { status: request.status } : {}),
    ...(request.channel ? { channel: request.channel } : {}),
    ...(request.sentAt ? { sent_at: request.sentAt } : {}),
  });
}

/** Paņem vienu ierakstu sūtīšanai ar roku (no ieplānotiem, atceltiem vai neizdevušamies). */
export async function claimOne(config: AdminConfig, id: string): Promise<ReviewRequest | null> {
  const row = await restUpdate<ReviewRequestRow>(
    config,
    config.serviceKey,
    REQUESTS_TABLE,
    `id=eq.${encodeURIComponent(id)}&status=in.(scheduled,cancelled,failed)`,
    { status: "sending" }
  );
  return row ? rowToRequest(row) : null;
}

/** Klienti, kuriem lūgums vēl nav nosūtīts (jaunākie augšā), un vēsture. */
export async function listReviewRequests(
  config: AdminConfig
): Promise<{ pending: ReviewRequest[]; done: ReviewRequest[] }> {
  const [pending, done] = await Promise.all([
    restSelect<ReviewRequestRow>(
      config,
      config.serviceKey,
      REQUESTS_TABLE,
      "select=*&status=in.(scheduled,sending,failed)&order=created_at.desc&limit=300"
    ),
    restSelect<ReviewRequestRow>(
      config,
      config.serviceKey,
      REQUESTS_TABLE,
      "select=*&status=in.(sent,cancelled)&order=created_at.desc&limit=100"
    ),
  ]);
  return { pending: pending.map(rowToRequest), done: done.map(rowToRequest) };
}

/** Maina statusu tikai tad, ja pašreizējais ir `from`. Atgriež atjaunoto ierakstu vai null. */
export async function changeStatus(
  config: AdminConfig,
  id: string,
  from: ReviewStatus,
  to: ReviewStatus,
  extra: Record<string, unknown> = {}
): Promise<ReviewRequest | null> {
  const row = await restUpdate<ReviewRequestRow>(
    config,
    config.serviceKey,
    REQUESTS_TABLE,
    `id=eq.${encodeURIComponent(id)}&status=eq.${from}`,
    { status: to, ...extra }
  );
  return row ? rowToRequest(row) : null;
}

/** Atzīmē, ka lūgums nosūtīts caur WhatsApp (poga atver WhatsApp ar gatavu ziņu). */
export async function markSentViaWhatsApp(config: AdminConfig, id: string): Promise<ReviewRequest | null> {
  const row = await restUpdate<ReviewRequestRow>(
    config,
    config.serviceKey,
    REQUESTS_TABLE,
    `id=eq.${encodeURIComponent(id)}&status=in.(scheduled,cancelled,failed)`,
    { status: "sent", channel: "whatsapp", sent_at: new Date().toISOString(), error: null }
  );
  return row ? rowToRequest(row) : null;
}
