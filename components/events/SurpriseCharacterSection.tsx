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
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:gap-16 lg:grid-cols-[1.15fr_0.85fr]">

          {/* GALERIJA */}
          <SurpriseGallery />

          {/* SATURS */}
          <div>

            <h2 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:mt-5 lg:text-5xl">
              Pārsteiguma
              <br />
              tēls
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 lg:text-lg lg:leading-8">
              Pārsteiguma tēls ierodas Jūsu pasākumā uz
              <strong> 25–30 minūtēm</strong>, lai radītu
              neaizmirstamu pārsteigumu, prieku un daudz smaidu.
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600 lg:mt-5 lg:text-lg lg:leading-8">
              Vizītes laikā tēls sasveicinās ar jubilāru,
              fotografēsies ar viesiem un kopīgi radīs
              skaistas atmiņas.
            </p>

            {/* IEGUVUMI */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-10 lg:gap-4">

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
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3 lg:p-4"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-100 lg:h-10 lg:w-10">
                    <item.icon
                      size={18}
                      className="text-pink-500"
                    />
                  </div>

                  <span className="text-sm font-medium text-gray-700 lg:text-base">
                    {item.text}
                  </span>
                </div>
              ))}

            </div>

            {/* CENA */}
            <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-4 lg:mt-10 lg:p-6">

              <h3 className="mb-4 text-lg font-bold lg:mb-5 lg:text-xl">
                Pakalpojuma cena
              </h3>

              <div className="rounded-2xl border-2 border-pink-500 bg-white p-4 lg:p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2 font-semibold text-sm lg:text-base">
                      <Sparkles
                        size={18}
                        className="text-pink-500"
                      />
                      Pārsteiguma tēls
                    </div>

                    <div className="mt-1 text-xs text-gray-500 lg:text-sm">
                      Vizītes ilgums 25–30 minūtes
                    </div>

                  </div>

                  <div className="text-2xl font-black text-pink-600 lg:text-3xl">
                    110 €
                  </div>

                </div>

              </div>

              <Link
                href="/rezervacija-pasakumiem"
                className="mt-5 flex h-12 lg:h-14 items-center justify-center rounded-2xl bg-pink-500 text-base lg:text-lg font-bold text-white transition hover:bg-pink-600"
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