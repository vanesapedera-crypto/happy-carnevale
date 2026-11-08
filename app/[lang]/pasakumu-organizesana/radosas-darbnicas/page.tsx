import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import RadosasDarbnicasSection from "@/components/events/RadosasDarbnicasSection";
import { pageMetadata, toLang, tr } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/pasakumu-organizesana/radosas-darbnicas", {
    title: {
      lv: "Radošās darbnīcas bērnu svētkiem un pasākumiem | Happy Carnevale",
      ru: "Творческие мастерские для детских праздников и мероприятий | Happy Carnevale",
      en: "Creative workshops for kids' parties and events | Happy Carnevale",
    },
    description: {
      lv: "Radošas un pielāgojamas darbnīcas bērnu svētkiem, uzņēmumu pasākumiem un bērnu dienām Rīgā un visā Latvijā.",
      ru: "Творческие мастер-классы на заказ для детских праздников, корпоративов и детских дней в Риге и по всей Латвии.",
      en: "Creative, customisable workshops for kids' parties, corporate events and children's days in Riga and all over Latvia.",
    },
  });
}

export default async function RadosasDarbnicasPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <PageHero
        badge={tr(lang, { lv: "PASĀKUMU ORGANIZĒŠANA", ru: "ОРГАНИЗАЦИЯ ПРАЗДНИКОВ", en: "PARTY SERVICES" })}
        title={tr(lang, { lv: "Radošās darbnīcas", ru: "Творческие мастерские", en: "Creative workshops" })}
        description={tr(lang, {
          lv: "Radošas un pielāgojamas darbnīcas pasākumiem, uzņēmumu svētkiem un bērnu dienām.",
          ru: "Творческие мастер-классы на заказ для мероприятий, корпоративов и детских дней.",
          en: "Creative, customisable workshops for events, company parties and children's days.",
        })}
        image="/images/hero/radosas-darbnicas.jpg"
      />

      <RadosasDarbnicasSection lang={lang} />
    </>
  );
}
