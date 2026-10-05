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
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type ActionResult<T = null> =
  | { ok: true; data: T }
  | { ok: false; error: string };
