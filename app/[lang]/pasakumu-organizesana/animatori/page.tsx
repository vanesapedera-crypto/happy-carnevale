import type { Metadata } from "next";
import AnimatorHero from "@/components/events/AnimatorHero";
import ProgramSection from "@/components/events/ProgramSection";
import PricingSection from "@/components/events/PricingSection";
import ExtrasSection from "@/components/events/ExtrasSection";
import GalleryContent from "@/components/events/GalleryContent";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/pasakumu-organizesana/animatori", {
    title: {
      lv: "Animatori bērnu ballītēm Rīgā un Latvijā | Happy Carnevale",
      ru: "Аниматоры на детский праздник в Риге и Латвии | Happy Carnevale",
      en: "Kids' party entertainers in Riga and Latvia | Happy Carnevale",
    },
    description: {
      lv: "Jautri animatori bērnu ballītēm, dzimšanas dienām un pasākumiem Rīgā un visā Latvijā: iemīļoti tēli, programmas un papildu aktivitātes.",
      ru: "Весёлые аниматоры на детские праздники, дни рождения и мероприятия в Риге и по всей Латвии: любимые персонажи, программы и дополнительные развлечения.",
      en: "Fun entertainers for kids' parties, birthdays and events in Riga and all over Latvia: favourite characters, party programmes and extra activities.",
    },
  });
}

export default async function AnimatoriPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <AnimatorHero lang={lang} />
      <ProgramSection lang={lang} />
      <PricingSection lang={lang} />
      <ExtrasSection lang={lang} />
      <GalleryContent lang={lang} />
    </>
  );
}
