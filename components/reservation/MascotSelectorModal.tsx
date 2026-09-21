"use client";

import Image from "next/image";
import { mascotCharacters } from "@/data/mascotCharacters";
import { airCharacters } from "@/data/airCharacters";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (name: string) => void;
};

export default function MascotSelectorModal({
  open,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-6 flex items-center justify-center">

      <div className="w-full max-w-7xl max-h-[92vh] overflow-y-auto rounded-[34px] bg-white shadow-2xl">

        {/* HEADER */}

        <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-white px-8 py-6">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
              4
            </div>

            <div>
              <h2 className="text-3xl font-black">
                Izvēlies pārsteiguma tēlu
              </h2>

              <p className="text-gray-500">
                Izvēlieties kādu no pieejamajiem tēliem
              </p>
            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl border p-3 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        <div className="p-8">

          {/* MASKOTI */}

          <div className="mb-12">

            <h3 className="mb-6 text-2xl font-black text-pink-600">
              Maskoti
            </h3>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-5">

              {mascotCharacters.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    onSelect(item.name);
                    onClose();
                  }}
                  className="group overflow-hidden rounded-3xl border border-pink-100 bg-white transition hover:-translate-y-1 hover:border-pink-500 hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-pink-50">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />

                  </div>

                  <div className="border-t bg-white p-4 text-center font-bold">
                    {item.name}
                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* GAISA PLŪSMAS */}

          <div>

            <h3 className="mb-6 text-2xl font-black text-pink-600">
              Gaisa plūsmas kostīmi
            </h3>

            <div className="grid grid-cols-2 gap-5 md:grid-cols-4 xl:grid-cols-5">

              {airCharacters.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    onSelect(item.name);
                    onClose();
                  }}
                  className="group overflow-hidden rounded-3xl border border-pink-100 bg-white transition hover:-translate-y-1 hover:border-pink-500 hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-pink-50">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />

                  </div>

                  <div className="border-t bg-white p-4 text-center font-bold">
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