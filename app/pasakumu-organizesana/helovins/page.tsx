import type { Metadata } from "next";
import HelovinsEventSection from "@/components/events/HelovinsEventSection";

export const metadata: Metadata = {
  title: "Helovīna ballīte bērniem – programma un aktivitātes | Happy Carnevale",
  description:
    "Helovīna ballīte bērniem: spocīgi uzdevumi, tematiskie tetovējumi, radošā darbnīca, tumsas disenīte un raganu dziras. Programmu pielāgojam Tavam datumam un vietai.",
};

export default function HelovinsPasakumsPage() {
  return (
    <HelovinsEventSection />
  );
}
