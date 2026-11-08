import type { Metadata } from "next";
import CostumeHero from "@/components/costumes/CostumeHero";
import LieldienasSection from "@/components/costumes/LieldienasSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/lieldienas", {
    title: {
      lv: "Lieldienu kostīmu noma – zaķu tērpi | Happy Carnevale",
      ru: "Аренда пасхальных костюмов – костюмы зайцев | Happy Carnevale",
      en: "Easter costume rental – bunny costumes | Happy Carnevale",
    },
    description: {
      lv: "Lieldienu kostīmu noma: zaķu tērpi un citi svētku tēli pasākumiem. Rezervē tiešsaistē – Rīgā un visā Latvijā.",
      ru: "Аренда пасхальных костюмов: костюмы зайцев и другие праздничные персонажи для мероприятий. Бронируйте онлайн – в Риге и по всей Латвии.",
      en: "Easter costume rental: bunny costumes and other festive characters for events. Book online – in Riga and all over Latvia.",
    },
  });
}

export default async function LieldienasPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <CostumeHero
        lang={lang}
        sectionKeys={["lieldienu-kostimi"]}
        title={{ lv: "Lieldienu kostīmu noma", ru: "Аренда пасхальных костюмов", en: "Easter costume rental" }}
        description={{ lv: "Zaķu tērpi un citi svētku tēli Lieldienu pasākumiem.", ru: "Костюмы зайцев и другие праздничные персонажи для пасхальных мероприятий.", en: "Bunny costumes and other festive characters for Easter events." }}
      />
      <LieldienasSection lang={lang} />
    </>
  );
}
