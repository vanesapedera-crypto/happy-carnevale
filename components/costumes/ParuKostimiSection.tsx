import CostumeSection from "@/components/costumes/CostumeSection";
import type { Lang } from "@/lib/i18n";

/** Pāru kostīmi – apakšsadaļa lapā "Smieklīgi tēli un parūkas". */
export default function ParuKostimiSection({ lang }: { lang: Lang }) {
  return (
    <CostumeSection
      lang={lang}
      sectionKey="paru-kostimi"
      heading={{ lv: "Pāru kostīmi", ru: "Парные костюмы", en: "Couples costumes" }}
      noun={{ lv: "pāru kostīma noma", ru: "аренда парного костюма", en: "couples costume rental" }}
      intro={{
        lv: "Saskaņoti kostīmi diviem – ballītēm, karnevāliem, Helovīnam un tematiskajiem pasākumiem.",
        ru: "Парные костюмы для двоих – для вечеринок, карнавалов, Хэллоуина и тематических мероприятий.",
        en: "Matching costumes for two – for parties, carnivals, Halloween and themed events.",
      }}
      emptyText={{
        lv: "Pāru kostīmi drīzumā! Pa to laiku zvani +371 26 126 313 – palīdzēsim atrast tērpus diviem.",
        ru: "Парные костюмы скоро появятся! А пока звоните +371 26 126 313 – поможем подобрать костюмы для двоих.",
        en: "Couples costumes coming soon! Meanwhile call +371 26 126 313 – we'll help you find outfits for two.",
      }}
    />
  );
}
