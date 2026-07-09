"use client";

import { useState, useCallback, useEffect } from "react";

export function useCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemCount] = useState(2); // placeholder count

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  return { isOpen, itemCount, open, close };
}