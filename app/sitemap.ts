import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { products } from "@/lib/products";
import { COSTUME_CATEGORIES, loadCategoryCostumes } from "@/lib/costumeCatalog";
import { LANGS, lp } from "@/lib/i18n";

// Visas publiskās lapas. Pievienojot jaunu lapu, ieraksti to arī šeit.
const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },

  { path: "/kostimu-noma", priority: 0.9 },
  { path: "/kostimu-noma/mascota-teli", priority: 0.8 },
  { path: "/kostimu-noma/gaisa-plusmas-kostimi", priority: 0.8 },
  { path: "/kostimu-noma/filmu-un-pasaku-teli", priority: 0.8 },
  { path: "/kostimu-noma/smiekligi-teli", priority: 0.8 },
  { path: "/kostimu-noma/parukas", priority: 0.8 },
  { path: "/kostimu-noma/helovins", priority: 0.8 },
  { path: "/kostimu-noma/ziemassvetki", priority: 0.8 },
  { path: "/kostimu-noma/paru-kostimi", priority: 0.8 },
  { path: "/kostimu-noma/lieldienas", priority: 0.8 },

  { path: "/pasakumu-organizesana", priority: 0.9 },
  { path: "/pasakumu-organizesana/animatori", priority: 0.8 },
  { path: "/pasakumu-organizesana/parsteiguma-tels", priority: 0.8 },
  { path: "/pasakumu-organizesana/sejas-apgleznosana", priority: 0.8 },
  { path: "/pasakumu-organizesana/radosas-darbnicas", priority: 0.8 },
  { path: "/pasakumu-organizesana/helovins", priority: 0.8 },
  { path: "/pasakumu-organizesana/ziemassvetki", priority: 0.8 },

  { path: "/veikals", priority: 0.9 },
  ...Object.keys(products).map((slug) => ({
    path: `/veikals/${slug}`,
    priority: 0.6,
  })),

  { path: "/kontakti", priority: 0.7 },
  { path: "/piegade-un-atgriesana", priority: 0.3 },
];

// Kostīmu saraksts mainās admin panelī, tāpēc sitemap atjaunojas reizi stundā
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const costumeLists = await Promise.all(
    COSTUME_CATEGORIES.map((category) => loadCategoryCostumes(category.path))
  );
  const costumeRoutes = costumeLists
    .flat()
    .map((item) => ({ path: item.href, priority: 0.6 }));

  const url = (path: string) => {
    const full = `${SITE.url}${path}`;
    return full.endsWith("/") ? full.slice(0, -1) : full;
  };

  // Katra lapa visās valodās (lv bez prefiksa, /ru, /en) ar hreflang saitēm
  return [...ROUTES, ...costumeRoutes].flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(LANGS.map((lang) => [lang, url(lp(lang, path))]));
    return LANGS.map((lang) => ({
      url: url(lp(lang, path)),
      lastModified,
      changeFrequency: "weekly" as const,
      // Svešvalodu versijām nedaudz zemāka prioritāte
      priority: lang === "lv" ? priority : Math.round(priority * 8) / 10,
      alternates: { languages },
    }));
  });
}
