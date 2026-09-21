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
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">

          {/* GALERIJA */}

          <FacePaintGallery />

          {/* SATURS */}

          <div>

            <h2 className="mt-5 text-5xl font-black leading-tight text-gray-900">
Sejas              <br />
apgleznošana            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Jūsu pasākumā ierodas profesionāla sejiņu
              apgleznotāja, kura visas programmas laikā
              apglezno bērnus par viņu izvēlēto tēlu.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Princeses, supervaroņi, vienradži,
              dzīvnieki, tauriņi, dinozauri un
              desmitiem citu dizainu.
            </p>

            <p className="mt-5 text-lg leading-8 text-gray-600">
              Ja pasākumā ir vairāk nekā
              <strong> 20 bērni</strong>, iesakām
              izvēlēties sejas akcentus vai puses
              sejas gleznojumus, lai ikviens bērns
              paspētu tikt pie sava zīmējuma.
            </p>

            {/* IEGUVUMI */}

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

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

            {/* CENAS */}

            <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">

              <h3 className="mb-5 text-xl font-bold">
                Pakalpojuma cenas
              </h3>

              <div className="space-y-4">

                <div className="flex items-center justify-between rounded-2xl bg-white p-5">

                  <div>

                    <div className="font-semibold">
                      1,5 stundas
                    </div>

                    <div className="text-sm text-gray-500">
                      Ideāli piemērots mazākām ballītēm
                    </div>

                  </div>

                  <div className="text-2xl font-black">
                    150 €
                  </div>

                </div>

                <div className="relative flex items-center justify-between rounded-2xl border-2 border-pink-500 bg-white p-5">

                  <span className="absolute -top-3 right-5 rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white">
                    Populārākā izvēle
                  </span>

                  <div>

                    <div className="font-semibold">
                      2 stundas
                    </div>

                    <div className="text-sm text-gray-500">
                      Lielākām bērnu grupām
                    </div>

                  </div>

                  <div className="text-2xl font-black text-pink-600">
                    170 €
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