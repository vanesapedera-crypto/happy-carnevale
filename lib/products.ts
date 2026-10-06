// Veikala preces. Atslēga ir adreses daļa: /veikals/<atslēga>
export type Product = {
  title: string;
  price: string;
  image: string;
  description?: string;
  parcelLocker?: boolean;
};

export const products: Record<string, Product> = {
  "ziepju-burbulu-skidrums-3l": {
    title: "Ziepju burbuļu šķidrums 3 L",
    price: "5.50 €",
    image: "/images/shop/ziepju-burbulu-skidrums-3l.png",
    description:
      "Profesionāls ziepju burbuļu koncentrāts, kas paredzēts lielu, izturīgu un krāšņu ziepju burbuļu veidošanai. Pirms lietošanas koncentrāts rūpīgi jāsakrata, pēc tam jāatšķaida ar siltu ūdeni atbilstoši ieteiktajai proporcijai. Tas nodrošina viendabīgu šķīdumu un vislabāko burbuļu kvalitāti. Pēc sagatavošanas šķidrums ir gatavs lietošanai ar dažādu izmēru burbuļu kociņiem un rāmjiem, veidojot lielus un izturīgus ziepju burbuļus.",
  },
  "ziepju-burbulu-skidrums-5l": {
    title: "Ziepju burbuļu šķidrums 5 L",
    price: "8.00 €",
    image: "/images/shop/ziepju-burbulu-skidrums-5l.png",
    description:
      "Profesionāls ziepju burbuļu koncentrāts, kas paredzēts lielu, izturīgu un krāšņu ziepju burbuļu veidošanai. Pirms lietošanas koncentrāts rūpīgi jāsakrata, pēc tam jāatšķaida ar siltu ūdeni atbilstoši ieteiktajai proporcijai. Tas nodrošina viendabīgu šķīdumu un vislabāko burbuļu kvalitāti. Pēc sagatavošanas šķidrums ir gatavs lietošanai ar dažādu izmēru burbuļu kociņiem un rāmjiem, veidojot lielus un izturīgus ziepju burbuļus.",
  },
  "burbulu-kocins-1": {
    title: "Burbuļu kociņš Nr.1",
    price: "6.00 €",
    image: "/images/shop/burbulu-kocins-1.png",
    description: `Burbuļu kociņš paredzēts viena liela un iespaidīga ziepju burbuļa veidošanai.

Kociņa garums ir 50 cm, tāpēc tas ir īpaši piemērots bērniem. Viegls, ērti satverams un vienkārši lietojams.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "burbulu-kocins-2": {
    title: "Burbuļu kociņš Nr.2",
    price: "7.00 €",
    image: "/images/shop/burbulu-kocins-2.png",
    description: `Burbuļu kociņš paredzēts viena liela un iespaidīga ziepju burbuļa veidošanai.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "burbulu-kocins-3": {
    title: "Burbuļu kociņš Nr.3",
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-3.png",
    description: `Burbuļu kociņš trīs ziepju burbuļu veidošanai vienā līnijā.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "burbulu-kocins-4": {
    title: "Burbuļu kociņš Nr.4",
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-4.png",
    description: `Burbuļu kociņš vairāku lielu ziepju burbuļu veidošanai vienlaikus.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "burbulu-kocins-5": {
    title: "Burbuļu kociņš Nr.5",
    price: "10.00 €",
    
    image: "/images/shop/burbulu-kocins-5.png",
    parcelLocker: false,
    description: `Burbuļu kociņš daudz mazu ziepju burbuļu veidošanai vienlaikus.
Kociņa garums ir 90 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "party-box": {
    title: "Party Box",
    price: "No 20 €",
    image: "/images/shop/party-box.png",
    description:
      "Izvēlies sev piemērotāko Party Box komplektu un burbuļu kociņus.",
  },
};
