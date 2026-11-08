import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

export default function ParukasSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="parukas"
      heading={{ lv: "Parūkas", ru: "Парики", en: "Wigs" }}
      noun={{ lv: "parūku noma", ru: "аренда парика", en: "wig rental" }}
      intro={{ lv: "Krāsainas, smieklīgas un tēliem atbilstošas parūkas dažādiem pasākumiem, kostīmiem un svētkiem.", ru: "Яркие, смешные и подходящие к образу парики для разных мероприятий, костюмов и праздников.", en: "Colourful, funny and character wigs for all kinds of events, costumes and parties." }}
    />
  );
}
