"use client";

import Image from "next/image";
import { animatorCharacters } from "@/data/animatorCharacters";

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (character: {
    name: string;
    image: string;
  }) => void;
};

export default function AnimatorSelectorModal({
  open,
  onClose,
  onSelect,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
      <div className="max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black">
              🎭 Izvēlies animatoru tēlu
            </h2>

            <p className="mt-2 text-gray-600">
              Izvēlieties vienu no pieejamajiem tēliem.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-gray-100 px-4 py-2 font-semibold hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {animatorCharacters.map((item) => (
            <button
              key={item.name}
              type="button"
           onClick={() => {
  onSelect(item);
  onClose();
}}
              className="overflow-hidden rounded-3xl border border-pink-100 bg-white transition hover:border-pink-500 hover:shadow-xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-center font-bold">
                  {item.name}
                </h3>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}