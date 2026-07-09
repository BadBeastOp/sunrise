"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Heart, Search } from "lucide-react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Jewellery", href: "/jewellery" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Gifts", href: "/gifts" },
  { label: "Engagement", href: "/engagement" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/about/contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchOpen: () => void;
}

const itemVariants = {
  hidden: { opacity: 0, x: -24 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07 + 0.15, duration: 0.4, ease: "easeOut" },
  }),
};

export default function MobileMenu({ isOpen, onClose, onSearchOpen }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/30 z-[9997] lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="mobile-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="
              fixed top-0 left-0 bottom-0
              w-[85vw] max-w-[360px]
              bg-white z-[9998]
              flex flex-col
              shadow-2xl
              lg:hidden
            "
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-7 border-b border-[#f0f0f0]">
              <span className="font-serif text-[14px] tracking-[0.18em] text-[#1a1a1a]">
                SUNRISE TREASURES
              </span>
              <button
                onClick={onClose}
                className="text-[#999] hover:text-[#1a1a1a] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] rounded-sm"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <motion.li
                      key={item.href}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={itemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`
                          block py-4 font-serif text-[26px] font-light leading-tight
                          border-b border-[#f5f5f5] last:border-0
                          transition-colors duration-200
                          focus:outline-none focus-visible:text-[#B8966E]
                          ${isActive ? "text-[#B8966E]" : "text-[#1a1a1a] hover:text-[#B8966E]"}
                        `}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="px-6 py-6 border-t border-[#f0f0f0] flex items-center gap-6"
            >
              <button
                onClick={() => { onClose(); onSearchOpen(); }}
                className="flex items-center gap-2 text-[#666] hover:text-[#B8966E] transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
                <span className="text-[11px] tracking-[0.12em] uppercase">Search</span>
              </button>
              <button
                className="flex items-center gap-2 text-[#666] hover:text-[#B8966E] transition-colors duration-200"
                aria-label="Account"
              >
                <User size={18} strokeWidth={1.5} />
                <span className="text-[11px] tracking-[0.12em] uppercase">Account</span>
              </button>
              <button
                className="flex items-center gap-2 text-[#666] hover:text-[#B8966E] transition-colors duration-200"
                aria-label="Wishlist"
              >
                <Heart size={18} strokeWidth={1.5} />
                <span className="text-[11px] tracking-[0.12em] uppercase">Wishlist</span>
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}