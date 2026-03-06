import dynamic from "next/dynamic";
import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { HeroSection2 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-2";
import { LogoSection10 } from "@/components/pro-blocks/landing-page/logo-sections/logo-section-7";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { ChatbotWidget } from "@/components/chatbot-widget";

// Lazy load below-the-fold sections for better performance
const WhyFlexibenchSection = dynamic(
  () => import("@/components/pro-blocks/landing-page/why-flexibench-section").then(mod => ({ default: mod.WhyFlexibenchSection })),
  { ssr: true }
);

const PlatformOverviewSection = dynamic(
  () => import("@/components/pro-blocks/landing-page/platform-overview-section").then(mod => ({ default: mod.PlatformOverviewSection })),
  { ssr: true }
);

const CapabilitiesOverviewSection = dynamic(
  () => import("@/components/pro-blocks/landing-page/capabilities-overview-section").then(mod => ({ default: mod.CapabilitiesOverviewSection })),
  { ssr: true }
);

const InternalToolsSection = dynamic(
  () => import("@/components/pro-blocks/landing-page/internal-tools-section").then(mod => ({ default: mod.InternalToolsSection })),
  { ssr: true }
);

const StatsSection4 = dynamic(
  () => import("@/components/pro-blocks/landing-page/stats-sections/stats-section-4").then(mod => ({ default: mod.StatsSection4 })),
  { ssr: true }
);

const UseCasesPreviewSection = dynamic(
  () => import("@/components/pro-blocks/landing-page/use-cases-preview-section").then(mod => ({ default: mod.UseCasesPreviewSection })),
  { ssr: true }
);

const QualityGovernanceSection = dynamic(
  () => import("@/components/pro-blocks/landing-page/quality-governance-section").then(mod => ({ default: mod.QualityGovernanceSection })),
  { ssr: true }
);

const GetStartedCtaSection = dynamic(
  () => import("@/components/pro-blocks/landing-page/get-started-cta-section").then(mod => ({ default: mod.GetStartedCtaSection })),
  { ssr: true }
);

const TestimonialsCarousel = dynamic(
  () => import("@/components/pro-blocks/landing-page/testimonials-sections/testimonials-carousel"),
  { ssr: true }
);

const FaqSection2 = dynamic(
  () => import("@/components/pro-blocks/landing-page/faq-sections/faq-section-2").then(mod => ({ default: mod.FaqSection2 })),
  { ssr: true }
);

export default function Page() {
  return (
    <>
      {/* Chatbot Widget */}
      <ChatbotWidget />
      
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
    </>
  );
}
