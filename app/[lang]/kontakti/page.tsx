import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";
import { pageMetadata, toLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/kontakti", {
    title: {
      lv: "Kontakti – Stabu iela 90, Rīga | Happy Carnevale",
      ru: "Контакты – ул. Стабу 90, Рига | Happy Carnevale",
      en: "Contact – Stabu iela 90, Riga | Happy Carnevale",
    },
    description: {
      lv: "Happy Carnevale kontakti: Stabu iela 90, Rīga, tālrunis +371 26 126 313, e-pasts carnevalehappy@gmail.com.",
      ru: "Контакты Happy Carnevale: ул. Стабу 90, Рига, телефон +371 26 126 313, эл. почта carnevalehappy@gmail.com.",
      en: "Happy Carnevale contact details: Stabu iela 90, Riga, phone +371 26 126 313, email carnevalehappy@gmail.com.",
    },
  });
}

export default async function ContactPage({ params }: Props) {
  const lang = toLang((await params).lang);
  return <ContactSection lang={lang} />;
}
