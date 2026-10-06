import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";

import PrincessesSection from "@/components/costumes/PrincessesSection";
import SuperheroesSection from "@/components/costumes/SuperheroesSection";
import MultfilmuSection from "@/components/costumes/MultfilmuSection";
import ProfessionsSection from "@/components/costumes/ProfessionsSection";
import DzivniekiSection from "@/components/costumes/DzivniekiSection";

export const metadata: Metadata = {
  title: "Kino un multfilmu tēlu kostīmu noma | Happy Carnevale",
  description:
    "Kino, multfilmu un pasaku tēlu kostīmu noma: princeses, supervaroņi, profesiju un dzīvnieku tērpi ballītēm un karnevāliem. Rīgā un visā Latvijā.",
};

export default function FilmuUnPasakuTeliPage() {
  return (
    <>
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Kino tēlu un citu kostīmu noma"
        description="Izvēlies iemīļotākos filmu, multfilmu un pasaku varoņus bērnu ballītēm, tematiskajiem pasākumiem un karnevāliem."
        image="/images/hero/filmu-teli.png"
      />

      <PrincessesSection />
      <SuperheroesSection />
      <MultfilmuSection />
      <ProfessionsSection />
      <DzivniekiSection />
    </>
  );
}