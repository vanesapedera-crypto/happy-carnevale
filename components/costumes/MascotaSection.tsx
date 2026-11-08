import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function MascotaSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="mascota-teli"
      heading={{ lv: "Maskoti", ru: "Ростовые куклы", en: "Mascots" }}
      noun={{ lv: "mascota tēla noma", ru: "аренда ростовой куклы", en: "mascot costume rental" }}
    />
  );
}
