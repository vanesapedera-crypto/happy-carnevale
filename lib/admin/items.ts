import type { AdminConfig } from "./config";
import { restDelete, restInsert, restSelect, restUpdate } from "./supabase";
import type { ExtraImage, ItemTranslations, SectionItem } from "./types";
import { LIMITS } from "./validation";
import type { ItemPatch } from "./validation";

export const ITEMS_TABLE = "section_items";

/** Rinda tā, kā tā glabājas datubāzē. */
export interface SectionItemRow {
  id: string;
  section_key: string;
  title: string;
  description: string;
  price: string | null;
  size: string | null;
  image_url: string;
  image_path: string | null;
  /** Var nebūt, ja datubāzē vēl nav palaists supabase/papildu-bildes.sql. */
  extra_images?: unknown;
  /** Var nebūt, ja datubāzē vēl nav palaists supabase/tulkojumi.sql. */
  translations?: unknown;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function rowToItem(row: SectionItemRow): SectionItem {
  return {
    id: row.id,
    sectionKey: row.section_key,
    title: row.title,
    description: row.description,
    price: row.price ?? "",
    size: row.size ?? "",
    imageUrl: row.image_url,
    imagePath: row.image_path,
    extraImages: parseExtraImages(row.extra_images),
    translations: parseTranslations(row.translations),
    active: row.active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

/** Nolasa tulkojumus no datubāzes (nezināmus laukus izmet). */
export function parseTranslations(value: unknown): ItemTranslations {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: ItemTranslations = {};
  for (const lang of ["ru", "en"] as const) {
    const entry = (value as Record<string, unknown>)[lang];
    if (!entry || typeof entry !== "object") continue;
    const { title, description } = entry as Record<string, unknown>;
    const clean: { title?: string; description?: string } = {};
    if (typeof title === "string" && title.trim()) clean.title = title.trim().slice(0, LIMITS.title);
    if (typeof description === "string" && description.trim())
      clean.description = description.trim().slice(0, LIMITS.description);
    if (clean.title || clean.description) result[lang] = clean;
  }
  return result;
}

/** Maksimālais papildu bilžu skaits vienam ierakstam. */
export const MAX_EXTRA_IMAGES = 12;

export function parseExtraImages(value: unknown): ExtraImage[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter(
      (entry): entry is { url: string; path?: unknown } =>
        !!entry && typeof entry === "object" && typeof (entry as { url?: unknown }).url === "string"
    )
    .map((entry) => ({
      url: entry.url,
      path: typeof entry.path === "string" ? entry.path : null,
    }));
}

/** Saglabā papildu bilžu sarakstu (updated_at neskarts, kā setImage). */
export async function setExtraImages(
  config: AdminConfig,
  id: string,
  images: ExtraImage[]
): Promise<SectionItem | null> {
  const row = await restUpdate<SectionItemRow>(
    config,
    config.serviceKey,
    ITEMS_TABLE,
    `id=eq.${encodeURIComponent(id)}`,
    { extra_images: images }
  );
  return row ? rowToItem(row) : null;
}

const ORDER = "order=sort_order.asc,created_at.asc";

/** Visi sadaļas ieraksti, arī neaktīvie (admin skatam). */
export async function listItems(
  config: AdminConfig,
  sectionKey: string
): Promise<SectionItem[]> {
  const rows = await restSelect<SectionItemRow>(
    config,
    config.serviceKey,
    ITEMS_TABLE,
    `select=*&section_key=eq.${encodeURIComponent(sectionKey)}&${ORDER}`
  );
  return rows.map(rowToItem);
}

/** Nākamais kārtas numurs: jauni attēli nonāk saraksta beigās. */
export async function nextSortOrder(
  config: AdminConfig,
  sectionKey: string
): Promise<number> {
  const rows = await restSelect<Pick<SectionItemRow, "sort_order">>(
    config,
    config.serviceKey,
    ITEMS_TABLE,
    `select=sort_order&section_key=eq.${encodeURIComponent(
      sectionKey
    )}&order=sort_order.desc&limit=1`
  );
  return (rows[0]?.sort_order ?? 0) + 10;
}

export interface NewItem {
  sectionKey: string;
  title: string;
  imageUrl: string;
  imagePath: string;
  sortOrder: number;
}

export async function insertItem(
  config: AdminConfig,
  item: NewItem
): Promise<SectionItem> {
  const row = await restInsert<SectionItemRow>(config, config.serviceKey, ITEMS_TABLE, {
    section_key: item.sectionKey,
    title: item.title,
    image_url: item.imageUrl,
    image_path: item.imagePath,
    sort_order: item.sortOrder,
  });
  return rowToItem(row);
}

export async function updateItem(
  config: AdminConfig,
  id: string,
  patch: ItemPatch
): Promise<SectionItem | null> {
  const changes: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (patch.title !== undefined) changes.title = patch.title;
  if (patch.description !== undefined) changes.description = patch.description;
  if (patch.price !== undefined) changes.price = patch.price;
  if (patch.size !== undefined) changes.size = patch.size;
  if (patch.active !== undefined) changes.active = patch.active;
  if (patch.sortOrder !== undefined) changes.sort_order = patch.sortOrder;
  if (patch.translations !== undefined) changes.translations = patch.translations;

  const row = await restUpdate<SectionItemRow>(
    config,
    config.serviceKey,
    ITEMS_TABLE,
    `id=eq.${encodeURIComponent(id)}`,
    changes
  );
  return row ? rowToItem(row) : null;
}

export async function deleteItem(
  config: AdminConfig,
  id: string
): Promise<SectionItem | null> {
  const row = await restDelete<SectionItemRow>(
    config,
    config.serviceKey,
    ITEMS_TABLE,
    `id=eq.${encodeURIComponent(id)}`
  );
  return row ? rowToItem(row) : null;
}

/**
 * Maina tikai ieraksta vietu sarakstā. updated_at paliek neskarts, lai admin
 * panelī atvērtās kartītes nezaudē vēl nesaglabātus labojumus.
 */
export async function setSortOrder(
  config: AdminConfig,
  sectionKey: string,
  id: string,
  sortOrder: number
): Promise<void> {
  await restUpdate<SectionItemRow>(
    config,
    config.serviceKey,
    ITEMS_TABLE,
    `id=eq.${encodeURIComponent(id)}&section_key=eq.${encodeURIComponent(sectionKey)}`,
    { sort_order: sortOrder }
  );
}

export async function getItem(config: AdminConfig, id: string): Promise<SectionItem | null> {
  const rows = await restSelect<SectionItemRow>(
    config,
    config.serviceKey,
    ITEMS_TABLE,
    `select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  );
  return rows[0] ? rowToItem(rows[0]) : null;
}

/**
 * Nomaina tikai ieraksta attēlu. updated_at paliek neskarts, lai admin
 * panelī atvērtā kartīte nezaudē vēl nesaglabātus labojumus.
 */
export async function setImage(
  config: AdminConfig,
  id: string,
  imageUrl: string,
  imagePath: string
): Promise<SectionItem | null> {
  const row = await restUpdate<SectionItemRow>(
    config,
    config.serviceKey,
    ITEMS_TABLE,
    `id=eq.${encodeURIComponent(id)}`,
    { image_url: imageUrl, image_path: imagePath }
  );
  return row ? rowToItem(row) : null;
}
