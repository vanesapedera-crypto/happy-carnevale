import PageHero from "@/components/common/PageHero";
import RadosasDarbnicasSection from "@/components/events/RadosasDarbnicasSection";

export default function RadosasDarbnicasPage() {
  return (
    <>
      <PageHero
        badge="PASĀKUMU ORGANIZĒŠANA"
        title="Radošās darbnīcas"
        description="Piedāvājums juridiskām personām — radošas un pielāgojamas darbnīcas pasākumiem, uzņēmumu svētkiem un bērnu dienām."
        image="/images/hero/radosas-darbnicas.png"
      />

      <RadosasDarbnicasSection />
    </>
  );
}