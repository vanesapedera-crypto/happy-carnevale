import type { Metadata } from "next";
import AboutSection from "@/components/facepainting/AboutSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/pasakumu-organizesana/sejas-apgleznosana", {
    title: {
      lv: "Sejas apgleznošana bērnu svētkos | Happy Carnevale",
      ru: "Аквагрим на детском празднике | Happy Carnevale",
      en: "Face painting for kids' parties | Happy Carnevale",
    },
    description: {
      lv: "Profesionāla sejas apgleznošana bērnu svētkiem, festivāliem un pasākumiem.",
      ru: "Профессиональный аквагрим для детских праздников, фестивалей и мероприятий.",
      en: "Professional face painting for kids' parties, festivals and events.",
    },
  });
}

export default async function FacePaintingPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <AboutSection lang={lang} />
  );
}
