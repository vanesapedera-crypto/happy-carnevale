"use client";

import { useEffect, useRef, useState } from "react";
import { makeCutout } from "@/lib/admin/cutoutClient";

export type BulkItem = { id: string; imageUrl: string; title: string; section: string };

type Status = "waiting" | "working" | "done" | "error";

const SQL = "alter table public.section_items\n  add column if not exists cutout jsonb;";

export default function BulkCutout({ items, alreadyDone }: { items: BulkItem[]; alreadyDone: number }) {
  const [status, setStatus] = useState<Record<string, Status>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [needsSql, setNeedsSql] = useState(false);
  const [started, setStarted] = useState<number | null>(null);
  const stop = useRef(false);

  const finished = items.filter((i) => status[i.id] === "done").length;
  const failed = items.filter((i) => status[i.id] === "error").length;
  const total = items.length;
  const processed = finished + failed;
  const current = items.find((i) => status[i.id] === "working");

  async function start(only?: BulkItem[]) {
    const list = only ?? items.filter((i) => status[i.id] !== "done");
    stop.current = false;
    setRunning(true);
    setNeedsSql(false);
    setStarted(Date.now());
    for (const item of list) {
      if (stop.current) break;
      setStatus((s) => ({ ...s, [item.id]: "working" }));
      const error = await makeCutout(item);
      if (error && error.includes("izgriezumi.sql")) {
        setStatus((s) => ({ ...s, [item.id]: "waiting" }));
        setNeedsSql(true);
        break;
      }
      setStatus((s) => ({ ...s, [item.id]: error ? "error" : "done" }));
      if (error) setErrors((e) => ({ ...e, [item.id]: error }));
    }
    setRunning(false);
  }

  // Sāk uzreiz, atverot lapu
  useEffect(() => {
    if (total > 0) void start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const perItem = started && finished > 0 ? (Date.now() - started) / processed : 10000;
  const minutesLeft = Math.ceil(((total - processed) * perItem) / 60000);

  if (total === 0) {
    return (
      <p className="rounded-2xl bg-emerald-50 px-6 py-5 font-semibold text-emerald-700">
        ✓ Visām {alreadyDone} kostīmu bildēm fons jau ir noņemts.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {needsSql && (
        <div role="alert" className="rounded-2xl bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-bold">Vispirms Supabase jāpalaiž šī rinda (SQL Editor → Run):</p>
          <pre className="mt-2 overflow-x-auto rounded-lg bg-white p-3 font-mono text-xs">{SQL}</pre>
          <p className="mt-2">Pēc tam pārlādē šo lapu.</p>
        </div>
      )}

      <section className="rounded-[20px] bg-white p-5 shadow-[0_6px_18px_rgba(59,7,100,0.06)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-black">
              {finished} / {total}
            </p>
            <p className="text-sm text-[#6b5a7d]">
              {running
                ? `Notiek… ${current ? `${current.section}: ${current.title}` : ""}${
                    processed > 1 ? ` · vēl ~${minutesLeft} min` : ""
                  }`
                : processed === total
                  ? failed
                    ? `Gatavs, ${failed} neizdevās`
                    : "Gatavs!"
                  : "Apturēts"}
              {alreadyDone > 0 && ` · ${alreadyDone} jau bija gatavas`}
            </p>
          </div>
          {running ? (
            <button
              type="button"
              onClick={() => (stop.current = true)}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold"
            >
              Apturēt
            </button>
          ) : (
            processed < total && (
              <button
                type="button"
                onClick={() => void start()}
                className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Turpināt
              </button>
            )
          )}
          {!running && failed > 0 && (
            <button
              type="button"
              onClick={() => void start(items.filter((i) => status[i.id] === "error"))}
              className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Mēģināt neizdevušās vēlreiz
            </button>
          )}
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-pink-500 transition-all duration-500"
            style={{ width: `${(finished / total) * 100}%` }}
          />
        </div>
      </section>

      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-8">
        {items.map((item) => {
          const s = status[item.id] ?? "waiting";
          return (
            <li
              key={item.id}
              title={errors[item.id] ?? `${item.section}: ${item.title}`}
              className={`relative overflow-hidden rounded-xl border-2 bg-white ${
                s === "done"
                  ? "border-emerald-400"
                  : s === "working"
                    ? "animate-pulse border-violet-500"
                    : s === "error"
                      ? "border-amber-400"
                      : "border-transparent opacity-60"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.imageUrl} alt="" loading="lazy" className="aspect-[3/4] w-full object-contain" />
              <span className="absolute inset-x-0 bottom-0 truncate bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold">
                {s === "done" ? "✓ " : s === "error" ? "! " : ""}
                {item.title || item.section}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
