import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { HeroSection2 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-2";
import { LogoSection10 } from "@/components/pro-blocks/landing-page/logo-sections/logo-section-7";
import TestimonialsSection1 from "@/components/pro-blocks/landing-page/testimonials-sections/testimonials-section-1";
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
import { testimonials } from "@/lib/flexibench-content";

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
      <TestimonialsSection1
        quote={testimonials[0].quote}
        authorName={testimonials[0].authorName}
        authorRole={testimonials[0].authorRole}
        avatarSrc={testimonials[0].avatarSrc}
      />
      <UseCasesPreviewSection />
      <TestimonialsSection1
        quote={testimonials[2].quote}
        authorName={testimonials[2].authorName}
        authorRole={testimonials[2].authorRole}
        avatarSrc={testimonials[2].avatarSrc}
        variant="rose"
      />
      <QualityGovernanceSection />
      <TestimonialsSection1
        quote={testimonials[1].quote}
        authorName={testimonials[1].authorName}
        authorRole={testimonials[1].authorRole}
        avatarSrc={testimonials[1].avatarSrc}
        variant="amber"
      />
      <GetStartedCtaSection />
      <FaqSection2 />
      <Footer1 />
    </main>
  );
}
