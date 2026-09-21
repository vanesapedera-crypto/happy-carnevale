"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";

const products = [
  {
    id: "skidrums-3l",
    slug: "ziepju-burbulu-skidrums-3l",
    title: "Ziepju burbuļu koncentrāts 3 L",
    description:
      "Gatavs lietošanai. Veido lielus un izturīgus ziepju burbuļus.",
    price: "5.50 €",
    image: "/images/shop/ziepju-burbulu-skidrums-3l.png",
  },
  {
    id: "skidrums-5l",
    slug: "ziepju-burbulu-skidrums-5l",
    title: "Ziepju burbuļu koncentrāts 5 L",
    description: "Lielāks iepakojums biežākai lietošanai un pasākumiem.",
    price: "8.00 €",
    image: "/images/shop/ziepju-burbulu-skidrums-5l.png",
  },
  {
    id: "kocins-1",
    slug: "burbulu-kocins-1",
    title: "Burbuļu kociņš Nr.1",
    description: "Veido vienu lielu ziepju burbuli. Augstums 50 cm.",
    price: "6.00 €",
    image: "/images/shop/burbulu-kocins-1.png",
  },
  {
    id: "kocins-2",
    slug: "burbulu-kocins-2",
    title: "Burbuļu kociņš Nr.2",
    description: "Veido vienu lielu ziepju burbuli. Augstums 70 cm.",
    price: "7.00 €",
    image: "/images/shop/burbulu-kocins-2.png",
  },
  {
    id: "kocins-3",
    slug: "burbulu-kocins-3",
    title: "Burbuļu kociņš Nr.3",
    description: "Veido vairākus savienotus ziepju burbuļus.",
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-3.png",
  },
  {
    id: "kocins-4",
    slug: "burbulu-kocins-4",
    title: "Burbuļu kociņš Nr.4",
    description: "Veido četrus burbuļus vienlaicīgi.",
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-4.png",
  },
  {
    id: "kocins-5",
    slug: "burbulu-kocins-5",
    title: "Burbuļu kociņš Nr.5",
    description: "Veido daudz burbuļus vienlaicīgi.",
    price: "10.00 €",
    image: "/images/shop/burbulu-kocins-5.png",
  },
    {
  id: "party-box",
  slug: "party-box",
  title: "Party Box",
  description:
    "Izvēlies sev piemērotāko Party Box komplektu un burbuļu kociņus.",
  price: "No 20 €",
  image: "/images/shop/party-box.png",
  isConfigurable: true,
}
];

export default function ProductsSection() {
  return (
    <section id="veikals" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-pink-500">
            VEIKALS
          </p>

          <h2 className="mt-3 text-5xl font-black text-gray-900">
            Ziepju burbuļu produkti
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Viss nepieciešamais burbuļu maģijai – ziepju burbuļu koncentrāts un
            burbuļu kociņi, bērnu svētkiem, animatoriem un pasākumiem.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-[30px] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow transition hover:bg-pink-500 hover:text-white">
                  <Heart size={20} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {product.title}
                </h3>

                <p className="mt-3 min-h-[70px] leading-7 text-gray-600">
                  {product.description}
                </p>

                <p className="mt-5 text-3xl font-black text-pink-500">
                  {product.price}
                </p>

                <Link
                  href={`/veikals/${product.slug}`}
                  className="mt-6 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4 text-lg font-bold text-white transition hover:scale-[1.02] hover:shadow-xl"
                >
                  Apskatīt produktu
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}