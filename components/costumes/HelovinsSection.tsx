import Image from "next/image";
import Link from "next/link";

const halloween = [
  // Pievieno savus kostīmus šeit
  {
    title: "Trešdiena",
    image: "/kostimi/multfilmu/wednesday.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Ragana",
    image: "/kostimi/multfilmu/ragana.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Pennywise",
    image: "/kostimi/multfilmu/pennywise.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-XL",
  },
  {
    title: "Drakula",
    image: "/kostimi/multfilmu/drakula.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-XL",
  },
   {
    title: "Spociņš",
    image: "/kostimi/multfilmu/spocins.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
   {
    title: "Klauns",
    image: "/kostimi/multfilmu/klauns.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "S-L",
  },
   {
    title: "Džokers (1)",
    image: "/kostimi/multfilmu/dzokers-1.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-L",
  },
  {
    title: "Džokers (2)",
    image: "/kostimi/multfilmu/dzokers-2.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
   {
    title: "Bailīgā mūķene",
    image: "/kostimi/multfilmu/bailiga-mukene.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
];

export default function HelovinsSection() {
  return (
<section className="pt-32 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">

          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              Helovīna kostīmi
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {halloween.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="group overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-violet-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col p-6">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h3>

                  <div className="mt-5 inline-flex w-fit rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-600">
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
                    className="mt-7 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-400 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
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