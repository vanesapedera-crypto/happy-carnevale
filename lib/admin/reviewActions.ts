"use server";

import { getAdminConfig } from "./config";
import { getSession } from "./session";
import type { ActionResult } from "./types";
import { isUuid } from "./validation";
import { resendMailer, sendReviewEmail, sendReviewRequestNow } from "@/lib/reviews/send";
import {
  SETTING_REVIEW_URL,
  changeStatus,
  getReviewSettings,
  insertReviewRequest,
  isMissingTable,
  markSentViaWhatsApp,
  saveSetting,
} from "@/lib/reviews/store";
import { REVIEW_KIND_LABELS, isValidReviewUrl, type ReviewKind } from "@/lib/reviews/whatsapp";

const SESSION_EXPIRED = "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz.";
const NO_TABLE = "Datubāzē vēl nav atsauksmju tabulu. Palaid supabase/atsauksmes.sql.";
const NO_LINK = "Vispirms saglabā Google atsauksmju saiti.";
const NO_EMAIL_KEY = "E-pastu sūtīšana nav iestatīta (trūkst RESEND_API_KEY).";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function adminConfig() {
  const session = await getSession();
  const config = getAdminConfig();
  return session && config ? config : null;
}

function failure(error: unknown, fallback: string): ActionResult<never> {
  console.error("[reviews]", error);
  return { ok: false, error: isMissingTable(error) ? NO_TABLE : fallback };
}

export async function saveReviewLinkAction(url: unknown): Promise<ActionResult> {
  const config = await adminConfig();
  if (!config) return { ok: false, error: SESSION_EXPIRED };

  const value = typeof url === "string" ? url.trim() : "";
  if (value && !isValidReviewUrl(value)) {
    return { ok: false, error: "Saitei jāsākas ar https:// (iekopē to no Google uzņēmuma profila)." };
  }
  try {
    await saveSetting(config, SETTING_REVIEW_URL, value);
    return { ok: true, data: null };
  } catch (error) {
    return failure(error, "Neizdevās saglabāt saiti.");
  }
}

/** Atzīmē klientu kā "nenotika" (lūgumu nesūtīs) vai atjauno. */
export async function setRequestCancelledAction(id: unknown, cancelled: unknown): Promise<ActionResult> {
  const config = await adminConfig();
  if (!config) return { ok: false, error: SESSION_EXPIRED };
  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };
  try {
    const updated =
      cancelled === true
        ? await changeStatus(config, id, "scheduled", "cancelled")
        : await changeStatus(config, id, "cancelled", "scheduled");
    return updated ? { ok: true, data: null } : { ok: false, error: "Ieraksts jau ir mainīts. Pārlādē lapu." };
  } catch (error) {
    return failure(error, "Neizdevās saglabāt.");
  }
}

/** Nosūta atsauksmes lūgumu uz e-pastu klientam no saraksta. */
export async function sendRequestNowAction(id: unknown): Promise<ActionResult> {
  const config = await adminConfig();
  if (!config) return { ok: false, error: SESSION_EXPIRED };
  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };
  try {
    const result = await sendReviewRequestNow(config, id);
    if (result.ok) return { ok: true, data: null };
    const messages = {
      no_link: NO_LINK,
      no_email_key: NO_EMAIL_KEY,
      not_found: "Ieraksts jau ir nosūtīts vai mainīts. Pārlādē lapu.",
      error: `Neizdevās nosūtīt: ${result.error ?? "nezināma kļūda"}`,
    };
    return { ok: false, error: messages[result.reason] };
  } catch (error) {
    return failure(error, "Neizdevās nosūtīt.");
  }
}

export interface ManualReviewEmail {
  email: string;
  name: string;
  phone: string;
  kind: ReviewKind;
  service: string;
}

/** Nosūta atsauksmes lūgumu uz e-pastu klientam, kurš nav sarakstā (ievadīts ar roku). */
export async function sendManualReviewEmailAction(input: unknown): Promise<ActionResult> {
  const config = await adminConfig();
  if (!config) return { ok: false, error: SESSION_EXPIRED };

  const data = (typeof input === "object" && input !== null ? input : {}) as Partial<
    Record<keyof ManualReviewEmail, unknown>
  >;
  const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");
  const email = text(data.email, 254).toLowerCase();
  const kind = typeof data.kind === "string" && data.kind in REVIEW_KIND_LABELS ? (data.kind as ReviewKind) : null;
  if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "Pārbaudi e-pasta adresi." };
  if (!kind) return { ok: false, error: "Izvēlies, par ko sakām paldies." };
  const name = text(data.name, 120);
  const service = text(data.service, 200);

  try {
    const settings = await getReviewSettings(config);
    if (!isValidReviewUrl(settings.reviewUrl)) return { ok: false, error: NO_LINK };
    const mailer = resendMailer();
    if (!mailer) return { ok: false, error: NO_EMAIL_KEY };

    const error = await sendReviewEmail(mailer, { email, name, kind, service }, settings.reviewUrl);
    const now = new Date().toISOString();
    // Ierakstām sarakstā, lai būtu redzams, kam lūgums jau nosūtīts.
    await insertReviewRequest(config, {
      source: kind,
      name,
      email,
      phone: text(data.phone, 40),
      service,
      eventDate: null,
      status: error ? "failed" : "sent",
      channel: error ? null : "email",
      sentAt: error ? null : now,
    }).catch((caught) => console.error("[reviews] manual log failed", caught));

    return error ? { ok: false, error: `Neizdevās nosūtīt: ${error}` } : { ok: true, data: null };
  } catch (error) {
    return failure(error, "Neizdevās nosūtīt.");
  }
}

/** Pēc "WhatsApp" pogas: atzīmē, ka klientam lūgums nosūtīts. */
export async function markWhatsAppSentAction(id: unknown): Promise<ActionResult> {
  const config = await adminConfig();
  if (!config) return { ok: false, error: SESSION_EXPIRED };
  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };
  try {
    await markSentViaWhatsApp(config, id);
    return { ok: true, data: null };
  } catch (error) {
    return failure(error, "Neizdevās saglabāt.");
  }
}
