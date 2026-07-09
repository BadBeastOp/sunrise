"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, MapPin, Bell, CalendarDays } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "./SunriseLogo";
import NavigationIcons from "./NavigationIcons";

interface TopBarProps {
  scrolled: boolean;
  onSearchClick: () => void;
  onCartClick: () => void;
  onMobileMenuToggle: () => void;
  cartCount: number;
  isMobileMenuOpen: boolean;
}

export default function TopBar({
  scrolled,
  onSearchClick,
  onCartClick,
  onMobileMenuToggle,
  cartCount,
  isMobileMenuOpen,
}: TopBarProps) {
  return (
    <div className="flex flex-col w-full">

      {/* ── UTILITY BAR (top thin row) ── */}
      <div
        className={`
          hidden lg:flex w-full
          transition-all duration-350
          ${scrolled
            ? "border-b border-[#e8e8e8]"
            : "border-b border-white/20"
          }
        `}
      >
        <Container>
          <div className="flex items-center justify-between h-10 w-full">

            {/* LEFT — Location + Contact Us */}
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ opacity: 0.65 }}
                transition={{ duration: 0.2 }}
                className={`
                  flex items-center gap-1.5 cursor-pointer
                  text-[11px] tracking-[0.06em] font-medium
                  transition-colors duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] rounded-sm
                  ${scrolled ? "text-[#1a1a1a]" : "text-white"}
                `}
                aria-label="Find a store"
              >
                <MapPin size={13} strokeWidth={1.5} />
              </motion.button>

              <motion.button
                whileHover={{ opacity: 0.65 }}
                transition={{ duration: 0.2 }}
                className={`
                  flex items-center gap-1.5 cursor-pointer
                  text-[11px] tracking-[0.06em] font-medium
                  transition-colors duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] rounded-sm
                  ${scrolled ? "text-[#1a1a1a]" : "text-white"}
                `}
                aria-label="Contact us"
              >
                <Bell size={13} strokeWidth={1.5} />
                <span>Contact Us</span>
              </motion.button>
            </div>

            {/* RIGHT — Book an Appointment */}
            <motion.button
              whileHover={{ opacity: 0.65 }}
              transition={{ duration: 0.2 }}
              className={`
                flex items-center gap-1.5 cursor-pointer
                text-[11px] tracking-[0.06em] font-medium
                transition-colors duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] rounded-sm
                ${scrolled ? "text-[#1a1a1a]" : "text-white"}
              `}
              aria-label="Book an appointment"
            >
              <CalendarDays size={13} strokeWidth={1.5} />
              <span>Book an Appointment</span>
            </motion.button>

          </div>
        </Container>
      </div>

      {/* ── MAIN BAR (logo row — 88px) ── */}
      <div className="h-[88px] flex items-center w-full">
        <Container>
          <div className="grid grid-cols-3 items-center w-full">

            {/* LEFT — Search (desktop) / Hamburger (mobile) */}
            <div className="flex items-center gap-3">

              {/* Desktop search */}
              <motion.button
                onClick={onSearchClick}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className={`
                  hidden lg:flex items-center gap-2 cursor-pointer
                  transition-colors duration-[250ms] ease-in-out
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] rounded-sm
                  ${scrolled ? "text-[#1a1a1a]" : "text-white"}
                `}
                aria-label="Open search"
              >
                <Search size={18} strokeWidth={1.5} />
              </motion.button>

              {/* Mobile hamburger */}
              <button
                onClick={onMobileMenuToggle}
                className={`
                  flex lg:hidden flex-col gap-[5px] cursor-pointer
                  transition-colors duration-[250ms]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] rounded-sm p-1
                  ${scrolled ? "text-[#1a1a1a]" : "text-white"}
                `}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: 7, width: "22px" }
                      : { rotate: 0, y: 0, width: "22px" }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="block h-[1.5px] bg-current origin-center"
                  style={{ width: 22 }}
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="block h-[1.5px] bg-current"
                  style={{ width: 16 }}
                />
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: -7, width: "22px" }
                      : { rotate: 0, y: 0, width: "22px" }
                  }
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="block h-[1.5px] bg-current origin-center"
                  style={{ width: 22 }}
                />
              </button>
            </div>

            {/* CENTER — Logo */}
            <div className="flex items-center justify-center">
              <Logo scrolled={scrolled} />
            </div>

            {/* RIGHT — Icons */}
            <div className="flex items-center justify-end">
              {/* Desktop: all icons */}
              <div className="hidden lg:flex">
                <NavigationIcons
                  scrolled={scrolled}
                  cartCount={cartCount}
                  onCartClick={onCartClick}
                />
              </div>

              {/* Mobile: search + cart */}
              <div className="flex lg:hidden items-center gap-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  onClick={onSearchClick}
                  className={`
                    cursor-pointer transition-colors duration-[250ms]
                    ${scrolled ? "text-[#1a1a1a]" : "text-white"}
                  `}
                  aria-label="Search"
                >
                  <Search size={20} strokeWidth={1.5} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  onClick={onCartClick}
                  className={`
                    relative cursor-pointer transition-colors duration-[250ms]
                    ${scrolled ? "text-[#1a1a1a]" : "text-white"}
                  `}
                  aria-label={`Shopping bag, ${cartCount} items`}
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-0.5 flex items-center justify-center bg-[#B8966E] text-white text-[9px] font-semibold rounded-full">
                      {cartCount}
                    </span>
                  )}
                </motion.button>
              </div>
            </div>

          </div>
        </Container>
      </div>

    </div>
  );
}