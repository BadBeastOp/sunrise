"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import NewsletterSection from "@/components/shared/NewsletterSection";
import SectionTitle from "@/components/shared/SectionTitle";
import AnimatedButton from "@/components/shared/AnimatedButton";
import { Gift, Heart, Sparkles, Star, Box, CreditCard } from "lucide-react";

const occasions = [
  { name: "Anniversary", icon: Heart, href: "/jewellery", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=85" },
  { name: "Birthday", icon: Sparkles, href: "/jewellery", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=85" },
  { name: "Engagement", icon: Star, href: "/engagement", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=85" },
  { name: "Just Because", icon: Gift, href: "/jewellery", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=85" },
];

const recipients = [
  { label: "For Her", budget: "From $1,200", href: "/jewellery", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=85" },
  { label: "For Him", budget: "From $3,500", href: "/jewellery", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85" },
  { label: "For Them", budget: "From $800", href: "/jewellery", image: "https://images.unsplash.com/photo-1573408301185-9519f94815f4?w=600&q=85" },
];

const giftIdeas = products.filter(p => p.isBestseller || p.isFeatured).slice(0, 6);

const packagingFeatures = [
  { icon: Box, title: "Signature Box", desc: "Each piece arrives in our embossed jewellery box, wrapped in tissue and sealed with our gold wax stamp." },
  { icon: Gift, title: "Gift Message", desc: "Include a handwritten card with your personal message — composed by our team on archival paper." },
  { icon: Star, title: "Complimentary Wrapping", desc: "All gifts are wrapped in our signature matte black ribboning at no additional cost." },
  { icon: CreditCard, title: "Digital Gift Cards", desc: "Let them choose for themselves. Our gift cards never expire and are delivered instantly." },
];

export default function GiftsPage() {
  const occasionsRef = useRef<HTMLDivElement>(null);
  const occasionsInView = useInView(occasionsRef, { once: true, margin: "-80px" });
  const ideasRef = useRef<HTMLDivElement>(null);
  const ideasInView = useInView(ideasRef, { once: true, margin: "-80px" });
  const packagingRef = useRef<HTMLDivElement>(null);
  const packagingInView = useInView(packagingRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[480px] md:h-[580px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1586878341523-7f4e7b66bce7?w=1600&q=85"
          alt="Gift Guide" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pb-16 w-full text-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] tracking-[0.45em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">
            Give with intention
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
            className="font-cormorant font-light text-white text-5xl md:text-7xl leading-[0.9] mb-5">
            The Gift Guide
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22 }}
            className="text-white/65 font-inter font-light text-sm max-w-sm mx-auto leading-relaxed">
            The finest jewellery, chosen by occasion, recipient, and the feeling you want to give.
          </motion.p>
        </div>
      </div>

      {/* Shop by Occasion */}
      <section ref={occasionsRef} className="py-20 md:py-28 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <SectionTitle eyebrow="By Occasion" title="What are you celebrating?" className="mb-14" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {occasions.map((occ, i) => {
            const Icon = occ.icon;
            return (
              <motion.div
                key={occ.name}
                initial={{ opacity: 0, y: 30 }}
                animate={occasionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
              >
                <Link href={occ.href} className="group block">
                  <div className="relative overflow-hidden aspect-square mb-4">
                    <img src={occ.image} alt={occ.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-400" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 border border-white/50 rounded-full flex items-center justify-center group-hover:border-[#C7A76C] transition-colors duration-400">
                        <Icon size={20} className="text-white" />
                      </div>
                      <span className="font-cormorant text-2xl font-light text-white">{occ.name}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Shop by Recipient */}
      <section className="py-10 pb-20 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <SectionTitle eyebrow="By Recipient" title="Who is it for?" className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipients.map((rec, i) => (
            <motion.div
              key={rec.label}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
            >
              <Link href={rec.href} className="group block relative overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={rec.image} alt={rec.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <h3 className="font-cormorant text-3xl font-light text-white mb-1">{rec.label}</h3>
                  <p className="text-[10px] tracking-[0.2em] text-[#C7A76C] font-inter font-semibold uppercase">{rec.budget}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Gift Ideas */}
      <section ref={ideasRef} className="py-20 bg-[#F8F8F8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <SectionTitle eyebrow="Most Gifted" title="Best Gift Ideas" className="mb-14" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {giftIdeas.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={ideasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.08 }}
              >
                <Link href={`/products/${p.slug}`} className="group block">
                  <div className="overflow-hidden bg-white aspect-[3/4] mb-4">
                    <img src={p.images?.[0] ?? p.image ?? ""} alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
                  </div>
                  <p className="text-[9px] tracking-[0.2em] font-inter font-semibold uppercase text-[#6B6B6B] mb-1">{p.material}</p>
                  <h3 className="font-cormorant text-lg font-light group-hover:text-[#C7A76C] transition-colors mb-1">{p.name}</h3>
                  <span className="font-cormorant text-lg font-light">{formatPrice(p.price)}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packaging */}
      <section ref={packagingRef} className="py-24 md:py-32 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <SectionTitle eyebrow="The Experience" title="The Art of Giving"
          subtitle="Every gift from Sunrise Treasures arrives as a complete luxury experience." className="mb-16" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {packagingFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={packagingInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-14 h-14 border border-[#C7A76C]/30 group-hover:border-[#C7A76C] rounded-full flex items-center justify-center mx-auto mb-5 transition-colors duration-400">
                  <Icon size={20} className="text-[#C7A76C]" />
                </div>
                <h3 className="font-cormorant text-xl font-light mb-3">{f.title}</h3>
                <p className="text-sm text-[#6B6B6B] font-inter font-light leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Gift Card CTA */}
      <section className="bg-[#111111] py-24 text-center px-5">
        <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} viewport={{ once: true }} className="max-w-xl mx-auto">
          <p className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-4">Give freedom</p>
          <h2 className="font-cormorant text-5xl font-light text-white mb-6 leading-tight">Gift Cards</h2>
          <p className="text-white/50 font-inter font-light text-sm mb-10 leading-relaxed">
            Let them choose the piece that speaks to them. Available from $250 — delivered instantly or beautifully packaged.
          </p>
          <AnimatedButton href="/contact" variant="gold" size="lg">Purchase a Gift Card</AnimatedButton>
        </motion.div>
      </section>

      <NewsletterSection />
    </div>
  );
}