import AdminShell from "@/components/admin/AdminShell";
import ImageUploader from "@/components/admin/ImageUploader";
import ItemList from "@/components/admin/ItemList";
import SectionPicker from "@/components/admin/SectionPicker";
import { getAdminConfig } from "@/lib/admin/config";
import { listItems } from "@/lib/admin/items";
import { describeSupabaseError } from "@/lib/admin/supabase";
import { SECTIONS, getSection } from "@/lib/admin/sections";
import { requireSession } from "@/lib/admin/session";
import type { SectionItem } from "@/lib/admin/types";

interface DashboardPageProps {
  searchParams: Promise<{ section?: string | string[] }>;
}

export default async function AdminDashboardPage({ searchParams }: DashboardPageProps) {
  const session = await requireSession();
  const config = getAdminConfig();

  const params = await searchParams;
  const requested = Array.isArray(params.section) ? params.section[0] : params.section;
  const section = getSection(requested) ?? SECTIONS[0];

  let items: SectionItem[] = [];
  let loadError: string | null = null;
  if (config) {
    try {
      items = await listItems(config, section.key);
    } catch (error) {
      console.error("[admin] listItems failed", error);
      loadError = describeSupabaseError(error);
    }
  }

  const visibleCount = items.filter((item) => item.active).length;

  return (
    <AdminShell email={session.email}>
      <h1 className="mb-6 text-3xl font-black">Bildes</h1>
      <section className="rounded-[20px] bg-white shadow-[0_6px_18px_rgba(59,7,100,0.06)] p-5">
        <SectionPicker sections={SECTIONS} current={section} />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-black">Pievienot attēlus</h2>
        <ImageUploader key={section.key} sectionKey={section.key} />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-black">Sadaļas attēli</h2>
          <p className="text-sm text-[#8b6aa7]">
            {items.length} kopā, {visibleCount} redzami lapā
          </p>
        </div>

        {loadError ? (
          <p role="alert" className="rounded-2xl bg-red-50 px-6 py-5 text-sm font-medium text-red-700">
            Neizdevās ielādēt attēlus no datubāzes. {loadError}
          </p>
        ) : (
          <ItemList
            sectionKey={section.key}
            items={items}
            showPriceAndSize={section.hasPriceAndSize}
            showTitle={section.hasTitle}
            emptyHint={section.emptyHint}
          />
        )}
      </section>
    </AdminShell>
  );
}
