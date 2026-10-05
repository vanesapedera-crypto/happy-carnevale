export const LIMITS = {
  title: 120,
  description: 500,
  price: 40,
  size: 40,
} as const;

/** Zem Vercel 4.5 MB pieprasījuma ierobežojuma. Pārlūks attēlus pirms tam samazina. */
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_PATTERN.test(value);
}

/** Apgriež tukšumus un izmet vadības rakstzīmes. null, ja nav teksts vai par garu. */
export function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim();
  if (cleaned.length > maxLength) return null;
  return cleaned;
}

export interface ItemPatch {
  title?: string;
  description?: string;
  price?: string;
  size?: string;
  active?: boolean;
  sortOrder?: number;
}

export type PatchResult =
  | { ok: true; patch: ItemPatch }
  | { ok: false; error: string };

/** Pārbauda no pārlūka saņemtās izmaiņas. Nezināmi lauki tiek ignorēti. */
export function parseItemPatch(input: unknown): PatchResult {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Nederīgi dati." };
  }
  const source = input as Record<string, unknown>;
  const patch: ItemPatch = {};

  const textFields = [
    ["title", "Nosaukums"],
    ["description", "Apraksts"],
    ["price", "Cena"],
    ["size", "Izmērs"],
  ] as const;

  for (const [field, label] of textFields) {
    if (source[field] === undefined) continue;
    const text = cleanText(source[field], LIMITS[field]);
    if (text === null) {
      return {
        ok: false,
        error: `${label}: ne vairāk kā ${LIMITS[field]} rakstzīmes.`,
      };
    }
    patch[field] = text;
  }

  if (source.active !== undefined) {
    if (typeof source.active !== "boolean") {
      return { ok: false, error: "Nederīga aktīvs/neaktīvs vērtība." };
    }
    patch.active = source.active;
  }

  if (source.sortOrder !== undefined) {
    const order = source.sortOrder;
    if (
      typeof order !== "number" ||
      !Number.isInteger(order) ||
      order < -100000 ||
      order > 100000
    ) {
      return { ok: false, error: "Secībai jābūt veselam skaitlim." };
    }
    patch.sortOrder = order;
  }

  if (Object.keys(patch).length === 0) {
    return { ok: false, error: "Nav ko saglabāt." };
  }
  return { ok: true, patch };
}

export interface SniffedImage {
  mime: (typeof ACCEPTED_IMAGE_TYPES)[number];
  ext: "jpg" | "png" | "webp";
}

/** Nosaka attēla veidu pēc faila pirmajiem baitiem, nevis pēc nosaukuma. */
export function sniffImageType(bytes: Uint8Array): SniffedImage | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { mime: "image/png", ext: "png" };
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 && // R
    bytes[1] === 0x49 && // I
    bytes[2] === 0x46 && // F
    bytes[3] === 0x46 && // F
    bytes[8] === 0x57 && // W
    bytes[9] === 0x45 && // E
    bytes[10] === 0x42 && // B
    bytes[11] === 0x50 // P
  ) {
    return { mime: "image/webp", ext: "webp" };
  }
  return null;
}

/** "ragana-kostims_2.jpg" -> "ragana kostims 2" (sākotnējais nosaukums pēc augšupielādes). */
export function titleFromFilename(filename: string): string {
  const baseName = filename.split(/[\\/]/).pop() ?? "";
  const withoutExtension = baseName.replace(/\.[^.]+$/, "");
  const spaced = withoutExtension.replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  return cleanText(spaced.slice(0, LIMITS.title), LIMITS.title) ?? "";
}
