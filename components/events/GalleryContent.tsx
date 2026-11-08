"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { galleryItems } from "./galleryData";
import { tr, type Lang } from "@/lib/i18n";

export default function GalleryContent({ lang }: { lang: Lang }) {
  const label = tr(lang, { lv: "Animatori", ru: "Аниматоры", en: "Entertainers" });
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Masonry Grid */}

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="group relative mb-5 overflow-hidden rounded-3xl bg-gray-100 shadow-lg break-inside-avoid"
            >
              {item.type === "image" ? (
                <Image
                  src={item.src}
                  alt={item.alt ? item.alt.replace("Animatori", label) : ""}
                  width={900}
                  height={1200}
                  className="h-auto w-full transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="relative">
                  <video
                    src={item.src}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="h-auto w-full"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-xl">
                      <Play
                        size={28}
                        fill="currentColor"
                        className="ml-1 text-pink-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}