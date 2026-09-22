import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  VenetianMask,
  PartyPopper,
  Award,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* ================= DESKTOP ================= */}

      <div className="hidden lg:block">

        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={260}
          height={260}
          className="absolute right-32 top-16 z-0 opacity-40"
        />

        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={150}
          height={150}
          className="absolute right-12 top-80 z-0 opacity-30"
        />

        <Image
          src="/images/hero/bubble.png"
          alt=""
          width={100}
          height={100}
          className="absolute bottom-40 right-[430px] z-0 opacity-25"
        />

        <Image
          src="/images/hero/hero-right.png"
          alt="Burbulīte"
          width={1000}
          height={1100}
          priority
          className="absolute -right-48 bottom-0 z-10 h-[96%] w-auto object-contain"
        />

        <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6">

          <div className="relative -ml-12 w-full max-w-[760px]">

            <Image
              src="/images/hero/hero-bubble.svg"
              alt="Happy Carnevale"
              width={760}
              height={700}
              priority
              className="h-auto w-full"
            />

            <div className="absolute left-1/2 top-[59%] w-[360px] -translate-x-1/2">

              <p className="text-[18px] leading-8 text-gray-700">
                Priecājos Tevi redzēt!
                <br />
                Pie mums vari iznomāt košus kostīmus,
                <br />
                satikt iemīļotus pasaku tēlus,
                <br />
                uzaicināt animatoru un iegādāties
                visu milzu ziepju burbuļu salūtam.
              </p>

            </div>

            <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-5">

              <Link
                href="/kostimu-noma"
                className="rounded-full bg-pink-500 px-8 py-4 font-semibold text-white transition hover:bg-pink-600"
              >
                Kostīmu noma
              </Link>

              <Link
                href="/veikals"
                className="rounded-full border-2 border-pink-500 bg-white px-8 py-4 font-semibold text-pink-500 transition hover:bg-pink-500 hover:text-white"
              >
                Burbulītes burbuļi
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* ================= MOBILE ================= */}

      <div className="relative isolate min-h-screen overflow-hidden lg:hidden">

        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFF7FB] to-[#FFE7F3]" />

        <div className="absolute left-1/2 top-0 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-pink-300/30 blur-[150px]" />

        <div className="absolute -left-32 top-72 h-[320px] w-[320px] rounded-full bg-pink-200/40 blur-[110px]" />

        <div className="absolute -right-24 top-48 h-[300px] w-[300px] rounded-full bg-pink-200/40 blur-[110px]" />

        <div className="absolute bottom-0 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-white/70 blur-[130px]" />

        {/* Hero image */}

        <div className="relative z-10 flex justify-center pt-2">

        {/* Hero image */}
<div className="relative z-10 flex justify-center pt-2">

  <Image
    src="/images/hero/hero-right.png"
    alt="Burbulīte"
    width={900}
    height={1100}
    priority
    className="relative z-10 w-[130%] max-w-[600px] -mt-12 object-contain"
  />

  {/* Gradient pāreja */}
  <div
    className="
      pointer-events-none
      absolute
      bottom-0
      left-0
      right-0
      h-56
      bg-gradient-to-b
      from-transparent
      via-[#FFF7FB]
      to-[#FFE7F3]
      z-20
    "
  />

</div>

        </div>
                {/* ================= CONTENT ================= */}

        <div className="relative z-20 -mt-16 px-6">

          {/* SVG virsraksts */}

          <div className="mt-5 flex justify-center">

    <Image
  src="/images/hero/group-10.svg"
  alt="Sveiki! Es esmu Burbulīte"
  width={1000}
  height={460}
  priority
  className="w-full max-w-[1000px] h-auto -mt-8"
/>
          </div>

          {/* Apraksts */}

          <p className="mx-auto mt-6 max-w-[340px] text-center text-[17px] leading-8 text-gray-600">
            Pie mums vari iznomāt košus kostīmus,
            satikt iemīļotus pasaku tēlus,
            uzaicināt animatoru un iegādāties
            visu milzu ziepju burbuļu salūtam.
          </p>

          {/* ================= CTA ================= */}

          <div className="mt-9 flex flex-col gap-4">

            <Link
              href="/kostimu-noma"
              className="group flex h-16 items-center justify-between rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 px-6 text-white shadow-[0_18px_40px_rgba(236,72,153,0.35)] transition active:scale-95"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <VenetianMask size={20} />
                </div>

                <span className="text-lg font-bold">
                  Kostīmu noma
                </span>

              </div>

              <ArrowRight size={22} />

            </Link>

            <Link
              href="/veikals"
              className="group flex h-16 items-center justify-between rounded-full border-2 border-pink-500 bg-white px-6 text-pink-500 shadow-lg transition active:scale-95"
            >
              <div className="flex items-center gap-4">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                  <Sparkles size={20} />
                </div>

                <span className="text-lg font-bold">
                  Burbulītes burbuļi
                </span>

              </div>

              <ArrowRight size={22} />

            </Link>

          </div>
        
</div>

</div>

</section>

  );
}