import { getAdminConfig } from "@/lib/admin/config";
import { insertReviewRequest, type ReviewSource } from "./store";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string {
  return String(value ?? "").trim().slice(0, max);
}

/** "2026-10-15" vai null. */
export function parseIsoDate(value: unknown): string | null {
  const text = String(value ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const date = new Date(`${text}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== text ? null : text;
}

export interface ReviewCustomer {
  source: ReviewSource;
  name: unknown;
  email: unknown;
  phone: unknown;
  service: unknown;
  eventDate?: unknown;
}

/**
 * Pievieno klientu admin paneļa sadaļai "Atsauksmes". Nekas netiek sūtīts:
 * lūgumu klientam sūta tikai tad, kad admin panelī nospiež pogu.
 * Nekad nemet kļūdu: ja datubāze nav pieejama, pieteikums tik un tā ir saņemts.
 */
export async function recordReviewRequest(customer: ReviewCustomer): Promise<boolean> {
  try {
    const config = getAdminConfig();
    const email = clean(customer.email, 254).toLowerCase();
    if (!config || !EMAIL_PATTERN.test(email)) return false;

    await insertReviewRequest(config, {
      source: customer.source,
      name: clean(customer.name, 120),
      email,
      phone: clean(customer.phone, 40),
      service: clean(customer.service, 200),
      eventDate: parseIsoDate(customer.eventDate),
    });
    return true;
  } catch (error) {
    console.error("[reviews] record failed", error);
    return false;
  }
}
