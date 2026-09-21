"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingBag } from "lucide-react";

const links = [
  {
    title: "Sākums",
    href: "/",
  },
  {
    title: "Kostīmu noma",
    href: "/kostimu-noma",
  },
  {
    title: "Pasākumu organizēšana",
href: "/pasakumu-organizesana",
  },
  {
    title: "Burbulītes burbuļi",
    href: "/veikals",
  },
  {
    title: "Kontakti",
    href: "/kontakti",
  },
];

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="mx-auto mt-6 max-w-7xl px-6">
        <div className="flex h-24 items-center justify-between rounded-full bg-white px-8 shadow-xl">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Happy Carnevale"
              width={120}
              height={70}
              priority
            />
          </Link>

          {/* Izvēlne */}
          <nav className="hidden items-center gap-10 lg:flex">
            {links.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="font-medium text-gray-800 transition hover:text-pink-500"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Ikonas */}
          <div className="flex items-center gap-6">
            <button aria-label="Meklēt">
              <Search className="h-6 w-6 text-gray-700 hover:text-pink-500 transition" />
            </button>

            <button className="relative" aria-label="Grozs">
              <ShoppingBag className="h-6 w-6 text-gray-700 hover:text-pink-500 transition" />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-[10px] text-white">
                0
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}