import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/header/Header";
import { AppProvider } from "@/lib/context";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sunrise Treasures | Fine Jewellery, Reimagined",
  description:
    "Sunrise Treasures crafts timeless fine jewellery for the moments that deserve to last. Discover rings, necklaces, and heirlooms made to be worn for a lifetime.",
  keywords: [
    "Sunrise Treasures",
    "luxury jewellery",
    "fine jewellery",
    "gold jewellery",
    "diamond rings",
  ],
  openGraph: {
    title: "Sunrise Treasures | Fine Jewellery, Reimagined",
    description:
      "Timeless fine jewellery, crafted for the moments that deserve to last.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-background text-ink font-body">
        <AppProvider>
          <Header />
          <SmoothScroll>{children}</SmoothScroll>
        </AppProvider>
      </body>
    </html>
  );
}
