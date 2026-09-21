"use client";

import {
  User,
  Phone,
  Mail,
} from "lucide-react";

interface ContactSectionProps {
  form: {
    name: string;
    phone: string;
    email: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function ContactSection({
  form,
  handleChange,
}: ContactSectionProps) {
  return (
    <section className="space-y-6">

      {/* Virsraksts */}

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-500 text-lg font-bold text-white">
          2
        </div>

        <h2 className="text-3xl font-black text-slate-800">
          Kontaktinformācija
        </h2>
      </div>

      {/* Karte */}

      <div className="rounded-[32px] border border-pink-100 bg-white p-8 shadow-sm">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Vārds */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold text-slate-800">
              <User
                size={22}
                className="text-pink-500"
              />

              Vārds un uzvārds
              <span className="text-pink-500">*</span>
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Piemēram, Anna Bērziņa"
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          {/* Telefons */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold text-slate-800">
              <Phone
                size={22}
                className="text-pink-500"
              />

              Telefona numurs
              <span className="text-pink-500">*</span>
            </label>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="+371 26 123 456"
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

          {/* E-pasts */}

          <div>
            <label className="mb-3 flex items-center gap-3 text-lg font-bold text-slate-800">
              <Mail
                size={22}
                className="text-pink-500"
              />

              E-pasts
              <span className="text-pink-500">*</span>
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="anna@gmail.com"
              className="h-14 w-full rounded-2xl border border-gray-200 px-5 text-lg outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
            />
          </div>

        </div>

      </div>

    </section>
  );
}