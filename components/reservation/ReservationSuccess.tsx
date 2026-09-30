"use client";

import Link from "next/link";
import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

type ReservationSuccessProps = {
  title?: string;
  text?: string;
  onReset?: () => void;
  resetLabel?: string;
};

export default function ReservationSuccess({
  title = "Paldies! Rezervācija nosūtīta",
  text = "Esam saņēmuši tavu rezervācijas pieprasījumu. Drīzumā sazināsimies, lai precizētu detaļas un apstiprinātu rezervāciju.",
  onReset,
  resetLabel = "Nosūtīt vēl vienu rezervāciju",
}: ReservationSuccessProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mx-auto max-w-3xl rounded-[40px] bg-white px-6 py-16 text-center shadow-xl md:px-12">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
      </div>

      <h1 className="mt-8 text-4xl font-black text-gray-900 md:text-5xl">
        {title}
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
        {text}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex rounded-full bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
        >
          Uz sākumlapu
        </Link>

        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex rounded-full border-2 border-pink-200 px-8 py-4 text-lg font-bold text-pink-600 transition hover:bg-pink-50"
          >
            {resetLabel}
          </button>
        )}
      </div>
    </div>
  );
}
