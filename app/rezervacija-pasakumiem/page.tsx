import type { Metadata } from "next";
import ReservationForm from "@/components/reservation/ReservationForm";
import { loadAnimatorCharacters } from "@/lib/animatorCharacters";

export const metadata: Metadata = {
  title: "Pasākuma rezervācija | Happy Carnevale",
  description:
    "Rezervācijas pieteikums animatoriem, sejas apgleznošanai un pārsteiguma tēliem.",
  robots: { index: false, follow: false },
};

export default async function ReservationPage() {
  const animatorCharacters = await loadAnimatorCharacters();

  return (
    <main className="bg-pink-50 py-20">
      <ReservationForm animatorCharacters={animatorCharacters} />
    </main>
  );
}
