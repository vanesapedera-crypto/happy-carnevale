import { getSectionItems } from "@/lib/sections";

/** Viena kostīma kartīte tā, kā to rāda kostīmu sadaļas. */
export interface CostumeCard {
  title: string;
  description?: string;
  image: string;
  price: string;
  size: string;
}

/**
 * Sadaļas kostīmi no admin paneļa.
 * Ja datubāze nav iestatīta, nav sasniedzama vai sadaļā nav aktīvu ierakstu,
 * atgriež komponentē iebūvēto sarakstu, lai lapa nekad nepaliek tukša.
 */
export async function loadCostumes(
  sectionKey: string,
  fallback: CostumeCard[]
): Promise<CostumeCard[]> {
  const managed = await getSectionItems(sectionKey);
  if (!managed || managed.length === 0) return fallback;

  return managed.map((item) => ({
    title: item.title,
    description: item.description,
    image: item.imageUrl,
    price: item.price,
    size: item.size,
  }));
}
