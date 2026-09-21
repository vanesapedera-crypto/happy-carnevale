"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { items } = useCart();

  const count = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <Link
      href="/cart"
      className="relative flex h-11 w-11 items-center justify-center"
    >
      <ShoppingBag className="h-6 w-6" />

      {count > 0 && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
          {count}
        </span>
      )}
    </Link>
  );
}