import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import NotConfigured from "@/components/admin/NotConfigured";
import { getAdminConfig, getMissingEnv } from "@/lib/admin/config";
import { getSession } from "@/lib/admin/session";

export default async function AdminLoginPage() {
  const configured = getAdminConfig() !== null;
  if (configured && (await getSession())) {
    redirect("/admin/kalendars");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-500 to-violet-500 px-4 py-10">
      <div className="w-full max-w-sm rounded-[24px] bg-white p-7 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
          Happy Carnevale
        </p>
        <h1 className="mb-6 mt-1 text-2xl font-black text-[#3b0764]">Admin panelis</h1>

        {configured ? <LoginForm /> : <NotConfigured missing={getMissingEnv()} />}
      </div>
    </div>
  );
}
