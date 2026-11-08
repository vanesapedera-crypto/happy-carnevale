"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ArrowRight } from "lucide-react";
import { useLp, useTr } from "@/context/LangContext";
import Bubbles3D from "@/components/hero/Bubbles3D";

const products = [
  {
    id: "skidrums-3l",
    slug: "ziepju-burbulu-skidrums-3l",
    title: { lv: "Ziepju burbuļu koncentrāts 3 L", ru: "Концентрат для мыльных пузырей 3 л", en: "Soap bubble concentrate 3 L" },
    description: { lv: "Gatavs lietošanai. Veido lielus un izturīgus ziepju burbuļus.", ru: "Готов к использованию. Создаёт большие и прочные мыльные пузыри.", en: "Ready to use. Makes big, long-lasting soap bubbles." },
    price: "5.50 €",
    image: "/images/shop/ziepju-burbulu-skidrums-3l.jpg",
  },
  {
    id: "skidrums-5l",
    slug: "ziepju-burbulu-skidrums-5l",
    title: { lv: "Ziepju burbuļu koncentrāts 5 L", ru: "Концентрат для мыльных пузырей 5 л", en: "Soap bubble concentrate 5 L" },
    description: { lv: "Lielāks iepakojums biežākai lietošanai un pasākumiem.", ru: "Большая упаковка для частого использования и мероприятий.", en: "A bigger pack for frequent use and events." },
    price: "8.00 €",
    image: "/images/shop/ziepju-burbulu-skidrums-5l.jpg",
  },
  {
    id: "kocins-1",
    slug: "burbulu-kocins-1",
    title: { lv: "Burbuļu kociņš Nr.1", ru: "Палочка для пузырей №1", en: "Bubble wand No. 1" },
    description: { lv: "Veido vienu lielu ziepju burbuli. Augstums 50 cm.", ru: "Создаёт один большой мыльный пузырь. Высота 50 см.", en: "Makes one big soap bubble. Length 50 cm." },
    price: "6.00 €",
    image: "/images/shop/burbulu-kocins-1.jpg",
  },
  {
    id: "kocins-2",
    slug: "burbulu-kocins-2",
    title: { lv: "Burbuļu kociņš Nr.2", ru: "Палочка для пузырей №2", en: "Bubble wand No. 2" },
    description: { lv: "Veido vienu lielu ziepju burbuli. Augstums 70 cm.", ru: "Создаёт один большой мыльный пузырь. Высота 70 см.", en: "Makes one big soap bubble. Length 70 cm." },
    price: "7.00 €",
    image: "/images/shop/burbulu-kocins-2.jpg",
  },
  {
    id: "kocins-3",
    slug: "burbulu-kocins-3",
    title: { lv: "Burbuļu kociņš Nr.3", ru: "Палочка для пузырей №3", en: "Bubble wand No. 3" },
    description: { lv: "Veido vairākus savienotus ziepju burbuļus.", ru: "Создаёт несколько соединённых мыльных пузырей.", en: "Makes several connected soap bubbles." },
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-3.jpg",
  },
  {
    id: "kocins-4",
    slug: "burbulu-kocins-4",
    title: { lv: "Burbuļu kociņš Nr.4", ru: "Палочка для пузырей №4", en: "Bubble wand No. 4" },
    description: { lv: "Veido daudz burbuļus vienlaicīgi.", ru: "Создаёт много пузырей одновременно.", en: "Makes lots of bubbles at once." },
    price: "8.00 €",
    image: "/images/shop/burbulu-kocins-4.jpg",
  },
  {
    id: "kocins-5",
    slug: "burbulu-kocins-5",
    title: { lv: "Burbuļu kociņš Nr.5", ru: "Палочка для пузырей №5", en: "Bubble wand No. 5" },
    description: { lv: "Veido daudz burbuļus vienlaicīgi.", ru: "Создаёт много пузырей одновременно.", en: "Makes lots of bubbles at once." },
    price: "10.00 €",
    image: "/images/shop/burbulu-kocins-5.jpg",
    parcelLocker: false,
  },
    {
  id: "party-box",
  slug: "party-box",
  title: { lv: "Party Box", ru: "Party Box", en: "Party Box" },
  description: { lv: "Izvēlies sev piemērotāko Party Box komplektu un burbuļu kociņus.", ru: "Выберите подходящий набор Party Box и палочки для пузырей.", en: "Choose the Party Box set and bubble wands that suit you." },
  price: { lv: "No 20 €", ru: "От 20 €", en: "From €20" },
  image: "/images/shop/party-box.jpg",
  isConfigurable: true,
}
];

export default function ProductsSection() {
  const t = useTr();
  const lp = useLp();
  return (
<section className="relative overflow-hidden bg-[#FFF7FB] pt-16 pb-20 lg:pt-12 lg:pb-28">
        {/* 3D burbuļi virsraksta zonā */}
        <div className="absolute inset-x-0 top-0 z-0 hidden h-[560px] lg:block">
          <Bubbles3D variant="desktop" />
        </div>
        <div className="absolute inset-x-0 top-0 z-0 h-[420px] lg:hidden">
          <Bubbles3D variant="mobile" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
           <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-pink-500">
            {t({ lv: "VEIKALS", ru: "МАГАЗИН", en: "SHOP" })}
          </p>

          <h1 className="mt-3 text-5xl font-black text-gray-900">
            {t({ lv: "Ziepju burbuļi", ru: "Мыльные пузыри", en: "Soap bubbles" })}
            <span className="sr-only"> – </span>
            <span className="mt-2 block text-2xl font-bold text-gray-500">
              {t({
                lv: "milzu burbuļu šķidrums un kociņi",
                ru: "жидкость и палочки для гигантских пузырей",
                en: "giant bubble solution and wands",
              })}
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t({
              lv: "Viss nepieciešamais burbuļu maģijai – burbuļu koncentrāts un burbuļu kociņi, bērnu svētkiem, animatoriem un pasākumiem.",
              ru: "Всё для волшебства мыльных пузырей – концентрат и палочки для детских праздников, аниматоров и мероприятий.",
              en: "Everything for bubble magic – bubble concentrate and wands for kids' parties, entertainers and events.",
            })}
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
                  alt={`${t(product.title)} – ${t({ lv: "milzu ziepju burbuļiem", ru: "для гигантских мыльных пузырей", en: "for giant soap bubbles" })}`}
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
                  {t(product.title)}
                </h3>

                <p className="mt-3 min-h-[70px] leading-7 text-gray-600">
                  {t(product.description)}
                </p>

                <p className="mt-5 text-3xl font-black text-pink-500">
                  {typeof product.price === "string" ? product.price : t(product.price)}
                </p>
{product.parcelLocker === false && (
  <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-700">
    {t({ lv: "Pakomāta piegāde nav pieejama", ru: "Доставка в пакомат недоступна", en: "Parcel locker delivery not available" })}
  </p>
)}
                <Link
                  href={lp(`/veikals/${product.slug}`)}
                  className="mt-6 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-4 text-lg font-bold text-white transition hover:scale-[1.02] hover:shadow-xl"
                >
                  {t({ lv: "Apskatīt produktu", ru: "Подробнее", en: "View product" })}
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