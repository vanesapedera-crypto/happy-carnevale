import Link from "next/link";
import {
  CheckCircle2,
  Palette,
  Sparkles,
  Clock3,
} from "lucide-react";

import FacePaintGallery from "./FacePaintingGallery";
import { lp, tr, type Lang } from "@/lib/i18n";

const TX = {
  lv: {
    many1: "Ja pasākumā ir vairāk kā",
    many2: "20 bērni",
    many3: ", iesakām izvēlēties sejas akcentus vai gleznojumus, kas ietver pusi sejas, lai ikviens bērns tiktu pie kārotā.",
  },
  ru: {
    many1: "Если на празднике больше",
    many2: "20 детей",
    many3: ", советуем выбрать небольшие акценты или рисунки на половину лица, чтобы каждый ребёнок получил желаемое.",
  },
  en: {
    many1: "If there are more than",
    many2: "20 children",
    many3: " at the event, we recommend small accents or half-face designs so every child gets their turn.",
  },
};

export default function AboutSection({ lang }: { lang: Lang }) {
  const t = TX[lang];
  const title = tr(lang, { lv: "Sejas apgleznošana", ru: "Аквагрим", en: "Face painting" });
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">

                    {/* Galerija */}
                 <FacePaintGallery altLabel={title} />
          
                    {/* Saturs */}
                    <div>

          <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-pink-600">
              {title}
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight text-[#17223b] sm:text-5xl">
              {title}
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 lg:text-lg lg:leading-8">
              {tr(lang, { lv: "Jūsu pasākumā ieradīsies profesionāla sejiņu apgleznotāja, kura radīs skaistus, oriģinālus gleznojumus.", ru: "На ваш праздник приедет профессиональный аквагрим-художник, который создаст красивые и оригинальные рисунки.", en: "A professional face painter will come to your event and create beautiful, original designs." })}
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600 lg:text-lg lg:leading-8">
              {tr(lang, { lv: "Princeses, supervaroņi, vienradži, dzīvnieki, tauriņi, dinozauri - Jūs izvēlaties - mēs radām!", ru: "Принцессы, супергерои, единороги, животные, бабочки, динозавры – вы выбираете, мы рисуем!", en: "Princesses, superheroes, unicorns, animals, butterflies, dinosaurs – you choose, we paint!" })}
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600 lg:text-lg lg:leading-8">
              {t.many1} <strong>{t.many2}</strong>{t.many3}
            </p>

            {/* Ieguvumi */}

            <div className="mt-8 grid gap-3">

              {[
                {
                  icon: Palette,
                  text: { lv: "Profesionālas hipoalerģiskas krāsas", ru: "Профессиональные гипоаллергенные краски", en: "Professional hypoallergenic paints" },
                },
                {
                  icon: Sparkles,
                  text: { lv: "100+ dažādu dizainu", ru: "Более 100 разных дизайнов", en: "100+ different designs" },
                },
                {
                  icon: Clock3,
                  text: { lv: "Ātra un kvalitatīva apgleznošana", ru: "Быстро и качественно", en: "Quick, high-quality painting" },
                },
                {
                  icon: CheckCircle2,
                  text: { lv: "Piemērots visiem vecumiem", ru: "Подходит для любого возраста", en: "Suitable for all ages" },
                },
              ].map((item) => (
                <div
                  key={item.text.lv}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 lg:rounded-2xl lg:p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-100 lg:h-10 lg:w-10">
                    <item.icon
                      size={18}
                      className="text-pink-500"
                    />
                  </div>

                  <span className="text-sm font-medium text-gray-700 lg:text-base">
                    {tr(lang, item.text)}
                  </span>
                </div>
              ))}

            </div>

            {/* Cenas */}

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4 lg:mt-10 lg:rounded-3xl lg:p-6">

              <h3 className="mb-4 text-lg font-bold lg:mb-5 lg:text-xl">
                {tr(lang, { lv: "Pakalpojuma cenas", ru: "Цены на услугу", en: "Prices" })}
              </h3>

              <div className="space-y-3">

                <div className="flex items-center justify-between rounded-xl bg-white p-4 lg:rounded-2xl lg:p-5">

                  <div>
                    <div className="font-semibold text-sm lg:text-base">
                      {tr(lang, { lv: "1,5 stundas", ru: "1,5 часа", en: "1.5 hours" })}
                    </div>

                    <div className="text-xs text-gray-500 lg:text-sm">
                      {tr(lang, { lv: "Ideāli piemērots mazākām ballītēm", ru: "Идеально для небольших праздников", en: "Ideal for smaller parties" })}
                    </div>
                  </div>

                  <div className="text-xl font-black lg:text-2xl">
                    150 €
                  </div>

                </div>

                <div className="relative flex items-center justify-between rounded-xl border-2 border-pink-500 bg-white p-4 lg:rounded-2xl lg:p-5">

                  <span className="absolute -top-3 right-3 rounded-full bg-pink-500 px-2 py-1 text-[10px] font-bold text-white lg:right-5 lg:px-3 lg:text-xs">
                    {tr(lang, { lv: "Populārākā izvēle", ru: "Самый популярный выбор", en: "Most popular" })}
                  </span>

                  <div>
                    <div className="font-semibold text-sm lg:text-base">
                      {tr(lang, { lv: "2 stundas", ru: "2 часа", en: "2 hours" })}
                    </div>

                    <div className="text-xs text-gray-500 lg:text-sm">
                      {tr(lang, { lv: "Lielākām bērnu grupām", ru: "Для больших групп детей", en: "For larger groups of children" })}
                    </div>
                  </div>

                  <div className="text-xl font-black text-pink-600 lg:text-2xl">
                    170 €
                  </div>

                </div>

              </div>

              <Link
                href={lp(lang, "/rezervacija-pasakumiem")}
                className="mt-5 flex h-12 items-center justify-center rounded-xl bg-pink-500 text-base font-bold text-white transition hover:bg-pink-600 lg:mt-6 lg:h-14 lg:rounded-2xl lg:text-lg"
              >
                {tr(lang, { lv: "Rezervēt", ru: "Забронировать", en: "Book now" })}
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}