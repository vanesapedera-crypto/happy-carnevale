import Image from "next/image";
import Link from "next/link";
import { FiTag } from "react-icons/fi";
import { TbRulerMeasure } from "react-icons/tb";

const christmas = [
  {
    title: "Eglīte",
    image: "/kostimi/ziemassvetki/eglite.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Rūķis",
    image: "/kostimi/ziemassvetki/rukis-smaidulis.jpg",
    price: "30 €",
    size: "XS-XL",
  },
  {
    title: "Sniegbaltīte",
    image: "/kostimi/ziemassvetki/sniegbaltite.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Ziemassvētku vecītis",
    image: "/kostimi/ziemassvetki/ziemassvetku-vecitis.jpg",
    price: "50 €",
    size: "S-XL",
  },
  {
    title: "Grinčš",
    image: "/kostimi/ziemassvetki/grincs.jpg",
    price: "25 €",
    size: "S-L",
  },
   {
    title: "Ziemassvētku uzvalks - žakete + bikses",
    image: "/kostimi/uzvalki/opposuit-zakete-bikses.jpg",
    price: "35 €",
    size: "M-L jeb EU 52",
  },
  {
    title: "Pingvīns",
    image: "/kostimi/gaisa-plusma/pingvins.jpg",
    price: "30 €",
    size: "160-190 cm",
  },
  {
    title: "Olafs",
    image: "/kostimi/gaisa-plusma/olafs.jpg",
    price: "30 €",
    size: "160-190 cm",
  },
];

export default function ZiemassvetkiSection() {
  return (
<section className="pt-32 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">

          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              Ziemassvētku tēli
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500"></div>
          </div>

          {/* ================= DESKTOP ================= */}
<div className="hidden lg:grid gap-8 lg:grid-cols-4">
  {christmas.map((item) => (
    <div
      key={item.title}
      className="group flex flex-col overflow-hidden rounded-[30px] border border-violet-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-violet-300 hover:shadow-2xl"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-violet-50">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="min-h-[64px] text-2xl font-bold leading-tight tracking-tight text-gray-900">
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
  {christmas.map((item) => (
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