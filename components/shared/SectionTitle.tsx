"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  light = false,
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      <div className={cn("mb-6", isCenter && "mx-auto")} aria-hidden="true">
        <svg width="44" height="22" viewBox="0 0 44 22" fill="none">
          <path
            d="M2 20C2 9.5 11 2 22 2C33 2 42 9.5 42 20"
            stroke={light ? "#C7A76C" : "#C7A76C"}
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {eyebrow && (
        <span className={cn("mb-3 text-xs font-medium uppercase tracking-[0.25em]", light ? "text-[#C7A76C]" : "text-[#C7A76C]")}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn("font-cormorant text-4xl leading-tight md:text-5xl", light ? "text-white" : "text-[#111111]")}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-4 text-base leading-relaxed md:text-lg", light ? "max-w-xl text-white/70" : "max-w-lg text-[#6B6B6B]")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
