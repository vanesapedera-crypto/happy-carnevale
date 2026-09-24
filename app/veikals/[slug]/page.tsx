import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, Package, Clock3 } from "lucide-react";
import ProductPurchase from "@/components/shop/ProductPurchase";
import PartyBoxConfigurator from "@/components/shop/PartyBoxConfigurator";

type Product = {
  title: string;
  price: string;
  image: string;
  description?: string;
};

const products: Record<string, Product> = {
  "ziepju-burbulu-skidrums-3l": {
    title: "Ziepju burbuļu šķidrums 3 L",
    price: "5.50 €",
    image: "/images/shop/ziepju-burbulu-skidrums-3l.png",
    description:
      "Profesionāls ziepju burbuļu koncentrāts, kas paredzēts lielu, izturīgu un krāšņu ziepju burbuļu veidošanai. Pirms lietošanas koncentrāts rūpīgi jāsakrata, pēc tam jāatšķaida ar siltu ūdeni atbilstoši ieteiktajai proporcijai. Tas nodrošina viendabīgu šķīdumu un vislabāko burbuļu kvalitāti. Pēc sagatavošanas šķidrums ir gatavs lietošanai ar dažādu izmēru burbuļu kociņiem un rāmjiem, veidojot lielus un izturīgus ziepju burbuļus.",
  },
  "ziepju-burbulu-skidrums-5l": {
    title: "Ziepju burbuļu šķidrums 5 L",
    price: "8.00 €",
    image: "/images/shop/ziepju-burbulu-skidrums-5l.png",
    description:
      "Profesionāls ziepju burbuļu koncentrāts, kas paredzēts lielu, izturīgu un krāšņu ziepju burbuļu veidošanai. Pirms lietošanas koncentrāts rūpīgi jāsakrata, pēc tam jāatšķaida ar siltu ūdeni atbilstoši ieteiktajai proporcijai. Tas nodrošina viendabīgu šķīdumu un vislabāko burbuļu kvalitāti. Pēc sagatavošanas šķidrums ir gatavs lietošanai ar dažādu izmēru burbuļu kociņiem un rāmjiem, veidojot lielus un izturīgus ziepju burbuļus.",
  },
  "burbulu-kocins-1": {
    title: "Burbuļu kociņš Nr.1",
    price: "6.00 €",
    image: "/images/shop/burbulu-kocins-1.png",
    description: `Burbuļu kociņš paredzēts viena liela un iespaidīga ziepju burbuļa veidošanai.

Kociņa garums ir 50 cm, tāpēc tas ir īpaši piemērots bērniem. Viegls, ērti satverams un vienkārši lietojams.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "burbulu-kocins-2": {
    title: "Burbuļu kociņš Nr.2",
    price: "7.00 €",
    image: "/images/shop/burbulu-kocins-2.png",
    description: `Burbuļu kociņš paredzēts viena liela un iespaidīga ziepju burbuļa veidošanai.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "burbulu-kocins-3": {
    title: "Burbuļu kociņš Nr.3",
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-3.png",
    description: `Burbuļu kociņš trīs ziepju burbuļu veidošanai vienā līnijā.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "burbulu-kocins-4": {
    title: "Burbuļu kociņš Nr.4",
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-4.png",
    description: `Burbuļu kociņš vairāku lielu ziepju burbuļu veidošanai vienlaikus.

Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "burbulu-kocins-5": {
    title: "Burbuļu kociņš Nr.5",
    price: "10.00 €",
    image: "/images/shop/burbulu-kocins-5.png",
    description: `Burbuļu kociņš daudz mazu ziepju burbuļu veidošanai vienlaikus.
Kociņa garums ir 70 cm, tāpēc tas ir piemērots lielākiem bērniem un pieaugušajiem. Garāks rokturis nodrošina ērtāku lietošanu un ļauj veidot vēl iespaidīgākus ziepju burbuļus.

Vislabāko rezultātu nodrošina kopā ar mūsu profesionālo ziepju burbuļu koncentrātu.`,
  },
  "party-box": {
    title: "Party Box",
    price: "No 20 €",
    image: "/images/shop/party-box.png",
    description:
      "Izvēlies sev piemērotāko Party Box komplektu un burbuļu kociņus.",
  },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products[slug];

  if (!product) notFound();

  return (
    <main className="bg-[#fff7fb] pb-24 pt-12">
      <div className="mx-auto max-w-7xl px-6">
       <Link
  href="/veikals"
  className="mb-8 inline-flex items-center gap-2 text-base font-bold text-pink-500 transition-all hover:gap-3"
>
  <span className="text-xl">←</span>
  <span>Atpakaļ uz veikalu</span>
</Link>

        <div className="grid gap-16 lg:grid-cols-2">
          <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-xl">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="w-full rounded-3xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-black text-gray-900">
              {product.title}
            </h1>

            <p className="mt-8 text-5xl font-black text-pink-500">
              {product.price}
            </p>

            <ProductPurchase
              slug={slug}
              title={product.title}
              price={product.price}
              image={product.image}
            />

            {slug.includes("skidrums") && (
              <div className="mt-10 rounded-3xl border border-pink-200 bg-pink-50 p-6">
                <h3 className="text-xl font-bold text-pink-600">
                  Svarīga informācija
                </h3>

                <p className="mt-3 leading-8 text-gray-700">
                  Mūsu pudeles netiek piepildītas līdz pašai augšai. Brīvā vieta
                  ir atstāta apzināti, lai pirms lietošanas šķidrumu varētu rūpīgi
                  sakratīt un iegūtu vislabāko ziepju burbuļu kvalitāti.
                </p>
              </div>
            )}
          </div>
        </div>
{slug === "party-box" ? (
  <section className="mt-20">
    <PartyBoxConfigurator />
  </section>
) : (
  <section className="mt-20">
    <h2 className="text-3xl font-black text-gray-900">
      Produkta apraksts
    </h2>

    <div className="mt-6 whitespace-pre-line text-lg leading-8 text-gray-600">
      {product.description}
    </div>
  </section>
)}

<section className="mt-16">
  <div className="rounded-3xl border border-pink-100 bg-pink-50 p-5">
    <div className="grid gap-8 md:grid-cols-3">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          <Truck className="h-8 w-8 text-pink-500" strokeWidth={2.2} />
        </div>

        <h3 className="mt-4 text-xl font-bold">
          Piegāde visā Latvijā
        </h3>

        <p className="mt-2 leading-7 text-gray-600">
          Pasūtījumus nosūtām ar Omniva, DPD un Venipak pakomātiem.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          <Package className="h-8 w-8 text-pink-500" strokeWidth={2.2} />
        </div>

        <h3 className="mt-4 text-xl font-bold">
          Drošs iepakojums
        </h3>

        <p className="mt-2 leading-7 text-gray-600">
          Katrs pasūtījums tiek rūpīgi iepakots drošai piegādei.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          <Clock3 className="h-8 w-8 text-pink-500" strokeWidth={2.2} />
        </div>

        <h3 className="mt-4 text-xl font-bold">
          Ātra nosūtīšana
        </h3>

        <p className="mt-2 leading-7 text-gray-600">
          Pasūtījumi tiek izsūtīti 1–2 darba dienu laikā.
        </p>
      </div>
    </div>
  </div>
</section>
      </div>
    </main>
  );
}