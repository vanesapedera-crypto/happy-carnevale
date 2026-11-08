import type { Metadata } from "next";
import CostumeHero from "@/components/costumes/CostumeHero";
import HelovinsSection from "@/components/costumes/HelovinsSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/helovins", {
    title: {
      lv: "Helovīna kostīmu un masku noma | Happy Carnevale",
      ru: "Аренда костюмов и масок на Хэллоуин | Happy Carnevale",
      en: "Halloween costume and mask rental | Happy Carnevale",
    },
    description: {
      lv: "Helovīna kostīmu un masku noma: raganas, skeleti, ķirbji un citi spocīgi tēli ballītēm. Rezervē laikus – Rīgā un visā Latvijā.",
      ru: "Аренда костюмов и масок на Хэллоуин: ведьмы, скелеты, тыквы и другие жуткие образы для вечеринок. Бронируйте заранее – в Риге и по всей Латвии.",
      en: "Halloween costume and mask rental: witches, skeletons, pumpkins and other spooky looks for parties. Book early – in Riga and all over Latvia.",
    },
  });
}

export default async function HelovinsPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <CostumeHero
        lang={lang}
        sectionKeys={["helovina-kostimi"]}
        title={{ lv: "Helovīna kostīmu un masku noma", ru: "Аренда костюмов и масок на Хэллоуин", en: "Halloween costume and mask rental" }}
        description={{ lv: "Raganas, skeleti, ķirbji un citi spocīgi tēli Helovīna ballītēm.", ru: "Ведьмы, скелеты, тыквы и другие жуткие образы для вечеринок на Хэллоуин.", en: "Witches, skeletons, pumpkins and other spooky looks for Halloween parties." }}
      />
      <HelovinsSection lang={lang} />
    </>
  );
}
