"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import NewsletterSection from "@/components/shared/NewsletterSection";
import SectionTitle from "@/components/shared/SectionTitle";
import StoryBlock from "@/components/shared/StoryBlock";
import AnimatedButton from "@/components/shared/AnimatedButton";
import { Gem, Star, Calendar } from "lucide-react";

const engagementProducts = products.filter(
  p => p.subcategory === "engagement" || p.category === "rings"
);

const ringCategories = [
  { name: "Solitaire", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85", desc: "The timeless one-stone setting" },
  { name: "Halo", image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=85", desc: "A crown of brilliance" },
  { name: "Three Stone", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=85", desc: "Past, present, future" },
  { name: "Pavé", image: "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=600&q=85", desc: "Continuous sparkle" },
];

const diamondGuide = [
  { title: "Cut", desc: "The cut determines how light travels through a diamond, creating brilliance and fire. We offer Excellent and Ideal grades only." },
  { title: "Colour", desc: "Colour is graded D to Z. Our collection features D–G diamonds, representing the near-colourless to colourless spectrum." },
  { title: "Clarity", desc: "Clarity refers to naturally occurring inclusions. Our minimum standard is SI1 — invisible to the naked eye." },
  { title: "Carat", desc: "Carat measures weight, not size. Our rings range from 0.5ct to 3.0ct, all available with GIA certification." },
];

const testimonials = [
  { name: "Madeleine R.", location: "London", quote: "He proposed on the banks of the Seine. The ring was perfect — I said yes before he finished the question.", product: "Célestia Solitaire" },
  { name: "Camille & Thomas", location: "Montréal", quote: "We chose together, and the experience was as special as the ring itself.", product: "Three-Stone Legacy" },
];

export default function EngagementPage() {
  const guideRef = useRef<HTMLDivElement>(null);
  const guideInView = useInView(guideRef, { once: true, margin: "-80px" });
  const catsRef = useRef<HTMLDivElement>(null);
  const catsInView = useInView(catsRef, { once: true, margin: "-80px" });
  const testiRef = useRef<HTMLDivElement>(null);
  const testiInView = useInView(testiRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1600&q=85"
          alt="Engagement rings"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pb-20 w-full">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="text-[10px] tracking-[0.45em] text-[#C7A76C] font-inter font-semibold uppercase mb-4"
            >
              The Beginning of Forever
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
              className="font-cormorant font-light text-white text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6"
            >
              Say Yes with<br /><em className="italic">Sunrise</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
              className="text-white/65 font-inter font-light text-base mb-10 max-w-sm leading-relaxed"
            >
              Engagement rings handcrafted in platinum and 18K gold, set with GIA-certified diamonds and ethically sourced gemstones.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <AnimatedButton href="/jewellery" variant="gold" arrow>Explore Rings</AnimatedButton>
              <AnimatedButton href="/contact" variant="ghost">Book a Consultation</AnimatedButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <section className="py-24 md:py-32 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <SectionTitle eyebrow="Our Edit" title="The Engagement Collection" subtitle="Each ring is crafted for the story you're about to tell." className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {engagementProducts.slice(0, 6).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link href={`/products/${p.slug}`} className="group block">
                <div className="relative overflow-hidden bg-[#F8F8F8] aspect-square mb-4">
                  <img
                    src={p.images?.[0] ?? p.image ?? ""} alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  {p.isNew && (
                    <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] font-inter font-semibold uppercase bg-[#111111] text-white px-2.5 py-1">New</span>
                  )}
                </div>
                <p className="text-[9px] tracking-[0.25em] font-inter font-semibold uppercase text-[#6B6B6B] mb-1">{p.material}</p>
                <h3 className="font-cormorant text-xl font-light mb-1 group-hover:text-[#C7A76C] transition-colors">{p.name}</h3>
                <span className="font-cormorant text-xl font-light text-[#111111]">{formatPrice(p.price)}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <StoryBlock
          eyebrow="Our Story"
          title="Crafted for the moment that changes everything"
          body={[
            "Every engagement ring we craft begins with one question: what do you want to say? The answer shapes everything — the metal, the stone, the silhouette.",
            "Our master goldsmiths, with decades of experience in Geneva's finest ateliers, transform your vision into a ring that will be worn every day for the rest of a life.",
          ]}
          image="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=85"
          imagePosition="right"
          stat1={{ value: "37+", label: "Years of craft" }}
          stat2={{ value: "100%", label: "Ethically sourced" }}
          cta={{ label: "Our Craftsmanship", href: "/about" }}
        />
      </section>

      {/* Ring Categories */}
      <section ref={catsRef} className="py-20 md:py-28 bg-[#F8F8F8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <SectionTitle eyebrow="Find Your Style" title="Ring Settings" className="mb-14" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ringCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                animate={catsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Link href="/jewellery" className="group block">
                  <div className="overflow-hidden aspect-square mb-4 bg-white">
                    <img
                      src={cat.image} alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    />
                  </div>
                  <h3 className="font-cormorant text-xl font-light mb-1 group-hover:text-[#C7A76C] transition-colors">{cat.name}</h3>
                  <p className="text-[11px] text-[#6B6B6B] font-inter">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diamond Guide */}
      <section ref={guideRef} className="py-24 md:py-32 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <SectionTitle eyebrow="Education" title="The Diamond Guide" subtitle="Understanding the four pillars of a diamond's character." className="mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {diamondGuide.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={guideInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="border border-[#ECECEC] p-8 hover:border-[#C7A76C] transition-colors duration-400 group"
            >
              <div className="w-12 h-12 border border-[#C7A76C]/30 group-hover:border-[#C7A76C] flex items-center justify-center mb-6 transition-colors duration-400">
                <Gem size={20} className="text-[#C7A76C]" />
              </div>
              <h3 className="font-cormorant text-2xl font-light mb-3">{item.title}</h3>
              <p className="text-sm text-[#6B6B6B] font-inter font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="relative py-28 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=1600&q=85"
          alt="Consultation"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 text-center">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="max-w-xl mx-auto"
          >
            <Calendar size={32} className="text-[#C7A76C] mx-auto mb-6" />
            <p className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-4">Private Consultation</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
              Design your<br />perfect ring
            </h2>
            <p className="text-white/60 font-inter font-light text-sm mb-10 leading-relaxed">
              Meet with our jewellery specialists in person or virtually. We&apos;ll guide you through every choice — stone, setting, and meaning.
            </p>
            <AnimatedButton href="/contact" variant="gold" size="lg" arrow>Book an Appointment</AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testiRef} className="py-24 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <SectionTitle eyebrow="Love Stories" title="They said yes" className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={testiInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="bg-[#F8F8F8] p-10"
            >
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={12} className="fill-[#C7A76C] text-[#C7A76C]" />
                ))}
              </div>
              <p className="font-cormorant text-2xl font-light italic leading-relaxed text-[#111111] mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[9px] tracking-[0.25em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">{t.product}</p>
              <p className="text-sm font-inter font-semibold text-[#111111]">
                {t.name} <span className="font-light text-[#6B6B6B]">· {t.location}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <NewsletterSection dark />
    </div>
  );
}