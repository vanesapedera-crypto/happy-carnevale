import type { Booking } from "@/lib/bookings/store";

/** Viens ieraksts kalendāra dienā: pasākums vai kostīma saņemšana. */
export interface CalendarEntry {
  booking: Booking;
  type: "event" | "pickup";
  date: string;
}

/**
 * Sadala pieteikumus pa dienām. Kalendārā ir tikai kostīmu noma – katra rezervācija vienu reizi,
 * dienā, kad kostīms jāatdod klientam (saņemšanas diena; ja tās nav – pasākuma diena).
 * Pasākumu pieteikumi (animatori u.c.) kalendārā netiek rādīti.
 */
export function entriesByDate(bookings: Booking[], from: string, to: string): Map<string, CalendarEntry[]> {
  const map = new Map<string, CalendarEntry[]>();
  for (const booking of bookings) {
    if (booking.kind !== "rezervacija") continue;
    const date = booking.pickupDate ?? booking.eventDate;
    if (!date || date < from || date > to) continue;
    const list = map.get(date) ?? [];
    list.push({ booking, type: "pickup", date });
    map.set(date, list);
  }
  for (const list of map.values()) {
    list.sort((a, b) => (a.booking.eventTime || "99").localeCompare(b.booking.eventTime || "99"));
  }
  return map;
}

export function entryLabel(entry: CalendarEntry): string {
  const { booking } = entry;
  const who = booking.name ? ` – ${booking.name}` : "";
  if (entry.type === "pickup") return `${booking.title || "Kostīms"}${who}`;
  const time = booking.eventTime ? `${booking.eventTime} ` : "";
  return `${time}${booking.title || (booking.kind === "pasakums" ? "Pasākums" : "Kostīms")}${who}`;
}

export function entryColor(entry: CalendarEntry): string {
  if (entry.booking.cancelled) return "bg-slate-100 text-slate-400 line-through";
  // Ar klientu jau sazinājies – zaļš.
  if (entry.booking.contactedAt) return "bg-emerald-500 text-white";
  return entry.booking.kind === "pasakums" ? "bg-violet-500 text-white" : "bg-pink-500 text-white";
}
