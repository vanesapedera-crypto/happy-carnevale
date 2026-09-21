import Image from "next/image";
import Link from "next/link";

const retro = [
  {
    title: "70's Disco",
    image: "/kostimi/retro-kostimi/70s-disco.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "M",
  },
  {
    title: "70's meiteņu kostīms",
    image: "/kostimi/retro-kostimi/70s-meitenu-kostims.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-M",
  },
  {
    title: "70's puišu kostīms",
    image: "/kostimi/retro-kostimi/70s-puisu-kostims.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-M",
  },
  {
    title: "Boho Girl",
    image: "/kostimi/retro-kostimi/boho-girl.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M",
  },
  {
    title: "Disko meitene (1)",
    image: "/kostimi/retro-kostimi/disko-meitene-1.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "S-M",
  },
  {
    title: "Disko meitene (2)",
    image: "/kostimi/retro-kostimi/disko-meitene-2.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-M",
  },
  {
    title: "Disko puisis",
    image: "/kostimi/retro-kostimi/disko-puisis.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "S-M",
  },
  {
    title: "Great Gatsby",
    image: "/kostimi/retro-kostimi/great-gatsby.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-M",
  },
  {
    title: "Hippiju meitene",
    image: "/kostimi/retro-kostimi/hippy-meitene.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Hippiju puisis",
    image: "/kostimi/retro-kostimi/hippy-puisis.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Mamma Mia 70's",
    image: "/kostimi/retro-kostimi/mamma-mia-70s-kostims.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-M",
  },
  {
    title: "Rozā disko bikškostīms",
    image: "/kostimi/retro-kostimi/roza-bikskostims.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Sudraba disko tērps",
    image: "/kostimi/retro-kostimi/sudraba-terps.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "80's treniņtērps (Sudraba)",
    image: "/kostimi/retro-kostimi/unisex-80s-treninterps-disco.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-L",
  },
  {
    title: "80's treniņtērps (zelta)",
    image: "/kostimi/retro-kostimi/unisex-80s-treninterps.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-L",
  },
  {
    title: "Vīrieša disco tērps",
    image: "/kostimi/retro-kostimi/viriesa-disco-terps.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Maikls Džeksons",
    image: "/kostimi/retro-kostimi/maikls-dzeksons.jpg",
    price: "30 € / līdz 3 diennaktīm",
    size: "M-L",
  },
];

export default function RetroSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">

          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              Retro kostīmi
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

            {retro.map((item) => (
              <div
                key={item.title}
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