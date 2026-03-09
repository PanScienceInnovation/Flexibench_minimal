import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { PlatformOverviewSection } from "@/components/pro-blocks/landing-page/platform-overview-section";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { platformModules } from "@/lib/flexibench-content";
import { Network, Sparkles, Shield, Plug } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { blurPlaceholders } from "@/lib/image-utils";

const iconMap: Record<string, typeof Network> = {
  Network,
  Sparkles,
  Shield,
  Plug,
};

export default function PlatformPage() {
  return (
    <main id="main-content">
      <LpNavbar1 />
      {/* Breadcrumbs */}
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <Breadcrumbs items={[{ label: "Platform" }]} />
      </div>

      {/* Enhanced Hero Section with Image */}
      <section className="relative bg-[#F7F6F3] section-padding-y border-b border-[#E3E3E0] overflow-hidden" style={{ 
        paddingTop: '80px'
      }}>
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <div className="flex-1 flex flex-col gap-8">
              <div className="section-title-gap-lg flex flex-col">
                <Tagline className="mb-4">Platform</Tagline>
                <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] font-bold">
                  The Enterprise Annotation Control Plane for{" "}
                  <span className="text-[#1A1AFF]">Model-Ready Data</span>
                </h1>
                <p className="text-[#737373] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed max-w-2xl font-sans">
                  Flexibench is a unified annotation platform engineered to convert raw data into structured,
                  consistent, and model-aligned datasets. It orchestrates annotation workflows, quality
                  engineering, and tooling across text, image, video, and audio.
                </p>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="flex-1 w-full">
              <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0]">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="/Platform_hero.png"
                    alt="Enterprise annotation platform dashboard showing workflow orchestration, quality metrics, and data pipelines"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.blue}
                    className="object-cover object-top"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PlatformOverviewSection />

      {/* Platform Value Summary Section */}
      <section className="relative bg-white section-padding-y border-b border-[#E3E3E0] overflow-hidden">
        <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 md:gap-16">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            <div className="flex-1 max-w-xl">
              <Tagline className="mb-6">Platform Value</Tagline>
              <h2 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-display leading-[1.1] text-[#0A0A0A] font-bold mb-6">
                At its core, Flexibench is not just a{" "}
                <span className="text-[#1A1AFF]">labeling tool</span>
              </h2>
              <p className="text-[#737373] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed font-sans">
                It is an annotation control plane that enables organizations to produce higher fidelity
                datasets, more consistent models, and faster iteration cycles.
              </p>
            </div>
            {/* Visual Element on Right */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0] bg-white p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[Network, Sparkles, Shield, Plug].map((Icon, idx) => (
                    <div key={idx} className="bg-[#F7F6F3] rounded-[3px] p-4 border border-[#E3E3E0] flex items-center justify-center">
                      <Icon className="h-8 w-8 text-[#1A1AFF]" />
                    </div>
                  ))}
                </div>
                <p className="text-[15px] font-medium text-[#0A0A0A] text-center font-sans">
                  Four Pillars of Platform Value
                </p>
              </div>
            </div>
          </div>

          {/* Platform Value Cards - Vertical Stacked Design with Alternating Sides */}
          <div className="flex flex-col gap-8">
            {[
              {
                icon: Network,
                title: "Enforces Structural Consistency",
                description: "Through advanced ontology management",
                image: "/Dynamic_Taxonomy_Support.png",
                color: "from-blue-500/15 to-blue-500/8",
              },
              {
                icon: Sparkles,
                title: "Improves Speed",
                description: "Reduces human drudgery with AI-assisted labeling",
                image: "/Configurable_Annotator_Workflows.png",
                color: "from-purple-500/15 to-purple-500/8",
              },
              {
                icon: Shield,
                title: "Embeds Quality Engineering",
                description: "Into every annotation task",
                image: "/Quality_Control_and_Review_Gates.png",
                color: "from-green-500/15 to-green-500/8",
              },
              {
                icon: Plug,
                title: "Integrates Tightly",
                description: "With engineering and model training workflows via APIs",
                image: "/Unified_Data_Management.png",
                color: "from-orange-500/15 to-orange-500/8",
              },
            ].map((value, index) => {
              const IconComponent = value.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={index}
                  className={`group flex flex-col lg:flex-row gap-8 lg:gap-12 items-center ${
                    !isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Left Side - Content (Alternates) */}
                  <div className="flex-1 flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#F7F6F3] flex h-16 w-16 shrink-0 items-center justify-center rounded-[3px] border border-[#E3E3E0]">
                        <IconComponent className="text-[#1A1AFF] h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-[32px] font-bold text-[#737373] leading-none">{String(index + 1).padStart(2, '0')}</span>
                          <div className="h-px flex-1 bg-[#E3E3E0]" />
                        </div>
                        <h3 className="text-[20px] sm:text-[24px] md:text-[28px] font-display font-bold text-[#0A0A0A] leading-tight">
                          {value.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-[#737373] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed pl-20 max-w-2xl font-sans">
                      {value.description}
                    </p>
                    <div className="pl-20 pt-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F7F6F3] rounded-[3px] border border-[#E3E3E0]">
                        <div className="w-2 h-2 bg-[#1A1AFF]" />
                        <span className="font-mono text-[11px] font-semibold text-[#0A0A0A] uppercase tracking-wider">Core Platform Benefit</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Image (Alternates) */}
                  <div className="flex-1 max-w-lg">
                    <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0]">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={value.image}
                          alt={value.title}
                          fill
                          className={`object-cover object-top`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Summary Statement */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="relative bg-white rounded-[4px] border border-[#E3E3E0] p-8 md:p-12">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="h-px flex-1 bg-[#E3E3E0]" />
                <div className="bg-[#F7F6F3] rounded-[3px] p-2 border border-[#E3E3E0]">
                  <Sparkles className="h-6 w-6 text-[#1A1AFF]" />
                </div>
                <div className="h-px flex-1 bg-[#E3E3E0]" />
              </div>
              
              <p className="text-[#0A0A0A] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-center font-sans mb-6">
                This combination enables organizations to produce{" "}
                <span className="font-bold text-[#1A1AFF]">higher fidelity datasets</span>
                ,{" "}
                <span className="font-bold text-[#1A1AFF]">more consistent models</span>
                , and{" "}
                <span className="font-bold text-[#1A1AFF]">faster iteration cycles</span>
                {" "}ensuring annotation is a force multiplier, not a bottleneck.
              </p>
              
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="h-px flex-1 bg-[#E3E3E0]" />
                <div className="font-mono text-[11px] font-semibold text-[#737373] uppercase tracking-wider">
                  Platform Value Proposition
                </div>
                <div className="h-px flex-1 bg-[#E3E3E0]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </main>
  );
}
