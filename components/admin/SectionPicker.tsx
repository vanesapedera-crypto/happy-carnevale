"use client";

import { useRouter } from "next/navigation";
import type { SectionDefinition } from "@/lib/admin/sections";

interface SectionPickerProps {
  sections: readonly SectionDefinition[];
  current: SectionDefinition;
}

/** Sadaļas izvēle pēc sectionKey. Izvēle glabājas adresē (?section=...). */
export default function SectionPicker({ sections, current }: SectionPickerProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="sm:min-w-[320px]">
        <label htmlFor="admin-section" className="text-sm font-semibold text-slate-700">
          Mājaslapas sadaļa
        </label>
        <select
          id="admin-section"
          value={current.key}
          onChange={(event) =>
            router.push(`/admin/dashboard?section=${encodeURIComponent(event.target.value)}`)
          }
          className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
        >
          {sections.map((section) => (
            <option key={section.key} value={section.key}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      <a
        href={current.path}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold text-pink-600 hover:text-pink-700"
      >
        Skatīt sadaļu mājaslapā ↗
      </a>
    </div>
  );
}
