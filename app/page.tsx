import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";

export const metadata: Metadata = {
  title: "Happy Carnevale – kostīmu noma, animatori un ziepju burbuļi",
  description:
    "Kostīmu noma pieaugušajiem, animatori bērnu svētkiem, pārsteiguma tēli un ziepju burbuļu veikals. Rīgā un visā Latvijā, piegāde uz jebkuru pakomātu.",
};

export default function Home() {
  return (
    <>
      <Hero />

    </>
  );
}