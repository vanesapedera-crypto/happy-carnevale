import { revalidatePath, revalidateTag } from "next/cache";
import { sectionTag, type SectionDefinition } from "./sections";

/** Pēc izmaiņām publiskā lapa atjaunojas uzreiz, bez jaunas publicēšanas — visās valodās. */
export function revalidateSection(section: SectionDefinition): void {
  revalidateTag(sectionTag(section.key));
  // Latviešu lapas iekšēji ir /lv/... (skat. middleware.ts), krievu un angļu — /ru/..., /en/...
  for (const prefix of ["", "/lv", "/ru", "/en"]) {
    revalidatePath(`${prefix}${section.path}`);
  }
}
