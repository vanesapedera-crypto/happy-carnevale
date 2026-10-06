import type { Metadata } from "next";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Kontakti – Stabu iela 90, Rīga | Happy Carnevale",
  description:
    "Happy Carnevale kontakti: Stabu iela 90, Rīga, tālrunis +371 26 126 313, e-pasts carnevalehappy@gmail.com.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
    </>
  );
}