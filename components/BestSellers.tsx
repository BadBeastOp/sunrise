"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "./Container";
import SectionTitle from "./SectionTitle";
import ProductCard, { type Product } from "./ProductCard";
// import { placeholderImage } from "@/lib/placeholder";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Solstice Signet Ring",
    price: "$1,240",
    image: "/images/product1.jpg",
  },
  {
    id: "2",
    name: "Meridian Layer Chain",
    price: "$980",
    image: "/images/product2.jpg",
  },
  {
    id: "3",
    name: "Aurora Drop Earrings",
    price: "$760",
    image: "/images/product3.jpg",
  },
  {
    id: "4",
    name: "Dawnlight Tennis Bracelet",
    price: "$2,150",
    image: "/images/product4.jpg",
  },
  {
    id: "5",
    name: "Halo Solitaire Ring",
    price: "$3,480",
    image: "/images/product5.jpg",
  },
  {
    id: "6",
    name: "Ember Pendant",
    price: "$890",
    image: "/images/product6.jpg",
  },
];

/**
 * Only showcases products for browsing — intentionally has no link
 * to a product detail page, per the landing-page-only scope.
 */
export default function BestSellers() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    scrollerRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-[70px] md:py-[90px] lg:py-section">
      <Container>
        <div className="flex items-end justify-between">
          <SectionTitle
            eyebrow="Most Loved"
            heading="Best Sellers"
            align="left"
            className="flex-1"
          />
          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold-deep"
            >
              <ChevronLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold-deep"
            >
              <ChevronRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mt-[60px] flex snap-x snap-mandatory gap-card overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
