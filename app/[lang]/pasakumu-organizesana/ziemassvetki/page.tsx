import type { Metadata } from "next";
import ZiemassvetkiEventSection from "@/components/events/ZiemassvetkiEventSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/pasakumu-organizesana/ziemassvetki", {
    title: {
      lv: "Ziemassvētku programma bērniem – Rūķītis, Ziemassvētku vecītis, Grinčs | Happy Carnevale",
      ru: "Новогодняя программа для детей – гном, Дед Мороз, Гринч | Happy Carnevale",
      en: "Christmas show for kids – elf, Santa Claus, Grinch | Happy Carnevale",
    },
    description: {
      lv: "Ziemassvētku izklaides programma bērniem bērnudārzā, skolā vai Jūsu pasākuma vietā: teatrāls uzvedums, rotaļas, dejas un dāvaniņu izdalīšana. Bez steigas un piespiedu dzejolīšiem!",
      ru: "Новогодняя развлекательная программа для детей в детском саду, школе или на вашей площадке: театральное представление, игры, танцы и раздача подарков. Без спешки и стихов по принуждению!",
      en: "A Christmas entertainment show for kids at kindergarten, school or your venue: a theatrical performance, games, dancing and gift giving. No rush and no forced rhymes!",
    },
  });
}

export default async function ZiemassvetkiPasakumsPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <ZiemassvetkiEventSection lang={lang} />
  );
}
