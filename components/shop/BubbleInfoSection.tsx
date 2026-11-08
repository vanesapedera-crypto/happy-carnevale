import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { SHIPPING } from "@/lib/constants";
import { lp, type Lang } from "@/lib/i18n";

const money = (value: number, lang: Lang) =>
  lang === "en" ? `€${value.toFixed(2)}` : `${value.toFixed(2).replace(".", ",")} €`;

type Faq = { q: string; a: string; animatorsLink?: boolean };

function faq(lang: Lang): Faq[] {
  const locker = money(SHIPPING.parcelLocker, lang);
  const free = money(SHIPPING.freeFrom, lang);

  if (lang === "ru") {
    return [
      {
        q: "Как приготовить жидкость для гигантских мыльных пузырей?",
        a: "Наша жидкость для мыльных пузырей – это концентрат. Перед использованием хорошо встряхните бутылку и разведите тёплой водой в пропорции, указанной на упаковке, затем аккуратно перемешайте. Готовую жидкость налейте в широкую ёмкость, в которую можно окунуть палочку для пузырей.",
      },
      {
        q: "Какую палочку для пузырей выбрать?",
        a: "Палочка №1 (50 см) лёгкая и особенно подходит детям – она делает один большой пузырь. Палочки №2–№4 (70 см) для детей постарше и взрослых: один гигантский пузырь, три пузыря в линию или несколько больших пузырей сразу. Палочка №5 (90 см) создаёт множество маленьких пузырей одновременно.",
      },
      {
        q: "В какую погоду пузыри получаются лучше всего?",
        a: "Самые большие и прочные пузыри получаются в безветренную или слегка ветреную погоду и при влажном воздухе – например, в пасмурный день или вечером. На жарком солнце и сильном ветру пузыри лопаются быстрее.",
      },
      {
        q: "Как получить заказ?",
        a: `Заказ можно забрать в Риге или получить с доставкой в пакомат по всей Латвии. Доставка в пакомат стоит ${locker}, а при заказе от ${free} – бесплатно. Длинную палочку №5 в пакомат не отправляем.`,
      },
      {
        q: "Что такое Party Box?",
        a: "Party Box – это готовый набор для праздника мыльных пузырей: жидкость для пузырей вместе с выбранными вами палочками. Отлично подходит для детского дня рождения, выпускного или праздника на свежем воздухе.",
      },
      {
        q: "Можно ли заказать шоу мыльных пузырей на праздник?",
        a: "Да – на детских праздниках и мероприятиях наши аниматоры могут устроить и гигантские мыльные пузыри. Подробнее в разделе об аниматорах.",
        animatorsLink: true,
      },
    ];
  }

  if (lang === "en") {
    return [
      {
        q: "How do I make giant soap bubble solution?",
        a: "Our soap bubble solution is a concentrate. Before use, shake the bottle well and dilute it with warm water in the ratio shown on the pack, then stir gently. Pour the ready solution into a wide container that you can dip the bubble wand into.",
      },
      {
        q: "Which bubble wand should I choose?",
        a: "Wand No. 1 (50 cm) is light and especially good for children – it makes one big bubble. Wands No. 2–4 (70 cm) are for older children and adults: one giant bubble, three bubbles in a row or several big bubbles at once. Wand No. 5 (90 cm) makes lots of small bubbles at the same time.",
      },
      {
        q: "What weather is best for bubbles?",
        a: "The biggest, longest-lasting bubbles come on calm or lightly breezy days with humid air – for example on a cloudy day or in the evening. In hot sun and strong wind bubbles pop faster.",
      },
      {
        q: "How do I receive my order?",
        a: `You can collect your order in Riga or have it delivered to a parcel locker anywhere in Latvia. Parcel locker delivery costs ${locker} and is free on orders from ${free}. We don't send the long wand No. 5 by parcel locker.`,
      },
      {
        q: "What is a Party Box?",
        a: "A Party Box is a ready-made soap bubble party set – bubble solution together with the bubble wands you choose. Perfect for a kid's birthday, a graduation or an outdoor party.",
      },
      {
        q: "Can I book a bubble show for a party?",
        a: "Yes – at kids' parties and events our entertainers can bring giant soap bubbles too. See the entertainers section for details.",
        animatorsLink: true,
      },
    ];
  }

  return [
    {
      q: "Kā pagatavot milzu ziepju burbuļu šķidrumu?",
      a: "Mūsu ziepju burbuļu šķidrums ir koncentrāts. Pirms lietošanas pudeli rūpīgi sakrati un atšķaidi ar siltu ūdeni pēc uz iepakojuma norādītās proporcijas, tad viegli samaisi. Gatavo šķidrumu lej plašā traukā, kurā var iemērkt burbuļu kociņu.",
    },
    {
      q: "Kādu burbuļu kociņu izvēlēties?",
      a: "Kociņš Nr.1 (50 cm) ir viegls un īpaši piemērots bērniem – ar to veido vienu lielu burbuli. Kociņi Nr.2–Nr.4 (70 cm) ir lielākiem bērniem un pieaugušajiem: viens milzu burbulis, trīs burbuļi vienā līnijā vai vairāki lieli burbuļi vienlaikus. Kociņš Nr.5 (90 cm) veido daudz mazu burbuļu uzreiz.",
    },
    {
      q: "Kādos laikapstākļos burbuļi izdodas vislabāk?",
      a: "Vislielākie un izturīgākie burbuļi sanāk bezvēja vai viegla vēja laikā un mitrā gaisā, piemēram, mākoņainā dienā vai vakarā. Karstā saulē un stiprā vējā burbuļi plīst ātrāk.",
    },
    {
      q: "Kā saņemt pasūtījumu?",
      a: `Pasūtījumu var saņemt Rīgā vai ar piegādi uz pakomātu visā Latvijā. Piegāde uz pakomātu maksā ${locker}, bet pasūtījumiem no ${free} – bez maksas. Garo kociņu Nr.5 pakomātā nesūtām.`,
    },
    {
      q: "Kas ir Party Box?",
      a: "Party Box ir gatavs komplekts ziepju burbuļu ballītei – burbuļu šķidrums kopā ar Tevis izvēlētiem burbuļu kociņiem. Lieliski piemērots bērnu dzimšanas dienai, izlaidumam vai āra svētkiem.",
    },
    {
      q: "Vai var pasūtīt arī burbuļu šovu svētkos?",
      a: "Jā – bērnu svētkos un pasākumos mūsu animatori var parūpēties arī par milzu ziepju burbuļiem. Sīkāk sadaļā par animatoriem.",
      animatorsLink: true,
    },
  ];
}

const TX = {
  lv: {
    title: "Milzu ziepju burbuļi mājās, ballītē un svētkos",
    faq: "Biežākie jautājumi",
    animators: "Animatori →",
  },
  ru: {
    title: "Гигантские мыльные пузыри дома, на вечеринке и празднике",
    faq: "Частые вопросы",
    animators: "Аниматоры →",
  },
  en: {
    title: "Giant soap bubbles at home, at parties and celebrations",
    faq: "Frequently asked questions",
    animators: "Entertainers →",
  },
};

/** Veikala lapas teksts un biežākie jautājumi par ziepju burbuļiem (arī Google). */
export default function BubbleInfoSection({ lang }: { lang: Lang }) {
  const items = faq(lang);
  const t = TX[lang];
  const partyBox = (
    <Link href={lp(lang, "/veikals/party-box")} className="font-semibold text-pink-600 hover:underline">
      Party Box
    </Link>
  );

  return (
    <section className="bg-white py-16 lg:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-black text-gray-900 lg:text-4xl">{t.title}</h2>
        <div className="mt-6 space-y-4 text-lg leading-8 text-gray-600">
          {lang === "lv" && (
            <>
              <p>
                Ziepju burbuļi ir viens no vienkāršākajiem veidiem, kā sagādāt prieku gan bērniem, gan
                pieaugušajiem. Ar mūsu profesionālo <strong>ziepju burbuļu šķidrumu</strong> un lielajiem{" "}
                <strong>burbuļu kociņiem</strong> var izpūst milzīgus, krāsās mirdzošus burbuļus, kas
                pārsteidz jebkuru – dzimšanas dienā, izlaidumā, kāzās, fotosesijā vai vienkārši pagalmā.
              </p>
              <p>
                Piedāvājam ziepju burbuļu koncentrātu 3 L un 5 L iepakojumā, burbuļu kociņus no 50 līdz 90 cm
                un {partyBox} komplektus. Pasūtījumu var saņemt Rīgā vai ar piegādi uz pakomātu visā Latvijā.
              </p>
            </>
          )}
          {lang === "ru" && (
            <>
              <p>
                Мыльные пузыри – один из самых простых способов порадовать и детей, и взрослых. С нашей
                профессиональной <strong>жидкостью для мыльных пузырей</strong> и большими{" "}
                <strong>палочками для пузырей</strong> можно выдувать огромные, переливающиеся пузыри,
                которые удивят любого – на дне рождения, выпускном, свадьбе, фотосессии или просто во дворе.
              </p>
              <p>
                Предлагаем концентрат для мыльных пузырей в упаковке 3 л и 5 л, палочки для пузырей от 50 до
                90 см и наборы {partyBox}. Заказ можно забрать в Риге или получить с доставкой в пакомат по
                всей Латвии.
              </p>
            </>
          )}
          {lang === "en" && (
            <>
              <p>
                Soap bubbles are one of the easiest ways to delight both kids and grown-ups. With our
                professional <strong>soap bubble solution</strong> and big <strong>bubble wands</strong> you
                can blow huge, shimmering bubbles that amaze everyone – at a birthday, graduation, wedding,
                photo shoot or simply in the garden.
              </p>
              <p>
                We offer soap bubble concentrate in 3 L and 5 L packs, bubble wands from 50 to 90 cm and{" "}
                {partyBox} sets. Collect your order in Riga or have it delivered to a parcel locker anywhere in
                Latvia.
              </p>
            </>
          )}
        </div>

        <h2 className="mt-14 text-2xl font-black text-gray-900 lg:text-3xl">{t.faq}</h2>
        <div className="mt-6 divide-y divide-pink-100 rounded-3xl border border-pink-100 bg-[#FFF7FB]">
          {items.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-gray-900">
                {item.q}
                <span className="text-2xl text-pink-500 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-7 text-gray-600">
                {item.a}
                {item.animatorsLink && (
                  <>
                    {" "}
                    <Link
                      href={lp(lang, "/pasakumu-organizesana/animatori")}
                      className="font-semibold text-pink-600 hover:underline"
                    >
                      {t.animators}
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
