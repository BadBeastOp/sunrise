"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import NewsletterSection from "@/components/shared/NewsletterSection";
import SectionTitle from "@/components/shared/SectionTitle";
import StoryBlock from "@/components/shared/StoryBlock";
import AnimatedButton from "@/components/shared/AnimatedButton";
import { Leaf, Award, Users, Globe } from "lucide-react";

const timeline = [
  { year: "1987", event: "Founded in Geneva", desc: "A single atelier on Rue du Rhône opens with one conviction: jewellery should outlast a lifetime." },
  { year: "1994", event: "First Collection", desc: "The Aube collection — twelve pieces, sold entirely in the first week." },
  { year: "2003", event: "Ethical Certification", desc: "Became one of the first jewellers to achieve full Fairmined gold certification." },
  { year: "2011", event: "Paris Atelier", desc: "Opened a second atelier on Place Vendôme, bringing Sunrise Treasures to haute joaillerie." },
  { year: "2018", event: "Global Expansion", desc: "Collections now available to over 60 countries. Every piece still handcrafted in Geneva." },
  { year: "2024", event: "Today", desc: "37 years, 12,000 pieces crafted, 40 master artisans. The conviction unchanged." },
];

const values = [
  { icon: Award, title: "Uncompromising Quality", desc: "Every piece undergoes 47 quality checks before leaving our atelier. If it is not perfect, it does not leave." },
  { icon: Leaf, title: "Ethical Sourcing", desc: "100% of our gold is Fairmined certified. Our diamonds are conflict-free and GIA-certified." },
  { icon: Users, title: "Generational Craft", desc: "Our goldsmiths average 22 years of experience. Skills passed from master to apprentice, unchanged." },
  { icon: Globe, title: "Global Reach", desc: "Made in Geneva. Worn in 60+ countries. Our pieces travel far — but they are always crafted slowly." },
];

const designers = [
  { name: "Isabelle Morin", role: "Creative Director", years: "22 years at Sunrise", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=85" },
  { name: "Luca Ferrante", role: "Head Goldsmith", years: "34 years of craft", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85" },
  { name: "Mei-Ling Zhao", role: "Stone Specialist", years: "18 years at Sunrise", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=85" },
];

const press = [
  { outlet: "Vogue", quote: "The most considered jewellery house of its generation." },
  { outlet: "Harper's Bazaar", quote: "A name that whispers rather than shouts — and stays with you forever." },
  { outlet: "Financial Times", quote: "Sunrise Treasures has quietly redefined what luxury craftsmanship means." },
  { outlet: "Wallpaper*", quote: "Geneva's best-kept secret is no longer a secret." },
];

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px" });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });
  const pressRef = useRef<HTMLDivElement>(null);
  const pressInView = useInView(pressRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[560px] md:h-[680px] flex items-end overflow-hidden">
        <img src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1600&q=85"
          alt="Sunrise Treasures atelier" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pb-16 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] tracking-[0.45em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">
            Est. 1987 · Geneva
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
            className="font-cormorant font-light text-white text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-5 max-w-2xl">
            More than jewellery
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22 }}
            className="text-white/65 font-inter font-light text-sm md:text-base max-w-sm leading-relaxed">
            We craft objects that outlast the people who give them.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#111111] py-12">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1987", label: "Year Founded" },
              { value: "12,000+", label: "Pieces Crafted" },
              { value: "40+", label: "Master Artisans" },
              { value: "60+", label: "Countries" },
            ].map((stat, i) => (
              <motion.div key={stat.label} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <p className="font-cormorant text-4xl font-light text-white mb-1">{stat.value}</p>
                <p className="text-[10px] tracking-[0.25em] text-[#C7A76C] font-inter font-semibold uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <section className="py-24 md:py-32 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <StoryBlock
          eyebrow="Our Origin"
          title="Born from a belief that beauty should endure"
          body={[
            "In 1987, a single atelier opened on Geneva's Rue du Rhône with one conviction: that a piece of jewellery should outlast a lifetime. Every Sunrise Treasures piece begins as a sketch and becomes, through months of skilled hands, something that will be passed from one generation to the next.",
            "Thirty-seven years later, that conviction is unchanged. We still work with the same generational goldsmiths, still source our materials through the same ethical partnerships, and still refuse to let a piece leave our atelier until it is, simply, perfect.",
          ]}
          image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=85"
          imagePosition="right"
          stat1={{ value: "37", label: "Years" }}
          stat2={{ value: "3", label: "Ateliers" }}
        />
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 bg-[#F8F8F8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <SectionTitle eyebrow="What We Stand For" title="Our Values" className="mb-16" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.1 }} className="bg-white p-8">
                  <div className="w-12 h-12 border border-[#C7A76C]/30 flex items-center justify-center mb-5">
                    <Icon size={20} className="text-[#C7A76C]" />
                  </div>
                  <h3 className="font-cormorant text-xl font-light mb-3">{v.title}</h3>
                  <p className="text-sm text-[#6B6B6B] font-inter font-light leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-24 md:py-32 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <StoryBlock
          eyebrow="Craftsmanship"
          title="47 checks before a piece leaves our atelier"
          body={[
            "Every piece of Sunrise Treasures jewellery passes through 47 individual quality checkpoints before it is considered ready.",
            "It is not efficiency. It is care, made systematic.",
          ]}
          image="https://images.unsplash.com/photo-1573408301185-9519f94815f4?w=800&q=85"
          imagePosition="left"
          cta={{ label: "See Our Process", href: "/contact" }}
        />
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 bg-[#111111]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <SectionTitle eyebrow="Our Journey" title="37 Years" light className="mb-16" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div key={item.year}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-start"
              >
                <span className="text-[#C7A76C] font-cormorant text-3xl font-light flex-shrink-0 w-20">{item.year}</span>
                <div className="border-l border-white/10 pl-8">
                  <h3 className="text-white font-cormorant text-xl font-light mb-2">{item.event}</h3>
                  <p className="text-white/40 text-sm font-inter font-light leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24 md:py-32 max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
        <SectionTitle eyebrow="The People" title="Meet Our Makers" className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {designers.map((person, i) => (
            <motion.div key={person.name} initial={{ opacity: 0, y: 30 }} animate={teamInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }} className="text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-5 ring-2 ring-[#C7A76C]/20">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-cormorant text-2xl font-light mb-1">{person.name}</h3>
              <p className="text-[10px] tracking-[0.2em] text-[#C7A76C] font-inter font-semibold uppercase mb-1">{person.role}</p>
              <p className="text-sm text-[#6B6B6B] font-inter">{person.years}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Press */}
      <section ref={pressRef} className="py-20 bg-[#F8F8F8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <SectionTitle eyebrow="Press" title="As Seen In" className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {press.map((p, i) => (
              <motion.div key={p.outlet} initial={{ opacity: 0, y: 20 }} animate={pressInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="bg-white p-8 border-l-2 border-[#C7A76C]">
                <p className="text-[10px] tracking-[0.35em] text-[#C7A76C] font-inter font-semibold uppercase mb-4">{p.outlet}</p>
                <p className="font-cormorant text-2xl font-light italic text-[#111111] leading-relaxed">&ldquo;{p.quote}&rdquo;</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSection dark />
    </div>
  );
}