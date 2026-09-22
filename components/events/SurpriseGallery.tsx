"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/surprise/1.jpg",
  "/images/surprise/2.jpg",
  "/images/surprise/3.jpg",
  "/images/surprise/4.jpg",
  "/images/surprise/5.jpg",
  "/images/surprise/6.jpg",
  "/images/surprise/7.jpg",
];

export default function SurpriseGallery() {
  const [current, setCurrent] = useState(0);

  const next = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-none">

      {/* Galvenais attēls */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
        <Image
          src={images[current]}
          alt={`Pārsteiguma tēls ${current + 1}`}
          fill
          priority
          className="object-cover"
        />

        <button
          type="button"
          onClick={prev}
          className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={next}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Miniatūras */}
      <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrent(index)}
            className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 transition ${
              current === index
                ? "border-pink-500"
                : "border-gray-200 hover:border-pink-300"
            }`}
          >
            <Image
              src={image}
              alt={`Pārsteiguma tēls ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  );
}