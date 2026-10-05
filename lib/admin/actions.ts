"use server";

import { getAdminConfig, STORAGE_BUCKET } from "./config";
import { deleteItem, updateItem } from "./items";
import { revalidateSection } from "./revalidate";
import { getSection } from "./sections";
import { clearSessionCookie, getSession, setSessionCookie } from "./session";
import { passwordLogin, storageRemove } from "./supabase";
import type { ActionResult, SectionItem } from "./types";
import { isUuid, parseItemPatch } from "./validation";

const LOGIN_FAILED = "Nepareizs e-pasts vai parole.";
const SESSION_EXPIRED = "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz.";
const SAVE_FAILED = "Neizdevās saglabāt. Lūdzu, mēģini vēlreiz.";

export async function loginAction(formData: FormData): Promise<ActionResult> {
  const config = getAdminConfig();
  if (!config) {
    return { ok: false, error: "Admin panelis vēl nav iestatīts." };
  }

  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  const email = typeof emailValue === "string" ? emailValue.trim().toLowerCase() : "";
  const password = typeof passwordValue === "string" ? passwordValue : "";

  if (!email || !password || email.length > 254 || password.length > 200) {
    return { ok: false, error: LOGIN_FAILED };
  }

  // Ielogoties drīkst tikai ADMIN_EMAILS sarakstā esošie e-pasti,
  // pat ja Supabase projektā ir citi lietotāji.
  if (!config.adminEmails.includes(email)) {
    return { ok: false, error: LOGIN_FAILED };
  }

  const result = await passwordLogin(config, config.anonKey, email, password);
  if (!result.ok) {
    if (result.reason === "rate_limited") {
      return { ok: false, error: "Pārāk daudz mēģinājumu. Pamēģini pēc brīža." };
    }
    if (result.reason === "error") {
      return { ok: false, error: "Neizdevās pieslēgties. Lūdzu, mēģini vēlreiz." };
    }
    return { ok: false, error: LOGIN_FAILED };
  }
  if (result.email !== email) {
    return { ok: false, error: LOGIN_FAILED };
  }

  await setSessionCookie(email, config.sessionSecret);
  return { ok: true, data: null };
}

export async function logoutAction(): Promise<ActionResult> {
  await clearSessionCookie();
  return { ok: true, data: null };
}

export async function updateItemAction(
  id: string,
  input: unknown
): Promise<ActionResult<SectionItem>> {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) return { ok: false, error: SESSION_EXPIRED };

  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };
  const parsed = parseItemPatch(input);
  if (!parsed.ok) return { ok: false, error: parsed.error };

  try {
    const item = await updateItem(config, id, parsed.patch);
    if (!item) return { ok: false, error: "Ieraksts vairs neeksistē." };

    const section = getSection(item.sectionKey);
    if (section) revalidateSection(section);
    return { ok: true, data: item };
  } catch (error) {
    console.error("[admin] updateItem failed", error);
    return { ok: false, error: SAVE_FAILED };
  }
}

export async function deleteItemAction(id: string): Promise<ActionResult> {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) return { ok: false, error: SESSION_EXPIRED };

  if (!isUuid(id)) return { ok: false, error: "Nederīgs ieraksts." };

  try {
    const item = await deleteItem(config, id);
    if (!item) return { ok: true, data: null };

    if (item.imagePath) {
      try {
        await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [item.imagePath]);
      } catch (error) {
        // Ieraksts ir izdzēsts; fails paliek krātuvē, bet lapā vairs netiek rādīts.
        console.error("[admin] storage remove failed", error);
      }
    }

    const section = getSection(item.sectionKey);
    if (section) revalidateSection(section);
    return { ok: true, data: null };
  } catch (error) {
    console.error("[admin] deleteItem failed", error);
    return { ok: false, error: "Neizdevās izdzēst. Lūdzu, mēģini vēlreiz." };
  }
}
