import Image from "next/image";
import Link from "next/link";
import { FiTag } from "react-icons/fi";
import { TbRulerMeasure } from "react-icons/tb";

const halloween = [
  {
    title: "Wednesday",
    image: "/kostimi/multfilmu/wednesday.jpg",
    price: "25 €",
    size: "XS-L",
  },
   {
    title: "Ragana",
    image: "/kostimi/multfilmu/ragana.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Pennywise",
    image: "/kostimi/multfilmu/pennywise.jpg",
    price: "25 €",
    size: "M-XL",
  },
  {
    title: "Drakula",
    image: "/kostimi/multfilmu/drakula.jpg",
    price: "25 €",
    size: "M-XL",
  },
  {
    title: "Spociņš",
    image: "/kostimi/multfilmu/spocins.jpg",
    price: "20 €",
    size: "XS-L",
  },
  {
    title: "Džokers (1)",
    image: "/kostimi/multfilmu/dzokers-1.jpg",
    price: "25 €",
    size: "M-L",
  },
  {
    title: "Malificienta",
    image: "/kostimi/multfilmu/malificienta.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Džokers (2)",
    image: "/kostimi/multfilmu/dzokers-2.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Bailīgā mūķene",
    image: "/kostimi/multfilmu/bailiga-mukene.jpg",
    price: "25 €",
    size: "XS-L",
  },
  {
    title: "Līgava",
    image: "/kostimi/helovini/ligava.jpg",
    price: "25 €",
    size: "M-L",
  },
  {
    title: "Skelets (spīd tumsā)",
    image: "/kostimi/helovini/skelets.jpg",
    price: "25 €",
    size: "M-L",
  },
  {
    title: "Maska (1)",
    image: "/kostimi/helovini/1.JPG",
    price: "8 €",
    size: "One size",
  },
  {
    title: "Maska (2)",
    image: "/kostimi/helovini/2.JPG",
    price: "8 €",
    size: "One size",
  },
  {
    title: "Maska (3)",
    image: "/kostimi/helovini/3.JPG",
    price: "8 €",
    size: "One size",
  },
  {
    title: "Maska (4)",
    image: "/kostimi/helovini/4.JPG",
    price: "8 €",
    size: "One size",
  },
  {
    title: "Maska (5)",
    image: "/kostimi/helovini/5.JPG",
    price: "8 €",
    size: "One size",
  },
  {
    title: "Maska (6)",
    image: "/kostimi/helovini/6.JPG",
    price: "8 €",
    size: "One size",
  },
  {
    title: "Maska (7)",
    image: "/kostimi/helovini/7.JPG",
    price: "8 €",
    size: "One size",
  },
];

export default function HelovinsSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-zinc-200 bg-white p-10 shadow-xl">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              Helovīna kostīmi
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500" />
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-4">
            {halloween.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="group flex flex-col overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-zinc-300 hover:shadow-2xl"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="min-h-[64px] text-2xl font-bold tracking-tight text-gray-900">
                    {item.title}
                  </h3>

                  <div className="mt-5 flex items-center gap-2 text-pink-600">
                    <FiTag className="h-5 w-5" />
                    <span className="font-semibold">{item.price}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-gray-600">
                    <TbRulerMeasure className="h-5 w-5" />
                    <span>{item.size}</span>
                  </div>

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

          {/* ================= MOBILE ================= */}
          <div className="flex flex-col gap-5 lg:hidden">
            {halloween.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-lg"
              >
                <div className="flex">
                  <div className="relative h-44 w-36 shrink-0 bg-white">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {item.title}
                      </h3>

                      <div className="mt-4 flex items-center gap-2 text-pink-600">
                        <FiTag className="h-5 w-5" />
                        <span className="font-semibold">{item.price}</span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-gray-600">
                        <TbRulerMeasure className="h-5 w-5" />
                        <span>{item.size}</span>
                      </div>
                    </div>

                    <Link
                      href={`/rezervacija-kostimiem?kostims=${encodeURIComponent(
                        item.title
                      )}&image=${encodeURIComponent(
                        item.image
                      )}&price=${encodeURIComponent(
                        item.price
                      )}&size=${encodeURIComponent(item.size)}`}
                      className="mt-5 flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 font-semibold text-white"
                    >
                      Rezervēt →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}