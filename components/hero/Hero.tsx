import Image from "next/image";
import Link from "next/link";
import {
  Shirt,
  PartyPopper,
  Crown,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

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

      <div className="relative isolate overflow-hidden lg:hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFF8FC] to-[#FFF8FC]" />

        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-pink-300/20 blur-[140px]" />

        {/* Hero image */}
        <div className="relative z-10 flex justify-center pt-4">

          <Image
            src="/images/hero/hero-right.png"
            alt="Burbulīte"
            width={900}
            height={1100}
            priority
            className="w-[120%] max-w-[520px] object-contain"
          />

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#FFF8FC]" />

        </div>

        {/* Content */}
        <div className="relative z-20 -mt-8 px-5 pb-12">

          {/* Welcome Card */}
          <div className="rounded-[32px] bg-white px-6 py-8 shadow-xl">

            <Image
  src="/images/hero/group-10.png"
  alt="Sveiki! Es esmu Burbulīte"
  width={900}
  height={420}
  priority
className="mx-auto w-full"/>

            <p className="mt-5 text-center text-sm font-semibold text-[#17223b]">
  Kas Tevi šeit sagaida?
</p>

<div className="mt-4 space-y-2 text-center text-sm leading-6 text-gray-600">
  <p>✓ Košu kostīmu noma</p>
  <p>✓ Profesionāli animatori</p>
  <p>✓ Pārsteiguma tēli</p>
  <p>✓ Milzu ziepju burbuļi</p>
</div>

          </div>

          {/* Pakalpojumi */}
          <div className="mt-8 grid grid-cols-2 gap-4">

            <Link
              href="/kostimu-noma"
              className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50">
                <Shirt className="h-7 w-7 text-pink-500" />
              </div>

              <p className="mt-4 text-center text-sm font-bold text-[#17223b]">
                Kostīmu noma
              </p>

            </Link>

            <Link
              href="/pasakumu-organizesana/animatori"
              className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50">
                <PartyPopper className="h-7 w-7 text-pink-500" />
              </div>

              <p className="mt-4 text-center text-sm font-bold text-[#17223b]">
                Animatori
              </p>

            </Link>

            <Link
              href="/pasakumu-organizesana/parsteiguma-tels"
              className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50">
                <Crown className="h-7 w-7 text-pink-500" />
              </div>

              <p className="mt-4 text-center text-sm font-bold text-[#17223b]">
                Pārsteiguma tēli
              </p>

            </Link>

            <Link
              href="/veikals"
              className="rounded-2xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50">
                <Sparkles className="h-7 w-7 text-pink-500" />
              </div>

              <p className="mt-4 text-center text-sm font-bold text-[#17223b]">
                Milzu ziepju
                <br />
                burbuļi
              </p>

            </Link>

          </div>

        </div>

      </div>
          </section>
  );
}