import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { lp, tr, type Lang, type Tr } from "@/lib/i18n";

const SERVICES: { name: Tr; path: string }[] = [
  { name: { lv: "Kostīmu noma", ru: "Аренда костюмов", en: "Costume rental" }, path: "/kostimu-noma" },
  { name: { lv: "Mascota tēlu noma", ru: "Аренда ростовых кукол", en: "Mascot costume rental" }, path: "/kostimu-noma/mascota-teli" },
  { name: { lv: "Gaisa plūsmas kostīmu noma", ru: "Аренда надувных костюмов", en: "Inflatable costume rental" }, path: "/kostimu-noma/gaisa-plusmas-kostimi" },
  { name: { lv: "Animatori bērnu svētkiem", ru: "Аниматоры на детский праздник", en: "Kids' party entertainers" }, path: "/pasakumu-organizesana/animatori" },
  { name: { lv: "Pārsteiguma tēls", ru: "Персонаж-сюрприз", en: "Surprise character visit" }, path: "/pasakumu-organizesana/parsteiguma-tels" },
  { name: { lv: "Sejas apgleznošana", ru: "Аквагрим", en: "Face painting" }, path: "/pasakumu-organizesana/sejas-apgleznosana" },
  { name: { lv: "Radošās darbnīcas", ru: "Творческие мастерские", en: "Creative workshops" }, path: "/pasakumu-organizesana/radosas-darbnicas" },
  { name: { lv: "Milzu ziepju burbuļu produkti", ru: "Товары для гигантских мыльных пузырей", en: "Giant soap bubble products" }, path: "/veikals" },
];

const DESCRIPTION: Tr = {
  lv: SITE.description,
  ru: "Аренда костюмов для взрослых, ростовые куклы, аниматоры и творческие мастерские по всей Латвии.",
  en: "Adult costume rental, mascots, kids' party entertainers and creative workshops all over Latvia.",
};

/** Uzņēmuma dati Google: nosaukums, adrese, tālrunis, pakalpojumi. */
export function businessData(lang: Lang = "lv") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#uznemums`,
    name: SITE.name,
    description: tr(lang, DESCRIPTION),
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
      name: tr(lang, { lv: "Pakalpojumi", ru: "Услуги", en: "Services" }),
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: tr(lang, service.name),
          url: `${SITE.url}${lp(lang, service.path)}`,
        },
      })),
    },
  };
}

/** "Maizes drupačas" Google rezultātos: Sākums › Kostīmu noma › ... */
export function breadcrumbData(items: { name: string; path: string }[], lang: Lang = "lv") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE.url}${lp(lang, item.path) === "/" ? "" : lp(lang, item.path)}`,
    })),
  };
}
