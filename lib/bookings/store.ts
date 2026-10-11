import type { AdminConfig } from "@/lib/admin/config";
import { restInsert, restSelect, restUpdate } from "@/lib/admin/supabase";

export const BOOKINGS_TABLE = "bookings";

export type BookingKind = "rezervacija" | "pasakums";

export interface BookingDetail {
  label: string;
  value: string;
}

export interface Booking {
  id: string;
  kind: BookingKind;
  title: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string | null;
  eventTime: string;
  pickupDate: string | null;
  details: BookingDetail[];
  cancelled: boolean;
  createdAt: string;
}

interface BookingRow {
  id: string;
  kind: BookingKind;
  title: string;
  name: string;
  phone: string;
  email: string;
  event_date: string | null;
  event_time: string;
  pickup_date: string | null;
  details: unknown;
  cancelled: boolean;
  created_at: string;
}

function rowToBooking(row: BookingRow): Booking {
  const details = Array.isArray(row.details)
    ? row.details.filter(
        (item): item is BookingDetail =>
          typeof item === "object" &&
          item !== null &&
          typeof (item as BookingDetail).label === "string" &&
          typeof (item as BookingDetail).value === "string"
      )
    : [];
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    name: row.name,
    phone: row.phone,
    email: row.email,
    eventDate: row.event_date,
    eventTime: row.event_time ?? "",
    pickupDate: row.pickup_date,
    details,
    cancelled: row.cancelled,
    createdAt: row.created_at,
  };
}

export interface NewBooking {
  kind: BookingKind;
  title: string;
  name: string;
  phone: string;
  email: string;
  eventDate: string | null;
  eventTime: string;
  pickupDate: string | null;
  details: BookingDetail[];
}

export async function insertBooking(config: AdminConfig, booking: NewBooking): Promise<void> {
  await restInsert(config, config.serviceKey, BOOKINGS_TABLE, {
    kind: booking.kind,
    title: booking.title,
    name: booking.name,
    phone: booking.phone,
    email: booking.email,
    event_date: booking.eventDate,
    event_time: booking.eventTime,
    pickup_date: booking.pickupDate,
    details: booking.details,
  });
}

/** Pieteikumi, kuru pasākuma vai saņemšanas datums ir no `from` līdz `to` (ieskaitot). */
export async function listBookingsInRange(
  config: AdminConfig,
  from: string,
  to: string
): Promise<Booking[]> {
  const range = (column: string) => `and(${column}.gte.${from},${column}.lte.${to})`;
  const rows = await restSelect<BookingRow>(
    config,
    config.serviceKey,
    BOOKINGS_TABLE,
    `select=*&or=(${range("event_date")},${range("pickup_date")})&order=event_date.asc,event_time.asc&limit=1000`
  );
  return rows.map(rowToBooking);
}

export async function setBookingCancelled(
  config: AdminConfig,
  id: string,
  cancelled: boolean
): Promise<boolean> {
  const row = await restUpdate<BookingRow>(
    config,
    config.serviceKey,
    BOOKINGS_TABLE,
    `id=eq.${encodeURIComponent(id)}`,
    { cancelled }
  );
  return row !== null;
}
