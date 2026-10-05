"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteItemAction, updateItemAction } from "@/lib/admin/actions";
import type { SectionItem } from "@/lib/admin/types";
import { LIMITS } from "@/lib/admin/validation";

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-wide text-slate-500";

interface ItemCardProps {
  item: SectionItem;
  showPriceAndSize: boolean;
}

type Notice = { kind: "success" | "error"; text: string } | null;

/** Viens attēls ar labojamiem laukiem: nosaukums, apraksts, aktīvs, secība. */
export default function ItemCard({ item, showPriceAndSize }: ItemCardProps) {
  const router = useRouter();
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [size, setSize] = useState(item.size);
  const [active, setActive] = useState(item.active);
  const [sortOrder, setSortOrder] = useState(String(item.sortOrder));
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const dirty =
    title !== item.title ||
    description !== item.description ||
    price !== item.price ||
    size !== item.size ||
    active !== item.active ||
    sortOrder !== String(item.sortOrder);

  async function handleSave() {
    const order = Number(sortOrder);
    if (sortOrder.trim() === "" || !Number.isInteger(order)) {
      setNotice({ kind: "error", text: "Secībai jābūt veselam skaitlim." });
      return;
    }

    setPending(true);
    setNotice(null);
    try {
      const result = await updateItemAction(item.id, {
        title,
        description,
        active,
        sortOrder: order,
        ...(showPriceAndSize ? { price, size } : {}),
      });
      if (result.ok) {
        setNotice({ kind: "success", text: "Saglabāts" });
        router.refresh();
      } else {
        setNotice({ kind: "error", text: result.error });
      }
    } catch {
      setNotice({ kind: "error", text: "Neizdevās saglabāt. Lūdzu, mēģini vēlreiz." });
    }
    setPending(false);
  }

  async function handleDelete() {
    const name = item.title || "šo attēlu";
    if (!window.confirm(`Vai tiešām dzēst "${name}"? To nevarēs atjaunot.`)) return;

    setPending(true);
    setNotice(null);
    try {
      const result = await deleteItemAction(item.id);
      if (result.ok) {
        router.refresh();
        return;
      }
      setNotice({ kind: "error", text: result.error });
    } catch {
      setNotice({ kind: "error", text: "Neizdevās izdzēst. Lūdzu, mēģini vēlreiz." });
    }
    setPending(false);
  }

  const fieldId = (name: string) => `item-${item.id}-${name}`;

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${
        active ? "border-slate-200" : "border-slate-200 opacity-75"
      }`}
    >
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
        {!active && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
            Paslēpts
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <label htmlFor={fieldId("title")} className={LABEL_CLASS}>
            Nosaukums
          </label>
          <input
            id={fieldId("title")}
            value={title}
            maxLength={LIMITS.title}
            onChange={(event) => setTitle(event.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor={fieldId("description")} className={LABEL_CLASS}>
            Apraksts
          </label>
          <textarea
            id={fieldId("description")}
            value={description}
            maxLength={LIMITS.description}
            rows={2}
            onChange={(event) => setDescription(event.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        {showPriceAndSize && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={fieldId("price")} className={LABEL_CLASS}>
                Cena
              </label>
              <input
                id={fieldId("price")}
                value={price}
                maxLength={LIMITS.price}
                placeholder="25 €"
                onChange={(event) => setPrice(event.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor={fieldId("size")} className={LABEL_CLASS}>
                Izmērs
              </label>
              <input
                id={fieldId("size")}
                value={size}
                maxLength={LIMITS.size}
                placeholder="XS-L"
                onChange={(event) => setSize(event.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 items-end gap-3">
          <div>
            <label htmlFor={fieldId("order")} className={LABEL_CLASS}>
              Secība
            </label>
            <input
              id={fieldId("order")}
              type="number"
              step={1}
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={active}
              onChange={(event) => setActive(event.target.checked)}
              className="h-4 w-4 accent-pink-500"
            />
            Rādīt lapā
          </label>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={pending || !dirty}
            className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "Saglabā…" : "Saglabāt"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={pending}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-40"
          >
            Dzēst
          </button>
        </div>

        {notice && (
          <p
            role={notice.kind === "error" ? "alert" : "status"}
            className={`text-sm font-medium ${
              notice.kind === "error" ? "text-red-600" : "text-emerald-600"
            }`}
          >
            {notice.text}
          </p>
        )}
      </div>
    </article>
  );
}
