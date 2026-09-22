import Image from "next/image";

interface PageHeroProps {
  badge: string;
  title: string;
  description: string;
  image: string;
}

export default function PageHero({
  badge,
  title,
  description,
  image,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#f7f9ff] py-8 lg:min-h-[400px] lg:flex lg:items-center">
      {/* Dekorācijas */}
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

      {/* Mobilais fona attēls */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="100vw"
className="object-cover object-top opacity-35"        />
        <div className="absolute inset-0 bg-white/70" />
      </div>

      {/* Saturs */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center lg:grid-cols-2">
          <div className="py-6 lg:py-16">
            <span className="inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-pink-600 lg:px-5 lg:text-sm">
              {badge}
            </span>

            <h1 className="mt-5 text-4xl font-black leading-tight text-gray-900 lg:mt-8 lg:max-w-3xl lg:text-6xl">
              {title}
            </h1>

            <div className="mt-6 h-1 w-20 rounded-full bg-pink-500 lg:mt-8 lg:w-24" />

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-700 lg:mt-8 lg:text-xl lg:leading-9">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop bilde */}
      <div className="absolute inset-y-0 right-0 hidden w-[52vw] lg:block">
        <div className="relative h-full w-full">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="52vw"
            className="object-contain object-right object-bottom"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 8%, rgba(0,0,0,0.2) 18%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.88) 54%, black 68%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 8%, rgba(0,0,0,0.2) 18%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.7) 42%, rgba(0,0,0,0.88) 54%, black 68%, black 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}