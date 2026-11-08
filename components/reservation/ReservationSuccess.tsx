"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useLp, useTr } from "@/context/LangContext";

type ReservationSuccessProps = {
  title?: string;
  text?: string;
  onReset?: () => void;
  resetLabel?: string;
};

export default function ReservationSuccess({
  title,
  text,
  onReset,
  resetLabel,
}: ReservationSuccessProps) {
  const t = useTr();
  const lp = useLp();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mx-auto max-w-3xl rounded-[40px] bg-white px-6 py-16 text-center shadow-xl md:px-12">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mt-8 text-4xl font-black text-gray-900 md:text-5xl">
        {title ?? t({ lv: "Paldies! Rezervācija nosūtīta", ru: "Спасибо! Бронирование отправлено", en: "Thank you! Your booking has been sent" })}
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
        {text ??
          t({
            lv: "Esam saņēmuši tavu rezervācijas pieprasījumu. Drīzumā sazināsimies, lai precizētu detaļas un apstiprinātu rezervāciju.",
            ru: "Мы получили ваш запрос на бронирование. Скоро свяжемся с вами, чтобы уточнить детали и подтвердить бронь.",
            en: "We've received your booking request. We'll be in touch soon to go over the details and confirm your booking.",
          })}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href={lp("/")}
          className="inline-flex rounded-full bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
        >
          {t({ lv: "Uz sākumlapu", ru: "На главную", en: "Back to home" })}
        </Link>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex rounded-full border-2 border-pink-200 px-8 py-4 text-lg font-bold text-pink-600 transition hover:bg-pink-50"
          >
            {resetLabel ??
              t({ lv: "Nosūtīt vēl vienu rezervāciju", ru: "Отправить ещё одно бронирование", en: "Send another booking" })}
          </button>
        )}
      </div>
    </div>
  );
}
