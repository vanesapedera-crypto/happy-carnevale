import Image from "next/image";
import Link from "next/link";

export default function AnimatorHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-pink-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f9a8d4_0%,transparent_35%)] opacity-30" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
        {/* Teksts */}

        <div>
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-pink-600">
            Animatori
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
            Animatori
            <br />
            Jūsu svētkiem
          </h1>

          <p className="mt-8 max-w-xl text-xl leading-9 text-gray-600">
            Jautras rotaļas, konkursi, dejas, balonu figūras, Glitter Tattoo,
            radošās aktivitātes un daudz neaizmirstamu emociju bērnu
            dzimšanas dienās un citos pasākumos.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/rezervacija-pasakumiem"
              className="rounded-2xl bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
            >
              Rezervēt animatoru
            </Link>
          </div>
        </div>

        {/* SVG */}

        <div className="relative flex justify-center">
          <Image
src="/images/hero/animatori.png"
            alt="Animatori"
            width={700}
            height={700}
            priority
            className="h-auto w-full max-w-[650px]"
          />
        </div>
      </div>
    </section>
  );
}