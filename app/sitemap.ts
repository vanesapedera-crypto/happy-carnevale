import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { NAV_LINKS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_LINKS.map((link) => ({
    url: `${SITE.url}${link.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: link.href === "/" ? 1 : 0.7,
  }));
}
