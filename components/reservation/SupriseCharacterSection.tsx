"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { mascotCharacters } from "@/data/mascotCharacters";
import { airCharacters } from "@/data/airCharacters";

interface Props {
  form: any;
  onChooseCharacter: () => void;
}

export default function SurpriseCharacterSection({
  form,
  onChooseCharacter,
}: Props) {
  const allCharacters = [...mascotCharacters, ...airCharacters];

  const selectedCharacter = allCharacters.find(
    (item) => item.name === form.tels
  );

  return (
    <section className="rounded-[34px] border border-pink-200 bg-white p-8 shadow-sm">

      {/* Virsraksts */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
          4
        </div>

        <h2 className="text-3xl font-black">
          Pārsteiguma tēls
        </h2>

      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_280px_1fr]">

        {/* Kreisā puse */}

        <div>

          <div className="mb-4 font-bold">
            Izvēlies tēlu
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-pink-200 bg-pink-50">

            <Image
              src={
                selectedCharacter?.image ??
                "/images/placeholder.jpg"
              }
              alt=""
              fill
              className="object-cover"
            />

          </div>

        </div>

        {/* Poga */}

        <div className="flex flex-col items-center justify-center">

          <button
            type="button"
            onClick={onChooseCharacter}
            className="flex items-center gap-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:scale-105"
          >
            Izvēlēties tēlu

            <ArrowRight size={22} />
          </button>

          <p className="mt-4 text-center text-gray-500">
            Atveras galerija ar visiem tēliem
          </p>

        </div>

        {/* Izvēlētais */}

        <div>

          <div className="mb-4 font-bold">
            Izvēlētais tēls
          </div>

          <div className="overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-sm">

            <div className="relative aspect-[4/3] bg-pink-50">

              <Image
                src={
                  selectedCharacter?.image ??
                  "/images/placeholder.jpg"
                }
                alt=""
                fill
                className="object-cover"
              />

            </div>

            <div className="flex items-center justify-between p-5">

              <div>

                <div className="text-xl font-bold">
                  {selectedCharacter
                    ? selectedCharacter.name
                    : "Nav izvēlēts"}
                </div>

              </div>

              <button
                type="button"
                onClick={onChooseCharacter}
                className="font-semibold text-pink-500 transition hover:underline"
              >
                Mainīt
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}