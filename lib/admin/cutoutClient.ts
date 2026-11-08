import { removeBackground } from "./removeBackground";
import type { ActionResult, SectionItem } from "./types";

/** Noņem bildei fonu un saglabā. Atgriež null, ja izdevās, citādi kļūdas tekstu. */
export async function makeCutout(item: Pick<SectionItem, "id" | "imageUrl">): Promise<string | null> {
  try {
    const blob = await removeBackground(item.imageUrl);
    const body = new FormData();
    body.append("id", item.id);
    body.append("source", item.imageUrl);
    body.append("file", blob, blob.type === "image/png" ? "bez-fona.png" : "bez-fona.webp");
    const response = await fetch("/api/admin/cutout", { method: "POST", body });
    const result = (await response.json()) as ActionResult<SectionItem>;
    return result.ok ? null : result.error;
  } catch (error) {
    return error instanceof Error ? error.message : "Neizdevās noņemt fonu.";
  }
}
