"use client";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Users,
  Smile,
  ClipboardList,
} from "lucide-react";

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function EventSection({
  form,
  handleChange,
}: EventSectionProps) {
  return (
    <section className="space-y-6">

      {/* Virsraksts */}

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">
          3
        </div>

        <h2 className="text-3xl font-black text-slate-800">
          Pasākuma informācija
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

              Datums
              <span className="text-pink-500">*</span>
            </label>

            <input
              type="date"
              name="eventDate"
              value={form.eventDate}
              onChange={handleChange}
              required
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          {/* Laiks */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold">
              <Clock3
                size={22}
                className="text-pink-500"
              />

              Laiks
              <span className="text-pink-500">*</span>
            </label>

            <input
              type="time"
              name="eventTime"
              value={form.eventTime}
              onChange={handleChange}
              required
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          {/* Adrese */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold">
              <MapPin
                size={22}
                className="text-pink-500"
              />

              Adrese
              <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Rīga, Brīvības iela 10"
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

              Bērnu skaits
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

              Vecums
            </label>

            <input
              type="text"
              name="childrenAge"
              value={form.childrenAge}
              onChange={handleChange}
              placeholder="Piemēram, 4–8 gadi"
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

              Papildus informācija
            </label>

            <input
              type="text"
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Telpas īpatnības, vēlmes u.c."
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

        </div>

      </div>

    </section>
  );
}