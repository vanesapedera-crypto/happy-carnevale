import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function SmiekligiTeliSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="smiekligi-teli"
      heading={{ lv: "Smieklīgi tēli", ru: "Смешные персонажи", en: "Funny characters" }}
      noun={{ lv: "kostīmu noma", ru: "аренда костюма", en: "costume rental" }}
    />
  );
}
