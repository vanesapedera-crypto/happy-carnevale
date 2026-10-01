import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import HelovinsEventSection from "@/components/events/HelovinsEventSection";

export const metadata: Metadata = {
  title: "Helovīna ballīte bērniem – programma un aktivitātes | Happy Carnevale",
  description:
    "Helovīna ballīte bērniem: spocīgi uzdevumi, tematiskie tetovējumi, radošā darbnīca, tumsas disenīte un raganu dziras. Programmu pielāgojam Tavam datumam un vietai.",
};

export default function HelovinsPasakumsPage() {
  return (
    <>
      <PageHero
        badge="PASĀKUMU ORGANIZĒŠANA"
        title="Helovīns"
        description="Vēlies ballīti Helovīna noskaņās? Mēs to varam realizēt!"
        image="/images/hero/helovins.png"
      />

      <HelovinsEventSection />
    </>
  );
}
