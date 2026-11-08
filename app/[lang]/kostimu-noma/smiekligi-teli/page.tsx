import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import SmiekligiTeliSection from "@/components/costumes/SmiekligiTeliSection";
import RetroSection from "@/components/costumes/RetroSection";
import UzvalkiSection from "@/components/costumes/UzvalkiSection";
import ParukasSection from "@/components/costumes/ParukasSection";

import { pageMetadata, toLang, tr } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/smiekligi-teli", {
    title: {
      lv: "Smieklīgu kostīmu, retro tērpu un parūku noma | Happy Carnevale",
      ru: "Аренда смешных костюмов, ретро-нарядов и париков | Happy Carnevale",
      en: "Funny costume, retro outfit and wig rental | Happy Carnevale",
    },
    description: {
      lv: "Smieklīgu kostīmu, retro un disko tērpu, košu uzvalku un parūku noma ballītēm un tematiskajiem pasākumiem. Rīgā un visā Latvijā.",
      ru: "Аренда смешных костюмов, ретро- и диско-нарядов, ярких костюмов-троек и париков для вечеринок и тематических мероприятий. В Риге и по всей Латвии.",
      en: "Funny costumes, retro and disco outfits, bright suits and wigs for rent for parties and themed events. In Riga and all over Latvia.",
    },
  });
}

export default async function CitiTeliPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <main className="scroll-smooth bg-white pb-16">
      <PageHero
        badge={tr(lang, { lv: "KOSTĪMU NOMA", ru: "АРЕНДА КОСТЮМОВ", en: "COSTUME RENTAL" })}
        title={tr(lang, {
          lv: "Smieklīgu tēlu un parūku noma",
          ru: "Аренда смешных костюмов и париков",
          en: "Funny character and wig rental",
        })}
        description={tr(lang, {
          lv: "Izvēlies dažādus kostīmus bērnu ballītēm, tematiskajiem pasākumiem un karnevāliem.",
          ru: "Выбирайте разные костюмы для детских праздников, тематических мероприятий и карнавалов.",
          en: "Pick from all kinds of costumes for kids' parties, themed events and carnivals.",
        })}
        image="/images/hero/citi-teli.jpg"
      />

      {/* Navigācija */}
      <div className="relative z-20 bg-white py-2 shadow-sm">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6">
          <a
            href="#smiekligi"
            className="whitespace-nowrap rounded-full bg-violet-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
          >
            {tr(lang, { lv: "Smieklīgi tēli", ru: "Смешные персонажи", en: "Funny characters" })}
          </a>

          <a
            href="#uzvalki"
            className="whitespace-nowrap rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            {tr(lang, { lv: "Uzvalki", ru: "Костюмы-тройки", en: "Suits" })}
          </a>

          <a
            href="#retro"
            className="whitespace-nowrap rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            {tr(lang, { lv: "Retro", ru: "Ретро", en: "Retro" })}
          </a>

            <a
            href="#parukas"
            className="whitespace-nowrap rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            {tr(lang, { lv: "Parūkas", ru: "Парики", en: "Wigs" })}
          </a>
        </div>
      </div>

      <section id="smiekligi" className="scroll-mt-24">
        <SmiekligiTeliSection lang={lang} />
      </section>


      <section id="retro" className="scroll-mt-24">
        <RetroSection lang={lang} />
      </section>

      <section id="uzvalki" className="scroll-mt-24">
        <UzvalkiSection lang={lang} />
      </section>

       <section id="parukas" className="scroll-mt-24">
        <ParukasSection lang={lang} />
      </section>
    </main>
  );
}