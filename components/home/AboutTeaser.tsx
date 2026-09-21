import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function AboutTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-5xl bg-sunshine-soft">
            <Image
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1400&auto=format&fit=crop"
              alt="Happy Carneval komanda gatavo kostīmus"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-start gap-5">
            <span className="text-sm font-medium text-secondary">Par mums</span>
            <h2 className="text-balance text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl">
              Svētku sajūtu radām jau vairāk nekā desmit gadus
            </h2>
            <p className="max-w-lg text-lg leading-relaxed text-ink/60">
              Happy Carneval komanda ik gadu palīdz simtiem ģimeņu un pasākumu
              rīkotāju atrast īsto tēlu. Rūpējamies par katru kostīmu un katru
              detaļu, lai jūsu svētki paliktu atmiņā.
            </p>
            <Button href="/par-mums" variant="outline">
              Vairāk par mums
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
