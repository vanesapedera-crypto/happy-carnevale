import { cache } from "react";
import { loadCostumes, type CostumeCard } from "@/lib/costumes";
import { slugify } from "@/lib/costumeSlug";

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
  name: string;
  /** Ko pieliek kostīma nosaukumam virsrakstā: "Betmens – kostīma noma" */
  noun: string;
  /** Kopīgais apraksts visiem šīs kategorijas kostīmiem */
  intro: string;
  /** false — kostīmus nesūta ar pakomātu */
  parcelLocker: boolean;
  sections: CatalogSection[];
};

export const COSTUME_CATEGORIES: CostumeCategory[] = [
  {
    path: "mascota-teli",
    name: "Mascota tēli",
    noun: "mascota tēla noma",
    intro:
      "Lielizmēra mascota kostīms bērnu ballītēm, uzņēmumu pasākumiem, reklāmas aktivitātēm un svētkiem.",
    parcelLocker: false,
    sections: [{ key: "mascota-teli", fallback: mascots }],
  },
  {
    path: "gaisa-plusmas-kostimi",
    name: "Gaisa plūsmas kostīmi",
    noun: "gaisa plūsmas kostīma noma",
    intro:
      "Krāsains un iespaidīgs piepūšamais kostīms ballītēm, tematiskajiem pasākumiem un svētkiem.",
    parcelLocker: true,
    sections: [{ key: "gaisa-plusmas-kostimi", fallback: airCostumes }],
  },
  {
    path: "filmu-un-pasaku-teli",
    name: "Kino tēli un citi kostīmi",
    noun: "kostīma noma",
    intro: "Kostīms ballītēm, tematiskajiem pasākumiem un karnevāliem.",
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
    name: "Smieklīgi tēli",
    noun: "kostīma noma",
    intro: "Kostīms ballītēm, tematiskajiem pasākumiem un karnevāliem.",
    parcelLocker: true,
    sections: [
      { key: "smiekligi-teli", fallback: funnyCharacters },
      { key: "retro-kostimi", fallback: retro },
      { key: "uzvalki", fallback: suits },
    ],
  },
  {
    path: "parukas",
    name: "Parūkas",
    noun: "parūkas noma",
    intro: "Parūka dažādiem pasākumiem, kostīmiem un svētkiem.",
    parcelLocker: true,
    sections: [{ key: "parukas", fallback: parukas }],
  },
  {
    path: "helovins",
    name: "Helovīna kostīmi",
    noun: "Helovīna kostīma noma",
    intro: "Kostīms Helovīna ballītēm un tematiskajiem pasākumiem.",
    parcelLocker: true,
    sections: [{ key: "helovina-kostimi", fallback: halloween }],
  },
  {
    path: "ziemassvetki",
    name: "Ziemassvētku kostīmi",
    noun: "Ziemassvētku kostīma noma",
    intro: "Kostīms Ziemassvētku pasākumiem un svētku ballītēm.",
    parcelLocker: true,
    sections: [{ key: "ziemassvetku-kostimi", fallback: christmas }],
  },
  {
    path: "lieldienas",
    name: "Lieldienu kostīmi",
    noun: "Lieldienu kostīma noma",
    intro: "Kostīms Lieldienu pasākumiem un svētkiem.",
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

/** Saite uz rezervācijas formu ar izvēlēto kostīmu. */
export function reservationHref(item: CostumeCard) {
  const params = new URLSearchParams({
    kostims: item.title,
    image: item.image,
    price: item.price ?? "",
    size: item.size ?? "",
  });

  return `/rezervacija-kostimiem?${params.toString()}`;
}
