import PageHero from "@/components/common/PageHero";
import MascotaSection from "@/components/costumes/MascotaSection";

export default function MascotaTeliPage() {
  return (
    <>
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Mascota tēli"
        description="Lielizmēra Mascota kostīmi bērnu ballītēm, uzņēmumu pasākumiem, reklāmas aktivitātēm un svētkiem. Iecienītākie tēli, kas rada neaizmirstamas emocijas."
        image="/images/hero/mascota.png"
      />

      <MascotaSection />
    </>
  );
}