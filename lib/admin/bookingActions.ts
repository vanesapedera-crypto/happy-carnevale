"use server";

import { getAdminConfig } from "./config";
import { getSession } from "./session";
import type { ActionResult } from "./types";
import { isUuid } from "./validation";
import { describeSupabaseError } from "./supabase";
import { formatDateLv } from "@/lib/date";
import { insertBooking, setBookingCancelled, setBookingContacted } from "@/lib/bookings/store";
import { parseIsoDate, recordReviewRequest } from "@/lib/reviews/record";

/** Atzīmē pieteikumu kā atceltu (kalendārā pārsvītrots) vai atjauno. */
export async function setBookingCancelledAction(id: unknown, cancelled: unknown): Promise<ActionResult> {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) return { ok: false, error: "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz." };
  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };
  try {
    const found = await setBookingCancelled(config, id, cancelled === true);
    return found ? { ok: true, data: null } : { ok: false, error: "Ieraksts vairs neeksistē. Pārlādē lapu." };
  } catch (error) {
    console.error("[bookings] cancel failed", error);
    return { ok: false, error: "Neizdevās saglabāt." };
  }
}

/** Pieteikums, kas pievienots ar roku (piem., klients piezvanīja). */
export async function addBookingAction(input: unknown): Promise<ActionResult> {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) return { ok: false, error: "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz." };

  const data = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const text = (key: string, max: number) => (typeof data[key] === "string" ? (data[key] as string).trim().slice(0, max) : "");
  const kind = data.kind === "pasakums" ? "pasakums" : "rezervacija";
  const eventDate = parseIsoDate(data.eventDate);
  if (!eventDate) return { ok: false, error: "Norādi pasākuma datumu." };
  const pickupDate = kind === "rezervacija" ? parseIsoDate(data.pickupDate) : null;
  const eventTime = kind === "pasakums" && /^\d{2}:\d{2}$/.test(text("eventTime", 5)) ? text("eventTime", 5) : "";
  const email = text("email", 254).toLowerCase();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "Pārbaudi e-pasta adresi." };

  const title = text("title", 200);
  const pairs: [string, string][] = [
    [kind === "rezervacija" ? "Kostīms" : "Pakalpojums", title],
    ["Pasākuma datums", formatDateLv(eventDate)],
    ["Laiks", eventTime],
    ["Saņemšanas datums", pickupDate ? formatDateLv(pickupDate) : ""],
    [kind === "rezervacija" ? "Piegādes adrese / pakomāts" : "Adrese", text("address", 300)],
    ["Piezīmes", text("comment", 1000)],
    ["Avots", "Pievienots ar roku admin panelī"],
  ];

  try {
    await insertBooking(config, {
      kind,
      title,
      name: text("name", 120),
      phone: text("phone", 40),
      email,
      eventDate,
      eventTime,
      pickupDate,
      details: pairs.filter(([, value]) => value).map(([label, value]) => ({ label, value })),
    });
  } catch (error) {
    console.error("[bookings] manual add failed", error);
    return { ok: false, error: "Neizdevās saglabāt. Vai Supabase ir palaists kalendars.sql?" };
  }

  // Tāpat kā pieteikumi no mājaslapas: parādās arī atsauksmju sarakstā (ja ir e-pasts).
  if (email) {
    // Atsauksmju sarakstā parādās dienā, kad kostīms atdots (vai pasākuma dienā).
    await recordReviewRequest({
      source: kind,
      name: data.name,
      email,
      phone: data.phone,
      service: title,
      eventDate: pickupDate ?? eventDate,
    });
  }
  return { ok: true, data: null };
}

/** Atzīmē, ka ar klientu jau sazinājies (vai noņem atzīmi). */
export async function setBookingContactedAction(id: unknown, contacted: unknown): Promise<ActionResult> {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) return { ok: false, error: "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz." };
  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };
  try {
    const found = await setBookingContacted(config, id, contacted === true);
    return found ? { ok: true, data: null } : { ok: false, error: "Ieraksts vairs neeksistē. Pārlādē lapu." };
  } catch (error) {
    console.error("[bookings] contacted failed", error);
    const message = describeSupabaseError(error);
    return {
      ok: false,
      error: /contacted_at/.test(message)
        ? "Datubāzē vēl nav kolonnas atzīmei. Supabase SQL Editor palaid failu supabase/sazinajos.sql."
        : "Neizdevās saglabāt.",
    };
  }
}
