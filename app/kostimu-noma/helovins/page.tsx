import type { Metadata } from "next";
import HelovinsSection from "@/components/costumes/HelovinsSection";

export const metadata: Metadata = {
  title: "Helovīna kostīmu un masku noma | Happy Carnevale",
  description:
    "Helovīna kostīmu un masku noma: raganas, skeleti, ķirbji un citi spocīgi tēli ballītēm. Rezervē laikus – Rīgā un visā Latvijā.",
};

export default function HelovinsPage() {
  return (
    <>
    
      <HelovinsSection />
    </>
  );
}