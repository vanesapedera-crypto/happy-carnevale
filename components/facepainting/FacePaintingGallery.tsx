"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/facepainting/1.jpg",
  "/images/facepainting/2.jpg",
  "/images/facepainting/3.jpg",
  "/images/facepainting/4.jpg",
  "/images/facepainting/5.jpg",
  "/images/facepainting/6.jpg",
  "/images/facepainting/7.jpg",
  
];

export default function FacePaintingGallery() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full">

      {/* Galvenais attēls */}

      <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] border border-gray-200 shadow-xl">

        <Image
          src={images[current]}
          alt={`Sejas apgleznošana ${current + 1}`}
          fill
          priority
          className="object-cover"
        />

        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Miniatūras */}

      <div className="mt-5 flex gap-3 overflow-x-auto pb-2">

        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrent(index)}
            className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition ${
              current === index
                ? "border-pink-500"
                : "border-gray-200 hover:border-pink-300"
            }`}
          >
            <Image
              src={image}
              alt={`Miniatūra ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}

      </div>

    </div>
  );
}