import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/", {
    title: {
      lv: "Happy Carnevale – kostīmu noma, animatori un ziepju burbuļi",
      ru: "Happy Carnevale – аренда костюмов, аниматоры и мыльные пузыри",
      en: "Happy Carnevale – costume rental, entertainers and soap bubbles",
    },
    description: {
      lv: "Kostīmu noma pieaugušajiem, animatori bērnu svētkiem, pārsteiguma tēli un ziepju burbuļu veikals. Rīgā un visā Latvijā, piegāde uz jebkuru pakomātu.",
      ru: "Аренда костюмов для взрослых, аниматоры на детские праздники, персонажи-сюрпризы и магазин мыльных пузырей. В Риге и по всей Латвии, доставка в любой пакомат.",
      en: "Adult costume rental, kids' party entertainers, surprise characters and a soap bubble shop. In Riga and all over Latvia, delivery to any parcel locker.",
    },
  });
}

export default async function Home({ params }: Props) {
  const lang = toLang((await params).lang);
  return <Hero lang={lang} />;
}
