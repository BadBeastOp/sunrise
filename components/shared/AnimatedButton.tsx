"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost-light" | "gold" | "ghost";
  showArrow?: boolean;
  arrow?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  showArrow = false,
  arrow = false,
  size = "md",
  className,
  type = "button",
}: AnimatedButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300";

  const variants: Record<string, string> = {
    primary: "bg-[#111111] text-white hover:bg-[#C7A76C]",
    secondary:
      "border border-[#111111]/20 bg-transparent text-[#111111] hover:border-[#C7A76C] hover:text-[#C7A76C]",
    "ghost-light":
      "border border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-[#111111]",
    gold: "bg-[#C7A76C] text-white hover:bg-[#111111]",
    ghost:
      "border border-[#111111]/20 bg-transparent text-[#111111] hover:bg-[#111111] hover:text-white",
  };

  const sizes: Record<string, string> = {
    sm: "px-4 py-3 text-[11px]",
    md: "px-6 py-4 text-sm",
    lg: "px-8 py-5 text-base",
  };

  const shouldShowArrow = showArrow || arrow;

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
      {shouldShowArrow && <ArrowRight size={16} strokeWidth={1.5} />}
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
