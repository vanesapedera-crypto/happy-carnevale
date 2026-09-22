import { Truck, ShieldCheck, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      {/* ================= DESKTOP ================= */}
      <section className="relative hidden overflow-hidden lg:block">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/shop/hero.png')",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg,#fff 0%,rgba(255,255,255,.96) 35%,rgba(255,255,255,.75) 55%,rgba(255,255,255,0) 80%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-6 pt-36">
          <div className="max-w-xl">
            <h1 className="text-6xl font-black leading-tight text-gray-900">
              Burbulītes Burbuļi
            </h1>

            <p className="mt-7 text-lg leading-8 text-gray-700">
              Profesionāli ziepju burbuļu koncentrāts, burbuļu komplekti un
              piederumi bērnu svētkiem, animatoriem un ikvienam, kurš vēlas
              radīt īstu burbuļu maģiju.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-8">
              <Feature
                icon={<Truck className="h-6 w-6 text-pink-500" />}
                title="Piegāde"
                text="Visā Latvijā"
              />

              <Feature
                icon={<ShieldCheck className="h-6 w-6 text-pink-500" />}
                title="Droši"
                text="Kvalitatīvi produkti"
              />

              <Feature
                icon={<Heart className="h-6 w-6 text-pink-500" />}
                title="Iecienīti"
                text="Bērnu svētkos"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MOBILE ================= */}
      <section className="relative lg:hidden">
        <div
          className="h-[450px] bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/shop/hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-white/20" />

          <div className="relative flex h-full flex-col justify-center px-6 pt-20">
            <div className="max-w-xs">
              <h1 className="text-4xl font-black leading-tight text-gray-900">
                Burbulītes Burbuļi
              </h1>

              <p className="mt-5 text-base leading-7 text-gray-700">
                Profesionāli ziepju burbuļu koncentrāts, burbuļu komplekti un
                piederumi bērnu svētkiem, animatoriem un ikvienam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100">
        {icon}
      </div>

      <div>
        <p className="font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{text}</p>
      </div>
    </div>
  );
}