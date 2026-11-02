"use client";

import { motion } from "motion/react";
import { HeroName } from "@/components/hero-name";
import { NounBubble } from "@/components/noun-bubble";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-start justify-center px-6 text-left sm:pb-24 md:px-16 md:pb-28 lg:items-center lg:text-center">
      <HeroName />
      <motion.p
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.3, duration: 0.8, delay: 0.5 }}
        className="mt-3 ml-leg flex max-w-xs -translate-x-[0.0625em] flex-col items-start text-2xl font-medium tracking-tight xs:text-3xl lg:mt-4 lg:ml-0 lg:max-w-none lg:translate-x-0 lg:flex-row lg:items-center lg:text-4xl"
      >
        <span className="flex items-center whitespace-nowrap">
          is a <NounBubble />
        </span>
        <span className="leading-[2.5rem] xs:leading-[3rem] lg:leading-[4rem] lg:whitespace-nowrap">
          living and working in New York City.
        </span>
      </motion.p>
    </main>
  );
}
