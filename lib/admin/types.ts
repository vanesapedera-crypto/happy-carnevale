export interface ExtraImage {
  url: string;
  path: string | null;
}

/** Nosaukuma (un apraksta) tulkojumi krievu un angļu lapām. Tukšs — rāda latvisko. */
export type ItemTranslations = Partial<
  Record<"ru" | "en", { title?: string; description?: string }>
>;

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
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string };
