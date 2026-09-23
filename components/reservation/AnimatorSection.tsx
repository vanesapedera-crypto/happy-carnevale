"use client";

import Image from "next/image";
import { animatorCharacters } from "@/data/animatorCharacters";
import {
  Clock3,
  WandSparkles,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface AnimatorSectionProps {
  form: any;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onChooseCharacter: () => void;
}

export default function AnimatorSection({
  form,
  handleChange,
  onChooseCharacter,
}: AnimatorSectionProps) {
  const selectedCharacter = animatorCharacters.find(
    (c) => c.name === form.tels
  );

  return (
    <div className="space-y-8">

      {/* 4 */}
      <section className="rounded-[34px] border border-pink-200 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
            4
          </div>

          <h2 className="text-3xl font-black">
            Animatora programma
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
              Ilgums
            </div>

            <div className="space-y-4">

              {[
  {
    label: "1 stunda",
    price: "160 €",
  },
  {
    label: "1,5 stundas",
    price: "175 €",
  },
  {
    label: "2 stundas",
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
        <div className="font-bold">{item.label}</div>
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
              Izvēlies tēlu
            </div>

            <div className="rounded-3xl border bg-gray-50 p-4">

              <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl">

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

              <button
                type="button"
                onClick={onChooseCharacter}
                className="w-full rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 py-4 font-bold text-white shadow-lg transition hover:scale-105"
              >
                Izvēlēties tēlu
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Atveras galerija ar visiem tēliem
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
              Izvēlētais tēls
            </div>

            <div className="overflow-hidden rounded-3xl border bg-white">

              <div className="relative aspect-[4/3]">

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

                  <div className="font-bold text-xl">

                    {selectedCharacter
                      ? selectedCharacter.name
                      : "Nav izvēlēts"}

                  </div>

                </div>

                <button
                  type="button"
                  onClick={onChooseCharacter}
                  className="font-semibold text-pink-500 hover:underline"
                >
                  Mainīt
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PAPILDU PAKALPOJUMI */}

    <section className="rounded-[34px] border border-pink-200 bg-white p-8 shadow-sm">

  <div className="mb-8 flex items-center gap-4">

    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
      5
    </div>

    <h2 className="text-3xl font-black">
      Papildpakalpojumi
    </h2>

    <span className="text-gray-500">
      (pēc izvēles)
    </span>

  </div>

  <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">

  {[
  {
    key: "eksperimenti",
    title: "Eksperimenti",
    image: "/images/events/animatori/eksperimenti.jpg",
  },
  {
    key: "slaims",
    title: "Slaimu meistarklase",
    image: "/images/events/animatori/slaims.jpg",
  },
  {
    key: "burbuli",
    title: "Milzu ziepju burbuļi",
    image: "/images/events/animatori/burbuli.jpg",
  },
  {
    key: "darbnica",
    title: "Radošā darbnīca",
    image: "/images/events/animatori/radosa-darbnica.jpg",
  },
  {
    key: "led",
    title: "LED Disco",
    image: "/images/events/animatori/led-disco.jpg",
  },
  {
    key: "folija",
    title: "Folijas Disco",
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
            alt={item.title}
            fill
            className="object-cover"
          />

        </div>

        <div className="p-4 text-center">

          <h3 className="font-bold">
            {item.title}
          </h3>

        </div>

      </label>

    ))}

  </div>

</section>

    </div>
  );
}