"use client";

import React from "react";
import { motion } from "framer-motion";
import NavItem from "./NavItem";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Jewellery", href: "/jewellery" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Gifts", href: "/gifts" },
  { label: "Engagement", href: "/engagement" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/about/contact" },
];

interface MainNavigationProps {
  scrolled: boolean;
}

export default function MainNavigation({ scrolled }: MainNavigationProps) {
  return (
    <nav
      className="hidden lg:flex items-center justify-center h-14 w-full"
      aria-label="Primary navigation"
    >
      <div className="flex items-center gap-14">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            label={item.label}
            href={item.href}
            scrolled={scrolled}
          />
        ))}
      </div>
    </nav>
  );
}
