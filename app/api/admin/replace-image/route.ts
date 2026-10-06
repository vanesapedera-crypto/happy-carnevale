import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminConfig, STORAGE_BUCKET } from "@/lib/admin/config";
import { getItem, setImage } from "@/lib/admin/items";
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

const GONE = "Ieraksts vairs neeksistē. Pārlādē lapu.";

/**
 * POST /api/admin/replace-image
 * multipart/form-data: id, file
 * Nomaina esoša ieraksta attēlu. Nosaukums, cena, izmērs, secība un
 * "Rādīt lapā" paliek nemainīti. Iepriekšējais augšupielādētais fails tiek izdzēsts.
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  const config = getAdminConfig();
  if (!session || !config) {
    return respond(
      { ok: false, error: "Sesija ir beigusies. Lūdzu, ielogojies vēlreiz." },
      401
    );
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
  if (!isUuid(id)) {
    return respond({ ok: false, error: "Nederīgs ieraksts." }, 400);
  }

  const image = await readUploadedImage(form);
  if (!image.ok) {
    return respond({ ok: false, error: image.error }, image.status);
  }

  let existing: SectionItem | null;
  try {
    existing = await getItem(config, id);
  } catch (error) {
    console.error("[admin] getItem failed", error);
    return respond(
      { ok: false, error: `Neizdevās nolasīt ierakstu. ${describeSupabaseError(error)}` },
      502
    );
  }
  if (!existing) {
    return respond({ ok: false, error: GONE }, 404);
  }
  const section = getSection(existing.sectionKey);
  if (!section) {
    return respond({ ok: false, error: "Nezināma sadaļa." }, 400);
  }

  const path = `${section.key}/${randomUUID()}.${image.sniffed.ext}`;
  try {
    await storageUpload(
      config,
      config.serviceKey,
      STORAGE_BUCKET,
      path,
      image.buffer,
      image.sniffed.mime
    );
  } catch (error) {
    console.error("[admin] storage upload failed", error);
    return respond(
      { ok: false, error: `Neizdevās augšupielādēt attēlu. ${describeSupabaseError(error)}` },
      502
    );
  }

  let updated: SectionItem | null;
  try {
    updated = await setImage(
      config,
      id,
      storagePublicUrl(config, STORAGE_BUCKET, path),
      path
    );
  } catch (error) {
    console.error("[admin] setImage failed", error);
    // Lai krātuvē nepaliek fails bez ieraksta.
    await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [path]).catch(() => {});
    return respond(
      { ok: false, error: `Neizdevās saglabāt ierakstu. ${describeSupabaseError(error)}` },
      502
    );
  }
  if (!updated) {
    // Ieraksts pa to laiku ir izdzēsts.
    await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [path]).catch(() => {});
    return respond({ ok: false, error: GONE }, 404);
  }

  // Vecais augšupielādētais fails vairs nav vajadzīgs. Mājaslapas pašas
  // attēliem (imagePath = null) nekas netiek dzēsts.
  if (existing.imagePath && existing.imagePath !== path) {
    try {
      await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [existing.imagePath]);
    } catch (error) {
      console.error("[admin] old image remove failed", error);
    }
  }

  revalidateSection(section);
  return respond({ ok: true, data: updated }, 200);
}
