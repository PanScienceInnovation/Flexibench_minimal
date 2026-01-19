import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { HeroSection2 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-2";
import { LogoSection10 } from "@/components/pro-blocks/landing-page/logo-sections/logo-section-7";
import { StatsSection4 } from "@/components/pro-blocks/landing-page/stats-sections/stats-section-4";
import { FaqSection2 } from "@/components/pro-blocks/landing-page/faq-sections/faq-section-2";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { WhyFlexibenchSection } from "@/components/pro-blocks/landing-page/why-flexibench-section";
import { PlatformOverviewSection } from "@/components/pro-blocks/landing-page/platform-overview-section";
import { CapabilitiesOverviewSection } from "@/components/pro-blocks/landing-page/capabilities-overview-section";
import { InternalToolsSection } from "@/components/pro-blocks/landing-page/internal-tools-section";
import { UseCasesPreviewSection } from "@/components/pro-blocks/landing-page/use-cases-preview-section";
import { QualityGovernanceSection } from "@/components/pro-blocks/landing-page/quality-governance-section";
import { GetStartedCtaSection } from "@/components/pro-blocks/landing-page/get-started-cta-section";
import TestimonialsCarousel from "@/components/pro-blocks/landing-page/testimonials-sections/testimonials-carousel";

export default function Page() {
  return (
    <main id="main-content">
      <LpNavbar1 />
      <HeroSection2 />
      <LogoSection10 />
      <WhyFlexibenchSection />
      <PlatformOverviewSection />
      <CapabilitiesOverviewSection />
      <InternalToolsSection />
      <StatsSection4 />
      <UseCasesPreviewSection />
      <QualityGovernanceSection />
      <GetStartedCtaSection />
      <TestimonialsCarousel />
      <FaqSection2 />
      <Footer1 />
    </main>
  );
}
