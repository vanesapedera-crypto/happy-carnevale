import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata, toLang, tr } from "@/lib/i18n";
import FlipCard from "@/components/events/FlipCard";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/pasakumu-organizesana", {
    title: {
      lv: "Pasākumu organizēšana bērniem – animatori, pārsteiguma tēli, sejas apgleznošana | Happy Carnevale",
      ru: "Организация детских праздников – аниматоры, персонажи-сюрпризы, аквагрим | Happy Carnevale",
      en: "Kids' party services – entertainers, surprise characters, face painting | Happy Carnevale",
    },
    description: {
      lv: "Bērnu svētku un pasākumu organizēšana Rīgā un visā Latvijā: animatori, pārsteiguma tēls, sejas apgleznošana un radošās darbnīcas.",
      ru: "Организация детских праздников и мероприятий в Риге и по всей Латвии: аниматоры, персонаж-сюрприз, аквагрим и творческие мастерские.",
      en: "Kids' parties and events in Riga and all over Latvia: entertainers, surprise character visits, face painting and creative workshops.",
    },
  });
}

const mainCategories = [
  {
    title: { lv: "Animatori", ru: "Аниматоры", en: "Entertainers" },
    href: "/pasakumu-organizesana/animatori",
    image: "/images/hero/animatori.jpg",
    price: { lv: "no 160 €", ru: "от 160 €", en: "from €160" },
    description: { lv: "Jautras rotaļas, dejas un aktivitātes bērnu svētkiem.", ru: "Весёлые игры, танцы и развлечения для детских праздников.", en: "Fun games, dancing and activities for kids’ parties." },
  },
  {
    title: { lv: "Pārsteiguma tēls", ru: "Персонаж-сюрприз", en: "Surprise character" },
    href: "/pasakumu-organizesana/parsteiguma-tels",
    image: "/images/hero/parsteiguma-tels.jpg",
    price: { lv: "110 €", ru: "110 €", en: "€110" },
    description: {
      lv: "Iemīļotais tēls ierodas apsveikt jubilāru un iepriecināt viesus.",
      ru: "Любимый персонаж приходит поздравить именинника и порадовать гостей.",
      en: "A favourite character comes to greet the birthday star and delight the guests.",
    },
  },
  {
    title: { lv: "Sejas apgleznošana", ru: "Аквагрим", en: "Face painting" },
    href: "/pasakumu-organizesana/sejas-apgleznosana",
    image: "/images/hero/sejas-apgleznosana.jpg",
    description: {
      lv: "Profesionāla sejas apgleznošana ar drošām un kvalitatīvām krāsām.",
      ru: "Профессиональный аквагрим безопасными и качественными красками.",
      en: "Professional face painting with safe, high-quality paints.",
    },
  },
  {
    title: { lv: "Radošās darbnīcas", ru: "Творческие мастерские", en: "Creative workshops" },
    href: "/pasakumu-organizesana/radosas-darbnicas",
    image: "/images/hero/radosas-darbnicas.jpg",
    description: { lv: "Radošas un aizraujošas darbnīcas bērniem un pasākumiem.", ru: "Творческие и увлекательные мастер-классы для детей и мероприятий.", en: "Creative, exciting workshops for kids and events." },
  },
];

const seasonalCategories = [
  {
    title: { lv: "Ziemassvētki", ru: "Рождество", en: "Christmas" },
    href: "/pasakumu-organizesana/ziemassvetki",
    image: "/images/hero/ziemassvetki.jpg",
    description: { lv: "Svētku darbnīcas un programmas Ziemassvētku pasākumiem.", ru: "Праздничные мастерские и программы для рождественских мероприятий.", en: "Festive workshops and programmes for Christmas events." },
  },
    {
    title: { lv: "Helovīns", ru: "Хэллоуин", en: "Halloween" },
    href: "/pasakumu-organizesana/helovins",
    image: "/images/hero/helovins.jpg",
    description: { lv: "Baisi jautras aktivitātes un tematiskas darbnīcas Helovīnam.", ru: "Жутко весёлые развлечения и тематические мастерские на Хэллоуин.", en: "Spooky-fun activities and themed workshops for Halloween." },
  },
];

export default async function PasakumuOrganizesanaPage({ params }: Props) {
  const lang = toLang((await params).lang);
  const events = tr(lang, { lv: "Pasākumu organizēšana", ru: "Организация праздников", en: "Party services" });
  return (
    <main className="bg-[#fff7fb] pb-24">
<section className="relative overflow-hidden pt-4 pb-12 lg:pt-10 lg:pb-20">
            <div className="absolute left-[-80px] top-10 h-72 w-72 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="absolute right-[-100px] top-20 h-80 w-80 rounded-full bg-yellow-200/40 blur-3xl" />

         <Image
                 src="/mask-group.svg"
                 alt=""
                 width={280}
                 height={180}
className="pointer-events-none hidden lg:block absolute left-[-26px] top-80 z-0 h-auto w-48 opacity-90"               />
       
              <Image
  src="/star-3.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute left-16 top-80 z-26 h-auto w-9"
/>
       
              <Image
  src="/star-2.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute left-[75%] top-15 z-5 h-auto w-10"
/>
       
               <Image
  src="/star-2.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute left-[24%] top-40 z-15 h-auto w-8"
/>

<div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-6">
                  <div className="mb-8 flex items-center justify-center gap-6">
<div className="hidden h-px w-28 bg-pink-200 lg:block" />

<h1 className="text-center text-lg font-black uppercase tracking-[0.2em] text-pink-400 sm:text-xl lg:text-2xl lg:tracking-[0.45em]">
  {events}
</h1>

<div className="hidden h-px w-28 bg-pink-200 lg:block" />
          </div>

<div className="grid gap-6 lg:grid-cols-4">
              {mainCategories.map((item) => (
              <FlipCard
                key={item.href}
                lang={lang}
                item={item}
                alt={`${tr(lang, item.title)} – ${events}`}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            ))}
          </div>
        </div>
      </section>

<section className="relative mx-auto mt-8 max-w-7xl overflow-hidden px-5 lg:mt-16 lg:px-6">
          <div className="absolute left-[-80px] top-0 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
        <div className="absolute right-[-100px] bottom-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-3xl" />

        <Image
          src="/star-2.svg"
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute left-10 top-0 z-0 h-auto w-8 opacity-60 md:w-10"
        />

        <Image
          src="/star-3.svg"
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute right-10 top-2 z-0 h-auto w-8 opacity-60 md:w-10"
        />

        <Image
          src="/star-2.svg"
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute left-8 top-6 z-0 h-auto w-6 opacity-70 md:w-8"
        />

        <Image
          src="/star-3.svg"
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute left-40 top-16 z-0 h-auto w-5 opacity-60 md:w-8"
        />

        <Image
          src="/star-2.svg"
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute left-[40%] top-2 z-0 h-auto w-4 opacity-50 md:w-6"
        />

        <Image
          src="/star-3.svg"
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute right-40 top-20 z-0 h-auto w-4 opacity-50 md:w-6"
        />

        <div className="relative z-10 mb-10 flex items-center justify-center gap-6">
<div className="hidden h-px w-28 bg-pink-200 lg:block" />
<h2 className="text-center text-lg font-black uppercase tracking-[0.2em] text-pink-400 sm:text-xl lg:text-2xl lg:tracking-[0.45em]">            {tr(lang, { lv: "Sezonālais piedāvājums", ru: "Сезонные предложения", en: "Seasonal offers" })}
          </h2>
<div className="hidden h-px w-28 bg-pink-200 lg:block" />  
      </div>

        <div className="relative z-10 mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
          {seasonalCategories.map((item) => (
              <FlipCard
                key={item.href}
                lang={lang}
                item={item}
                alt={`${tr(lang, item.title)} – ${events}`}
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            ))}
        </div>
      </section>
    </main>
  );
}