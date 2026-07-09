"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, X } from "lucide-react";
import { useAppContext } from "@/lib/context";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import NewsletterSection from "@/components/shared/NewsletterSection";
import AnimatedButton from "@/components/shared/AnimatedButton";

export default function WishlistPage() {
  const { wishlist, cart } = useAppContext();
  const wishlisted = products.filter(p => wishlist.isWishlisted(p.id));

  return (
    <div className="pt-20 min-h-screen">
      <div className="bg-[#F8F8F8] py-14 px-5 sm:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-3">
            Your Collection
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08 }}
            className="font-cormorant text-5xl md:text-6xl font-light">
            Wishlist
          </motion.h1>
          {wishlisted.length > 0 && (
            <p className="mt-2 text-sm text-[#6B6B6B] font-inter">
              {wishlisted.length} {wishlisted.length === 1 ? "piece" : "pieces"} saved
            </p>
          )}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-14">
        {wishlisted.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 border border-[#ECECEC] rounded-full flex items-center justify-center mb-6">
              <Heart size={32} className="text-[#D6D6D6]" />
            </div>
            <h2 className="font-cormorant text-4xl font-light mb-3">Your wishlist is empty</h2>
            <p className="text-sm text-[#6B6B6B] font-inter font-light mb-10 max-w-sm">
              Save pieces you love and come back to them whenever you&apos;re ready.
            </p>
            <AnimatedButton href="/jewellery" variant="primary" arrow>Explore the Collection</AnimatedButton>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence>
                {wishlisted.map((product, i) => (
                  <motion.div key={product.id} layout initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: i * 0.06 }} className="group relative">
                    <button onClick={() => wishlist.toggle(product.id)}
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 hover:bg-white flex items-center justify-center text-[#6B6B6B] hover:text-[#111111] transition-colors duration-200 shadow-sm"
                      aria-label="Remove from wishlist">
                      <X size={14} />
                    </button>
                    <Link href={`/products/${product.slug}`}>
                      <div className="overflow-hidden bg-[#F8F8F8] aspect-[3/4] mb-4">
                        <img src={product.images?.[0] ?? product.image ?? ""} alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                      </div>
                    </Link>
                    <div className="space-y-1 mb-4">
                      <p className="text-[9px] tracking-[0.25em] font-inter font-semibold uppercase text-[#6B6B6B]">{product.material}</p>
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-cormorant text-lg font-light leading-snug hover:text-[#C7A76C] transition-colors">{product.name}</h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="font-cormorant text-xl font-light">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-[#6B6B6B] line-through font-inter">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => cart.addItem(product)}
                      className="w-full py-3 border border-[#111111] text-[10px] tracking-[0.2em] font-inter font-semibold uppercase flex items-center justify-center gap-2 hover:bg-[#111111] hover:text-white transition-all duration-300">
                      <ShoppingBag size={13} /> Add to Bag
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-14 pt-10 border-t border-[#ECECEC] flex flex-col sm:flex-row items-center justify-between gap-6">
              <button onClick={() => wishlisted.forEach(p => wishlist.toggle(p.id))}
                className="text-[11px] tracking-[0.15em] font-inter font-semibold uppercase text-[#6B6B6B] hover:text-[#111111] transition-colors">
                Clear Wishlist
              </button>
              <div className="flex gap-4">
                <AnimatedButton onClick={() => wishlisted.forEach(p => cart.addItem(p))} variant="primary" arrow>
                  Add All to Bag
                </AnimatedButton>
                <AnimatedButton href="/jewellery" variant="secondary">Continue Shopping</AnimatedButton>
              </div>
            </div>
          </>
        )}
      </div>
      <NewsletterSection />
    </div>
  );
}