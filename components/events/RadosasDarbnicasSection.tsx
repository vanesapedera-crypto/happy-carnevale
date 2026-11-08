import Image from "next/image";
import Link from "next/link";
import { WORKSHOP_GALLERY_KEY } from "@/lib/admin/sections";
import { getSectionItems } from "@/lib/sections";
import { lp, tr, type Lang } from "@/lib/i18n";

/** Iebūvētais saraksts: tiek rādīts bez bildēm, ja admin panelī nav nevienas darbnīcas. */
const activities = [
  { lv: "Koka vilciņu meistarklase", ru: "Мастер-класс по деревянным волчкам", en: "Wooden spinning top workshop" },
  { lv: "Dimanta uzlīmju izveide", ru: "Создание алмазных наклеек", en: "Diamond sticker art" },
  { lv: "Atslēgu piekariņu izveide", ru: "Изготовление брелоков", en: "Keyring making" },
  { lv: "Auduma nakts maskas", ru: "Тканевые маски для сна", en: "Fabric sleep masks" },
  { lv: "Vēdeklīšu izveide un dekorēšana", ru: "Изготовление и украшение вееров", en: "Fan making and decorating" },
  { lv: "Koka spogulīšu darbnīca", ru: "Мастерская деревянных зеркалец", en: "Wooden mirror workshop" },
  { lv: "Logu stikla krāsaino uzlīmju izveide", ru: "Цветные наклейки на окна", en: "Coloured window stickers" },
  { lv: "Vēja zvaniņu izveide un dekorēšana", ru: "Изготовление и украшение «музыки ветра»", en: "Wind chime making and decorating" },
  { lv: "Antistresa vīriņi", ru: "Человечки-антистресс", en: "Stress-ball buddies" },
];

export default async function RadosasDarbnicasSection({ lang }: { lang: Lang }) {
  // Darbnīcas (bilde + nosaukums) pārvalda admin panelī.
  const managed = await getSectionItems(WORKSHOP_GALLERY_KEY);
  const workshops = (managed ?? [])
    .filter((item) => item.imageUrl)
    .map((item) => ({
      ...item,
      // Admin panelī ierakstītais tulkojums (krievu/angļu lapām), citādi latviski
      title: (lang !== "lv" && item.translations?.[lang]?.title) || item.title,
    }));

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-violet-200 bg-white p-10 shadow-xl">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-black text-gray-900">
              {tr(lang, { lv: "Darbnīcu piedāvājums", ru: "Наши мастерские", en: "Our workshops" })}
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-violet-500" />

            <p className="mt-6 text-lg leading-8 text-gray-600">
              {tr(lang, { lv: "Radošās darbnīcas saturs un ilgums tiek pielāgots pasākuma vajadzībām, bērnu skaitam, norises vietai un vēlamajam formātam. Pakalpojuma cena tiek saskaņota individuāli pēc pasākuma detaļu precizēšanas. Sazinies ar mums, un kopā atradīsim piemērotāko risinājumu Tavam pasākumam!", ru: "Содержание и продолжительность мастерской подстраиваются под ваше мероприятие, количество детей, место проведения и желаемый формат. Цена согласовывается индивидуально после уточнения деталей. Свяжитесь с нами – вместе найдём лучшее решение для вашего праздника!", en: "We tailor the content and length of each workshop to your event, the number of children, the venue and the format you'd like. The price is agreed individually once we know the details. Get in touch and together we'll find the best option for your event!" })}
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
                  key={item.lv}
                  className="rounded-[28px] border border-violet-100 bg-violet-50 px-6 py-5 text-lg font-semibold text-gray-900 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {tr(lang, item)}
                </div>
              ))}
            </div>
          )}

          <div className="mt-12 rounded-[32px] bg-gradient-to-r from-violet-500 to-violet-400 p-8 text-white">
            <h3 className="text-2xl font-black">
              {tr(lang, { lv: "Cena tiek saskaņota individuāli", ru: "Цена согласовывается индивидуально", en: "Pricing is agreed individually" })}
            </h3>

            <p className="mt-4 max-w-3xl leading-8 text-white/95">
              {tr(lang, { lv: "Piedāvājumu veidojam atkarībā no pasākuma vietas, bērnu skaita, norises ilguma un izvēlētajām darbnīcām.", ru: "Предложение зависит от места проведения, количества детей, продолжительности и выбранных мастерских.", en: "Our quote depends on the venue, the number of children, the duration and the workshops you choose." })}
            </p>

            <Link
              href={lp(lang, "/kontakti")}
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-violet-600 transition hover:bg-violet-50"
            >
              {tr(lang, { lv: "Sazināties", ru: "Связаться", en: "Contact us" })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}