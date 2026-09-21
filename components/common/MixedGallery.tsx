"use client";

import Image from "next/image";

type GalleryItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

interface MixedGalleryProps {
  title?: string;
  description?: string;
  items: GalleryItem[];
}

export default function MixedGallery({
  title,
  description,
  items,
}: MixedGalleryProps) {
  return (
    <section className="bg-[#fff7fb] py-20">
      <div className="mx-auto max-w-6xl px-6">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
                {title}
              </h2>
            )}

            {description && (
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={`${item.type}-${index}`}
              className="group relative overflow-hidden rounded-[24px] border-[4px] border-white bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] w-full">
                {item.type === "image" ? (
                  <Image
                    src={item.src}
                    alt={item.alt || title || "Galerijas attēls"}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={item.poster}
                  >
                    <source src={item.src} />
                    Tava pārlūkprogramma neatbalsta video atskaņošanu.
                  </video>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}