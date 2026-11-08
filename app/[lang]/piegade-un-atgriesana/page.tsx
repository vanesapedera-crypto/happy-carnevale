import type { Metadata } from "next";
import Link from "next/link";
import { SHIPPING, SITE } from "@/lib/constants";
import { lp, pageMetadata, toLang, tr, type Lang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = toLang((await params).lang);
  return pageMetadata(lang, "/piegade-un-atgriesana", {
    title: {
      lv: "Piegāde un preču atgriešana | Happy Carnevale",
      ru: "Доставка и возврат товаров | Happy Carnevale",
      en: "Delivery and returns | Happy Carnevale",
    },
    description: {
      lv: "Veikala pasūtījumu piegāde uz pakomātu visā Latvijā vai saņemšana Rīgā, Stabu ielā 90. Preču atgriešana 14 dienu laikā.",
      ru: "Доставка заказов в пакомат по всей Латвии или самовывоз в Риге, ул. Стабу 90. Возврат товара в течение 14 дней.",
      en: "Shop orders delivered to a parcel locker anywhere in Latvia or collected in Riga, Stabu iela 90. Returns within 14 days.",
    },
  });
}

const money = (value: number, lang: Lang) =>
  lang === "en" ? `€${value.toFixed(2)}` : `${value.toFixed(2).replace(".", ",")} €`;

const h2 = "mt-10 text-2xl font-bold text-gray-900";
const ul = "mt-4 list-disc space-y-2 pl-5 leading-7 text-gray-700";
const p = "mt-4 leading-7 text-gray-700";
const a = "text-pink-600 hover:underline";

/** Veikala (ziepju burbuļu) piegādes un atgriešanas noteikumi. Uz šo lapu norāda arī Google Merchant Center. */
export default async function DeliveryReturnsPage({ params }: Props) {
  const lang = toLang((await params).lang);
  const locker = money(SHIPPING.parcelLocker, lang);
  const free = money(SHIPPING.freeFrom, lang);
  const shop = lp(lang, "/veikals");
  const email = (
    <a href={`mailto:${SITE.email}`} className={a}>
      {SITE.email}
    </a>
  );
  const phone = (
    <a href={SITE.phoneHref} className={a}>
      {SITE.phone}
    </a>
  );

  return (
    <main className="bg-[#fff7fb] py-16 lg:py-20">
      <article className="mx-auto max-w-3xl rounded-[32px] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-10">
        {lang === "lv" && (
          <>
            <h1 className="text-3xl font-black text-gray-900 lg:text-4xl">Piegāde un preču atgriešana</h1>
            <p className="mt-3 text-gray-500">
              Attiecas uz pasūtījumiem mūsu{" "}
              <Link href={shop} className={a}>
                veikalā
              </Link>{" "}
              (ziepju burbuļu šķidrums, burbuļu kociņi, Party Box).
            </p>

            <h2 className={h2}>Piegāde</h2>
            <ul className={ul}>
              <li>
                <strong>Uz pakomātu visā Latvijā</strong> – {locker}. Pasūtījumiem no {free} piegāde ir bez
                maksas.
              </li>
              <li>
                <strong>Saņemšana klātienē</strong> – {SITE.address}, bez maksas, pēc saskaņošanas.
              </li>
              <li>Pasūtījumu izsūtām 1–2 darba dienu laikā, ceļā līdz pakomātam tas ir 1–2 darba dienas.</li>
              <li>Burbuļu kociņu Nr.5 (90 cm) tā izmēra dēļ var saņemt tikai klātienē.</li>
            </ul>

            <h2 className={h2}>Preču atgriešana (atteikuma tiesības)</h2>
            <ul className={ul}>
              <li>
                Preci var atgriezt <strong>14 dienu laikā</strong> no tās saņemšanas dienas, nepaskaidrojot
                iemeslu.
              </li>
              <li>Prece jāatgriež nelietota, oriģinālajā iepakojumā.</li>
              <li>
                Atvērtu (attaisītu) ziepju burbuļu koncentrātu higiēnas un kvalitātes apsvērumu dēļ atpakaļ
                nepieņemam.
              </li>
              <li>Preces atpakaļsūtīšanas izmaksas sedz pircējs.</li>
              <li>
                Lai atgrieztu preci, uzraksti mums uz {email} vai zvani {SITE.phone}, norādot pasūtījuma
                numuru.
              </li>
              <li>
                Naudu par preci atmaksājam 14 dienu laikā pēc tam, kad esam saņēmuši atteikumu, bet ne ātrāk kā
                saņemta atgrieztā prece.
              </li>
            </ul>

            <h2 className={h2}>Bojāta vai nepareiza prece</h2>
            <p className={p}>
              Ja saņēmi bojātu vai nepareizu preci, lūdzu, sazinies ar mums. Preci apmainīsim vai atmaksāsim
              naudu, un šajā gadījumā sūtīšanas izmaksas sedzam mēs.
            </p>

            <h2 className={h2}>Kontakti</h2>
          </>
        )}

        {lang === "ru" && (
          <>
            <h1 className="text-3xl font-black text-gray-900 lg:text-4xl">Доставка и возврат товаров</h1>
            <p className="mt-3 text-gray-500">
              Относится к заказам в нашем{" "}
              <Link href={shop} className={a}>
                магазине
              </Link>{" "}
              (жидкость для мыльных пузырей, палочки для пузырей, Party Box).
            </p>

            <h2 className={h2}>Доставка</h2>
            <ul className={ul}>
              <li>
                <strong>В пакомат по всей Латвии</strong> – {locker}. При заказе от {free} доставка
                бесплатная.
              </li>
              <li>
                <strong>Самовывоз</strong> – ул. Стабу 90, Рига, LV-1009, бесплатно, по договорённости.
              </li>
              <li>Отправляем заказ в течение 1–2 рабочих дней, доставка до пакомата занимает 1–2 рабочих дня.</li>
              <li>Палочку для пузырей №5 (90 см) из-за её размера можно получить только самовывозом.</li>
            </ul>

            <h2 className={h2}>Возврат товара (право отказа)</h2>
            <ul className={ul}>
              <li>
                Товар можно вернуть <strong>в течение 14 дней</strong> со дня получения без объяснения
                причин.
              </li>
              <li>Товар должен быть неиспользованным, в оригинальной упаковке.</li>
              <li>
                Открытый концентрат для мыльных пузырей по соображениям гигиены и качества мы обратно не
                принимаем.
              </li>
              <li>Расходы на обратную пересылку оплачивает покупатель.</li>
              <li>
                Чтобы вернуть товар, напишите нам на {email} или позвоните по номеру {SITE.phone}, указав
                номер заказа.
              </li>
              <li>
                Деньги за товар возвращаем в течение 14 дней после получения отказа, но не раньше, чем получим
                возвращённый товар.
              </li>
            </ul>

            <h2 className={h2}>Повреждённый или неправильный товар</h2>
            <p className={p}>
              Если вы получили повреждённый или не тот товар, пожалуйста, свяжитесь с нами. Мы обменяем товар
              или вернём деньги, а расходы на пересылку в этом случае оплатим мы.
            </p>

            <h2 className={h2}>Контакты</h2>
          </>
        )}

        {lang === "en" && (
          <>
            <h1 className="text-3xl font-black text-gray-900 lg:text-4xl">Delivery and returns</h1>
            <p className="mt-3 text-gray-500">
              Applies to orders from our{" "}
              <Link href={shop} className={a}>
                shop
              </Link>{" "}
              (soap bubble solution, bubble wands, Party Box).
            </p>

            <h2 className={h2}>Delivery</h2>
            <ul className={ul}>
              <li>
                <strong>To a parcel locker anywhere in Latvia</strong> – {locker}. Free delivery on orders
                from {free}.
              </li>
              <li>
                <strong>Pick-up in person</strong> – Stabu iela 90, Riga, LV-1009, free of charge, by
                arrangement.
              </li>
              <li>We ship orders within 1–2 working days; delivery to the parcel locker takes 1–2 working days.</li>
              <li>Bubble wand No. 5 (90 cm) can only be collected in person because of its size.</li>
            </ul>

            <h2 className={h2}>Returns (right of withdrawal)</h2>
            <ul className={ul}>
              <li>
                You can return an item <strong>within 14 days</strong> of receiving it without giving a
                reason.
              </li>
              <li>The item must be unused and in its original packaging.</li>
              <li>For hygiene and quality reasons we cannot accept opened soap bubble concentrate.</li>
              <li>The buyer pays the cost of sending the item back.</li>
              <li>
                To return an item, email us at {email} or call {SITE.phone} and include your order number.
              </li>
              <li>
                We refund the payment within 14 days of receiving your withdrawal notice, but not before we
                have received the returned item.
              </li>
            </ul>

            <h2 className={h2}>Damaged or wrong item</h2>
            <p className={p}>
              If you received a damaged or wrong item, please contact us. We will replace it or refund your
              money, and in this case we cover the shipping costs.
            </p>

            <h2 className={h2}>Contact</h2>
          </>
        )}

        <p className={p}>
          Happy Carnevale ·{" "}
          {tr(lang, { lv: SITE.address, ru: "ул. Стабу 90, Рига, LV-1009", en: "Stabu iela 90, Riga, LV-1009" })} ·{" "}
          {phone} · {email}
        </p>
      </article>
    </main>
  );
}
