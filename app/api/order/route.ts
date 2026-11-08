import { Resend } from "resend";
import { NextResponse } from "next/server";
import { SHIPPING, SITE } from "@/lib/constants";
import { escapeHtml, invoiceEnabled, invoiceHtml } from "@/lib/invoice";
import { recordReviewRequest } from "@/lib/reviews/record";
import { contactButtonsHtml } from "@/lib/email/contactButtons";
import { toLang, tr, type Lang, type Tr } from "@/lib/i18n";

const resend = new Resend(process.env.RESEND_API_KEY);

type DeliveryMode = "pickup" | "pakomats";

type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

const DELIVERY_LABELS: Record<DeliveryMode, Tr> = {
  pickup: {
    lv: "Saņemšana klātienē (Stabu iela 90, Rīga)",
    ru: "Самовывоз (ул. Стабу 90, Рига)",
    en: "Pick-up in person (Stabu iela 90, Riga)",
  },
  pakomats: { lv: "Pakomāts", ru: "Пакомат", en: "Parcel locker" },
};

/** Klientam redzamie teksti e-pastā un kļūdās (pēc lapas valodas). */
const TX = {
  lv: {
    required: "Lūdzu, aizpildi visus obligātos laukus.",
    locker: "Lūdzu, norādi pakomātu.",
    empty: "Grozs ir tukšs.",
    failed: "Neizdevās nosūtīt pasūtījumu.",
    item: "Prece",
    qty: "Skaits",
    sum: "Summa",
    items: "Preces",
    delivery: "Piegāde",
    free: "Bezmaksas",
    total: "Kopā",
    deliveryMode: "Saņemšanas veids",
    lockerLabel: "Pakomāts",
    thanks: "Paldies par pasūtījumu!",
    hello: "Sveiki",
    received: (n: string) =>
      `Esam saņēmuši tavu pasūtījumu <strong>${n}</strong>. Drīzumā sazināsimies, lai to apstiprinātu un vienotos par apmaksu.`,
    questions: (phone: string, email: string) => `Jautājumi? Zvani ${phone} vai raksti ${email}.`,
  },
  ru: {
    required: "Пожалуйста, заполните все обязательные поля.",
    locker: "Пожалуйста, укажите пакомат.",
    empty: "Корзина пуста.",
    failed: "Не удалось отправить заказ.",
    item: "Товар",
    qty: "Кол-во",
    sum: "Сумма",
    items: "Товары",
    delivery: "Доставка",
    free: "Бесплатно",
    total: "Итого",
    deliveryMode: "Способ получения",
    lockerLabel: "Пакомат",
    thanks: "Спасибо за заказ!",
    hello: "Здравствуйте",
    received: (n: string) =>
      `Мы получили ваш заказ <strong>${n}</strong>. Скоро свяжемся с вами, чтобы подтвердить его и договориться об оплате.`,
    questions: (phone: string, email: string) =>
      `Есть вопросы? Звоните ${phone} или пишите на ${email}.`,
  },
  en: {
    required: "Please fill in all required fields.",
    locker: "Please enter a parcel locker.",
    empty: "Your cart is empty.",
    failed: "We couldn't send your order.",
    item: "Item",
    qty: "Qty",
    sum: "Amount",
    items: "Items",
    delivery: "Delivery",
    free: "Free",
    total: "Total",
    deliveryMode: "Delivery method",
    lockerLabel: "Parcel locker",
    thanks: "Thank you for your order!",
    hello: "Hi",
    received: (n: string) =>
      `We've received your order <strong>${n}</strong>. We'll be in touch soon to confirm it and arrange payment.`,
    questions: (phone: string, email: string) => `Questions? Call ${phone} or email ${email}.`,
  },
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

function itemsTable(items: OrderItem[], lang: Lang = "lv") {
  const t = TX[lang];
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
          <th style="padding-bottom:8px;">${t.item}</th>
          <th style="padding-bottom:8px;text-align:center;">${t.qty}</th>
          <th style="padding-bottom:8px;text-align:right;">${t.sum}</th>
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
    const lang = toLang(body.lang);
    const t = TX[lang];

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
        { ok: false, error: t.required },
        { status: 400 }
      );
    }

    if (delivery !== "pickup" && !address) {
      return NextResponse.json(
        { ok: false, error: t.locker },
        { status: 400 }
      );
    }

    if (items.length === 0) {
      return NextResponse.json(
        { ok: false, error: t.empty },
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

    const totalsHtml = (l: Lang) => {
      const x = TX[l];
      return `
      <div style="margin-top:20px;font-size:15px;">
        <p style="display:flex;justify-content:space-between;margin:6px 0;"><span>${x.items}:</span> <strong>${money(subtotal)}</strong></p>
        <p style="display:flex;justify-content:space-between;margin:6px 0;"><span>${x.delivery}:</span> <strong>${shipping === 0 ? x.free : money(shipping)}</strong></p>
        <p style="display:flex;justify-content:space-between;margin:12px 0 0;font-size:20px;color:#ec4899;"><span>${x.total}:</span> <strong>${money(total)}</strong></p>
      </div>`;
    };
    const totals = totalsHtml("lv");

    const deliveryHtml = (l: Lang) => `
      <p><strong>${TX[l].deliveryMode}:</strong> ${tr(l, DELIVERY_LABELS[delivery])}</p>
      ${
        delivery !== "pickup"
          ? `<p><strong>${TX[l].lockerLabel}:</strong> ${escapeHtml(address)}</p>`
          : ""
      }`;
    const deliveryInfo = deliveryHtml("lv");

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
        ${lang !== "lv" ? `<p><strong>Valoda:</strong> ${lang.toUpperCase()} (pasūtīts ${lang === "ru" ? "krievu" : "angļu"} valodas lapā)</p>` : ""}
        ${contactButtonsHtml({ name, phone, email, about: `pasūtījumu ${orderNumber}` })}
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
        { ok: false, error: t.failed },
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
        : `${t.thanks} (${orderNumber})`,
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
            t.thanks,
            `
        <p>${t.hello}, ${escapeHtml(name)}!</p>
        <p>${t.received(orderNumber)}</p>
        <hr style="margin:25px 0;">
        ${itemsTable(items, lang)}
        ${totalsHtml(lang)}
        <hr style="margin:25px 0;">
        ${deliveryHtml(lang)}
        <p style="margin-top:30px;color:#888;font-size:14px;">${t.questions(SITE.phone, SITE.email)}</p>
        `
          ),
    });

    if (confirmationError) {
      console.error(confirmationError);
    }

    // Klients parādās admin paneļa sadaļā "Atsauksmes"; lūgumu sūta tikai ar pogu.
    await recordReviewRequest({
      source: "veikals",
      name,
      email,
      phone,
      service: items.map((item) => item.title).join(", "),
    });

    return NextResponse.json({ ok: true, orderNumber, invoice: sendInvoice });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Neizdevās nosūtīt pasūtījumu." },
      { status: 500 }
    );
  }
}
