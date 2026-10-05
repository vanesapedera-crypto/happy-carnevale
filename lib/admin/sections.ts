/**
 * Mājaslapas sadaļas, kuru attēlus var pārvaldīt admin panelī.
 * Jaunu sadaļu pievieno šeit un pēc tam publiskajā komponentē
 * nolasa ar getSectionItems("<key>") (skat. lib/sections.ts).
 */
export interface SectionDefinition {
  /** Unikāla atslēga datubāzē (section_key). Tikai mazie burti, cipari un domuzīmes. */
  key: string;
  /** Nosaukums, ko redz klients admin panelī. */
  label: string;
  /** Publiskās lapas adrese, ko atjaunot pēc izmaiņām. */
  path: string;
  /** Vai šīs sadaļas kartītēs rāda cenu un izmēru. */
  hasPriceAndSize: boolean;
}

export const SECTIONS: readonly SectionDefinition[] = [
  {
    key: "helovina-kostimi",
    label: "Helovīna kostīmi un maskas",
    path: "/kostimu-noma/helovins",
    hasPriceAndSize: true,
  },
];

export function getSection(key: string | null | undefined): SectionDefinition | null {
  if (!key) return null;
  return SECTIONS.find((section) => section.key === key) ?? null;
}

/** Kešatmiņas birka, ar kuru publiskā lapa tiek atjaunota uzreiz pēc izmaiņām. */
export function sectionTag(key: string): string {
  return `section:${key}`;
}
