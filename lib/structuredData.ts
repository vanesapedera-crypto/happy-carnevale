import { SITE, SOCIAL_LINKS } from "@/lib/constants";

const SERVICES = [
  { name: "Kostīmu noma", path: "/kostimu-noma" },
  { name: "Mascota tēlu noma", path: "/kostimu-noma/mascota-teli" },
  { name: "Gaisa plūsmas kostīmu noma", path: "/kostimu-noma/gaisa-plusmas-kostimi" },
  { name: "Animatori bērnu svētkiem", path: "/pasakumu-organizesana/animatori" },
  { name: "Pārsteiguma tēls", path: "/pasakumu-organizesana/parsteiguma-tels" },
  { name: "Sejas apgleznošana", path: "/pasakumu-organizesana/sejas-apgleznosana" },
  { name: "Radošās darbnīcas", path: "/pasakumu-organizesana/radosas-darbnicas" },
  { name: "Milzu ziepju burbuļu produkti", path: "/veikals" },
];

/** Uzņēmuma dati Google: nosaukums, adrese, tālrunis, pakalpojumi. */
export function businessData() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#uznemums`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    image: `${SITE.url}/images/logo.png`,
    telephone: SITE.phoneHref.replace("tel:", ""),
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Stabu iela 90",
      addressLocality: "Rīga",
      postalCode: "LV-1009",
      addressCountry: "LV",
    },
    areaServed: { "@type": "Country", name: "Latvija" },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pakalpojumi",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          url: `${SITE.url}${service.path}`,
        },
      })),
    },
  };
}

/** "Maizes drupačas" Google rezultātos: Sākums › Kostīmu noma › ... */
export function breadcrumbData(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
