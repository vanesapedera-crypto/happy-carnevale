import { Phone, Mail, MapPin, Clock } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const TX = {
  lv: {
    eyebrow: "KONTAKTI",
    title: "Sazinies ar mums",
    intro:
      "Ja Tev radušies jautājumi par kostīmu nomu, animatoriem, pārsteiguma tēliem vai pasūtījumiem, droši sazinies ar mums.",
    info: "Kontaktinformācija",
    phone: "Tālrunis",
    email: "E-pasts",
    hours: "Darba laiks",
    everyDay: "Katru dienu",
    fast: "Atbildam pēc iespējas ātrāk.",
    important: "Svarīga informācija",
    onlineShop:
      "Happy Carnevale ir interneta veikals. Mums nav fiziska veikala, kuru iespējams apmeklēt ikdienā.",
    pickup: "Kostīmu saņemšana",
    address: "Stabu iela 90, Rīga",
    pickupNote: "Pasūtījumus iespējams saņemt tikai pēc iepriekšējas vienošanās.",
  },
  ru: {
    eyebrow: "КОНТАКТЫ",
    title: "Свяжитесь с нами",
    intro:
      "Если у вас есть вопросы об аренде костюмов, аниматорах, персонажах-сюрпризах или заказах, смело пишите или звоните нам.",
    info: "Контактная информация",
    phone: "Телефон",
    email: "Эл. почта",
    hours: "Время работы",
    everyDay: "Каждый день",
    fast: "Отвечаем как можно быстрее.",
    important: "Важная информация",
    onlineShop:
      "Happy Carnevale — интернет-магазин. У нас нет физического магазина, который можно посетить в любое время.",
    pickup: "Получение костюмов",
    address: "ул. Стабу 90, Рига",
    pickupNote: "Заказ можно получить только по предварительной договорённости.",
  },
  en: {
    eyebrow: "CONTACT",
    title: "Get in touch",
    intro:
      "If you have any questions about costume rental, entertainers, surprise characters or orders, feel free to contact us.",
    info: "Contact details",
    phone: "Phone",
    email: "Email",
    hours: "Opening hours",
    everyDay: "Every day",
    fast: "We reply as quickly as we can.",
    important: "Good to know",
    onlineShop:
      "Happy Carnevale is an online shop. We don't have a walk-in store that you can visit at any time.",
    pickup: "Costume pick-up",
    address: "Stabu iela 90, Riga",
    pickupNote: "Orders can be collected by prior arrangement only.",
  },
};

export default function ContactSection({ lang }: { lang: Lang }) {
  const t = TX[lang];
  return (
    <section className="bg-[#FFF7FB] pt-16 pb-20 lg:pt-12 lg:pb-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Virsraksts */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-[0.3em] text-pink-500">{t.eyebrow}</p>

          <h1 className="mt-4 text-4xl font-black text-[#17223b] md:text-5xl">{t.title}</h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">{t.intro}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-2">
          {/* Kreisā puse */}
          <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-lg lg:p-10">
            <h3 className="text-3xl font-black text-[#17223b]">{t.info}</h3>

            <div className="mt-8 space-y-7">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                  <Phone className="h-6 w-6 text-pink-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">{t.phone}</p>

                  <a
                    href="tel:+37126126313"
                    className="text-lg font-bold text-[#17223b] hover:text-pink-500"
                  >
                    +371 26126313
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                  <Mail className="h-6 w-6 text-pink-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">{t.email}</p>

                  <a
                    href="mailto:carnevalehappy@gmail.com"
                    className="break-all text-lg font-bold text-[#17223b] hover:text-pink-500"
                  >
                    carnevalehappy@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-100">
                  <Clock className="h-6 w-6 text-pink-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-500">{t.hours}</p>

                  <p className="text-lg font-semibold text-[#17223b]">{t.everyDay}</p>

                  <p className="text-gray-500">{t.fast}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Labā puse */}
          <div className="rounded-3xl bg-gradient-to-br from-pink-500 to-fuchsia-500 p-6 text-white shadow-xl lg:p-10">
            <h3 className="text-3xl font-black">{t.important}</h3>

            <p className="mt-6 leading-8 text-pink-100">{t.onlineShop}</p>

            <div className="mt-8 flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
                <MapPin className="h-7 w-7" />
              </div>

              <div>
                <h4 className="text-2xl font-bold">{t.pickup}</h4>

                <p className="mt-2 font-semibold text-pink-100">{t.address}</p>

                <p className="mt-4 leading-7 text-pink-100">{t.pickupNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
