"use server";

import { getAdminConfig } from "./config";
import { getSession } from "./session";
import type { ActionResult } from "./types";
import { isUuid } from "./validation";
import { setBookingCancelled } from "@/lib/bookings/store";

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
