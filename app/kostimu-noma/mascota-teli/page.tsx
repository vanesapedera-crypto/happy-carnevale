import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import MascotaSection from "@/components/costumes/MascotaSection";

export const metadata: Metadata = {
  title: "Mascota tēlu noma Rīgā un Latvijā | Happy Carnevale",
  description:
    "Lielizmēra mascota tēlu noma bērnu ballītēm, uzņēmumu pasākumiem un reklāmas akcijām. Iemīļoti tēli un ērta rezervācija tiešsaistē.",
};

export default function MascotaTeliPage() {
  return (
    <>
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Mascota tēlu noma"
        description="Lielizmēra Mascota kostīmi bērnu ballītēm, uzņēmumu pasākumiem, reklāmas aktivitātēm un svētkiem. Iecienītākie tēli, kas rada neaizmirstamas emocijas."
        image="/images/hero/mascota.png"
      />

      <MascotaSection />
    </>
  );
}