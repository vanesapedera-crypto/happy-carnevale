import { redirect } from "next/navigation";
import { getSession } from "@/lib/admin/session";

/** /admin: ielogotu lietotāju ved uz paneli, pārējos uz ielogošanos. */
export default async function AdminIndexPage() {
  const session = await getSession();
  redirect(session ? "/admin/dashboard" : "/admin/login");
}
