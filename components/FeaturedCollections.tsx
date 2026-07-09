"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import { placeholderImage } from "@/lib/placeholder";

const COLLECTIONS = [
  {
    name: "Solstice Rings",
    seed: "collection-rings",
  },
  {
    name: "Meridian Necklaces",
    seed: "collection-necklaces",
  },
  {
    name: "Aurora Earrings",
    seed: "collection-earrings",
  },
];

export default function FeaturedCollections() {
  return (
    <section
      id="collections"
      className="py-[70px] md:py-[90px] lg:py-section"
    >
      <Container>
        <SectionTitle
          eyebrow="Curated Edits"
          heading="Featured Collections"
          subtitle="Three signatures, each built around a single defining shape rather than a season."
        />

        <div className="mt-[60px] grid grid-cols-1 gap-card md:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((collection, index) => (
            <motion.a
              href="#"
              key={collection.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8 }}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lux"
            >
              <Image
                src={placeholderImage(collection.seed, 800, 1000)}
                alt={collection.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                <span className="font-display text-2xl text-white">
                  {collection.name}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/60 text-white transition-colors group-hover:bg-white group-hover:text-ink">
                  <ArrowUpRight size={18} strokeWidth={1.5} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
