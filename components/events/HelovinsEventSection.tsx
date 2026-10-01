import Image from "next/image";
import Link from "next/link";

const activities = [
  "Spocīgi uzdevumi un jautras aktivitātes",
  "Tematisko tetovējumu izveide",
  "Radošā darbnīca „Izveido savu mošķi”",
  "Tumsas disenīte ar gaismiņu elementiem",
  "Raganu dūmojošās dziras pagatavošana",
];

export default function HelovinsEventSection() {
  return (
    <div className="bg-[#1E1033] text-white">
      {/* Sākums ar lielu bildi */}
      <section className="relative flex min-h-[460px] items-end lg:min-h-[560px]">
        <Image
          src="/images/hero/helovins.png"
          alt="Helovīna ballīte"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1033]/10 via-[#1E1033]/55 via-55% to-[#1E1033]" />

        <div className="relative w-full px-6 pb-10 text-center lg:pb-14">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-300 lg:px-5 lg:text-sm">
            Pasākumu organizēšana
          </span>

          <h1 className="mt-5 text-5xl font-bold tracking-tight lg:text-7xl">
            Helovīns
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 lg:text-xl">
            Vēlies ballīti Helovīna noskaņās? Mēs to varam realizēt!
          </p>
        </div>
      </section>

      {/* Saturs */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-8 text-center lg:pb-24 lg:pt-10">
        <h2 className="text-3xl font-bold text-orange-300 lg:text-4xl">
          Ko mēs piedāvājam?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85 lg:text-lg lg:leading-8">
          Uzraksti mums, kurš datums, vieta, laiks interesē un mēs pielāgosim
          labāko Helovīna programmu!
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-4">
          {activities.map((item, i) => (
            <div
              key={item}
              className="flex items-center gap-3.5 rounded-2xl lg:rounded-full border border-orange-300/35 bg-white/[0.07] py-2.5 pl-2.5 pr-6 text-left"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold">
                {i + 1}
              </span>
              <span className="text-[15px] font-semibold lg:text-base">{item}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-[32px] bg-gradient-to-br from-orange-900 to-orange-500 p-8 lg:p-10">
          <p className="text-base leading-7 lg:text-lg lg:leading-8">
            Mūsu ballītēs aicinām bērnus ierasties Helovīna kostīmos,
            aksesuāros, jo tieši tas veido visforšākās atmiņas!
          </p>

          <Link
            href="/kontakti"
            className="mt-6 inline-flex rounded-2xl bg-white px-7 py-3.5 font-bold text-orange-700 transition hover:bg-orange-50"
          >
            Sazināties
          </Link>
        </div>
      </section>
    </div>
  );
}
