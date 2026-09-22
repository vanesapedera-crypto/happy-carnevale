import Image from "next/image";
import Link from "next/link";


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
    quality={100}
    priority
    className="absolute -right-36 bottom-0 z-10 h-[98%] w-auto object-contain select-none"
  />

  <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6">

    <div className="relative -ml-8 w-full max-w-[780px]">

      {/* SVG */}
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

      {/* Pogas */}
<div className="absolute bottom-20 left-1/2 -translate-x-1/2 translate-y-5">
  <Link
    href="/kostimu-noma"
    className="
      flex
      h-10
      w-[250px]
      items-center
      justify-center
      rounded-full
      bg-gradient-to-r
      from-pink-500
      to-pink-500
      text-base
      font-semibold
      text-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-0.5
      hover:shadow-xl
    "
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
  <div className="absolute inset-0 bg-gradient-to-b from-white via-[#FFF7FB] to-[#FFE7F3]" />

  <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-pink-300/30 blur-[140px]" />

  <div className="absolute -left-24 top-72 h-[280px] w-[280px] rounded-full bg-pink-200/40 blur-[100px]" />

  <div className="absolute -right-20 top-44 h-[260px] w-[260px] rounded-full bg-pink-200/40 blur-[100px]" />

  {/* Hero */}
  <div className="relative z-10">

    <div className="flex justify-center pt-2">

      <Image
        src="/images/hero/hero-right.png"
        alt="Burbulīte"
        width={900}
        height={1100}
        priority
        className="w-[118%] max-w-[520px] -mt-4 object-contain"
      />

    </div>

  </div>

  {/* Content */}
  <div className="relative z-30 -mt-14 px-6 pb-14">

    {/* PNG virsraksts */}

    <div className="flex justify-center">

      <Image
        src="/images/hero/group-10.png"
        alt="Sveiki! Es esmu Burbulīte"
        width={1000}
        height={460}
        priority
        unoptimized
        className="block w-full max-w-[380px] h-auto"
      />

    </div>

    {/* Apraksts */}

    <p className="mx-auto mt-6 max-w-[320px] text-center text-[16px] leading-7 text-gray-600">
      Pie mums vari iznomāt košus kostīmus,
      satikt iemīļotus pasaku tēlus un
      radīt neaizmirstamus svētkus.
    </p>

    {/* CTA */}

    <div className="mt-8">

      <Link
        href="/kostimu-noma"
        className="flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-lg font-bold text-white shadow-lg transition hover:opacity-95 active:scale-95"
      >
        Kostīmu noma
      </Link>

    </div>

  </div>

</div>

</section>

  );
}