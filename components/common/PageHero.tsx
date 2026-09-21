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
    <section className="relative overflow-hidden bg-[#f7f9ff] py-24 lg:min-h-[720px] lg:flex lg:items-center">
      {/* Background dekorācijas */}
      <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-sky-200/30 blur-3xl" />

      {/* Teksts */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6">
        <div className="grid items-center lg:grid-cols-2">
          <div className="py-10 lg:py-16">
            <span className="inline-flex rounded-full bg-violet-100 px-5 py-2 text-sm font-bold uppercase tracking-[0.35em] text-violet-600">
              {badge}
            </span>

            <h1 className="mt-8 max-w-3xl text-5xl font-black leading-tight text-gray-900 lg:text-6xl">
              {title}
            </h1>

            <div className="mt-8 h-1 w-24 rounded-full bg-violet-500" />

            <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-600">
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

      {/* Mobilā bilde */}
      <div className="relative mt-8 px-6 lg:hidden">
        <div className="relative mx-auto h-[360px] w-full max-w-[600px]">
          <Image
            src={image}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-contain object-bottom"
            style={{
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.7) 40%, black 65%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.35) 18%, rgba(0,0,0,0.7) 40%, black 65%, black 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}