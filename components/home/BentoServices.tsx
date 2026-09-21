"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { BENTO_SERVICES, BentoService } from "@/lib/data";

const SIZE_CLASSES: Record<BentoService["size"], string> = {
  large: "sm:col-span-2 sm:row-span-2 aspect-square sm:aspect-auto",
  medium: "sm:col-span-2 aspect-[16/10]",
  small: "aspect-[4/3]",
};

const ACCENT_SHADOW: Record<BentoService["accent"], string> = {
  primary: "hover:shadow-primary",
  secondary: "hover:shadow-secondary",
  accent: "hover:shadow-accent",
  sunshine: "hover:shadow-sunshine",
};

const ACCENT_RING: Record<BentoService["accent"], string> = {
  primary: "group-hover:ring-primary/30",
  secondary: "group-hover:ring-secondary/30",
  accent: "group-hover:ring-accent/30",
  sunshine: "group-hover:ring-sunshine/40",
};

export default function BentoServices() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="flex flex-col gap-12">
        <SectionHeading
          kicker="Ko piedāvājam"
          title="Viss svētku noskaņas radīšanai"
          description="Kostīmu noma ir mūsu sirdslieta — un ap to esam izveidojuši pilnu pakalpojumu klāstu jebkuram pasākumam."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 sm:[grid-auto-flow:dense]">
          {BENTO_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
              className={SIZE_CLASSES[service.size]}
            >
              <Link
                href={service.href}
                className={`group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-4xl ring-1 ring-transparent transition-all duration-500 ${ACCENT_SHADOW[service.accent]} ${ACCENT_RING[service.accent]}`}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 640px) 40vw, 90vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

                <div className="relative flex flex-col gap-1 p-6">
                  <h3 className="text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  {service.size !== "small" && (
                    <p className="max-w-xs text-sm leading-relaxed text-white/80">
                      {service.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
