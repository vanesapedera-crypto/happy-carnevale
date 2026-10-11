import Image from "next/image";
import Link from "next/link";
import { WORKSHOP_GALLERY_KEY } from "@/lib/admin/sections";
import { getSectionItems } from "@/lib/sections";

/** Iebūvētais saraksts: tiek rādīts bez bildēm, ja admin panelī nav nevienas darbnīcas. */
const activities = [
  "Koka vilciņu meistarklase",
  "Dimanta uzlīmju izveide",
  "Atslēgu piekariņu izveide",
  "Auduma nakts maskas",
  "Vēdeklīšu izveide un dekorēšana",
  "Koka spogulīšu darbnīca",
  "Logu stikla krāsaino uzlīmju izveide",
  "Vēja zvaniņu izveide un dekorēšana",
  "Antistresa vīriņi",
];

export default async function RadosasDarbnicasSection() {
  // Darbnīcas (bilde + nosaukums) pārvalda admin panelī.
  const managed = await getSectionItems(WORKSHOP_GALLERY_KEY);
  const workshops = (managed ?? []).filter((item) => item.imageUrl);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-white p-10 shadow-xl">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-black text-gray-900">
              Darbnīcu piedāvājums
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500" />

            <p className="mt-6 text-lg leading-8 text-gray-600">
  Radošās darbnīcas saturs un ilgums tiek pielāgots pasākuma vajadzībām,
  bērnu skaitam, norises vietai un vēlamajam formātam. Pakalpojuma cena
  tiek saskaņota individuāli pēc pasākuma detaļu precizēšanas. Sazinies ar
  mums, un kopā atradīsim piemērotāko risinājumu Tavam pasākumam!
</p>
          </div>

          {workshops.length > 0 ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className="overflow-hidden rounded-[28px] border border-violet-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-white">
                    <Image
                      src={workshop.imageUrl}
                      alt={workshop.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="bg-violet-50 px-6 py-5 text-lg font-semibold text-gray-900">
                    {workshop.title}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {activities.map((item) => (
                <div
                  key={item}
                  className="rounded-[28px] border border-violet-100 bg-violet-50 px-6 py-5 text-lg font-semibold text-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-[32px] bg-gradient-to-r from-violet-500 to-violet-400 p-8 text-white">
            <h3 className="text-2xl font-black">
              Cena tiek saskaņota individuāli
            </h3>

            <p className="mt-4 max-w-3xl leading-8 text-white/95">
              Piedāvājumu veidojam atkarībā no pasākuma vietas, bērnu skaita,
              norises ilguma un izvēlētajām darbnīcām.
            </p>

            <Link
              href="/kontakti"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-violet-600 transition hover:bg-violet-50"
            >
              Sazināties
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}