import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function HelovinsSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="helovina-kostimi"
      heading={{ lv: "Visi Helovīna kostīmi un maskas", ru: "Все костюмы и маски на Хэллоуин", en: "All Halloween costumes and masks" }}
      noun={{ lv: "Helovīna kostīmu noma", ru: "аренда костюма на Хэллоуин", en: "Halloween costume rental" }}
    />
  );
}
