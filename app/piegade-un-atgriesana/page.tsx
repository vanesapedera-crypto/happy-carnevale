import type { Metadata } from "next";
import Link from "next/link";
import { SHIPPING, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Piegāde un preču atgriešana | Happy Carnevale",
  description:
    "Veikala pasūtījumu piegāde uz pakomātu visā Latvijā vai saņemšana Rīgā, Stabu ielā 90. Preču atgriešana 14 dienu laikā.",
};

const money = (value: number) => `${value.toFixed(2).replace(".", ",")} €`;

/** Veikala (ziepju burbuļu) piegādes un atgriešanas noteikumi. Uz šo lapu norāda arī Google Merchant Center. */
export default function DeliveryReturnsPage() {
  return (
    <main className="bg-[#fff7fb] py-16 lg:py-20">
      <article className="mx-auto max-w-3xl rounded-[32px] bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-10">
        <h1 className="text-3xl font-black text-gray-900 lg:text-4xl">Piegāde un preču atgriešana</h1>
        <p className="mt-3 text-gray-500">
          Attiecas uz pasūtījumiem mūsu <Link href="/veikals" className="text-pink-600 hover:underline">veikalā</Link>{" "}
          (ziepju burbuļu šķidrums, burbuļu kociņi, Party Box).
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">Piegāde</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-gray-700">
          <li>
            <strong>Uz pakomātu visā Latvijā</strong> – {money(SHIPPING.parcelLocker)}. Pasūtījumiem no{" "}
            {money(SHIPPING.freeFrom)} piegāde ir bez maksas.
          </li>
          <li>
            <strong>Saņemšana klātienē</strong> – {SITE.address}, bez maksas, pēc saskaņošanas.
          </li>
          <li>Pasūtījumu izsūtām 1–2 darba dienu laikā, ceļā līdz pakomātam tas ir 1–2 darba dienas.</li>
          <li>Burbuļu kociņu Nr.5 (90 cm) tā izmēra dēļ var saņemt tikai klātienē.</li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">Preču atgriešana (atteikuma tiesības)</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-gray-700">
          <li>
            Preci var atgriezt <strong>14 dienu laikā</strong> no tās saņemšanas dienas, nepaskaidrojot iemeslu.
          </li>
          <li>Prece jāatgriež nelietota, oriģinālajā iepakojumā.</li>
          <li>
            Atvērtu (attaisītu) ziepju burbuļu koncentrātu higiēnas un kvalitātes apsvērumu dēļ atpakaļ
            nepieņemam.
          </li>
          <li>Preces atpakaļsūtīšanas izmaksas sedz pircējs.</li>
          <li>
            Lai atgrieztu preci, uzraksti mums uz{" "}
            <a href={`mailto:${SITE.email}`} className="text-pink-600 hover:underline">
              {SITE.email}
            </a>{" "}
            vai zvani {SITE.phone}, norādot pasūtījuma numuru.
          </li>
          <li>
            Naudu par preci atmaksājam 14 dienu laikā pēc tam, kad esam saņēmuši atteikumu, bet ne ātrāk kā
            saņemta atgrieztā prece.
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">Bojāta vai nepareiza prece</h2>
        <p className="mt-4 leading-7 text-gray-700">
          Ja saņēmi bojātu vai nepareizu preci, lūdzu, sazinies ar mums. Preci apmainīsim vai atmaksāsim
          naudu, un šajā gadījumā sūtīšanas izmaksas sedzam mēs.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-gray-900">Kontakti</h2>
        <p className="mt-4 leading-7 text-gray-700">
          Happy Carnevale · {SITE.address} · <a href={SITE.phoneHref} className="text-pink-600 hover:underline">{SITE.phone}</a> ·{" "}
          <a href={`mailto:${SITE.email}`} className="text-pink-600 hover:underline">{SITE.email}</a>
        </p>
      </article>
    </main>
  );
}
