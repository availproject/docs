import { HalftoneBackground } from "@/components/halftone/halftone-background";
import { HeroSection } from "@/components/home/hero-section";
import { HomeControls } from "@/components/home/home-controls";
import { ProductGrid } from "@/components/home/product-grid";
import { SiteFooter } from "@/components/home/site-footer";

export default function HomePage() {
  return (
    <main id="main-content" className="relative">
      {/* Frame padding — thin muted border visible on top + sides */}
      <div className="px-2 pt-2 md:px-3 md:pt-3">
        {/* Content panel — white bg, rounded corners */}
        <div className="relative overflow-hidden border border-border bg-background">
          <HalftoneBackground />
          <div className="relative z-10">
            <HeroSection />
            <HomeControls />
            <ProductGrid />
          </div>
        </div>
      </div>
      {/* Footer sits in the muted bg, completing the frame — z-10 to stay above fixed halftone canvas */}
      <div className="relative z-10">
        <SiteFooter />
      </div>
    </main>
  );
}
