import { HeroSection } from "@/components/home/hero-section";
import { HomeControls } from "@/components/home/home-controls";
import { ProductGrid } from "@/components/home/product-grid";
import { SiteFooter } from "@/components/home/site-footer";

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <HomeControls />
      <ProductGrid />
      <SiteFooter />
    </main>
  );
}
