"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost-light";
  showArrow?: boolean;
  className?: string;
  type?: "button" | "submit";
}

/**
 * Rounded-large luxury CTA button. `primary` is solid ink,
 * `secondary` is an outlined gold style, `ghost-light` is for use
 * on dark or image backgrounds (e.g. the hero).
 */
export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  showArrow = false,
  className,
  type = "button",
}: AnimatedButtonProps) {
  const base =
    "inline-flex w-[190px] items-center justify-center gap-2 rounded-lux px-6 py-4 text-sm font-medium tracking-luxe transition-colors duration-300";

  const variants: Record<string, string> = {
    primary: "bg-ink text-white hover:bg-gold-deep",
    secondary:
      "border border-ink/20 bg-transparent text-ink hover:border-gold hover:text-gold-deep",
    "ghost-light":
      "border border-white/70 bg-white/0 text-white backdrop-blur-sm hover:bg-white hover:text-ink",
  };

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], className)}
    >
      {children}
      {showArrow && <ArrowRight size={16} strokeWidth={1.5} />}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} aria-label={typeof children === "string" ? children : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick}>
      {content}
    </button>
  );
}
