import type { Metadata } from "next";
import ReservationForm from "@/components/reservation/ReservationForm";
import { loadAnimatorCharacters } from "@/lib/animatorCharacters";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/rezervacija-pasakumiem", {
    title: {
      lv: "Pasākuma rezervācija | Happy Carnevale",
      ru: "Бронирование праздника | Happy Carnevale",
      en: "Event booking | Happy Carnevale",
    },
    description: {
      lv: "Rezervācijas pieteikums animatoriem, sejas apgleznošanai un pārsteiguma tēliem.",
      ru: "Заявка на бронирование аниматоров, аквагрима и персонажей-сюрпризов.",
      en: "Booking request for entertainers, face painting and surprise characters.",
    },
    robots: { index: false, follow: false },
  });
}

export default async function ReservationPage() {
  const animatorCharacters = await loadAnimatorCharacters();

  return (
    <main className="bg-pink-50 py-20">
      <ReservationForm animatorCharacters={animatorCharacters} />
    </main>
  );
}
