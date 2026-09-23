"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Droplets, WandSparkles } from "lucide-react";


  const boxes = [
  {
    id: "small",
    title: "Mazais komplekts",
    price: 20,
    ropes: 1,
  },
  {
    id: "medium",
    title: "Vidējais komplekts",
    price: 25,
    ropes: 2,
  },
  {
    id: "large",
    title: "Lielais komplekts",
    price: 30,
    ropes: 3,
  },
];


const sticks = [
  {
    id: "2",
    title: "Burbuļu kociņš A",
    image: "/images/shop/burbulu-kocins-2.png",
  },
  {
    id: "3",
    title: "Burbuļu kociņš B",
    image: "/images/shop/burbulu-kocins-3.png",
  },
  {
    id: "4",
    title: "Burbuļu kociņš C",
    image: "/images/shop/burbulu-kocins-4.png",
  },
];

export default function PartyBoxConfigurator() {
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
  alert("1");

  alert(`allSelected = ${allSelected}`);

  if (!allSelected) {
    alert("2");
    return;
  }

  alert("3");

  addItem({
    id: "test-party-box",
    title: "Party Box",
    image: "/images/shop/party-box.png",
    price: 20,
  });

  alert("4");
};
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl rounded-[40px] bg-[#fff7fb] p-10 shadow-xl">

      <div className="mx-auto max-w-2xl text-center">
  <span className="inline-block rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-pink-600">
    Party Box
  </span>

  <h2 className="mt-4 text-3xl font-black text-[#17223b] md:text-5xl">
    Izvēlies savu Party Box
  </h2>

  <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
    Katrā komplektā ietilpst <strong>5 L ziepju burbuļu šķidrums</strong> un
    noteikts burbuļu kociņu skaits. Izvēlies komplektu un pēc tam izvēlies
    burbuļu kociņus.
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
                {box.title}
              </h3>

             <p className="mt-3 text-5xl font-black text-[#17223b]">
  {box.price} €
</p>

<div className="mt-8 space-y-4">

  <div className="flex items-center gap-3">
    <Droplets className="h-5 w-5 text-pink-500" />

    <span className="text-sm font-medium text-gray-700">
      5L ziepju burbuļu šķidrums
    </span>
  </div>

  <div className="flex items-center gap-3">
    <WandSparkles className="h-5 w-5 text-pink-500" />

    <span className="text-sm font-medium text-gray-700">
      {box.ropes} burbuļu kociņ{box.ropes > 1 ? "i" : "š"}
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
      Izvēlies burbuļu kociņus
    </h3>

    <p className="mt-2 text-gray-600">
      Izvēlies līdz {selectedBox.ropes} burbuļu kociņiem.
    </p>

    <div className="mt-6 space-y-6">
      {Array.from({ length: selectedBox.ropes }).map((_, index) => (
        <div key={index}>
          <h4 className="mb-4 text-xl font-bold text-[#17223b]">
            {index + 1}. burbuļu kociņa izvēle
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
                  alt={stick.title}
                  width={140}
                  height={140}
                  className="mx-auto h-24 w-24 object-contain"
                />

                <p className="mt-3 text-center text-sm font-semibold text-[#17223b]">
                  {stick.title}
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
    Pievienot grozam
  </button>

  {!allSelected && (
    <p className="mt-3 text-center text-sm text-gray-500">
      Izvēlies visus burbuļu kociņus, lai turpinātu.
    </p>
  )}
</div>
    </div>
  </div>

<div className="mt-16 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
  <h3 className="text-2xl font-bold text-[#17223b]">
    Video instrukcija
  </h3>

  <p className="mt-2 text-gray-600">
    Noskaties, kā pareizi salikt Party Box un izmantot burbuļu kociņus.
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
    </section>
  );
}