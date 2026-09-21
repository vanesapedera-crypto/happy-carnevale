import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-orange-500">
            KONTAKTI
          </p>

          <h2 className="mt-4 text-5xl font-black text-gray-900">
            Sazinies ar mums
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Ja Tev radušies jautājumi par kostīmu nomu, ziepju burbuļu
            produktiem vai pasūtījumiem, droši sazinies ar mums.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Kontaktinformācija */}
          <div className="rounded-3xl border border-orange-100 bg-white p-10 shadow-lg">

            <h3 className="text-3xl font-black text-gray-900">
              Kontaktinformācija
            </h3>

            <div className="mt-10 space-y-8">

              <div className="flex items-start gap-5">
                <div className="rounded-full bg-orange-100 p-4">
                  <Phone className="h-6 w-6 text-orange-500" />
                </div>

                <div>
                  <p className="font-semibold text-gray-500">
                    Tālrunis
                  </p>

                  <a
                    href="tel:+37126126313"
                    className="text-xl font-bold text-gray-900 hover:text-orange-500"
                  >
                    +371 26126313
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="rounded-full bg-orange-100 p-4">
                  <Mail className="h-6 w-6 text-orange-500" />
                </div>

                <div>
                  <p className="font-semibold text-gray-500">
                    E-pasts
                  </p>

                  <a
                    href="mailto:carnevalehappy@gmail.com"
                    className="text-xl font-bold text-gray-900 hover:text-orange-500"
                  >
                    carnevalehappy@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="rounded-full bg-orange-100 p-4">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>

                <div>
                  <p className="font-semibold text-gray-500">
                    Darba laiks
                  </p>

                  <p className="text-lg text-gray-700">
                    Katru dienu
                  </p>

                  <p className="text-gray-500">
                    Atbildam pēc iespējas ātrāk.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Informācija */}
          <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-10 text-white shadow-xl">

            <h3 className="text-3xl font-black">
              Svarīga informācija
            </h3>

            <p className="mt-8 text-lg leading-8 text-orange-100">
              Happy Carnevale ir interneta veikals.
              Mums nav fiziska veikala, kuru iespējams apmeklēt ikdienā.
            </p>

            <div className="mt-10 flex items-start gap-5">
              <MapPin className="mt-1 h-7 w-7" />

              <div>
                <h4 className="text-2xl font-bold">
                  Kostīmu saņemšana
                </h4>

                <p className="mt-3 text-orange-100">
                  Stabu iela 10, Rīga
                </p>

                <p className="mt-4 leading-8 text-orange-100">
                  Kostīmu nomas pasūtījumus iespējams saņemt
                  tikai pēc iepriekšējas vienošanās.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}