import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, Package, Clock3 } from "lucide-react";
import ProductPurchase from "@/components/shop/ProductPurchase";
import PartyBoxConfigurator from "@/components/shop/PartyBoxConfigurator";
import { products } from "@/lib/products";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug];

  if (!product) return {};

  const description = (product.description ?? "").replace(/\s+/g, " ").trim();

  return {
    title: `${product.title} | Happy Carnevale`,
    description:
      description.length > 160 ? `${description.slice(0, 157)}...` : description,
  };
}

export default async function ProductPage({ params }: PageProps) {
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
              parcelLocker={product.parcelLocker}
            />
            {product.parcelLocker === false && (
  <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
    <div className="flex items-start gap-3">
      <Package className="mt-0.5 h-6 w-6 text-amber-600" />

      <div>
        <p className="font-bold text-amber-900">
          Pakomāta piegāde nav pieejama
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          Šī produkta izmēra dēļ to nevar nosūtīt ar pakomātu.
          Lūdzu, izvēlieties saņemšanu uz vietas (Stabu iela 90, Rīga).
        </p>
      </div>
    </div>
  </div>
)}

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
Pasūtījumus nosūtam ar jebkuru Jums ērtu pakomātu.        </p>
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