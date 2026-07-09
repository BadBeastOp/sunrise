import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
}

/**
 * Enforces the site-wide container rules: 1440px max width,
 * 80px desktop / 40px tablet / 20px mobile side padding.
 * Every section on the landing page should be wrapped in this
 * so that all content aligns to the same grid.
 */
export default function Container({
  children,
  className,
  as = "div",
}: ContainerProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-container px-5 md:px-10 lg:px-20",
        className
      )}
    >
      {children}
    </Tag>
  );
}
