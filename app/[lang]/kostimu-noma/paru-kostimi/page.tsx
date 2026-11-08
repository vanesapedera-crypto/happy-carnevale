import type { Metadata } from "next";
import CostumeSection from "@/components/costumes/CostumeSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/paru-kostimi", {
    title: {
      lv: "Pāru kostīmu noma – kostīmi diviem | Happy Carnevale",
      ru: "Аренда парных костюмов – костюмы для двоих | Happy Carnevale",
      en: "Couples costume rental – costumes for two | Happy Carnevale",
    },
    description: {
      lv: "Pāru kostīmu noma ballītēm, karnevāliem un Helovīnam: saskaņoti tērpi diviem. Rīgā un visā Latvijā, rezervē tiešsaistē.",
      ru: "Аренда парных костюмов для вечеринок, карнавалов и Хэллоуина: согласованные образы для двоих. В Риге и по всей Латвии, бронирование онлайн.",
      en: "Couples costume rental for parties, carnivals and Halloween: matching outfits for two. In Riga and all over Latvia, book online.",
    },
  });
}

export default async function ParuKostimiPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <CostumeSection
        lang={lang}
        sectionKey="paru-kostimi"
        as="h1"
        topPadding
        heading={{ lv: "Pāru kostīmu noma", ru: "Аренда парных костюмов", en: "Couples costume rental" }}
        noun={{ lv: "pāru kostīma noma", ru: "аренда парного костюма", en: "couples costume rental" }}
        intro={{
          lv: "Saskaņoti kostīmi diviem – ballītēm, karnevāliem, Helovīnam un tematiskajiem pasākumiem.",
          ru: "Парные костюмы для двоих – для вечеринок, карнавалов, Хэллоуина и тематических мероприятий.",
          en: "Matching costumes for two – for parties, carnivals, Halloween and themed events.",
        }}
        emptyText={{
          lv: "Pāru kostīmi drīzumā! Pa to laiku zvani +371 26 126 313 – palīdzēsim atrast tērpus diviem.",
          ru: "Парные костюмы скоро появятся! А пока звоните +371 26 126 313 – поможем подобрать костюмы для двоих.",
          en: "Couples costumes coming soon! Meanwhile call +371 26 126 313 – we'll help you find outfits for two.",
        }}
      />
    </>
  );
}
