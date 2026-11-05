import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminConfig, STORAGE_BUCKET } from "@/lib/admin/config";
import { getSession } from "@/lib/admin/session";
import { storagePublicUrl, storageRemove, storageUpload } from "@/lib/admin/supabase";
import type { ActionResult } from "@/lib/admin/types";
import { isSameOrigin, readUploadedImage } from "@/lib/admin/uploadRequest";
import { CAPTION_MAX, InstagramError, publishImage } from "@/lib/instagram/publish";

export const runtime = "nodejs";
export const maxDuration = 60;

type Result = ActionResult<{ permalink: string | null }>;

function respond(result: Result, status: number) {
  return NextResponse.json(result, { status });
}

/**
 * POST /api/admin/instagram
 * multipart/form-data: file (JPEG, sagatavots pārlūkā), caption
 * Bildi uz brīdi ieliek Supabase krātuvē (Instagram to paņem pēc saites), publicē un izdzēš.
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) {
    return respond({ ok: false, error: "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz." }, 401);
  }
  if (!isSameOrigin(request)) {
    return respond({ ok: false, error: "Pieprasījums nav atļauts." }, 403);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond({ ok: false, error: "Nederīgs pieprasījums." }, 400);
  }

  const image = await readUploadedImage(form);
  if (!image.ok) return respond({ ok: false, error: image.error }, image.status);
  if (image.sniffed.mime !== "image/jpeg") {
    return respond({ ok: false, error: "Instagram pieņem tikai JPG bildes." }, 415);
  }

  const captionValue = form.get("caption");
  const caption = (typeof captionValue === "string" ? captionValue : "").trim().slice(0, CAPTION_MAX);

  const path = `instagram/${randomUUID()}.jpg`;
  try {
    await storageUpload(config, config.serviceKey, STORAGE_BUCKET, path, image.buffer, "image/jpeg");
  } catch (error) {
    console.error("[instagram] temp upload failed", error);
    return respond({ ok: false, error: "Neizdevās sagatavot bildi Instagram." }, 502);
  }

  try {
    const result = await publishImage(config, storagePublicUrl(config, STORAGE_BUCKET, path), caption);
    return respond({ ok: true, data: { permalink: result.permalink } }, 201);
  } catch (error) {
    console.error("[instagram] publish failed", error);
    const message =
      error instanceof InstagramError ? error.message : "Neizdevās publicēt Instagram.";
    return respond({ ok: false, error: message }, 502);
  } finally {
    await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [path]).catch(() => {});
  }
}
