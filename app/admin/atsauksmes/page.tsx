import AdminShell from "@/components/admin/AdminShell";
import NotConfigured from "@/components/admin/NotConfigured";
import ManualRequest from "@/components/admin/reviews/ManualRequest";
import ReviewLinkForm from "@/components/admin/reviews/ReviewLinkForm";
import ReviewRequestList from "@/components/admin/reviews/ReviewRequestList";
import { getAdminConfig, getMissingEnv } from "@/lib/admin/config";
import { requireSession } from "@/lib/admin/session";
import { describeSupabaseError } from "@/lib/admin/supabase";
import {
  getReviewSettings,
  isMissingTable,
  listReviewRequests,
  type ReviewRequest,
  type ReviewSettings,
} from "@/lib/reviews/store";

export const dynamic = "force-dynamic";

const CARD = "rounded-2xl border border-slate-200 bg-white p-5";

export default async function ReviewsPage() {
  const session = await requireSession();
  const config = getAdminConfig();
  if (!config) {
    return (
      <AdminShell email={session.email} current="atsauksmes">
        <NotConfigured missing={getMissingEnv()} />
      </AdminShell>
    );
  }

  let settings: ReviewSettings = { reviewUrl: "" };
  let pending: ReviewRequest[] = [];
  let done: ReviewRequest[] = [];
  let missingTables = false;
  let loadError: string | null = null;
  try {
    const [loadedSettings, lists] = await Promise.all([getReviewSettings(config), listReviewRequests(config)]);
    settings = loadedSettings;
    pending = lists.pending;
    done = lists.done;
  } catch (error) {
    if (isMissingTable(error)) {
      missingTables = true;
    } else {
      console.error("[reviews] load failed", error);
      loadError = describeSupabaseError(error);
    }
  }

  return (
    <AdminShell email={session.email} current="atsauksmes">
      <h1 className="text-2xl font-black">Atsauksmes</h1>
      <p className="mt-1 text-sm text-slate-500">
        Lūdz klientiem atsauksmi Google ar WhatsApp vai e-pastu. Lūgums aiziet tikai tad, kad nospied pogu.
      </p>

      {missingTables ? (
        <p role="alert" className="mt-6 rounded-2xl bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800">
          Datubāzē vēl nav atsauksmju tabulu. Supabase SQL Editor palaid failu supabase/atsauksmes.sql un pārlādē lapu.
        </p>
      ) : loadError ? (
        <p role="alert" className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          Neizdevās ielādēt datus. {loadError}
        </p>
      ) : (
        <div className="mt-6 space-y-6">
          <section className={CARD}>
            <ReviewLinkForm key={settings.reviewUrl} initialUrl={settings.reviewUrl} />
          </section>

          <section className={CARD}>
            <h2 className="mb-1 text-lg font-bold">Lūgt atsauksmi citam klientam</h2>
            <p className="mb-4 text-sm text-slate-500">Klientam, kurš nav sarakstā zemāk, piemēram, pieteicās pa telefonu.</p>
            <ManualRequest reviewUrl={settings.reviewUrl} />
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold">Visi pieteikumi</h2>
            <ReviewRequestList pending={pending} done={done} reviewUrl={settings.reviewUrl} />
          </section>
        </div>
      )}
    </AdminShell>
  );
}
