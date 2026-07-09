"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { useAppContext } from "@/lib/context";
import NewsletterSection from "@/components/shared/NewsletterSection";
import SectionTitle from "@/components/shared/SectionTitle";
import AnimatedButton from "@/components/shared/AnimatedButton";
import { Heart, ShoppingBag, Zap } from "lucide-react";

const newArrivals = products.filter(p => p.isNew);
const trending = products.filter(p => p.isBestseller).slice(0, 4);

export default function NewArrivalsPage() {
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-80px" });
  const trendRef = useRef<HTMLDivElement>(null);
  const trendInView = useInView(trendRef, { once: true, margin: "-80px" });
  const { cart, wishlist } = useAppContext();

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[480px] md:h-[580px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=1600&q=85"
          alt="New Arrivals"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pb-16 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] tracking-[0.45em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">
            Season&apos;s Edit
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
            className="font-cormorant font-light text-white text-5xl md:text-7xl leading-[0.9] mb-5">
            New Arrivals
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22 }}
            className="text-white/65 font-inter font-light text-sm max-w-sm leading-relaxed">
            The latest additions — each one a new chapter in the Sunrise Treasures story.
          </motion.p>
        </div>
      </div>

      {/* Drop Banner */}
      <div className="bg-[#111111] py-4 px-5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-3">
          <Zap size={14} className="text-[#C7A76C]" />
          <p className="text-[11px] tracking-[0.2em] font-inter text-white uppercase">
            New pieces added this season — <span className="text-[#C7A76C]">limited quantities</span>
          </p>
        </div>
      </div>

      {/* New Arrivals Grid */}
      <section ref={gridRef} className="py-20 md:py-28 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <SectionTitle eyebrow="Just Arrived" title="The New Edit" className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {newArrivals.map((product, i) => {
            const isWished = wishlist.isWishlisted(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden bg-[#F8F8F8] aspect-[3/4] mb-5">
                  <Link href={`/products/${product.slug}`}>
                    <img src={product.images?.[0] ?? product.image ?? ""} alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  </Link>
                  <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] font-inter font-semibold uppercase bg-[#C7A76C] text-white px-3 py-1.5">
                    New
                  </span>
                  <button
                    onClick={() => wishlist.toggle(product.id)}
                    className={cn(
                      "absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300",
                      isWished ? "bg-[#C7A76C] text-white" : "bg-white/80 text-[#6B6B6B] hover:text-[#C7A76C]"
                    )}
                  >
                    <Heart size={14} fill={isWished ? "currentColor" : "none"} />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400 bg-gradient-to-t from-black/60 to-transparent">
                    <button
                      onClick={() => cart.addItem(product)}
                      className="w-full py-3 bg-white text-[#111111] text-[10px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#C7A76C] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={13} /> Add to Bag
                    </button>
                  </div>
                </div>
                <p className="text-[9px] tracking-[0.25em] font-inter font-semibold uppercase text-[#6B6B6B] mb-1">{product.material}</p>
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-cormorant text-xl font-light mb-1 hover:text-[#C7A76C] transition-colors">{product.name}</h3>
                </Link>
                <span className="font-cormorant text-xl font-light">{formatPrice(product.price)}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Featured Drop */}
      <section className="relative py-28 overflow-hidden my-10">
        <img src="https://images.unsplash.com/photo-1573408301185-9519f94815f4?w=1600&q=85"
          alt="Featured drop" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-black/30" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }} className="max-w-lg"
          >
            <p className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-4">Featured Drop</p>
            <h2 className="font-cormorant font-light text-5xl md:text-6xl text-white leading-tight mb-6">
              The Serpent<br />Collection
            </h2>
            <p className="text-white/60 font-inter font-light text-sm mb-10 leading-relaxed">
              Mythology made wearable. Our latest collection draws from ancient symbols of protection and rebirth,
              rendered in 18K gold with hand-engraved detail.
            </p>
            <AnimatedButton href="/jewellery" variant="gold" arrow>Explore the Drop</AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Trending */}
      <section ref={trendRef} className="py-20 md:py-28 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <div className="flex items-end justify-between mb-12">
          <SectionTitle eyebrow="What&apos;s Hot" title="Trending Now" align="left" />
          <AnimatedButton href="/jewellery" variant="secondary" size="sm">View All</AnimatedButton>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trending.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              animate={trendInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09 }}
            >
              <Link href={`/products/${p.slug}`} className="group block">
                <div className="overflow-hidden bg-[#F8F8F8] aspect-[3/4] mb-3">
                  <img src={p.images?.[0] ?? p.image ?? ""} alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
                <h3 className="font-cormorant text-lg font-light group-hover:text-[#C7A76C] transition-colors">{p.name}</h3>
                <span className="font-cormorant text-lg font-light text-[#6B6B6B]">{formatPrice(p.price)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <NewsletterSection />
    </div>
  );
}