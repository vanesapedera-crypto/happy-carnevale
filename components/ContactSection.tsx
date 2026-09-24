import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function ContactSection() {
  return (
<section className="bg-[#FFF7FB] pt-16 pb-20 lg:pt-12 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">

        {/* Virsraksts */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-pink-500">
            KONTAKTI
          </p>

          <h2 className="mt-4 text-4xl font-black text-[#17223b] md:text-5xl">
            Sazinies ar mums
          </h2>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            Ja Tev radušies jautājumi par kostīmu nomu, animatoriem,
            pārsteiguma tēliem vai pasūtījumiem, droši sazinies ar mums.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">

          {/* Kreisā puse */}
          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-lg lg:p-10">

            <h3 className="text-3xl font-black text-[#17223b]">
              Kontaktinformācija
            </h3>

            <div className="mt-8 space-y-7">

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                  <Phone className="h-6 w-6 text-pink-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Tālrunis
                  </p>

                  <a
                    href="tel:+37126126313"
                    className="text-lg font-bold text-[#17223b] hover:text-pink-500"
                  >
                    +371 26126313
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                  <Mail className="h-6 w-6 text-pink-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    E-pasts
                  </p>

                  <a
                    href="mailto:carnevalehappy@gmail.com"
                    className="break-all text-lg font-bold text-[#17223b] hover:text-pink-500"
                  >
                    carnevalehappy@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                  <Clock className="h-6 w-6 text-pink-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">
                    Darba laiks
                  </p>

                  <p className="text-lg font-semibold text-[#17223b]">
                    Katru dienu
                  </p>

                  <p className="text-gray-500">
                    Atbildam pēc iespējas ātrāk.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Labā puse */}
          <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-fuchsia-500 p-6 text-white shadow-xl lg:p-10">

            <h3 className="text-3xl font-black">
              Svarīga informācija
            </h3>

            <p className="mt-6 leading-8 text-pink-100">
              Happy Carnevale ir interneta veikals. Mums nav fiziska veikala,
              kuru iespējams apmeklēt ikdienā.
            </p>

            <div className="mt-8 flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <MapPin className="h-7 w-7" />
              </div>

              <div>
                <h4 className="text-2xl font-bold">
                  Kostīmu saņemšana
                </h4>

                <p className="mt-2 font-semibold text-pink-100">
                  Stabu iela 90, Rīga
                </p>

                <p className="mt-4 leading-7 text-pink-100">
                  Pasūtījumus iespējams saņemt tikai pēc iepriekšējas
                  vienošanās.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}