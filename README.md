# Sunrise Treasures — Landing Page

A production-quality luxury jewellery landing page built with Next.js 15,
TypeScript, Tailwind CSS, Framer Motion, GSAP, and Lenis smooth scroll.

Scope is intentionally limited to the landing page only — no product,
collection, cart, wishlist, or auth pages are included.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  layout.tsx        Root layout, fonts, metadata
  page.tsx           Assembles all landing page sections
  globals.css        Global styles, focus states, reduced-motion handling
components/
  Navbar.tsx              Sticky two-row header
  Hero.tsx                Full-viewport hero with slow background zoom
  FeaturedCollections.tsx 3-column collection grid
  AboutSection.tsx        Split image/text brand story
  WhyChooseUs.tsx         4-column value proposition grid
  EditorialBanner.tsx     Full-width limited-edition banner
  BestSellers.tsx         Horizontal product slider (preview only)
  Newsletter.tsx          Email capture
  Footer.tsx              4-column dark footer
  SectionTitle.tsx        Shared heading + "sunrise" signature mark
  AnimatedButton.tsx      Shared CTA button (primary/secondary/ghost-light)
  ProductCard.tsx         Card used inside BestSellers
  Container.tsx           Enforces 1440px max width + responsive padding
  SmoothScroll.tsx        Lenis provider (skips itself for reduced-motion users)
lib/
  utils.ts            cn() class-merging helper
  placeholder.ts      Generates neutral placeholder imagery
```

## Design system

| Token       | Value              |
| ----------- | ------------------ |
| Background  | `#FFFFFF`           |
| Surface     | `#F8F8F8`           |
| Ink (text)  | `#111111`           |
| Gold accent | `#C7A76C`           |
| Border      | `#ECECEC`           |
| Radius      | `16px` (`rounded-lux`) |
| Display font | Cormorant Garamond |
| Body font    | Inter |

Section vertical rhythm: 70px mobile / 90px tablet / 120px desktop.
Container: 1440px max width, 20px / 40px / 80px side padding.

## Images

All imagery is a neutral, license-free placeholder (Lorem Picsum) rendered
in grayscale via `lib/placeholder.ts`, so the page reads as cohesively "on
brand" until real photography and the final logo are supplied. Swap the
`src` values in each component, or point `placeholderImage()` at your own
CDN, when real assets are ready.

## Accessibility & motion

- All interactive elements have visible keyboard focus states (see
  `globals.css`).
- `prefers-reduced-motion` disables Lenis smoothing and shortens all
  Framer Motion / CSS animations.
- Icon-only buttons (search, cart, wishlist, slider arrows) have `aria-label`s.

## Notes

- No copyrighted logos, brand imagery, or trademarks are used anywhere.
- The logo is a text wordmark ("SUNRISE TREASURES") as requested, ready to
  be swapped for a real mark later.
