import cutouts from "@/lib/costumeCutouts.json";

/**
 * Kostīmu bildes bez fona (public/kostimi-izgriezti/…webp).
 * Tās izveido scripts/izgriezt-fonus.py, admin panelī augšupielādētajām –
 * pats admin panelis (lib/admin/removeBackground.ts). Ja izgriezuma nav,
 * kartīte rāda parasto bildi bez krāsainā apļa.
 */
const AVAILABLE = new Set<string>(cutouts as string[]);

export function cutoutFor(image: string | undefined | null, explicit?: string | null): string | null {
  if (explicit) return explicit;
  if (!image || !image.startsWith("/kostimi/")) return null;
  const rel = image.slice("/kostimi/".length).replace(/\.[a-z0-9]+$/i, "");
  return AVAILABLE.has(rel) ? `/kostimi-izgriezti/${rel}.webp` : null;
}
