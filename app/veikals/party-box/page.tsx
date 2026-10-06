import type { Metadata } from "next";
import PartyBoxConfigurator from "@/components/shop/PartyBoxConfigurator";

export const metadata: Metadata = {
  title: "Party Box – milzu ziepju burbuļu komplekts | Happy Carnevale",
  description:
    "Izvēlies sev piemērotāko Party Box komplektu ar burbuļu šķidrumu un kociņiem ballītei.",
};

export default function PartyBoxPage() {
  return (
    <>
      <PartyBoxConfigurator />
    </>
  );
}