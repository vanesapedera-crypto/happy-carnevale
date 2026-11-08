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
import { breadcrumbData } from "@/lib/structuredData";
import JsonLd from "@/components/seo/JsonLd";
import { languageAlternates, lp, LANG_LOCALE, tr, type Lang, type Tr } from "@/lib/i18n";
import CostumeGallery from "@/components/costumes/CostumeGallery";
import { localizeCostume } from "@/lib/costumes";

const PRICE_LABEL: Tr = { lv: "Nomas cena", ru: "Цена аренды", en: "Rental price" };
const SIZE_LABEL: Tr = { lv: "Izmērs", ru: "Размер", en: "Size" };

const TX = {
  lv: {
    home: "Sākums",
    rental: "Kostīmu noma",
    breadcrumb: "Ceļš",
    step1: "Rezervē",
    step1Text: "Aizpildi rezervācijas formu ar pasākuma un saņemšanas datumu.",
    step2: "Apstiprinām",
    step2Text: "Sazināmies, lai apstiprinātu kostīma pieejamību izvēlētajos datumos.",
    step3: "Saņem",
    step3Text: "Klātienē Stabu ielā 90, Rīgā.",
    step3Locker: "Klātienē Stabu ielā 90, Rīgā, vai pakomātā.",
    reserve: "Rezervēt →",
    orCall: "vai zvani",
    others: "Citi kostīmi",
    all: "Visi",
  },
  ru: {
    home: "Главная",
    rental: "Аренда костюмов",
    breadcrumb: "Навигация",
    step1: "Бронируйте",
    step1Text: "Заполните форму бронирования с датой мероприятия и датой получения.",
    step2: "Подтверждаем",
    step2Text: "Мы свяжемся с вами, чтобы подтвердить, что костюм свободен в выбранные даты.",
    step3: "Получайте",
    step3Text: "Самовывоз: ул. Стабу 90, Рига.",
    step3Locker: "Самовывоз: ул. Стабу 90, Рига, или в пакомат.",
    reserve: "Забронировать →",
    orCall: "или позвоните",
    others: "Другие костюмы",
    all: "Все",
  },
  en: {
    home: "Home",
    rental: "Costume rental",
    breadcrumb: "Breadcrumb",
    step1: "Book",
    step1Text: "Fill in the booking form with your event date and pick-up date.",
    step2: "We confirm",
    step2Text: "We get in touch to confirm the costume is available on your dates.",
    step3: "Collect",
    step3Text: "In person at Stabu iela 90, Riga.",
    step3Locker: "In person at Stabu iela 90, Riga, or via parcel locker.",
    reserve: "Book now →",
    orCall: "or call",
    others: "More costumes",
    all: "All",
  },
};

/** Nosaukums un apraksts Google rezultātiem. */
export async function costumeMetadata(
  categoryPath: string,
  slug: string,
  lang: Lang = "lv"
): Promise<Metadata> {
  const category = getCategory(categoryPath);
  const found = await findCostume(categoryPath, slug);
  if (!category || !found) return {};
  const costume = localizeCostume(found, lang);

  const noun = tr(lang, category.noun);
  const details = [
    costume.price && `${tr(lang, PRICE_LABEL)} ${costume.price}`,
    costume.size && `${tr(lang, SIZE_LABEL).toLowerCase()} ${costume.size}`,
  ]
    .filter(Boolean)
    .join(", ");

  const title = `${costume.title} – ${noun} | Happy Carnevale`;
  const description = `${costume.title} – ${noun} ${tr(lang, {
    lv: "Rīgā un visā Latvijā.",
    ru: "в Риге и по всей Латвии.",
    en: "in Riga and all over Latvia.",
  })} ${details ? `${details}. ` : ""}${tr(lang, {
    lv: "Rezervē tiešsaistē.",
    ru: "Бронируйте онлайн.",
    en: "Book online.",
  })}`;

  return {
    metadataBase: new URL(SITE.url),
    title,
    description,
    alternates: languageAlternates(lang, costume.href),
    // Daloties ar kostīma saiti, rāda šī kostīma bildi
    openGraph: {
      title,
      description,
      siteName: SITE.name,
      locale: LANG_LOCALE[lang],
      url: lp(lang, costume.href),
      type: "website",
      images: [
        {
          url: costume.image,
          alt: `${costume.title} – ${noun}`,
        },
      ],
    },
  };
}

export default async function CostumeDetail({
  categoryPath,
  slug,
  lang = "lv",
}: {
  categoryPath: string;
  slug: string;
  lang?: Lang;
}) {
  const category = getCategory(categoryPath);
  const found = await findCostume(categoryPath, slug);
  if (!category || !found) notFound();
  const costume = localizeCostume(found, lang);

  // Četri nākamie kostīmi no tās pašas kategorijas
  const all = await loadCategoryCostumes(categoryPath);
  const index = all.findIndex((item) => item.slug === costume.slug);
  const others = [...all.slice(index + 1), ...all.slice(0, index)]
    .slice(0, 4)
    .map((item) => localizeCostume(item, lang));

  const name = tr(lang, category.name);
  const noun = tr(lang, category.noun);
  const categoryHref = lp(lang, `/kostimu-noma/${category.path}`);
  const t = TX[lang];

  const steps = [
    { title: t.step1, text: t.step1Text },
    { title: t.step2, text: t.step2Text },
    { title: t.step3, text: category.parcelLocker ? t.step3Locker : t.step3Text },
  ];

  return (
    <main className="bg-[#fff7fb] pb-20 pt-8">
      <JsonLd
        data={breadcrumbData(
          [
            { name: t.home, path: "/" },
            { name: t.rental, path: "/kostimu-noma" },
            { name, path: `/kostimu-noma/${category.path}` },
            { name: costume.title, path: costume.href },
          ],
          lang
        )}
      />
      <div className="mx-auto max-w-7xl px-5 lg:px-6">
        {/* Ceļš līdz lapai */}
        <nav aria-label={t.breadcrumb} className="mb-6 text-sm text-gray-500">
          <Link href={lp(lang, "/")} className="text-pink-600 hover:underline">
            {t.home}
          </Link>
          {" › "}
          <Link href={lp(lang, "/kostimu-noma")} className="text-pink-600 hover:underline">
            {t.rental}
          </Link>
          {" › "}
          <Link href={categoryHref} className="text-pink-600 hover:underline">
            {name}
          </Link>
          {" › "}
          <span>{costume.title}</span>
        </nav>

        {/* Kostīms */}
        <div className="grid gap-8 rounded-[36px] bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.07)] lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-10">
          <CostumeGallery
            images={[costume.image, ...(costume.images ?? [])]}
            alt={`${costume.title} – ${noun}`}
            priority
          />

          <div className="flex flex-col">
            <span className="inline-flex w-fit rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-pink-600">
              {name}
            </span>

            <h1 className="mt-5 text-3xl font-black leading-tight text-gray-900 lg:text-5xl">
              {costume.title}
              <span className="sr-only"> – </span>
              <span className="mt-2 block text-xl font-bold text-gray-500 lg:text-2xl">
                {noun}
              </span>
            </h1>

            <div className="mt-6 h-1 w-20 rounded-full bg-pink-500" />

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {costume.price && (
                <div className="rounded-2xl bg-pink-50 p-4">
                  <dt className="text-sm text-gray-500">{tr(lang, PRICE_LABEL)}</dt>
                  <dd className="text-2xl font-bold text-pink-600">
                    {costume.price}
                  </dd>
                </div>
              )}

              {costume.size && (
                <div className="rounded-2xl bg-pink-50 p-4">
                  <dt className="text-sm text-gray-500">{tr(lang, SIZE_LABEL)}</dt>
                  <dd className="text-lg font-bold text-gray-900">
                    {costume.size}
                  </dd>
                </div>
              )}
            </dl>

            <p className="mt-6 text-base leading-7 text-gray-600 lg:text-lg">
              {costume.description || tr(lang, category.intro)}
            </p>

            <Link
              href={lp(lang, reservationHref(found, costume.title))}
              className="mt-8 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-400 py-4 text-lg font-bold text-white shadow-md transition hover:scale-[1.02] hover:shadow-xl"
            >
              {t.reserve}
            </Link>

            <a
              href={SITE.phoneHref}
              className="mt-4 text-center text-sm font-semibold text-pink-600 hover:underline"
            >
              {t.orCall} {SITE.phone}
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
              {t.others}: {name.toLowerCase()}
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={lp(lang, item.href)}
                  className="group overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[3/4] bg-white">
                    <Image
                      src={item.image}
                      alt={`${item.title} – ${noun}`}
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
              href={categoryHref}
              className="mt-8 inline-flex rounded-full border-2 border-pink-200 px-6 py-3 font-bold text-pink-600 transition hover:bg-pink-50"
            >
              ← {t.all}: {name.toLowerCase()}
            </Link>
          </section>
        )}
      </div>
    </main>
  );
}
