import {
  Truck,
  ShieldCheck,
  Heart,
} from "lucide-react";
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">

      {/* Fona bilde */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/shop/hero.png')",
        }}
      />

      {/* Baltais gradients */}
<div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,.96) 35%, rgba(255,255,255,.75) 55%, rgba(255,255,255,0) 80%)",
  }}
/>
      {/* Saturs */}
      
<div className="relative mx-auto flex min-h-[640px] max-w-7xl items-center px-6 pt-28 lg:pt-36">
        <div className="max-w-xl">
          
<h1 className="mt-8 text-5xl font-black leading-tight text-gray-900 lg:text-6xl xl:text-7xl">
  <span className="whitespace-nowrap">
    Burbulītes Burbuļi
  </span>
</h1>

<p className="mt-7 max-w-lg text-lg leading-8 text-gray-700">
              Profesionāli ziepju burbuļu koncentrāts, burbuļu komplekti un
            piederumi bērnu svētkiem, animatoriem un ikvienam, kurš vēlas
            radīt īstu burbuļu maģiju.
          </p>

          {/* Priekšrocības */}
          <div className="mt-10 flex flex-wrap gap-10">

  <div className="mt-12 grid grid-cols-3 gap-8">

  <div className="flex items-center gap-4">

    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100">
      <Truck className="h-6 w-6 text-pink-500" />
    </div>

    <div>
      <p className="font-semibold text-gray-900">
        Piegāde
      </p>

      <p className="text-sm text-gray-600">
        Visā Latvijā
      </p>
    </div>

  </div>

  <div className="flex items-center gap-4">

    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100">
      <ShieldCheck className="h-6 w-6 text-pink-500" />
    </div>

    <div>
      <p className="font-semibold text-gray-900">
        Droši
      </p>

      <p className="text-sm text-gray-600">
        Kvalitatīvi produkti
      </p>
    </div>

  </div>

  <div className="flex items-center gap-4">

    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-pink-100">
      <Heart className="h-6 w-6 text-pink-500" />
    </div>

    <div>
      <p className="font-semibold text-gray-900">
        Iecienīti
      </p>

      <p className="text-sm text-gray-600">
        Bērnu svētkos
      </p>
    </div>

  </div>

</div>

          </div>

        </div>

      </div>
    </section>
  );
}