import {
  Theater,
  Dices,
  PartyPopper,
  Sparkles,
  Gift,
  Heart,
} from "lucide-react";
import { tr, type Lang } from "@/lib/i18n";

const features = [
  {
    icon: Theater,
    title: { lv: "Teatrāla pasaku tēla ierašanās", ru: "Театральное появление сказочного героя", en: "A theatrical fairy-tale character entrance" },
  },
  {
    icon: Dices,
    title: { lv: "Jautras spēles un uzdevumi", ru: "Весёлые игры и задания", en: "Fun games and challenges" },
  },
  {
    icon: PartyPopper,
    title: { lv: "Balonu modelēšana", ru: "Фигуры из воздушных шаров", en: "Balloon modelling" },
  },
  {
    icon: Sparkles,
    title: { lv: "Tematiskie tetovējumi", ru: "Тематические тату", en: "Themed tattoos" },
  },
  {
    icon: Gift,
    title: { lv: "Dāvaniņa jubilāram", ru: "Подарок имениннику", en: "A little gift for the birthday child" },
  },
  {
    icon: Heart,
    title: { lv: "Neaizmirstamas emocijas", ru: "Незабываемые эмоции", en: "Unforgettable memories" },
  },
];

export default function ProgramSection({ lang }: { lang: Lang }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Virsraksts */}

        <div className="mx-auto mb-12 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">
            {tr(lang, { lv: "Kas iekļauts programmā", ru: "Что входит в программу", en: "What's included" })}
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-900 lg:text-5xl">
            {tr(lang, { lv: "Viss nepieciešamais jautrai ballītei", ru: "Всё для весёлого праздника", en: "Everything you need for a fun party" })}
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            {tr(lang, { lv: "Mūsu programma ir veidota tā, lai katrs bērns justos iesaistīts, priecīgs un pavadītu neaizmirstamu dienu.", ru: "Наша программа построена так, чтобы каждый ребёнок был вовлечён, радовался и провёл незабываемый день.", en: "Our programme is designed so that every child feels included, happy and has an unforgettable day." })}
          </p>

        </div>

        {/* ================= DESKTOP ================= */}

        <div className="hidden gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-6">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title.lv}
                className="group rounded-[24px] border border-pink-100 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-xl"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 transition group-hover:bg-pink-100">

                  <Icon
                    className="h-9 w-9 text-pink-500"
                    strokeWidth={2}
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold leading-snug text-slate-900">
                  {tr(lang, item.title)}
                </h3>

              </div>
            );
          })}

        </div>

        {/* ================= MOBILE ================= */}

<div className="space-y-4 lg:hidden">
  {features.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.title.lv}
        className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white px-5 py-4 shadow-sm"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50">
          <Icon
            className="h-6 w-6 text-pink-500"
            strokeWidth={2}
          />
        </div>

        <h3 className="text-base font-semibold text-slate-900">
          {tr(lang, item.title)}
        </h3>
      </div>
    );
  })}
</div>

      </div>
    </section>
  );
}