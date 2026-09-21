import Image from "next/image";
import Link from "next/link";

const animals = [
  {
    title: "Bembijs",
    image: "/kostimi/dzivnieki/bembijs.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-M",
  },
  {
    title: "Bite",
    image: "/kostimi/dzivnieki/bite.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "Derēs līdz 195cm",
  },
    {
    title: "Bitīte",
    image: "/kostimi/dzivnieki/bitite.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M",
  },
  {
    title: "Lapsa meitene",
    image: "/kostimi/dzivnieki/lapsas.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Lapsa Krūmiņš",
    image: "/kostimi/dzivnieki/lapsa-krumins.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Lauva",
    image: "/kostimi/dzivnieki/lauva.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Runcis",
    image: "/kostimi/dzivnieki/runcis.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Zaķis (1)",
    image: "/kostimi/dzivnieki/zakis-1.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Zaķis (2)",
    image: "/kostimi/dzivnieki/zakis-2.jpg",
    price: "15 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Zaķis (3)",
    image: "/kostimi/dzivnieki/zakis-4.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Zaķis (4)",
    image: "/kostimi/dzivnieki/zakis-5.jpg",
    price: "35 € / līdz 3 diennaktīm",
    size: "XS-XXL",
  },
  {
    title: "Zaķa zēns",
    image: "/kostimi/dzivnieki/zakis-3.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XXL",
  },
  {
    title: "Zaķa meitenīte",
    image: "/kostimi/dzivnieki/zakis-6.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XXL",
  },
  {
    title: "Žirafe",
    image: "/kostimi/dzivnieki/zirafe.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "S-L",
  },
    {
    title: "Lācis",
    image: "/kostimi/dzivnieki/lacis.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
];

export default function DzivniekiSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        {/* Sadaļas rāmis */}
        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">

          {/* Virsraksts */}
          <div className="mb-12">

            <h2 className="text-4xl font-black text-gray-900">
              Dzīvnieku tēli
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500"></div>

          </div>

          {/* Kartītes */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

{animals.map((item) => (
  <div
    key={item.title}
    className="group flex flex-col overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl"
  >
    {/* Bilde */}
    <div className="relative aspect-[3/4] overflow-hidden bg-violet-50">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-105"
      />
    </div>

    {/* Saturs */}
    <div className="flex flex-1 flex-col p-6">

      <h3 className="min-h-[64px] text-2xl font-bold leading-tight tracking-tight text-gray-900">
        {item.title}
      </h3>

      <div className="mt-5 inline-flex w-fit rounded-full bg-violet-500 px-4 py-2 text-sm font-bold text-white shadow">
        💶 {item.price}
      </div>

      <p className="mt-4 text-gray-600">
        📏 {item.size}
      </p>

      <Link
        href={`/rezervacija-kostimiem?kostims=${encodeURIComponent(
          item.title
        )}&image=${encodeURIComponent(
          item.image
        )}&price=${encodeURIComponent(
          item.price
        )}&size=${encodeURIComponent(item.size)}`}
        className="mt-auto flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-400 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
      >
        Rezervēt →
      </Link>

    </div>
  </div>
))}

          </div>

        </div>

      </div>
    </section>
  );
}