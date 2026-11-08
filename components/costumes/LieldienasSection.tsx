import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function LieldienasSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="lieldienu-kostimi"
      heading={{ lv: "Lieldienu kostīmu noma", ru: "Аренда пасхальных костюмов", en: "Easter costume rental" }}
      noun={{ lv: "Lieldienu kostīmu noma", ru: "аренда пасхального костюма", en: "Easter costume rental" }}
      as="h1"
      topPadding
    />
  );
}
