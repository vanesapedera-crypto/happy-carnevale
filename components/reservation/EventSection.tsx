"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Smile,
  ClipboardList,
} from "lucide-react";
import DateInput from "@/components/common/DateInput";
import { useTr } from "@/context/LangContext";

interface EventSectionProps {
  form: {
    eventDate: string;
    eventTime: string;
    address: string;
    childrenCount: string;
    childrenAge: string;
    comment: string;
  };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}

// 24h formāts neatkarīgi no pārlūka valodas (input type="time" rāda AM/PM angliskos pārlūkos)
const HOURS = Array.from({ length: 16 }, (_, i) =>
  String(i + 7).padStart(2, "0")
); // 07–22
const MINUTES = ["00", "15", "30", "45"];

const selectClass =
  "h-14 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100";

export default function EventSection({
  form,
  handleChange,
}: EventSectionProps) {
  const [hour = "", minute = ""] = form.eventTime.split(":");
  const t = useTr();

  function setTime(nextHour: string, nextMinute: string) {
    const value = nextHour ? `${nextHour}:${nextMinute || "00"}` : "";

    handleChange({
      target: { name: "eventTime", value, type: "text" },
    } as React.ChangeEvent<HTMLInputElement>);
  }

  return (
    <section className="space-y-6">

      {/* Virsraksts */}

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">
          3
        </div>

        <h2 className="text-3xl font-black text-slate-800">
          {t({ lv: "Pasākuma informācija", ru: "Информация о мероприятии", en: "Event details" })}
        </h2>
      </div>

      {/* Karte */}

      <div className="rounded-[32px] border border-pink-100 bg-white p-8 shadow-sm">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Datums */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold">
              <CalendarDays
                size={22}
                className="text-pink-500"
              />

              {t({ lv: "Datums", ru: "Дата", en: "Date" })}
              <span className="text-pink-500">*</span>
            </label>

            <DateInput
              value={form.eventDate}
              onChange={(value) =>
                handleChange({
                  target: { name: "eventDate", value, type: "text" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              required
              ariaLabel={t({ lv: "Pasākuma datums", ru: "Дата мероприятия", en: "Event date" })}
              className="h-14 w-full rounded-2xl border border-gray-200 bg-white px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          {/* Laiks */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold">
              <Clock3
                size={22}
                className="text-pink-500"
              />

              {t({ lv: "Laiks", ru: "Время", en: "Time" })}
              <span className="text-pink-500">*</span>
            </label>

            <div className="flex items-center gap-2">
              <select
                aria-label={t({ lv: "Stunda", ru: "Час", en: "Hour" })}
                value={hour}
                onChange={(e) => setTime(e.target.value, minute)}
                required
                className={selectClass}
              >
                <option value="" disabled>
                  hh
                </option>
                {HOURS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>

              <span className="text-2xl font-bold text-gray-400">:</span>

              <select
                aria-label={t({ lv: "Minūtes", ru: "Минуты", en: "Minutes" })}
                value={hour ? minute || "00" : ""}
                onChange={(e) => setTime(hour, e.target.value)}
                disabled={!hour}
                className={`${selectClass} disabled:bg-gray-50 disabled:text-gray-400`}
              >
                <option value="" disabled>
                  mm
                </option>
                {MINUTES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Adrese */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold">
              <MapPin
                size={22}
                className="text-pink-500"
              />

              {t({ lv: "Adrese", ru: "Адрес", en: "Address" })}
              <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder={t({ lv: "Rīga, Brīvības iela 10", ru: "Рига, ул. Бривибас 10", en: "Riga, Brīvības iela 10" })}
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          {/* Bērnu skaits */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold">
              <Users
                size={22}
                className="text-pink-500"
              />

              {t({ lv: "Bērnu skaits", ru: "Количество детей", en: "Number of children" })}
              <span className="text-pink-500">*</span>
            </label>

            <input
              type="number"
              name="childrenCount"
              min="1"
              value={form.childrenCount}
              onChange={handleChange}
              required
              placeholder="12"
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          {/* Vecums */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold">
              <Smile
                size={22}
                className="text-pink-500"
              />

              {t({ lv: "Vecums", ru: "Возраст", en: "Age" })}
            </label>

            <input
              type="text"
              name="childrenAge"
              value={form.childrenAge}
              onChange={handleChange}
              placeholder={t({ lv: "Piemēram, 4–8 gadi", ru: "Например, 4–8 лет", en: "E.g. 4–8 years" })}
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          {/* Papildus informācija */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold">
              <ClipboardList
                size={22}
                className="text-pink-500"
              />

              {t({ lv: "Papildus informācija", ru: "Дополнительная информация", en: "Additional information" })}
            </label>

            <input
              type="text"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder={t({ lv: "Telpas īpatnības, vēlmes u.c.", ru: "Особенности помещения, пожелания и т.д.", en: "Venue details, wishes etc." })}
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

        </div>

      </div>

    </section>
  );
}