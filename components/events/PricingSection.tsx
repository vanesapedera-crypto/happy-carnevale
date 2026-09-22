import Link from "next/link";

const plans = [
  {
    duration: "1 stunda",
    price: "160 €",
  },
  {
    duration: "1,5 stundas",
    price: "175 €",
  },
  {
    duration: "2 stundas",
    price: "190 €",
  },
];

export default function PricingSection() {
  return (
    <section className="bg-gradient-to-b from-pink-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-6">
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

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.duration}
              className="rounded-[30px] border border-pink-100 bg-white px-8 py-10 text-center shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-3xl font-black text-slate-900">
                {plan.duration}
              </h3>

              <p className="mt-2 text-gray-500">
                Līdz 15 bērniem
              </p>

              <div className="mt-8 text-6xl font-black text-pink-500">
                {plan.price}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/rezervacija-pasakumiem"
            className="rounded-full bg-pink-500 px-10 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
          >
            Rezervēt animatoru
          </Link>
        </div>
      </div>
    </section>
  );
}