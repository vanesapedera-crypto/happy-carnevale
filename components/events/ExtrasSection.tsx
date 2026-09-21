import Image from "next/image";

const extras = [
  {
    title: "Interesantie eksperimenti",
    price: "50 €",
    image: "/images/events/animatori/eksperimenti.jpg",
  },
  {
    title: "Slaimu meistarklase",
    price: "60 €",
    image: "/images/events/animatori/slaims.jpg",
  },
  {
    title: "Milzu ziepju burbuļi",
    price: "40 €",
    image: "/images/events/animatori/burbuli.jpg",
  },
  {
    title: "Radošā darbnīca",
    price: "40 €",
    image: "/images/events/animatori/radosa-darbnica.jpg",
  },
  {
    title: "LED Disco",
    price: "50 €",
    image: "/images/events/animatori/led-disco.jpg",
  },
  {
    title: "Folijas Disco",
    price: "70 €",
    image: "/images/events/animatori/folijas-disco.jpg",
  },
];

export default function ExtrasSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-pink-600">
            Papildpakalpojumi
          </span>

          <h2 className="mt-5 text-5xl font-black text-slate-900">
            Padari ballīti vēl iespaidīgāku
          </h2>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Izvēlies vienu vai vairākas papildus aktivitātes, lai bērniem
            radītu vēl vairāk prieka.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {extras.map((item) => (
            <div
              key={item.title}
              className="group rounded-[28px] border border-pink-100 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-xl"
            >
              {/* Attēls */}
              <div className="overflow-hidden rounded-2xl border border-pink-100 bg-pink-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              {/* Nosaukums */}
              <h3 className="mt-5 text-lg font-bold leading-6 text-slate-900">
                {item.title}
              </h3>

              {/* Cena */}
              <div className="mt-2 text-3xl font-black text-pink-500">
                + {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}