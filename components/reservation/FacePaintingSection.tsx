"use client";

import { useTr } from "@/context/LangContext";

interface FacePaintingSectionProps {
  form: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FacePaintingSection({
  form,
  handleChange,
}: FacePaintingSectionProps) {
  const t = useTr();
  return (
    <div className="rounded-3xl border border-pink-200 bg-pink-50 p-8">
      <h2 className="mb-2 text-2xl font-black">
        🎨 {t({ lv: "Sejas apgleznošana", ru: "Аквагрим", en: "Face painting" })}
      </h2>

      <p className="mb-6 text-gray-600">
        {t({ lv: "Izvēlieties vēlamo pakalpojuma ilgumu.", ru: "Выберите желаемую продолжительность услуги.", en: "Choose how long you'd like the service." })}
      </p>

      <div className="grid gap-6 md:grid-cols-2">

        <label
          className={`cursor-pointer rounded-2xl border-2 p-6 transition ${
            form.programma === "1,5 stundas"
              ? "border-pink-500 bg-white shadow-lg"
              : "border-pink-200 bg-white"
          }`}
        >
          <input
            hidden
            type="radio"
            name="programma"
            value="1,5 stundas"
            checked={form.programma === "1,5 stundas"}
            onChange={handleChange}
          />

          <h3 className="text-2xl font-bold">
            {t({ lv: "1,5 stundas", ru: "1,5 часа", en: "1.5 hours" })}
          </h3>

          <p className="mt-3 text-gray-500">
            {t({ lv: "Mazākiem pasākumiem", ru: "Для небольших мероприятий", en: "For smaller events" })}
          </p>

          <p className="mt-5 text-4xl font-black text-pink-500">
            150 €
          </p>
        </label>

        <label
          className={`cursor-pointer rounded-2xl border-2 p-6 transition ${
            form.programma === "2 stundas"
              ? "border-pink-500 bg-white shadow-lg"
              : "border-pink-200 bg-white"
          }`}
        >
          <input
            hidden
            type="radio"
            name="programma"
            value="2 stundas"
            checked={form.programma === "2 stundas"}
            onChange={handleChange}
          />

          <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white">
            {t({ lv: "Populārākā izvēle", ru: "Самый популярный выбор", en: "Most popular" })}
          </span>

          <h3 className="mt-4 text-2xl font-bold">
            {t({ lv: "2 stundas", ru: "2 часа", en: "2 hours" })}
          </h3>

          <p className="mt-3 text-gray-500">
            {t({ lv: "Lielākiem pasākumiem", ru: "Для больших мероприятий", en: "For bigger events" })}
          </p>

          <p className="mt-5 text-4xl font-black text-pink-500">
            170 €
          </p>
        </label>

      </div>
    </div>
  );
}