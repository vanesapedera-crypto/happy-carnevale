"use client";

import { useRef, useState, type DragEvent } from "react";
import { useRouter } from "next/navigation";
import { reorderItemsAction } from "@/lib/admin/actions";
import { moveId } from "@/lib/admin/reorder";
import type { SectionItem } from "@/lib/admin/types";
import ItemCard from "./ItemCard";

interface ItemListProps {
  sectionKey: string;
  items: SectionItem[];
  showPriceAndSize: boolean;
}

/** Vieta, kur nomest velkamo kartīti: pirms vai pēc kartītes `id`. */
interface DropTarget {
  id: string;
  after: boolean;
  /** true, ja kartītes ir viena zem otras (šaurs ekrāns). */
  vertical: boolean;
}

/**
 * Sadaļas attēlu saraksts tādā secībā, kā tos redz apmeklētājs.
 * Secību maina, pārvelkot kartīti aiz attēla.
 */
export default function ItemList({ sectionKey, items, showPriceAndSize }: ItemListProps) {
  const router = useRouter();

  const serverIds = items.map((item) => item.id);
  const serverKey = serverIds.join(",");
  const [ids, setIds] = useState<readonly string[]>(serverIds);
  const [syncedKey, setSyncedKey] = useState(serverKey);
  // Pēc saglabāšanas, dzēšanas vai augšupielādes seko servera secībai.
  if (syncedKey !== serverKey) {
    setSyncedKey(serverKey);
    setIds(serverIds);
  }

  const dragRef = useRef<string | null>(null);
  const dropRef = useRef<DropTarget | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);
  const [drop, setDrop] = useState<DropTarget | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-500">
        Šajā sadaļā vēl nav attēlu. Kamēr tā ir tukša, mājaslapā redzams sākotnējais saturs.
      </p>
    );
  }

  const byId = new Map(items.map((item) => [item.id, item]));
  const ordered = [
    ...ids.flatMap((id) => byId.get(id) ?? []),
    ...items.filter((item) => !ids.includes(item.id)),
  ];
  const canReorder = ordered.length > 1;

  function setDropTarget(target: DropTarget | null) {
    const previous = dropRef.current;
    if (
      previous?.id === target?.id &&
      previous?.after === target?.after &&
      previous?.vertical === target?.vertical
    ) {
      return;
    }
    dropRef.current = target;
    setDrop(target);
  }

  function endDrag() {
    dragRef.current = null;
    dropRef.current = null;
    setDragId(null);
    setDrop(null);
  }

  function handleDragStart(id: string, event: DragEvent<HTMLDivElement>) {
    if (saving) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);

    // Velkot rāda visu kartīti, nevis tikai attēlu.
    const card = event.currentTarget.closest("article");
    if (card) {
      const rect = card.getBoundingClientRect();
      event.dataTransfer.setDragImage(card, event.clientX - rect.left, event.clientY - rect.top);
    }

    dragRef.current = id;
    // Izskatu maina tikai pēc tam, kad pārlūks ir sācis vilkšanu.
    window.setTimeout(() => {
      if (dragRef.current !== id) return;
      setDragId(id);
      setError(null);
    }, 0);
  }

  function handleCardDragOver(id: string, event: DragEvent<HTMLDivElement>) {
    if (!dragRef.current) return;

    const cell = event.currentTarget;
    const rect = cell.getBoundingClientRect();
    const grid = cell.parentElement;
    const vertical = grid !== null && rect.width > grid.clientWidth * 0.75;
    const after = vertical
      ? event.clientY > rect.top + rect.height / 2
      : event.clientX > rect.left + rect.width / 2;
    setDropTarget({ id, after, vertical });
  }

  function handleGridDragOver(event: DragEvent<HTMLDivElement>) {
    // Ļauj nomest arī spraugā starp kartītēm; citu vilkšanu (piem. failus) neaiztiek.
    if (!dragRef.current) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleGridDragLeave(event: DragEvent<HTMLDivElement>) {
    const next = event.relatedTarget;
    if (next instanceof Node && event.currentTarget.contains(next)) return;
    setDropTarget(null);
  }

  function handleGridDrop(event: DragEvent<HTMLDivElement>) {
    const dragged = dragRef.current;
    const target = dropRef.current;
    if (!dragged) return;
    event.preventDefault();
    endDrag();
    if (!target) return;

    const next = moveId(ids, dragged, target.id, target.after);
    if (next !== ids) void saveOrder(next);
  }

  async function saveOrder(next: readonly string[]) {
    const previous = ids;
    setIds(next);
    setSaving(true);
    setError(null);
    try {
      const result = await reorderItemsAction(sectionKey, [...next]);
      if (!result.ok) {
        setIds(previous);
        setError(result.error);
      }
    } catch {
      setIds(previous);
      setError("Neizdevās saglabāt secību. Lūdzu, mēģini vēlreiz.");
    }
    setSaving(false);
    router.refresh();
  }

  // Līniju rāda tikai tad, ja nomešana tiešām mainītu secību.
  const indicator =
    dragId && drop && moveId(ids, dragId, drop.id, drop.after) !== ids ? drop : null;

  return (
    <div>
      {canReorder && (
        <p className="mb-3 text-sm text-slate-500">
          Lai mainītu secību, satver attēlu un pārvelc to vajadzīgajā vietā.
        </p>
      )}

      <p role="status" aria-live="polite" className="sr-only">
        {saving ? "Saglabā secību" : ""}
      </p>
      {error && (
        <p role="alert" className="mb-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <div
        className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${saving ? "cursor-progress" : ""}`}
        onDragOver={handleGridDragOver}
        onDragLeave={handleGridDragLeave}
        onDrop={handleGridDrop}
      >
        {ordered.map((item) => (
          <div
            key={item.id}
            data-item-id={item.id}
            className={`relative transition-opacity ${dragId === item.id ? "opacity-40" : ""}`}
            onDragOver={(event) => handleCardDragOver(item.id, event)}
          >
            {indicator?.id === item.id && (
              <span
                aria-hidden
                className={`pointer-events-none absolute z-10 rounded-full bg-pink-500 ${
                  indicator.vertical
                    ? `left-0 right-0 h-1 ${indicator.after ? "-bottom-3" : "-top-3"}`
                    : `bottom-0 top-0 w-1 ${indicator.after ? "-right-3" : "-left-3"}`
                }`}
              />
            )}
            {/* updatedAt atslēgā: pēc saglabāšanas kartīte ielādē jaunās vērtības. */}
            <ItemCard
              key={`${item.id}-${item.updatedAt}`}
              item={item}
              showPriceAndSize={showPriceAndSize}
              dragHandle={
                canReorder
                  ? {
                      onDragStart: (event) => handleDragStart(item.id, event),
                      onDragEnd: endDrag,
                    }
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
