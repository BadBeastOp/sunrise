"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import Container from "./Container";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Jewellery", href: "#" },
  { label: "Collections", href: "#collections" },
  { label: "New Arrivals", href: "#" },
  { label: "Gifts", href: "#" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = scrolled || mobileOpen ? "text-ink" : "text-white";

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        scrolled || mobileOpen
          ? "bg-white/95 shadow-subtle backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <Container>
        {/* Row 1: Search | Logo | Account/Wishlist/Cart/Menu */}
        <div className="grid h-[88px] grid-cols-3 items-center">
          <div className="flex items-center gap-5">
            <button
              type="button"
              aria-label="Search"
              className={cn("transition-colors", textColor)}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>

          <Link
            href="/"
            className={cn(
              "justify-self-center text-center font-display text-xl tracking-luxe md:text-2xl",
              textColor
            )}
          >
            SUNRISE TREASURES
          </Link>

          <div className="flex items-center justify-end gap-5">
            <button
              type="button"
              aria-label="Account"
              className={cn("hidden transition-colors md:block", textColor)}
            >
              <User size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Wishlist"
              className={cn("hidden transition-colors md:block", textColor)}
            >
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className={cn("transition-colors", textColor)}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className={cn("transition-colors lg:hidden", textColor)}
            >
              {mobileOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Menu size={20} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Centered menu (desktop only) */}
        <nav
          aria-label="Primary"
          className={cn(
            "hidden justify-center border-t py-4 lg:flex",
            scrolled ? "border-border" : "border-white/20"
          )}
        >
          <ul className="flex items-center gap-12">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "nav-link text-sm font-medium tracking-luxe",
                    textColor
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <motion.nav
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          aria-label="Mobile"
          className="border-t border-border bg-white lg:hidden"
        >
          <ul className="flex flex-col items-center gap-1 py-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="w-full">
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3 text-center text-sm font-medium tracking-luxe text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </header>
  );
}
