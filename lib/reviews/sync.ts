import type { AdminConfig } from "@/lib/admin/config";
import { listActiveBookings } from "@/lib/bookings/store";
import { insertReviewRequest, listRequestKeys } from "./store";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function contactKey(email: string, phone: string): string {
  const digits = phone.replace(/\D/g, "").slice(-8);
  return digits || email.trim().toLowerCase();
}

function key(email: string, phone: string, service: string, date: string | null): string {
  return [contactKey(email, phone), service.trim().toLowerCase(), date ?? ""].join("|");
}

/**
 * Atsauksmju sarakstam pievieno visus kalendāra pieteikumus, kuru tur vēl nav
 * (piem. kostīmu rezervācijas bez e-pasta vai pieteikumus no laika pirms atsauksmju sadaļas).
 * Atceltos neņem. Atgriež pievienoto skaitu.
 */
export async function syncReviewsFromBookings(config: AdminConfig): Promise<number> {
  const [bookings, existing] = await Promise.all([listActiveBookings(config), listRequestKeys(config)]);
  const known = new Set(existing.map((r) => key(r.email, r.phone, r.service, r.event_date)));

  let added = 0;
  for (const booking of bookings) {
    const email = EMAIL_PATTERN.test(booking.email.trim()) ? booking.email.trim().toLowerCase() : "";
    const phone = booking.phone.trim();
    if (!email && !phone) continue;
    // Kostīmam – diena, kad atdots klientam; pasākumam – pasākuma diena
    const date = booking.pickupDate ?? booking.eventDate;
    const k = key(email, phone, booking.title, date);
    if (known.has(k)) continue;
    known.add(k);
    await insertReviewRequest(config, {
      source: booking.kind,
      name: booking.name,
      email,
      phone,
      service: booking.title,
      eventDate: date,
      createdAt: booking.createdAt,
    });
    added++;
  }
  return added;
}
