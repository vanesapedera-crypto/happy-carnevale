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
<div className="mx-auto w-full max-w-[360px] lg:max-w-none">
        {/* Galvenā bilde */}

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-xl">
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
          className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Miniatūras */}

      <div className="mt-3 flex justify-center gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrent(index)}
            className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border-2 ${
              current === index
                ? "border-pink-500"
                : "border-gray-200"
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