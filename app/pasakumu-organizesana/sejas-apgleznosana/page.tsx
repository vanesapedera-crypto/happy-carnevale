import type { Metadata } from "next";

import AboutSection from "@/components/facepainting/AboutSection";

export const metadata: Metadata = {
  title: "Sejas apgleznošana",
  description:
    "Profesionāla sejas apgleznošana bērnu svētkiem, festivāliem un pasākumiem.",
};

export default function FacePaintingPage() {
  return (
    <>
      <AboutSection />
    </>
  );
}