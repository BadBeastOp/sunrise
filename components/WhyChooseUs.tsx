"use client";

import { motion } from "framer-motion";
import { Gem, ShieldCheck, Truck, Sparkles } from "lucide-react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";

const FEATURES = [
  {
    icon: Gem,
    title: "Ethically Sourced Stones",
    description:
      "Every diamond and gemstone is traceable to its origin, verified before it ever reaches the bench.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Craftsmanship Guarantee",
    description:
      "Free resizing, cleaning, and repair for as long as you own the piece.",
  },
  {
    icon: Truck,
    title: "Insured Complimentary Shipping",
    description:
      "Every order arrives fully insured, discreetly packaged, and tracked door to door.",
  },
  {
    icon: Sparkles,
    title: "Hand-Finished in Small Batches",
    description:
      "No mass production — each collection is finished in limited runs by our goldsmiths.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-surface py-[70px] md:py-[90px] lg:py-section">
      <Container>
        <SectionTitle
          eyebrow="Why Sunrise Treasures"
          heading="Quiet Confidence, Built In"
          subtitle="The details you don't see are the ones we obsess over most."
        />

        <div className="mt-[60px] grid grid-cols-1 gap-card sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex h-full flex-col items-center rounded-lux border border-border bg-white p-8 text-center"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface">
                  <Icon size={24} strokeWidth={1.5} className="text-gold-deep" />
                </div>
                <h3 className="font-display text-xl text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/60">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
