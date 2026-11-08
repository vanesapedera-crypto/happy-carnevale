import type { Metadata } from "next";
import HelovinsEventSection from "@/components/events/HelovinsEventSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/pasakumu-organizesana/helovins", {
    title: {
      lv: "Helovīna ballīte bērniem – programma un aktivitātes | Happy Carnevale",
      ru: "Хэллоуин для детей – программа и развлечения | Happy Carnevale",
      en: "Halloween party for kids – programme and activities | Happy Carnevale",
    },
    description: {
      lv: "Helovīna ballīte bērniem: spocīgi uzdevumi, tematiskie tetovējumi, radošā darbnīca, tumsas disenīte un raganu dziras. Programmu pielāgojam Tavam datumam un vietai.",
      ru: "Праздник Хэллоуина для детей: жуткие задания, тематические тату, творческая мастерская, дискотека в темноте и ведьмины зелья. Программу подстроим под вашу дату и место.",
      en: "A Halloween party for kids: spooky challenges, themed tattoos, a craft workshop, a glow disco and witches' potions. We tailor the programme to your date and venue.",
    },
  });
}

export default async function HelovinsPasakumsPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <HelovinsEventSection lang={lang} />
  );
}
