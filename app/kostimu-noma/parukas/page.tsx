import PageHero from "@/components/common/PageHero";
import ParukasSection from "@/components/costumes/ParukasSection";

export default function ParukasPage() {
  return (
    <>
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Parūkas"
        description="Krāsainas, smieklīgas un tēliem atbilstošas parūkas dažādiem pasākumiem, kostīmiem un svētkiem."
        image="/images/hero/parukas.png"
      />

      <ParukasSection />
    </>
  );
}