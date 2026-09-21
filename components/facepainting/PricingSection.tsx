import Link from "next/link";

export default function PricingSection() {
  return (
    <section className="bg-pink-50 py-24">
      <div className="mx-auto max-w-6xl px-6">

        <div className="mb-16 text-center">
          <span className="rounded-full bg-pink-100 px-5 py-2 font-semibold text-pink-600">
            Cenas
          </span>

          <h2 className="mt-6 text-5xl font-black text-gray-900">
            Pakalpojuma cenas
          </h2>

          <p className="mt-5 text-lg text-gray-600">
Ja pasākumā ir vairāk nekā 20 bērni, iesakām izvēlēties sejas akcentus vai puses sejas gleznojumus, lai visi bērni paspētu tikt pie skaista zīmējuma.          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">

          <div className="rounded-[32px] bg-white p-10 text-center shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-3xl font-black">
              1,5 stundas
            </h3>

            <p className="mt-4 text-gray-600">
              Ideāli piemērots mazākām ballītēm.
            </p>

            <div className="mt-8 text-6xl font-black text-pink-500">
              150€
            </div>

            <Link
              href="/rezervacija"
              className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 font-semibold text-white transition hover:bg-pink-600"
            >
              Rezervēt →
            </Link>
          </div>

          <div className="rounded-[32px] border-4 border-pink-500 bg-white p-10 text-center shadow-2xl">

            <span className="rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white">
              Populārākā izvēle
            </span>

            <h3 className="mt-8 text-3xl font-black">
              2 stundas
            </h3>

            <p className="mt-4 text-gray-600">
              Vairāk laika, lai iepriecinātu lielākas bērnu grupas.
            </p>

            <div className="mt-8 text-6xl font-black text-pink-500">
              170€
            </div>

            <Link
              href="/rezervacija"
              className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 font-semibold text-white transition hover:bg-pink-600"
            >
              Rezervēt →
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}