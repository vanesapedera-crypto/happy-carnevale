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
      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <SectionPicker sections={SECTIONS} current={section} />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold">Pievienot attēlus</h2>
        <ImageUploader key={section.key} sectionKey={section.key} />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-bold">Sadaļas attēli</h2>
          <p className="text-sm text-slate-500">
            {items.length} kopā, {visibleCount} redzami lapā
          </p>
        </div>

        {loadError ? (
          <p role="alert" className="rounded-2xl bg-red-50 px-6 py-5 text-sm font-medium text-red-700">
            Neizdevās ielādēt attēlus no datubāzes. {loadError}
          </p>
        ) : (
          <ItemList items={items} showPriceAndSize={section.hasPriceAndSize} />
        )}
      </section>
    </AdminShell>
  );
}
