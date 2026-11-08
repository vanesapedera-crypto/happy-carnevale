import type { Metadata } from "next";
import ZiemassvetkiSection from "@/components/costumes/ZiemassvetkiSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kostimu-noma/ziemassvetki", {
    title: {
      lv: "Ziemassvētku kostīmu noma – vecītis, rūķis, Grinčs | Happy Carnevale",
      ru: "Аренда рождественских костюмов – Дед Мороз, гном, Гринч | Happy Carnevale",
      en: "Christmas costume rental – Santa, elf, Grinch | Happy Carnevale",
    },
    description: {
      lv: "Ziemassvētku kostīmu noma: Ziemassvētku vecītis, rūķis, Grinčs, sniegavīrs, Sniegbaltīte un egle. Rezervē laikus svētku pasākumam.",
      ru: "Аренда рождественских костюмов: Дед Мороз, гном, Гринч, снеговик, Белоснежка и ёлка. Бронируйте заранее для праздничного мероприятия.",
      en: "Christmas costume rental: Santa Claus, elf, Grinch, snowman, Snow White and Christmas tree. Book early for your festive event.",
    },
  });
}

export default async function ZiemassvetkiPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return (
    <>
      <ZiemassvetkiSection lang={lang} />
    </>
  );
}
