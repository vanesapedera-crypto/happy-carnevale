import type { Metadata } from "next";
import ZiemassvetkiSection from "@/components/costumes/ZiemassvetkiSection";

export const metadata: Metadata = {
  title: "Ziemassvētku kostīmu noma – vecītis, rūķis, Grinčs | Happy Carnevale",
  description:
    "Ziemassvētku kostīmu noma: Ziemassvētku vecītis, rūķis, Grinčs, sniegavīrs, Sniegbaltīte un egle. Rezervē laikus svētku pasākumam.",
};

export default function ZiemassvetkiPage() {
  return (
    <>

      <ZiemassvetkiSection />
    </>
  );
}