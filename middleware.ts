import { NextResponse, type NextRequest } from "next/server";

/**
 * Valodas adresēs:
 *  - /ru/... un /en/...  -> krievu / angļu lapas (app/[lang])
 *  - /lv/...             -> pāradresē uz adresi bez /lv (lai nav dublikātu)
 *  - viss pārējais        -> iekšēji rāda /lv/... (latviešu lapas paliek bez prefiksa)
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (/^\/(ru|en)(\/|$)/.test(pathname)) {
    return NextResponse.next();
  }

  if (/^\/lv(\/|$)/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/lv/, "") || "/";
    url.search = search;
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/lv${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Neskar admin paneli, API, Next.js failus, sitemap/robots/feed un failus ar paplašinājumu (bildes u.c.)
  matcher: [
    "/((?!api|admin|_next|_vercel|sitemap.xml|robots.txt|merchant-feed.xml|.*\\.[\\w]+$).*)",
  ],
};
