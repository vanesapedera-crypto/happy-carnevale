import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ParukasSection from "@/components/costumes/ParukasSection";

export const metadata: Metadata = {
  title: "Parūku noma ballītēm un karnevāliem | Happy Carnevale",
  description:
    "Krāsainu, smieklīgu un tēliem atbilstošu parūku noma ballītēm, karnevāliem un pasākumiem. Rīgā un visā Latvijā.",
};

export default function ParukasPage() {
  return (
    <>
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Parūku noma"
        description="Krāsainas, smieklīgas un tēliem atbilstošas parūkas dažādiem pasākumiem, kostīmiem un svētkiem."
        image="/images/hero/parukas.png"
      />

      <ParukasSection />
    </>
  );
}