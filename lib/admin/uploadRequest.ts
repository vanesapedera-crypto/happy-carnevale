import type { NextRequest } from "next/server";
import { MAX_UPLOAD_BYTES, sniffImageType, type SniffedImage } from "./validation";

/** Pieprasījumam jānāk no šīs pašas mājaslapas. */
export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  return [request.headers.get("x-forwarded-host"), request.headers.get("host")].includes(
    originHost
  );
}

export type UploadedImage =
  | { ok: true; file: File; buffer: ArrayBuffer; sniffed: SniffedImage }
  | { ok: false; error: string; status: number };

/** Nolasa un pārbauda formas lauku "file": izmērs un attēla veids pēc faila satura. */
export async function readUploadedImage(form: FormData): Promise<UploadedImage> {
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Nav izvēlēts attēls.", status: 400 };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Attēls ir par lielu (līdz 4 MB).", status: 413 };
  }

  const buffer = await file.arrayBuffer();
  const sniffed = sniffImageType(new Uint8Array(buffer, 0, Math.min(16, buffer.byteLength)));
  if (!sniffed) {
    return { ok: false, error: "Atļauti tikai JPG, PNG vai WebP attēli.", status: 415 };
  }
  return { ok: true, file, buffer, sniffed };
}
