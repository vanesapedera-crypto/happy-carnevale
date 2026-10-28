import type { Booking } from "@/lib/bookings/store";

/** Viens ieraksts kalendāra dienā: pasākums vai kostīma saņemšana. */
export interface CalendarEntry {
  booking: Booking;
  type: "event" | "pickup";
  date: string;
}

/**
 * Sadala pieteikumus pa dienām. Kostīma rezervācija kalendārā ir tikai vienu reizi –
 * dienā, kad kostīms jāatdod klientam (saņemšanas diena; ja tās nav – pasākuma diena).
 * Pasākums ir pasākuma dienā.
 */
export function entriesByDate(bookings: Booking[], from: string, to: string): Map<string, CalendarEntry[]> {
  const map = new Map<string, CalendarEntry[]>();
  const add = (entry: CalendarEntry) => {
    if (entry.date < from || entry.date > to) return;
    const list = map.get(entry.date) ?? [];
    list.push(entry);
    map.set(entry.date, list);
  };
  for (const booking of bookings) {
    if (booking.kind === "rezervacija" && booking.pickupDate) {
      add({ booking, type: "pickup", date: booking.pickupDate });
    } else if (booking.eventDate) {
      add({ booking, type: booking.kind === "rezervacija" ? "pickup" : "event", date: booking.eventDate });
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
  if (entry.type === "pickup") return `${booking.title || "Kostīms"}${who}`;
  const time = booking.eventTime ? `${booking.eventTime} ` : "";
  return `${time}${booking.title || (booking.kind === "pasakums" ? "Pasākums" : "Kostīms")}${who}`;
}

export function entryColor(entry: CalendarEntry): string {
  if (entry.booking.cancelled) return "bg-slate-100 text-slate-400 line-through";
  return entry.booking.kind === "pasakums" ? "bg-violet-500 text-white" : "bg-pink-500 text-white";
}
