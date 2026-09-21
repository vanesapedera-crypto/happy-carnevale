"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroBubble() {
  return (
    <div className="relative max-w-[520px]">

      {/* Burbulis */}
      <div className="relative rounded-[90px] bg-white px-12 py-14 shadow-2xl">

        {/* Aste */}
        <div className="absolute right-[-34px] top-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-br-[70px] rotate-45"></div>

        {/* Doodles */}
        <span className="absolute top-10 left-10 text-4xl">💛</span>
        <span className="absolute top-8 right-16 text-3xl">👑</span>
        <span className="absolute top-20 right-6 text-4xl text-pink-500">✦</span>

        <h2 className="font-black leading-none text-[#111827]">
          <span className="block text-5xl lg:text-6xl font-handwriting">
            Sveiki!
          </span>

          <span className="block mt-3 text-5xl lg:text-6xl">
            Es esmu
          </span>

          <span className="block mt-2 text-7xl lg:text-8xl text-pink-500 italic">
            Burbulīte!
          </span>
        </h2>

        <p className="mt-8 text-xl leading-9 text-gray-700">
          Priecājos Tevi redzēt!
          <br />
          Pie mums vari iznomāt košus kostīmus,
          satikt pasaku tēlus,
          uzaicināt animatorus
          un radīt neaizmirstamus svētkus.
        </p>

        <div className="mt-10 flex gap-5 flex-wrap">

          <Link
            href="/kostimu-noma"
            className="inline-flex items-center gap-3 rounded-full bg-pink-500 px-8 py-5 text-lg font-semibold text-white hover:bg-pink-600 transition"
          >
            Skatīt kostīmus
            <ArrowRight size={20} />
          </Link>

          <Link
            href="/rezervacija"
            className="inline-flex items-center rounded-full border-2 border-gray-900 px-8 py-5 text-lg font-semibold hover:bg-gray-900 hover:text-white transition"
          >
            Rezervēt
          </Link>

        </div>

        <p className="mt-10 text-3xl text-pink-500 italic font-semibold">
          Tiekamies svētkos! ♡
        </p>

      </div>

    </div>
  );
}