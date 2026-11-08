"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteItemAction, updateItemAction } from "@/lib/admin/actions";
import type { SectionItem } from "@/lib/admin/types";
import ExtraImages from "./ExtraImages";
import { postImage } from "@/lib/admin/uploadClient";
import { ACCEPTED_IMAGE_TYPES, LIMITS } from "@/lib/admin/validation";
import { getSection } from "@/lib/admin/sections";
import { defaultCaption, prepareInstagramImage } from "@/lib/admin/instagramImage";
import type { ActionResult } from "@/lib/admin/types";
import { translateCostumeName } from "@/lib/costumeNames";

const CAPTION_MAX = 2200;

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200";
const LABEL_CLASS = "text-xs font-semibold uppercase tracking-wide text-slate-500";

/** Attēls kalpo par rokturi, aiz kura kartīti pārvelk citā vietā. */
export interface DragHandle {
  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;
}

interface ItemCardProps {
  item: SectionItem;
  showPriceAndSize: boolean;
  /** false galerijām: kartītē ir tikai attēls, "Rādīt lapā" un dzēšana. */
  showTitle: boolean;
  dragHandle?: DragHandle;
}

type Notice = { kind: "success" | "error"; text: string } | null;

/** Viens attēls ar labojamiem laukiem: nosaukums, cena, izmērs, rādīt lapā. */
export default function ItemCard({
  item,
  showPriceAndSize,
  showTitle,
  dragHandle,
}: ItemCardProps) {
  const router = useRouter();
  const [title, setTitle] = useState(item.title);
  const [titleRu, setTitleRu] = useState(item.translations.ru?.title ?? "");
  const [titleEn, setTitleEn] = useState(item.translations.en?.title ?? "");
  const [price, setPrice] = useState(item.price);
  const [size, setSize] = useState(item.size);
  const [active, setActive] = useState(item.active);
  const [pending, setPending] = useState(false);
  const [replacing, setReplacing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [notice, setNotice] = useState<Notice>(null);
  const [toInstagram, setToInstagram] = useState(false);
  const [caption, setCaption] = useState("");
  const [instagramLink, setInstagramLink] = useState<string | null>(null);

  const translationsDirty =
    titleRu !== (item.translations.ru?.title ?? "") ||
    titleEn !== (item.translations.en?.title ?? "");

  const dirty =
    title !== item.title ||
    translationsDirty ||
    price !== item.price ||
    size !== item.size ||
    active !== item.active;

  function toggleInstagram(checked: boolean) {
    setToInstagram(checked);
    if (checked && !caption) {
      setCaption(defaultCaption(title, price, getSection(item.sectionKey)?.path ?? ""));
    }
  }

  /** Publicē kartītes bildi Instagram. Atgriež kļūdas tekstu vai null. */
  async function publishToInstagram(): Promise<string | null> {
    let file: File;
    try {
      file = await prepareInstagramImage(item.imageUrl);
    } catch {
      return "Neizdevās sagatavot bildi Instagram.";
    }
    const body = new FormData();
    body.append("caption", caption);
    body.append("file", file, file.name);
    try {
      const response = await fetch("/api/admin/instagram", { method: "POST", body });
      const result = (await response.json()) as ActionResult<{ permalink: string | null }>;
      if (!result.ok) return result.error;
      setInstagramLink(result.data.permalink);
      return null;
    } catch {
      return "Neizdevās publicēt Instagram. Pārbaudi interneta savienojumu.";
    }
  }

  async function handleSave() {
    setPending(true);
    setNotice(null);
    setInstagramLink(null);
    if (toInstagram && !dirty) {
      const error = await publishToInstagram();
      setNotice(error ? { kind: "error", text: error } : { kind: "success", text: "Publicēts Instagram" });
      if (!error) setToInstagram(false);
      setPending(false);
      return;
    }
    try {
      const result = await updateItemAction(item.id, {
        active,
        ...(showTitle ? { title } : {}),
        // Tulkojumus sūta tikai tad, ja tie mainīti (lai saglabāšana strādā arī,
        // kamēr datubāzē vēl nav palaists supabase/tulkojumi.sql).
        ...(showTitle && translationsDirty
          ? {
              translations: {
                ru: { ...item.translations.ru, title: titleRu },
                en: { ...item.translations.en, title: titleEn },
              },
            }
          : {}),
        ...(showPriceAndSize ? { price, size } : {}),
      });
      if (result.ok) {
        if (toInstagram) {
          const error = await publishToInstagram();
          setNotice(
            error
              ? { kind: "error", text: `Saglabāts, bet Instagram: ${error}` }
              : { kind: "success", text: "Saglabāts un publicēts Instagram" }
          );
          if (!error) setToInstagram(false);
        } else {
          setNotice({ kind: "success", text: "Saglabāts" });
        }
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
    const name = showTitle && item.title ? `"${item.title}"` : "šo attēlu";
    if (!window.confirm(`Vai tiešām dzēst ${name}? To nevarēs atjaunot.`)) return;

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

  async function handleReplace(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // Lai to pašu failu var izvēlēties vēlreiz.
    event.target.value = "";
    if (!file) return;

    setPending(true);
    setReplacing(true);
    setNotice(null);
    const error = await postImage("/api/admin/replace-image", { id: item.id }, file);
    if (error) {
      setNotice({ kind: "error", text: error });
    } else {
      setNotice({ kind: "success", text: "Bilde nomainīta" });
      router.refresh();
    }
    setReplacing(false);
    setPending(false);
  }

  const fieldId = (name: string) => `item-${item.id}-${name}`;

  return (
    <article
      className={`flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_6px_18px_rgba(59,7,100,0.06)] ${
        active ? "" : "opacity-75"
      }`}
    >
      <div
        className={`relative aspect-[4/3] bg-slate-100 ${
          dragHandle ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        draggable={dragHandle ? true : undefined}
        onDragStart={dragHandle?.onDragStart}
        onDragEnd={dragHandle?.onDragEnd}
        title={dragHandle ? "Satver un pārvelc, lai mainītu secību" : undefined}
      >
        <Image
          src={item.imageUrl}
          alt={showTitle ? item.title : ""}
          fill
          // Mājaslapas pašas attēli mēdz būt vairākus MB lieli: tiem rāda samazinātu
          // versiju. Augšupielādētie jau ir samazināti un tiek rādīti tieši.
          unoptimized={!item.imageUrl.startsWith("/")}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          draggable={false}
          className="pointer-events-none select-none object-contain"
        />
        {!active && (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
            Paslēpts
          </span>
        )}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={pending}
          className="absolute bottom-3 right-3 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow ring-1 ring-slate-200 transition hover:bg-white hover:text-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {replacing ? "Nomaina…" : "Nomainīt bildi"}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        {showTitle && (
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

            {/* Mājaslapas krievu un angļu versijai. Tukšs — rāda automātisko tulkojumu vai latvisko. */}
            <details
              className="mt-2 rounded-lg border border-slate-200 px-3 py-2"
              open={Boolean(titleRu || titleEn) || undefined}
            >
              <summary className="cursor-pointer text-xs font-semibold text-slate-500">
                Nosaukums krieviski / angliski
              </summary>
              <label htmlFor={fieldId("title-ru")} className={`${LABEL_CLASS} mt-2 block`}>
                RU
              </label>
              <input
                id={fieldId("title-ru")}
                value={titleRu}
                maxLength={LIMITS.title}
                placeholder={translateCostumeName(title, "ru")}
                onChange={(event) => setTitleRu(event.target.value)}
                className={INPUT_CLASS}
              />
              <label htmlFor={fieldId("title-en")} className={`${LABEL_CLASS} mt-2 block`}>
                EN
              </label>
              <input
                id={fieldId("title-en")}
                value={titleEn}
                maxLength={LIMITS.title}
                placeholder={translateCostumeName(title, "en")}
                onChange={(event) => setTitleEn(event.target.value)}
                className={INPUT_CLASS}
              />
              <p className="mt-1 text-xs text-slate-400">
                Ja lauks tukšs, mājaslapā rāda pelēko (automātisko) tulkojumu.
              </p>
            </details>
          </div>
        )}

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

        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
            className="h-4 w-4 accent-pink-500"
          />
          Rādīt lapā
        </label>

        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
          <input
            type="checkbox"
            checked={toInstagram}
            onChange={(event) => toggleInstagram(event.target.checked)}
            className="h-4 w-4 accent-pink-500"
          />
          Publicēt arī Instagram
        </label>

        {toInstagram && (
          <div>
            <label htmlFor={fieldId("caption")} className={LABEL_CLASS}>
              Apraksts Instagram
            </label>
            <textarea
              id={fieldId("caption")}
              value={caption}
              rows={6}
              maxLength={CAPTION_MAX}
              onChange={(event) => setCaption(event.target.value)}
              className={INPUT_CLASS}
            />
            <p className="mt-1 text-xs text-slate-500">
              Publicēs, nospiežot pogu zemāk. Ieraksts Instagram būs uzreiz redzams visiem.
            </p>
          </div>
        )}

        {/* Kostīmiem: vairākas bildes, ko klients var pāršķirt kostīma lapā. */}
        {showPriceAndSize && <ExtraImages item={item} />}

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={pending || (!dirty && !toInstagram)}
            className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending && !replacing
              ? toInstagram
                ? "Publicē…"
                : "Saglabā…"
              : toInstagram
                ? dirty
                  ? "Saglabāt un publicēt"
                  : "Publicēt"
                : "Saglabāt"}
          </button>

          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED_IMAGE_TYPES.join(",")}
            onChange={handleReplace}
            aria-label="Izvēlies jauno bildi"
            tabIndex={-1}
            className="sr-only"
          />

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
            {instagramLink && (
              <>
                {" · "}
                <a href={instagramLink} target="_blank" rel="noreferrer" className="underline">
                  Skatīt Instagram
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </article>
  );
}
