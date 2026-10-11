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
    <li className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">
            {request.name || request.email}
            <span className="ml-2 text-sm font-normal text-slate-500">
              {REVIEW_KIND_LABELS[request.source] ?? request.source}
              {request.service ? `: ${request.service}` : ""}
            </span>
          </p>
          <p className="mt-1 break-all text-sm text-slate-600">
            {request.email}
            {request.phone ? ` · ${request.phone}` : ""}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Pieteikts {formatDate(request.createdAt)}
            {request.eventDate
              ? ` · pasākums ${request.eventDate < todayInRiga() ? "bija" : "būs"} ${formatDate(request.eventDate)}`
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
            className="rounded-lg bg-pink-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-40"
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
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-600"
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
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
          >
            Nenotika
          </button>
        )}
        {request.status === "cancelled" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => setRequestCancelledAction(request.id, false))}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
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

/** Visi pieteikumi: kam vēl nav lūgts un vēsture. */
export default function ReviewRequestList({ pending, done, reviewUrl }: ReviewRequestListProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-1 font-bold text-slate-900">Vēl nav palūgts ({pending.length})</h3>
        <p className="mb-3 text-sm text-slate-500">
          Katra kostīma rezervācija, pasākuma pieteikums un veikala pasūtījums no mājaslapas šeit parādās
          automātiski, nekas nav jāaizpilda. Kad kostīms atdots vai svētki notikuši, nospied pogu.
        </p>
        {pending.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
            Pagaidām nav neviena. Jaunie pieteikumi parādīsies šeit paši.
          </p>
        ) : (
          <ul className="space-y-3">
            {pending.map((request) => (
              <RequestRow key={`${request.id}-${request.status}`} request={request} reviewUrl={reviewUrl} />
            ))}
          </ul>
        )}
      </div>

      {done.length > 0 && (
        <div>
          <h3 className="mb-3 font-bold text-slate-900">Vēsture</h3>
          <ul className="space-y-3">
            {done.map((request) => (
              <RequestRow key={`${request.id}-${request.status}`} request={request} reviewUrl={reviewUrl} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
