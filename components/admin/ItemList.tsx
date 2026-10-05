import type { SectionItem } from "@/lib/admin/types";
import ItemCard from "./ItemCard";

interface ItemListProps {
  items: SectionItem[];
  showPriceAndSize: boolean;
}

/** Sadaļas attēlu saraksts tādā secībā, kā tos redz apmeklētājs. */
export default function ItemList({ items, showPriceAndSize }: ItemListProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-slate-500">
        Šajā sadaļā vēl nav attēlu. Kamēr tā ir tukša, mājaslapā redzams sākotnējais saturs.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        // updatedAt atslēgā: pēc saglabāšanas kartīte ielādē jaunās vērtības.
        <ItemCard
          key={`${item.id}-${item.updatedAt}`}
          item={item}
          showPriceAndSize={showPriceAndSize}
        />
      ))}
    </div>
  );
}
