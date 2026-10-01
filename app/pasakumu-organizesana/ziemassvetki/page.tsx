import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import ZiemassvetkiEventSection from "@/components/events/ZiemassvetkiEventSection";

export const metadata: Metadata = {
  title: "Ziemassvētku programma bērniem – Rūķītis, Ziemassvētku vecītis, Grinčs | Happy Carnevale",
  description:
    "Ziemassvētku izklaides programma bērniem bērnudārzā, skolā vai Jūsu pasākuma vietā: teatrāls uzvedums, rotaļas, dejas un dāvaniņu izdalīšana. Bez steigas un piespiedu dzejolīšiem!",
};

export default function ZiemassvetkiPasakumsPage() {
  return (
    <>
      <PageHero
        badge="PASĀKUMU ORGANIZĒŠANA"
        title="Ziemassvētki"
        description="Burvīgs Ziemassvētku piedzīvojums bērniem!"
        image="/images/hero/ziemassvetki.png"
      />

      <ZiemassvetkiEventSection />
    </>
  );
}
