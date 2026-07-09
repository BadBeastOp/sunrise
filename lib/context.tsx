"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  images?: string[];
  material?: string;
  slug?: string;
  category?: string;
  subcategory?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextValue {
  cart: {
    items: CartItem[];
    totalPrice: number;
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    clear: () => void;
  };
  wishlist: {
    isWishlisted: (productId: number) => boolean;
    toggle: (productId: number) => void;
  };
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  const cart = useMemo(() => ({
    items: cartItems,
    totalPrice: cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    addItem: (product: Product) => {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
    },
    removeItem: (productId: number) => {
      setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    },
    clear: () => setCartItems([]),
  }), [cartItems]);

  const wishlist = useMemo(() => ({
    isWishlisted: (productId: number) => wishlistIds.includes(productId),
    toggle: (productId: number) => {
      setWishlistIds((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
      );
    },
  }), [wishlistIds]);

  return <AppContext.Provider value={{ cart, wishlist }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
