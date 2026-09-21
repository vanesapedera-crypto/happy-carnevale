import Link from "next/link";
import { Crown } from "lucide-react";

const plans = [
  {
    duration: "1 stunda",
    price: "160 €",
    featured: false,
  },
  {
    duration: "1,5 stundas",
    price: "175 €",
    featured: true,
  },
  {
    duration: "2 stundas",
    price: "190 €",
    featured: false,
  },
];

export default function PricingSection() {
  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Virsraksts */}

        <div className="mb-12 text-center">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-pink-600">
            Programmas un cenas
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-900 lg:text-5xl">
            Izvēlies sev piemērotāko programmu
          </h2>

          <p className="mt-3 text-gray-600">
            Visas programmas ietver vienādu saturu, atšķiras tikai ilgums un
            cena.
          </p>
        </div>

        {/* Kartītes */}

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.duration}
              className={`relative rounded-[30px] bg-white px-8 py-8 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                plan.featured
                  ? "border-2 border-pink-500"
                  : "border border-pink-100"
              }`}
            >
              {plan.featured && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center gap-2 rounded-full bg-pink-500 px-5 py-2 text-sm font-bold text-white shadow-lg">
                    <Crown className="h-4 w-4" />
                    Populārākā izvēle
                  </div>
                </div>
              )}

              <h3 className="mt-4 text-3xl font-black text-slate-900">
                {plan.duration}
              </h3>

              <p className="mt-2 text-gray-500">
                Līdz 15 bērniem
              </p>

              <div className="mt-8 text-6xl font-black text-pink-500">
                {plan.price}
              </div>

              <Link
                href="/rezervacija"
                className="mt-10 flex h-14 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white transition hover:bg-pink-600"
              >
                Rezervēt →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}