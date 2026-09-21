import Image from "next/image";
import Link from "next/link";

const professions = [
  {
    title: "Bruņinieks",
    image: "/kostimi/profesijas/bruninieks.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M",
  },
  {
    title: "Ceļotājs",
    image: "/kostimi/profesijas/celotajs.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Ieslodzītais",
    image: "/kostimi/profesijas/cietumnieks.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-L",
  },
  {
    title: "Cowboy meitene",
    image: "/kostimi/profesijas/cowboy-meitene.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-XL",
  },
  {
    title: "Cowboy puisis",
    image: "/kostimi/profesijas/cowboy-puisis.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-XL",
  },
  {
    title: "Dullais profesors",
    image: "/kostimi/profesijas/dullais-profesors.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Kapteinis",
    image: "/kostimi/profesijas/Kapteinis.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-L",
  },
  {
    title: "Kosmonauts",
    image: "/kostimi/profesijas/kosmonauts.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-M",
  },
  {
    title: "Mācītājs",
    image: "/kostimi/profesijas/macitajs.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-L",
  },
  {
    title: "Medmāsa",
    image: "/kostimi/profesijas/medmasas-kostims.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "XS-S",
  },
  {
    title: "Pētniece",
    image: "/kostimi/profesijas/petniece.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-M",
  },
  {
    title: "Policiste",
    image: "/kostimi/profesijas/Policiste.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "XS-M",
  },
  {
    title: "Policists",
    image: "/kostimi/profesijas/Policists.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "M-XL",
  },
  {
    title: "Profesore",
    image: "/kostimi/profesijas/profesore.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Rallija meitene",
    image: "/kostimi/profesijas/rallij-meitene.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-S",
  },
  {
    title: "Rallija braucējs (1)",
    image: "/kostimi/profesijas/rallija-braucejs-1.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-M",
  },
  {
    title: "Rallija braucējs (2)",
    image: "/kostimi/profesijas/rallija-braucejs-2.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Rallija braucējs (3)",
    image: "/kostimi/profesijas/rallija-braucejs-3.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "M-L",
  },
  {
    title: "Stjuarte",
    image: "/kostimi/profesijas/Stjuarte.jpg",
    price: "25 € / līdz 3 diennaktīm",
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {professions.map((item, index) => (
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