import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function DzivniekiSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="dzivnieku-teli"
      heading={{ lv: "Dzīvnieku tēli", ru: "Животные", en: "Animal costumes" }}
      noun={{ lv: "kostīmu noma", ru: "аренда костюма", en: "costume rental" }}
    />
  );
}
