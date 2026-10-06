import Image from "next/image";
import Link from "next/link";
import { FiTag } from "react-icons/fi";
import { TbRulerMeasure } from "react-icons/tb";
import { loadSectionCards } from "@/lib/costumeCatalog";

export default async function UzvalkiSection() {
  // Kostīmi nāk no admin paneļa; ja tur nekā nav, rāda iebūvēto sarakstu no data/costumes.
  const cards = await loadSectionCards("uzvalki");

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-zinc-200 bg-white p-10 shadow-xl">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">Uzvalki</h2>
            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500" />
          </div>

          {/* DESKTOP */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-4">
            {cards.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-zinc-300 hover:shadow-2xl"
              >
                <Link href={item.href} className="block relative aspect-[3/4] overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={`${item.title} – kostīmu noma`}
                    fill
                    className="object-contain p-4 transition duration-500 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="min-h-[64px] text-2xl font-bold tracking-tight text-gray-900">
                    <Link href={item.href} className="transition hover:text-pink-600">
                      {item.title}
                    </Link>
                  </h3>

                  {item.description && (
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  )}

                  {item.price && (
                    <div className="mt-5 flex items-center gap-2 text-pink-600">
                      <FiTag className="h-5 w-5" />
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  )}

                  {item.size && (
                    <div className="mt-2 flex items-center gap-2 text-gray-600">
                      <TbRulerMeasure className="h-5 w-5" />
                      <span>{item.size}</span>
                    </div>
                  )}

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

          {/* MOBILE */}
          <div className="flex flex-col gap-5 lg:hidden">
            {cards.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-lg"
              >
                <div className="flex">
                  <Link href={item.href} className="block relative h-44 w-36 shrink-0 bg-white">
                    <Image
                      src={item.image}
                      alt={`${item.title} – kostīmu noma`}
                      fill
                      className="object-contain p-4"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        <Link href={item.href} className="transition hover:text-pink-600">
                          {item.title}
                        </Link>
                      </h3>

                      {item.description && (
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                          {item.description}
                        </p>
                      )}

                      {item.price && (
                        <div className="mt-5 flex items-center gap-2 text-pink-600">
                          <FiTag className="h-5 w-5" />
                          <span className="font-semibold">{item.price}</span>
                        </div>
                      )}

                      {item.size && (
                        <div className="mt-2 flex items-center gap-2 text-gray-600">
                          <TbRulerMeasure className="h-5 w-5" />
                          <span>{item.size}</span>
                        </div>
                      )}
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