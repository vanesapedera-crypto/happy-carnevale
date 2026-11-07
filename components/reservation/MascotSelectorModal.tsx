"use client";

import Image from "next/image";
import { mascotCharacters } from "@/data/mascotCharacters";
import { airCharacters } from "@/data/airCharacters";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (character: { name: string; image: string }) => void;
};

export default function MascotSelectorModal({
  open,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-2 sm:p-6 flex items-center justify-center">

      <div className="w-full max-w-7xl max-h-[92vh] overflow-y-auto rounded-[34px] bg-white shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b bg-white px-4 py-4 sm:px-8 sm:py-6">

          <div className="flex min-w-0 items-center gap-3 sm:gap-4">

            <div className="hidden h-12 w-12 shrink-0 items-center sm:flex justify-center rounded-full bg-pink-500 font-bold text-white">
              4
            </div>

            <div>
              <h2 className="text-xl font-black sm:text-3xl">
                Izvēlies pārsteiguma tēlu
              </h2>

              <p className="text-sm text-gray-500 sm:text-base">
                Izvēlieties kādu no pieejamajiem tēliem
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="shrink-0 rounded-xl border p-2 transition sm:p-3 hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <div className="p-4 sm:p-8">

          {/* MASKOTI */}

          <div className="mb-8 sm:mb-12">

            <h3 className="mb-4 text-xl font-black text-pink-600 sm:mb-6 sm:text-2xl">
              Maskoti
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 xl:grid-cols-5">

              {mascotCharacters.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
  onSelect(item);
  onClose();
}}
                  className="group min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-pink-100 bg-white transition hover:-translate-y-1 hover:border-pink-500 hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-pink-50">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />

                  </div>

                  <div className="border-t bg-white p-2 text-center text-sm font-bold leading-tight sm:p-4 sm:text-base [overflow-wrap:anywhere] hyphens-auto">
                    {item.name}
                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* GAISA PLŪSMAS */}

          <div>

            <h3 className="mb-4 text-xl font-black text-pink-600 sm:mb-6 sm:text-2xl">
              Gaisa plūsmas kostīmi
            </h3>

            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 xl:grid-cols-5">

              {airCharacters.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
  onSelect(item);
  onClose();
}}
                  className="group min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-pink-100 bg-white transition hover:-translate-y-1 hover:border-pink-500 hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-pink-50">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />

                  </div>

                  <div className="border-t bg-white p-2 text-center text-sm font-bold leading-tight sm:p-4 sm:text-base [overflow-wrap:anywhere] hyphens-auto">
                    {item.name}
                  </div>

                </button>
              ))}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}