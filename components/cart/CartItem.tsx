"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Props = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartItem({
  id,
  title,
  price,
  image,
  quantity,
}: Props) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="overflow-hidden rounded-[32px] border border-pink-100 bg-pink-50 p-4">
      <div className="flex gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white">
          <Image
            src={image}
            alt={title}
            width={120}
            height={120}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>

          <p className="mt-1 text-sm font-semibold text-pink-600">
            {price.toFixed(2)} €
          </p>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:bg-gray-100"
              aria-label="Samazināt daudzumu"
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="min-w-8 text-center font-bold">{quantity}</span>

            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white transition hover:bg-gray-100"
              aria-label="Palielināt daudzumu"
            >
              <Plus className="h-4 w-4" />
            </button>

            <button
              onClick={() => removeItem(id)}
              className="ml-auto text-sm font-semibold text-pink-500 transition hover:text-pink-700"
              aria-label="Dzēst preci"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}