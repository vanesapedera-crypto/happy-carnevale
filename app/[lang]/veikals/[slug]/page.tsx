import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Truck, Package, Clock3 } from "lucide-react";
import ProductPurchase from "@/components/shop/ProductPurchase";
import PartyBoxConfigurator from "@/components/shop/PartyBoxConfigurator";
import { productText, products } from "@/lib/products";
import { productJsonLd } from "@/lib/productFeed";
import JsonLd from "@/components/seo/JsonLd";
import { lp, pageMetadata, toLang, tr, type Lang } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ lang: string; slug: string }>;
};

const TX = {
  lv: {
    back: "Atpakaļ uz veikalu",
    noLocker: "Pakomāta piegāde nav pieejama",
    noLockerText:
      "Šī produkta izmēra dēļ to nevar nosūtīt ar pakomātu. Lūdzu, izvēlieties saņemšanu uz vietas (Stabu iela 90, Rīga).",
    important: "Svarīga informācija",
    bottles:
      "Mūsu pudeles netiek piepildītas līdz pašai augšai. Brīvā vieta ir atstāta apzināti, lai pirms lietošanas šķidrumu varētu rūpīgi sakratīt un iegūtu vislabāko ziepju burbuļu kvalitāti.",
    description: "Produkta apraksts",
    delivery: "Piegāde visā Latvijā",
    deliveryText: "Pasūtījumus nosūtam ar jebkuru Jums ērtu pakomātu.",
    packaging: "Drošs iepakojums",
    packagingText: "Katrs pasūtījums tiek rūpīgi iepakots drošai piegādei.",
    fast: "Ātra nosūtīšana",
    fastText: "Pasūtījumi tiek izsūtīti 1–2 darba dienu laikā.",
  },
  ru: {
    back: "Назад в магазин",
    noLocker: "Доставка в пакомат недоступна",
    noLockerText:
      "Из-за размера этот товар нельзя отправить в пакомат. Пожалуйста, выберите самовывоз (ул. Стабу 90, Рига).",
    important: "Важная информация",
    bottles:
      "Наши бутылки заполнены не до самого верха. Свободное место оставлено специально, чтобы перед использованием жидкость можно было хорошо встряхнуть и получить пузыри наилучшего качества.",
    description: "Описание товара",
    delivery: "Доставка по всей Латвии",
    deliveryText: "Отправляем заказы в любой удобный вам пакомат.",
    packaging: "Надёжная упаковка",
    packagingText: "Каждый заказ тщательно упаковывается для безопасной доставки.",
    fast: "Быстрая отправка",
    fastText: "Заказы отправляются в течение 1–2 рабочих дней.",
  },
  en: {
    back: "Back to shop",
    noLocker: "Parcel locker delivery not available",
    noLockerText:
      "Because of its size this product can't be sent by parcel locker. Please choose pick-up in person (Stabu iela 90, Riga).",
    important: "Good to know",
    bottles:
      "Our bottles are not filled to the very top. The space is left on purpose so you can shake the solution well before use and get the best bubble quality.",
    description: "Product description",
    delivery: "Delivery across Latvia",
    deliveryText: "We ship orders to any parcel locker that suits you.",
    packaging: "Safe packaging",
    packagingText: "Every order is carefully packed for safe delivery.",
    fast: "Fast dispatch",
    fastText: "Orders are shipped within 1–2 working days.",
  },
};

const priceText = (price: string, lang: Lang) =>
  price.startsWith("No ")
    ? `${tr(lang, { lv: "No", ru: "От", en: "From" })} ${price.slice(3)}`
    : price;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = toLang(raw);
  const product = products[slug];

  if (!product) return {};

  const text = productText(product, lang);
  const description = (text.description ?? "").replace(/\s+/g, " ").trim();

  return pageMetadata(lang, `/veikals/${slug}`, {
    title: `${text.title} | Happy Carnevale`,
    description:
      description.length > 160 ? `${description.slice(0, 157)}...` : description,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { lang: raw, slug } = await params;
  const lang = toLang(raw);
  const product = products[slug];

  if (!product) notFound();

  const text = productText(product, lang);
  const t = TX[lang];

  const structured = productJsonLd(slug, product, lang);

  return (
    <main className="bg-[#fff7fb] pb-24 pt-12">
      {structured && <JsonLd data={structured} />}
      <div className="mx-auto max-w-7xl px-6">
       <Link
  href={lp(lang, "/veikals")}
  className="mb-8 inline-flex items-center gap-2 text-base font-bold text-pink-500 transition-all hover:gap-3"
>
  <span className="text-xl">←</span>
  <span>{t.back}</span>
</Link>

        <div className="grid gap-16 lg:grid-cols-2">
          <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-xl">
            <Image
              src={product.image}
              alt={text.title}
              width={500}
              height={500}
              className="w-full rounded-3xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-black text-gray-900">
              {text.title}
            </h1>

            <p className="mt-8 text-5xl font-black text-pink-500">
              {priceText(product.price, lang)}
            </p>

            <ProductPurchase
              slug={slug}
              title={text.title}
              price={product.price}
              image={product.image}
              parcelLocker={product.parcelLocker}
            />
            {product.parcelLocker === false && (
  <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
    <div className="flex items-start gap-3">
      <Package className="mt-0.5 h-6 w-6 text-amber-600" />

      <div>
        <p className="font-bold text-amber-900">
          {t.noLocker}
        </p>

        <p className="mt-1 text-sm leading-6 text-amber-800">
          {t.noLockerText}
        </p>
      </div>
    </div>
  </div>
)}

            {slug.includes("skidrums") && (
              <div className="mt-10 rounded-3xl border border-pink-200 bg-pink-50 p-6">
                <h3 className="text-xl font-bold text-pink-600">
                  {t.important}
                </h3>

                <p className="mt-3 leading-8 text-gray-700">
                  {t.bottles}
                </p>
              </div>
            )}
          </div>
        </div>
{slug === "party-box" ? (
  <section className="mt-20">
    <PartyBoxConfigurator />
  </section>
) : (
  <section className="mt-20">
    <h2 className="text-3xl font-black text-gray-900">
      {t.description}
    </h2>

    <div className="mt-6 whitespace-pre-line text-lg leading-8 text-gray-600">
      {text.description}
    </div>
  </section>
)}

<section className="mt-16">
  <div className="rounded-3xl border border-pink-100 bg-pink-50 p-5">
    <div className="grid gap-8 md:grid-cols-3">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          <Truck className="h-8 w-8 text-pink-500" strokeWidth={2.2} />
        </div>

        <h3 className="mt-4 text-xl font-bold">
          {t.delivery}
        </h3>

        <p className="mt-2 leading-7 text-gray-600">
          {t.deliveryText}
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          <Package className="h-8 w-8 text-pink-500" strokeWidth={2.2} />
        </div>

        <h3 className="mt-4 text-xl font-bold">
          {t.packaging}
        </h3>

        <p className="mt-2 leading-7 text-gray-600">
          {t.packagingText}
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow">
          <Clock3 className="h-8 w-8 text-pink-500" strokeWidth={2.2} />
        </div>

        <h3 className="mt-4 text-xl font-bold">
          {t.fast}
        </h3>

        <p className="mt-2 leading-7 text-gray-600">
          {t.fastText}
        </p>
      </div>
    </div>
  </div>
</section>
      </div>
    </main>
  );
}