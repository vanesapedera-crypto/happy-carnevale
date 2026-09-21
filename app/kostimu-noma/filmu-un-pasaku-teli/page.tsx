import PageHero from "@/components/common/PageHero";

import PrincessesSection from "@/components/costumes/PrincessesSection";
import SuperheroesSection from "@/components/costumes/SuperheroesSection";
import MultfilmuSection from "@/components/costumes/MultfilmuSection";
import ProfessionsSection from "@/components/costumes/ProfessionsSection";
import DzivniekiSection from "@/components/costumes/DzivniekiSection";

export default function FilmuUnPasakuTeliPage() {
  return (
    <>
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Filmu un multfilmu tēli"
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