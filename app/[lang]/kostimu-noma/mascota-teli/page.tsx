import type { Metadata } from "next";
import CostumeHero from "@/components/costumes/CostumeHero";
import MascotaSection from "@/components/costumes/MascotaSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/mascota-teli", {
    title: {
      lv: "Mascota tēlu noma Rīgā un Latvijā | Happy Carnevale",
      ru: "Аренда ростовых кукол в Риге и Латвии | Happy Carnevale",
      en: "Mascot costume rental in Riga and Latvia | Happy Carnevale",
    },
    description: {
      lv: "Lielizmēra mascota tēlu noma bērnu ballītēm, uzņēmumu pasākumiem un reklāmas akcijām. Iemīļoti tēli un ērta rezervācija tiešsaistē.",
      ru: "Аренда ростовых кукол для детских праздников, корпоративов и рекламных акций. Любимые персонажи и удобное бронирование онлайн.",
      en: "Full-size mascot costume rental for kids' parties, corporate events and promotions. Favourite characters and easy online booking.",
    },
  });
}

export default async function MascotaTeliPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <CostumeHero
        lang={lang}
        sectionKeys={["mascota-teli"]}
        title={{
          lv: "Mascota tēlu noma",
          ru: "Аренда ростовых кукол",
          en: "Mascot costume rental",
        }}
        description={{
          lv: "Lielizmēra Mascota kostīmi bērnu ballītēm, uzņēmumu pasākumiem, reklāmas aktivitātēm un svētkiem. Iecienītākie tēli, kas rada neaizmirstamas emocijas.",
          ru: "Ростовые куклы для детских праздников, корпоративов, рекламных акций и торжеств. Любимые персонажи, которые дарят незабываемые эмоции.",
          en: "Full-size mascot costumes for kids' parties, corporate events, promotions and celebrations. Favourite characters that create unforgettable moments.",
        }}
      />

      <MascotaSection lang={lang} />
    </>
  );
}
