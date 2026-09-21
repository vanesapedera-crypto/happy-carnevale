import Image from "next/image";
import Link from "next/link";

const mascots = [
  {
    title: "Angry Birds",
    image: "/kostimi/mascotas/angry-birds.jpg",
    price: "50 € / līdz 3 diennaktīm",
    size: "S-XXL",
  },
  {
    title: "Bings",
    image: "/kostimi/mascotas/bings.jpg",
    price: "45 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Čeizs",
    image: "/kostimi/mascotas/ceizs.jpg",
    price: "45 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Džeiks",
    image: "/kostimi/mascotas/dzeiks.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-M",
  },
  {
    title: "Lācis baletājs",
    image: "/kostimi/mascotas/lacis-balletajs.jpg",
    price: "35 € / līdz 3 diennaktīm",
    size: "160-180 cm",
  },
  {
    title: "Maršels",
    image: "/kostimi/mascotas/marsels.jpg",
    price: "45 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Melnais kaķis",
    image: "/kostimi/mascotas/melnais-kakis.jpg",
    price: "50 € / līdz 3 diennaktīm",
    size: "S-XL līdz 185cm",
  },
  {
    title: "Mikijs",
    image: "/kostimi/mascotas/mikijs.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "160-180 cm",
  },
   {
    title: "Minnija (1)",
    image: "/kostimi/mascotas/minnija-2.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "160-180 cm",
  },
  {
    title: "Minnija (2)",
    image: "/kostimi/mascotas/minnija-1.jpg",
    price: "35 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Plīša lācis",
    image: "/kostimi/mascotas/plisa-lacis.jpg",
    price: "35 € / līdz 3 diennaktīm",
    size: "160-185 cm",
  },
  {
    title: "Rozā pantera",
    image: "/kostimi/mascotas/roza-pantera.jpg",
    price: "35 € / līdz 3 diennaktīm",
    size: "XS-M",
  },
  {
    title: "Skaja",
    image: "/kostimi/mascotas/skaja.jpg",
    price: "45 € / līdz 3 diennaktīm",
    size: "S-L",
  },
  {
    title: "Stičs",
    image: "/kostimi/mascotas/stich.jpg",
    price: "50 € / līdz 3 diennaktīm",
    size: "S-XL",
  },
  {
    title: "Tīģerītis",
    image: "/kostimi/mascotas/tigeritis.jpg",
    price: "40 € / līdz 3 diennaktīm",
    size: "165-185 cm",
  },
  {
    title: "Vienradzis",
    image: "/kostimi/mascotas/vienradzis.jpg",
    price: "40 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Vinnijs Pūks",
    image: "/kostimi/mascotas/vinijs-puks.jpg",
    price: "40 € / līdz 3 diennaktīm",
    size: "160-180cm",
  },
  {
    title: "Zaķis Kundziņš",
    image: "/kostimi/mascotas/zakis-1.jpg",
    price: "40 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Zaķis (1)",
    image: "/kostimi/mascotas/zakis-2.jpg",
    price: "40 € / līdz 3 diennaktīm",
    size: "165-185 cm",
  },
  {
    title: "Zaķis (2)",
    image: "/kostimi/mascotas/zakis-3.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Zelta glittera lācis",
    image: "/kostimi/mascotas/zelta-glittera-lacis.jpg",
    price: "50 € / līdz 3 diennaktīm",
    size: "175-190 cm",
  },
  {
    title: "Zemeslode",
    image: "/kostimi/mascotas/zemeslode.jpg",
    price: "40 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Lauva Leo",
    image: "/kostimi/mascotas/lauva-leo.jpg",
    price: "45 € / līdz 3 diennaktīm",
    size: "XS-M",
  },
  {
    title: "Lego Ninjago",
    image: "/kostimi/mascotas/lego-ninjago.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
];

export default function MascotasSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              Lielie Mascota tēli
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {mascots.map((item, index) => (
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