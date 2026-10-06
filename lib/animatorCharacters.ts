import { animatorCharacters, type AnimatorCharacter } from "@/data/animatorCharacters";
import { ANIMATOR_SECTION_KEY } from "@/lib/admin/sections";
import { getSectionItems } from "@/lib/sections";

/**
 * Animatoru tērpi rezervācijas formai.
 *
 * Ja admin panelī sadaļai "Animatoru tērpi" ir vismaz viens aktīvs ieraksts,
 * rāda tos. Citādi (datubāze nav iestatīta, nav sasniedzama vai sadaļa ir
 * tukša) rāda kodā iebūvēto sarakstu, lai forma nekad nepaliek bez tēliem.
 */
export async function loadAnimatorCharacters(): Promise<AnimatorCharacter[]> {
  const managed = await getSectionItems(ANIMATOR_SECTION_KEY);
  if (!managed || managed.length === 0) return animatorCharacters;

  return managed.map((item) => ({ name: item.title, image: item.imageUrl }));
}
