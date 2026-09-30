import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SHIPPING, SITE } from "@/lib/constants";
import { escapeHtml, invoiceEnabled, invoiceHtml } from "@/lib/invoice";

const resend = new Resend(process.env.RESEND_API_KEY);

type DeliveryMode = "pickup" | "pakomats";

type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

const DELIVERY_LABELS: Record<DeliveryMode, string> = {
  pickup: "Saņemšana klātienē (Stabu iela 90, Rīga)",
  pakomats: "Pakomāts",
};

function money(value: number) {
  return `${value.toFixed(2)} €`;
}

function createOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HC-${date}-${random}`;
}

function itemsTable(items: OrderItem[]) {
  const rows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;">${escapeHtml(item.title)}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;text-align:right;">${money(item.price * item.quantity)}</td>
        </tr>`
    )
    .join("");

  return `
    <table style="width:100%;border-collapse:collapse;font-size:15px;">
      <thead>
        <tr style="color:#888;text-align:left;">
          <th style="padding-bottom:8px;">Prece</th>
          <th style="padding-bottom:8px;text-align:center;">Skaits</th>
          <th style="padding-bottom:8px;text-align:right;">Summa</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function emailLayout(title: string, content: string) {
  return `
    <div style="max-width:700px;margin:auto;font-family:Arial,sans-serif;background:#fff;border-radius:20px;border:1px solid #eee;overflow:hidden;">
      <div style="background:#ec4899;padding:25px;text-align:center;">
        <h1 style="color:#fff;margin:0;">🎭 Happy Carnevale</h1>
        <p style="color:#fff;margin-top:8px;">${title}</p>
      </div>
      <div style="padding:35px;">${content}</div>
    </div>`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim();
    const address = String(body.address ?? "").trim();
    const comment = String(body.comment ?? "").trim();
    const delivery = body.delivery as DeliveryMode;

    const items: OrderItem[] = Array.isArray(body.items)
      ? body.items
          .map((item: OrderItem) => ({
            id: String(item.id),
            title: String(item.title),
            price: Number(item.price),
            quantity: Math.floor(Number(item.quantity)),
          }))
          .filter(
            (item: OrderItem) =>
              item.title && item.price >= 0 && item.quantity > 0
          )
      : [];

    if (!name || !phone || !email || !Object.prototype.hasOwnProperty.call(DELIVERY_LABELS, delivery)) {
      return NextResponse.json(
        { ok: false, error: "Lūdzu, aizpildi visus obligātos laukus." },
        { status: 400 }
      );
    }

    if (delivery !== "pickup" && !address) {
      return NextResponse.json(
        { ok: false, error: "Lūdzu, norādi pakomātu." },
        { status: 400 }
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Grozs ir tukšs." },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping =
      delivery === "pakomats" && subtotal < SHIPPING.freeFrom
        ? SHIPPING.parcelLocker
        : 0;
    const total = subtotal + shipping;
    const orderNumber = createOrderNumber();

    const totals = `
      <div style="margin-top:20px;font-size:15px;">
        <p style="display:flex;justify-content:space-between;margin:6px 0;"><span>Preces:</span> <strong>${money(subtotal)}</strong></p>
        <p style="display:flex;justify-content:space-between;margin:6px 0;"><span>Piegāde:</span> <strong>${shipping === 0 ? "Bezmaksas" : money(shipping)}</strong></p>
        <p style="display:flex;justify-content:space-between;margin:12px 0 0;font-size:20px;color:#ec4899;"><span>Kopā:</span> <strong>${money(total)}</strong></p>
      </div>`;

    const deliveryInfo = `
      <p><strong>Saņemšanas veids:</strong> ${DELIVERY_LABELS[delivery]}</p>
      ${
        delivery !== "pickup"
          ? `<p><strong>Pakomāts:</strong> ${escapeHtml(address)}</p>`
          : ""
      }`;

    const { error } = await resend.emails.send({
      from: "Happy Carnevale <noreply@happycarnevale.lv>",
      to: SITE.email,
      replyTo: email,
      subject: `🛍️ Jauns pasūtījums ${orderNumber} — ${money(total)}`,
      html: emailLayout(
        `Jauns veikala pasūtījums ${orderNumber}`,
        `
        <h3>👤 Klients</h3>
        <p><strong>Vārds:</strong> ${escapeHtml(name)}</p>
        <p><strong>Tālrunis:</strong> ${escapeHtml(phone)}</p>
        <p><strong>E-pasts:</strong> ${escapeHtml(email)}</p>
        <hr style="margin:25px 0;">
        <h3>📦 Piegāde</h3>
        ${deliveryInfo}
        <hr style="margin:25px 0;">
        <h3>🛍️ Preces</h3>
        ${itemsTable(items)}
        ${totals}
        <hr style="margin:25px 0;">
        <h3>💬 Komentārs</h3>
        <div style="background:#fafafa;padding:18px;border-radius:12px;">${escapeHtml(comment) || "-"}</div>
        `
      ),
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { ok: false, error: "Neizdevās nosūtīt pasūtījumu." },
        { status: 500 }
      );
    }

    // Klientam: rēķins (ja rekvizīti aizpildīti lib/constants.ts) vai parasts apstiprinājums.
    // Ja tas neizdodas, pasūtījums tik un tā ir saņemts.
    const sendInvoice = invoiceEnabled();

    const { error: confirmationError } = await resend.emails.send({
      from: "Happy Carnevale <noreply@happycarnevale.lv>",
      to: email,
      ...(sendInvoice ? { bcc: SITE.email } : {}),
      replyTo: SITE.email,
      subject: sendInvoice
        ? `Rēķins Nr. ${orderNumber} — Happy Carnevale`
        : `Paldies par pasūtījumu! (${orderNumber})`,
      html: sendInvoice
        ? invoiceHtml({
            number: orderNumber,
            buyerName: name,
            buyerEmail: email,
            buyerPhone: phone,
            items,
            shipping,
            total,
            deliveryText: deliveryInfo,
          })
        : emailLayout(
            "Paldies par pasūtījumu!",
            `
        <p>Sveiki, ${escapeHtml(name)}!</p>
        <p>Esam saņēmuši tavu pasūtījumu <strong>${orderNumber}</strong>. Drīzumā sazināsimies, lai to apstiprinātu un vienotos par apmaksu.</p>
        <hr style="margin:25px 0;">
        ${itemsTable(items)}
        ${totals}
        <hr style="margin:25px 0;">
        ${deliveryInfo}
        <p style="margin-top:30px;color:#888;font-size:14px;">Jautājumi? Zvani ${SITE.phone} vai raksti ${SITE.email}.</p>
        `
          ),
    });

    if (confirmationError) {
      console.error(confirmationError);
    }

    return NextResponse.json({ ok: true, orderNumber, invoice: sendInvoice });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Neizdevās nosūtīt pasūtījumu." },
      { status: 500 }
    );
  }
}
