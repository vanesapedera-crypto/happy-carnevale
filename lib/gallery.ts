import { getSectionItems } from "@/lib/sections";

/**
 * Galerijas attēlu adreses publiskajai lapai.
 *
 * Ja admin panelī sadaļai ir vismaz viens redzams attēls, atgriež tos.
 * Citādi (datubāze nav iestatīta, nav sasniedzama vai sadaļa ir tukša)
 * atgriež `fallback`: kodā iebūvētos attēlus vai tukšu sarakstu.
 */
export async function loadGalleryImages(
  sectionKey: string,
  fallback: readonly string[] = []
): Promise<readonly string[]> {
  const managed = await getSectionItems(sectionKey);
  if (!managed || managed.length === 0) return fallback;

  return managed.map((item) => item.imageUrl);
}
