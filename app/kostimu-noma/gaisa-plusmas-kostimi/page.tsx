import PageHero from "@/components/common/PageHero";
import GaisaPlusmasSection from "@/components/costumes/GaisaPlusmasSection";

export default function GaisaPlusmasKostimiPage() {
  return (
    <>
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Gaisa plūsmas kostīmi"
        description="Krāsaini un iespaidīgi piepūšamie kostīmi bērnu ballītēm, tematiskajiem pasākumiem un svētkiem."
        image="/images/hero/gaisa-plusmas.png"
      />

      <GaisaPlusmasSection />
    </>
  );
}