import Image from "next/image";
import Link from "next/link";
import Tilt3D from "@/components/effects/Tilt3D";
import type { Metadata } from "next";
import { lp, pageMetadata, toLang, tr } from "@/lib/i18n";
import { loadSectionCards } from "@/lib/costumeCatalog";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma", {
    title: {
      lv: "Kostīmu noma – mascota tēli, karnevāla un svētku kostīmi | Happy Carnevale",
      ru: "Аренда костюмов в Риге – ростовые куклы, карнавальные и праздничные костюмы | Happy Carnevale",
      en: "Costume rental in Riga – mascots, carnival and party costumes | Happy Carnevale",
    },
    description: {
      lv: "Kostīmu noma Rīgā un visā Latvijā: mascota tēli, gaisa plūsmas kostīmi, kino tēli, smieklīgi tēli un parūkas, Helovīna, Ziemassvētku un Lieldienu kostīmi.",
      ru: "Аренда костюмов в Риге и по всей Латвии: ростовые куклы, надувные костюмы, герои фильмов, смешные персонажи и парики, костюмы на Хэллоуин, Рождество и Пасху.",
      en: "Costume rental in Riga and all over Latvia: mascots, inflatable costumes, movie characters, funny characters and wigs, Halloween, Christmas and Easter costumes.",
    },
  });
}

const mainCategories = [
  {
    title: { lv: "Mascota tēli", ru: "Ростовые куклы", en: "Mascot costumes" },
    href: "/kostimu-noma/mascota-teli",
    image: "/images/hero/mascota.jpg",
    description: { lv: "Iespaidīgi tēli, kas vienmēr sagādā prieku.", ru: "Впечатляющие персонажи, которые всегда радуют.", en: "Impressive characters that always bring joy." },
  },
  {
    title: { lv: "Gaisa plūsmas kostīmi", ru: "Надувные костюмы", en: "Inflatable costumes" },
    href: "/kostimu-noma/gaisa-plusmas-kostimi",
    image: "/images/hero/gaisa-plusmas.png",
    description: { lv: "Viegli, ērti un spilgti pasākumiem.", ru: "Лёгкие, удобные и яркие для любых мероприятий.", en: "Light, comfy and eye-catching for events." },
  },
  {
    title: { lv: "Kino tēli un citi interesanti kostīmi", ru: "Герои фильмов и другие интересные костюмы", en: "Movie characters and other fun costumes" },
    href: "/kostimu-noma/filmu-un-pasaku-teli",
    image: "/images/hero/filmu-teli.jpg",
    description: { lv: "Iemīļoti varoņi bērnu svētkiem.", ru: "Любимые герои для детских праздников.", en: "Favourite heroes for children’s parties." },
  },
  {
    title: { lv: "Smieklīgi tēli un parūkas", ru: "Смешные персонажи и парики", en: "Funny characters and wigs" },
    href: "/kostimu-noma/smiekligi-teli",
    image: "/images/hero/citi-teli.jpg",
    description: { lv: "Dažādi kostīmi jebkuram pasākumam.", ru: "Разные костюмы для любого мероприятия.", en: "All sorts of costumes for any occasion." },
  },
];

const seasonalCategories = [
  {
    title: { lv: "Helovīna kostīmi un maskas", ru: "Костюмы и маски на Хэллоуин", en: "Halloween costumes and masks" },
    href: "/kostimu-noma/helovins",
    image: "/images/hero/helovins.jpg",
    description: { lv: "Baisi forši tēli Helovīnam.", ru: "Жутко классные образы на Хэллоуин.", en: "Spooky-cool looks for Halloween." },
  },
  {
    title: { lv: "Ziemassvētku kostīmi", ru: "Рождественские костюмы", en: "Christmas costumes" },
    href: "/kostimu-noma/ziemassvetki",
    image: "/images/hero/ziemassvetki.jpg",
    description: { lv: "Ziemassvētku un rūķu kostīmi.", ru: "Костюмы Деда Мороза и гномов.", en: "Santa and elf costumes." },
  },
  {
    title: { lv: "Pāru kostīmi", ru: "Парные костюмы", en: "Couples costumes" },
    href: "/kostimu-noma/paru-kostimi",
    // Bilde: pirmais admin panelī pievienotais pāru kostīms (skat. lapas funkciju zemāk)
    image: "/images/hero/citi-teli.jpg",
    description: { lv: "Saskaņoti tērpi diviem.", ru: "Согласованные образы для двоих.", en: "Matching outfits for two." },
  },
  {
    title: { lv: "Lieldienu kostīmi", ru: "Пасхальные костюмы", en: "Easter costumes" },
    href: "/kostimu-noma/lieldienas",
    image: "/images/hero/lieldienas.jpg",
    description: { lv: "Lieldienu zaķi un svētku tēli.", ru: "Пасхальные зайцы и праздничные персонажи.", en: "Easter bunnies and festive characters." },
  },
];

export default async function KostimuNomaPage({ params }: Props) {
  const lang = toLang((await params).lang);
  const rental = tr(lang, { lv: "Kostīmu noma", ru: "Аренда костюмов", en: "Costume rental" });
  const view = tr(lang, { lv: "Skatīt", ru: "Смотреть", en: "View" });

  // Pāru kostīmu kartītē rāda pirmā admin panelī ielikta pāru kostīma bildi
  const [firstCouple] = await loadSectionCards("paru-kostimi");
  const seasonal = seasonalCategories.map((item) =>
    item.href === "/kostimu-noma/paru-kostimi" && firstCouple
      ? { ...item, image: firstCouple.image }
      : item
  );
  return (
    <main className="bg-[#fff7fb] pb-24">
<section className="relative overflow-hidden pb-12 lg:pb-20">
              {/* dekorācijas */}
       <Image
  src="/mask-group.svg"
  alt=""
  width={280}
  height={180}
  className="pointer-events-none hidden lg:block absolute left-[-26px] top-80 z-0 h-auto w-48 opacity-90"
/>

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



<Image
  src="/star-2.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute left-20 top-20 z-0 h-auto w-8"
/>

<Image
  src="/star-3.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute left-[12%] top-36 z-0 h-auto w-7"
/>

<Image
  src="/star-2.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute right-[14%] top-24 z-0 h-auto w-8"
/>

<Image
  src="/star-3.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute right-[22%] top-40 z-0 h-auto w-7"
/>

<Image
  src="/star-2.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute left-[8%] bottom-[34%] z-0 h-auto w-7"
/>

<Image
  src="/star-3.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none hidden lg:block absolute right-[8%] bottom-[30%] z-0 h-auto w-7"
/>

<div className="relative z-10 mx-auto max-w-7xl px-5 pt-0 lg:px-6 lg:pt-10">
              <div className="mb-8 flex items-center justify-center gap-6">
  <div className="hidden h-px w-28 bg-pink-200 lg:block" />

  <h1 className="text-center text-lg font-black uppercase tracking-[0.2em] text-pink-400 sm:text-xl lg:text-2xl lg:tracking-[0.45em]">
    {rental}
  </h1>

  <div className="hidden h-px w-28 bg-pink-200 lg:block" />
</div>

<div className="grid gap-8 lg:grid-cols-4">
              {mainCategories.map((item) => (
              <Tilt3D key={item.href} className="rounded-[36px]">
<Link
                
                href={lp(lang, item.href)}
                className="group block h-full overflow-hidden rounded-[36px] border-[8px] border-white bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(236,72,153,0.22)]"
              >
<div className="relative h-[320px] sm:h-[360px] lg:h-[420px]">
                    <Image
                    src={item.image}
                    alt={`${rental} – ${tr(lang, item.title)}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-7 pb-8">
<h3 className="max-w-[90%] text-2xl font-black leading-tight text-white lg:text-3xl">                      {tr(lang, item.title)}
                    </h3>

<p className="mt-3 text-sm leading-6 text-white/90 lg:text-base lg:leading-7">
                      {tr(lang, item.description)}
                    </p>

                    <span className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-pink-500 px-5 py-3 text-sm font-bold text-white transition duration-300 group-hover:bg-pink-600">
                      {view}
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
</Tilt3D>
            ))}
          </div>
        </div>
      </section>

<section className="relative mx-auto mt-12 max-w-7xl overflow-hidden px-5 lg:mt-16 lg:px-6">
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
  className="pointer-events-none absolute left-0 top-6 z-0 h-auto w-6 opacity-70 md:w-8"
/>

<Image
  src="/star-3.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none absolute left-40 top-16 z-0 h-auto w-5 opacity-60 md:w-17"
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
  className="pointer-events-none absolute right-40 top-50 z-0 h-auto w-4 opacity-50 md:w-6"
/>

  <div className="relative z-10 mb-10 flex items-center justify-center gap-6">
  <div className="hidden h-px w-28 bg-pink-200 lg:block" />

  <h2 className="text-center text-lg font-black uppercase tracking-[0.2em] text-pink-400 sm:text-xl lg:text-2xl lg:tracking-[0.45em]">
    {tr(lang, { lv: "Sezonālās kolekcijas", ru: "Сезонные коллекции", en: "Seasonal collections" })}
  </h2>

  <div className="hidden h-px w-28 bg-pink-200 lg:block" />
</div>

  <div className="relative z-10 grid gap-8 lg:grid-cols-3">
  </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {seasonal.map((item) => (
            <Tilt3D key={item.href} className="rounded-[36px]">
<Link
              
              href={lp(lang, item.href)}
              className="group block h-full overflow-hidden rounded-[36px] border-[8px] border-white bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(236,72,153,0.22)]"
            >
              <div className="relative h-[320px] sm:h-[360px] lg:h-[420px]">
                <Image
                  src={item.image}
                  alt={`${rental} – ${tr(lang, item.title)}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 pb-8">
<h3 className="max-w-[90%] text-2xl font-black leading-tight text-white lg:text-3xl">                    {tr(lang, item.title)}
                  </h3>

<p className="mt-3 text-sm leading-6 text-white/90 lg:text-base lg:leading-7">                    {tr(lang, item.description)}
                  </p>

                  <span className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-pink-500 px-5 py-3 text-sm font-bold text-white transition duration-300 group-hover:bg-pink-600">
                    {view}
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
</Tilt3D>
          ))}
        </div>
      </section>
    </main>
  );
}