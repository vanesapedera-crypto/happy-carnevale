import { getPublicConfig } from "@/lib/admin/config";
import { ITEMS_TABLE, rowToItem, type SectionItemRow } from "@/lib/admin/items";
import { sectionTag } from "@/lib/admin/sections";
import type { SectionItem } from "@/lib/admin/types";

/**
 * Publiskajām lapām: sadaļas aktīvie ieraksti pareizā secībā.
 *
 * Atgriež null, ja datubāze nav iestatīta vai nav sasniedzama. Tad komponente
 * rāda savu iebūvēto saturu, un lapa nesalūzt.
 */
export async function getSectionItems(
  sectionKey: string
): Promise<SectionItem[] | null> {
  const config = getPublicConfig();
  if (!config) return null;

  const query =
    `select=*&section_key=eq.${encodeURIComponent(sectionKey)}` +
    `&active=is.true&order=sort_order.asc,created_at.asc`;

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/${ITEMS_TABLE}?${query}`, {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
      },
      // Admin panelis pēc katras izmaiņas šo birku atjauno uzreiz.
      next: { revalidate: 300, tags: [sectionTag(sectionKey)] },
    });
    if (!response.ok) return null;

    const rows = (await response.json()) as SectionItemRow[];
    return rows.map(rowToItem);
  } catch {
    return null;
  }
}
