import type { Booking } from "./store";

/** Partneres kostīmu noma: rezervācijas, kas atnāk no viņas mājaslapas (pārsūtīti e-pasti). */
export const PARTNER_SOURCE = "kostimunoma.lv";

export function isPartnerBooking(booking: Booking): boolean {
  return booking.details.some((item) => item.label === "Avots" && item.value === PARTNER_SOURCE);
}
