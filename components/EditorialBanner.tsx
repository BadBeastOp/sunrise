"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./Container";
import AnimatedButton from "./AnimatedButton";
// import { placeholderImage } from "@/lib/placeholder";

export default function EditorialBanner() {
  return (
    <section className="py-[70px] md:py-[90px] lg:py-section">
      <Container>
        <div className="flex h-auto flex-col overflow-hidden rounded-lux bg-surface lg:h-[650px] lg:flex-row">
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[360px] w-full lg:h-full lg:w-1/2"
          >
            <Image
              src="/images/editorial-banner.jpg"
              alt="A model wearing a layered gold necklace from the Meridian collection"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col items-start justify-center px-8 py-12 md:px-16 lg:w-1/2"
          >
            <span className="mb-3 text-xs font-medium uppercase tracking-wide2 text-gold-deep">
              Limited Edition
            </span>
            <h2 className="max-w-md font-display text-4xl leading-tight text-ink md:text-5xl">
              The Golden Hour Edit
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60 md:text-lg">
              A capsule of eighteen pieces inspired by the first and last
              light of the day. Once each is sold, it will not be recast.
            </p>
            <div className="mt-8">
              <AnimatedButton href="#" variant="primary" showArrow>
                Shop The Edit
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
