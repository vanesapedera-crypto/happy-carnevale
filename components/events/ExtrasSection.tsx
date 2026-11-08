import Image from "next/image";
import { tr, type Lang } from "@/lib/i18n";

const extras = [
  {
    title: { lv: "Interesantie eksperimenti", ru: "Интересные эксперименты", en: "Science experiments" },
    price: "50 €",
    image: "/images/events/animatori/eksperimenti.jpg",
  },
  {
    title: { lv: "Slaimu meistarklase", ru: "Мастер-класс по слаймам", en: "Slime workshop" },
    price: "60 €",
    image: "/images/events/animatori/slaims.jpg",
  },
  {
    title: { lv: "Milzu ziepju burbuļi", ru: "Гигантские мыльные пузыри", en: "Giant soap bubbles" },
    price: "40 €",
    image: "/images/events/animatori/burbuli.jpg",
  },
  {
    title: { lv: "Radošā darbnīca", ru: "Творческая мастерская", en: "Craft workshop" },
    price: "40 €",
    image: "/images/events/animatori/radosa-darbnica.jpg",
  },
  {
    title: { lv: "LED Disco", ru: "LED-дискотека", en: "LED disco" },
    price: "50 €",
    image: "/images/events/animatori/led-disco.jpg",
  },
  {
    title: { lv: "Follija Disco", ru: "Фольга-дискотека", en: "Foil disco" },
    price: "70 €",
    image: "/images/events/animatori/folijas-disco.jpg",
  },
];

export default function ExtrasSection({ lang }: { lang: Lang }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Virsraksts */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-pink-600">
            {tr(lang, { lv: "Papildpakalpojumi", ru: "Дополнительные услуги", en: "Add-ons" })}
          </span>

          <h2 className="mt-5 text-4xl font-black text-slate-900 lg:text-5xl">
            {tr(lang, { lv: "Padari ballīti vēl iespaidīgāku", ru: "Сделайте праздник ещё ярче", en: "Make the party even more special" })}
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            {tr(lang, { lv: "Izvēlies vienu vai vairākas papildus aktivitātes, lai bērniem radītu vēl vairāk prieka.", ru: "Выберите одно или несколько дополнительных развлечений, чтобы подарить детям ещё больше радости.", en: "Add one or more extra activities to bring the kids even more joy." })}
          </p>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {extras.map((item) => (
            <div
              key={item.image}
              className="group rounded-[28px] border border-pink-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-xl"
            >
              <div className="overflow-hidden rounded-2xl border border-pink-100 bg-pink-50">
                <Image
                  src={item.image}
                  alt={tr(lang, item.title)}
                  width={300}
                  height={300}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="mt-5 text-lg font-bold leading-6 text-slate-900">
                {tr(lang, item.title)}
              </h3>

              <div className="mt-3 text-3xl font-black text-pink-500">
                + {item.price}
              </div>
            </div>
          ))}
        </div>

        {/* ================= MOBILE ================= */}
        <div className="flex flex-col gap-5 sm:hidden">
          {extras.map((item) => (
            <div
              key={item.image}
              className="overflow-hidden rounded-[26px] border border-pink-100 bg-white shadow-md"
            >
              <div className="flex">
                <div className="relative h-36 w-32 shrink-0">
                  <Image
                    src={item.image}
                    alt={tr(lang, item.title)}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-center p-5">
                  <h3 className="text-xl font-bold leading-6 text-slate-900">
                    {tr(lang, item.title)}
                  </h3>

                  <div className="mt-4 text-3xl font-black text-pink-500">
                    + {item.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}