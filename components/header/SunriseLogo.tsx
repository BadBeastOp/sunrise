import React from "react";
import Link from "next/link";

interface LogoProps {
  scrolled: boolean;
}

export default function Logo({ scrolled }: LogoProps) {
  return (
    <Link
      href="/"
      className="flex flex-col items-center gap-0.5 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8966E] focus-visible:ring-offset-2 rounded-sm"
      aria-label="Sunrise Treasures — Home"
    >
      <span
        className={`
          font-serif tracking-[0.22em] text-[15px] sm:text-[17px] leading-none
          transition-colors duration-300
          ${scrolled ? "text-[#1a1a1a]" : "text-white"}
        `}
      >
        SUNRISE TREASURES
      </span>
      <span
        className={`
          text-[8px] tracking-[0.35em] font-sans font-light
          transition-colors duration-300
          ${scrolled ? "text-[#B8966E]" : "text-[#d4b896]"}
        `}
      >
        FINE JEWELLERY
      </span>
    </Link>
  );
}