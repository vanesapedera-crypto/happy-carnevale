import Link from "next/link";
import {
  CheckCircle2,
  Palette,
  Sparkles,
  Clock3,
} from "lucide-react";

import FacePaintGallery from "./FacePaintingGallery";

export default function AboutSection() {
  return (
    <section className="bg-white py-12 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">

          <FacePaintGallery />

          <div>

            <h2 className="mt-4 text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:mt-5 lg:text-5xl">
              Sejas
              <br />
              apgleznošana
            </h2>

            <p className="mt-5 text-base leading-7 text-gray-600 lg:text-lg lg:leading-8">
              Jūsu pasākumā ierodas profesionāla sejiņu apgleznotāja, kura
              visas programmas laikā apglezno bērnus par viņu izvēlēto tēlu.
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600 lg:text-lg lg:leading-8">
              Princeses, supervaroņi, vienradži, dzīvnieki, tauriņi,
              dinozauri un desmitiem citu dizainu.
            </p>

            <p className="mt-4 text-base leading-7 text-gray-600 lg:text-lg lg:leading-8">
              Ja pasākumā ir vairāk nekā <strong>20 bērni</strong>, iesakām
              izvēlēties sejas akcentus vai puses sejas gleznojumus, lai
              ikviens bērns paspētu tikt pie sava zīmējuma.
            </p>

            {/* Ieguvumi */}

            <div className="mt-8 grid gap-3">

              {[
                {
                  icon: Palette,
                  text: "Profesionālas hipoalerģiskas krāsas",
                },
                {
                  icon: Sparkles,
                  text: "100+ dažādu dizainu",
                },
                {
                  icon: Clock3,
                  text: "Ātra un kvalitatīva apgleznošana",
                },
                {
                  icon: CheckCircle2,
                  text: "Piemērots visiem vecumiem",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 lg:rounded-2xl lg:p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-100 lg:h-10 lg:w-10">
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

            {/* Cenas */}

            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4 lg:mt-10 lg:rounded-3xl lg:p-6">

              <h3 className="mb-4 text-lg font-bold lg:mb-5 lg:text-xl">
                Pakalpojuma cenas
              </h3>

              <div className="space-y-3">

                <div className="flex items-center justify-between rounded-xl bg-white p-4 lg:rounded-2xl lg:p-5">

                  <div>
                    <div className="font-semibold text-sm lg:text-base">
                      1,5 stundas
                    </div>

                    <div className="text-xs text-gray-500 lg:text-sm">
                      Ideāli piemērots mazākām ballītēm
                    </div>
                  </div>

                  <div className="text-xl font-black lg:text-2xl">
                    150 €
                  </div>

                </div>

                <div className="relative flex items-center justify-between rounded-xl border-2 border-pink-500 bg-white p-4 lg:rounded-2xl lg:p-5">

                  <span className="absolute -top-3 right-3 rounded-full bg-pink-500 px-2 py-1 text-[10px] font-bold text-white lg:right-5 lg:px-3 lg:text-xs">
                    Populārākā izvēle
                  </span>

                  <div>
                    <div className="font-semibold text-sm lg:text-base">
                      2 stundas
                    </div>

                    <div className="text-xs text-gray-500 lg:text-sm">
                      Lielākām bērnu grupām
                    </div>
                  </div>

                  <div className="text-xl font-black text-pink-600 lg:text-2xl">
                    170 €
                  </div>

                </div>

              </div>

              <Link
                href="/rezervacija-pasakumiem"
                className="mt-5 flex h-12 items-center justify-center rounded-xl bg-pink-500 text-base font-bold text-white transition hover:bg-pink-600 lg:mt-6 lg:h-14 lg:rounded-2xl lg:text-lg"
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