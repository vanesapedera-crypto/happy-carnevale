import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  findCostume,
  getCategory,
  loadCategoryCostumes,
  reservationHref,
} from "@/lib/costumeCatalog";
import { SITE } from "@/lib/constants";

/** Nosaukums un apraksts Google rezultātiem. */
export async function costumeMetadata(
  categoryPath: string,
  slug: string
): Promise<Metadata> {
  const category = getCategory(categoryPath);
  const costume = await findCostume(categoryPath, slug);
  if (!category || !costume) return {};

  const details = [
    costume.price && `Nomas cena ${costume.price}`,
    costume.size && `izmērs ${costume.size}`,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    title: `${costume.title} – ${category.noun} | Happy Carnevale`,
    description: `${costume.title} – ${category.noun} Rīgā un visā Latvijā. ${
      details ? `${details}. ` : ""
    }Rezervē tiešsaistē.`,
  };
}

export default async function CostumeDetail({
  categoryPath,
  slug,
}: {
  categoryPath: string;
  slug: string;
}) {
  const category = getCategory(categoryPath);
  const costume = await findCostume(categoryPath, slug);
  if (!category || !costume) notFound();

  // Četri nākamie kostīmi no tās pašas kategorijas
  const all = await loadCategoryCostumes(categoryPath);
  const index = all.findIndex((item) => item.slug === costume.slug);
  const others = [...all.slice(index + 1), ...all.slice(0, index)].slice(0, 4);

  const steps = [
    {
      title: "Rezervē",
      text: "Aizpildi rezervācijas formu ar pasākuma un saņemšanas datumu.",
    },
    {
      title: "Apstiprinām",
      text: "Sazināmies, lai apstiprinātu kostīma pieejamību izvēlētajos datumos.",
    },
    {
      title: "Saņem",
      text: category.parcelLocker
        ? "Klātienē Stabu ielā 90, Rīgā, vai pakomātā."
        : "Klātienē Stabu ielā 90, Rīgā.",
    },
  ];

  return (
    <main className="bg-[#fff7fb] pb-20 pt-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-6">
        {/* Ceļš līdz lapai */}
        <nav aria-label="Ceļš" className="mb-6 text-sm text-gray-500">
          <Link href="/" className="text-pink-600 hover:underline">
            Sākums
          </Link>
          {" › "}
          <Link href="/kostimu-noma" className="text-pink-600 hover:underline">
            Kostīmu noma
          </Link>
          {" › "}
          <Link
            href={`/kostimu-noma/${category.path}`}
            className="text-pink-600 hover:underline"
          >
            {category.name}
          </Link>
          {" › "}
          <span>{costume.title}</span>
        </nav>

        {/* Kostīms */}
        <div className="grid gap-8 rounded-[36px] bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.07)] lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-10">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] border border-gray-100 bg-white">
            <Image
              src={costume.image}
              alt={`${costume.title} – ${category.noun}`}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain p-4"
            />
          </div>

          <div className="flex flex-col">
            <span className="inline-flex w-fit rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-pink-600">
              {category.name}
            </span>

            <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900 lg:text-5xl">
              {costume.title}
              <span className="mt-2 block text-xl font-bold text-gray-500 lg:text-2xl">
                {category.noun}
              </span>
            </h1>

            <div className="mt-6 h-1 w-20 rounded-full bg-pink-500" />

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {costume.price && (
                <div className="rounded-2xl bg-pink-50 p-4">
                  <dt className="text-sm text-gray-500">Nomas cena</dt>
                  <dd className="text-2xl font-bold text-pink-600">
                    {costume.price}
                  </dd>
                </div>
              )}

              {costume.size && (
                <div className="rounded-2xl bg-pink-50 p-4">
                  <dt className="text-sm text-gray-500">Izmērs</dt>
                  <dd className="text-lg font-bold text-gray-900">
                    {costume.size}
                  </dd>
                </div>
              )}
            </dl>

            <p className="mt-6 text-base leading-7 text-gray-600 lg:text-lg">
              {costume.description || category.intro}
            </p>

            <Link
              href={reservationHref(costume)}
              className="mt-8 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-400 py-4 text-lg font-bold text-white shadow-md transition hover:scale-[1.02] hover:shadow-xl"
            >
              Rezervēt →
            </Link>

            <a
              href={SITE.phoneHref}
              className="mt-4 text-center text-sm font-semibold text-pink-600 hover:underline"
            >
              vai zvani {SITE.phone}
            </a>
          </div>
        </div>

        {/* Kā notiek noma */}
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-3xl border border-pink-100 bg-white p-5"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 font-bold text-white">
                {i + 1}
              </span>
              <h2 className="mt-3 text-lg font-bold text-gray-900">
                {step.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-500">{step.text}</p>
            </li>
          ))}
        </ol>

        {/* Citi kostīmi */}
        {others.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-black text-gray-900 lg:text-3xl">
              Citi kostīmi: {category.name.toLowerCase()}
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="group overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] bg-white">
                    <Image
                      src={item.image}
                      alt={`${item.title} – ${category.noun}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, 45vw"
                      className="object-contain p-3 transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                    {item.price && (
                      <p className="mt-1 text-sm font-semibold text-pink-600">
                        {item.price}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href={`/kostimu-noma/${category.path}`}
              className="mt-8 inline-flex rounded-full border-2 border-pink-200 px-6 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
            >
              ← Visi: {category.name.toLowerCase()}
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
