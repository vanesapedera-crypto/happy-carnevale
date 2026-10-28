import { NextResponse, type NextRequest } from "next/server";
import { getPublicConfig } from "@/lib/admin/config";
import { ITEMS_TABLE, parseExtraImages } from "@/lib/admin/items";

/**
 * GET /api/costume-images?image=<galvenās bildes adrese>
 * Rezervācijas formai: kostīma papildu bildes (admin panelī pievienotās).
 * Ja nekā nav vai datubāze nav sasniedzama, atgriež tukšu sarakstu.
 */
export async function GET(request: NextRequest) {
  const image = request.nextUrl.searchParams.get("image") ?? "";
  const config = getPublicConfig();
  if (!config || !image || image.length > 500) return NextResponse.json({ images: [] });

  const query =
    `select=extra_images&image_url=eq.${encodeURIComponent(image)}` + `&active=is.true&limit=1`;
  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/${ITEMS_TABLE}?${query}`, {
      headers: { apikey: config.anonKey, Authorization: `Bearer ${config.anonKey}` },
      next: { revalidate: 120 },
    });
    if (!response.ok) return NextResponse.json({ images: [] });
    const rows = (await response.json()) as { extra_images?: unknown }[];
    const images = parseExtraImages(rows[0]?.extra_images).map((entry) => entry.url);
    return NextResponse.json(
      { images },
      { headers: { "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json({ images: [] });
  }
}
