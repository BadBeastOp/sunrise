export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  image?: string;
  images?: string[];
  material?: string;
  gemstone?: string;
  rating?: number;
  reviewCount?: number;
  slug?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
  availability?: "in-stock" | "low-stock" | "out-of-stock";
}

export const products: Product[] = [
  {
    id: 1,
    name: "Solstice Ring",
    price: 3200,
    originalPrice: 3800,
    category: "rings",
    subcategory: "engagement",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85"],
    material: "18K Gold",
    slug: "solstice-ring",
    isNew: true,
    isBestseller: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Luna Pendant",
    price: 2400,
    originalPrice: 2800,
    category: "necklaces",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85"],
    material: "Diamond",
    slug: "luna-pendant",
    isFeatured: true,
  },
  {
    id: 3,
    name: "Golden Hour Earrings",
    price: 1800,
    originalPrice: 2200,
    category: "earrings",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85"],
    material: "14K Gold",
    slug: "golden-hour-earrings",
    isNew: true,
  },
  {
    id: 4,
    name: "Marina Bracelet",
    price: 2100,
    originalPrice: 2500,
    category: "bracelets",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85"],
    material: "Gold vermeil",
    slug: "marina-bracelet",
    isBestseller: true,
  },
  {
    id: 5,
    name: "Velvet Cuff",
    price: 1600,
    category: "bracelets",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85"],
    material: "18K Gold",
    slug: "velvet-cuff",
    isFeatured: true,
  },
  {
    id: 6,
    name: "Aurora Necklace",
    price: 2800,
    originalPrice: 3300,
    category: "necklaces",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85",
    images: ["https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=85"],
    material: "Pearl",
    slug: "aurora-necklace",
    isBestseller: true,
  },
];
