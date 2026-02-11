import { HeroSection } from "@/components/home/hero-section";
import { HomeControls } from "@/components/home/home-controls";
import { ProductGrid } from "@/components/home/product-grid";
import { SiteFooter } from "@/components/home/site-footer";
import { ShaderPlayground } from "@/components/shader/shader-playground";

export default function HomePage() {
  return (
    <main id="main-content" className="relative">
      <ShaderPlayground />
      <div className="relative z-10">
        <HeroSection />
        <HomeControls />
        <ProductGrid />
        <SiteFooter />
      </div>
    </main>
  );
}
