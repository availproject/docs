import { HalftoneBackground } from "@/components/halftone/halftone-background";
import { HeroSection } from "@/components/home/hero-section";
import { HomeControls } from "@/components/home/home-controls";
import { ProductGrid } from "@/components/home/product-grid";
import { SiteFooter } from "@/components/home/site-footer";
import { SITE_URL, websiteLd } from "@/lib/structured-data";

export const metadata = {
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  return (
    <main id="main-content" className="relative">
      {/* Site identity for agents — not rendered */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD payload is built from static, non-user data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      {/* Frame padding — thin muted border visible on top + sides */}
      <div className="md:px-3 md:pt-3">
        {/* Content panel — white bg, rounded corners */}
        <div className="relative overflow-hidden md:border md:border-border bg-background">
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
