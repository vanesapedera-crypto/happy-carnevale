import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import RadosasDarbnicasSection from "@/components/events/RadosasDarbnicasSection";

export const metadata: Metadata = {
  title: "Radošās darbnīcas bērnu svētkiem un pasākumiem | Happy Carnevale",
  description:
    "Radošas un pielāgojamas darbnīcas bērnu svētkiem, uzņēmumu pasākumiem un bērnu dienām Rīgā un visā Latvijā.",
};

export default function RadosasDarbnicasPage() {
  return (
    <>
      <PageHero
        badge="PASĀKUMU ORGANIZĒŠANA"
        title="Radošās darbnīcas"
        description="Radošas un pielāgojamas darbnīcas pasākumiem, uzņēmumu svētkiem un bērnu dienām."
        image="/images/hero/radosas-darbnicas.png"
      />

      <RadosasDarbnicasSection />
    </>
  );
}