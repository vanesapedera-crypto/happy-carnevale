import Image from "next/image";
import Link from "next/link";
import { lp, tr, type Lang } from "@/lib/i18n";

const program = [
  { lv: "Jūsu izvēlēts pasaku tēls (Rūķītis, Ziemassvētku vecītis vai pat Grinčs) ierodas ar teatrālu uzvedumu un iepazīstas ar bērniem", ru: "Выбранный вами сказочный герой (гном, Дед Мороз или даже Гринч) появляется с театральным представлением и знакомится с детьми", en: "The fairy-tale character of your choice (an elf, Santa Claus or even the Grinch) arrives with a theatrical show and gets to know the kids" },
  { lv: "Izspēlē jautras rotaļas un aizraujošus uzdevumus, pielāgotus bērnu vecumam", ru: "Весёлые игры и увлекательные задания, подобранные по возрасту детей", en: "Plays fun games and exciting challenges suited to the children's age" },
  { lv: "Iesaista dejās un interesantās aktivitātēs", ru: "Вовлекает в танцы и интересные занятия", en: "Gets everyone dancing and joining in fun activities" },
  { lv: "Ja bērniem ir sagatavotas dāvaniņas, mūsu svētku viesis ar prieku tās izdalīs, nofotogrāfēsies", ru: "Если для детей приготовлены подарки, наш праздничный гость с радостью их вручит и сфотографируется", en: "If you have gifts for the kids, our festive guest will happily hand them out and pose for photos" },
];

export default function ZiemassvetkiEventSection({ lang }: { lang: Lang }) {
  return (
    <div className="bg-[#0E2A1F] text-white">
      {/* Sākums ar lielu bildi */}
      <section className="relative flex min-h-[460px] items-end lg:min-h-[560px]">
        <Image
          src="/images/hero/ziemassvetki.jpg"
          alt={tr(lang, { lv: "Ziemassvētku programma bērniem", ru: "Новогодняя программа для детей", en: "Christmas show for kids" })}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E2A1F]/5 via-[#0E2A1F]/50 via-55% to-[#0E2A1F]" />

        <div className="relative w-full px-6 pb-10 text-center lg:pb-14">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-red-300 lg:px-5 lg:text-sm">
            {tr(lang, { lv: "Pasākumu organizēšana", ru: "Организация праздников", en: "Party services" })}
          </span>

          <h1 className="mt-5 text-5xl font-bold tracking-tight lg:text-7xl">
            {tr(lang, { lv: "Ziemassvētki", ru: "Рождество", en: "Christmas" })}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 lg:text-xl">
            {tr(lang, { lv: "Burvīgs Ziemassvētku piedzīvojums bērniem!", ru: "Волшебное рождественское приключение для детей!", en: "A magical Christmas adventure for kids!" })}
          </p>
        </div>
      </section>

      {/* Saturs */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-8 text-center lg:pb-24 lg:pt-10">
        <div className="mx-auto max-w-3xl space-y-3 text-base leading-7 text-white/85 lg:text-lg lg:leading-8">
          <p>
            {tr(lang, { lv: "Ar prieku noorganizēsim atraktīvu un bērnu vecumam piemērotu Ziemassvētku izklaides programmu!", ru: "С радостью организуем яркую новогоднюю развлекательную программу, подходящую по возрасту детей!", en: "We'll happily put on a lively Christmas entertainment programme suited to the children's age!" })}
          </p>
          <p>
            {tr(lang, { lv: "Iespēja uzaicināt mūs ciemos uz bērnudārzu, skolu vai jebkuru Jūsu pasākuma vietu.", ru: "Можно пригласить нас в детский сад, школу или на любую вашу площадку.", en: "You can invite us to a kindergarten, school or any venue of your choice." })}
          </p>
        </div>

        <h2 className="mt-14 text-3xl font-bold text-red-300 lg:text-4xl">
          {tr(lang, { lv: "Kas sagaida mazos svētku dalībniekus?", ru: "Что ждёт маленьких участников праздника?", en: "What's in store for the little guests?" })}
        </h2>

        <p className="mt-3 font-semibold text-white/85">{tr(lang, { lv: "Svētku programmā:", ru: "В праздничной программе:", en: "The festive programme:" })}</p>

        <div className="mt-8 grid gap-4 text-left lg:grid-cols-2">
          {program.map((item, i) => (
            <div
              key={item.lv}
              className="flex items-start gap-4 rounded-3xl border border-red-300/30 bg-white/[0.06] px-5 py-5 lg:px-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-600 font-bold">
                {i + 1}
              </span>
              <span className="text-[15px] font-semibold leading-relaxed lg:text-base">
                {tr(lang, item)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-2xl font-bold lg:text-3xl">
            {tr(lang, { lv: "Bez steigas un piespiedu dzejolīšiem!", ru: "Без спешки и стихов по принуждению!", en: "No rush and no forced rhymes!" })}
          </h3>
          <p className="mt-2 text-base text-white/85 lg:text-lg">
            {tr(lang, { lv: "Mūsu mērķis ir, lai bērni jūtas brīvi, iesaistās un patiesi izbauda svētkus!", ru: "Наша цель – чтобы дети чувствовали себя свободно, участвовали и по-настоящему наслаждались праздником!", en: "Our goal is for the kids to feel relaxed, join in and truly enjoy the celebration!" })}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-[32px] bg-gradient-to-br from-red-900 to-red-600 p-8 lg:p-10">
          <p className="text-base leading-7 lg:text-lg lg:leading-8">
            {tr(lang, { lv: "Ziemassvētku programmas izmaksas atkarīgas no Jūsu vēlamā datuma, vietas, bērnu skaita, tādēļ aicinām uzrakstīt mums, pastāstīt savas vēlmes un mēs noteikti atradīsim labāko svētku programmu tieši Jums! :)", ru: "Стоимость новогодней программы зависит от желаемой даты, места и количества детей, поэтому напишите нам, расскажите о своих пожеланиях – и мы обязательно подберём лучшую праздничную программу именно для вас! :)", en: "The price of the Christmas programme depends on your preferred date, venue and number of children, so drop us a message with your wishes and we'll find the perfect festive programme for you! :)" })}
          </p>

          <Link
            href={lp(lang, "/kontakti")}
            className="mt-6 inline-flex rounded-2xl bg-white px-7 py-3.5 font-bold text-red-700 transition hover:bg-red-50"
          >
            {tr(lang, { lv: "Sazināties", ru: "Связаться", en: "Contact us" })}
          </Link>
        </div>
      </section>
    </div>
  );
}
