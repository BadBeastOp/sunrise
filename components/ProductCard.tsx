"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

/**
 * Individual product preview card for the Best Sellers slider.
 * Showcases the product only — clicking through to a product page
 * is intentionally out of scope for this landing page.
 */
export default function ProductCard({ product }: { product: Product }) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group w-[260px] shrink-0 snap-start md:w-[300px]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lux bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 260px, 300px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <button
          type="button"
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          onClick={() => setWishlisted((v) => !v)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-subtle transition-colors hover:bg-white"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            className={wishlisted ? "fill-gold text-gold" : "text-ink"}
          />
        </button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="font-body text-sm font-medium text-ink">
          {product.name}
        </h3>
        <span className="text-sm text-ink/60">{product.price}</span>
      </div>
    </motion.div>
  );
}
