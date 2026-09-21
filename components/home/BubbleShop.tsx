import Image from "next/image";
import Link from "next/link";

export default function BubbleShop() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="inline-flex rounded-full bg-pink-100 px-5 py-2 text-sm font-semibold text-pink-600">
            🫧 Burbulītes burbuļi
          </span>

          <h2 className="mt-6 text-5xl font-black text-gray-900">
            Burbuļu veikals
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-gray-600">
            Viss nepieciešamais lielajiem ziepju burbuļiem –
            profesionāli šķidrumi, burbuļu komplekti un aksesuāri,
            kas padarīs bērnu svētkus vēl jautrākus.
          </p>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div className="group overflow-hidden rounded-[30px] bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">

            <div className="relative h-72">

              <Image
                src="/shop/3l.jpg"
                alt="3L šķidrums"
                fill
                className="object-cover"
              />

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold">
                3L šķidrums
              </h3>

              <p className="mt-2 text-2xl font-black text-pink-500">
                €5.50
              </p>

              <Link
                href="/veikals"
                className="mt-6 inline-flex w-full justify-center rounded-full bg-pink-500 py-4 font-semibold text-white transition hover:bg-pink-600"
              >
                Apskatīt
              </Link>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}