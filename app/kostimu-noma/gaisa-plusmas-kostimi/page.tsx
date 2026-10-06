import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import GaisaPlusmasSection from "@/components/costumes/GaisaPlusmasSection";

export const metadata: Metadata = {
  title: "Gaisa plūsmas (piepūšamo) kostīmu noma | Happy Carnevale",
  description:
    "Piepūšamo gaisa plūsmas kostīmu noma: dinozauri, vienradži, sumo un citi tēli ballītēm un pasākumiem. Rīgā un visā Latvijā.",
};

export default function GaisaPlusmasKostimiPage() {
  return (
    <>
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Gaisa plūsmas kostīmu noma"
        description="Krāsaini un iespaidīgi piepūšamie kostīmi bērnu ballītēm, tematiskajiem pasākumiem un svētkiem."
        image="/images/hero/gaisa-plusmas.png"
      />

      <GaisaPlusmasSection />
    </>
  );
}