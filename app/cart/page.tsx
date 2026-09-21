"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, subtotal, shipping, total, updateQuantity, removeItem } =
    useCart();
    console.log("CART ITEMS", items);

  if (items.length === 0) {
    return (
      <main className="bg-[#fff7fb] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100">
            <ShoppingBag className="h-10 w-10 text-pink-500" />
          </div>

          <h1 className="mt-8 text-5xl font-black text-gray-900">
            Tavs grozs ir tukšs
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Pievieno produktus, Party Box vai citus pakalpojumus, lai turpinātu
            pasūtījumu.
          </p>

          <Link
            href="/veikals"
            className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
          >
            Doties uz veikalu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#fff7fb] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.35em] text-pink-600">
            GROZS
          </span>

          <h1 className="mt-6 text-5xl font-black text-gray-900">
            Tavs pasūtījums
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Pārskati savus izvēlētos produktus un turpini uz noformēšanu.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-[32px] border border-pink-100 bg-white shadow-xl"
              >
                <div className="grid gap-6 p-6 md:grid-cols-[140px_1fr_auto] md:items-center">
                  <div className="overflow-hidden rounded-3xl bg-pink-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={220}
                      height={220}
                      className="h-36 w-full object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-gray-900">
                      {item.title}
                    </h2>

                    <p className="mt-2 text-lg font-semibold text-pink-500">
                      {item.price.toFixed(2)} €
                    </p>

                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:bg-gray-100"
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-10 text-center text-lg font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white transition hover:bg-gray-100"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="inline-flex items-center gap-2 rounded-full border border-pink-200 px-5 py-3 text-sm font-semibold text-pink-600 transition hover:bg-pink-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      Noņemt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-[32px] border border-pink-100 bg-white p-8 shadow-xl">
            <h2 className="text-3xl font-black text-gray-900">
              Pasūtījuma kopsavilkums
            </h2>

            <div className="mt-8 space-y-4 text-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Preces</span>
                <span className="font-semibold">{subtotal.toFixed(2)} €</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Piegāde</span>
                <span className="font-semibold">
                  {shipping === 0 ? "Bezmaksas" : `${shipping.toFixed(2)} €`}
                </span>
              </div>

              <div className="h-px bg-gray-200" />

              <div className="flex items-center justify-between text-2xl font-black text-gray-900">
                <span>Kopā</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            <button className="mt-8 w-full rounded-full bg-pink-500 py-4 text-lg font-bold text-white transition hover:bg-pink-600">
              Noformēt pasūtījumu
            </button>

            <Link
              href="/veikals"
              className="mt-4 block text-center text-sm font-semibold text-pink-600 hover:underline"
            >
              Turpināt iepirkties
            </Link>

            <p className="mt-8 text-sm leading-7 text-gray-500">
              Piegāde ir bez maksas pasūtījumiem virs 40 €.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}