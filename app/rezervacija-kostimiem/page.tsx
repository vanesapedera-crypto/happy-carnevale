"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useState, type FormEvent } from "react";

type DeliveryMode = "pickup" | "address" | "omniva";

function ReservationContent() {
  const searchParams = useSearchParams();

  const costume = searchParams.get("kostims");
  const image = searchParams.get("image");
  const price = searchParams.get("price");
  const size = searchParams.get("size");

  const isMascot = (image || "").includes("/kostimi/mascotas/");

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

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
      }),
    });

    setLoading(false);

    if (response.ok) {
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
      alert("Kļūda! Rezervāciju neizdevās nosūtīt.");
    }
  }

  const deliveryTitle =
    delivery === "omniva"
      ? "Omniva pakomāts"
      : delivery === "address"
        ? "Vēlamā piegādes adrese"
        : "Saņemšana klātienē";

  return (
    <main className="bg-pink-50 py-24">
      <div className="mx-auto max-w-6xl rounded-[40px] bg-white p-10 shadow-xl">
        <h1 className="text-center text-5xl font-black text-gray-900">
          Rezervācijas pieteikums
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-center text-lg leading-8 text-gray-600">
          Aizpildi formu, un mēs ar Jums sazināsimies, lai apstiprinātu
          rezervāciju un vienotos par detaļām.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Kreisā puse */}
          <div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-pink-100">
              <Image
                src={image || "/kostimi/no-image.jpg"}
                alt={costume || "Kostīms"}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-6 rounded-3xl bg-pink-50 p-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {costume || "Izvēlētais kostīms"}
              </h2>

              <div className="mt-4 space-y-2 text-lg text-gray-700">
                <p>
                  <strong>Cena:</strong> {price || "—"}
                </p>
                <p>
                  <strong>Izmērs:</strong> {size || "—"}
                </p>
              </div>
            </div>
          </div>

          {/* Labā puse */}
          <div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  Vārds
                </label>
                <input
                  type="text"
                  placeholder="Piemēram: Anna"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  Telefona numurs
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  Norādi telefona numuru, lai varam sazināties.
                </p>
                <input
                  type="tel"
                  placeholder="Piemēram: +371 20000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  Pasākuma datums
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  Datums, kad kostīmu izmantosiet.
                </p>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  Saņemšanas datums
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  Datums, kad kostīmu vēlaties saņemt.
                </p>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-3 block font-semibold text-gray-900">
                  Saņemšanas veids
                </label>
                <p className="mb-4 text-sm text-gray-500">
                  Izvēlies, kā vēlies saņemt kostīmu. Piegādes adrese tiek
                  precizēta pēc rezervācijas apstiprināšanas.
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "pickup"}
                      onChange={() => setDelivery("pickup")}
                    />
                    <span>Saņemšana klātienē (Stabu iela 90, Rīga)</span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4">
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === "address"}
                      onChange={() => setDelivery("address")}
                    />
                    <span>Piegāde uz adresi (Izmaksas atkarīgas no atrašanās vietas)</span>
                  </label>

                  {!isMascot && (
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-300 p-4 sm:col-span-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={delivery === "omniva"}
                        onChange={() => setDelivery("omniva")}
                      />
                      <span> Pakomāts</span>
                    </label>
                  )}
                </div>
              </div>

              {delivery === "address" && (
                <div>
                  <label className="mb-2 block font-semibold text-gray-900">
                    Vēlamā piegādes adrese
                  </label>
                  <p className="mb-2 text-sm text-gray-500">
                    Norādi adresi, un mēs to pēc rezervācijas precizēsim ar
                    Jums.
                  </p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Piemēram: Brīvības iela 120, Rīga"
                    required
                    className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              )}

              {delivery === "omniva" && !isMascot && (
                <div>
                  <label className="mb-2 block font-semibold text-gray-900">
                  Pakomāts
                  </label>
                  <p className="mb-2 text-sm text-gray-500">
                    Norādi tuvāko vai vēlamo  pakomātu.
                  </p>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Piemēram: TC Alfa Omniva"
                    required
                    className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block font-semibold text-gray-900">
                  Papildus informācija
                </label>
                <p className="mb-2 text-sm text-gray-500">
                  Šeit vari ierakstīt īpašas vēlmes, komentārus vai jautājumus.
                </p>
                <textarea
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Piemēram: vai kostīms būs pieejams šajā datumā?"
                  className="w-full rounded-xl border border-gray-300 p-4 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-500 to-pink-400 py-4 text-lg font-bold text-white transition hover:scale-[1.02] hover:shadow-xl disabled:opacity-50"
              >
                {loading ? "Nosūta..." : "Apstiprināt rezervāciju"}
              </button>

              {success && (
                <p className="rounded-xl bg-green-50 p-4 text-green-700">
                  Rezervācija nosūtīta veiksmīgi.
                </p>
              )}
            </form>

            <div className="mt-8 rounded-2xl bg-pink-50 p-5 text-sm leading-7 text-gray-600">
              <strong>Svarīgi!</strong>
              <br />
              Pēc rezervācijas nosūtīšanas mēs sazināsimies ar Jums, lai
              apstiprinātu kostīma pieejamību izvēlētajos datumos un precizētu saņemšanas veidu.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Ielādē...</div>}>
      <ReservationContent />
    </Suspense>
  );
}