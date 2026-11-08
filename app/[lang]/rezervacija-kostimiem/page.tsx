"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import ReservationSuccess from "@/components/reservation/ReservationSuccess";
import DateInput from "@/components/common/DateInput";
import CostumeGallery from "@/components/costumes/CostumeGallery";
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
      <main className="bg-pink-50 px-6 py-24">
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

  return (
    <main className="bg-pink-50 py-24">
      <div className="mx-auto max-w-6xl rounded-[40px] bg-white p-10 shadow-xl">
        <h1 className="text-center text-5xl font-black text-gray-900">
          {t({ lv: "Rezervācijas pieteikums", ru: "Заявка на бронирование", en: "Booking request" })}
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-8 text-gray-600">
          {t({ lv: "Aizpildi formu un mēs ar Jums sazināsimies, lai apstiprinātu rezervāciju un vienotos par detaļām.", ru: "Заполните форму, и мы свяжемся с вами, чтобы подтвердить бронирование и обсудить детали.", en: "Fill in the form and we'll get in touch to confirm the booking and agree on the details." })}
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Kreisā puse */}
          <div>
            <CostumeGallery
              images={[image || "/kostimi/no-image.jpg", ...extraImages]}
              alt={displayName || t({ lv: "Kostīms", ru: "Костюм", en: "Costume" })}
            />

            <div className="mt-6 rounded-3xl bg-pink-50 p-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {displayName || t({ lv: "Izvēlētais kostīms", ru: "Выбранный костюм", en: "Selected costume" })}
              </h2>

              <div className="mt-4 space-y-2 text-lg text-gray-700">
                <p>
                  <strong>{t({ lv: "Cena", ru: "Цена", en: "Price" })}:</strong> {tDetail(price) || "—"}
                </p>
                <p>
                  <strong>{t({ lv: "Izmērs", ru: "Размер", en: "Size" })}:</strong> {tDetail(size) || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Labā puse */}
          <div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  {t({ lv: "Vārds", ru: "Имя", en: "Name" })}
                </label>
                <input
                  type="text"
                  placeholder={t({ lv: "Piemēram: Anna", ru: "Например: Анна", en: "E.g. Anna" })}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  {t({ lv: "Telefona numurs", ru: "Номер телефона", en: "Phone number" })}
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  {t({ lv: "Norādi telefona numuru, lai varam sazināties.", ru: "Укажите номер телефона, чтобы мы могли связаться с вами.", en: "Enter your phone number so we can reach you." })}
                </p>
                <input
                  type="tel"
                  placeholder={t({ lv: "Piemēram: +371 20000000", ru: "Например: +371 20000000", en: "E.g. +371 20000000" })}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  {t({ lv: "Pasākuma datums", ru: "Дата мероприятия", en: "Event date" })}
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  {t({ lv: "Datums, kad kostīmu izmantosiet.", ru: "Дата, когда вы будете использовать костюм.", en: "The date you'll be wearing the costume." })}
                </p>
                <DateInput
                  value={eventDate}
                  onChange={(value) => {
                    setEventDate(value);
                    if (pickupDate && pickupDate > value) setPickupDate("");
                  }}
                  required
                  ariaLabel={t({ lv: "Pasākuma datums", ru: "Дата мероприятия", en: "Event date" })}
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  {t({ lv: "Saņemšanas datums", ru: "Дата получения", en: "Pick-up date" })}
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  {t({ lv: "Datums, kad kostīmu vēlaties saņemt.", ru: "Дата, когда вы хотите получить костюм.", en: "The date you'd like to collect the costume." })}
                </p>
                <DateInput
                  value={pickupDate}
                  onChange={setPickupDate}
                  max={eventDate || undefined}
                  required
                  ariaLabel={t({ lv: "Saņemšanas datums", ru: "Дата получения", en: "Pick-up date" })}
                  className="w-full rounded-xl border border-gray-300 bg-white p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-3 block font-semibold text-gray-900">
                  {t({ lv: "Saņemšanas veids", ru: "Способ получения", en: "Delivery method" })}
                </label>
                <p className="mb-4 text-sm text-gray-500">
                  {t({ lv: "Izvēlies, kā vēlies saņemt kostīmu. Piegādes adrese tiek precizēta pēc rezervācijas apstiprināšanas.", ru: "Выберите, как хотите получить костюм. Адрес доставки уточняется после подтверждения бронирования.", en: "Choose how you'd like to receive the costume. The delivery address is confirmed after the booking is approved." })}
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "pickup"}
                      onChange={() => setDelivery("pickup")}
                    />
                    <span>{t({ lv: "Saņemšana klātienē (Stabu iela 90, Rīga)", ru: "Самовывоз (ул. Стабу 90, Рига)", en: "Pick-up in person (Stabu iela 90, Riga)" })}</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "address"}
                      onChange={() => setDelivery("address")}
                    />
                    <span>{t({ lv: "Piegāde uz adresi (Izmaksas atkarīgas no atrašanās vietas)", ru: "Доставка по адресу (стоимость зависит от местоположения)", en: "Delivery to an address (cost depends on location)" })}</span>
                  </label>

                  {!isMascot && (
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4 sm:col-span-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={delivery === "omniva"}
                        onChange={() => setDelivery("omniva")}
                      />
                      <span>{t({ lv: "Pakomāts", ru: "Пакомат", en: "Parcel locker" })}</span>
                    </label>
                  )}
                </div>
              </div>

              {delivery === "address" && (
                <div>
                  <label className="mb-2 block font-semibold text-gray-900">
                    {t({ lv: "Vēlamā piegādes adrese", ru: "Желаемый адрес доставки", en: "Preferred delivery address" })}
                  </label>
                  <p className="mb-2 text-sm text-gray-500">
                    {t({ lv: "Norādi adresi, un mēs to pēc rezervācijas precizēsim ar Jums.", ru: "Укажите адрес, и мы уточним его с вами после бронирования.", en: "Enter the address and we'll confirm it with you after booking." })}
                  </p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t({ lv: "Piemēram: Brīvības iela 120, Rīga", ru: "Например: ул. Бривибас 120, Рига", en: "E.g. Brīvības iela 120, Riga" })}
                    required
                    className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              )}

              {delivery === "omniva" && !isMascot && (
                <div>
                  <label className="mb-2 block font-semibold text-gray-900">
                  {t({ lv: "Pakomāts", ru: "Пакомат", en: "Parcel locker" })}
                  </label>
                  <p className="mb-2 text-sm text-gray-500">
                    {t({ lv: "Norādi tuvāko vai vēlamo pakomātu.", ru: "Укажите ближайший или желаемый пакомат.", en: "Enter the nearest or preferred parcel locker." })}
                  </p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t({
                      lv: "Piemēram: Omniva TC Alfa vai DPD Rimi Āgenskalns",
                      ru: "Например: Omniva ТЦ Alfa или DPD Rimi Agenskalns",
                      en: "E.g. Omniva TC Alfa or DPD Rimi Āgenskalns",
                    })}
                    required
                    className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  {t({ lv: "Papildus informācija", ru: "Дополнительная информация", en: "Additional information" })}
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  {t({ lv: "Šeit vari ierakstīt īpašas vēlmes, komentārus vai jautājumus.", ru: "Здесь можно написать особые пожелания, комментарии или вопросы.", en: "Add any special requests, comments or questions here." })}
                </p>
                <textarea
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t({
                    lv: "Piemēram: vai kostīms būs pieejams šajā datumā?",
                    ru: "Например: будет ли костюм свободен в эту дату?",
                    en: "E.g. will the costume be available on this date?",
                  })}
                  className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-500 to-pink-400 py-4 text-lg font-bold text-white transition hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
              >
                {loading
                  ? t({ lv: "Nosūta...", ru: "Отправка...", en: "Sending..." })
                  : t({ lv: "Apstiprināt rezervāciju", ru: "Подтвердить бронирование", en: "Confirm booking" })}
              </button>

              {error && (
                <p className="rounded-xl bg-red-50 p-4 font-semibold text-red-600">
                  {error}
                </p>
              )}
            </form>

            <div className="mt-8 rounded-2xl bg-pink-50 p-5 text-sm leading-7 text-gray-600">
              <strong>{t({ lv: "Svarīgi!", ru: "Важно!", en: "Please note!" })}</strong>
              <br />
              {t({ lv: "Pēc rezervācijas nosūtīšanas mēs sazināsimies ar Jums, lai apstiprinātu kostīma pieejamību izvēlētajos datumos un precizētu saņemšanas veidu.", ru: "После отправки бронирования мы свяжемся с вами, чтобы подтвердить, что костюм свободен в выбранные даты, и уточнить способ получения.", en: "After you send the booking we'll contact you to confirm the costume is available on your dates and agree on how you'll receive it." })}
            </div>
          </div>
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