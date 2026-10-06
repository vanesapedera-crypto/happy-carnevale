import type { Metadata } from "next";
import LieldienasSection from "@/components/costumes/LieldienasSection";

export const metadata: Metadata = {
  title: "Lieldienu kostīmu noma – zaķu tērpi | Happy Carnevale",
  description:
    "Lieldienu kostīmu noma: zaķu tērpi un citi svētku tēli pasākumiem. Rezervē tiešsaistē – Rīgā un visā Latvijā.",
};

export default function LieldienasPage() {
  return (
    <>
   

      <LieldienasSection />
    </>
  );
}