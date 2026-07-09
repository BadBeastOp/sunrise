import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";
import Container from "./Container";

const QUICK_LINKS = ["Home", "Jewellery", "Collections", "New Arrivals", "About"];
const CUSTOMER_CARE = ["Contact Us", "Shipping & Returns", "Ring Sizing Guide", "Care Instructions", "FAQs"];

export default function Footer() {
  return (
    <footer className="bg-footer text-white">
      <Container className="pb-10 pt-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="font-display text-2xl tracking-luxe">
              SUNRISE TREASURES
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Timeless fine jewellery, hand-finished for the moments that
              deserve to last.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide2 text-white/80">
              Quick Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {QUICK_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide2 text-white/80">
              Customer Care
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {CUSTOMER_CARE.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wide2 text-white/80">
              Stay Updated
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Subscribe above for early access to new collections and private
              sales.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Sunrise Treasures. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="#" aria-label="Instagram" className="text-white/60 transition-colors hover:text-gold">
              <Instagram size={18} strokeWidth={1.5} />
            </Link>
            <Link href="#" aria-label="Facebook" className="text-white/60 transition-colors hover:text-gold">
              <Facebook size={18} strokeWidth={1.5} />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-white/60 transition-colors hover:text-gold">
              <Twitter size={18} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
