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
  // Otrais teikums atkarībā no tā, ko klients izmantoja.
  const hope =
    kind === "rezervacija"
      ? "Ceram, ka kostīms lieliski papildināja Jūsu pasākumu."
      : kind === "veikals"
      ? "Ceram, ka ar pirkumu esat apmierināti."
      : kind === "pasakums" && service.trim() === "Animatori"
      ? "Ceram, ka pasākums izdevās lieliski un mūsu animatori palīdzēja radīt neaizmirstamus mirkļus."
      : kind === "pasakums"
      ? "Ceram, ka pasākums izdevās lieliski."
      : "Ceram, ka viss izdevās lieliski.";
  return `
    <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#fff;border-radius:20px;border:1px solid #eee;overflow:hidden;">
      <div style="background:#fff;padding:28px 25px 22px;text-align:center;border-bottom:4px solid #ec4899;">
        <img src="${SITE.url}/images/logo-email.png" width="200" alt="Happy Carnevale" style="display:inline-block;width:200px;max-width:60%;height:auto;border:0;" />
      </div>
      <div style="padding:35px;font-size:16px;line-height:1.6;color:#1f2937;">
        <p>${greeting}</p>
        <p>${escapeHtml(thankYouLine(kind, service))} ${hope}</p>
        <p>Ja atradīsiet minūti, lai atstātu atsauksmi Google, mēs būsim no sirds pateicīgi. Jūsu atsauksme mums ir ļoti svarīgs atbalsts un palīdz arī citiem klientiem atrast mūs.</p>
        <p style="text-align:center;margin:32px 0;">
          <a href="${url}" style="display:inline-block;background:#ec4899;color:#fff;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:12px;">Uzrakstīt atsauksmi</a>
        </p>
        <p>Paldies!</p>
        <p>Ar cieņu,<br>Happy Carnevale komanda</p>
        <p style="margin-top:30px;color:#888;font-size:13px;">Jautājumi? Zvaniet pa tālruni ${escapeHtml(SITE.phone)} vai rakstiet uz <a href="mailto:${escapeHtml(SITE.email)}" style="color:#ec4899;">${escapeHtml(SITE.email)}</a>.</p>
      </div>
    </div>`;
}
