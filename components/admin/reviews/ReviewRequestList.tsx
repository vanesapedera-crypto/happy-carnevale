"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  markWhatsAppSentAction,
  sendRequestNowAction,
  setRequestCancelledAction,
} from "@/lib/admin/reviewActions";
import type { ReviewRequest, ReviewStatus } from "@/lib/reviews/store";
import { REVIEW_KIND_LABELS, defaultReviewMessage, whatsappUrl } from "@/lib/reviews/whatsapp";

const STATUS: Record<ReviewStatus, { label: string; className: string }> = {
  scheduled: { label: "Nav lūgts", className: "bg-amber-50 text-amber-700" },
  sending: { label: "Sūta…", className: "bg-sky-50 text-sky-700" },
  sent: { label: "Atsauksme palūgta", className: "bg-emerald-50 text-emerald-700" },
  cancelled: { label: "Nenotika", className: "bg-slate-100 text-slate-600" },
  failed: { label: "E-pasts neizdevās", className: "bg-red-50 text-red-700" },
};

function todayInRiga(): string {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Riga" });
}

function formatDate(value: string | null, withTime = false): string {
  if (!value) return "";
  const date = new Date(value.length === 10 ? `${value}T12:00:00Z` : value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("lv-LV", {
    timeZone: "Europe/Riga",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

function RequestRow({ request, reviewUrl }: { request: ReviewRequest; reviewUrl: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const status = STATUS[request.status] ?? STATUS.scheduled;

  async function run(action: () => Promise<{ ok: boolean; error?: string }>) {
    setPending(true);
    setError(null);
    try {
      const result = await action();
      if (!result.ok) setError(result.error ?? "Neizdevās.");
      router.refresh();
    } catch {
      setError("Neizdevās. Lūdzu, mēģini vēlreiz.");
    }
    setPending(false);
  }

  const waLink =
    reviewUrl && request.phone
      ? whatsappUrl(request.phone, defaultReviewMessage(request.name, reviewUrl, request.source, request.service))
      : null;
  const canSend = ["scheduled", "cancelled", "failed"].includes(request.status);

  return (
    <li className="rounded-[18px] bg-white p-4 shadow-[0_6px_18px_rgba(59,7,100,0.06)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold">
            {request.name || request.email}
            <span className="ml-2 text-sm font-normal text-[#8b6aa7]">
              {REVIEW_KIND_LABELS[request.source] ?? request.source}
              {request.service ? `: ${request.service}` : ""}
            </span>
          </p>
          <p className="mt-1 break-all text-sm text-[#7e5a9b]">
            {request.email}
            {request.phone ? ` · ${request.phone}` : ""}
          </p>
          <p className="mt-1 text-xs text-[#a78bbf]">
            Pieteikts {formatDate(request.createdAt)}
            {request.eventDate
              ? ` · ${request.source === "rezervacija" ? "kostīmu atdod" : "pasākums"} ${formatDate(request.eventDate)}`
              : ""}
            {request.status === "sent" && request.sentAt
              ? ` · palūgts ${formatDate(request.sentAt, true)}${
                  request.channel === "whatsapp" ? " (WhatsApp)" : request.channel === "email" ? " (e-pasts)" : ""
                }`
              : ""}
          </p>
          {request.status === "failed" && request.error && (
            <p className="mt-1 text-xs text-red-600">{request.error}</p>
          )}
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>
          {status.label}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {canSend && (
          <button
            type="button"
            disabled={pending || !reviewUrl}
            onClick={() => run(() => sendRequestNowAction(request.id))}
            className="rounded-full bg-pink-500 px-4 py-1.5 text-sm font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Pieprasīt atsauksmi (e-pasts)
          </button>
        )}
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (request.status !== "sent") void run(() => markWhatsAppSentAction(request.id));
            }}
            className="rounded-full bg-[#25D366] px-4 py-1.5 text-sm font-bold text-white transition hover:opacity-90"
          >
            WhatsApp
          </a>
        )}
        {request.status === "scheduled" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => setRequestCancelledAction(request.id, true))}
            title="Kostīms netika iznomāts vai pasākums nenotika: lūgumu nesūtīt"
            className="rounded-full border border-[#f3e8ff] px-4 py-1.5 text-sm font-semibold text-[#a78bbf] transition hover:bg-pink-50 hover:text-pink-700 disabled:opacity-40"
          >
            Nenotika
          </button>
        )}
        {request.status === "cancelled" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => setRequestCancelledAction(request.id, false))}
            className="rounded-full border border-[#f3e8ff] px-4 py-1.5 text-sm font-semibold text-[#a78bbf] transition hover:bg-pink-50 hover:text-pink-700 disabled:opacity-40"
          >
            Atjaunot
          </button>
        )}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </li>
  );
}

interface ReviewRequestListProps {
  pending: ReviewRequest[];
  done: ReviewRequest[];
  reviewUrl: string;
}

/**
 * Pieteikumi pāriet sadaļā "Var lūgt atsauksmi" automātiski dienā, kad kostīms atdots
 * klientam vai notika pasākums. Līdz tam tie ir sadaļā "Vēl gaida".
 */
export default function ReviewRequestList({ pending, done, reviewUrl }: ReviewRequestListProps) {
  const today = todayInRiga();
  const ready = pending.filter((request) => !request.eventDate || request.eventDate <= today);
  const waiting = pending
    .filter((request) => request.eventDate && request.eventDate > today)
    .sort((a, b) => (a.eventDate ?? "").localeCompare(b.eventDate ?? ""));

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-lg font-black">Var lūgt atsauksmi ({ready.length})</h3>
        {ready.length === 0 ? (
          <p className="rounded-[18px] bg-white px-4 py-6 text-center text-sm text-[#8b6aa7] shadow-[0_6px_18px_rgba(59,7,100,0.06)]">
            Pagaidām nav neviena.
          </p>
        ) : (
          <ul className="space-y-3">
            {ready.map((request) => (
              <RequestRow key={`${request.id}-${request.status}`} request={request} reviewUrl={reviewUrl} />
            ))}
          </ul>
        )}
      </div>

      {waiting.length > 0 && (
        <details className="rounded-[18px] bg-white p-4 shadow-[0_6px_18px_rgba(59,7,100,0.06)]">
          <summary className="cursor-pointer text-sm font-bold text-[#7e5a9b]">
            Vēl gaida – kostīms vēl nav atdots vai pasākums nav noticis ({waiting.length})
          </summary>
          <ul className="mt-3 space-y-3">
            {waiting.map((request) => (
              <RequestRow key={`${request.id}-${request.status}`} request={request} reviewUrl={reviewUrl} />
            ))}
          </ul>
        </details>
      )}

      {done.length > 0 && (
        <details className="rounded-[18px] bg-white p-4 shadow-[0_6px_18px_rgba(59,7,100,0.06)]">
          <summary className="cursor-pointer text-sm font-bold text-[#7e5a9b]">Vēsture ({done.length})</summary>
          <ul className="mt-3 space-y-3">
            {done.map((request) => (
              <RequestRow key={`${request.id}-${request.status}`} request={request} reviewUrl={reviewUrl} />
            ))}
          </ul>
        </details>
      )}
    </div>
  );
}
