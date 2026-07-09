"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollHeader } from "@/components/hooks/useScrollHeader";
import { useMobileMenu } from "@/components/hooks/useMobileMenu";
import { useSearch } from "@/components/hooks/useSearch";
import { useCart } from "@/components/hooks/useCart";
import TopBar from "./TopBar";
import MainNavigation from "./MainNavigation";
import SearchOverlay from "./SearchOverlay";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { scrolled } = useScrollHeader(10);
  const mobileMenu = useMobileMenu();
  const search = useSearch();
  const cart = useCart();

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9999] flex flex-col"
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,1)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 1px 0 0 rgba(0,0,0,0.06)"
            : "0 1px 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {/* Utility bar + Logo row */}
        <TopBar
          scrolled={scrolled}
          onSearchClick={search.open}
          onCartClick={cart.open}
          onMobileMenuToggle={mobileMenu.toggle}
          cartCount={cart.itemCount}
          isMobileMenuOpen={mobileMenu.isOpen}
        />

        {/* Divider between logo row and nav row */}
        <div
          className={`
            hidden lg:block w-full h-px
            transition-colors duration-350
            ${scrolled ? "bg-[#e8e8e8]" : "bg-white/20"}
          `}
        />

        {/* Nav links row */}
        <MainNavigation scrolled={scrolled} />
      </motion.header>

      <SearchOverlay
        isOpen={search.isOpen}
        query={search.query}
        onQueryChange={search.setQuery}
        onClose={search.close}
      />

      <CartDrawer isOpen={cart.isOpen} onClose={cart.close} />

      <MobileMenu
        isOpen={mobileMenu.isOpen}
        onClose={mobileMenu.close}
        onSearchOpen={search.open}
      />
    </>
  );
}