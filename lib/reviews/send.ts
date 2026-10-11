import { Resend } from "resend";
import type { AdminConfig } from "@/lib/admin/config";
import { SITE } from "@/lib/constants";
import { REVIEW_EMAIL_SUBJECT, reviewEmailHtml } from "./email";
import { changeStatus, claimOne, getReviewSettings } from "./store";
import { isValidReviewUrl, type ReviewKind } from "./whatsapp";

export type Mailer = (to: string, subject: string, html: string) => Promise<string | null>;

export function resendMailer(): Mailer | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  const resend = new Resend(key);
  return async (to, subject, html) => {
    const { error } = await resend.emails.send({
      from: "Happy Carnevale <noreply@happycarnevale.lv>",
      to,
      replyTo: SITE.email,
      subject,
      html,
    });
    return error ? error.message || "Resend kļūda" : null;
  };
}

/** Nosūta vienu e-pastu. Atgriež kļūdas tekstu vai null. */
export async function sendReviewEmail(
  mailer: Mailer,
  to: { email: string; name: string; kind: ReviewKind | null; service: string },
  reviewUrl: string
): Promise<string | null> {
  try {
    return await mailer(to.email, REVIEW_EMAIL_SUBJECT, reviewEmailHtml(to.name, reviewUrl, to.kind, to.service));
  } catch (caught) {
    return caught instanceof Error ? caught.message : "Nezināma kļūda";
  }
}

export type SendOneResult =
  | { ok: true }
  | { ok: false; reason: "no_link" | "no_email_key" | "not_found" | "error"; error?: string };

/** Nosūta atsauksmes lūgumu vienam klientam no saraksta (poga admin panelī). */
export async function sendReviewRequestNow(
  config: AdminConfig,
  id: string,
  options: { mailer?: Mailer | null; now?: Date } = {}
): Promise<SendOneResult> {
  const { reviewUrl } = await getReviewSettings(config);
  if (!isValidReviewUrl(reviewUrl)) return { ok: false, reason: "no_link" };
  const mailer = options.mailer === undefined ? resendMailer() : options.mailer;
  if (!mailer) return { ok: false, reason: "no_email_key" };

  const request = await claimOne(config, id);
  if (!request) return { ok: false, reason: "not_found" };

  const error = await sendReviewEmail(
    mailer,
    { email: request.email, name: request.name, kind: request.source, service: request.service },
    reviewUrl
  );
  if (error) {
    await changeStatus(config, request.id, "sending", "failed", { error: error.slice(0, 300) });
    return { ok: false, reason: "error", error };
  }
  await changeStatus(config, request.id, "sending", "sent", {
    channel: "email",
    sent_at: (options.now ?? new Date()).toISOString(),
    error: null,
  });
  return { ok: true };
}
