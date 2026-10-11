"use server";

import { getAdminConfig } from "./config";
import { getSession } from "./session";
import type { ActionResult } from "./types";
import { isUuid } from "./validation";
import { sendReviewRequestNow } from "@/lib/reviews/send";
import {
  SETTING_REVIEW_URL,
  changeStatus,
  isMissingTable,
  markSentViaWhatsApp,
  saveSetting,
} from "@/lib/reviews/store";
import { isValidReviewUrl } from "@/lib/reviews/whatsapp";

const SESSION_EXPIRED = "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz.";
const NO_TABLE = "Datubāzē vēl nav atsauksmju tabulu. Palaid supabase/atsauksmes.sql.";
const NO_LINK = "Vispirms saglabā Google atsauksmju saiti.";
const NO_EMAIL_KEY = "E-pastu sūtīšana nav iestatīta (trūkst RESEND_API_KEY).";

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
