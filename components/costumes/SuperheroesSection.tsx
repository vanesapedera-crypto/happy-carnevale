import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function SuperheroesSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="supervaroni"
      heading={{ lv: "Supervaroņi", ru: "Супергерои", en: "Superheroes" }}
      noun={{ lv: "kostīmu noma", ru: "аренда костюма", en: "costume rental" }}
    />
  );
}
