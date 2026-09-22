import Image from "next/image";
import Link from "next/link";
import { FiTag } from "react-icons/fi";
import { TbRulerMeasure } from "react-icons/tb";

const parukas = [
  { title: "Parūka 1", image: "/kostimi/parukas/paruka-1.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 2", image: "/kostimi/parukas/paruka-2.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 3", image: "/kostimi/parukas/paruka-3.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 4", image: "/kostimi/parukas/paruka-4.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 5", image: "/kostimi/parukas/paruka-5.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 6", image: "/kostimi/parukas/paruka-6.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 7", image: "/kostimi/parukas/paruka-7.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 8", image: "/kostimi/parukas/paruka-8.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 9", image: "/kostimi/parukas/paruka-9.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 10", image: "/kostimi/parukas/paruka-10.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 11", image: "/kostimi/parukas/paruka-11.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 12", image: "/kostimi/parukas/paruka-12.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 13", image: "/kostimi/parukas/paruka-13.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 14", image: "/kostimi/parukas/paruka-14.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 15", image: "/kostimi/parukas/paruka-15.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 16", image: "/kostimi/parukas/paruka-16.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 17", image: "/kostimi/parukas/paruka-17.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 18", image: "/kostimi/parukas/paruka-18.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 19", image: "/kostimi/parukas/paruka-19.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 20", image: "/kostimi/parukas/paruka-20.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 21", image: "/kostimi/parukas/paruka-21.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 22", image: "/kostimi/parukas/paruka-22.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 23", image: "/kostimi/parukas/paruka-23.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 24", image: "/kostimi/parukas/paruka-24.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 25", image: "/kostimi/parukas/paruka-25.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 26", image: "/kostimi/parukas/paruka-26.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 27", image: "/kostimi/parukas/paruka-27.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 28", image: "/kostimi/parukas/paruka-28.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 29", image: "/kostimi/parukas/paruka-29.jpg", price: "12 €", size: "One size" },
  { title: "Parūka 30", image: "/kostimi/parukas/paruka-30.jpg", price: "12 €", size: "One size" },
];


export default function ParukasSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">Parūkas</h2>
            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500" />
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
              Krāsainas, smieklīgas un tēliem atbilstošas parūkas dažādiem
              pasākumiem, kostīmiem un svētkiem.
            </p>
          </div>

         {/* ================= DESKTOP ================= */}
<div className="hidden lg:grid gap-8 lg:grid-cols-4">
  {parukas.map((item) => (
    <div
      key={item.title}
      className="group flex flex-col overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-violet-50">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
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
  {parukas.map((item) => (
    <div
      key={item.title}
      className="overflow-hidden rounded-[26px] bg-white shadow-lg"
    >
      <div className="flex">
        <div className="relative h-44 w-36 shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
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