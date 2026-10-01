import Link from "next/link";

const program = [
  "Jūsu izvēlēts pasaku tēls (Rūķītis, Ziemassvētku vecītis vai pat Grinčs) ierodas ar teatrālu uzvedumu un iepazīstas ar bērniem",
  "Izspēlē jautras rotaļas un aizraujošus uzdevumus, pielāgotus bērnu vecumam",
  "Iesaista dejās un interesantās aktivitātēs",
  "Ja bērniem ir sagatavotas dāvaniņas, mūsu svētku viesis ar prieku tās izdalīs, nofotogrāfēsies",
];

export default function ZiemassvetkiEventSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-emerald-200 bg-white p-6 shadow-xl sm:p-10">
          <div className="max-w-4xl space-y-4 text-lg leading-8 text-gray-600">
            <p>
              Ar prieku noorganizēsim atraktīvu un bērnu vecumam piemērotu
              Ziemassvētku izklaides programmu!
            </p>
            <p>
              Iespēja uzaicināt mūs ciemos uz bērnudārzu, skolu vai jebkuru
              Jūsu pasākuma vietu.
            </p>
          </div>

          <h2 className="mt-12 text-3xl font-black text-gray-900 lg:text-4xl">
            Kas sagaida mazos svētku dalībniekus?
          </h2>

          <div className="mt-3 h-1 w-24 rounded-full bg-emerald-500" />

          <p className="mt-6 text-lg font-semibold text-gray-900">
            Svētku programmā:
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {program.map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-[28px] border border-emerald-100 bg-emerald-50 px-6 py-5 text-lg font-semibold leading-7 text-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-base font-black text-white">
                  {i + 1}
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[32px] border-2 border-dashed border-red-200 bg-red-50 p-8">
            <h3 className="text-2xl font-black text-red-600">
              Bez steigas un piespiedu dzejolīšiem!
            </h3>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-gray-700">
              Mūsu mērķis ir, lai bērni jūtas brīvi, iesaistās un patiesi
              izbauda svētkus!
            </p>
          </div>

          <div className="mt-8 rounded-[32px] bg-gradient-to-r from-emerald-600 to-emerald-500 p-8 text-white">
            <p className="max-w-3xl text-lg leading-8 text-white/95">
              Ziemassvētku programmas izmaksas atkarīgas no Jūsu vēlamā
              datuma, vietas, bērnu skaita, tādēļ aicinām uzrakstīt mums,
              pastāstīt savas vēlmes un mēs noteikti atradīsim labāko svētku
              programmu tieši Jums! :)
            </p>

            <Link
              href="/kontakti"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Sazināties
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
