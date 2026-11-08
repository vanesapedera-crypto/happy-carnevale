import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function HelovinsSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="helovina-kostimi"
      heading={{ lv: "Helovīna kostīmu un masku noma", ru: "Аренда костюмов и масок на Хэллоуин", en: "Halloween costume and mask rental" }}
      noun={{ lv: "Helovīna kostīmu noma", ru: "аренда костюма на Хэллоуин", en: "Halloween costume rental" }}
      as="h1"
    />
  );
}
