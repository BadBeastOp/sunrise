"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./Container";
import AnimatedButton from "./AnimatedButton";
// import { placeholderImage } from "@/lib/placeholder";

export default function AboutSection() {
  return (
    <section id="about" className="py-[70px] md:py-[90px] lg:py-section">
      <Container>
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-lux lg:w-[45%]"
          >
            <Image
              src="/images/about.jpg"
              alt="A jeweller shaping a gold setting by hand in the Sunrise Treasures atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col items-start justify-center lg:w-[55%]"
          >
            <div className="max-w-[520px]">
              <span className="mb-3 block text-xs font-medium uppercase tracking-wide2 text-gold-deep">
                Our Craft
              </span>
              <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
                Made Slowly, On Purpose
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink/60 md:text-lg">
                Sunrise Treasures began with a single bench and a belief that
                jewellery should be built to outlast trends. Every setting is
                still shaped by hand, checked twice, and finished only when a
                master goldsmith is satisfied it deserves to be worn for
                decades — not just a season.
              </p>
              <div className="mt-8">
                <AnimatedButton href="#about" variant="secondary" showArrow>
                  Read Our Story
                </AnimatedButton>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
