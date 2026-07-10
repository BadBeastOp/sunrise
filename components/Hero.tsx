"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";
import { placeholderImage } from "@/lib/placeholder";

export default function Hero() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      {/* Background image with slow zoom */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-banner.jpg"
          alt="A single luxury jewellery piece resting in soft morning light"
          fill
          priority
          sizes="100vw"
          className="animate-slow-zoom object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex w-full max-w-[700px] flex-col items-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-xs font-medium uppercase tracking-wide2 text-white/80"
        >
          Fine Jewellery, Since First Light
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[650px] font-display text-5xl leading-[1.1] text-white md:text-6xl lg:text-7xl"
        >
          Radiance Worth Passing Down
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mx-auto mt-6 max-w-[560px] text-base leading-relaxed text-white/85 md:text-lg"
        >
          Each piece is hand-finished in small batches, designed to be worn
          today and inherited tomorrow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-wrap items-center justify-center gap-5"
        >
          <AnimatedButton href="#collections" variant="ghost-light" showArrow>
            Explore Collections
          </AnimatedButton>
          <AnimatedButton href="#about" variant="ghost-light">
            Our Story
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
}
