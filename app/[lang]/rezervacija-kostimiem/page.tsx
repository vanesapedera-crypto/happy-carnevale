"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, Lock, MapPin, MessageCircle, Package, Phone, Ruler, Store, Truck, User } from "lucide-react";
import ReservationSuccess from "@/components/reservation/ReservationSuccess";
import DateInput from "@/components/common/DateInput";
import { cutoutFor } from "@/lib/costumeCutouts";
import { useLang, useTr } from "@/context/LangContext";
import { translateCostumeDetail } from "@/lib/costumeNames";

type DeliveryMode = "pickup" | "address" | "omniva";

function ReservationContent() {
  const searchParams = useSearchParams();
  const lang = useLang();
  const tDetail = (text: string | null) => (text ? translateCostumeDetail(text, lang) : text);
  const t = useTr();

  // kostims/price/size ir latviski (tie aiziet e-pastā); lapā rāda tulkotus
  const costume = searchParams.get("kostims");
  const displayName = searchParams.get("nosaukums") || costume;
  const image = searchParams.get("image");
  const price = searchParams.get("price");
  const size = searchParams.get("size");

  const isMascot = (image || "").includes("/kostimi/mascotas/");

  // Admin panelī pievienotās kostīma papildu bildes
  const [extraImages, setExtraImages] = useState<string[]>([]);
  useEffect(() => {
    if (!image) return;
    let cancelled = false;
    fetch(`/api/costume-images?image=${encodeURIComponent(image)}`)
      .then((response) => (response.ok ? response.json() : { images: [] }))
      .then((data: { images?: string[] }) => {
        if (!cancelled && Array.isArray(data.images)) setExtraImages(data.images);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [image]);

  const [delivery, setDelivery] = useState<DeliveryMode>("pickup");
  const [photo, setPhoto] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    let ok = false;

    try {
      const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          costume,
          image,
          price,
          size,
          name,
          phone,
          email,
          date: eventDate,
          pickupDate,
          delivery,
          address,
          message: comment,
          lang,
        }),
      });

      ok = response.ok;
    } catch (err) {
      console.error(err);
    }

    setLoading(false);

    if (ok) {
      setSuccess(true);
      setName("");
      setPhone("");
      setEmail("");
      setEventDate("");
      setPickupDate("");
      setAddress("");
      setComment("");
      setDelivery("pickup");
    } else {
      setError(
        t({
          lv: "Rezervāciju neizdevās nosūtīt. Lūdzu, mēģini vēlreiz vai sazinies ar mums pa tālruni.",
          ru: "Не удалось отправить бронирование. Пожалуйста, попробуйте ещё раз или позвоните нам.",
          en: "We couldn't send your booking. Please try again or give us a call.",
        })
      );
    }
  }

  if (success) {
    return (
      <main className="bg-gradient-to-b from-[#FBF9FF] via-[#F6F1FF] to-[#FFF4FA] px-6 py-24">
        <ReservationSuccess
          text={t({
            lv: `Esam saņēmuši tavu rezervāciju${displayName ? ` kostīmam „${displayName}”` : ""}. Drīzumā sazināsimies, lai apstiprinātu kostīma pieejamību un saņemšanas detaļas.`,
            ru: `Мы получили ваше бронирование${displayName ? ` костюма «${displayName}»` : ""}. Скоро свяжемся с вами, чтобы подтвердить, что костюм свободен, и обсудить получение.`,
            en: `We've received your booking${displayName ? ` for the “${displayName}” costume` : ""}. We'll be in touch soon to confirm availability and pick-up details.`,
          })}
          onReset={() => setSuccess(false)}
          resetLabel={t({ lv: "Rezervēt vēlreiz", ru: "Забронировать снова", en: "Book again" })}
        />
      </main>
    );
  }

  const dateCls =
    "h-14 w-full rounded-2xl border border-[#E6E3F0] bg-white px-4 text-base transition duration-200 hover:border-[#CFC2FF] focus:border-[#B9A3FF] focus:outline-none focus:ring-4 focus:ring-[#6C3BFF]/12";
  const field =
    "h-14 w-full rounded-2xl border border-[#E6E3F0] bg-white pl-12 pr-4 text-base text-[#1C1C28] placeholder:text-[#9A97AA] transition duration-200 focus:border-[#B9A3FF] focus:outline-none focus:ring-4 focus:ring-[#6C3BFF]/12";
  const labelCls = "mb-1.5 block text-base font-bold text-[#1C1C28]";
  const helpCls = "mb-2 text-sm text-[#6E6A7C]";
  const iconCls =
    "pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8B87A0] transition-colors duration-200 group-focus-within:text-[#6C3BFF]";
  const req = <span className="text-[#FF4FA3]" aria-hidden="true"> *</span>;

  const deliveryOptions: { mode: DeliveryMode; icon: ReactNode; title: string; text: string }[] = [
    {
      mode: "pickup",
      icon: <Store className="h-6 w-6" aria-hidden="true" />,
      title: t({ lv: "Saņemšana klātienē", ru: "Самовывоз", en: "Pick-up in person" }),
      text: t({ lv: "Stabu iela 90, Rīga", ru: "ул. Стабу 90, Рига", en: "Stabu iela 90, Riga" }),
    },
    {
      mode: "address",
      icon: <Truck className="h-6 w-6" aria-hidden="true" />,
      title: t({ lv: "Piegāde uz adresi", ru: "Доставка по адресу", en: "Delivery to an address" }),
      text: t({ lv: "Izmaksas atkarīgas no atrašanās vietas", ru: "Стоимость зависит от местоположения", en: "Cost depends on location" }),
    },
    ...(!isMascot
      ? [
          {
            mode: "omniva" as DeliveryMode,
            icon: <Package className="h-6 w-6" aria-hidden="true" />,
            title: t({ lv: "Pakomāts", ru: "Пакомат", en: "Parcel locker" }),
            text: t({ lv: "Omniva vai DPD pakomātā", ru: "В пакомат Omniva или DPD", en: "To an Omniva or DPD locker" }),
          },
        ]
      : []),
  ];

  const gallery = [image || "/kostimi/no-image.jpg", ...extraImages];
  const shown = gallery[Math.min(photo, gallery.length - 1)];
  const cut = photo === 0 ? cutoutFor(image) : null;

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-[#FBF9FF] via-[#F6F1FF] to-[#FFF4FA] px-4 pb-20 pt-10 lg:px-8 lg:pb-28 lg:pt-14">
      {/* Dekorācijas */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-[#DCCFFF]/50 blur-3xl" />
        <div className="absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-[#FFC4E1]/50 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-[#BFE8FD]/40 blur-3xl" />
        <span className="hc-drift absolute left-[9%] top-24 h-5 w-2 rotate-[24deg] rounded-sm bg-[#FFD54F]" />
        <span className="hc-drift2 absolute left-[5%] top-56 h-2 w-2 rounded-full bg-[#FF4FA3]" />
        <span className="hc-drift absolute left-[14%] top-[34rem] h-2 w-2 rounded-full bg-[#6C3BFF]" />
        <span className="hc-drift2 absolute right-[10%] top-20 h-5 w-2 -rotate-[30deg] rounded-sm bg-[#7DD3FC]" />
        <span className="hc-drift absolute right-[6%] top-72 h-2 w-2 rounded-full bg-[#FFD54F]" />
        <span className="hc-drift2 absolute right-[13%] top-[36rem] h-4 w-2 rotate-12 rounded-sm bg-[#FF4FA3]" />
        <svg className="hc-drift absolute left-[7%] top-[18rem] hidden lg:block" width="64" height="70" viewBox="0 0 64 70" fill="none">
          <path d="M8 6c18 2 26 14 18 26S20 56 44 64" stroke="#FFD54F" strokeWidth="7" strokeLinecap="round" />
        </svg>
        <svg className="hc-drift2 absolute right-[6%] top-[30rem] hidden lg:block" width="64" height="70" viewBox="0 0 64 70" fill="none">
          <path d="M56 6C38 8 30 20 38 32s6 24-18 32" stroke="#FFD54F" strokeWidth="7" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1360px]">
        {/* Virsraksts */}
        <div className="text-center">
          <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#14123A] lg:text-[64px]">
            {t({ lv: "Rezervācijas", ru: "Заявка на", en: "Booking" })}{" "}
            <span className="bg-gradient-to-r from-[#6C3BFF] to-[#FF4FA3] bg-clip-text text-transparent">
              {t({ lv: "pieteikums", ru: "бронирование", en: "request" })}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#4B4860] lg:mt-5 lg:text-lg lg:leading-8">
            {t({ lv: "Aizpildi formu un mēs ar Tevi sazināsimies, lai apstiprinātu rezervāciju un vienotos par visām detaļām.", ru: "Заполните форму, и мы свяжемся с вами, чтобы подтвердить бронирование и обсудить все детали.", en: "Fill in the form and we'll get in touch to confirm the booking and agree on all the details." })}
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-8">
          {/* Kostīms */}
          <section
            aria-label={t({ lv: "Izvēlētais kostīms", ru: "Выбранный костюм", en: "Selected costume" })}
            className="self-start rounded-[32px] bg-white p-5 shadow-[0_24px_60px_rgba(108,59,255,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(108,59,255,0.12)] lg:sticky lg:top-32 lg:p-6"
          >
            <div className="relative h-[360px] overflow-hidden rounded-[24px] bg-gradient-to-b from-[#FBF8FF] to-white sm:h-[440px]">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#E6DCFF] via-[#FFD6EA] to-[#FFE9F4] sm:h-[370px] sm:w-[370px]"
              />
              <div className="absolute inset-x-6 bottom-4 top-6">
                <Image
                  key={shown}
                  src={cut || shown}
                  alt={displayName || t({ lv: "Kostīms", ru: "Костюм", en: "Costume" })}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className={`object-contain ${cut ? "drop-shadow-[0_20px_24px_rgba(20,18,58,0.18)]" : "rounded-2xl bg-white p-2"}`}
                />
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setPhoto(i)}
                    aria-label={`${t({ lv: "Rādīt bildi", ru: "Показать фото", en: "Show photo" })} ${i + 1}`}
                    aria-current={i === photo ? "true" : undefined}
                    className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                      i === photo ? "border-[#6C3BFF]" : "border-[#ECEAF3] hover:border-[#B9A3FF]"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-5 rounded-[24px] bg-[#FBFAFF] p-5 shadow-[0_10px_30px_rgba(23,23,23,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-[#1C1C28] lg:text-[32px]">
                  {displayName || t({ lv: "Izvēlētais kostīms", ru: "Выбранный костюм", en: "Selected costume" })}
                </h2>
                {price && (
                  <p className="rounded-full bg-gradient-to-r from-[#FF4FA3] to-[#FF7AC2] px-4 py-2 text-xl font-extrabold text-white shadow-[0_10px_24px_rgba(255,79,163,0.28)]">
                    {tDetail(price)}
                  </p>
                )}
              </div>
              {size && (
                <p className="mt-4 flex items-center gap-2 text-base text-[#4B4860]">
                  <Ruler className="h-5 w-5 text-[#6C3BFF]" aria-hidden="true" />
                  <strong className="font-bold text-[#1C1C28]">{t({ lv: "Izmērs", ru: "Размер", en: "Size" })}:</strong>
                  {tDetail(size)}
                </p>
              )}
            </div>
          </section>

          {/* Forma */}
          <section className="rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(108,59,255,0.08)] sm:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="r-name" className={labelCls}>
                  {t({ lv: "Vārds", ru: "Имя", en: "Name" })}
                  {req}
                </label>
                <div className="group relative">
                  <User className={iconCls} aria-hidden="true" />
                  <input
                    id="r-name"
                    type="text"
                    autoComplete="name"
                    placeholder={t({ lv: "Piemēram: Anna", ru: "Например: Анна", en: "E.g. Anna" })}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={field}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="r-phone" className={labelCls}>
                  {t({ lv: "Telefona numurs", ru: "Номер телефона", en: "Phone number" })}
                  {req}
                </label>
                <p className={helpCls}>
                  {t({ lv: "Lai varam ar Tevi sazināties par rezervāciju.", ru: "Чтобы мы могли связаться с вами по поводу бронирования.", en: "So we can reach you about the booking." })}
                </p>
                <div className="group relative">
                  <Phone className={iconCls} aria-hidden="true" />
                  <input
                    id="r-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+371 20000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className={field}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <span className={labelCls}>
                    {t({ lv: "Pasākuma datums", ru: "Дата мероприятия", en: "Event date" })}
                    {req}
                  </span>
                  <p className={helpCls}>
                    {t({ lv: "Kad kostīmu izmantosiet.", ru: "Когда будете использовать костюм.", en: "When you'll wear the costume." })}
                  </p>
                  <DateInput
                    value={eventDate}
                    onChange={(value) => {
                      setEventDate(value);
                      if (pickupDate && pickupDate > value) setPickupDate("");
                    }}
                    required
                    ariaLabel={t({ lv: "Pasākuma datums", ru: "Дата мероприятия", en: "Event date" })}
                    className={dateCls}
                  />
                </div>
                <div>
                  <span className={labelCls}>
                    {t({ lv: "Saņemšanas datums", ru: "Дата получения", en: "Pick-up date" })}
                    {req}
                  </span>
                  <p className={helpCls}>
                    {t({ lv: "Kad vēlies kostīmu saņemt.", ru: "Когда хотите получить костюм.", en: "When you'd like to collect it." })}
                  </p>
                  <DateInput
                    value={pickupDate}
                    onChange={setPickupDate}
                    max={eventDate || undefined}
                    required
                    ariaLabel={t({ lv: "Saņemšanas datums", ru: "Дата получения", en: "Pick-up date" })}
                    className={dateCls}
                  />
                </div>
              </div>

              <fieldset>
                <legend className={labelCls}>
                  {t({ lv: "Saņemšanas veids", ru: "Способ получения", en: "Delivery method" })}
                  {req}
                </legend>
                <div className="mt-2 grid gap-3 sm:grid-cols-2">
                  {deliveryOptions.map((option, i) => {
                    const on = delivery === option.mode;
                    return (
                      <label
                        key={option.mode}
                        className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition duration-200 hover:-translate-y-0.5 ${
                          deliveryOptions.length === 3 && i === 2 ? "sm:col-span-2" : ""
                        } ${
                          on
                            ? "border-[#6C3BFF] bg-[#F4F0FF] shadow-[0_12px_28px_rgba(108,59,255,0.14)]"
                            : "border-[#ECEAF3] bg-white hover:border-[#CFC2FF]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="delivery"
                          checked={on}
                          onChange={() => setDelivery(option.mode)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition ${
                            on ? "bg-gradient-to-br from-[#6C3BFF] to-[#FF4FA3] text-white" : "bg-[#F6F4FB] text-[#6C3BFF]"
                          }`}
                        >
                          {option.icon}
                        </span>
                        <span>
                          <span className="block font-bold text-[#1C1C28]">{option.title}</span>
                          <span className="block text-sm text-[#6E6A7C]">{option.text}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {(delivery === "address" || (delivery === "omniva" && !isMascot)) && (
                <div className="hc-fade-in">
                  <label htmlFor="r-address" className={labelCls}>
                    {delivery === "address"
                      ? t({ lv: "Vēlamā piegādes adrese", ru: "Желаемый адрес доставки", en: "Preferred delivery address" })
                      : t({ lv: "Pakomāts", ru: "Пакомат", en: "Parcel locker" })}
                    {req}
                  </label>
                  <p className={helpCls}>
                    {delivery === "address"
                      ? t({ lv: "Adresi pēc rezervācijas precizēsim kopā ar Tevi.", ru: "Адрес уточним вместе с вами после бронирования.", en: "We'll confirm the address with you after booking." })
                      : t({ lv: "Norādi tuvāko vai vēlamo pakomātu.", ru: "Укажите ближайший или желаемый пакомат.", en: "Enter the nearest or preferred parcel locker." })}
                  </p>
                  <div className="group relative">
                    <MapPin className={iconCls} aria-hidden="true" />
                    <input
                      id="r-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder={
                        delivery === "address"
                          ? t({ lv: "Piemēram: Brīvības iela 120, Rīga", ru: "Например: ул. Бривибас 120, Рига", en: "E.g. Brīvības iela 120, Riga" })
                          : t({ lv: "Piemēram: Omniva TC Alfa", ru: "Например: Omniva ТЦ Alfa", en: "E.g. Omniva TC Alfa" })
                      }
                      required
                      className={field}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="r-notes" className={labelCls}>
                  {t({ lv: "Piezīmes", ru: "Примечания", en: "Notes" })}
                </label>
                <div className="group relative">
                  <MessageCircle className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-[#8B87A0] transition-colors group-focus-within:text-[#6C3BFF]" aria-hidden="true" />
                  <textarea
                    id="r-notes"
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t({
                      lv: "Piemēram: vai kostīmu būs iespējams paturēt ilgāk?",
                      ru: "Например: можно ли оставить костюм подольше?",
                      en: "E.g. could we keep the costume a bit longer?",
                    })}
                    className="w-full rounded-2xl border border-[#E6E3F0] bg-white py-3.5 pl-12 pr-4 text-base text-[#1C1C28] placeholder:text-[#9A97AA] transition duration-200 focus:border-[#B9A3FF] focus:outline-none focus:ring-4 focus:ring-[#6C3BFF]/12"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="hc-cta group flex h-[60px] w-full items-center justify-center gap-3 rounded-[18px] text-lg font-extrabold text-white shadow-[0_14px_30px_rgba(108,59,255,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,79,163,0.35)] disabled:opacity-60"
              >
                {loading
                  ? t({ lv: "Nosūta...", ru: "Отправка...", en: "Sending..." })
                  : t({ lv: "Nosūtīt rezervācijas pieteikumu", ru: "Отправить заявку", en: "Send booking request" })}
                {!loading && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
              </button>

              {error && (
                <p role="alert" className="rounded-2xl bg-red-50 p-4 font-semibold text-red-600">
                  {error}
                </p>
              )}

              <p className="flex items-center justify-center gap-2 text-center text-sm text-[#6E6A7C]">
                <Lock className="h-4 w-4 shrink-0 text-[#6C3BFF]" aria-hidden="true" />
                {t({ lv: "Tavi dati tiks izmantoti tikai rezervācijas apstiprināšanai.", ru: "Ваши данные будут использованы только для подтверждения бронирования.", en: "Your details are used only to confirm the booking." })}
              </p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
export default function ReservationPage() {
  const t = useTr();
  return (
    <Suspense
      fallback={
        <div className="p-10 text-center">{t({ lv: "Ielādē...", ru: "Загрузка...", en: "Loading..." })}</div>
      }
    >
      <ReservationContent />
    </Suspense>
  );
}