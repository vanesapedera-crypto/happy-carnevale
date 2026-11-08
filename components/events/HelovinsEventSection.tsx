import Image from "next/image";
import Link from "next/link";
import { lp, tr, type Lang } from "@/lib/i18n";

const activities = [
  { lv: "Spocīgi uzdevumi un jautras aktivitātes", ru: "Жуткие задания и весёлые развлечения", en: "Spooky challenges and fun activities" },
  { lv: "Tematisko tetovējumu izveide", ru: "Тематические тату", en: "Themed tattoos" },
  { lv: "Radošā darbnīca „Izveido savu mošķi”", ru: "Творческая мастерская «Создай своего монстрика»", en: "Craft workshop “Make your own monster”" },
  { lv: "Tumsas disenīte ar gaismiņu elementiem", ru: "Дискотека в темноте со светящимися элементами", en: "Glow-in-the-dark disco" },
  { lv: "Raganu dūmojošās dziras pagatavošana", ru: "Приготовление дымящегося ведьминого зелья", en: "Brewing a smoking witches' potion" },
];

export default function HelovinsEventSection({ lang }: { lang: Lang }) {
  return (
    <div className="bg-[#1E1033] text-white">
      {/* Sākums ar lielu bildi */}
      <section className="relative flex min-h-[460px] items-end lg:min-h-[560px]">
        <Image
          src="/images/hero/helovins.jpg"
          alt={tr(lang, { lv: "Helovīna ballīte", ru: "Вечеринка на Хэллоуин", en: "Halloween party" })}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E1033]/10 via-[#1E1033]/55 via-55% to-[#1E1033]" />

        <div className="relative w-full px-6 pb-10 text-center lg:pb-14">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-orange-300 lg:px-5 lg:text-sm">
            {tr(lang, { lv: "Pasākumu organizēšana", ru: "Организация праздников", en: "Party services" })}
          </span>

          <h1 className="mt-5 text-5xl font-bold tracking-tight lg:text-7xl">
            {tr(lang, { lv: "Helovīns", ru: "Хэллоуин", en: "Halloween" })}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 lg:text-xl">
            {tr(lang, { lv: "Vēlies ballīti Helovīna noskaņās? Mēs to varam realizēt!", ru: "Хотите вечеринку в стиле Хэллоуина? Мы её устроим!", en: "Want a Halloween-themed party? We can make it happen!" })}
          </p>
        </div>
      </section>

      {/* Saturs */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-8 text-center lg:pb-24 lg:pt-10">
        <h2 className="text-3xl font-bold text-orange-300 lg:text-4xl">
          {tr(lang, { lv: "Ko mēs piedāvājam?", ru: "Что мы предлагаем?", en: "What we offer" })}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/85 lg:text-lg lg:leading-8">
          {tr(lang, { lv: "Uzraksti mums, kurš datums, vieta, laiks interesē un mēs pielāgosim labāko Helovīna programmu!", ru: "Напишите нам, какие дата, место и время вас интересуют, и мы подберём лучшую программу на Хэллоуин!", en: "Tell us the date, venue and time you have in mind and we'll put together the best Halloween programme!" })}
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-4">
          {activities.map((item, i) => (
            <div
              key={item.lv}
              className="flex items-center gap-3.5 rounded-2xl lg:rounded-full border border-orange-300/35 bg-white/[0.07] py-2.5 pl-2.5 pr-6 text-left"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold">
                {i + 1}
              </span>
              <span className="text-[15px] font-semibold lg:text-base">{tr(lang, item)}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-[32px] bg-gradient-to-br from-orange-900 to-orange-500 p-8 lg:p-10">
          <p className="text-base leading-7 lg:text-lg lg:leading-8">
            {tr(lang, { lv: "Mūsu ballītēs aicinām bērnus ierasties Helovīna kostīmos, aksesuāros, jo tieši tas veido visforšākās atmiņas!", ru: "На наши вечеринки приглашаем детей приходить в костюмах и аксессуарах на Хэллоуин – именно это создаёт самые классные воспоминания!", en: "We invite kids to come to our parties in Halloween costumes and accessories – that's what makes the best memories!" })}
          </p>

          <Link
            href={lp(lang, "/kontakti")}
            className="mt-6 inline-flex rounded-2xl bg-white px-7 py-3.5 font-bold text-orange-700 transition hover:bg-orange-50"
          >
            {tr(lang, { lv: "Sazināties", ru: "Связаться", en: "Contact us" })}
          </Link>
        </div>
      </section>
    </div>
  );
}
