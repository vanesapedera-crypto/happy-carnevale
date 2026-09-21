"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroBubble() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src="/hero.png"
        alt="Happy Carneval"
        fill
        priority
        className="object-cover object-[72%_center]"
      />

      <div className="absolute inset-0 bg-white/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/45 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 lg:px-10">
        <div className="w-full max-w-2xl">
          <div className="rounded-[48px] bg-white/95 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.12)] ring-1 ring-white/60 backdrop-blur-md sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
              Burbulītes burbuļi
            </span>

            <h1 className="mt-6 text-5xl font-black leading-[0.95] text-gray-900 sm:text-6xl lg:text-7xl">
              Sveiki!
              <br />
              Es esmu{" "}
              <span className="text-pink-500">
                Burbulīte
              </span>
              !
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Priecājos Tevi redzēt! Pie mums vari iznomāt košus kostīmus,
              satikt pasaku tēlus, uzaicināt animatorus un radīt
              neaizmirstamus svētkus.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/kostimu-noma"
                className="rounded-full bg-pink-500 px-7 py-4 text-lg font-semibold text-white transition hover:bg-pink-600"
              >
                Skatīt kostīmus →
              </Link>

              <Link
                href="/rezervacija"
                className="rounded-full border-2 border-gray-900 px-7 py-4 text-lg font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
              >
                Rezervēt
              </Link>
            </div>

            <p className="mt-8 text-2xl font-semibold text-pink-500">
              Tiekamies svētkos!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}