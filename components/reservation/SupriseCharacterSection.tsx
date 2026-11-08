"use client";

import CharacterPreview from "./CharacterPreview";
import { ArrowRight } from "lucide-react";

import { mascotCharacters } from "@/data/mascotCharacters";
import { airCharacters } from "@/data/airCharacters";
import { useTr } from "@/context/LangContext";

interface Props {
  form: any;
  onChooseCharacter: () => void;
}

export default function SurpriseCharacterSection({
  form,
  onChooseCharacter,
}: Props) {
  const t = useTr();
  const allCharacters = [...mascotCharacters, ...airCharacters];

  const selectedCharacter = allCharacters.find(
    (item) => item.name === form.tels
  );

  return (
    <section className="rounded-[34px] border border-pink-200 bg-white p-4 shadow-sm sm:p-8">

      {/* Virsraksts */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
          4
        </div>

        <h2 className="text-2xl font-black sm:text-3xl">
          {t({ lv: "Pārsteiguma tēls", ru: "Персонаж-сюрприз", en: "Surprise character" })}
        </h2>

      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_280px_1fr]">

        {/* Kreisā puse */}

        <div>

          <div className="mb-4 font-bold">
            {t({ lv: "Izvēlies tēlu", ru: "Выберите персонажа", en: "Choose a character" })}
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-pink-200 bg-pink-50">

            <CharacterPreview image={selectedCharacter?.image} sizes="(min-width: 768px) 50vw, 100vw" />

          </div>

        </div>

        {/* Poga */}

        <div className="flex flex-col items-center justify-center">

          <button
            type="button"
            onClick={onChooseCharacter}
            className="flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105"
          >
            {t({ lv: "Izvēlēties tēlu", ru: "Выбрать персонажа", en: "Choose a character" })}

            <ArrowRight size={22} />
          </button>

          <p className="mt-4 text-center text-gray-500">
            {t({ lv: "Atveras galerija ar visiem tēliem", ru: "Откроется галерея со всеми персонажами", en: "Opens a gallery of all characters" })}
          </p>

        </div>

        {/* Izvēlētais */}

        <div>

          <div className="mb-4 font-bold">
            {t({ lv: "Izvēlētais tēls", ru: "Выбранный персонаж", en: "Selected character" })}
          </div>

          <div className="overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-sm">

            <div className="relative aspect-[4/3] bg-pink-50">

              <CharacterPreview image={selectedCharacter?.image} sizes="(min-width: 768px) 50vw, 100vw" />

            </div>

            <div className="flex items-center justify-between gap-3 p-4 sm:p-5">

              <div className="min-w-0">

                <div className="text-lg font-bold leading-tight sm:text-xl [overflow-wrap:anywhere] hyphens-auto">
                  {selectedCharacter
                    ? selectedCharacter.name
                    : t({ lv: "Nav izvēlēts", ru: "Не выбран", en: "Not chosen" })}
                </div>

              </div>

              <button
                type="button"
                onClick={onChooseCharacter}
                className="shrink-0 font-semibold text-pink-500 transition hover:underline"
              >
                {t({ lv: "Mainīt", ru: "Изменить", en: "Change" })}
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}