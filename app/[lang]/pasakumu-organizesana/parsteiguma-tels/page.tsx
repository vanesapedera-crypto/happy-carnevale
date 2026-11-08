import type { Metadata } from "next";
import SurpriseCharacterSection from "@/components/events/SurpriseCharacterSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/pasakumu-organizesana/parsteiguma-tels", {
    title: {
      lv: "Pārsteiguma tēls apsveikumam mājās vai birojā | Happy Carnevale",
      ru: "Персонаж-сюрприз для поздравления дома или в офисе | Happy Carnevale",
      en: "Surprise character visit at home or the office | Happy Carnevale",
    },
    description: {
      lv: "Pārsteiguma tēls bērnu svētkiem, dzimšanas dienām un īpašiem notikumiem.",
      ru: "Персонаж-сюрприз на детский праздник, день рождения или особое событие.",
      en: "A surprise character visit for kids' parties, birthdays and special occasions.",
    },
  });
}

export default async function SurpriseCharacterPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <SurpriseCharacterSection lang={lang} />
  );
}
