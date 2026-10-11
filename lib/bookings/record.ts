import { getAdminConfig } from "@/lib/admin/config";
import { formatDateLv } from "@/lib/date";
import { parseIsoDate } from "@/lib/reviews/record";
import { insertBooking, type BookingDetail, type NewBooking } from "./store";

type Body = Record<string, unknown>;

const MAX_VALUE = 500;

function text(value: unknown, max = 200): string {
  if (typeof value === "number") return String(value);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Tikai aizpildītie lauki. */
function details(pairs: [string, unknown][]): BookingDetail[] {
  return pairs
    .map(([label, value]) => ({ label, value: text(value, MAX_VALUE) }))
    .filter((item) => item.value !== "" && item.value !== "-");
}

const DELIVERY: Record<string, string> = {
  pickup: "Saņemšana klātienē",
  address: "Piegāde uz adresi",
  omniva: "Pakomāts",
};

const EVENT_SERVICES: Record<string, string> = {
  animators: "Animatori",
  sejinas: "Sejas apgleznošana",
  parsteigums: "Pārsteiguma tēls",
};

const EXTRAS: [string, string][] = [
  ["eksperimenti", "Eksperimenti"],
  ["slaims", "Slaimu meistarklase"],
  ["burbuli", "Milzu ziepju burbuļi"],
  ["darbnica", "Radošā darbnīca"],
  ["led", "LED Disco"],
  ["folija", "Folijas Disco"],
];

/** Kostīma rezervācija (/api/reservation). */
export function bookingFromReservation(body: Body): NewBooking {
  const delivery = DELIVERY[text(body.delivery)] ?? "";
  return {
    kind: "rezervacija",
    title: text(body.costume),
    name: text(body.name, 120),
    phone: text(body.phone, 40),
    email: text(body.email, 254),
    eventDate: parseIsoDate(body.date),
    eventTime: "",
    pickupDate: parseIsoDate(body.pickupDate),
    details: details([
      ["Kostīms", body.costume],
      ["Cena", body.price],
      ["Izmērs", body.size],
      ["Pasākuma datums", formatDateLv(body.date)],
      ["Saņemšanas datums", formatDateLv(body.pickupDate)],
      ["Saņemšanas veids", delivery],
      [text(body.delivery) === "omniva" ? "Pakomāts" : "Piegādes adrese", body.address],
      ["Komentārs", body.message],
    ]),
  };
}

/** Pasākuma pieteikums (/api/events). */
export function bookingFromEvent(body: Body): NewBooking {
  const service = EVENT_SERVICES[text(body.pakalpojums)] ?? text(body.pakalpojums);
  const extras = EXTRAS.filter(([key]) => body[key] === true).map(([, label]) => label);
  return {
    kind: "pasakums",
    title: service,
    name: text(body.vards, 120),
    phone: text(body.telefons, 40),
    email: text(body.epasts, 254),
    eventDate: parseIsoDate(body.datums),
    eventTime: text(body.laiks, 20),
    pickupDate: null,
    details: details([
      ["Pakalpojums", service],
      ["Datums", formatDateLv(body.datums)],
      ["Laiks", body.laiks],
      ["Adrese", body.adrese],
      ["Bērnu skaits", body.berni],
      ["Bērnu vecums", body.vecums],
      ["Programmas ilgums", body.ilgums],
      ["Jubilārs", body.jubilars],
      ["Jubilāra vecums", body.jubilaraVecums],
      ["Tēls", body.tels],
      ["Papildpakalpojumi", extras.join(", ")],
      ["Komentārs", body.komentars],
    ]),
  };
}

/**
 * Saglabā pieteikumu admin paneļa kalendārā.
 * Nekad nemet kļūdu: ja datubāze nav pieejama, pieteikums tik un tā ir saņemts.
 */
export async function recordBooking(booking: NewBooking): Promise<boolean> {
  try {
    const config = getAdminConfig();
    if (!config) return false;
    await insertBooking(config, booking);
    return true;
  } catch (error) {
    console.error("[bookings] record failed", error);
    return false;
  }
}
