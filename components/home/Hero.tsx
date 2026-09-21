"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-sunshine/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-8xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-12 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-start gap-6 lg:pr-6"
        >
          <span className="rounded-full bg-primary-soft px-4 py-2 text-sm font-medium text-primary">
            Kostīmu noma bērniem un pieaugušajiem
          </span>

          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.2rem]">
            Atrodi savu tēlu svētkiem
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-ink/60">
            Plaša kostīmu noma bērniem un pieaugušajiem. Mascoti, pasaku tēli,
            gaisa plūsmas kostīmi, animatori un radošās darbnīcas — vienuviet.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button href="/kostimu-noma" variant="primary">
              🩷 Skatīt kostīmus
            </Button>
            <Button href="/kontakti" variant="outline">
              🤍 Rezervēt
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
        >
          <div className="blob-mask relative h-full w-full overflow-hidden bg-secondary-soft">
            <Image
              src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?q=80&w=1400&auto=format&fit=crop"
              alt="Bērns kostīmā svin karnevālu"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -left-6 top-10 hidden animate-float rounded-3xl bg-white p-4 shadow-soft sm:flex sm:items-center sm:gap-3">
            <span className="text-2xl">🎈</span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-ink">200+</span>
              <span className="text-xs text-ink/50">kostīmu izvēle</span>
            </div>
          </div>

          <div className="absolute -right-4 bottom-12 hidden animate-float-slow rounded-3xl bg-white p-4 shadow-soft sm:flex sm:items-center sm:gap-3">
            <span className="text-2xl">✨</span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-ink">Ātra</span>
              <span className="text-xs text-ink/50">rezervācija</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
