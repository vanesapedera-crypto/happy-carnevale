import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { products } from "@/lib/products";

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
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
  }));
}
