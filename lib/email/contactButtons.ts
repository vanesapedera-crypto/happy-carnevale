import { escapeHtml } from "@/lib/invoice";
import { normalizePhone } from "@/lib/reviews/whatsapp";

type ContactInput = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  /** Par ko ir pieteikums, piem. "rezervāciju (Ragana, 31.10.2026.)". */
  about?: string;
};

function button(href: string, label: string, color: string): string {
  return `<a href="${escapeHtml(href)}" style="display:inline-block;margin:4px 6px 4px 0;padding:12px 20px;border-radius:999px;background:${color};color:#ffffff;font-weight:bold;font-size:15px;text-decoration:none;">${label}</a>`;
}

/**
 * Pogas paziņojuma e-pastā, lai ar klientu var uzreiz sazināties:
 * WhatsApp (ar sagatavotu ziņu), SMS, zvans un e-pasts.
 * Ja tālrunis nav derīgs, tālruņa pogas netiek rādītas.
 */
export function contactButtonsHtml({ name, phone, email, about }: ContactInput): string {
  const clientName = String(name ?? "").trim();
  const phoneText = String(phone ?? "").trim();
  const emailText = String(email ?? "").trim();
  const number = normalizePhone(phoneText);

  const greeting = clientName ? `Sveiki, ${clientName}!` : "Sveiki!";
  const message = `${greeting} Rakstām no Happy Carnevale par Jūsu ${about || "pieteikumu"}.`;

  const buttons: string[] = [];
  if (number) {
    buttons.push(button(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "WhatsApp", "#25D366"));
    buttons.push(button(`sms:+${number}?&body=${encodeURIComponent(message)}`, "SMS", "#3b82f6"));
    buttons.push(button(`tel:+${number}`, "Zvanīt", "#6b7280"));
  }
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailText)) {
    buttons.push(
      button(
        `mailto:${emailText}?subject=${encodeURIComponent("Happy Carnevale")}&body=${encodeURIComponent(message)}`,
        "E-pasts",
        "#ec4899"
      )
    );
  }
  if (buttons.length === 0) return "";

  return `
    <div style="margin:20px 0 5px;padding:16px;border-radius:16px;background:#fdf2f8;">
      <p style="margin:0 0 8px;font-weight:bold;">Sazināties ar klientu:</p>
      ${buttons.join("")}
    </div>`;
}
