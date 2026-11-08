import type { Metadata } from "next";
import SectionNav from "@/components/costumes/SectionNav";
import CostumeHero from "@/components/costumes/CostumeHero";
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
    <main className="scroll-smooth bg-[#F8F9FC] pb-16">
      <CostumeHero
        lang={lang}
        sectionKeys={["smiekligi-teli", "retro-kostimi", "uzvalki", "parukas"]}
        title={{
          lv: "Smieklīgu tēlu un parūku noma",
          ru: "Аренда смешных костюмов и париков",
          en: "Funny character and wig rental",
        }}
        description={{
          lv: "Izvēlies dažādus kostīmus bērnu ballītēm, tematiskajiem pasākumiem un karnevāliem.",
          ru: "Выбирайте разные костюмы для детских праздников, тематических мероприятий и карнавалов.",
          en: "Pick from all kinds of costumes for kids' parties, themed events and carnivals.",
        }}
      />

      <SectionNav
        label={tr(lang, { lv: "Sadaļas", ru: "Разделы", en: "Sections" })}
        items={[
          { id: "smiekligi", label: tr(lang, { lv: "Smieklīgi tēli", ru: "Смешные персонажи", en: "Funny characters" }) },
          { id: "retro", label: tr(lang, { lv: "Retro", ru: "Ретро", en: "Retro" }) },
          { id: "uzvalki", label: tr(lang, { lv: "Uzvalki", ru: "Костюмы-тройки", en: "Suits" }) },
          { id: "parukas", label: tr(lang, { lv: "Parūkas", ru: "Парики", en: "Wigs" }) },
        ]}
      />

      <section id="smiekligi" className="scroll-mt-40 lg:scroll-mt-48">
        <SmiekligiTeliSection lang={lang} />
      </section>


      <section id="retro" className="scroll-mt-40 lg:scroll-mt-48">
        <RetroSection lang={lang} />
      </section>

      <section id="uzvalki" className="scroll-mt-40 lg:scroll-mt-48">
        <UzvalkiSection lang={lang} />
      </section>

       <section id="parukas" className="scroll-mt-40 lg:scroll-mt-48">
        <ParukasSection lang={lang} />
      </section>
    </main>
  );
}