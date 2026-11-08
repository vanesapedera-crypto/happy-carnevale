import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function ZiemassvetkiSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="ziemassvetku-kostimi"
      heading={{ lv: "Visi Ziemassvētku kostīmi", ru: "Все рождественские костюмы", en: "All Christmas costumes" }}
      noun={{ lv: "Ziemassvētku kostīmu noma", ru: "аренда рождественского костюма", en: "Christmas costume rental" }}
    />
  );
}
