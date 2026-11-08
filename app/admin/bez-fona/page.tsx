import AdminShell from "@/components/admin/AdminShell";
import BulkCutout, { type BulkItem } from "@/components/admin/BulkCutout";
import { getAdminConfig } from "@/lib/admin/config";
import { listItems } from "@/lib/admin/items";
import { SECTIONS } from "@/lib/admin/sections";
import { requireSession } from "@/lib/admin/session";
import { describeSupabaseError } from "@/lib/admin/supabase";
import { cutoutFor } from "@/lib/costumeCutouts";

export const dynamic = "force-dynamic";

/** Visu kostīmu sadaļu bildēm vienā reizē noņem fonu. */
export default async function BezFonaPage() {
  const session = await requireSession();
  const config = getAdminConfig();

  const todo: BulkItem[] = [];
  let done = 0;
  let loadError: string | null = null;

  if (config) {
    try {
      for (const section of SECTIONS.filter((s) => s.hasPriceAndSize)) {
        const items = await listItems(config, section.key);
        for (const item of items) {
          const ready =
            !!cutoutFor(item.imageUrl) || (item.cutout !== null && item.cutout.source === item.imageUrl);
          if (ready) done++;
          else
            todo.push({
              id: item.id,
              imageUrl: item.imageUrl,
              title: item.title,
              section: section.label,
            });
        }
      }
    } catch (error) {
      loadError = describeSupabaseError(error);
    }
  }

  return (
    <AdminShell email={session.email} current="bez-fona">
      <h1 className="mb-2 text-3xl font-black">Bildes bez fona</h1>
      <p className="mb-6 max-w-2xl text-sm text-[#6b5a7d]">
        Mājaslapā aiz kostīma rāda krāsainu apli tikai tad, ja bildei ir noņemts fons. Šeit to var
        izdarīt visām kostīmu sadaļām uzreiz. Kamēr notiek darbs, atstāj šo lapu atvērtu.
      </p>
      {loadError ? (
        <p role="alert" className="rounded-2xl bg-red-50 px-6 py-5 text-sm font-medium text-red-700">
          Neizdevās ielādēt bildes. {loadError}
        </p>
      ) : (
        <BulkCutout items={todo} alreadyDone={done} />
      )}
    </AdminShell>
  );
}
