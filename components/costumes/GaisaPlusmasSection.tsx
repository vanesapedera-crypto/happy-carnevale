import Image from "next/image";
import Link from "next/link";

const costumes = [
  {
    title: "Vienradzis (1)",
    image: "/kostimi/gaisa-plusma/vienradzis-1.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Vienradzis (2)",
    image: "/kostimi/gaisa-plusma/vienradzis-2.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Kaķis",
    image: "/kostimi/gaisa-plusma/kakis.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Govs",
    image: "/kostimi/gaisa-plusma/govs.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Banāns",
    image: "/kostimi/gaisa-plusma/banans.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Kapibara",
    image: "/kostimi/gaisa-plusma/kapibara.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Rozā zaķītis",
    image: "/kostimi/gaisa-plusma/roza-zakitis.jpg",
    price: "30 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Kosmonauts",
    image: "/kostimi/gaisa-plusma/kosmonauts.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Bite",
    image: "/kostimi/gaisa-plusma/bite.jpg",
    price: "50 € / līdz 3 diennaktīm",
    size: "XS-XL",
  },
  {
    title: "Dinozaurs (1)",
    image: "/kostimi/gaisa-plusma/dinazaurs-1.jpg",
    price: "30 € / līdz 3 diennaktīm",
    size: "Universāls",
  },
  {
    title: "Dinozaurs (2)",
    image: "/kostimi/gaisa-plusma/dinazaurs-2.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "150-195cm",
  },
{
  title: "Vienradzis (3)",
  image: "/kostimi/gaisa-plusma/vienradzis-3.jpg",
  price: "25 € / līdz 3 diennaktīm",
  size: "3 pieaugušo kostīmi (165–195 cm) + 1 bērnu kostīms (120–150 cm)",
},
  {
    title: "Citplanētietis",
    image: "/kostimi/gaisa-plusma/ciplanetietis.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "160-190 cm",
  },
  {
    title: "Pingvīns",
    image: "/kostimi/gaisa-plusma/pingvins.jpg",
    price: "30 € / līdz 3 diennaktīm",
    size: "160-190 cm",
  },
  {
    title: "Olafs",
    image: "/kostimi/gaisa-plusma/olafs.jpg",
    price: "30 € / līdz 3 diennaktīm",
    size: "160-190 cm",
  },
  {
    title: "Sirds",
    image: "/kostimi/gaisa-plusma/sirds.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "140-190 cm",
  },
  {
    title: "Lācis 3,60m",
    image: "/kostimi/gaisa-plusma/lacis.jpg",
    price: "50 € / līdz 3 diennaktīm",
    size: "S-XXL",
  },
  {
    title: "Haizivs",
    image: "/kostimi/gaisa-plusma/haizivs.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "150-190 cm",
  },
  {
    title: "Zaķis garausis",
    image: "/kostimi/gaisa-plusma/zakis-garausis.jpg",
    price: "30 € / līdz 3 diennaktīm",
    size: "S-XL",
  },
  {
    title: "Sumo zilis",
    image: "/kostimi/gaisa-plusma/sumo-zils.jpg",
    price: "20 € / līdz 3 diennaktīm",
    size: "S-XL",
  },
  {
    title: "Lieldienu zaķis",
    image: "/kostimi/gaisa-plusma/lieldienu-zakis.jpg",
    price: "30 € / līdz 3 diennaktīm",
    size: "S-XL",
  },
  {
    title: "Flamingo",
    image: "/kostimi/gaisa-plusma/flamingo.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Dinozaurs ar saimnieku (1)",
    image: "/kostimi/gaisa-plusma/dinozaurs-ar-saimnieku-1.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Dinozaurs ar saimnieku (2)",
    image: "/kostimi/gaisa-plusma/dinozaurs-ar-saimnieku-2.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Gailis",
    image: "/kostimi/gaisa-plusma/gailis.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
  {
    title: "Pīle",
    image: "/kostimi/gaisa-plusma/pile.jpg",
    price: "25 € / līdz 3 diennaktīm",
    size: "XS-L",
  },
];

export default function GaisaPlusmaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-gradient-to-br from-white via-violet-50/40 to-white p-10 shadow-xl">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900">
              Gaisa plūsmas kostīmi
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500"></div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {costumes.map((item, index) => (
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