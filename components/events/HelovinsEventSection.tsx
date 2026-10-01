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
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-orange-200 bg-white p-6 shadow-xl sm:p-10">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-black text-gray-900 lg:text-4xl">
              Ko mēs piedāvājam?
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-orange-500" />

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Uzraksti mums, kurš datums, vieta, laiks interesē un mēs
              pielāgosim labāko Helovīna programmu!
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-[28px] border border-orange-100 bg-orange-50 px-6 py-5 text-lg font-semibold text-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-base font-black text-white">
                  {i + 1}
                </span>
                {item}
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[32px] bg-gradient-to-r from-orange-500 to-orange-400 p-8 text-white">
            <p className="max-w-3xl text-lg leading-8 text-white/95">
              Mūsu ballītēs aicinām bērnus ierasties Helovīna kostīmos,
              aksesuāros, jo tieši tas veido visforšākās atmiņas!
            </p>

            <Link
              href="/kontakti"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
            >
              Sazināties
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
