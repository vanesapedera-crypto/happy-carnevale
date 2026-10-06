/**
 * Mājaslapas sadaļas, kuru attēlus var pārvaldīt admin panelī.
 * Jaunu sadaļu pievieno šeit un pēc tam publiskajā komponentē
 * nolasa ar loadCostumes("<key>", iebuvetaisSaraksts) (skat. lib/costumes.ts).
 * Animatoru tērpus nolasa lib/animatorCharacters.ts, galerijas: lib/gallery.ts.
 */
export interface SectionDefinition {
  /** Unikāla atslēga datubāzē (section_key). Tikai mazie burti, cipari un domuzīmes. */
  key: string;
  /** Nosaukums, ko redz klients admin panelī. */
  label: string;
  /** Grupa izvēlnē: mājaslapas lapa, kurā sadaļa atrodas. */
  group: string;
  /** Publiskās lapas adrese (saite "Skatīt sadaļu mājaslapā"). */
  path: string;
  /** Vai šīs sadaļas kartītēs rāda cenu un izmēru. */
  hasPriceAndSize: boolean;
  /** Vai kartītēs rāda nosaukumu. Galerijās ir tikai attēli. */
  hasTitle: boolean;
  /** Teksts admin panelī, kamēr sadaļā nav neviena attēla (ja atšķiras no parastā). */
  emptyHint?: string;
}

const MASCOTA = "Mascota tēli";
const GAISA = "Gaisa plūsmas kostīmi";
const KINO = "Kino tēli un citi interesanti kostīmi";
const SMIEKLIGI = "Smieklīgi tēli un parūkas";
const SEZONA = "Sezonālās kolekcijas";

const KINO_PATH = "/kostimu-noma/filmu-un-pasaku-teli";
const SMIEKLIGI_PATH = "/kostimu-noma/smiekligi-teli";

const PASAKUMI = "Pasākumi";

/** Animatoru tēlu izvēle pasākumu rezervācijas formā. */
export const ANIMATOR_SECTION_KEY = "animatoru-terpi";
/** Attēlu galerija lapā "Pārsteiguma tēls". */
export const SURPRISE_GALLERY_KEY = "parsteiguma-galerija";
/** Attēlu galerija lapā "Radošās darbnīcas" (lapā redzama tikai tad, ja ir attēli). */
export const WORKSHOP_GALLERY_KEY = "radoso-darbnicu-galerija";

function costumes(key: string, label: string, group: string, path: string): SectionDefinition {
  return { key, label, group, path, hasPriceAndSize: true, hasTitle: true };
}

export const SECTIONS: readonly SectionDefinition[] = [
  costumes("mascota-teli", "Maskoti", MASCOTA, "/kostimu-noma/mascota-teli"),
  costumes(
    "gaisa-plusmas-kostimi",
    "Gaisa piepūšamie kostīmi",
    GAISA,
    "/kostimu-noma/gaisa-plusmas-kostimi"
  ),

  costumes("princeses-un-fejas", "Princeses un fejas", KINO, KINO_PATH),
  costumes("supervaroni", "Supervaroņi", KINO, KINO_PATH),
  costumes("kino-teli", "Kino tēli un citi interesanti kostīmi", KINO, KINO_PATH),
  costumes("profesijas", "Profesijas", KINO, KINO_PATH),
  costumes("dzivnieku-teli", "Dzīvnieku tēli", KINO, KINO_PATH),

  costumes("smiekligi-teli", "Smieklīgi tēli", SMIEKLIGI, SMIEKLIGI_PATH),
  costumes("retro-kostimi", "Retro kostīmi", SMIEKLIGI, SMIEKLIGI_PATH),
  costumes("uzvalki", "Uzvalki", SMIEKLIGI, SMIEKLIGI_PATH),
  // Parūkas rāda divās lapās: /kostimu-noma/parukas un /kostimu-noma/smiekligi-teli.
  costumes("parukas", "Parūkas", SMIEKLIGI, "/kostimu-noma/parukas"),

  costumes(
    "helovina-kostimi",
    "Helovīna kostīmi un maskas",
    SEZONA,
    "/kostimu-noma/helovins"
  ),
  costumes("ziemassvetku-kostimi", "Ziemassvētku tēli", SEZONA, "/kostimu-noma/ziemassvetki"),
  costumes("lieldienu-kostimi", "Lieldienu kostīmi", SEZONA, "/kostimu-noma/lieldienas"),
  // Tēli, no kuriem klients izvēlas animatoru rezervācijas formā (bez cenas un izmēra).
  {
    key: ANIMATOR_SECTION_KEY,
    label: "Animatoru tērpi",
    group: PASAKUMI,
    path: "/rezervacija-pasakumiem",
    hasPriceAndSize: false,
    hasTitle: true,
  },
  {
    key: SURPRISE_GALLERY_KEY,
    label: "Pārsteiguma tēls: galerija",
    group: PASAKUMI,
    path: "/pasakumu-organizesana/parsteiguma-tels",
    hasPriceAndSize: false,
    hasTitle: false,
  },
  {
    key: WORKSHOP_GALLERY_KEY,
    label: "Radošās darbnīcas: galerija",
    group: PASAKUMI,
    path: "/pasakumu-organizesana/radosas-darbnicas",
    hasPriceAndSize: false,
    hasTitle: false,
    emptyHint:
      "Šajā sadaļā vēl nav attēlu. Kad pievienosi pirmo, lapā Radošās darbnīcas parādīsies galerija.",
  },
];

export function getSection(key: string | null | undefined): SectionDefinition | null {
  if (!key) return null;
  return SECTIONS.find((section) => section.key === key) ?? null;
}

/** Kešatmiņas birka, ar kuru publiskās lapas tiek atjaunotas uzreiz pēc izmaiņām. */
export function sectionTag(key: string): string {
  return `section:${key}`;
}
