"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-[#F8F8F8]">
      <div className="text-center px-5 py-20">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-4">404</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="font-cormorant text-6xl md:text-8xl font-light text-[#111111] mb-5">Page Not Found</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[#6B6B6B] font-inter font-light text-base mb-12 max-w-sm mx-auto leading-relaxed">
          The page you&apos;re looking for may have moved, or it may not exist.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-[#111111] text-white text-[11px] tracking-[0.25em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300">
            <ArrowLeft size={14} /> Return Home
          </Link>
          <Link href="/jewellery" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-[#111111] text-[11px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#111111] hover:text-white transition-all duration-300">
            Shop Collection
          </Link>
        </motion.div>
      </div>
    </div>
  );
}