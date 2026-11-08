"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang, useLp, useTr } from "@/context/LangContext";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

const NAV = [
  { path: "/", label: { lv: "Sākums", ru: "Главная", en: "Home" }, dropdown: false },
  {
    path: "/kostimu-noma",
    label: { lv: "Kostīmu noma", ru: "Аренда костюмов", en: "Costume rental" },
    dropdown: true,
  },
  {
    path: "/pasakumu-organizesana",
    label: { lv: "Pasākumu organizēšana", ru: "Организация праздников", en: "Party services" },
    dropdown: true,
  },
  {
    path: "/veikals",
    label: { lv: "Burbulītes burbuļi", ru: "Мыльные пузыри", en: "Bubble shop" },
    dropdown: false,
  },
  { path: "/kontakti", label: { lv: "Kontakti", ru: "Контакты", en: "Contact" }, dropdown: false },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const lang = useLang();
  const lp = useLp();
  const t = useTr();

  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  const cartLabel = t({ lv: "Grozs", ru: "Корзина", en: "Cart" });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[9999] bg-white border-b border-pink-100 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-24 lg:px-8">
          <Link href={lp("/")} className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Happy Carnevale"
              width={150}
              height={90}
              priority
              className="h-10 w-auto lg:h-16"
            />
          </Link>

          {/* Šaurākos ekrānos (1024–1279 px) mazāks teksts un bez "Sākums" (to dara logo) */}
          <nav
            className={`hidden items-center whitespace-nowrap font-medium lg:flex lg:gap-5 lg:text-[15px] ${
              lang === "lv" ? "xl:gap-8 xl:text-[17px]" : "xl:gap-6 xl:text-[16px]"
            }`}
          >
            {NAV.map((item, index) => (
              <Link
                key={item.path}
                href={lp(item.path)}
                className={
                  index === 0
                    ? "hidden text-pink-500 hover:text-pink-600 xl:inline"
                    : item.dropdown
                      ? "flex items-center gap-1 hover:text-pink-500"
                      : "hover:text-pink-500"
                }
              >
                {t(item.label)}
                {item.dropdown && <ChevronDown size={18} />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>

            <Link
              href={lp("/cart")}
              aria-label={cartLabel}
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
              aria-label={t({ lv: "Izvēlne", ru: "Меню", en: "Menu" })}
            >
              {mobileOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[9998] bg-white pt-16 lg:hidden">
          <nav className="flex flex-col text-lg">
            {NAV.map((item) => (
              <Link
                key={item.path}
                href={lp(item.path)}
                onClick={() => setMobileOpen(false)}
                className="border-b px-6 py-5"
              >
                {t(item.label)}
              </Link>
            ))}

            <div className="flex items-center justify-between gap-6 px-6 py-6">
              <Link
                href={lp("/cart")}
                onClick={() => setMobileOpen(false)}
                className="relative"
                aria-label={cartLabel}
              >
                <ShoppingCart className="h-6 w-6" />

                {count > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white">
                    {count}
                  </span>
                )}
              </Link>

              <LanguageSwitcher onNavigate={() => setMobileOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
