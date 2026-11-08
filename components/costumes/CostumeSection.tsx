import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { TbRulerMeasure } from "react-icons/tb";
import { loadSectionCards, reservationHref } from "@/lib/costumeCatalog";
import { localizeCostume } from "@/lib/costumes";
import { lp, tr, type Lang, type Tr } from "@/lib/i18n";
import { circleColor } from "@/components/costumes/costumeColors";
import { cutoutFor } from "@/lib/costumeCutouts";
import WishButton from "@/components/costumes/WishButton";

export type CostumeSectionProps = {
  lang: Lang;
  /** Admin paneļa sadaļas atslēga (lib/admin/sections.ts) */
  sectionKey: string;
  heading: Tr;
  /** Ko pieliek bildes aprakstam: "Betmens – kostīma noma" */
  noun: Tr;
  intro?: Tr;
  /** h1, ja lapā nav cita galvenā virsraksta */
  as?: "h1" | "h2";
  /** Atkāpe no augšas, ja virs sadaļas nav lapas galvenes */
  topPadding?: boolean;
  /** Teksts, ja sadaļā vēl nav neviena kostīma */
  emptyText?: Tr;
};

const RESERVE: Tr = { lv: "Rezervēt", ru: "Забронировать", en: "Book now" };
const SIZE: Tr = { lv: "Izmērs", ru: "Размер", en: "Size" };
const WISH_ADD: Tr = { lv: "Pievienot vēlmju sarakstam", ru: "Добавить в избранное", en: "Add to wishlist" };
const WISH_REMOVE: Tr = { lv: "Noņemt no vēlmju saraksta", ru: "Убрать из избранного", en: "Remove from wishlist" };

/**
 * Kostīmu kartīšu sadaļa. Kostīmi nāk no admin paneļa;
 * ja tur nekā nav, rāda iebūvēto sarakstu no data/costumes.
 */
export default async function CostumeSection({
  lang,
  sectionKey,
  heading,
  noun,
  intro,
  as: Heading = "h2",
  topPadding = false,
  emptyText,
}: CostumeSectionProps) {
  const original = await loadSectionCards(sectionKey);
  const cards = original.map((item) => ({ item: localizeCostume(item, lang), source: item }));
  const nounText = tr(lang, noun);
  const reserve = tr(lang, RESERVE);

  return (
    <section className={`bg-[#F8F9FC] pb-16 lg:pb-24 ${topPadding ? "pt-24 lg:pt-32" : "pt-12 lg:pt-16"}`}>
      <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
        <div className="mb-8 lg:mb-10">
          <Heading className="text-[28px] font-extrabold leading-tight tracking-[-0.03em] text-[#14123A] lg:text-[42px]">
            {tr(lang, heading)}
          </Heading>
          {intro && (
            <p className="mt-3 max-w-3xl text-base leading-7 text-[#4B4860] lg:text-lg lg:leading-8">
              {tr(lang, intro)}
            </p>
          )}
        </div>

        {cards.length === 0 && emptyText && (
          <p className="rounded-3xl bg-white p-8 text-center text-lg text-[#4B4860] shadow-[0_16px_40px_rgba(23,23,23,0.06)]">
            {tr(lang, emptyText)}
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {cards.map(({ item, source }, index) => {
            const href = lp(lang, item.href);
            const reserveHref = lp(lang, reservationHref(source, item.title));
            const cutout = cutoutFor(item.image);
            return (
              <article
                key={`${item.slug}-${index}`}
                className="group flex flex-col rounded-3xl bg-white p-4 shadow-[0_16px_40px_rgba(23,23,23,0.06)] transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(23,23,23,0.10)]"
              >
                <div className="relative h-[260px] overflow-hidden rounded-[18px] lg:h-[280px]">
                  <Link href={href} className="absolute inset-0 block">
                    {cutout ? (
                      <>
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-5 h-[220px] w-[220px] -translate-x-1/2 rounded-full lg:h-[236px] lg:w-[236px]"
                          style={{ background: circleColor(index) }}
                        />
                        <span className="absolute inset-x-[6%] bottom-2.5 top-3">
                          <Image
                            src={cutout}
                            alt={`${item.title} – ${nounText}`}
                            fill
                            sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 90vw"
                            className="object-contain object-bottom drop-shadow-[0_14px_16px_rgba(20,18,58,0.16)] transition duration-500 ease-out group-hover:scale-105"
                          />
                        </span>
                      </>
                    ) : (
                      <span className="absolute inset-0">
                        <Image
                          src={item.image}
                          alt={`${item.title} – ${nounText}`}
                          fill
                          sizes="(min-width: 1280px) 320px, (min-width: 640px) 45vw, 90vw"
                          className="object-contain p-2 transition duration-500 ease-out group-hover:scale-105"
                        />
                      </span>
                    )}
                  </Link>
                  <WishButton
                    id={`${sectionKey}/${item.slug}`}
                    addLabel={`${tr(lang, WISH_ADD)}: ${item.title}`}
                    removeLabel={`${tr(lang, WISH_REMOVE)}: ${item.title}`}
                    className="absolute right-3 top-3"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-3 px-2 pb-1 pt-5">
                  <h3 className="text-2xl font-extrabold leading-tight tracking-[-0.02em] text-[#171717] lg:text-[28px]">
                    <Link href={href} className="transition hover:text-[#6C3BFF]">
                      {item.title}
                    </Link>
                  </h3>

                  {item.description && (
                    <p className="text-[15px] leading-6 text-[#4B4860]">{item.description}</p>
                  )}

                  {(item.price || item.size) && (
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      {item.price && (
                        <p className="text-[26px] font-extrabold tracking-[-0.02em] text-[#6C3BFF] lg:text-[28px]">
                          {item.price}
                        </p>
                      )}
                      {item.size && (
                        <p className="flex items-center gap-2 rounded-full bg-[#F6F4FB] px-3 py-1.5 text-[15px] font-semibold text-[#4B4860]">
                          <TbRulerMeasure className="h-[18px] w-[18px] text-[#6C3BFF]" aria-hidden="true" />
                          <span className="sr-only">{tr(lang, SIZE)}: </span>
                          {item.size}
                        </p>
                      )}
                    </div>
                  )}

                  <Link
                    href={reserveHref}
                    className="hc-cta mt-auto flex h-[52px] items-center justify-center gap-2 rounded-2xl text-base font-extrabold text-white shadow-[0_10px_24px_rgba(108,59,255,0.22)] hover:scale-[1.02] group-hover:shadow-[0_14px_30px_rgba(255,75,165,0.35)] lg:mt-auto"
                  >
                    {reserve}
                    <FiArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
