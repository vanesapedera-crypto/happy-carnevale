import type { Metadata } from "next";
import CostumeHero from "@/components/costumes/CostumeHero";
import PrincessesSection from "@/components/costumes/PrincessesSection";
import SuperheroesSection from "@/components/costumes/SuperheroesSection";
import MultfilmuSection from "@/components/costumes/MultfilmuSection";
import ProfessionsSection from "@/components/costumes/ProfessionsSection";
import DzivniekiSection from "@/components/costumes/DzivniekiSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/filmu-un-pasaku-teli", {
    title: {
      lv: "Kino un multfilmu tēlu kostīmu noma | Happy Carnevale",
      ru: "Аренда костюмов героев фильмов и мультфильмов | Happy Carnevale",
      en: "Movie and cartoon character costume rental | Happy Carnevale",
    },
    description: {
      lv: "Kino, multfilmu un pasaku tēlu kostīmu noma: princeses, supervaroņi, profesiju un dzīvnieku tērpi ballītēm un karnevāliem. Rīgā un visā Latvijā.",
      ru: "Аренда костюмов героев фильмов, мультфильмов и сказок: принцессы, супергерои, профессии и животные для вечеринок и карнавалов. В Риге и по всей Латвии.",
      en: "Movie, cartoon and fairy-tale character costume rental: princesses, superheroes, professions and animals for parties and carnivals. In Riga and all over Latvia.",
    },
  });
}

export default async function FilmuUnPasakuTeliPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <CostumeHero
        lang={lang}
        sectionKeys={["princeses-un-fejas", "supervaroni", "kino-teli", "profesijas", "dzivnieku-teli"]}
        title={{
          lv: "Kino tēlu un citu kostīmu noma",
          ru: "Аренда костюмов героев фильмов и не только",
          en: "Movie character and other costume rental",
        }}
        description={{
          lv: "Izvēlies iemīļotākos filmu, multfilmu un pasaku varoņus bērnu ballītēm, tematiskajiem pasākumiem un karnevāliem.",
          ru: "Выбирайте любимых героев фильмов, мультфильмов и сказок для детских праздников, тематических мероприятий и карнавалов.",
          en: "Choose favourite movie, cartoon and fairy-tale heroes for kids' parties, themed events and carnivals.",
        }}
      />

      <PrincessesSection lang={lang} />
      <SuperheroesSection lang={lang} />
      <MultfilmuSection lang={lang} />
      <ProfessionsSection lang={lang} />
      <DzivniekiSection lang={lang} />
    </>
  );
}
