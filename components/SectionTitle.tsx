"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  heading: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * The small gold arc used across section headers. It is the page's
 * signature mark, a quiet nod to "sunrise" that recurs instead of a
 * numbered-step motif, since this content isn't a sequence.
 */
function SunriseMark({ align }: { align: "center" | "left" }) {
  return (
    <div
      className={cn(
        "sunrise-mark mb-6",
        align === "center" && "mx-auto"
      )}
      aria-hidden="true"
    >
      <svg width="44" height="22" viewBox="0 0 44 22" fill="none">
        <path
          d="M2 20C2 9.5 11 2 22 2C33 2 42 9.5 42 20"
          stroke="#C7A76C"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function SectionTitle({
  eyebrow,
  heading,
  subtitle,
  align = "center",
  className,
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
      <SunriseMark align={align} />
      {eyebrow && (
        <span className="mb-3 text-xs font-medium uppercase tracking-wide2 text-gold-deep">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
        {heading}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-ink/60 md:text-lg",
            isCenter ? "max-w-xl" : "max-w-lg"
          )}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
