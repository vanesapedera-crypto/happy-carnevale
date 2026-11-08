import Image from "next/image";
import Link from "next/link";
import { lp, tr, type Lang, type Tr } from "@/lib/i18n";

export interface FlipCardItem {
  title: Tr;
  href: string;
  image: string;
  description: Tr;
  /** Cena aizmugurē, piem. { lv: "no 160 €", … }. Ja nav – cenas rindas nav. */
  price?: Tr;
}

const VIEW: Tr = { lv: "Skatīt", ru: "Смотреть", en: "View" };
const MORE: Tr = { lv: "Uzzināt vairāk", ru: "Подробнее", en: "Learn more" };
const BOOK: Tr = { lv: "Rezervēt", ru: "Забронировать", en: "Book now" };

/**
 * Pasākuma kartīte, kas datorā, uzbraucot ar peli, apgriežas kā spēles kārts:
 * priekšā bilde, aizmugurē apraksts, cena un pogas. Telefonā redzama tikai priekšpuse.
 */
export default function FlipCard({
  lang,
  item,
  alt,
  sizes,
}: {
  lang: Lang;
  item: FlipCardItem;
  alt: string;
  sizes: string;
}) {
  const title = tr(lang, item.title);
  const description = tr(lang, item.description);

  return (
    <div className="flip3d group h-[336px] rounded-[36px] sm:h-[376px] lg:h-[436px]">
      <div className="flip3d-inner rounded-[36px]">
        {/* Priekšpuse */}
        <Link
          href={lp(lang, item.href)}
          className="flip3d-front block border-[8px] border-white bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)]"
        >
          <div className="relative h-full overflow-hidden rounded-[28px]">
            <Image src={item.image} alt={alt} fill sizes={sizes} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 lg:p-7 lg:pb-8">
              <h3 className="text-2xl font-black leading-tight text-white lg:text-3xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/90 lg:mt-3 lg:text-base lg:leading-7">
                {description}
              </p>
              <span className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-pink-500 px-5 py-3 text-sm font-bold text-white">
                {tr(lang, VIEW)}
                <span>→</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Aizmugure (tikai datorā) */}
        <div className="flip3d-back border-[8px] border-white bg-white shadow-[0_25px_60px_rgba(236,72,153,0.25)]">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-gradient-to-br from-pink-500 via-pink-500 to-fuchsia-600 p-7 text-white">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15" />
            <div className="pointer-events-none absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute right-8 top-24 h-10 w-10 rounded-full bg-white/20" />

            <h3 className="relative text-3xl font-black leading-tight">{title}</h3>
            <p className="relative mt-4 text-base leading-7 text-white/95">{description}</p>

            {item.price && (
              <p className="relative mt-5 text-4xl font-black">{tr(lang, item.price)}</p>
            )}

            <div className="relative mt-auto flex flex-col gap-3">
              <Link
                href={lp(lang, "/rezervacija-pasakumiem")}
                className="flex h-12 items-center justify-center rounded-full bg-white font-bold text-pink-600 shadow-lg transition hover:scale-[1.03]"
              >
                {tr(lang, BOOK)}
              </Link>
              <Link
                href={lp(lang, item.href)}
                className="flex h-12 items-center justify-center rounded-full border-2 border-white/80 font-bold text-white transition hover:bg-white/15"
              >
                {tr(lang, MORE)} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
