import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminConfig } from "./config";
import {
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifySessionToken,
} from "./token";

const SESSION_COOKIE = "hc_admin_session";

export interface AdminSession {
  email: string;
}

/** Pašreizējais ielogotais administrators vai null. */
export async function getSession(): Promise<AdminSession | null> {
  const config = getAdminConfig();
  if (!config) return null;

  const store = await cookies();
  const session = verifySessionToken(
    store.get(SESSION_COOKIE)?.value,
    config.sessionSecret
  );
  if (!session) return null;

  // Ja e-pasts izņemts no ADMIN_EMAILS, vecā sesija vairs neder.
  if (!config.adminEmails.includes(session.email)) return null;
  return session;
}

/** Lapām: pāradresē uz login, ja nav sesijas. */
export async function requireSession(): Promise<AdminSession> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function setSessionCookie(email: string, secret: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, createSessionToken(email, secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
