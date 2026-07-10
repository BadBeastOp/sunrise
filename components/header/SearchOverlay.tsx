"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { gsap } from "gsap";

interface SearchOverlayProps {
  isOpen: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
}

export default function SearchOverlay({
  isOpen,
  query,
  onQueryChange,
  onClose,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();

        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            {
              scaleX: 0,
              transformOrigin: "left center",
            },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.3,
            }
          );
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-white flex flex-col pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          {/* Close */}
          <div className="flex justify-end p-6 sm:p-10">
            <button
              type="button"
              onClick={() => {
                console.log("CLOSE CLICKED");
                onClose();
              }}
              className="
                flex items-center gap-2 text-[#1a1a1a]
                text-[12px] tracking-[0.15em] font-medium uppercase
                hover:text-[#B8966E] transition-colors duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] rounded-sm
              "
              aria-label="Close search"
            >
              <X size={18} strokeWidth={1.5} />
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>

          {/* Search content */}
          <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-10 -mt-20">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-[11px] tracking-[0.35em] text-[#B8966E] uppercase font-medium mb-8"
            >
              What are you looking for?
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="w-full max-w-2xl relative"
            >
              <div className="flex items-center gap-4 pb-4">
                <Search
                  size={22}
                  strokeWidth={1}
                  className="text-[#B8966E] flex-shrink-0"
                />

                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Search jewellery, collections…"
                  className="
                    flex-1 bg-transparent text-[#1a1a1a]
                    text-2xl sm:text-3xl font-serif font-light
                    placeholder:text-[#ccc] placeholder:font-light
                    focus:outline-none
                  "
                  aria-label="Search query"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => onQueryChange("")}
                    className="text-[#999] hover:text-[#1a1a1a] transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              <div
                ref={lineRef}
                className="h-[1px] bg-[#1a1a1a] w-full"
                style={{ transformOrigin: "left center" }}
              />
            </motion.div>

            {/* Suggested */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="flex flex-wrap gap-3 mt-10 justify-center"
            >
              {[
                "Rings",
                "Necklaces",
                "Earrings",
                "Bracelets",
                "Diamonds",
                "Gold",
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onQueryChange(s)}
                  className="
                    px-5 py-2 border border-[#e5e5e5]
                    text-[11px] tracking-[0.15em] text-[#888]
                    hover:border-[#B8966E] hover:text-[#B8966E]
                    transition-all duration-200 uppercase
                  "
                >
                  {s}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}