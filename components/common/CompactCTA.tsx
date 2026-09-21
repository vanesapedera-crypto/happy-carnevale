import Image from "next/image";
import Link from "next/link";

interface CompactCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export default function CompactCTA({
  title,
  description,
  buttonText,
  buttonHref,
  image,
  secondaryText,
  secondaryHref,
}: CompactCTAProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-400 py-16 text-white">
      {/* Bilde fonā */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-30 mix-blend-overlay"
        />

        {/* Krāsu pārklājums, lai bilde saplūstu ar fonu */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/90 via-fuchsia-500/75 to-pink-400/85" />
      </div>

      {/* Saturs */}
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <div className="px-6 py-6 text-center">
          <h2 className="text-3xl font-black md:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={buttonHref}
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-pink-600 shadow-lg transition hover:scale-105"
            >
              {buttonText}
            </Link>

            {secondaryText && secondaryHref && (
              <Link
                href={secondaryHref}
                className="rounded-full border border-white/80 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-pink-600"
              >
                {secondaryText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}