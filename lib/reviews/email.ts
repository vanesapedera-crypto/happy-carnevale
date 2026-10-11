import { SITE } from "@/lib/constants";
import { escapeHtml } from "@/lib/invoice";
import { thankYouLine, type ReviewKind } from "./whatsapp";

export const REVIEW_EMAIL_SUBJECT = "Kā Jums patika? – Happy Carnevale";

/** Automātiskā atsauksmes lūguma e-pasts. */
export function reviewEmailHtml(
  name: string,
  reviewUrl: string,
  kind: ReviewKind | null = null,
  service = ""
): string {
  const greeting = name.trim() ? `Sveiki, ${escapeHtml(name.trim())}!` : "Sveiki!";
  const url = escapeHtml(reviewUrl);
  return `
    <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#fff;border-radius:20px;border:1px solid #eee;overflow:hidden;">
      <div style="background:#ec4899;padding:25px;text-align:center;">
        <h1 style="color:#fff;margin:0;">🎭 Happy Carnevale</h1>
      </div>
      <div style="padding:35px;font-size:16px;line-height:1.6;color:#1f2937;">
        <p>${greeting}</p>
        <p>${escapeHtml(thankYouLine(kind, service))} Ceram, ka viss izdevās lieliski.</p>
        <p>Mēs būtu ļoti pateicīgi, ja atrastu minūti un uzrakstītu atsauksmi Google. Tas palīdz arī citiem atrast mūs.</p>
        <p style="text-align:center;margin:32px 0;">
          <a href="${url}" style="display:inline-block;background:#ec4899;color:#fff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:12px;">Uzrakstīt atsauksmi</a>
        </p>
        <p>Paldies!<br>Happy Carnevale komanda</p>
        <p style="margin-top:30px;color:#888;font-size:13px;">Jautājumi? Zvaniet ${escapeHtml(SITE.phone)} vai rakstiet ${escapeHtml(SITE.email)}.</p>
      </div>
    </div>`;
}
