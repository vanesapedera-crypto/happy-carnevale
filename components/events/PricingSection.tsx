import Link from "next/link";
import { lp, tr, type Lang } from "@/lib/i18n";

const plans = [
  {
    duration: { lv: "1 stunda", ru: "1 час", en: "1 hour" },
    price: "160 €",
  },
  {
    duration: { lv: "1,5 stundas", ru: "1,5 часа", en: "1.5 hours" },
    price: "175 €",
  },
  {
    duration: { lv: "2 stundas", ru: "2 часа", en: "2 hours" },
    price: "190 €",
  },
];

export default function PricingSection({ lang }: { lang: Lang }) {
  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-pink-600">
            {tr(lang, { lv: "Programmas un cenas", ru: "Программы и цены", en: "Packages and prices" })}
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-900 lg:text-5xl">
            {tr(lang, { lv: "Izvēlies sev piemērotāko programmu", ru: "Выберите подходящую программу", en: "Choose the package that suits you" })}
          </h2>

          <p className="mt-3 text-gray-600">
            {tr(lang, { lv: "Visas programmas ietver vienādu saturu, atšķiras tikai ilgums un cena.", ru: "Все программы одинаковы по содержанию, отличаются только продолжительность и цена.", en: "All packages include the same content – only the length and price differ." })}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.price}
              className="rounded-[30px] border border-pink-100 bg-white px-8 py-10 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-3xl font-black text-slate-900">
                {tr(lang, plan.duration)}
              </h3>

              <p className="mt-2 text-gray-500">
                {tr(lang, { lv: "Līdz 15 bērniem", ru: "До 15 детей", en: "Up to 15 children" })}
              </p>

              <div className="mt-8 text-6xl font-black text-pink-500">
                {plan.price}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href={lp(lang, "/rezervacija-pasakumiem")}
            className="rounded-full bg-pink-500 px-10 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
          >
            {tr(lang, { lv: "Rezervēt animatoru", ru: "Забронировать аниматора", en: "Book an entertainer" })}
          </Link>
        </div>
      </div>
    </section>
  );
}