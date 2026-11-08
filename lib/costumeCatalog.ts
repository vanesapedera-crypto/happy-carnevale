import { cache } from "react";
import { loadCostumes, type CostumeCard } from "@/lib/costumes";
import { slugify } from "@/lib/costumeSlug";
import type { Tr } from "@/lib/i18n";

import { mascots } from "@/data/costumes/mascota-teli";
import { costumes as airCostumes } from "@/data/costumes/gaisa-plusmas-kostimi";
import { princesses } from "@/data/costumes/princeses-un-fejas";
import { superheroes } from "@/data/costumes/supervaroni";
import { cartoons } from "@/data/costumes/kino-teli";
import { professions } from "@/data/costumes/profesijas";
import { animals } from "@/data/costumes/dzivnieku-teli";
import { funnyCharacters } from "@/data/costumes/smiekligi-teli";
import { retro } from "@/data/costumes/retro-kostimi";
import { suits } from "@/data/costumes/uzvalki";
import { parukas } from "@/data/costumes/parukas";
import { halloween } from "@/data/costumes/helovina-kostimi";
import { christmas } from "@/data/costumes/ziemassvetku-kostimi";
import { easter } from "@/data/costumes/lieldienu-kostimi";

/** Kostīms ar savu lapas adresi. */
export type CatalogCostume = CostumeCard & {
  slug: string;
  href: string;
  sectionKey: string;
};

type CatalogSection = {
  /** Admin paneļa sadaļas atslēga */
  key: string;
  fallback: CostumeCard[];
};

export type CostumeCategory = {
  /** Adreses daļa: /kostimu-noma/<path> */
  path: string;
  /** Kategorijas nosaukums saitēs un "maizes drupačās" */
  name: Tr;
  /** Ko pieliek kostīma nosaukumam virsrakstā: "Betmens – kostīma noma" */
  noun: Tr;
  /** Kopīgais apraksts visiem šīs kategorijas kostīmiem */
  intro: Tr;
  /** false — kostīmus nesūta ar pakomātu */
  parcelLocker: boolean;
  sections: CatalogSection[];
};

export const COSTUME_CATEGORIES: CostumeCategory[] = [
  {
    path: "mascota-teli",
    name: { lv: "Mascota tēli", ru: "Ростовые куклы", en: "Mascot costumes" },
    noun: { lv: "mascota tēla noma", ru: "аренда ростовой куклы", en: "mascot costume rental" },
    intro: { lv: "Lielizmēra mascota kostīms bērnu ballītēm, uzņēmumu pasākumiem, reklāmas aktivitātēm un svētkiem.", ru: "Ростовая кукла для детских праздников, корпоративов, рекламных акций и торжеств.", en: "A full-size mascot costume for kids' parties, corporate events, promotions and celebrations." },
    parcelLocker: false,
    sections: [{ key: "mascota-teli", fallback: mascots }],
  },
  {
    path: "gaisa-plusmas-kostimi",
    name: { lv: "Gaisa plūsmas kostīmi", ru: "Надувные костюмы", en: "Inflatable costumes" },
    noun: { lv: "gaisa plūsmas kostīma noma", ru: "аренда надувного костюма", en: "inflatable costume rental" },
    intro: { lv: "Krāsains un iespaidīgs piepūšamais kostīms ballītēm, tematiskajiem pasākumiem un svētkiem.", ru: "Яркий и эффектный надувной костюм для вечеринок, тематических мероприятий и праздников.", en: "A colourful, eye-catching inflatable costume for parties, themed events and celebrations." },
    parcelLocker: true,
    sections: [{ key: "gaisa-plusmas-kostimi", fallback: airCostumes }],
  },
  {
    path: "filmu-un-pasaku-teli",
    name: { lv: "Kino tēli un citi kostīmi", ru: "Герои фильмов и другие костюмы", en: "Movie characters and more" },
    noun: { lv: "kostīma noma", ru: "аренда костюма", en: "costume rental" },
    intro: { lv: "Kostīms ballītēm, tematiskajiem pasākumiem un karnevāliem.", ru: "Костюм для вечеринок, тематических мероприятий и карнавалов.", en: "A costume for parties, themed events and carnivals." },
    parcelLocker: true,
    sections: [
      { key: "princeses-un-fejas", fallback: princesses },
      { key: "supervaroni", fallback: superheroes },
      { key: "kino-teli", fallback: cartoons },
      { key: "profesijas", fallback: professions },
      { key: "dzivnieku-teli", fallback: animals },
    ],
  },
  {
    path: "smiekligi-teli",
    name: { lv: "Smieklīgi tēli", ru: "Смешные персонажи", en: "Funny characters" },
    noun: { lv: "kostīma noma", ru: "аренда костюма", en: "costume rental" },
    intro: { lv: "Kostīms ballītēm, tematiskajiem pasākumiem un karnevāliem.", ru: "Костюм для вечеринок, тематических мероприятий и карнавалов.", en: "A costume for parties, themed events and carnivals." },
    parcelLocker: true,
    sections: [
      { key: "smiekligi-teli", fallback: funnyCharacters },
      { key: "retro-kostimi", fallback: retro },
      { key: "uzvalki", fallback: suits },
    ],
  },
  {
    path: "parukas",
    name: { lv: "Parūkas", ru: "Парики", en: "Wigs" },
    noun: { lv: "parūkas noma", ru: "аренда парика", en: "wig rental" },
    intro: { lv: "Parūka dažādiem pasākumiem, kostīmiem un svētkiem.", ru: "Парик для разных мероприятий, костюмов и праздников.", en: "A wig for all kinds of events, costumes and parties." },
    parcelLocker: true,
    sections: [{ key: "parukas", fallback: parukas }],
  },
  {
    path: "helovins",
    name: { lv: "Helovīna kostīmi", ru: "Костюмы на Хэллоуин", en: "Halloween costumes" },
    noun: { lv: "Helovīna kostīma noma", ru: "аренда костюма на Хэллоуин", en: "Halloween costume rental" },
    intro: { lv: "Kostīms Helovīna ballītēm un tematiskajiem pasākumiem.", ru: "Костюм для вечеринок на Хэллоуин и тематических мероприятий.", en: "A costume for Halloween parties and themed events." },
    parcelLocker: true,
    sections: [{ key: "helovina-kostimi", fallback: halloween }],
  },
  {
    path: "ziemassvetki",
    name: { lv: "Ziemassvētku kostīmi", ru: "Рождественские костюмы", en: "Christmas costumes" },
    noun: { lv: "Ziemassvētku kostīma noma", ru: "аренда рождественского костюма", en: "Christmas costume rental" },
    intro: { lv: "Kostīms Ziemassvētku pasākumiem un svētku ballītēm.", ru: "Костюм для рождественских мероприятий и праздничных вечеринок.", en: "A costume for Christmas events and festive parties." },
    parcelLocker: true,
    sections: [{ key: "ziemassvetku-kostimi", fallback: christmas }],
  },
  {
    path: "paru-kostimi",
    name: { lv: "Pāru kostīmi", ru: "Парные костюмы", en: "Couples costumes" },
    noun: { lv: "pāru kostīma noma", ru: "аренда парного костюма", en: "couples costume rental" },
    intro: {
      lv: "Saskaņoti kostīmi diviem – ballītēm, karnevāliem, Helovīnam un tematiskajiem pasākumiem.",
      ru: "Парные костюмы для двоих – для вечеринок, карнавалов, Хэллоуина и тематических мероприятий.",
      en: "Matching costumes for two – for parties, carnivals, Halloween and themed events.",
    },
    parcelLocker: true,
    // Kostīmus pievieno admin panelī (sadaļa "Pāru kostīmi"); iebūvētā saraksta nav.
    sections: [{ key: "paru-kostimi", fallback: [] }],
  },
  {
    path: "lieldienas",
    name: { lv: "Lieldienu kostīmi", ru: "Пасхальные костюмы", en: "Easter costumes" },
    noun: { lv: "Lieldienu kostīma noma", ru: "аренда пасхального костюма", en: "Easter costume rental" },
    intro: { lv: "Kostīms Lieldienu pasākumiem un svētkiem.", ru: "Костюм для пасхальных мероприятий и праздников.", en: "A costume for Easter events and celebrations." },
    parcelLocker: true,
    sections: [{ key: "lieldienu-kostimi", fallback: easter }],
  },
];

export function getCategory(path: string) {
  return COSTUME_CATEGORIES.find((category) => category.path === path);
}

/**
 * Visi kategorijas kostīmi ar adresēm. Adrese veidojas no nosaukuma;
 * ja kategorijā ir divi vienādi nosaukumi, otrajam pieliek "-2", trešajam "-3".
 */
async function loadCategoryCostumesUncached(
  path: string
): Promise<CatalogCostume[]> {
    const category = getCategory(path);
    if (!category) return [];

    const lists = await Promise.all(
      category.sections.map((section) =>
        loadCostumes(section.key, section.fallback)
      )
    );

    const used = new Map<string, number>();
    const result: CatalogCostume[] = [];

    lists.forEach((cards, index) => {
      for (const card of cards) {
        const base = slugify(card.title);
        const count = (used.get(base) ?? 0) + 1;
        used.set(base, count);
        const slug = count === 1 ? base : `${base}-${count}`;

        result.push({
          ...card,
          slug,
          href: `/kostimu-noma/${category.path}/${slug}`,
          sectionKey: category.sections[index].key,
        });
      }
    });

    return result;
}

// Vienā lapas ielādē sarakstu aprēķina tikai vienreiz
export const loadCategoryCostumes: typeof loadCategoryCostumesUncached =
  typeof cache === "function"
    ? cache(loadCategoryCostumesUncached)
    : loadCategoryCostumesUncached;

/** Vienas sadaļas kartītes (ar saiti uz katra kostīma lapu). */
export async function loadSectionCards(
  sectionKey: string
): Promise<CatalogCostume[]> {
  const category = COSTUME_CATEGORIES.find((item) =>
    item.sections.some((section) => section.key === sectionKey)
  );
  if (!category) return [];

  const all = await loadCategoryCostumes(category.path);
  return all.filter((item) => item.sectionKey === sectionKey);
}

export async function findCostume(path: string, slug: string) {
  const all = await loadCategoryCostumes(path);
  return all.find((item) => item.slug === slug);
}

/**
 * Saite uz rezervācijas formu ar izvēlēto kostīmu.
 * kostims/price/size paliek latviski (tie nonāk rezervācijas e-pastā),
 * `displayTitle` — nosaukums lapas valodā, ko rāda formā.
 */
export function reservationHref(item: CostumeCard, displayTitle?: string) {
  const params = new URLSearchParams({
    kostims: item.title,
    image: item.image,
    price: item.price ?? "",
    size: item.size ?? "",
  });
  if (displayTitle && displayTitle !== item.title) params.set("nosaukums", displayTitle);
  if (item.cutout) params.set("cutout", item.cutout);

  return `/rezervacija-kostimiem?${params.toString()}`;
}
