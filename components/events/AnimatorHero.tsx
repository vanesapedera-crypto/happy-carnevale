import Image from "next/image";
import Link from "next/link";
import { lp, tr, type Lang } from "@/lib/i18n";

export default function AnimatorHero({ lang }: { lang: Lang }) {
  const alt = tr(lang, {
    lv: "Happy Carnevale animatori bērnu ballītē",
    ru: "Аниматоры Happy Carnevale на детском празднике",
    en: "Happy Carnevale entertainers at a kids' party",
  });
  return (
    <section className="relative overflow-hidden">
      {/* Desktop fons */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/images/hero/animatori-desktop.jpg"
          alt={alt}
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
          alt={alt}
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
            {tr(lang, { lv: "Animatori", ru: "Аниматоры", en: "Entertainers" })}
          </span>

          <h1 className="mt-6 text-5xl font-black leading-tight text-slate-900 lg:text-7xl">
            {tr(lang, { lv: "Animatori", ru: "Аниматоры", en: "Entertainers" })}
            <br />
            <span className="lg:text-pink-500">{tr(lang, { lv: "Jūsu svētkiem", ru: "для вашего праздника", en: "for your party" })}</span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-700 lg:text-xl lg:leading-9">
            {tr(lang, { lv: "Jautras rotaļas, konkursi, dejas, balonu figūras, tematiskie tetovējumi, radošās aktivitātes un daudz neaizmirstamu emociju bērnu dzimšanas dienās un citos pasākumos.", ru: "Весёлые игры, конкурсы, танцы, фигуры из шаров, тематические тату, творческие занятия и море незабываемых эмоций на детских днях рождения и других праздниках.", en: "Fun games, contests, dancing, balloon animals, themed tattoos, creative activities and lots of unforgettable moments at kids' birthdays and other events." })}
          </p>

          <div className="mt-10">
            <Link
              href={lp(lang, "/rezervacija-pasakumiem")}
              className="inline-flex rounded-2xl bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
            >
              {tr(lang, { lv: "Rezervēt animatoru", ru: "Забронировать аниматора", en: "Book an entertainer" })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}