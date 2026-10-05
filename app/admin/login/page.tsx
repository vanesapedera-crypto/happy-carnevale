import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import NotConfigured from "@/components/admin/NotConfigured";
import { getAdminConfig, getMissingEnv } from "@/lib/admin/config";
import { getSession } from "@/lib/admin/session";

export default async function AdminLoginPage() {
  const configured = getAdminConfig() !== null;
  if (configured && (await getSession())) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
          Happy Carnevale
        </p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900">Satura pārvaldība</h1>
        <p className="mb-6 mt-2 text-sm text-slate-500">
          Ielogojies, lai mainītu mājaslapas attēlus.
        </p>

        {configured ? <LoginForm /> : <NotConfigured missing={getMissingEnv()} />}
      </div>
    </div>
  );
}
