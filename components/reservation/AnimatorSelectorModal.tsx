"use client";

import Image from "next/image";
import type { AnimatorCharacter } from "@/data/animatorCharacters";
import { useTr } from "@/context/LangContext";

type Props = {
  characters: AnimatorCharacter[];
  open: boolean;
  onClose: () => void;
  onSelect: (character: {
    name: string;
    image: string;
  }) => void;
};

export default function AnimatorSelectorModal({
  characters,
  open,
  onClose,
  onSelect,
}: Props) {
  const t = useTr();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-6">
      <div className="max-h-[90vh] w-full max-w-7xl overflow-y-auto rounded-3xl bg-white p-4 shadow-2xl sm:p-8">

        <div className="mb-5 flex items-start justify-between gap-3 sm:mb-8 sm:items-center">
          <div>
            <h2 className="text-xl font-black sm:text-3xl">
              🎭 {t({ lv: "Izvēlies animatoru tēlu", ru: "Выберите персонажа аниматора", en: "Choose your entertainer’s character" })}
            </h2>

            <p className="mt-1 text-sm text-gray-600 sm:mt-2 sm:text-base">
              {t({ lv: "Izvēlieties vienu no pieejamajiem tēliem.", ru: "Выберите одного из доступных персонажей.", en: "Pick one of the available characters." })}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl bg-gray-100 px-4 py-2 font-semibold hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5">
          {characters.map((item) => (
            <button
              key={`${item.name}|${item.image}`}
              type="button"
           onClick={() => {
  onSelect(item);
  onClose();
}}
              className="min-w-0 overflow-hidden rounded-2xl border sm:rounded-3xl border-pink-100 bg-white transition hover:border-pink-500 hover:shadow-xl"
            >
              <div className="relative aspect-[3/4]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="p-2 sm:p-4">
                <h3 className="text-center text-sm font-bold leading-tight sm:text-base [overflow-wrap:anywhere] hyphens-auto">
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