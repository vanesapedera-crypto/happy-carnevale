import Image from "next/image";
import Link from "next/link";
import { FiTag } from "react-icons/fi";
import { TbRulerMeasure } from "react-icons/tb";
import { loadSectionCards, reservationHref } from "@/lib/costumeCatalog";
import { localizeCostume } from "@/lib/costumes";
import { lp, tr, type Lang, type Tr } from "@/lib/i18n";

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
  /** Atkāpe no augšas, ja virs sadaļas nav lapas galvenes bildes */
  topPadding?: boolean;
  /** Teksts, ja sadaļā vēl nav neviena kostīma */
  emptyText?: Tr;
};

const RESERVE: Tr = { lv: "Rezervēt →", ru: "Забронировать →", en: "Book now →" };

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
    <section className={`bg-white pb-20 ${topPadding ? "pt-32" : "pt-20"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-zinc-200 bg-white p-10 shadow-xl">
          <div className="mb-12">
            <Heading className="text-4xl font-black text-gray-900">{tr(lang, heading)}</Heading>
            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500" />
            {intro && (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">{tr(lang, intro)}</p>
            )}
          </div>

          {cards.length === 0 && emptyText && (
            <p className="rounded-3xl bg-pink-50 p-6 text-center text-lg text-gray-600">
              {tr(lang, emptyText)}
            </p>
          )}

          {/* DESKTOP */}
          <div className="hidden gap-8 lg:grid lg:grid-cols-4">
            {cards.map(({ item, source }, index) => {
              const href = lp(lang, item.href);
              const reserveHref = lp(lang, reservationHref(source, item.title));
              return (
                <div
                  key={`${item.slug}-${index}`}
                  className="group flex flex-col overflow-hidden rounded-[30px] border border-zinc-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-zinc-300 hover:shadow-2xl"
                >
                  <Link href={href} className="relative block aspect-[3/4] overflow-hidden bg-white">
                    <Image
                      src={item.image}
                      alt={`${item.title} – ${nounText}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-contain p-4 transition duration-500 group-hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="min-h-[64px] text-2xl font-bold leading-tight tracking-tight text-gray-900">
                      <Link href={href} className="transition hover:text-pink-600">
                        {item.title}
                      </Link>
                    </h3>

                    {item.description && (
                      <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                    )}

                    {item.price && (
                      <div className="mt-5 flex items-center gap-2 text-pink-600">
                        <FiTag className="h-5 w-5" />
                        <span className="font-semibold">{item.price}</span>
                      </div>
                    )}

                    {item.size && (
                      <div className="mb-7 mt-2 flex items-center gap-2 text-gray-600">
                        <TbRulerMeasure className="h-5 w-5" />
                        <span>{item.size}</span>
                      </div>
                    )}

                    <Link
                      href={reserveHref}
                      className="mt-auto flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-violet-400 py-3.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    >
                      {reserve}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MOBILE */}
          <div className="flex flex-col gap-5 lg:hidden">
            {cards.map(({ item, source }, index) => {
              const href = lp(lang, item.href);
              const reserveHref = lp(lang, reservationHref(source, item.title));
              return (
                <div
                  key={`${item.slug}-${index}`}
                  className="overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-lg"
                >
                  <div className="flex">
                    <Link href={href} className="relative block h-44 w-36 shrink-0 bg-white">
                      <Image
                        src={item.image}
                        alt={`${item.title} – ${nounText}`}
                        fill
                        sizes="144px"
                        className="object-contain p-4"
                      />
                    </Link>

                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          <Link href={href} className="transition hover:text-pink-600">
                            {item.title}
                          </Link>
                        </h3>

                        {item.description && (
                          <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                        )}

                        {item.price && (
                          <div className="mt-4 flex items-center gap-2 text-pink-600">
                            <FiTag className="h-5 w-5" />
                            <span className="font-semibold">{item.price}</span>
                          </div>
                        )}

                        {item.size && (
                          <div className="mt-2 flex items-center gap-2 text-gray-600">
                            <TbRulerMeasure className="h-5 w-5" />
                            <span>{item.size}</span>
                          </div>
                        )}
                      </div>

                      <Link
                        href={reserveHref}
                        className="mt-5 flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 font-semibold text-white"
                      >
                        {reserve}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
