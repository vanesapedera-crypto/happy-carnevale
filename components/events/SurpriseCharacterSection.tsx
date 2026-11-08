import Link from "next/link";
import {
  PartyPopper,
  Gamepad2,
  Camera,
  Cake,
  Sparkles,
} from "lucide-react";

import { SURPRISE_GALLERY_KEY } from "@/lib/admin/sections";
import { loadGalleryImages } from "@/lib/gallery";
import SurpriseGallery from "./SurpriseGallery";
import { lp, tr, type Lang } from "@/lib/i18n";

/** Iebūvētie attēli: tiek rādīti, ja admin panelī galerijā nav neviena attēla. */
const BUILT_IN_IMAGES = [
  "/images/surprise/1.jpg",
  "/images/surprise/2.jpg",
  "/images/surprise/3.jpg",
  "/images/surprise/4.jpg",
  "/images/surprise/5.jpg",
  "/images/surprise/6.jpg",
  "/images/surprise/7.jpg",
  "/images/surprise/8.jpg",
  "/images/surprise/9.jpg",
  "/images/surprise/10.jpg",
];

const TX = {
  lv: {
    intro1a: "Pārsteiguma tēls ierodas Jūsu pasākumā uz",
    intro1b: "25–30 minūtēm",
    intro1c: ", lai radītu neaizmirstamu pārsteigumu, prieku un daudz smaidu.",
    intro2:
      "Vizītes laikā tēls sasveicinās ar jubilāru, fotografēsies ar viesiem un kopīgi radīs skaistas atmiņas.",
  },
  ru: {
    intro1a: "Персонаж-сюрприз приходит на ваш праздник на",
    intro1b: "25–30 минут",
    intro1c: ", чтобы устроить незабываемый сюрприз и подарить радость и море улыбок.",
    intro2:
      "Во время визита персонаж поздравит именинника, сфотографируется с гостями и вместе с вами создаст прекрасные воспоминания.",
  },
  en: {
    intro1a: "A surprise character visits your event for",
    intro1b: "25–30 minutes",
    intro1c: " to create an unforgettable surprise, lots of joy and plenty of smiles.",
    intro2:
      "During the visit the character greets the birthday star, poses for photos with the guests and helps create lovely memories.",
  },
};

export default async function SurpriseCharacterSection({ lang }: { lang: Lang }) {
  const t = TX[lang];
  const character = tr(lang, { lv: "Pārsteiguma tēls", ru: "Персонаж-сюрприз", en: "Surprise character" });
  const images = await loadGalleryImages(SURPRISE_GALLERY_KEY, BUILT_IN_IMAGES);

  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Galerija */}
          <SurpriseGallery images={images} altLabel={character} />

          {/* Saturs */}
          <div>

            <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-pink-600">
              {tr(lang, { lv: "Pārsteiguma tēli", ru: "Персонажи-сюрпризы", en: "Surprise characters" })}
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight text-[#17223b] sm:text-5xl">
              {character}
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-600 lg:text-lg">
              {t.intro1a}
              <strong> {t.intro1b}</strong>
              {t.intro1c}
            </p>

            <p className="mt-4 text-base leading-8 text-gray-600 lg:text-lg">{t.intro2}</p>

            {/* Ieguvumi */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              {[
                {
                  icon: PartyPopper,
                  text: { lv: "Apsveikums jubilāram", ru: "Поздравление именинника", en: "Birthday greeting" },
                },
                {
                  icon: Gamepad2,
                  text: { lv: "Jautra rotaļa", ru: "Весёлая игра", en: "A fun game" },
                },
                {
                  icon: Camera,
                  text: { lv: "Kopīgas fotogrāfijas", ru: "Совместные фото", en: "Photos together" },
                },
                {
                  icon: Cake,
                  text: { lv: "Kūkas pasniegšana", ru: "Вынос торта", en: "Bringing in the cake" },
                },
              ].map((item) => (
                <div
                  key={item.text.lv}
                  className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100">
                    <item.icon
                      size={20}
                      className="text-pink-500"
                    />
                  </div>

                  <span className="font-semibold text-gray-700">
                    {tr(lang, item.text)}
                  </span>
                </div>
              ))}

            </div>

            {/* Cena */}
            <div className="mt-10 rounded-[32px] bg-gradient-to-br from-pink-50 via-white to-pink-100 p-6 shadow-xl">

              <h3 className="text-xl font-black text-[#17223b]">
                {tr(lang, { lv: "Pakalpojuma cena", ru: "Стоимость услуги", en: "Price" })}
              </h3>

              <div className="mt-6 rounded-3xl border-2 border-pink-500 bg-white p-6 shadow-md">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2 font-bold text-[#17223b]">
                      <Sparkles
                        size={18}
                        className="text-pink-500"
                      />

                      {character}
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      {tr(lang, { lv: "Vizītes ilgums 25–30 minūtes", ru: "Продолжительность визита 25–30 минут", en: "Visit length 25–30 minutes" })}
                    </p>

                  </div>

                  <div className="text-4xl font-black text-pink-600">
                    110 €
                  </div>

                </div>

              </div>

              <Link
                href={lp(lang, "/rezervacija-pasakumiem")}
                className="mt-6 flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl"
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