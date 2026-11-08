import type { Metadata } from "next";
import CostumeHero from "@/components/costumes/CostumeHero";
import GaisaPlusmasSection from "@/components/costumes/GaisaPlusmasSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/gaisa-plusmas-kostimi", {
    title: {
      lv: "Gaisa plūsmas (piepūšamo) kostīmu noma | Happy Carnevale",
      ru: "Аренда надувных костюмов | Happy Carnevale",
      en: "Inflatable costume rental | Happy Carnevale",
    },
    description: {
      lv: "Piepūšamo gaisa plūsmas kostīmu noma: dinozauri, vienradži, sumo un citi tēli ballītēm un pasākumiem. Rīgā un visā Latvijā.",
      ru: "Аренда надувных костюмов: динозавры, единороги, сумоисты и другие персонажи для вечеринок и мероприятий. В Риге и по всей Латвии.",
      en: "Inflatable costume rental: dinosaurs, unicorns, sumo wrestlers and more for parties and events. In Riga and all over Latvia.",
    },
  });
}

export default async function GaisaPlusmasKostimiPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <CostumeHero
        lang={lang}
        sectionKeys={["gaisa-plusmas-kostimi"]}
        title={{
          lv: "Gaisa plūsmas kostīmu noma",
          ru: "Аренда надувных костюмов",
          en: "Inflatable costume rental",
        }}
        description={{
          lv: "Krāsaini un iespaidīgi piepūšamie kostīmi bērnu ballītēm, tematiskajiem pasākumiem un svētkiem.",
          ru: "Яркие и эффектные надувные костюмы для детских праздников, тематических мероприятий и торжеств.",
          en: "Colourful, eye-catching inflatable costumes for kids' parties, themed events and celebrations.",
        }}
      />

      <GaisaPlusmasSection lang={lang} />
    </>
  );
}
