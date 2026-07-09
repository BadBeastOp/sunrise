"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, ChevronDown, Eye, Star, Filter, Grid3X3, Grid2X2, Heart } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { useAppContext } from "@/lib/context";
import NewsletterSection from "@/components/shared/NewsletterSection";
import Breadcrumb from "@/components/shared/Breadcrumb";
import AnimatedButton from "@/components/shared/AnimatedButton";

const CATEGORIES = ["All", "Necklaces", "Rings", "Earrings", "Bracelets", "Watches"];
const MATERIALS = ["All Materials", "18K Yellow Gold", "18K White Gold", "18K Rose Gold", "Platinum", "Stainless Steel"];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];
const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $2,000", min: 0, max: 2000 },
  { label: "$2,000 – $5,000", min: 2000, max: 5000 },
  { label: "$5,000 – $10,000", min: 5000, max: 10000 },
  { label: "Over $10,000", min: 10000, max: Infinity },
];

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { cart, wishlist } = useAppContext();
  const isWished = wishlist.isWishlisted(product.id);

  return (
    <div
      className="group"
      onMouseEnter={() => { setHovered(true); if (product.images?.[1]) setImgIdx(1); }}
      onMouseLeave={() => { setHovered(false); setImgIdx(0); }}
    >
      <div className="relative overflow-hidden bg-[#F8F8F8] aspect-[3/4] mb-4">
        <Link href={`/products/${product.slug}`}>
          <img
            src={product.images?.[imgIdx] ?? product.image ?? ""}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="text-[9px] tracking-[0.2em] font-inter font-semibold uppercase bg-[#111111] text-white px-2.5 py-1">New</span>
          )}
          {product.isBestseller && (
            <span className="text-[9px] tracking-[0.2em] font-inter font-semibold uppercase bg-[#C7A76C] text-white px-2.5 py-1">Bestseller</span>
          )}
          {product.availability === "low-stock" && (
            <span className="text-[9px] tracking-[0.2em] font-inter font-semibold uppercase bg-white/90 text-[#6B6B6B] px-2.5 py-1">Low Stock</span>
          )}
        </div>

        <button
          onClick={() => wishlist.toggle(product.id)}
          className={cn(
            "absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300",
            isWished ? "bg-[#C7A76C] text-white" : "bg-white/80 text-[#6B6B6B] hover:text-[#C7A76C]"
          )}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={14} fill={isWished ? "currentColor" : "none"} />
        </button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-3 inset-x-3 flex gap-2"
        >
          <button
            onClick={() => cart.addItem(product)}
            className="flex-1 py-2.5 bg-[#111111] text-white text-[10px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#C7A76C] transition-colors duration-300"
          >
            Add to Bag
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="w-10 flex items-center justify-center bg-white text-[#111111] hover:bg-[#C7A76C] hover:text-white transition-colors duration-300"
          >
            <Eye size={14} />
          </Link>
        </motion.div>
      </div>

      <div className="space-y-1">
        <p className="text-[9px] tracking-[0.25em] font-inter font-semibold uppercase text-[#6B6B6B]">
          {product.material}{product.gemstone && ` · ${product.gemstone}`}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-cormorant text-lg font-light hover:text-[#C7A76C] transition-colors duration-300 leading-snug">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} className={i < Math.floor(product.rating ?? 0) ? "fill-[#C7A76C] text-[#C7A76C]" : "fill-[#E0E0E0] text-[#E0E0E0]"} />
            ))}
          </div>
          <span className="text-[10px] text-[#6B6B6B] font-inter">({product.reviewCount})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-cormorant text-xl font-light">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-[#6B6B6B] line-through font-inter">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JewelleryPage() {
  const [category, setCategory] = useState("All");
  const [material, setMaterial] = useState("All Materials");
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cols, setCols] = useState<3 | 4>(4);
  const editorialRef = useRef<HTMLDivElement>(null);
  const editorialInView = useInView(editorialRef, { once: true, margin: "-80px" });

  const filtered = useMemo(() => {
    let r = [...products];
    if (category !== "All") r = r.filter(p => p.category === category.toLowerCase());
    if (material !== "All Materials") r = r.filter(p => p.material === material);
    const pr = PRICE_RANGES[priceRange];
    r = r.filter(p => p.price >= pr.min && p.price <= pr.max);
    if (search) r = r.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case "newest": return r.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "price-asc": return r.sort((a, b) => a.price - b.price);
      case "price-desc": return r.sort((a, b) => b.price - a.price);
      case "rating": return r.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      default: return r.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [category, material, priceRange, sort, search]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <div className="relative h-[420px] md:h-[520px] flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&q=85"
          alt="Jewellery Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            className="text-[10px] tracking-[0.45em] text-[#C7A76C] font-inter font-semibold uppercase mb-3"
          >
            The Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="font-cormorant font-light text-white text-5xl md:text-6xl lg:text-7xl leading-[0.92] mb-4"
          >
            Fine Jewellery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22 }}
            className="text-white/65 font-inter font-light text-sm max-w-sm leading-relaxed"
          >
            Each piece is a chapter — handcrafted, unhurried, and made to endure.
          </motion.p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-6">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Jewellery" }]} />
      </div>

      {/* Category Tabs */}
      <div className="border-y border-[#ECECEC] bg-white sticky top-[88px] z-40">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20">
          <div className="flex items-center gap-0 overflow-x-auto hide-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "flex-shrink-0 px-5 py-4 text-[11px] tracking-[0.18em] font-inter font-semibold uppercase border-b-2 transition-all duration-250",
                  category === cat
                    ? "border-[#C7A76C] text-[#C7A76C]"
                    : "border-transparent text-[#6B6B6B] hover:text-[#111111]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-10">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 text-[11px] tracking-[0.15em] font-inter font-semibold uppercase text-[#111111] hover:text-[#C7A76C] transition-colors"
            >
              <Filter size={14} />
              Filters
            </button>
            <span className="text-[11px] text-[#6B6B6B] font-inter">{filtered.length} pieces</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search…"
                className="pl-8 pr-4 py-2 border border-[#ECECEC] text-[12px] font-inter focus:outline-none focus:border-[#111111] transition-colors w-44"
              />
            </div>

            <div className="relative">
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[#ECECEC] text-[11px] tracking-[0.1em] font-inter font-semibold uppercase focus:outline-none bg-white cursor-pointer"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B6B6B]" />
            </div>

            <div className="hidden md:flex items-center gap-1 border border-[#ECECEC] p-1">
              <button onClick={() => setCols(4)} className={cn("p-1.5 transition-colors", cols === 4 ? "text-[#111111]" : "text-[#ccc]")}><Grid3X3 size={14} /></button>
              <button onClick={() => setCols(3)} className={cn("p-1.5 transition-colors", cols === 3 ? "text-[#111111]" : "text-[#ccc]")}><Grid2X2 size={14} /></button>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Sidebar */}
          <AnimatePresence>
            {sidebarOpen && (
              <motion.aside
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 240 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="hidden md:block flex-shrink-0 overflow-hidden"
              >
                <div className="w-[240px] space-y-8">
                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] font-inter font-semibold uppercase text-[#111111] mb-4">Material</h3>
                    <div className="space-y-2">
                      {MATERIALS.map(m => (
                        <button
                          key={m}
                          onClick={() => setMaterial(m)}
                          className={cn(
                            "w-full text-left text-sm font-inter transition-colors duration-200 py-1",
                            material === m ? "text-[#C7A76C] font-medium" : "text-[#6B6B6B] hover:text-[#111111]"
                          )}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-[0.3em] font-inter font-semibold uppercase text-[#111111] mb-4">Price</h3>
                    <div className="space-y-2">
                      {PRICE_RANGES.map((pr, i) => (
                        <button
                          key={pr.label}
                          onClick={() => setPriceRange(i)}
                          className={cn(
                            "w-full text-left text-sm font-inter transition-colors duration-200 py-1",
                            priceRange === i ? "text-[#C7A76C] font-medium" : "text-[#6B6B6B] hover:text-[#111111]"
                          )}
                        >
                          {pr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => { setCategory("All"); setMaterial("All Materials"); setPriceRange(0); setSearch(""); }}
                    className="text-[10px] tracking-[0.2em] font-inter font-semibold uppercase text-[#6B6B6B] hover:text-[#C7A76C] transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-cormorant text-3xl font-light text-[#6B6B6B] mb-3">No pieces found</p>
                <button
                  onClick={() => { setCategory("All"); setSearch(""); setMaterial("All Materials"); setPriceRange(0); }}
                  className="mt-4 px-8 py-3 border border-[#111111] text-[11px] tracking-[0.2em] font-inter font-semibold uppercase hover:bg-[#111111] hover:text-white transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={cn(
                "grid gap-6 md:gap-8",
                cols === 4 ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-2 md:grid-cols-3"
              )}>
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.04 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editorial */}
      <div ref={editorialRef} className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 py-20 border-t border-[#ECECEC]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={editorialInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="overflow-hidden aspect-[4/5]"
          >
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=85"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={editorialInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.4em] text-[#C7A76C] font-inter font-semibold uppercase mb-4"
            >
              Our Promise
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }} animate={editorialInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}
              className="font-cormorant font-light text-4xl md:text-5xl text-[#111111] mb-6 leading-tight"
            >
              Every piece begins<br />as a conversation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={editorialInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm md:text-base text-[#6B6B6B] font-inter font-light leading-relaxed mb-8"
            >
              We believe jewellery should reflect you, not a catalogue. Each piece in our collection
              begins with a story — yours, or one you want to carry forward.
            </motion.p>
            <AnimatedButton href="/about" variant="secondary" arrow>Our Story</AnimatedButton>
          </div>
        </div>
      </div>

      <NewsletterSection />
    </div>
  );
}