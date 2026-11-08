"use client";

import Image from "next/image";
import CharacterPreview from "./CharacterPreview";
import type { AnimatorCharacter } from "@/data/animatorCharacters";
import {
  Clock3,
  WandSparkles,
  Sparkles,
} from "lucide-react";
import { useTr } from "@/context/LangContext";

interface AnimatorSectionProps {
  characters: AnimatorCharacter[];
  form: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onChooseCharacter: () => void;
}

export default function AnimatorSection({
  characters,
  form,
  handleChange,
  onChooseCharacter,
}: AnimatorSectionProps) {
  const t = useTr();
  // Divi tērpi var saukties vienādi, tāpēc vispirms salīdzina arī attēlu.
  const selectedCharacter =
    characters.find(
      (c) => c.name === form.tels && c.image === form.telsImage
    ) ?? characters.find((c) => c.name === form.tels);

  return (
    <div className="space-y-8">

      {/* 4 */}
      <section className="rounded-[34px] border border-pink-200 bg-white p-4 shadow-sm sm:p-8">

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
            4
          </div>

          <h2 className="text-2xl font-black sm:text-3xl">
            {t({ lv: "Animatora programma", ru: "Программа аниматора", en: "Entertainer programme" })}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* ILGUMS */}

          <div>

            <div className="mb-5 flex items-center gap-2 font-bold">
              <Clock3
                size={20}
                className="text-pink-500"
              />
              {t({ lv: "Ilgums", ru: "Продолжительность", en: "Duration" })}
            </div>

            <div className="space-y-4">

              {[
  {
    label: "1 stunda",
    text: { lv: "1 stunda", ru: "1 час", en: "1 hour" },
    price: "160 €",
  },
  {
    label: "1,5 stundas",
    text: { lv: "1,5 stundas", ru: "1,5 часа", en: "1.5 hours" },
    price: "175 €",
  },
  {
    label: "2 stundas",
    text: { lv: "2 stundas", ru: "2 часа", en: "2 hours" },
    price: "190 €",
  },
].map((item) => (
  <label
    key={item.label}
    className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
      form.ilgums === item.label
        ? "border-pink-500 bg-pink-50"
        : "border-gray-200"
    }`}
  >
    <div className="flex items-center gap-3">
      <input
        type="radio"
        name="ilgums"
        value={item.label}
        checked={form.ilgums === item.label}
        onChange={handleChange}
      />

      <div>
        <div className="font-bold">{t(item.text)}</div>
        <div className="text-sm text-gray-500">{item.price}</div>
      </div>
    </div>
  </label>
))}

            </div>

          </div>

          {/* TĒLA IZVĒLE */}

          <div>

            <div className="mb-5 flex items-center gap-2 font-bold">
              <WandSparkles
                size={20}
                className="text-pink-500"
              />
              {t({ lv: "Izvēlies tēlu", ru: "Выберите персонажа", en: "Choose a character" })}
            </div>

            <div className="rounded-3xl border bg-gray-50 p-4">

              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">

                <CharacterPreview image={selectedCharacter?.image} sizes="(min-width: 768px) 33vw, 100vw" />

              </div>

              <button
                type="button"
                onClick={onChooseCharacter}
                className="w-full rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-4 font-bold text-white shadow-lg transition hover:scale-105"
              >
                {t({ lv: "Izvēlēties tēlu", ru: "Выбрать персонажа", en: "Choose a character" })}
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                {t({ lv: "Atveras galerija ar visiem tēliem", ru: "Откроется галерея со всеми персонажами", en: "Opens a gallery of all characters" })}
              </p>

            </div>

          </div>

          {/* IZVĒLĒTAIS */}

          <div>

            <div className="mb-5 flex items-center gap-2 font-bold">
              <Sparkles
                size={20}
                className="text-pink-500"
              />
              {t({ lv: "Izvēlētais tēls", ru: "Выбранный персонаж", en: "Selected character" })}
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white">

              <div className="relative aspect-[4/3]">

                <CharacterPreview image={selectedCharacter?.image} sizes="(min-width: 640px) 33vw, 50vw" />

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
                  className="shrink-0 font-semibold text-pink-500 hover:underline"
                >
                  {t({ lv: "Mainīt", ru: "Изменить", en: "Change" })}
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PAPILDU PAKALPOJUMI */}

    <section className="rounded-[34px] border border-pink-200 bg-white p-4 shadow-sm sm:p-8">

  <div className="mb-8 flex items-center gap-4">

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
      5
    </div>

    <h2 className="text-2xl font-black sm:text-3xl">
      {t({ lv: "Papildpakalpojumi", ru: "Дополнительные услуги", en: "Add-ons" })}
    </h2>

    <span className="text-gray-500">
      ({t({ lv: "pēc izvēles", ru: "по желанию", en: "optional" })})
    </span>

  </div>

  <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">

  {[
  {
    key: "eksperimenti",
    title: { lv: "Eksperimenti", ru: "Эксперименты", en: "Experiments" },
    image: "/images/events/animatori/eksperimenti.jpg",
  },
  {
    key: "slaims",
    title: { lv: "Slaimu meistarklase", ru: "Мастер-класс по слаймам", en: "Slime workshop" },
    image: "/images/events/animatori/slaims.jpg",
  },
  {
    key: "burbuli",
    title: { lv: "Milzu ziepju burbuļi", ru: "Гигантские мыльные пузыри", en: "Giant soap bubbles" },
    image: "/images/events/animatori/burbuli.jpg",
  },
  {
    key: "darbnica",
    title: { lv: "Radošā darbnīca", ru: "Творческая мастерская", en: "Craft workshop" },
    image: "/images/events/animatori/radosa-darbnica.jpg",
  },
  {
    key: "led",
    title: { lv: "LED Disco", ru: "LED-дискотека", en: "LED disco" },
    image: "/images/events/animatori/led-disco.jpg",
  },
  {
    key: "folija",
    title: { lv: "Folijas Disco", ru: "Фольга-дискотека", en: "Foil disco" },
    image: "/images/events/animatori/folijas-disco.jpg",
  },
].map((item) => (

      <label
        key={item.key}
        className={`relative cursor-pointer overflow-hidden rounded-3xl border-2 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
          form[item.key]
            ? "border-pink-500 shadow-lg"
            : "border-gray-200"
        }`}
      >

        <input
          hidden
          type="checkbox"
          name={item.key}
          checked={!!form[item.key]}
          onChange={handleChange}
        />

        {form[item.key] && (
          <div className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-pink-500 text-white">
            ✓
          </div>
        )}

        <div className="relative aspect-square">

          <Image
            src={item.image}
            alt={t(item.title)}
            fill
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />

        </div>

        <div className="p-2 text-center sm:p-4">

          <h3 className="text-sm font-bold leading-tight sm:text-base [overflow-wrap:anywhere] hyphens-auto">
            {t(item.title)}
          </h3>

        </div>

      </label>

    ))}

  </div>

</section>

    </div>
  );
}