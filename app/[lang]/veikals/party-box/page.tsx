import type { Metadata } from "next";
import PartyBoxConfigurator from "@/components/shop/PartyBoxConfigurator";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/veikals/party-box", {
    title: {
      lv: "Party Box – milzu ziepju burbuļu komplekts | Happy Carnevale",
      ru: "Party Box – набор для гигантских мыльных пузырей | Happy Carnevale",
      en: "Party Box – giant soap bubble set | Happy Carnevale",
    },
    description: {
      lv: "Izvēlies sev piemērotāko Party Box komplektu ar burbuļu šķidrumu un kociņiem ballītei.",
      ru: "Выберите подходящий набор Party Box с жидкостью и палочками для пузырей для вашего праздника.",
      en: "Choose the Party Box set with bubble solution and wands that suits your party.",
    },
  });
}

export default function PartyBoxPage() {
  return <PartyBoxConfigurator />;
}
