"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Placeholder cart items
const PLACEHOLDER_ITEMS = [
  {
    id: 1,
    name: "Diamond Solitaire Ring",
    material: "18K White Gold",
    price: "$4,850",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80",
    qty: 1,
  },
  {
    id: 2,
    name: "Pearl Drop Earrings",
    material: "18K Yellow Gold",
    price: "$2,200",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=200&q=80",
    qty: 1,
  },
];

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/40 z-[9998]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="
              fixed top-0 right-0 bottom-0
              w-full sm:w-[420px]
              bg-white z-[9999]
              flex flex-col
              shadow-2xl
            "
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-[#f0f0f0]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-[#1a1a1a]" />
                <span className="font-serif text-[17px] tracking-[0.05em] text-[#1a1a1a]">
                  Your Bag
                </span>
                <span className="text-[11px] text-[#999] font-medium">
                  ({PLACEHOLDER_ITEMS.length})
                </span>
              </div>
              <button
                onClick={onClose}
                className="
                  text-[#999] hover:text-[#1a1a1a]
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] rounded-sm
                "
                aria-label="Close cart"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {PLACEHOLDER_ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.35 }}
                  className="flex gap-4"
                >
                  <div className="w-20 h-20 flex-shrink-0 bg-[#f8f6f3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] tracking-[0.12em] text-[#B8966E] uppercase font-medium mb-0.5">
                      Fine Jewellery
                    </p>
                    <h4 className="font-serif text-[14px] text-[#1a1a1a] leading-snug mb-1">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#999]">{item.material}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-serif text-[15px] text-[#1a1a1a]">{item.price}</span>
                      <button className="text-[10px] tracking-[0.1em] text-[#bbb] hover:text-[#1a1a1a] uppercase transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-[#f0f0f0] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] tracking-[0.1em] text-[#999] uppercase">Subtotal</span>
                <span className="font-serif text-[20px] text-[#1a1a1a]">$7,050</span>
              </div>
              <p className="text-[10px] text-[#bbb] tracking-[0.05em]">
                Shipping & taxes calculated at checkout
              </p>
              <button
                className="
                  w-full py-4 bg-[#1a1a1a] text-white
                  text-[11px] tracking-[0.2em] uppercase font-medium
                  flex items-center justify-center gap-3
                  hover:bg-[#B8966E] transition-colors duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] focus-visible:ring-offset-2
                "
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </button>
              <button
                onClick={onClose}
                className="
                  w-full py-3 border border-[#e5e5e5]
                  text-[10px] tracking-[0.18em] uppercase text-[#999]
                  hover:border-[#1a1a1a] hover:text-[#1a1a1a]
                  transition-colors duration-200
                "
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}