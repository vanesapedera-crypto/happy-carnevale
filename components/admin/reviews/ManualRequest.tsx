"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sendManualReviewEmailAction } from "@/lib/admin/reviewActions";
import {
  REVIEW_KIND_LABELS,
  defaultReviewMessage,
  whatsappUrl,
  type ReviewKind,
} from "@/lib/reviews/whatsapp";

const INPUT =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200";
const LABEL = "text-xs font-semibold uppercase tracking-wide text-slate-500";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Atsauksmes lūgums konkrētam klientam: WhatsApp ar gatavu ziņu vai e-pasts. */
export default function ManualRequest({ reviewUrl }: { reviewUrl: string }) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [kind, setKind] = useState<ReviewKind>("rezervacija");
  const [service, setService] = useState("");
  const [edited, setEdited] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);

  // Kamēr ziņa nav labota ar roku, tā seko laukiem.
  const message = edited ?? defaultReviewMessage(name, reviewUrl, kind, service);
  const waLink = reviewUrl ? whatsappUrl(phone, message) : null;
  const phoneInvalid = phone.trim() !== "" && !whatsappUrl(phone, "x");
  const emailValid = EMAIL_PATTERN.test(email.trim());

  async function sendEmail() {
    setPending(true);
    setNotice(null);
    try {
      const result = await sendManualReviewEmailAction({ email, name, phone, kind, service });
      setNotice(result.ok ? { ok: true, text: `E-pasts nosūtīts uz ${email.trim()}` } : { ok: false, text: result.error });
      router.refresh();
    } catch {
      setNotice({ ok: false, text: "Neizdevās nosūtīt. Lūdzu, mēģini vēlreiz." });
    }
    setPending(false);
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="mr-name" className={LABEL}>
            Vārds (nav obligāti)
          </label>
          <input id="mr-name" value={name} onChange={(event) => setName(event.target.value)} className={INPUT} />
        </div>
        <div>
          <label htmlFor="mr-kind" className={LABEL}>
            Par ko sakām paldies
          </label>
          <select
            id="mr-kind"
            value={kind}
            onChange={(event) => setKind(event.target.value as ReviewKind)}
            className={INPUT}
          >
            {(Object.keys(REVIEW_KIND_LABELS) as ReviewKind[]).map((key) => (
              <option key={key} value={key}>
                {REVIEW_KIND_LABELS[key]}
              </option>
            ))}
          </select>
        </div>
        {kind !== "veikals" && (
          <div className="sm:col-span-2">
            <label htmlFor="mr-service" className={LABEL}>
              {kind === "rezervacija" ? "Kostīms (nav obligāti)" : "Pakalpojums (nav obligāti)"}
            </label>
            <input
              id="mr-service"
              value={service}
              placeholder={kind === "rezervacija" ? "piem. Spiderman" : "piem. Animatori"}
              onChange={(event) => setService(event.target.value)}
              className={INPUT}
            />
          </div>
        )}
        <div>
          <label htmlFor="mr-phone" className={LABEL}>
            Tālrunis (WhatsApp)
          </label>
          <input
            id="mr-phone"
            type="tel"
            inputMode="tel"
            value={phone}
            placeholder="26 123 456"
            onChange={(event) => setPhone(event.target.value)}
            className={INPUT}
          />
          {phoneInvalid && <p className="mt-1 text-xs font-medium text-red-600">Pārbaudi numuru.</p>}
        </div>
        <div>
          <label htmlFor="mr-email" className={LABEL}>
            E-pasts
          </label>
          <input
            id="mr-email"
            type="email"
            value={email}
            placeholder="klients@epasts.lv"
            onChange={(event) => setEmail(event.target.value)}
            className={INPUT}
          />
        </div>
      </div>

      <div className="mt-3">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="mr-message" className={LABEL}>
            WhatsApp ziņa
          </label>
          {edited !== null && (
            <button
              type="button"
              onClick={() => setEdited(null)}
              className="text-xs font-semibold text-pink-600 hover:underline"
            >
              Atjaunot sākotnējo
            </button>
          )}
        </div>
        <textarea
          id="mr-message"
          rows={6}
          value={message}
          onChange={(event) => setEdited(event.target.value)}
          className={INPUT}
        />
        <p className="mt-1 text-xs text-slate-500">E-pastā tiek sūtīts noformēts teksts ar to pašu pateicību un pogu uz atsauksmēm.</p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        {waLink ? (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-600"
          >
            Atvērt WhatsApp
          </a>
        ) : (
          <span className="cursor-not-allowed rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white opacity-40">
            Atvērt WhatsApp
          </span>
        )}
        <button
          type="button"
          onClick={sendEmail}
          disabled={pending || !reviewUrl || !emailValid}
          className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? "Sūta…" : "Sūtīt e-pastu"}
        </button>
        {!reviewUrl && <span className="text-sm text-slate-500">Vispirms saglabā Google atsauksmju saiti.</span>}
      </div>
      {notice && (
        <p
          role={notice.ok ? "status" : "alert"}
          className={`mt-2 text-sm font-medium ${notice.ok ? "text-emerald-600" : "text-red-600"}`}
        >
          {notice.text}
        </p>
      )}
    </div>
  );
}
