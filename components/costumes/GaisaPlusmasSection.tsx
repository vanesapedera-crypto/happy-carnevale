import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function GaisaPlusmasSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="gaisa-plusmas-kostimi"
      heading={{ lv: "Visi gaisa plūsmas kostīmi", ru: "Все надувные костюмы", en: "All inflatable costumes" }}
      noun={{ lv: "gaisa plūsmas kostīma noma", ru: "аренда надувного костюма", en: "inflatable costume rental" }}
    />
  );
}
