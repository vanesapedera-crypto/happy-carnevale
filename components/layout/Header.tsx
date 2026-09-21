"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { items } = useCart();

  const count = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className="border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-24 lg:px-8">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Happy Carnevale"
              width={150}
              height={90}
              priority
              className="h-10 w-auto lg:h-16"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-[17px] font-medium lg:flex">
            <Link href="/" className="text-pink-500 hover:text-pink-600">
              Sākums
            </Link>

            <div className="group relative">
              <Link
                href="/kostimu-noma"
                className="flex items-center gap-1 hover:text-pink-500"
              >
                Kostīmu noma
                <ChevronDown size={18} />
              </Link>
            </div>

            <div className="group relative">
              <Link
                href="/pasakumu-organizesana"
                className="flex items-center gap-1 hover:text-pink-500"
              >
                Pasākumu organizēšana
                <ChevronDown size={18} />
              </Link>
            </div>

            <Link href="/veikals">
              Burbulītes burbuļi
            </Link>

            <Link href="/kontakti">
              Kontakti
            </Link>
          </nav>

          <div className="flex items-center gap-4 lg:gap-6">
            <button
              className="hidden lg:block hover:text-pink-500"
              aria-label="Meklēt"
            >
              <Search className="h-6 w-6" />
            </button>

            <Link
              href="/cart"
              aria-label="Grozs"
              className="relative hover:text-pink-500"
            >
              <ShoppingCart className="h-6 w-6" />

              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden"
              aria-label="Izvēlne"
            >
              {mobileOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="fixed left-0 right-0 top-16 bottom-0 bg-white lg:hidden">
            <nav className="flex flex-col py-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="border-b px-6 py-4"
              >
                Sākums
              </Link>

              <Link
                href="/kostimu-noma"
                onClick={() => setMobileOpen(false)}
                className="border-b px-6 py-4"
              >
                Kostīmu noma
              </Link>

              <Link
                href="/pasakumu-organizesana"
                onClick={() => setMobileOpen(false)}
                className="border-b px-6 py-4"
              >
                Pasākumu organizēšana
              </Link>

              <Link
                href="/veikals"
                onClick={() => setMobileOpen(false)}
                className="border-b px-6 py-4"
              >
                Burbulītes burbuļi
              </Link>

              <Link
                href="/kontakti"
                onClick={() => setMobileOpen(false)}
                className="border-b px-6 py-4"
              >
                Kontakti
              </Link>

              <div className="flex items-center gap-6 px-6 py-5">
                <button>
                  <Search className="h-6 w-6" />
                </button>

                <Link
                  href="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="relative"
                  aria-label="Grozs"
                >
                  <ShoppingCart className="h-6 w-6" />

                  {count > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white">
                      {count}
                    </span>
                  )}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}