import { INVOICE, SITE } from "@/lib/constants";
import { formatDateLv, toIsoDate } from "@/lib/date";

export type InvoiceItem = {
  title: string;
  price: number;
  quantity: number;
};

type InvoiceData = {
  number: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  items: InvoiceItem[];
  shipping: number;
  total: number;
  deliveryText: string;
};

export function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const money = (value: number) => `${value.toFixed(2)} €`;

export const invoiceEnabled = () => Boolean(INVOICE.iban && INVOICE.companyName);

export function invoiceHtml(data: InvoiceData) {
  const today = new Date();
  const due = new Date(today);
  due.setDate(due.getDate() + INVOICE.paymentDays);

  const cell = "padding:10px 8px;border-bottom:1px solid #eee;";

  const rows = [
    ...data.items.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
    ...(data.shipping > 0
      ? [{ title: "Piegāde uz pakomātu", quantity: 1, price: data.shipping }]
      : []),
  ]
    .map(
      (row, i) => `
      <tr>
        <td style="${cell}">${i + 1}</td>
        <td style="${cell}">${escapeHtml(row.title)}</td>
        <td style="${cell}text-align:center;">${row.quantity}</td>
        <td style="${cell}text-align:right;">${money(row.price)}</td>
        <td style="${cell}text-align:right;">${money(row.price * row.quantity)}</td>
      </tr>`
    )
    .join("");

  return `
  <div style="max-width:720px;margin:auto;font-family:Arial,sans-serif;color:#1f2937;background:#fff;border:1px solid #eee;border-radius:20px;overflow:hidden;">
    <div style="background:#ec4899;padding:25px 35px;color:#fff;">
      <h1 style="margin:0;font-size:26px;">Rēķins Nr. ${escapeHtml(data.number)}</h1>
      <p style="margin:8px 0 0;">Datums: ${formatDateLv(toIsoDate(today))} · Apmaksāt līdz: ${formatDateLv(toIsoDate(due))}</p>
    </div>

    <div style="padding:35px;">
      <p>Sveiki, ${escapeHtml(data.buyerName)}! Paldies par pasūtījumu. Zemāk ir rēķins apmaksai.</p>

      <table style="width:100%;margin:25px 0;font-size:14px;line-height:1.6;">
        <tr>
          <td style="vertical-align:top;width:50%;padding-right:15px;">
            <strong style="color:#ec4899;">Pakalpojuma sniedzējs</strong><br>
            ${escapeHtml(INVOICE.companyName)}<br>
            ${INVOICE.regNumber ? `Reģ. nr.: ${escapeHtml(INVOICE.regNumber)}<br>` : ""}
            ${INVOICE.vatNumber ? `PVN nr.: ${escapeHtml(INVOICE.vatNumber)}<br>` : ""}
            ${INVOICE.address ? `${escapeHtml(INVOICE.address)}<br>` : ""}
            ${INVOICE.bankName ? `Banka: ${escapeHtml(INVOICE.bankName)}<br>` : ""}
            Konts: ${escapeHtml(INVOICE.iban)}
          </td>
          <td style="vertical-align:top;width:50%;">
            <strong style="color:#ec4899;">Saņēmējs</strong><br>
            ${escapeHtml(data.buyerName)}<br>
            ${escapeHtml(data.buyerEmail)}<br>
            ${escapeHtml(data.buyerPhone)}
          </td>
        </tr>
      </table>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#fdf2f8;text-align:left;">
            <th style="padding:10px 8px;">Nr.</th>
            <th style="padding:10px 8px;">Nosaukums</th>
            <th style="padding:10px 8px;text-align:center;">Daudz.</th>
            <th style="padding:10px 8px;text-align:right;">Cena</th>
            <th style="padding:10px 8px;text-align:right;">Summa</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <p style="text-align:right;font-size:20px;margin:20px 0 5px;">
        <strong>Kopā apmaksai: <span style="color:#ec4899;">${money(data.total)}</span></strong>
      </p>
      ${INVOICE.vatNumber ? "" : `<p style="text-align:right;font-size:13px;color:#888;margin:0;">PVN netiek piemērots.</p>`}

      <div style="margin-top:30px;background:#fafafa;border-radius:12px;padding:18px;font-size:14px;line-height:1.7;">
        <strong>Apmaksas informācija</strong><br>
        Saņēmējs: ${escapeHtml(INVOICE.companyName)}<br>
        Konts: ${escapeHtml(INVOICE.iban)}<br>
        Summa: ${money(data.total)}<br>
        Maksājuma mērķis: <strong>Rēķins Nr. ${escapeHtml(data.number)}</strong>
      </div>

      <p style="margin-top:20px;font-size:14px;">${data.deliveryText}</p>

      <p style="margin-top:30px;color:#888;font-size:13px;">
        Rēķins sagatavots elektroniski un ir derīgs bez paraksta.
        Jautājumi? Zvani ${SITE.phone} vai raksti ${SITE.email}.
      </p>
    </div>
  </div>`;
}
