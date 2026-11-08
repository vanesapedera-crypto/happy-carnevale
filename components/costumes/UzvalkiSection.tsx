import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function UzvalkiSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="uzvalki"
      heading={{ lv: "Uzvalki", ru: "Костюмы-тройки", en: "Suits" }}
      noun={{ lv: "kostīmu noma", ru: "аренда костюма", en: "costume rental" }}
    />
  );
}
