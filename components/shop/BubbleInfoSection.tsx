import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { SHIPPING } from "@/lib/constants";

const money = (value: number) => `${value.toFixed(2).replace(".", ",")} €`;

const FAQ: { q: string; a: string }[] = [
  {
    q: "Kā pagatavot milzu ziepju burbuļu šķidrumu?",
    a: "Mūsu ziepju burbuļu šķidrums ir koncentrāts. Pirms lietošanas pudeli rūpīgi sakrati un atšķaidi ar siltu ūdeni pēc uz iepakojuma norādītās proporcijas, tad viegli samaisi. Gatavo šķidrumu lej plašā traukā, kurā var iemērkt burbuļu kociņu.",
  },
  {
    q: "Kādu burbuļu kociņu izvēlēties?",
    a: "Kociņš Nr.1 (50 cm) ir viegls un īpaši piemērots bērniem – ar to veido vienu lielu burbuli. Kociņi Nr.2–Nr.4 (70 cm) ir lielākiem bērniem un pieaugušajiem: viens milzu burbulis, trīs burbuļi vienā līnijā vai vairāki lieli burbuļi vienlaikus. Kociņš Nr.5 (90 cm) veido daudz mazu burbuļu uzreiz.",
  },
  {
    q: "Kādos laikapstākļos burbuļi izdodas vislabāk?",
    a: "Vislielākie un izturīgākie burbuļi sanāk bezvēja vai viegla vēja laikā un mitrā gaisā, piemēram, mākoņainā dienā vai vakarā. Karstā saulē un stiprā vējā burbuļi plīst ātrāk.",
  },
  {
    q: "Kā saņemt pasūtījumu?",
    a: `Pasūtījumu var saņemt Rīgā vai ar piegādi uz pakomātu visā Latvijā. Piegāde uz pakomātu maksā ${money(
      SHIPPING.parcelLocker
    )}, bet pasūtījumiem no ${money(SHIPPING.freeFrom)} – bez maksas. Garo kociņu Nr.5 pakomātā nesūtām.`,
  },
  {
    q: "Kas ir Party Box?",
    a: "Party Box ir gatavs komplekts ziepju burbuļu ballītei – burbuļu šķidrums kopā ar Tevis izvēlētiem burbuļu kociņiem. Lieliski piemērots bērnu dzimšanas dienai, izlaidumam vai āra svētkiem.",
  },
  {
    q: "Vai var pasūtīt arī burbuļu šovu svētkos?",
    a: "Jā – bērnu svētkos un pasākumos mūsu animatori var parūpēties arī par milzu ziepju burbuļiem. Sīkāk sadaļā par animatoriem.",
  },
];

/** Veikala lapas teksts un biežākie jautājumi par ziepju burbuļiem (arī Google). */
export default function BubbleInfoSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-3xl font-black text-gray-900 lg:text-4xl">
          Milzu ziepju burbuļi mājās, ballītē un svētkos
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-8 text-gray-600">
          <p>
            Ziepju burbuļi ir viens no vienkāršākajiem veidiem, kā sagādāt prieku gan bērniem, gan
            pieaugušajiem. Ar mūsu profesionālo <strong>ziepju burbuļu šķidrumu</strong> un lielajiem{" "}
            <strong>burbuļu kociņiem</strong> var izpūst milzīgus, krāsās mirdzošus burbuļus, kas
            pārsteidz jebkuru – dzimšanas dienā, izlaidumā, kāzās, fotosesijā vai vienkārši pagalmā.
          </p>
          <p>
            Piedāvājam ziepju burbuļu koncentrātu 3 L un 5 L iepakojumā, burbuļu kociņus no 50 līdz
            90 cm un <Link href="/veikals/party-box" className="font-semibold text-pink-600 hover:underline">Party Box</Link>{" "}
            komplektus. Pasūtījumu var saņemt Rīgā vai ar piegādi uz pakomātu visā Latvijā.
          </p>
        </div>

        <h2 className="mt-14 text-2xl font-black text-gray-900 lg:text-3xl">Biežākie jautājumi</h2>
        <div className="mt-6 divide-y divide-pink-100 rounded-3xl border border-pink-100 bg-[#FFF7FB]">
          {FAQ.map((item) => (
            <details key={item.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-gray-900">
                {item.q}
                <span className="text-2xl text-pink-500 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-7 text-gray-600">
                {item.a}
                {item.q.startsWith("Vai var pasūtīt") && (
                  <>
                    {" "}
                    <Link href="/pasakumu-organizesana/animatori" className="font-semibold text-pink-600 hover:underline">
                      Animatori →
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
