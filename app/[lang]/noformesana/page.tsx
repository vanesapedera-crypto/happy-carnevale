"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  MapPin,
  Package,
  ShoppingBag,
  Store,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SHIPPING } from "@/lib/constants";
import { useLang, useLp, useTr } from "@/context/LangContext";
import type { Tr } from "@/lib/i18n";

type DeliveryMode = "pickup" | "pakomats";

const DELIVERY_OPTIONS: {
  value: DeliveryMode;
  title: Tr;
  description: Tr;
  icon: typeof Store;
}[] = [
  {
    value: "pickup",
    title: { lv: "Saņemšana klātienē", ru: "Самовывоз", en: "Pick-up in person" },
    description: {
      lv: "Stabu iela 90, Rīga — bez maksas",
      ru: "ул. Стабу 90, Рига — бесплатно",
      en: "Stabu iela 90, Riga — free",
    },
    icon: Store,
  },
  {
    value: "pakomats",
    title: { lv: "Pakomāts", ru: "Пакомат", en: "Parcel locker" },
    description: {
      lv: `Omniva, DPD, Smartpost u.c. — ${SHIPPING.parcelLocker.toFixed(2)} €`,
      ru: `Omniva, DPD, Smartpost и др. — ${SHIPPING.parcelLocker.toFixed(2)} €`,
      en: `Omniva, DPD, Smartpost etc. — €${SHIPPING.parcelLocker.toFixed(2)}`,
    },
    icon: Package,
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none";
const labelClass = "mb-2 block font-semibold text-gray-900";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const lang = useLang();
  const t = useTr();
  const lp = useLp();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [delivery, setDelivery] = useState<DeliveryMode>("pickup");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [invoiceSent, setInvoiceSent] = useState(false);

  const parcelLockerBlocked = items.some((item) => item.parcelLocker === false);

  const shipping =
    delivery === "pakomats" && subtotal < SHIPPING.freeFrom
      ? SHIPPING.parcelLocker
      : 0;
  const total = subtotal + shipping;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          delivery,
          address: delivery === "pickup" ? "" : address,
          comment,
          items,
          lang,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(
          result.error ||
            t({ lv: "Neizdevās nosūtīt pasūtījumu.", ru: "Не удалось отправить заказ.", en: "We couldn't send your order." })
        );
        return;
      }

      setOrderNumber(result.orderNumber);
      setInvoiceSent(Boolean(result.invoice));
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        t({
          lv: "Neizdevās nosūtīt pasūtījumu. Lūdzu, mēģini vēlreiz.",
          ru: "Не удалось отправить заказ. Пожалуйста, попробуйте ещё раз.",
          en: "We couldn't send your order. Please try again.",
        })
      );
    } finally {
      setLoading(false);
    }
  }

  if (orderNumber) {
    return (
      <main className="bg-[#fff7fb] py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="mt-8 text-4xl font-black text-gray-900 md:text-5xl">
            {t({ lv: "Paldies par pasūtījumu!", ru: "Спасибо за заказ!", en: "Thank you for your order!" })}
          </h1>

          <p className="mt-4 text-lg font-bold text-pink-500">
            {t({ lv: "Pasūtījuma nr.", ru: "Заказ №", en: "Order no." })} {orderNumber}
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            {invoiceSent
              ? t({
                  lv: "Rēķinu apmaksai nosūtījām uz tavu e-pastu. Pēc apmaksas saņemšanas sagatavosim pasūtījumu.",
                  ru: "Счёт на оплату мы отправили на вашу эл. почту. После получения оплаты подготовим заказ.",
                  en: "We've emailed you an invoice. We'll prepare your order once we receive the payment.",
                })
              : t({
                  lv: "Apstiprinājumu nosūtījām uz tavu e-pastu. Drīzumā sazināsimies, lai apstiprinātu pasūtījumu un vienotos par apmaksu.",
                  ru: "Подтверждение мы отправили на вашу эл. почту. Скоро свяжемся с вами, чтобы подтвердить заказ и договориться об оплате.",
                  en: "We've emailed you a confirmation. We'll be in touch soon to confirm the order and arrange payment.",
                })}
          </p>

          <Link
            href={lp("/veikals")}
            className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
          >
            {t({ lv: "Atpakaļ uz veikalu", ru: "Назад в магазин", en: "Back to shop" })}
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="bg-[#fff7fb] py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-pink-100">
            <ShoppingBag className="h-10 w-10 text-pink-500" />
          </div>

          <h1 className="mt-8 text-5xl font-black text-gray-900">
            {t({ lv: "Tavs grozs ir tukšs", ru: "Ваша корзина пуста", en: "Your cart is empty" })}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            {t({ lv: "Lai noformētu pasūtījumu, vispirms pievieno grozam kādu produktu.", ru: "Чтобы оформить заказ, сначала добавьте товар в корзину.", en: "To check out, first add a product to your cart." })}
          </p>

          <Link
            href={lp("/veikals")}
            className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
          >
            {t({ lv: "Doties uz veikalu", ru: "Перейти в магазин", en: "Go to the shop" })}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#fff7fb] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.35em] text-pink-600">
            {t({ lv: "NOFORMĒŠANA", ru: "ОФОРМЛЕНИЕ", en: "CHECKOUT" })}
          </span>

          <h1 className="mt-6 text-4xl font-black text-gray-900 md:text-5xl">
            {t({ lv: "Pasūtījuma noformēšana", ru: "Оформление заказа", en: "Checkout" })}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            {t({ lv: "Aizpildi kontaktinformāciju un izvēlies saņemšanas veidu. Pēc pasūtījuma sazināsimies, lai to apstiprinātu.", ru: "Заполните контактные данные и выберите способ получения. После заказа мы свяжемся с вами для подтверждения.", en: "Fill in your contact details and choose how to receive your order. We'll get in touch afterwards to confirm it." })}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]"
        >
          <div className="space-y-8">
            <section className="rounded-[32px] border border-pink-100 bg-white p-6 shadow-xl md:p-8">
              <h2 className="text-2xl font-black text-gray-900">
                1. {t({ lv: "Kontaktinformācija", ru: "Контактные данные", en: "Contact details" })}
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className={labelClass}>
                    {t({ lv: "Vārds, uzvārds", ru: "Имя и фамилия", en: "Full name" })} *
                  </label>
                  <input
                    id="name"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClass}>
                    {t({ lv: "Tālrunis", ru: "Телефон", en: "Phone" })} *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+371"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
                    {t({ lv: "E-pasts", ru: "Эл. почта", en: "Email" })} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-pink-100 bg-white p-6 shadow-xl md:p-8">
              <h2 className="text-2xl font-black text-gray-900">
                2. {t({ lv: "Saņemšanas veids", ru: "Способ получения", en: "Delivery method" })}
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {DELIVERY_OPTIONS.map(({ value, title, description, icon: Icon }) => {
                  const active = delivery === value;
                  const disabled = value === "pakomats" && parcelLockerBlocked;

                  return (
                    <label
                      key={value}
                      className={`flex flex-col gap-3 rounded-2xl border-2 p-5 transition ${
                        disabled
                          ? "cursor-not-allowed border-gray-100 bg-gray-50 opacity-60"
                          : active
                            ? "cursor-pointer border-pink-500 bg-pink-50"
                            : "cursor-pointer border-gray-200 hover:border-pink-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={value}
                        checked={active}
                        disabled={disabled}
                        onChange={() => setDelivery(value)}
                        className="sr-only"
                      />
                      <Icon
                        className={`h-7 w-7 ${active ? "text-pink-500" : "text-gray-400"}`}
                      />
                      <span className="font-bold text-gray-900">{t(title)}</span>
                      <span className="text-sm text-gray-500">
                        {disabled
                          ? t({
                              lv: "Nav pieejams — grozā ir prece, ko nevar sūtīt ar pakomātu",
                              ru: "Недоступно — в корзине есть товар, который нельзя отправить в пакомат",
                              en: "Not available — your cart has an item that can't go by parcel locker",
                            })
                          : t(description)}
                      </span>
                    </label>
                  );
                })}
              </div>

              {delivery !== "pickup" && (
                <div className="mt-6">
                  <label htmlFor="address" className={labelClass}>
                    {t({
                      lv: "Pakomāts (Omniva, DPD, Smartpost u.c. — pilsēta un nosaukums)",
                      ru: "Пакомат (Omniva, DPD, Smartpost и др. — город и название)",
                      en: "Parcel locker (Omniva, DPD, Smartpost etc. — city and name)",
                    })}{" "}
                    *
                  </label>
                  <input
                    id="address"
                    required
                    autoComplete="off"
                    placeholder={t({ lv: "Piem., Omniva, Rīga, Origo", ru: "Напр., Omniva, Рига, Origo", en: "E.g. Omniva, Riga, Origo" })}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}

              {delivery === "pickup" && (
                <p className="mt-6 flex items-start gap-3 rounded-2xl bg-pink-50 p-4 text-gray-700">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" />
                  {t({ lv: "Pasūtījumu varēsi saņemt Stabu ielā 90, Rīgā. Laiku saskaņosim pa tālruni.", ru: "Заказ можно будет забрать по адресу ул. Стабу 90, Рига. Время согласуем по телефону.", en: "You can collect your order at Stabu iela 90, Riga. We'll agree on a time by phone." })}
                </p>
              )}
            </section>

            <section className="rounded-[32px] border border-pink-100 bg-white p-6 shadow-xl md:p-8">
              <h2 className="text-2xl font-black text-gray-900">
                3. {t({ lv: "Komentārs", ru: "Комментарий", en: "Comment" })}
              </h2>

              <textarea
                id="comment"
                rows={4}
                placeholder={t({
                  lv: "Papildu informācija par pasūtījumu (nav obligāti)",
                  ru: "Дополнительная информация о заказе (необязательно)",
                  en: "Anything else about your order (optional)",
                })}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`${inputClass} mt-6`}
              />
            </section>
          </div>

          <aside className="h-fit rounded-[32px] border border-pink-100 bg-white p-6 shadow-xl md:p-8 lg:sticky lg:top-32">
            <h2 className="text-2xl font-black text-gray-900">
              {t({ lv: "Tavs pasūtījums", ru: "Ваш заказ", en: "Your order" })}
            </h2>

            <ul className="mt-6 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-pink-50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                    <span className="absolute -right-0 -top-0 flex h-6 min-w-6 items-center justify-center rounded-full bg-pink-500 px-1 text-xs font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>

                  <span className="flex-1 font-semibold text-gray-900">
                    {item.title}
                  </span>

                  <span className="font-semibold text-gray-900">
                    {(item.price * item.quantity).toFixed(2)} €
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3 border-t border-gray-200 pt-6 text-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t({ lv: "Preces", ru: "Товары", en: "Items" })}</span>
                <span className="font-semibold">{subtotal.toFixed(2)} €</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t({ lv: "Piegāde", ru: "Доставка", en: "Delivery" })}</span>
                <span className="font-semibold">
                  {shipping === 0
                      ? t({ lv: "Bezmaksas", ru: "Бесплатно", en: "Free" })
                      : `${shipping.toFixed(2)} €`}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-2xl font-black text-gray-900">
                <span>{t({ lv: "Kopā", ru: "Итого", en: "Total" })}</span>
                <span>{total.toFixed(2)} €</span>
              </div>
            </div>

            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-6 text-gray-600">
              <input
                type="checkbox"
                required
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 accent-pink-500"
              />
              {t({ lv: "Piekrītu, ka mani dati tiek izmantoti pasūtījuma apstrādei un saziņai par to.", ru: "Я согласен(-на), что мои данные будут использованы для обработки заказа и связи по нему.", en: "I agree that my details will be used to process the order and to contact me about it." })}
            </label>

            {error && (
              <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 py-4 text-lg font-bold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="h-5 w-5 animate-spin" />}
              {loading
                ? t({ lv: "Sūta...", ru: "Отправка...", en: "Sending..." })
                : t({ lv: "Apstiprināt pasūtījumu", ru: "Подтвердить заказ", en: "Place order" })}
            </button>

            <Link
              href={lp("/cart")}
              className="mt-4 block text-center text-sm font-semibold text-pink-600 hover:underline"
            >
              {t({ lv: "Atpakaļ uz grozu", ru: "Назад в корзину", en: "Back to cart" })}
            </Link>

            <p className="mt-6 text-sm leading-7 text-gray-500">
              {t({
                lv: `Pakomāta piegāde bez maksas pasūtījumiem virs ${SHIPPING.freeFrom} €. Pēc pasūtījuma apstiprināšanas rēķins tiks nosūtīts uz tavu e-pastu.`,
                ru: `Доставка в пакомат бесплатна при заказе от ${SHIPPING.freeFrom} €. После подтверждения заказа счёт будет отправлен на вашу эл. почту.`,
                en: `Free parcel locker delivery on orders over €${SHIPPING.freeFrom}. Once your order is confirmed, the invoice will be sent to your email.`,
              })}
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}
