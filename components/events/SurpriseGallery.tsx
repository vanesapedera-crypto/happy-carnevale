"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SurpriseGalleryProps {
  /** Attēlu adreses rādīšanas secībā (no admin paneļa vai iebūvētās). */
  images: readonly string[];
}

export default function SurpriseGallery({ images }: SurpriseGalleryProps) {
  const [selected, setSelected] = useState(0);
  // Ja attēlu kļuvis mazāk (kāds izdzēsts), paliek pie pēdējā.
  const current = Math.min(selected, Math.max(images.length - 1, 0));

  // Ja miniatūru ir vairāk, nekā ietilpst rindā, izvēlētā tiek ieritināta redzamajā daļā.
  const stripRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.querySelector<HTMLElement>(`[data-index="${current}"]`);
    if (!strip || !thumb || strip.scrollWidth <= strip.clientWidth) return;

    const stripBox = strip.getBoundingClientRect();
    const thumbBox = thumb.getBoundingClientRect();
    const offset =
      thumbBox.left - stripBox.left - (stripBox.width - thumbBox.width) / 2;
    strip.scrollTo({ left: strip.scrollLeft + offset, behavior: "smooth" });
  }, [current]);

  if (images.length === 0) return null;

  const next = () => setSelected((current + 1) % images.length);

  const prev = () => setSelected((current - 1 + images.length) % images.length);

  return (
    // min-w-0: gara miniatūru rinda nedrīkst izstiept lapas kolonnu.
    <div className="mx-auto w-full min-w-0 max-w-[340px] lg:mx-0 lg:max-w-none">

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
      <div ref={stripRef} className="mt-4 overflow-x-auto pb-2">
        {/* w-max + mx-auto: īsa rinda ir centrēta, gara ir ritināma no pirmā attēla. */}
        <div className="mx-auto flex w-max gap-2">
        {images.map((image, index) => (
          <button
            key={`${index}-${image}`}
            data-index={index}
            type="button"
            onClick={() => setSelected(index)}
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
              sizes="48px"
              className="object-cover"
            />
          </button>
        ))}
        </div>
      </div>

    </div>
  );
}