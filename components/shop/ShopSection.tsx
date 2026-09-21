"use client";

import Image from "next/image";
import Link from "next/link";

const products = [
  {
    title: "3L šķidrums",
    price: "€5.50",
    image: "/shop/3l.jpg",
  },
  {
    title: "5L šķidrums",
    price: "€8.00",
    image: "/shop/5l.jpg",
  },
  {
    title: "Komplekts Nr.1",
    price: "€6.00",
    image: "/shop/nr1.jpg",
  },
  {
    title: "Komplekts Nr.2",
    price: "€7.00",
    image: "/shop/nr2.jpg",
  },
  {
    title: "Komplekts Nr.3",
    price: "€8.00",
    image: "/shop/nr3.jpg",
  },
  {
    title: "Komplekts Nr.4",
    price: "€8.00",
    image: "/shop/nr4.jpg",
  },
  {
    title: "Komplekts Nr.5",
    price: "€10.00",
    image: "/shop/nr5.jpg",
  },
  {
    title: "Party Box",
    price: "No €20",
    image: "/shop/party-box.png",
  },
];

export default function ShopSection() {
  return (
    <section className="bg-white py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Virsraksts */}

        <div className="mb-16 text-center">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            🫧 Burbulītes Burbuļi
          </span>

          <h2 className="mt-6 text-5xl font-black text-gray-900">
            Burbuļu veikals
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-gray-600">
            Profesionāli ziepju burbuļu koncentrāti un burbuļu komplekti
            bērnu svētkiem, pasākumiem un ikdienas priekam.
          </p>
        </div>

        {/* Produkti */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.title}
              className="group overflow-hidden rounded-[30px] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-72 bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {product.title}
                </h3>

                <p className="mt-3 text-3xl font-black text-pink-500">
                  {product.price}
                </p>

                {product.title === "Party Box" ? (
                  <Link
                    href="/veikals/party-box"
                    className="mt-6 flex w-full items-center justify-center rounded-full bg-pink-500 py-4 font-semibold text-white transition hover:bg-pink-600"
                  >
                    Izvēlēties komplektu
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="mt-6 w-full rounded-full bg-pink-500 py-4 font-semibold text-white transition hover:bg-pink-600"
                  >
                    Pievienot grozam
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}