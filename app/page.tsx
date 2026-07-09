import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import EditorialBanner from "@/components/EditorialBanner";
import BestSellers from "@/components/BestSellers";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedCollections />
        <AboutSection />
        <WhyChooseUs />
        <EditorialBanner />
        <BestSellers />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
