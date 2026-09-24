import Link from "next/link";
import {
  PartyPopper,
  Gamepad2,
  Camera,
  Cake,
  Sparkles,
} from "lucide-react";

import SurpriseGallery from "./SurpriseGallery";

export default function SurpriseCharacterSection() {
  return (
    <section className="bg-gradient-to-b from-white to-pink-50 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">

          {/* Galerija */}
          <SurpriseGallery />

          {/* Saturs */}
          <div>

            <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-pink-600">
              Pārsteiguma tēli
            </span>

            <h2 className="mt-5 text-4xl font-black leading-tight text-[#17223b] sm:text-5xl">
              Pārsteiguma tēls
            </h2>

            <p className="mt-6 text-base leading-8 text-gray-600 lg:text-lg">
              Pārsteiguma tēls ierodas Jūsu pasākumā uz
              <strong> 25–30 minūtēm</strong>, lai radītu
              neaizmirstamu pārsteigumu, prieku un daudz smaidu.
            </p>

            <p className="mt-4 text-base leading-8 text-gray-600 lg:text-lg">
              Vizītes laikā tēls sasveicinās ar jubilāru,
              fotografēsies ar viesiem un kopīgi radīs
              skaistas atmiņas.
            </p>

            {/* Ieguvumi */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              {[
                {
                  icon: PartyPopper,
                  text: "Apsveikums jubilāram",
                },
                {
                  icon: Gamepad2,
                  text: "Jautra rotaļa",
                },
                {
                  icon: Camera,
                  text: "Kopīgas fotogrāfijas",
                },
                {
                  icon: Cake,
                  text: "Kūkas pasniegšana",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100">
                    <item.icon
                      size={20}
                      className="text-pink-500"
                    />
                  </div>

                  <span className="font-semibold text-gray-700">
                    {item.text}
                  </span>
                </div>
              ))}

            </div>

            {/* Cena */}
            <div className="mt-10 rounded-[32px] bg-gradient-to-br from-pink-50 via-white to-pink-100 p-6 shadow-xl">

              <h3 className="text-xl font-black text-[#17223b]">
                Pakalpojuma cena
              </h3>

              <div className="mt-6 rounded-3xl border-2 border-pink-500 bg-white p-6 shadow-md">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2 font-bold text-[#17223b]">
                      <Sparkles
                        size={18}
                        className="text-pink-500"
                      />

                      Pārsteiguma tēls
                    </div>

                    <p className="mt-2 text-sm text-gray-500">
                      Vizītes ilgums 25–30 minūtes
                    </p>

                  </div>

                  <div className="text-4xl font-black text-pink-600">
                    110 €
                  </div>

                </div>

              </div>

              <Link
                href="/rezervacija-pasakumiem"
                className="mt-6 flex h-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 text-lg font-bold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Rezervēt
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}