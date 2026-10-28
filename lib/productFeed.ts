import { SHIPPING, SITE } from "@/lib/constants";
import { products, type Product } from "@/lib/products";

export const SHOP_BRAND = "Burbulītes burbuļi";

/**
 * Google produktu kategorija (taksonomijas ID). Bez tās Google šķidrumu
 * kļūdaini uzskatīja par alkoholisku dzērienu.
 * 3212 – Toys & Games > Toys > Activity Toys > Bubble Blowing Solution
 * 3874 – Toys & Games > Toys > Activity Toys > Bubble Blowing Toys
 */
export function googleCategory(slug: string): { id: number; type: string } {
  return slug.includes("skidrums")
    ? { id: 3212, type: "Ziepju burbuļi > Burbuļu šķidrums" }
    : { id: 3874, type: "Ziepju burbuļi > Burbuļu kociņi" };
}

/** "5.50 €" -> 5.5. Mainīgas cenas ("No 20 €") netiek iekļautas Google produktos. */
export function fixedPrice(product: Product): number | null {
  if (/^\s*no\b/i.test(product.price)) return null;
  const value = Number(product.price.replace(",", ".").replace(/[^\d.]/g, ""));
  return Number.isFinite(value) && value > 0 ? value : null;
}

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function plainDescription(product: Product): string {
  return (product.description ?? product.title).replace(/\s+/g, " ").trim();
}

/** Produkti ar fiksētu cenu (Google "Pirkumi" un strukturētajiem datiem). */
export function feedProducts() {
  return Object.entries(products)
    .map(([slug, product]) => ({ slug, product, price: fixedPrice(product) }))
    .filter((entry): entry is { slug: string; product: Product; price: number } => entry.price !== null);
}

/** schema.org Product dati produkta lapai. */
export function productJsonLd(slug: string, product: Product): Record<string, unknown> | null {
  const price = fixedPrice(product);
  if (price === null) return null;
  const url = absoluteUrl(`/veikals/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: plainDescription(product),
    image: [absoluteUrl(product.image)],
    sku: slug,
    brand: { "@type": "Brand", name: SHOP_BRAND },
    offers: {
      "@type": "Offer",
      url,
      price: price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: SITE.name },
      ...(product.parcelLocker === false
        ? {}
        : {
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: SHIPPING.parcelLocker.toFixed(2),
                currency: "EUR",
              },
              shippingDestination: { "@type": "DefinedRegion", addressCountry: "LV" },
            },
          }),
    },
  };
}
