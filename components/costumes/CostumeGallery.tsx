"use client";

import { useState } from "react";
import Image from "next/image";

interface CostumeGalleryProps {
  images: string[];
  alt: string;
  priority?: boolean;
}

/** Kostīma bilde ar sīktēliem zemāk: uzspiežot sīktēlu, tas parādās lielajā bildē. */
export default function CostumeGallery({ images, alt, priority = false }: CostumeGalleryProps) {
  const list = images.filter(Boolean);
  const [current, setCurrent] = useState(0);
  const index = Math.min(current, Math.max(0, list.length - 1));
  const show = (next: number) => setCurrent((next + list.length) % list.length);

  return (
    <div>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] border border-gray-100 bg-white">
        <Image
          key={list[index]}
          src={list[index] || "/kostimi/no-image.jpg"}
          alt={list.length > 1 ? `${alt} – bilde ${index + 1}` : alt}
          fill
          priority={priority && index === 0}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-contain p-4"
        />
        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => show(index - 1)}
              aria-label="Iepriekšējā bilde"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-gray-700 shadow transition hover:bg-white hover:text-pink-600"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => show(index + 1)}
              aria-label="Nākamā bilde"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-gray-700 shadow transition hover:bg-white hover:text-pink-600"
            >
              ›
            </button>
            <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
              {index + 1} / {list.length}
            </span>
          </>
        )}
      </div>

      {list.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {list.map((src, thumb) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrent(thumb)}
              aria-label={`Rādīt bildi ${thumb + 1}`}
              aria-current={thumb === index ? "true" : undefined}
              className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                thumb === index ? "border-pink-500" : "border-gray-200 hover:border-pink-300"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
