import { randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { getAdminConfig, STORAGE_BUCKET } from "@/lib/admin/config";
import { insertItem, nextSortOrder } from "@/lib/admin/items";
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
import {
  LIMITS,
  MAX_UPLOAD_BYTES,
  cleanText,
  sniffImageType,
  titleFromFilename,
} from "@/lib/admin/validation";

export const runtime = "nodejs";

function respond(result: ActionResult<SectionItem>, status: number) {
  return NextResponse.json(result, { status });
}

/** Pieprasījumam jānāk no šīs pašas mājaslapas. */
function isSameOrigin(request: NextRequest): boolean {
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

/**
 * POST /api/admin/upload
 * multipart/form-data: sectionKey, file, (neobligāti) title
 * Augšupielādē vienu attēlu un izveido ierakstu datubāzē.
 * Vairākus attēlus pārlūks sūta pa vienam.
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

  const sectionKey = form.get("sectionKey");
  const section = getSection(typeof sectionKey === "string" ? sectionKey : null);
  if (!section) {
    return respond({ ok: false, error: "Nezināma sadaļa." }, 400);
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return respond({ ok: false, error: "Nav izvēlēts attēls." }, 400);
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return respond({ ok: false, error: "Attēls ir par lielu (līdz 4 MB)." }, 413);
  }

  const buffer = await file.arrayBuffer();
  const sniffed = sniffImageType(
    new Uint8Array(buffer, 0, Math.min(16, buffer.byteLength))
  );
  if (!sniffed) {
    return respond({ ok: false, error: "Atļauti tikai JPG, PNG vai WebP attēli." }, 415);
  }

  const title =
    cleanText(form.get("title"), LIMITS.title) || titleFromFilename(file.name);
  const path = `${section.key}/${randomUUID()}.${sniffed.ext}`;

  try {
    await storageUpload(
      config,
      config.serviceKey,
      STORAGE_BUCKET,
      path,
      buffer,
      sniffed.mime
    );
  } catch (error) {
    console.error("[admin] storage upload failed", error);
    return respond(
      { ok: false, error: `Neizdevās augšupielādēt attēlu. ${describeSupabaseError(error)}` },
      502
    );
  }

  try {
    const item = await insertItem(config, {
      sectionKey: section.key,
      title,
      imageUrl: storagePublicUrl(config, STORAGE_BUCKET, path),
      imagePath: path,
      sortOrder: await nextSortOrder(config, section.key),
    });
    revalidateSection(section);
    return respond({ ok: true, data: item }, 201);
  } catch (error) {
    console.error("[admin] insert failed", error);
    // Lai krātuvē nepaliek fails bez ieraksta.
    await storageRemove(config, config.serviceKey, STORAGE_BUCKET, [path]).catch(() => {});
    return respond(
      { ok: false, error: `Neizdevās saglabāt ierakstu. ${describeSupabaseError(error)}` },
      502
    );
  }
}
