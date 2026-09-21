"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

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
    title: "Burbuļu kociņš Nr.2",
    image: "/images/shop/burbulu-kocins-2.png",
  },
  {
    id: "3",
    title: "Burbuļu kociņš Nr.3",
    image: "/images/shop/burbulu-kocins-3.png",
  },
  {
    id: "4",
    title: "Burbuļu kociņš Nr.4",
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

        <div className="text-center">
          <span className="rounded-full bg-pink-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.3em] text-pink-600">
            Party Box
          </span>

          <h2 className="mt-5 text-5xl font-black text-[#17223b]">
            Izvēlies sev piemērotāko komplektu
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Katram komplektam ir noteikts aukliņu skaits, un vari izvēlēties
            tieši tos burbuļu kociņus, kas vislabāk piemēroti Tavam pasākumam.
          </p>
        </div>

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

              <p className="mt-3 text-lg text-gray-600">
                {box.ropes} aukliņa{box.ropes > 1 ? "s" : ""}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
        {/* Kreisā puse */}
<div>
  <h3 className="text-4xl font-black text-[#17223b]">
    Izvēlies burbuļu kociņus
  </h3>

  <p className="mt-2 text-lg text-gray-600">
    Izvēlies savam komplektam līdz {selectedBox.ropes} burbuļu kociņiem.
  </p>

  <div className="mt-8 space-y-10">
    {Array.from({ length: selectedBox.ropes }).map((_, index) => (
      <div key={index}>
        <h4 className="mb-5 text-xl font-bold text-[#17223b]">
          Aukliņa #{index + 1}
        </h4>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sticks.map((stick) => (
            <button
              key={stick.id}
              type="button"
              onClick={() => chooseStick(index, stick.id)}
              className={`group rounded-[28px] border-2 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                selectedSticks[index] === stick.id
                  ? "border-pink-500 shadow-lg"
                  : "border-gray-200 hover:border-pink-300"
              }`}
            >
              <Image
                src={stick.image}
                alt={stick.title}
                width={180}
                height={180}
                className="mx-auto h-36 w-36 object-contain transition duration-300 group-hover:scale-105"
              />

              <p className="mt-4 text-center text-lg font-bold text-[#17223b]">
                {stick.title}
              </p>

              <div className="mt-5 flex justify-center">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-md border-2 transition ${
                    selectedSticks[index] === stick.id
                      ? "border-pink-500 bg-pink-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {selectedSticks[index] === stick.id && "✓"}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

{/* Labā puse */}
<div className="rounded-[32px] bg-white p-8 shadow-xl">
  <h3 className="text-3xl font-black text-[#17223b]">
    Video instrukcija
  </h3>

  <p className="mt-4 leading-8 text-gray-600">
    Noskaties īsu video, kur soli pa solim parādīts,
    kā salikt Party Box un pareizi izmantot burbuļu kociņus.
  </p>

  <video
    controls
    className="mt-8 w-full rounded-2xl shadow-lg"
  >
    <source
      src="/videos/shop/instrukcija.mp4"
      type="video/mp4"
    />
  </video>
</div>

</div>
<div className="mt-16 border-t border-pink-100 pt-12">
  <div className="flex flex-col items-center gap-6">

    <div className="text-center">
      <h3 className="text-3xl font-black text-[#17223b]">
        Tavs Party Box ir gandrīz gatavs!
      </h3>

      <p className="mt-3 text-lg text-gray-600">
        Kad esi izvēlējies komplektu un visus burbuļu kociņus,
        vari pievienot savu Party Box grozam.
      </p>
    </div>

<button
  type="button"
  onClick={addPartyBoxToCart}
  disabled={!allSelected}
  className="flex w-full max-w-xl items-center justify-center gap-3 rounded-full bg-pink-500 px-10 py-5 text-xl font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
>
  <ShoppingCart className="h-6 w-6" />
  Pievienot Party Box grozam
</button>

    {!allSelected && (
      <p className="text-center text-sm text-gray-500">
        Lai turpinātu, izvēlies burbuļu kociņu katrai aukliņai.
      </p>
    )}

  </div>
</div>

</div>
</section>
);
}