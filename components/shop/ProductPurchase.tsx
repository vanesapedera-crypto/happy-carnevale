"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Props = {
  slug: string;
  title: string;
  price: string;
  image: string;
};

export default function ProductPurchase({ slug, title, price, image }: Props) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const priceValue = Number(
    price.replace("€", "").replace(/\s/g, "").replace(",", "."),
  );

  const handleAdd = () => {
    addItem(
      {
        id: slug,
        title,
        price: priceValue,
        image,
      },
      quantity,
    );
  };

  return (
    <div className="mt-10">
      <p className="mb-3 font-semibold text-gray-800">Daudzums</p>

      <div className="flex w-fit items-center rounded-2xl border border-gray-200 bg-white">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="p-4 transition hover:bg-gray-100"
        >
          <Minus className="h-5 w-5" />
        </button>

        <span className="px-8 text-xl font-bold">{quantity}</span>

        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="p-4 transition hover:bg-gray-100"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-8 py-5 text-lg font-bold text-white shadow-xl transition hover:scale-[1.02] hover:shadow-2xl"
      >
        <ShoppingCart className="h-6 w-6" />
        Pievienot grozam
      </button>
    </div>
  );
}