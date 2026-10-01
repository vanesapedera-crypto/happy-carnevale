import Image from "next/image";
import Link from "next/link";

const program = [
  "Jūsu izvēlēts pasaku tēls (Rūķītis, Ziemassvētku vecītis vai pat Grinčs) ierodas ar teatrālu uzvedumu un iepazīstas ar bērniem",
  "Izspēlē jautras rotaļas un aizraujošus uzdevumus, pielāgotus bērnu vecumam",
  "Iesaista dejās un interesantās aktivitātēs",
  "Ja bērniem ir sagatavotas dāvaniņas, mūsu svētku viesis ar prieku tās izdalīs, nofotogrāfēsies",
];

export default function ZiemassvetkiEventSection() {
  return (
    <div className="bg-[#0E2A1F] text-white">
      {/* Sākums ar lielu bildi */}
      <section className="relative flex min-h-[460px] items-end lg:min-h-[560px]">
        <Image
          src="/images/hero/ziemassvetki.png"
          alt="Ziemassvētku programma bērniem"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A1F]/5 via-[#0E2A1F]/50 via-55% to-[#0E2A1F]" />

        <div className="relative w-full px-6 pb-10 text-center lg:pb-14">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-red-300 lg:px-5 lg:text-sm">
            Pasākumu organizēšana
          </span>

          <h1 className="mt-5 text-5xl font-bold tracking-tight lg:text-7xl">
            Ziemassvētki
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 lg:text-xl">
            Burvīgs Ziemassvētku piedzīvojums bērniem!
          </p>
        </div>
      </section>

      {/* Saturs */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-8 text-center lg:pb-24 lg:pt-10">
        <div className="mx-auto max-w-3xl space-y-3 text-base leading-7 text-white/85 lg:text-lg lg:leading-8">
          <p>
            Ar prieku noorganizēsim atraktīvu un bērnu vecumam piemērotu
            Ziemassvētku izklaides programmu!
          </p>
          <p>
            Iespēja uzaicināt mūs ciemos uz bērnudārzu, skolu vai jebkuru
            Jūsu pasākuma vietu.
          </p>
        </div>

        <h2 className="mt-14 text-3xl font-bold text-red-300 lg:text-4xl">
          Kas sagaida mazos svētku dalībniekus?
        </h2>

        <p className="mt-3 font-semibold text-white/85">Svētku programmā:</p>

        <div className="mt-8 grid gap-4 text-left lg:grid-cols-2">
          {program.map((item, i) => (
            <div
              key={item}
              className="flex items-start gap-4 rounded-3xl border border-red-300/30 bg-white/[0.06] px-5 py-5 lg:px-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold">
                {i + 1}
              </span>
              <span className="text-[15px] font-semibold leading-relaxed lg:text-base">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-bold lg:text-3xl">
            Bez steigas un piespiedu dzejolīšiem!
          </h3>
          <p className="mt-2 text-base text-white/85 lg:text-lg">
            Mūsu mērķis ir, lai bērni jūtas brīvi, iesaistās un patiesi
            izbauda svētkus!
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[32px] bg-gradient-to-br from-red-900 to-red-600 p-8 lg:p-10">
          <p className="text-base leading-7 lg:text-lg lg:leading-8">
            Ziemassvētku programmas izmaksas atkarīgas no Jūsu vēlamā datuma,
            vietas, bērnu skaita, tādēļ aicinām uzrakstīt mums, pastāstīt savas
            vēlmes un mēs noteikti atradīsim labāko svētku programmu tieši Jums!
            :)
          </p>

          <Link
            href="/kontakti"
            className="mt-6 inline-flex rounded-2xl bg-white px-7 py-3.5 font-bold text-red-700 transition hover:bg-red-50"
          >
            Sazināties
          </Link>
        </div>
      </section>
    </div>
  );
}
