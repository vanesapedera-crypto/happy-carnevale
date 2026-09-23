import PageHero from "@/components/common/PageHero";
import SmiekligiTeliSection from "@/components/costumes/SmiekligiTeliSection";
import ParukasSection from "@/components/costumes/ParukasSection";
import RetroSection from "@/components/costumes/RetroSection";
import UzvalkiSection from "@/components/costumes/UzvalkiSection";

export default function CitiTeliPage() {
  return (
    <main className="scroll-smooth bg-white pb-16">
      <PageHero
        badge="KOSTĪMU NOMA"
        title="Smieklīgi tēli, parūkas un maskas"
        description="Izvēlies dažādus kostīmus bērnu ballītēm, tematiskajiem pasākumiem un karnevāliem."
        image="/images/hero/citi-teli.png"
      />

      {/* Navigācija */}
      <div className="relative z-20 bg-white py-2 shadow-sm">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto px-6">
          <a
            href="#smiekligi"
            className="whitespace-nowrap rounded-full bg-violet-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-violet-600"
          >
            Smieklīgi tēli
          </a>

          <a
            href="#parukas"
            className="whitespace-nowrap rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            Parūkas
          </a>

          <a
            href="#uzvalki"
            className="whitespace-nowrap rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            Uzvalki
          </a>

          <a
            href="#retro"
            className="whitespace-nowrap rounded-full border border-violet-200 bg-white px-5 py-3 text-sm font-semibold text-violet-600 transition hover:bg-violet-50"
          >
            Retro
          </a>
        </div>
      </div>

      <section id="smiekligi" className="scroll-mt-24">
        <SmiekligiTeliSection />
      </section>


      <section id="retro" className="scroll-mt-24">
        <RetroSection />
      </section>

      <section id="uzvalki" className="scroll-mt-24">
        <UzvalkiSection />
      </section>

       <section id="parukas" className="scroll-mt-24">
        <ParukasSection />
      </section>
    </main>
  );
}