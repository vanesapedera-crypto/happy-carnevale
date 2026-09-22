import {
  Theater,
  Dices,
  PartyPopper,
  Sparkles,
  Gift,
  Heart,
  ChevronRight,
} from "lucide-react";

const features = [
  {
    icon: Theater,
    title: "Pasaku tēls",
  },
  {
    icon: Dices,
    title: "Spēles un stafetes",
  },
  {
    icon: PartyPopper,
    title: "Balonu figūras",
  },
  {
    icon: Sparkles,
    title: "Glitter Tattoo",
  },
  {
    icon: Gift,
    title: "Dāvaniņa jubilāram",
  },
  {
    icon: Heart,
    title: "Neaizmirstamas emocijas",
  },
];

export default function ProgramSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Virsraksts */}

        <div className="mx-auto mb-12 max-w-3xl text-center">

          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">
            Kas iekļauts programmā
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-900 lg:text-5xl">
            Viss nepieciešamais jautrai ballītei
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Mūsu programma ir veidota tā, lai katrs bērns justos
            iesaistīts, priecīgs un pavadītu neaizmirstamu dienu.
          </p>

        </div>

        {/* ================= DESKTOP ================= */}

        <div className="hidden gap-6 sm:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid-cols-6">

          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-[24px] border border-pink-100 bg-white px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-xl"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 transition group-hover:bg-pink-100">

                  <Icon
                    className="h-9 w-9 text-pink-500"
                    strokeWidth={2}
                  />

                </div>

                <h3 className="mt-6 text-xl font-bold leading-snug text-slate-900">
                  {item.title}
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
        key={item.title}
        className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white px-5 py-4 shadow-sm"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-50">
          <Icon
            className="h-6 w-6 text-pink-500"
            strokeWidth={2}
          />
        </div>

        <h3 className="text-base font-semibold text-slate-900">
          {item.title}
        </h3>
      </div>
    );
  })}
</div>

      </div>
    </section>
  );
}