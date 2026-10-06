import type { Metadata } from "next";

import AnimatorHero from "@/components/events/AnimatorHero";

import ProgramSection from "@/components/events/ProgramSection";
import PricingSection from "@/components/events/PricingSection";
import ExtrasSection from "@/components/events/ExtrasSection";
import GalleryContent from "@/components/events/GalleryContent";

export const metadata: Metadata = {
  title: "Animatori bērnu ballītēm Rīgā un Latvijā | Happy Carnevale",
  description:
    "Jautri animatori bērnu ballītēm, dzimšanas dienām un pasākumiem Rīgā un visā Latvijā: iemīļoti tēli, programmas un papildu aktivitātes.",
};

export default function AnimatoriPage() {
  return (
    <>
      <AnimatorHero/>

      <ProgramSection />

      <PricingSection />

      <ExtrasSection />

 <GalleryContent />
    </>
  );
}