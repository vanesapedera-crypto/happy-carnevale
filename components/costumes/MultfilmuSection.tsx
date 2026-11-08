import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function MultfilmuSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="kino-teli"
      heading={{ lv: "Kino tēli un citi interesanti kostīmi", ru: "Герои фильмов и другие интересные костюмы", en: "Movie characters and other fun costumes" }}
      noun={{ lv: "kostīmu noma", ru: "аренда костюма", en: "costume rental" }}
    />
  );
}
