import Image from "next/image";
import Link from "next/link";
import {
  Shirt,
  PartyPopper,
  Crown,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-clip">

      {/* ================= DESKTOP ================= */}

      <div className="hidden lg:block">

        {/* Burbuļi */}
        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={260}
          height={260}
          className="absolute right-32 top-16 z-0 opacity-40 select-none"
        />

        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={150}
          height={150}
          className="absolute right-12 top-80 z-0 opacity-30 select-none"
        />

        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={100}
          height={100}
          className="absolute bottom-40 right-[430px] z-0 opacity-25 select-none"
        />

        {/* Burbulīte */}
        <Image
          src="/images/hero/hero-right.png"
          alt="Burbulīte"
          width={1800}
          height={2200}
          priority
          className="absolute -right-36 bottom-0 z-10 h-[98%] w-auto object-contain select-none"
        />

        <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6">

          <div className="relative -ml-8 w-full max-w-[780px]">

            <Image
              src="/images/hero/hero-bubble.svg"
              alt="Happy Carnevale"
              width={1600}
              height={1450}
              priority
              unoptimized
              className="w-full h-auto select-none"
            />

            {/* Teksts */}
            <div className="absolute left-1/2 top-[58%] w-[380px] -translate-x-1/2">

              <p className="text-[19px] leading-9 text-gray-700">
                Priecājos Tevi redzēt!
                <br />
                Pie mums vari iznomāt košus kostīmus,
                <br />
                satikt iemīļotus pasaku tēlus,
                <br />
                uzaicināt animatoru un iegādāties
                <br />
                visu milzu ziepju burbuļu salūtam.
              </p>

            </div>

            {/* Poga */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 translate-y-5">

              <Link
                href="/kostimu-noma"
                className="flex h-10 w-[250px] items-center justify-center rounded-full bg-pink-500 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                Kostīmu noma
              </Link>

            </div>

          </div>

        </div>

      </div>
      {/* ================= MOBILE ================= */}

      <div className="relative bg-[#FFF7FB] lg:hidden">

        {/* Burbulīte – pirmā lieta zem logo */}
        <div className="relative h-[470px] w-full overflow-hidden bg-pink-100">
          <Image
            src="/images/hero/hero-right.png"
            alt="Burbulīte – Happy Carnevale"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_30%] select-none"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent from-40% via-[#FFF7FB]/85 via-[72%] to-[#FFF7FB]" />

          <div className="absolute inset-x-5 bottom-4 z-10 text-center">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-xs font-bold text-pink-700 shadow-sm">
              Sveiki! Es esmu Burbulīte
            </span>

            <h1 className="mt-2 text-[29px] font-semibold leading-[1.08] text-[#3B0764]">
              Kostīmu noma un bērnu svētki
            </h1>

            <p className="mt-1.5 text-[15px] text-gray-600">
              Rīgā un visā Latvijā
            </p>
          </div>
        </div>

        {/* Pogas */}
        <div className="mt-1 flex gap-2.5 px-5">
          <Link
            href="/kostimu-noma"
            className="flex-1 whitespace-nowrap rounded-2xl bg-pink-500 px-2 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-pink-500/30"
          >
            Skatīt kostīmus
          </Link>

          <Link
            href="/pasakumu-organizesana/animatori"
            className="flex-1 whitespace-nowrap rounded-2xl bg-white px-2 py-3.5 text-center text-sm font-bold text-pink-700 shadow-md"
          >
            Animatori
          </Link>
        </div>

        {/* Pakalpojumi */}
        <h2 className="mx-5 mb-3 mt-7 text-[21px] font-semibold text-gray-900">
          Ko mēs piedāvājam
        </h2>

        <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
          {[
            { href: "/kostimu-noma", title: "Kostīmu noma", text: "Bērniem un pieaugušajiem", Icon: Shirt, bg: "bg-pink-500" },
            { href: "/pasakumu-organizesana/animatori", title: "Animatori", text: "Dzimšanas dienām un pasākumiem", Icon: PartyPopper, bg: "bg-violet-500" },
            { href: "/pasakumu-organizesana/parsteiguma-tels", title: "Pārsteiguma tēli", text: "Apsveikumi mājās vai birojā", Icon: Crown, bg: "bg-amber-500" },
            { href: "/veikals", title: "Ziepju burbuļi", text: "Šovs un produkti veikalā", Icon: Sparkles, bg: "bg-cyan-500" },
          ].map(({ href, title, text, Icon, bg }) => (
            <Link
              key={href + title}
              href={href}
              className="w-[150px] shrink-0 snap-start rounded-[20px] bg-white p-4 shadow-md shadow-pink-900/5"
            >
              <span className={`mb-2.5 flex h-11 w-11 items-center justify-center rounded-[14px] text-white ${bg}`}>
                <Icon className="h-5 w-5" />
              </span>
              <span className="block text-[15px] font-bold text-gray-900">{title}</span>
              <span className="mt-1 block text-[12.5px] leading-snug text-gray-500">{text}</span>
            </Link>
          ))}
        </div>

        <div className="h-6" />

        {/* Zvanīt / WhatsApp josla */}
        <div className="sticky bottom-0 z-30 flex gap-2 border-t border-pink-100 bg-white px-3.5 pb-3.5 pt-2.5">
          <a
            href="tel:+37126126313"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-pink-500 py-3 text-sm font-bold text-white"
          >
            <Phone className="h-5 w-5" />
            Zvanīt
          </a>

          <a
            href="https://wa.me/37126126313"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-green-100 py-3 text-sm font-bold text-green-800"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
