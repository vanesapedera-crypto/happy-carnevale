import Image from "next/image";
import Link from "next/link";

const mainCategories = [
  {
    title: "Animatori",
    href: "/pasakumu-organizesana/animatori",
    image: "/images/hero/animatori.png",
    description: "Jautras rotaļas, dejas un aktivitātes bērnu svētkiem.",
  },
  {
    title: "Pārsteiguma tēls",
    href: "/pasakumu-organizesana/parsteiguma-tels",
    image: "/images/hero/parsteiguma-tels.png",
    description:
      "Iemīļotais tēls ierodas apsveikt jubilāru un iepriecināt viesus.",
  },
  {
    title: "Sejas apgleznošana",
    href: "/pasakumu-organizesana/sejas-apgleznosana",
    image: "/images/hero/sejas-apgleznosana.png",
    description:
      "Profesionāla sejas apgleznošana ar drošām un kvalitatīvām krāsām.",
  },
  {
    title: "Radošās darbnīcas",
    href: "/pasakumu-organizesana/radosas-darbnicas",
    image: "/images/hero/radosas-darbnicas.png",
    description: "Radošas un aizraujošas darbnīcas bērniem un pasākumiem.",
  },
];

const seasonalCategories = [
  {
    title: "Ziemassvētki",
    href: "/pasakumu-organizesana/ziemassvetki",
    image: "/images/hero/ziemassvetki.png",
    description: "Svētku darbnīcas un programmas Ziemassvētku pasākumiem.",
  },
    {
    title: "Helovīns",
    href: "/pasakumu-organizesana/helovins",
    image: "/images/hero/helovins.png",
    description: "Baisi jautras aktivitātes un tematiskas darbnīcas Helovīnam.",
  },
  {
    title: "Lieldienas",
    href: "/pasakumu-organizesana/lieldienas",
    image: "/images/hero/lieldienas.png",
    description: "Lieldienu tematika, radošas aktivitātes un svētku noskaņa.",
  },
];

export default function PasakumuOrganizesanaPage() {
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

       <Image
  src="/group-5.svg"
  alt=""
  width={220}
  height={140}
  className="pointer-events-none hidden lg:block absolute left-7 top-24 z-0 h-auto w-32"
/>

<div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-6">
                  <div className="mb-8 flex items-center justify-center gap-6">
<div className="hidden h-px w-28 bg-pink-200 lg:block" />

<div className="hidden h-px w-28 bg-pink-200 lg:block" />
          </div>

<div className="grid gap-6 lg:grid-cols-4">
              {mainCategories.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-[36px] border-[8px] border-white bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(236,72,153,0.22)]"
              >
<div className="relative h-[320px] sm:h-[360px] lg:h-[420px]">
                    <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

<div className="absolute inset-x-0 bottom-0 p-5 lg:p-7 lg:pb-8">
  <h3 className="text-2xl lg:text-3xl font-black leading-tight text-white">
                        {item.title}
                    </h3>

<p className="mt-2 text-sm leading-6 text-white/90 lg:mt-3 lg:text-base lg:leading-7">                      {item.description}
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
<h2 className="text-center text-lg font-black uppercase tracking-[0.2em] text-pink-400 sm:text-xl lg:text-2xl lg:tracking-[0.45em]">            Sezonālais piedāvājums
          </h2>
<div className="hidden h-px w-28 bg-pink-200 lg:block" />  
      </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-3">
          {seasonalCategories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-[36px] border-[8px] border-white bg-white shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(236,72,153,0.22)]"
            >
<div className="relative h-[320px] sm:h-[360px] lg:h-[420px]">
                  <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

<div className="absolute inset-x-0 bottom-0 p-5 lg:p-7 lg:pb-8">
<h3 className="text-2xl lg:text-3xl font-black leading-tight text-white">
                      {item.title}
                  </h3>

<p className="mt-2 text-sm leading-6 text-white/90 lg:mt-3 lg:text-base lg:leading-7">
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