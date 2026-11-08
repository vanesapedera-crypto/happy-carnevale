"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Droplets, WandSparkles } from "lucide-react";
import { useLp, useTr } from "@/context/LangContext";


  const boxes = [
  {
    id: "small",
    title: { lv: "Mazais komplekts", ru: "Малый набор", en: "Small set" },
    price: 20,
    ropes: 1,
  },
  {
    id: "medium",
    title: { lv: "Vidējais komplekts", ru: "Средний набор", en: "Medium set" },
    price: 25,
    ropes: 2,
  },
  {
    id: "large",
    title: { lv: "Lielais komplekts", ru: "Большой набор", en: "Large set" },
    price: 30,
    ropes: 3,
  },
];


const sticks = [
  {
    id: "2",
    title: { lv: "Burbuļu kociņš A", ru: "Палочка для пузырей A", en: "Bubble wand A" },
    image: "/images/shop/burbulu-kocins-11.jpg",
  },
  {
    id: "3",
    title: { lv: "Burbuļu kociņš B", ru: "Палочка для пузырей B", en: "Bubble wand B" },
    image: "/images/shop/burbulu-kocins-33.jpg",
  },
  {
    id: "4",
    title: { lv: "Burbuļu kociņš C", ru: "Палочка для пузырей C", en: "Bubble wand C" },
    image: "/images/shop/burbulu-kocins-44.jpg",
  },
];

export default function PartyBoxConfigurator() {
  const t = useTr();
  const lp = useLp();
  const { addItem } = useCart();
  const [selectedBox, setSelectedBox] = useState(boxes[0]);

  const [selectedSticks, setSelectedSticks] = useState<string[]>(
    Array(boxes[0].ropes).fill("")
  );

  const changeBox = (box: (typeof boxes)[number]) => {
    setSelectedBox(box);
    setSelectedSticks(Array(box.ropes).fill(""));
  };

  const chooseStick = (index: number, stickId: string) => {
    const copy = [...selectedSticks];
    copy[index] = stickId;
    setSelectedSticks(copy);
  };

  const allSelected = selectedSticks.every(Boolean);
const addPartyBoxToCart = () => {
    if (!allSelected) return;

    const stickTitles = selectedSticks.map(
      (id) => {
        const stick = sticks.find((item) => item.id === id);
        return stick ? t(stick.title) : id;
      }
    );

    addItem({
      id: `party-box-${selectedBox.id}-${selectedSticks.join("-")}`,
      title: `Party Box — ${t(selectedBox.title)} (${stickTitles.join(", ")})`,
      image: "/images/shop/party-box.jpg",
      price: selectedBox.price,
    });
  };
  return (
   <section className="py-20">
  <div className="mx-auto max-w-7xl px-6">

    <Link
      href={lp("/veikals")}
      className="mb-8 inline-flex items-center gap-2 text-lg font-semibold text-pink-500 hover:text-pink-600 transition"
    >
      ← {t({ lv: "Atpakaļ uz veikalu", ru: "Назад в магазин", en: "Back to shop" })}
    </Link>

    <div className="rounded-[40px] bg-[#fff7fb] p-10 shadow-xl">

      <div className="mx-auto max-w-2xl text-center">
  <span className="inline-block rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-pink-600">
    Party Box
  </span>

  <h2 className="mt-4 text-3xl font-black text-[#17223b] md:text-5xl">
    {t({ lv: "Izvēlies savu Party Box", ru: "Выберите свой Party Box", en: "Choose your Party Box" })}
  </h2>

  <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
    {t({ lv: "Katrā komplektā ietilpst", ru: "В каждый набор входит", en: "Every set includes" })}{" "}
    <strong>{t({ lv: "5 L ziepju burbuļu koncentrāts", ru: "5 л концентрата для мыльных пузырей", en: "5 L of soap bubble concentrate" })}</strong>{" "}
    {t({
      lv: "un noteikts burbuļu kociņu skaits. Izvēlies komplektu un pēc tam izvēlies burbuļu kociņus.",
      ru: "и определённое количество палочек для пузырей. Выберите набор, а затем палочки.",
      en: "and a set number of bubble wands. Choose a set, then pick your wands.",
    })}
  </p>
</div>

<div className="mt-10 grid gap-5 md:grid-cols-3"></div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {boxes.map((box) => (
            <button
              key={box.id}
              type="button"
              onClick={() => changeBox(box)}
              className={`rounded-[30px] border-2 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                selectedBox.id === box.id
                  ? "border-pink-500 shadow-xl"
                  : "border-pink-100"
              }`}
            >
              <h3 className="text-2xl font-black text-pink-500">
                {t(box.title)}
              </h3>

             <p className="mt-3 text-5xl font-black text-[#17223b]">
  {box.price} €
</p>

<div className="mt-8 space-y-4">

  <div className="flex items-center gap-3">
    <Droplets className="h-5 w-5 text-pink-500" />

    <span className="text-sm font-medium text-gray-700">
      {t({ lv: "5L ziepju burbuļu koncentrāts", ru: "5 л концентрата для пузырей", en: "5 L bubble concentrate" })}
    </span>
  </div>

  <div className="flex items-center gap-3">
    <WandSparkles className="h-5 w-5 text-pink-500" />

    <span className="text-sm font-medium text-gray-700">
      {box.ropes}{" "}
      {box.ropes > 1
        ? t({ lv: "burbuļu kociņi", ru: box.ropes < 5 ? "палочки для пузырей" : "палочек для пузырей", en: "bubble wands" })
        : t({ lv: "burbuļu kociņš", ru: "палочка для пузырей", en: "bubble wand" })}
    </span>
  </div>

</div>
     
            </button>
          ))}
        </div>

<div className="mt-14">
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
  {/* Burbuļu kociņi */}
  <div className="rounded-3xl bg-white p-6 shadow-md">
    <h3 className="text-3xl font-black text-[#17223b]">
      {t({ lv: "Izvēlies burbuļu kociņus", ru: "Выберите палочки для пузырей", en: "Choose your bubble wands" })}
    </h3>

    <p className="mt-2 text-gray-600">
      {t({
        lv: `Izvēlies līdz ${selectedBox.ropes} burbuļu kociņiem.`,
        ru: `Выберите до ${selectedBox.ropes} палочек.`,
        en: `Choose up to ${selectedBox.ropes} bubble wands.`,
      })}
    </p>

    <div className="mt-6 space-y-6">
      {Array.from({ length: selectedBox.ropes }).map((_, index) => (
        <div key={index}>
          <h4 className="mb-4 text-xl font-bold text-[#17223b]">
            {t({
              lv: `${index + 1}. burbuļu kociņa izvēle`,
              ru: `Палочка №${index + 1}`,
              en: `Bubble wand ${index + 1}`,
            })}
          </h4>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {sticks.map((stick) => (
              <button
                key={stick.id}
                type="button"
                onClick={() => chooseStick(index, stick.id)}
                className={`group rounded-2xl border-2 bg-white p-4 transition ${
                  selectedSticks[index] === stick.id
                    ? "border-pink-500 shadow-md"
                    : "border-gray-200 hover:border-pink-300"
                }`}
              >
                <Image
                  src={stick.image}
                  alt={t(stick.title)}
                  width={140}
                  height={140}
                  className="mx-auto h-24 w-24 object-contain"
                />

                <p className="mt-3 text-center text-sm font-semibold text-[#17223b]">
                  {t(stick.title)}
                </p>

                <div className="mt-3 flex justify-center">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                      selectedSticks[index] === stick.id
                        ? "border-pink-500 bg-pink-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    ✓
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-8 border-t border-pink-100 pt-6">
  <button
    type="button"
    onClick={addPartyBoxToCart}
    disabled={!allSelected}
    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-pink-500 px-6 py-4 text-lg font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
  >
    <ShoppingCart className="h-5 w-5" />
    {t({ lv: "Pievienot grozam", ru: "Добавить в корзину", en: "Add to cart" })}
  </button>

  {!allSelected && (
    <p className="mt-3 text-center text-sm text-gray-500">
      {t({
        lv: "Izvēlies visus burbuļu kociņus, lai turpinātu.",
        ru: "Выберите все палочки, чтобы продолжить.",
        en: "Choose all the bubble wands to continue.",
      })}
    </p>
  )}
</div>
    </div>
  </div>

<div className="mt-16 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
  <h3 className="text-2xl font-bold text-[#17223b]">
    {t({ lv: "Video instrukcija", ru: "Видеоинструкция", en: "Video guide" })}
  </h3>

  <p className="mt-2 text-gray-600">
    {t({
      lv: "Noskaties kā uzjaukt labāko milzu ziepju burbuļu šķidrumu un izmantot kociņus!",
      ru: "Посмотрите, как приготовить лучшую жидкость для гигантских пузырей и пользоваться палочками!",
      en: "Watch how to mix the best giant bubble solution and use the wands!",
    })}
  </p>

  <video
    controls
    className="mt-6 w-full rounded-2xl"
  >
    <source
      src="/videos/shop/instrukcija.mp4"
      type="video/mp4"
    />
  </video>
</div>

        </div>
        </div>
      </div>
      </div>
    </section>
  );
}