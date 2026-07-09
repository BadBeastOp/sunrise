"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavItemProps {
  label: string;
  href: string;
  scrolled: boolean;
}

export default function NavItem({ label, href, scrolled }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  const [hovered, setHovered] = useState(false);

  const showUnderline = hovered || isActive;

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative inline-flex flex-col items-center gap-0 pb-1
        text-[15px] font-medium tracking-[0.08em] leading-none
        transition-colors duration-[250ms] ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] focus-visible:ring-offset-2 rounded-sm
        ${
          isActive
            ? "text-[#B8966E]"
            : scrolled
            ? hovered
              ? "text-[#B8966E]"
              : "text-[#1a1a1a]"
            : hovered
            ? "text-[#B8966E]"
            : "text-white"
        }
      `}
      aria-current={isActive ? "page" : undefined}
    >
      {label}

      {/* Animated underline */}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8966E] origin-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: showUnderline ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        aria-hidden="true"
      />
    </Link>
  );
}