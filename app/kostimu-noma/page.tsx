import Image from "next/image";
import Link from "next/link";

const mainCategories = [
  {
    title: "Mascota tēli",
    href: "/kostimu-noma/mascota-teli",
    image: "/images/hero/mascota.png",
    description: "Iespaidīgi tēli, kas vienmēr sagādā prieku.",
  },
  {
    title: "Gaisa plūsmas kostīmi",
    href: "/kostimu-noma/gaisa-plusmas-kostimi",
    image: "/images/hero/gaisa-plusmas.png",
    description: "Viegli, ērti un spilgti pasākumiem.",
  },
  {
    title: "Filmu un multfilmu tēli",
    href: "/kostimu-noma/filmu-un-pasaku-teli",
    image: "/images/hero/filmu-teli.png",
    description: "Iemīļoti varoņi bērnu svētkiem.",
  },
  {
    title: "Smieklīgi tēli, parūkas un maskas",
    href: "/kostimu-noma/smiekligi-teli",
    image: "/images/hero/citi-teli.png",
    description: "Dažādi kostīmi jebkuram pasākumam.",
  },
];

const seasonalCategories = [
  {
    title: "Helovīna kostīmi",
    href: "/kostimu-noma/helovins",
    image: "/images/hero/helovins.png",
    description: "Baisi forši tēli Helovīnam.",
  },
  {
    title: "Ziemassvētku kostīmi",
    href: "/kostimu-noma/ziemassvetki",
    image: "/images/hero/ziemassvetki.png",
    description: "Ziemassvētku un rūķu kostīmi.",
  },
  {
    title: "Lieldienu kostīmi",
    href: "/kostimu-noma/lieldienas",
    image: "/images/hero/lieldienas.png",
    description: "Lieldienu zaķi un svētku tēli.",
  },
];

export default function KostimuNomaPage() {
  return (
    <main className="bg-[#fff7fb] pb-24">
      <section className="relative overflow-hidden pt-40 pb-20">
        {/* dekorācijas */}
        <Image
          src="/mask-group.svg"
          alt=""
          width={280}
          height={180}
          className="pointer-events-none absolute left-[-26px] top-80 z-0 h-auto w-48 opacity-90 md:w-64"
        />

        <Image
          src="/star-3.svg"
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute left-16 top-80 z-26 h-auto w-9 md:w-35"
        />

        <Image
          src="/star-2.svg"
          alt=""
          width={64}
          height={64}
  className="pointer-events-none absolute left-[75%] top-15 z-5 h-auto w-17 md:w-10"
          />

        <Image
          src="/star-2.svg"
          alt=""
          width={64}
          height={64}
          className="pointer-events-none absolute left-[24%] top-40 z-15 h-auto w-8 md:w-25"
        />

        <Image
          src="/group-8.svg"
          alt=""
          width={220}
          height={140}
          className="pointer-events-none absolute left-7 top-30 z-0 h-auto w-32 md:w-44"
        />

        <Image
          src="/group-9.svg"
          alt=""
          width={280}
          height={180}
          className="pointer-events-none absolute right-0 top-17 z-3 h-auto w-49 md:w-130"
        />
        <Image
  src="/star-2.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none absolute left-20 top-20 z-0 h-auto w-8 md:w-10"
/>

<Image
  src="/star-3.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none absolute left-[12%] top-36 z-0 h-auto w-7 md:w-9"
/>

<Image
  src="/star-2.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none absolute right-[14%] top-24 z-0 h-auto w-8 md:w-10"
/>

<Image
  src="/star-3.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none absolute right-[22%] top-40 z-0 h-auto w-7 md:w-9"
/>

<Image
  src="/star-2.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none absolute left-[8%] bottom-[34%] z-0 h-auto w-7 md:w-9"
/>

<Image
  src="/star-3.svg"
  alt=""
  width={64}
  height={64}
  className="pointer-events-none absolute right-[8%] bottom-[30%] z-0 h-auto w-7 md:w-9"
/>

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-center gap-6">
            <div className="h-px w-28 bg-pink-200" />
            <h2 className="text-2xl font-black uppercase tracking-[0.45em] text-pink-500">
  Galvenās kategorijas
</h2>
            <div className="h-px w-28 bg-pink-200" />
          </div>

<div className="grid gap-8 lg:grid-cols-4">
              {mainCategories.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-[36px] border-[8px] border-white bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(236,72,153,0.22)]"
              >
                <div className="relative h-[420px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 p-7 pb-8">
                    <h3 className="max-w-[90%] text-3xl font-black leading-tight text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-base leading-7 text-white/90">
                      {item.description}
                    </p>

                    <span className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-pink-500 px-5 py-3 text-sm font-bold text-white transition duration-300 group-hover:bg-pink-600">
                      Skatīt
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-6">
       <section className="mx-auto mt-16 max-w-7xl px-6 relative overflow-hidden">
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
    <div className="h-px w-28 bg-pink-200" />
    <h2 className="text-2xl font-black uppercase tracking-[0.45em] text-pink-400">
      Sezonālās kolekcijas
    </h2>
    <div className="h-px w-28 bg-pink-200" />
  </div>

  <div className="relative z-10 grid gap-8 lg:grid-cols-3">
  </div>
</section>

        <div className="grid gap-8 lg:grid-cols-3">
          {seasonalCategories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-[36px] border-[8px] border-white bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(236,72,153,0.22)]"
            >
              <div className="relative h-[420px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 pb-8">
                  <h3 className="max-w-[90%] text-3xl font-black leading-tight text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-white/90">
                    {item.description}
                  </p>

                  <span className="mt-6 inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full bg-pink-500 px-5 py-3 text-sm font-bold text-white transition duration-300 group-hover:bg-pink-600">
                    Skatīt
                    <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}