import Image from "next/image";
import Link from "next/link";
import { WORKSHOP_GALLERY_KEY } from "@/lib/admin/sections";
import { loadGalleryImages } from "@/lib/gallery";

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
  // Attēlus pievieno admin panelī; kamēr to nav, galerija lapā netiek rādīta.
  const images = await loadGalleryImages(WORKSHOP_GALLERY_KEY);

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

          {images.length > 0 && (
            <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {images.map((image, index) => (
                <div
                  key={`${index}-${image}`}
                  className="mb-5 overflow-hidden rounded-3xl bg-gray-100 shadow-lg break-inside-avoid"
                >
                  <Image
                    src={image}
                    alt={`Radošā darbnīca ${index + 1}`}
                    width={900}
                    height={1200}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
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