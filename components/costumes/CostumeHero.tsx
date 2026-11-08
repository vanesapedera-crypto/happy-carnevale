import Image from "next/image";
import Link from "next/link";
import { loadSectionCards } from "@/lib/costumeCatalog";
import { lp, tr, type Lang, type Tr } from "@/lib/i18n";
import { circleColor } from "@/components/costumes/costumeColors";
import { cutoutFor } from "@/lib/costumeCutouts";

type Props = {
  lang: Lang;
  title: Tr;
  description: Tr;
  /** No kurām admin sadaļām ņemt bildes slīdošajai parādei */
  sectionKeys: string[];
};

const CRUMB: Tr = { lv: "Kostīmu noma", ru: "Аренда костюмов", en: "Costume rental" };

/** Virsraksta pēdējos vārdus izceļ ar krāsu pāreju ("Gaisa plūsmas | kostīmu noma"). */
function splitTitle(text: string): [string, string] {
  const words = text.trim().split(/\s+/);
  const n = words.length >= 3 ? 2 : 1;
  return [words.slice(0, -n).join(" "), words.slice(-n).join(" ")];
}

/** Kategorijas lapas augšdaļa: virsraksts centrā un zem tā lēnām slīdoši kostīmi. */
export default async function CostumeHero({ lang, title, description, sectionKeys }: Props) {
  const lists = await Promise.all(sectionKeys.map((key) => loadSectionCards(key)));

  // Pa vienam no katras sadaļas pēc kārtas, lai parādē ir dažādība
  const seen = new Set<string>();
  const images: string[] = [];
  const longest = Math.max(0, ...lists.map((l) => l.length));
  for (let i = 0; i < longest && images.length < 12; i++) {
    for (const list of lists) {
      const img = cutoutFor(list[i]?.image);
      if (img && !seen.has(img) && images.length < 12) {
        seen.add(img);
        images.push(img);
      }
    }
  }
  const loop = images.length >= 4 ? [...images, ...images] : [];
  const [first, accent] = splitTitle(tr(lang, title));

  return (
    <section className="bg-[#F8F9FC] px-4 pt-4 lg:px-8 lg:pt-8">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-gradient-to-b from-white to-[#F6F1FF] pb-10 pt-10 text-center shadow-[0_20px_50px_rgba(23,23,23,0.05)] lg:rounded-[32px] lg:pb-14 lg:pt-16">
        <nav aria-label="Breadcrumb" className="px-6 text-[13px] font-semibold text-[#6E6A7C] lg:text-sm">
          <Link href={lp(lang, "/kostimu-noma")} className="transition hover:text-[#6C3BFF]">
            {tr(lang, CRUMB)}
          </Link>
          <span aria-hidden="true" className="mx-2">›</span>
          <span className="text-[#6C3BFF]">{tr(lang, title)}</span>
        </nav>

        <h1 className="mx-auto mt-4 max-w-5xl px-5 text-[40px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#14123A] lg:mt-5 lg:text-[64px] lg:leading-[1.02]">
          {first}{" "}
          <span className="bg-gradient-to-r from-[#6C3BFF] to-[#FF4BA5] bg-clip-text text-transparent">
            {accent}
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-[540px] px-6 text-base leading-7 text-[#4B4860] lg:mt-5 lg:text-lg lg:leading-8">
          {tr(lang, description)}
        </p>

        {loop.length > 0 && (
          <div aria-hidden="true" className="hc-marquee mt-8 overflow-hidden lg:mt-12">
            <div className="hc-marquee-track flex w-max gap-5 lg:gap-8">
              {loop.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="hc-marquee-item relative flex h-[180px] w-[150px] shrink-0 items-end justify-center lg:h-[260px] lg:w-[220px]"
                >
                  <div
                    className="absolute bottom-0 left-1/2 h-[140px] w-[140px] -translate-x-1/2 rounded-full lg:h-[200px] lg:w-[200px]"
                    style={{ background: circleColor(index % images.length) }}
                  />
                  <div className="relative h-[166px] w-full lg:h-[240px]">
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 220px, 150px"
                      className="object-contain object-bottom drop-shadow-[0_14px_16px_rgba(20,18,58,0.14)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
