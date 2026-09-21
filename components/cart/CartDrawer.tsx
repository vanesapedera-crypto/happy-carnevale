"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, shipping, total, updateQuantity, removeItem } =
    useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Aizvērt grozu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-pink-100 px-6 py-5">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Tavs grozs</h2>
            <p className="text-sm text-gray-500">
              {items.length} prece{items.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-pink-50 p-2 text-pink-600 transition hover:bg-pink-100"
            aria-label="Aizvērt"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-100">
                <ShoppingBag className="h-8 w-8 text-pink-500" />
              </div>

              <h3 className="mt-5 text-2xl font-black text-gray-900">
                Grozs ir tukšs
              </h3>

              <p className="mt-3 text-gray-600">
                Pievieno produktus, lai turpinātu iepirkšanos.
              </p>

              <Link
                href="/veikals"
                onClick={onClose}
                className="mt-8 rounded-full bg-pink-500 px-6 py-3 font-bold text-white transition hover:bg-pink-600"
              >
                Doties uz veikalu
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-pink-100 bg-pink-50 p-4"
                >
                  <div className="flex gap-4">
                    <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={120}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm font-semibold text-pink-600">
                        {item.price.toFixed(2)} €
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1),
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>

                        <span className="min-w-8 text-center font-bold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-sm font-semibold text-pink-500 transition hover:text-pink-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-pink-100 px-6 py-5">
          <div className="space-y-3 text-sm">
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

            <div className="flex items-center justify-between border-t border-pink-100 pt-3 text-lg font-black text-gray-900">
              <span>Kopā</span>
              <span>{total.toFixed(2)} €</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center rounded-full bg-pink-500 px-6 py-4 font-bold text-white transition hover:bg-pink-600"
            >
              Skatīt grozu
            </Link>

            <button className="rounded-full border border-pink-200 px-6 py-4 font-bold text-pink-600 transition hover:bg-pink-50">
              Noformēt pasūtījumu
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}