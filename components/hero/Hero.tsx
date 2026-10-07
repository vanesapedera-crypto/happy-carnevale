import Image from "next/image";
import Link from "next/link";

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

            <h1 className="mt-2 text-[27px] font-semibold leading-[1.1] text-[#3B0764]">
              Kostīmu noma un bērnu svētki{" "}
              <span className="mt-1 block text-[17px] font-medium">
                Rīgā un visā Latvijā
              </span>
            </h1>

          </div>
        </div>

        {/* Pakalpojumi */}
        <h2 className="mx-5 mb-3 mt-1.5 text-[21px] font-semibold text-gray-900">
Piedāvājumā:
        </h2>

        <div className="flex flex-col gap-2.5 px-5">
          {[
            { href: "/kostimu-noma", title: "Kostīmu noma", text: "Pieaugušajiem", image: "/images/hero/mascota.png" },
            { href: "/pasakumu-organizesana/animatori", title: "Animatori", text: "Dzimšanas dienām un pasākumiem", image: "/images/hero/animatori.png" },
            { href: "/pasakumu-organizesana/parsteiguma-tels", title: "Pārsteiguma tēli", text: "Apsveikumi mājās vai birojā", image: "/images/hero/parsteiguma-tels.png" },
            { href: "/veikals", title: "Ziepju burbuļi", text: "Produkti mūsu veikalā", image: "/images/shop/hero.jpg" },
          ].map(({ href, title, text, image }) => (
            <Link
              key={href + title}
              href={href}
              className="flex items-center gap-3.5 rounded-[20px] bg-white p-2 shadow-md shadow-pink-900/5"
            >
              <span className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-2xl bg-pink-50">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="84px"
                  className="object-cover"
                />
              </span>

              <span className="flex-1">
                <span className="block text-base font-bold text-gray-900">{title}</span>
                <span className="mt-0.5 block text-[12.5px] leading-snug text-gray-500">{text}</span>
              </span>

              <span className="mr-2.5 text-lg font-bold text-pink-500" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>

        <div className="h-8" />

        {/* Zvanīt / WhatsApp josla */}
        <div className="sticky bottom-0 z-30 flex gap-2 border-t border-pink-100 bg-white px-3.5 pb-3.5 pt-2.5">
          <a
            href="tel:+37126126313"
            className="flex-1 rounded-xl bg-pink-500 py-3 text-center text-[15px] font-bold text-white"
          >
            Zvanīt
          </a>

          <a
            href="https://wa.me/37126126313"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-xl bg-green-100 py-3 text-center text-[15px] font-bold text-green-800"
          >
            WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
