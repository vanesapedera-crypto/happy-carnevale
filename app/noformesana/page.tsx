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
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SHIPPING } from "@/lib/constants";

type DeliveryMode = "pickup" | "pakomats" | "address";

const DELIVERY_OPTIONS: {
  value: DeliveryMode;
  title: string;
  description: string;
  icon: typeof Store;
}[] = [
  {
    value: "pickup",
    title: "Saņemšana klātienē",
    description: "Stabu iela 90, Rīga — bez maksas",
    icon: Store,
  },
  {
    value: "pakomats",
    title: "Pakomāts",
    description: `Omniva, DPD, Smartpost u.c. — ${SHIPPING.parcelLocker.toFixed(2)} €`,
    icon: Package,
  },
  {
    value: "address",
    title: "Piegāde uz adresi",
    description: "Cena atkarīga no adreses — saskaņosim telefoniski",
    icon: Truck,
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none";
const labelClass = "mb-2 block font-semibold text-gray-900";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();

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

  const parcelLockerBlocked = items.some((item) => item.parcelLocker === false);

  // Kurjera cenu saskaņo telefoniski, tāpēc kopsummā to neieskaita
  const courier = delivery === "address";
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
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        setError(result.error || "Neizdevās nosūtīt pasūtījumu.");
        return;
      }

      setOrderNumber(result.orderNumber);
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Neizdevās nosūtīt pasūtījumu. Lūdzu, mēģini vēlreiz.");
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
            Paldies par pasūtījumu!
          </h1>

          <p className="mt-4 text-lg font-bold text-pink-500">
            Pasūtījuma nr. {orderNumber}
          </p>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Apstiprinājumu nosūtījām uz tavu e-pastu. Drīzumā sazināsimies, lai
            apstiprinātu pasūtījumu un vienotos par apmaksu.
          </p>

          <Link
            href="/veikals"
            className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
          >
            Atpakaļ uz veikalu
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
            Tavs grozs ir tukšs
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Lai noformētu pasūtījumu, vispirms pievieno grozam kādu produktu.
          </p>

          <Link
            href="/veikals"
            className="mt-10 inline-flex rounded-full bg-pink-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-pink-600"
          >
            Doties uz veikalu
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
            NOFORMĒŠANA
          </span>

          <h1 className="mt-6 text-4xl font-black text-gray-900 md:text-5xl">
            Pasūtījuma noformēšana
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            Aizpildi kontaktinformāciju un izvēlies saņemšanas veidu. Pēc
            pasūtījuma sazināsimies, lai to apstiprinātu.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]"
        >
          <div className="space-y-8">
            <section className="rounded-[32px] border border-pink-100 bg-white p-6 shadow-xl md:p-8">
              <h2 className="text-2xl font-black text-gray-900">
                1. Kontaktinformācija
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className={labelClass}>
                    Vārds, uzvārds *
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
                    Tālrunis *
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
                    E-pasts *
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
                2. Saņemšanas veids
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
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
                      <span className="font-bold text-gray-900">{title}</span>
                      <span className="text-sm text-gray-500">
                        {disabled
                          ? "Nav pieejams — grozā ir prece, ko nevar sūtīt ar pakomātu"
                          : description}
                      </span>
                    </label>
                  );
                })}
              </div>

              {delivery !== "pickup" && (
                <div className="mt-6">
                  <label htmlFor="address" className={labelClass}>
                    {delivery === "pakomats"
                      ? "Pakomāts (Omniva, DPD, Smartpost u.c. — pilsēta un nosaukums) *"
                      : "Piegādes adrese *"}
                  </label>
                  <input
                    id="address"
                    required
                    autoComplete={delivery === "address" ? "street-address" : "off"}
                    placeholder={
                      delivery === "pakomats"
                        ? "Piem., Omniva, Rīga, Origo"
                        : "Iela, māja, dzīvoklis, pilsēta, pasta indekss"
                    }
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}

              {delivery === "pickup" && (
                <p className="mt-6 flex items-start gap-3 rounded-2xl bg-pink-50 p-4 text-gray-700">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" />
                  Pasūtījumu varēsi saņemt Stabu ielā 90, Rīgā. Laiku saskaņosim
                  pa tālruni.
                </p>
              )}
            </section>

            <section className="rounded-[32px] border border-pink-100 bg-white p-6 shadow-xl md:p-8">
              <h2 className="text-2xl font-black text-gray-900">
                3. Komentārs
              </h2>

              <textarea
                id="comment"
                rows={4}
                placeholder="Papildu informācija par pasūtījumu (nav obligāti)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`${inputClass} mt-6`}
              />
            </section>
          </div>

          <aside className="h-fit rounded-[32px] border border-pink-100 bg-white p-6 shadow-xl md:p-8 lg:sticky lg:top-32">
            <h2 className="text-2xl font-black text-gray-900">
              Tavs pasūtījums
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
                <span className="text-gray-600">Preces</span>
                <span className="font-semibold">{subtotal.toFixed(2)} €</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Piegāde</span>
                <span className="font-semibold">
                  {courier
                    ? "Pēc vienošanās"
                    : shipping === 0
                      ? "Bezmaksas"
                      : `${shipping.toFixed(2)} €`}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-2xl font-black text-gray-900">
                <span>{courier ? "Kopā (bez piegādes)" : "Kopā"}</span>
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
              Piekrītu, ka mani dati tiek izmantoti pasūtījuma apstrādei un
              saziņai par to.
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
              {loading ? "Sūta..." : "Apstiprināt pasūtījumu"}
            </button>

            <Link
              href="/cart"
              className="mt-4 block text-center text-sm font-semibold text-pink-600 hover:underline"
            >
              Atpakaļ uz grozu
            </Link>

            <p className="mt-6 text-sm leading-7 text-gray-500">
              Pakomāta piegāde bez maksas pasūtījumiem virs {SHIPPING.freeFrom}{" "}
              €. Kurjera cenu un apmaksu saskaņosim pēc pasūtījuma
              apstiprināšanas.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}
