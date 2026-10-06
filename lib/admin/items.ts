import type { AdminConfig } from "./config";
import { restDelete, restInsert, restSelect, restUpdate } from "./supabase";
import type { SectionItem } from "./types";
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
    active: row.active,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
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
