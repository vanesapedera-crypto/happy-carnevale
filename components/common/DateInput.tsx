"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateLv, toIsoDate } from "@/lib/date";

const MONTHS = [
  "Janvāris",
  "Februāris",
  "Marts",
  "Aprīlis",
  "Maijs",
  "Jūnijs",
  "Jūlijs",
  "Augusts",
  "Septembris",
  "Oktobris",
  "Novembris",
  "Decembris",
];

const WEEKDAYS = ["P", "O", "T", "C", "Pk", "S", "Sv"];

type DateInputProps = {
  /** Vērtība formātā YYYY-MM-DD (tukša, ja nav izvēlēts) */
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  /** Agrākais atļautais datums (YYYY-MM-DD). Pēc noklusējuma — šodiena. */
  min?: string;
  /** Vēlākais atļautais datums (YYYY-MM-DD) */
  max?: string;
  className?: string;
  ariaLabel?: string;
};

function parseIso(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function DateInput({
  value,
  onChange,
  required,
  min,
  max,
  className = "",
  ariaLabel = "Datums",
}: DateInputProps) {
  const today = toIsoDate(new Date());
  const minDate = min ?? today;

  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const base = value ? parseIso(value) : parseIso(minDate);
    return { year: base.getFullYear(), month: base.getMonth() };
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  function toggle() {
    if (!open) {
      const base = value ? parseIso(value) : parseIso(minDate);
      setView({ year: base.getFullYear(), month: base.getMonth() });
    }
    setOpen((o) => !o);
  }

  function shiftMonth(delta: number) {
    setView(({ year, month }) => {
      const next = new Date(year, month + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  }

  // Kalendāra režģis, nedēļa sākas pirmdienā
  const firstDay = new Date(view.year, view.month, 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const cells: (string | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) =>
      toIsoDate(new Date(view.year, view.month, i + 1))
    ),
  ];

  const isDisabled = (iso: string) =>
    (minDate && iso < minDate) || (max ? iso > max : false);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label={ariaLabel}
        aria-expanded={open}
        className={`flex items-center justify-between gap-3 text-left ${className}`}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value ? formatDateLv(value) : "dd.mm.gggg"}
        </span>
        <CalendarDays className="h-5 w-5 shrink-0 text-pink-500" />
      </button>

      {/* Neredzams lauks, lai strādātu pārlūka "obligāts lauks" pārbaude */}
      <input
        tabIndex={-1}
        aria-hidden="true"
        value={value}
        onChange={() => {}}
        required={required}
        onInvalid={(e) => {
          (e.target as HTMLInputElement).setCustomValidity("Lūdzu, izvēlies datumu.");
        }}
        onInput={(e) => (e.target as HTMLInputElement).setCustomValidity("")}
        className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0"
      />

      {open && (
        <div className="absolute left-0 top-full z-30 mt-2 w-80 rounded-3xl border border-pink-100 bg-white p-5 shadow-2xl">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="Iepriekšējais mēnesis"
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-pink-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <span className="font-bold text-gray-900">
              {MONTHS[view.month]} {view.year}
            </span>

            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Nākamais mēnesis"
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-pink-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold uppercase text-gray-400">
            {WEEKDAYS.map((d) => (
              <span key={d} className="py-1">
                {d}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((iso, i) => {
              if (!iso) return <span key={`empty-${i}`} />;

              const disabled = isDisabled(iso);
              const selected = iso === value;
              const isToday = iso === today;

              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={`flex h-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                    selected
                      ? "bg-pink-500 text-white"
                      : disabled
                        ? "cursor-not-allowed text-gray-300"
                        : isToday
                          ? "text-pink-600 ring-1 ring-pink-300 hover:bg-pink-50"
                          : "text-gray-700 hover:bg-pink-50"
                  }`}
                >
                  {Number(iso.slice(8))}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
