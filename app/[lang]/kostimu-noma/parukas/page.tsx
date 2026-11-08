import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ParukasSection from "@/components/costumes/ParukasSection";
import { pageMetadata, toLang, tr } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/parukas", {
    title: {
      lv: "Parūku noma ballītēm un karnevāliem | Happy Carnevale",
      ru: "Аренда париков для вечеринок и карнавалов | Happy Carnevale",
      en: "Wig rental for parties and carnivals | Happy Carnevale",
    },
    description: {
      lv: "Krāsainu, smieklīgu un tēliem atbilstošu parūku noma ballītēm, karnevāliem un pasākumiem. Rīgā un visā Latvijā.",
      ru: "Аренда ярких, смешных и тематических париков для вечеринок, карнавалов и мероприятий. В Риге и по всей Латвии.",
      en: "Colourful, funny and character wig rental for parties, carnivals and events. In Riga and all over Latvia.",
    },
  });
}

export default async function ParukasPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <PageHero
        badge={tr(lang, { lv: "KOSTĪMU NOMA", ru: "АРЕНДА КОСТЮМОВ", en: "COSTUME RENTAL" })}
        title={tr(lang, {
          lv: "Parūku noma",
          ru: "Аренда париков",
          en: "Wig rental",
        })}
        description={tr(lang, {
          lv: "Krāsainas, smieklīgas un tēliem atbilstošas parūkas dažādiem pasākumiem, kostīmiem un svētkiem.",
          ru: "Яркие, смешные и подходящие к образу парики для разных мероприятий, костюмов и праздников.",
          en: "Colourful, funny and character wigs for all kinds of events, costumes and parties.",
        })}
        image="/images/hero/parukas.jpg"
      />

      <ParukasSection lang={lang} />
    </>
  );
}
