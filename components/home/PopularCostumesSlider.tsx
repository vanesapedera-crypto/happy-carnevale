"use client";

import { useRef } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { POPULAR_COSTUMES } from "@/lib/data";

export default function PopularCostumesSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (amount: number) => {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-secondary-soft/40 py-24 sm:py-32">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            kicker="Iecienītākie"
            title="Populārākie kostīmi"
            description="Šos tēlus izvēlas visbiežāk — rezervē savu, pirms to izvēlējies kāds cits."
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-320)}
              aria-label="Iepriekšējie kostīmi"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-primary/30 hover:text-primary"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(320)}
              aria-label="Nākamie kostīmi"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/10 bg-white text-ink transition-colors hover:border-primary/30 hover:text-primary"
            >
              →
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 scrollbar-hide sm:px-8 lg:px-12"
      >
        {POPULAR_COSTUMES.map((costume) => (
          <div
            key={costume.id}
            className="flex w-64 shrink-0 snap-start flex-col gap-4 rounded-4xl bg-white p-4 shadow-soft"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-primary-soft">
              <Image
                src={costume.image}
                alt={costume.name}
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-3 px-1 pb-1">
              <span className="font-medium text-ink">{costume.name}</span>
              <Button href="/kontakti" variant="outline" className="w-full py-2.5 text-sm">
                Rezervēt
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
