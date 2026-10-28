import { SHIPPING, SITE } from "@/lib/constants";
import { absoluteUrl, feedProducts, googleCategory, plainDescription, SHOP_BRAND } from "@/lib/productFeed";

export const dynamic = "force-static";

const xml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Google Merchant Center produktu plūsma (RSS 2.0).
 * Merchant Center: Produkti → Pievienot produktus → Plūsma → https://www.happycarnevale.lv/merchant-feed.xml
 */
export function GET() {
  const items = feedProducts()
    .map(({ slug, product, price }) => {
      const shipping =
        product.parcelLocker === false
          ? ""
          : `
      <g:shipping>
        <g:country>LV</g:country>
        <g:service>Pakomāts</g:service>
        <g:price>${price >= SHIPPING.freeFrom ? "0.00" : SHIPPING.parcelLocker.toFixed(2)} EUR</g:price>
      </g:shipping>`;
      return `
    <item>
      <g:id>${xml(slug)}</g:id>
      <g:title>${xml(product.title)}</g:title>
      <g:description>${xml(plainDescription(product))}</g:description>
      <g:link>${xml(absoluteUrl(`/veikals/${slug}`))}</g:link>
      <g:image_link>${xml(absoluteUrl(product.image))}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${price.toFixed(2)} EUR</g:price>
      <g:condition>new</g:condition>
      <g:brand>${xml(SHOP_BRAND)}</g:brand>
      <g:google_product_category>${googleCategory(slug).id}</g:google_product_category>
      <g:product_type>${xml(googleCategory(slug).type)}</g:product_type>
      <g:identifier_exists>no</g:identifier_exists>${shipping}
    </item>`;
    })
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xml(SITE.name)} – ${xml(SHOP_BRAND)}</title>
    <link>${xml(SITE.url)}/veikals</link>
    <description>Milzu ziepju burbuļu šķidrums un burbuļu kociņi</description>${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
