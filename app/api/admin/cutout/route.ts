import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminConfig, STORAGE_BUCKET } from "@/lib/admin/config";
import { getItem, setCutout } from "@/lib/admin/items";
import { revalidateSection } from "@/lib/admin/revalidate";
import { getSection } from "@/lib/admin/sections";
import { getSession } from "@/lib/admin/session";
import {
  describeSupabaseError,
  storagePublicUrl,
  storageRemove,
  storageUpload,
} from "@/lib/admin/supabase";
import type { ActionResult, SectionItem } from "@/lib/admin/types";
import { isSameOrigin, readUploadedImage } from "@/lib/admin/uploadRequest";
import { isUuid } from "@/lib/admin/validation";

export const runtime = "nodejs";

function respond(result: ActionResult<SectionItem>, status: number) {
  return NextResponse.json(result, { status });
}

/**
 * POST /api/admin/cutout
 * multipart/form-data: id, source (bildes adrese, no kuras izgriezts), file
 * Saglabā kostīma bildi bez fona. Iepriekšējais izgriezums tiek izdzēsts.
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

  const id = form.get("id");
  const source = form.get("source");
  if (!isUuid(id) || typeof source !== "string") {
    return respond({ ok: false, error: "Nederīgs ieraksts." }, 400);
  }

  const image = await readUploadedImage(form);
  if (!image.ok) return respond({ ok: false, error: image.error }, image.status);

  let existing: SectionItem | null;
  try {
    existing = await getItem(config, id);
  } catch (error) {
    return respond(
      { ok: false, error: `Neizdevās nolasīt ierakstu. ${describeSupabaseError(error)}` },
      502
    );
  }
  if (!existing) return respond({ ok: false, error: "Ieraksts vairs neeksistē." }, 404);
  // Bilde pa to laiku nomainīta – šis izgriezums vairs neder
  if (existing.imageUrl !== source) {
    return respond({ ok: false, error: "Bilde ir nomainīta. Pārlādē lapu." }, 409);
  }
  const section = getSection(existing.sectionKey);
  if (!section) return respond({ ok: false, error: "Nezināma sadaļa." }, 400);

  const path = `${section.key}/bez-fona/${randomUUID()}.${image.sniffed.ext}`;
  try {
    await storageUpload(config, config.serviceKey, STORAGE_BUCKET, path, image.buffer, image.sniffed.mime);
  } catch (error) {
    return respond(
      { ok: false, error: `Neizdevās augšupielādēt. ${describeSupabaseError(error)}` },
      502
    );
  }

  let updated: SectionItem | null;
  try {
    updated = await setCutout(config, id, {
      url: storagePublicUrl(config, STORAGE_BUCKET, path),
      path,
      source,
    });
  } catch (error) {
    await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [path]).catch(() => {});
    const text = describeSupabaseError(error);
    const missing = /cutout/i.test(text) && /column/i.test(text);
    return respond(
      {
        ok: false,
        error: missing
          ? "Datubāzē vēl nav vietas bildēm bez fona – Supabase jāpalaiž supabase/izgriezumi.sql."
          : `Neizdevās saglabāt. ${text}`,
      },
      missing ? 409 : 502
    );
  }
  if (!updated) {
    await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [path]).catch(() => {});
    return respond({ ok: false, error: "Ieraksts vairs neeksistē." }, 404);
  }

  if (existing.cutout?.path && existing.cutout.path !== path) {
    await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [existing.cutout.path]).catch(() => {});
  }

  revalidateSection(section);
  return respond({ ok: true, data: updated }, 200);
}
