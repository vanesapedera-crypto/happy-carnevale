import { getSectionItems } from "@/lib/sections";
import type { ItemTranslations } from "@/lib/admin/types";
import { translateCostumeDetail, translateCostumeName } from "@/lib/costumeNames";
import type { Lang } from "@/lib/i18n";

/** Viena kostīma kartīte tā, kā to rāda kostīmu sadaļas. */
export interface CostumeCard {
  title: string;
  description?: string;
  image: string;
  price: string;
  size: string;
  /** Papildu bildes (admin panelī pievienotās), rāda kostīma galerijā. */
  images?: string[];
  /** Bilde bez fona (admin panelī izveidotā). */
  cutout?: string;
  /** Admin panelī ierakstītie tulkojumi (krievu/angļu lapām). */
  translations?: ItemTranslations;
}

/**
 * Kostīma teksti izvēlētajā valodā: admin paneļa tulkojums → vārdnīca (lib/costumeNames.ts)
 * → latviski. Aprakstu svešvalodā rāda tikai, ja tas ierakstīts admin panelī.
 */
export function localizeCostume<T extends CostumeCard>(card: T, lang: Lang): T {
  if (lang === "lv") return card;
  const translated = card.translations?.[lang];
  return {
    ...card,
    title: translated?.title || translateCostumeName(card.title, lang),
    description: translated?.description || "",
    price: translateCostumeDetail(card.price, lang),
    size: translateCostumeDetail(card.size, lang),
  };
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
    images: item.extraImages.map((image) => image.url),
    translations: item.translations,
    cutout: item.cutout && item.cutout.source === item.imageUrl ? item.cutout.url : undefined,
  }));
}
