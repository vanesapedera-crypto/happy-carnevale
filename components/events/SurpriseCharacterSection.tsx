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
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

{/* GALERIJA */}

<SurpriseGallery />
          {/* SATURS */}

          <div>

            <h2 className="mt-5 text-5xl font-black leading-tight text-gray-900">
Pārsteiguma 
              <br />
              tēls
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Pārsteiguma tēls ierodas Jūsu pasākumā uz
              <strong> 25–30 minūtēm</strong>, lai radītu
              neaizmirstamu pārsteigumu, prieku un daudz smaidu.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Vizītes laikā tēls sasveicinās ar jubilāru,
              fotografēsies ar viesiem un kopīgi radīs
              skaistas atmiņas.
            </p>

            {/* IEGUVUMI */}

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
                  className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                    <item.icon
                      size={20}
                      className="text-pink-500"
                    />
                  </div>

                  <span className="font-medium text-gray-700">
                    {item.text}
                  </span>
                </div>
              ))}

            </div>

            {/* CENA */}

            <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">

              <h3 className="mb-5 text-xl font-bold">
                Pakalpojuma cena
              </h3>

              <div className="relative rounded-2xl border-2 border-pink-500 bg-white p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="flex items-center gap-2 font-semibold">
                      <Sparkles
                        size={18}
                        className="text-pink-500"
                      />
                      Pārsteiguma tēls
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                      Vizītes ilgums 25–30 minūtes
                    </div>

                  </div>

                  <div className="text-3xl font-black text-pink-600">
                    110 €
                  </div>

                </div>

              </div>

            
               <Link
  href="/rezervacija-pasakumiem"
  className="mt-6 flex h-14 items-center justify-center rounded-2xl bg-pink-500 text-lg font-bold text-white transition hover:bg-pink-600"
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