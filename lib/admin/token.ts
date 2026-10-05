import { createHmac, timingSafeEqual } from "node:crypto";

/** Cik ilgi klients paliek ielogojies. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

interface SessionPayload {
  email: string;
  exp: number;
}

function sign(body: string, secret: string): string {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

/** Izveido parakstītu sesijas vērtību sīkdatnei: "<dati>.<paraksts>". */
export function createSessionToken(
  email: string,
  secret: string,
  now: number = Date.now()
): string {
  const payload: SessionPayload = {
    email,
    exp: Math.floor(now / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${body}.${sign(body, secret)}`;
}

/** Pārbauda parakstu un derīguma termiņu. Atgriež null, ja kaut kas neatbilst. */
export function verifySessionToken(
  token: string | undefined,
  secret: string,
  now: number = Date.now()
): { email: string } | null {
  if (!token) return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, signature] = parts;

  const expected = Buffer.from(sign(body, secret));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8")
    ) as Partial<SessionPayload>;
    if (typeof payload.email !== "string" || typeof payload.exp !== "number") {
      return null;
    }
    if (payload.exp * 1000 <= now) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}
