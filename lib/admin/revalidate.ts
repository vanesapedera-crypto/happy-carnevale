import { revalidatePath, revalidateTag } from "next/cache";
import { sectionTag, type SectionDefinition } from "./sections";

/** Pēc izmaiņām publiskā lapa atjaunojas uzreiz, bez jaunas publicēšanas. */
export function revalidateSection(section: SectionDefinition): void {
  revalidateTag(sectionTag(section.key));
  revalidatePath(section.path);
}
