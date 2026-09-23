import Image from "next/image";
import Link from "next/link";
import { FiTag } from "react-icons/fi";
import { TbRulerMeasure } from "react-icons/tb";


const professions = [
  {
    title: "Bruņinieks",
    image: "/kostimi/profesijas/bruninieks.jpg",
    price: "25 €",
    size: "M",
  },
  {
    title: "Ceļotājs",
    image: "/kostimi/profesijas/celotajs.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Ieslodzītais",
    image: "/kostimi/profesijas/cietumnieks.jpg",
    price: "25 €",
    size: "M-L",
  },
  {
    title: "Cowboy meitene",
    image: "/kostimi/profesijas/cowboy-meitene.jpg",
    price: "25 €",
    size: "S-XL",
  },
  {
    title: "Cowboy puisis",
    image: "/kostimi/profesijas/cowboy-puisis.jpg",
    price: "25 €",
    size: "S-XL",
  },
  {
    title: "Dullais profesors",
    image: "/kostimi/profesijas/dullais-profesors.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Kapteinis",
    image: "/kostimi/profesijas/Kapteinis.jpg",
    price: "25 €",
    size: "M-L",
  },
  {
    title: "Kosmonauts",
    image: "/kostimi/profesijas/kosmonauts.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Mācītājs",
    image: "/kostimi/profesijas/macitajs.jpg",
    price: "25 €",
    size: "M-L",
  },
  {
    title: "Medmāsa",
    image: "/kostimi/profesijas/medmasas-kostims.jpg",
    price: "20 €",
    size: "XS-S",
  },
  {
    title: "Pētniece",
    image: "/kostimi/profesijas/petniece.jpg",
    price: "25 €",
    size: "XS-M",
  },
  {
    title: "Policiste",
    image: "/kostimi/profesijas/Policiste.jpg",
    price: "20 €",
    size: "XS-M",
  },
  {
    title: "Policists",
    image: "/kostimi/profesijas/Policists.jpg",
    price: "20 €",
    size: "M-XL",
  },
  {
    title: "Profesore",
    image: "/kostimi/profesijas/profesore.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Rallija meitene",
    image: "/kostimi/profesijas/rallij-meitene.jpg",
    price: "25 €",
    size: "XS-S",
  },
  {
    title: "Rallija braucējs (1)",
    image: "/kostimi/profesijas/rallija-braucejs-1.jpg",
    price: "25 €",
    size: "S-M",
  },
  {
    title: "Rallija braucējs (2)",
    image: "/kostimi/profesijas/rallija-braucejs-2.jpg",
    price: "25 €",
    size: "S-L",
  },
  {
    title: "Stjuarte",
    image: "/kostimi/profesijas/Stjuarte.jpg",
    price: "25 €",
    size: "XS-M",
  },
];

export default function ProfessionsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">

          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              Profesijas
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500"></div>
          </div>

          {/* ================= DESKTOP ================= */}
<div className="hidden lg:grid gap-8 lg:grid-cols-4">
  {professions.map((item, index) => (
    <div
      key={`${item.title}-${index}`}
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
  {professions.map((item, index) => (
    <div
      key={`${item.title}-${index}`}
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