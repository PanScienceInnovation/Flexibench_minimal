import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { HeroSection2 } from "@/components/pro-blocks/landing-page/hero-sections/hero-section-2";
import { LogoSection10 } from "@/components/pro-blocks/landing-page/logo-sections/logo-section-7";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { ChatbotWidget } from "@/components/chatbot-widget";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexibench.io';

export const metadata: Metadata = {
  title: "Enterprise Data Annotation Platform",
  description: "Modern multimodal annotation platform for AI model training data with quality workflows and integrated tooling. Transform your data annotation process with enterprise-grade tools.",
  openGraph: {
    title: "Flexibench — Enterprise Data Annotation Platform",
    description: "Modern multimodal annotation platform for AI model training data with quality workflows and integrated tooling.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/fb-feviconlogo.png`,
        width: 1200,
        height: 630,
        alt: "Flexibench Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexibench — Enterprise Data Annotation Platform",
    description: "Modern multimodal annotation platform for AI model training data with quality workflows and integrated tooling.",
    images: [`${siteUrl}/fb-feviconlogo.png`],
  },
  other: {
    "chatbot:index": "true",
    "chatbot:searchable": "true",
    "chatbot:category": "homepage",
    "chatbot:priority": "high",
  },
};

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexibench.io';
  
  return (
    <>
      {/* Chatbot Widget */}
      <ChatbotWidget />
      
      {/* Structured Data - BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteUrl
              }
            ]
          }),
        }}
      />
      
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
