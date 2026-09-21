import type { Metadata } from "next";

import SurpriseCharacterSection from "@/components/events/SurpriseCharacterSection";

export const metadata: Metadata = {
  title: "Pārsteiguma tēls",
  description:
    "Pārsteiguma tēls bērnu svētkiem, dzimšanas dienām un īpašiem notikumiem.",
};

export default function SurpriseCharacterPage() {
  return <SurpriseCharacterSection />;
}