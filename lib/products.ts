import type { Lang } from "@/lib/i18n";

type ProductText = { title: string; description?: string };

// Veikala preces. Atslēga ir adreses daļa: /veikals/<atslēga>
// title/description ir latviski (tos izmanto arī Google Merchant), ru/en — tulkojumi.
export type Product = {
  title: string;
  price: string;
  image: string;
  description?: string;
  parcelLocker?: boolean;
  ru?: ProductText;
  en?: ProductText;
};

/** Preces nosaukums un apraksts izvēlētajā valodā (ja tulkojuma nav — latviski). */
export function productText(product: Product, lang: Lang): ProductText {
  const translated = lang === "lv" ? undefined : product[lang];
  return {
    title: translated?.title ?? product.title,
    description: translated?.description ?? product.description,
  };
}

export const products: Record<string, Product> = {
  "ziepju-burbulu-skidrums-3l": {
    title: "Ziepju burbuļu šķidrums 3 L",
    price: "5.50 €",
    image: "/images/shop/ziepju-burbulu-skidrums-3l.jpg",
    description:
      "Profesionāls ziepju burbuļu koncentrāts, kas paredzēts lielu, izturīgu un krāšņu ziepju burbuļu veidošanai. Pirms lietošanas koncentrāts rūpīgi jāsakrata, pēc tam jāatšķaida ar siltu ūdeni atbilstoši ieteiktajai proporcijai. Tas nodrošina viendabīgu šķīdumu un vislabāko burbuļu kvalitāti. Pēc sagatavošanas šķidrums ir gatavs lietošanai ar dažādu izmēru burbuļu kociņiem un rāmjiem, veidojot lielus un izturīgus ziepju burbuļus.",
    ru: {
      title: "Жидкость для мыльных пузырей 3 л",
      description: "Профессиональный концентрат для мыльных пузырей, предназначенный для создания больших, прочных и красивых пузырей. Перед использованием концентрат нужно хорошо встряхнуть, а затем развести тёплой водой в рекомендуемой пропорции. Так получается однородный раствор и наилучшее качество пузырей. После приготовления жидкость готова к использованию с палочками и рамками разных размеров – получаются большие и прочные мыльные пузыри.",
    },
    en: {
      title: "Soap bubble solution 3 L",
      description: "A professional soap bubble concentrate for making big, strong and beautiful bubbles. Shake the concentrate well before use, then dilute with warm water in the recommended ratio. This gives an even solution and the best bubble quality. Once mixed, the solution is ready to use with bubble wands and frames of all sizes to create big, long-lasting soap bubbles.",
    },
  },
  "ziepju-burbulu-skidrums-5l": {
    title: "Ziepju burbuļu šķidrums 5 L",
    price: "8.00 €",
    image: "/images/shop/ziepju-burbulu-skidrums-5l.jpg",
    description:
      "Profesionāls ziepju burbuļu koncentrāts, kas paredzēts lielu, izturīgu un krāšņu ziepju burbuļu veidošanai. Pirms lietošanas koncentrāts rūpīgi jāsakrata, pēc tam jāatšķaida ar siltu ūdeni atbilstoši ieteiktajai proporcijai. Tas nodrošina viendabīgu šķīdumu un vislabāko burbuļu kvalitāti. Pēc sagatavošanas šķidrums ir gatavs lietošanai ar dažādu izmēru burbuļu kociņiem un rāmjiem, veidojot lielus un izturīgus ziepju burbuļus.",
    ru: {
      title: "Жидкость для мыльных пузырей 5 л",
      description: "Профессиональный концентрат для мыльных пузырей, предназначенный для создания больших, прочных и красивых пузырей. Перед использованием концентрат нужно хорошо встряхнуть, а затем развести тёплой водой в рекомендуемой пропорции. Так получается однородный раствор и наилучшее качество пузырей. После приготовления жидкость готова к использованию с палочками и рамками разных размеров – получаются большие и прочные мыльные пузыри.",
    },
    en: {
      title: "Soap bubble solution 5 L",
      description: "A professional soap bubble concentrate for making big, strong and beautiful bubbles. Shake the concentrate well before use, then dilute with warm water in the recommended ratio. This gives an even solution and the best bubble quality. Once mixed, the solution is ready to use with bubble wands and frames of all sizes to create big, long-lasting soap bubbles.",
    },
  },
  "burbulu-kocins-1": {
    title: "Burbuļu kociņš Nr.1",
    price: "6.00 €",
    image: "/images/shop/burbulu-kocins-1.jpg",
    description: `Burbuļu kociņš paredzēts viena liela un iespaidīga ziepju burbuļa veidošanai.

Kociņa garums ir 50 cm, tāpēc tas ir īpaši piemērots bērniem. Viegls, ērti satverams un vienkārši lietojams.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
    ru: {
      title: "Палочка для пузырей №1",
      description: "Палочка для создания одного большого и впечатляющего мыльного пузыря.\n\nДлина палочки 50 см, поэтому она особенно подходит детям. Лёгкая, удобная и простая в использовании.\n\nЛучший результат – вместе с нашим профессиональным концентратом для мыльных пузырей.",
    },
    en: {
      title: "Bubble wand No. 1",
      description: "A bubble wand for making one big, impressive soap bubble.\n\nThe wand is 50 cm long, which makes it especially good for children. Light, easy to hold and simple to use.\n\nWorks best with our professional soap bubble concentrate.",
    },
  },
  "burbulu-kocins-2": {
    title: "Burbuļu kociņš Nr.2",
    price: "7.00 €",
    image: "/images/shop/burbulu-kocins-2.jpg",
    description: `Burbuļu kociņš paredzēts viena liela un iespaidīga ziepju burbuļa veidošanai.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
    ru: {
      title: "Палочка для пузырей №2",
      description: "Палочка для создания одного большого и впечатляющего мыльного пузыря.\n\nДлина палочки 70 см, поэтому она подходит детям постарше и взрослым. Более длинная ручка удобнее в использовании и позволяет создавать ещё более впечатляющие пузыри.\n\nЛучший результат – вместе с нашим профессиональным концентратом для мыльных пузырей.",
    },
    en: {
      title: "Bubble wand No. 2",
      description: "A bubble wand for making one big, impressive soap bubble.\n\nThe wand is 70 cm long, so it suits older children and adults. The longer handle is more comfortable to use and lets you make even more impressive bubbles.\n\nWorks best with our professional soap bubble concentrate.",
    },
  },
  "burbulu-kocins-3": {
    title: "Burbuļu kociņš Nr.3",
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-3.jpg",
    description: `Burbuļu kociņš trīs ziepju burbuļu veidošanai vienā līnijā.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
    ru: {
      title: "Палочка для пузырей №3",
      description: "Палочка для создания трёх мыльных пузырей в одну линию.\n\nДлина палочки 70 см, поэтому она подходит детям постарше и взрослым. Более длинная ручка удобнее в использовании и позволяет создавать ещё более впечатляющие пузыри.\n\nЛучший результат – вместе с нашим профессиональным концентратом для мыльных пузырей.",
    },
    en: {
      title: "Bubble wand No. 3",
      description: "A bubble wand for making three soap bubbles in a row.\n\nThe wand is 70 cm long, so it suits older children and adults. The longer handle is more comfortable to use and lets you make even more impressive bubbles.\n\nWorks best with our professional soap bubble concentrate.",
    },
  },
  "burbulu-kocins-4": {
    title: "Burbuļu kociņš Nr.4",
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-4.jpg",
    description: `Burbuļu kociņš vairāku lielu ziepju burbuļu veidošanai vienlaikus.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
    ru: {
      title: "Палочка для пузырей №4",
      description: "Палочка для создания нескольких больших мыльных пузырей одновременно.\n\nДлина палочки 70 см, поэтому она подходит детям постарше и взрослым. Более длинная ручка удобнее в использовании и позволяет создавать ещё более впечатляющие пузыри.\n\nЛучший результат – вместе с нашим профессиональным концентратом для мыльных пузырей.",
    },
    en: {
      title: "Bubble wand No. 4",
      description: "A bubble wand for making several big soap bubbles at once.\n\nThe wand is 70 cm long, so it suits older children and adults. The longer handle is more comfortable to use and lets you make even more impressive bubbles.\n\nWorks best with our professional soap bubble concentrate.",
    },
  },
  "burbulu-kocins-5": {
    title: "Burbuļu kociņš Nr.5",
    price: "10.00 €",
    
    image: "/images/shop/burbulu-kocins-5.jpg",
    parcelLocker: false,
    description: `Burbuļu kociņš daudz mazu ziepju burbuļu veidošanai vienlaikus.
Kociņa garums ir 90 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
    ru: {
      title: "Палочка для пузырей №5",
      description: "Палочка для создания множества маленьких мыльных пузырей одновременно.\nДлина палочки 90 см, поэтому она подходит детям постарше и взрослым. Более длинная ручка удобнее в использовании и позволяет создавать ещё более впечатляющие пузыри.\n\nЛучший результат – вместе с нашим профессиональным концентратом для мыльных пузырей.",
    },
    en: {
      title: "Bubble wand No. 5",
      description: "A bubble wand for making lots of small soap bubbles at once.\nThe wand is 90 cm long, so it suits older children and adults. The longer handle is more comfortable to use and lets you make even more impressive bubbles.\n\nWorks best with our professional soap bubble concentrate.",
    },
  },
  "party-box": {
    title: "Party Box",
    price: "No 20 €",
    image: "/images/shop/party-box.jpg",
    description:
      "Izvēlies sev piemērotāko Party Box komplektu un burbuļu kociņus.",
    ru: {
      title: "Party Box",
      description: "Выберите подходящий набор Party Box и палочки для пузырей.",
    },
    en: {
      title: "Party Box",
      description: "Choose the Party Box set and bubble wands that suit you.",
    },
  },
};
