export interface ExtraImage {
  url: string;
  path: string | null;
}

/** Nosaukuma (un apraksta) tulkojumi krievu un angļu lapām. Tukšs — rāda latvisko. */
export type ItemTranslations = Partial<
  Record<"ru" | "en", { title?: string; description?: string }>
>;

/** Bilde bez fona; derīga tikai, ja `source` sakrīt ar pašreizējo imageUrl. */
export interface ItemCutout {
  url: string;
  path: string;
  source: string;
}

export interface SectionItem {
  id: string;
  sectionKey: string;
  title: string;
  description: string;
  price: string;
  size: string;
  imageUrl: string;
  /** Ceļš Supabase Storage. null, ja attēls ir mājaslapas /public mapē. */
  imagePath: string | null;
  /** Papildu bildes (kostīma galerijai). path = ceļš Storage, null – /public mapē. */
  extraImages: ExtraImage[];
  translations: ItemTranslations;
  /** null, ja fons vēl nav noņemts (vai datubāzē nav palaists supabase/izgriezumi.sql). */
  cutout: ItemCutout | null;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string };
