import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BENEFITS } from "@/lib/data";

export default function WhyUs() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          align="center"
          kicker="Kāpēc mēs"
          title="Kāpēc izvēlēties Happy Carneval"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col gap-4 rounded-4xl border border-ink/5 p-8 transition-colors hover:border-primary/20 hover:bg-primary-soft/30"
            >
              <span className="text-3xl">{benefit.emoji}</span>
              <h3 className="text-lg font-semibold text-ink">{benefit.title}</h3>
              <p className="text-[15px] leading-relaxed text-ink/60">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
