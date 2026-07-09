"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Heart, ShoppingBag } from "lucide-react";

interface NavigationIconsProps {
  scrolled: boolean;
  cartCount: number;
  onCartClick: () => void;
  onAccountClick?: () => void;
  onWishlistClick?: () => void;
}

const iconClass = (scrolled: boolean) =>
  `cursor-pointer transition-colors duration-[250ms] ease-in-out ${
    scrolled ? "text-[#1a1a1a]" : "text-white"
  }`;

export default function NavigationIcons({
  scrolled,
  cartCount,
  onCartClick,
  onAccountClick,
  onWishlistClick,
}: NavigationIconsProps) {
  return (
    <div className="flex items-center gap-7" role="group" aria-label="Account actions">
      {/* Account */}
      <motion.button
        whileHover={{ scale: 1.1, opacity: 0.75 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={onAccountClick}
        className={iconClass(scrolled)}
        aria-label="Account"
      >
        <User size={20} strokeWidth={1.5} />
      </motion.button>

      {/* Wishlist */}
      <motion.button
        whileHover={{ scale: 1.12, opacity: 0.75 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={onWishlistClick}
        className={iconClass(scrolled)}
        aria-label="Wishlist"
      >
        <Heart size={20} strokeWidth={1.5} />
      </motion.button>

      {/* Cart */}
      <motion.button
        whileHover={{ scale: 1.1, opacity: 0.75 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={onCartClick}
        className={`${iconClass(scrolled)} relative`}
        aria-label={`Shopping bag, ${cartCount} items`}
      >
        <ShoppingBag size={20} strokeWidth={1.5} />
        {cartCount > 0 && (
          <span
            className="
              absolute -top-2 -right-2
              min-w-[16px] h-4 px-0.5
              flex items-center justify-center
              bg-[#B8966E] text-white
              text-[9px] font-semibold leading-none
              rounded-full
            "
            aria-hidden="true"
          >
            {cartCount}
          </span>
        )}
      </motion.button>
    </div>
  );
}