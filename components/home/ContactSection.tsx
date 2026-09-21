"use client";

import { FormEvent, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

const CONTACT_ITEMS = [
  { label: "Telefons", value: SITE.phone, href: SITE.phoneHref },
  { label: "E-pasts", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Adrese", value: SITE.address, href: undefined },
];

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="py-24 sm:py-32" id="kontakti">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          kicker="Sazinies ar mums"
          title="Runāsim par jūsu svētkiem"
          description="Raksti mums vai piezvani — palīdzēsim izvēlēties īsto kostīmu vai piedāvāt pilnu pasākuma risinājumu."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {CONTACT_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-3xl border border-ink/5 p-6"
                >
                  <span className="text-sm text-ink/45">{item.label}</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-1 block text-lg font-medium text-ink hover:text-primary"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="mt-1 block text-lg font-medium text-ink">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="aspect-[4/3] w-full overflow-hidden rounded-4xl border border-ink/5 sm:aspect-[16/9]">
              <iframe
                src={SITE.mapEmbedUrl}
                title="Happy Carneval atrašanās vieta kartē"
                loading="lazy"
                className="h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-4xl bg-primary-soft/40 p-8"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-ink">
                Vārds
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Tavs vārds"
                className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink placeholder:text-ink/35 focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-ink">
                E-pasts
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tavs@epasts.lv"
                className="rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink placeholder:text-ink/35 focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-ink">
                Ziņa
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Pastāsti par savu pasākumu..."
                className="resize-none rounded-2xl border border-ink/10 bg-white px-4 py-3 text-ink placeholder:text-ink/35 focus:border-primary"
              />
            </div>

            <Button type="submit" variant="primary" className="mt-2 w-full">
              {isSubmitted ? "Nosūtīts ✓" : "Nosūtīt ziņu"}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}
