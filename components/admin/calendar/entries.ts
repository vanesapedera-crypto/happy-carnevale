import type { Booking } from "@/lib/bookings/store";

/** Viens ieraksts kalendāra dienā: pasākums vai kostīma saņemšana. */
export interface CalendarEntry {
  booking: Booking;
  type: "event" | "pickup";
  date: string;
}

/** Sadala pieteikumus pa dienām. Kostīma rezervācijai ir arī saņemšanas diena. */
export function entriesByDate(bookings: Booking[], from: string, to: string): Map<string, CalendarEntry[]> {
  const map = new Map<string, CalendarEntry[]>();
  const add = (entry: CalendarEntry) => {
    if (entry.date < from || entry.date > to) return;
    const list = map.get(entry.date) ?? [];
    list.push(entry);
    map.set(entry.date, list);
  };
  for (const booking of bookings) {
    if (booking.eventDate) add({ booking, type: "event", date: booking.eventDate });
    if (booking.pickupDate && booking.pickupDate !== booking.eventDate) {
      add({ booking, type: "pickup", date: booking.pickupDate });
    }
  }
  for (const list of map.values()) {
    list.sort((a, b) => (a.booking.eventTime || "99").localeCompare(b.booking.eventTime || "99"));
  }
  return map;
}

export function entryLabel(entry: CalendarEntry): string {
  const { booking } = entry;
  const who = booking.name ? ` – ${booking.name}` : "";
  if (entry.type === "pickup") return `Saņem: ${booking.title || "kostīms"}${who}`;
  const time = booking.eventTime ? `${booking.eventTime} ` : "";
  return `${time}${booking.title || (booking.kind === "pasakums" ? "Pasākums" : "Kostīms")}${who}`;
}

export function entryColor(entry: CalendarEntry): string {
  if (entry.booking.cancelled) return "bg-slate-100 text-slate-400 line-through";
  if (entry.type === "pickup") return "bg-amber-50 text-amber-800";
  return entry.booking.kind === "pasakums" ? "bg-violet-100 text-violet-800" : "bg-pink-100 text-pink-800";
}
