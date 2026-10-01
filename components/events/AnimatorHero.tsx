import Image from "next/image";
import Link from "next/link";

export default function AnimatorHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Desktop fons */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/hero/animatori-desktop.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[90%_center] xl:object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/90 via-45% to-transparent to-75%" />
      </div>

      {/* Mobile fons */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/images/hero/animatori-mobile.jpg"
          alt=""
          fill
          priority
          className="object-contain p-4"
        />
        <div className="absolute inset-0 bg-white/75" />
      </div>

      {/* Saturs */}
      <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-6 py-24 lg:min-h-[660px]">
        <div className="max-w-xl">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-pink-600">
            Animatori
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
            Animatori
            <br />
            <span className="lg:text-pink-500">Jūsu svētkiem</span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-700 lg:text-xl lg:leading-9">
            Jautras rotaļas, konkursi, dejas, balonu figūras, tematiskie tetovējumi,
            radošās aktivitātes un daudz neaizmirstamu emociju bērnu
            dzimšanas dienās un citos pasākumos.
          </p>

          <div className="mt-10">
            <Link
              href="/rezervacija-pasakumiem"
              className="inline-flex rounded-2xl bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
            >
              Rezervēt animatoru
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}