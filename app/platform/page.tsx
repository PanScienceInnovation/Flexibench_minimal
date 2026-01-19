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
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 section-padding-y border-b overflow-hidden" style={{ paddingTop: '80px' }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        {/* Animated Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <div className="flex-1 flex flex-col gap-8 text-white">
              <div className="section-title-gap-lg flex flex-col">
                <Tagline variant="white" className="mb-4">Platform</Tagline>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                  The Enterprise Annotation Control Plane for{" "}
                  <span className="relative inline-block">
                    Model-Ready Data
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/40" viewBox="0 0 300 12" fill="none">
                      <path d="M2 8 Q75 4, 150 8 T298 8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                </h1>
                <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
                  Flexibench is a unified annotation platform engineered to convert raw data into structured,
                  consistent, and model-aligned datasets. It orchestrates annotation workflows, quality
                  engineering, and tooling across text, image, video, and audio.
                </p>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="/Platform_hero.png"
                    alt="Enterprise annotation platform dashboard showing workflow orchestration, quality metrics, and data pipelines"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.blue}
                    className="object-cover object-top transition-transform duration-[3000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-900/30 to-transparent" />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PlatformOverviewSection />

      {/* Platform Value Summary Section - Completely Different Design */}
      <section className="relative bg-gradient-to-b from-secondary/40 via-background to-secondary/30 section-padding-y border-b overflow-hidden">
        {/* Unique Background - Organic Pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, currentColor 2px, transparent 0), radial-gradient(circle at 80% 80%, currentColor 2px, transparent 0), radial-gradient(circle at 40% 20%, currentColor 1.5px, transparent 0)`,
          backgroundSize: '120px 120px, 100px 100px, 140px 140px'
        }} />
        {/* Softer gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/8 rounded-full blur-3xl" />
        
        <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-16 md:gap-20">
          {/* Header Section - Left Aligned */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
            <div className="flex-1 max-w-xl">
              <Tagline className="mb-6">Platform Value</Tagline>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-foreground mb-6">
                At its core, Flexibench is not just a{" "}
                <span className="relative inline-block text-primary">
                  labeling tool
                  <svg className="absolute -bottom-3 left-0 w-full h-4 text-primary/30" viewBox="0 0 400 16" fill="none">
                    <path d="M2 12 Q100 4, 200 12 T398 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                It is an annotation control plane that enables organizations to produce higher fidelity
                datasets, more consistent models, and faster iteration cycles.
              </p>
            </div>
            {/* Visual Element on Right */}
            <div className="flex-1 max-w-md lg:max-w-lg">
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-primary/5 to-transparent p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10" />
                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[Network, Sparkles, Shield, Plug].map((Icon, idx) => (
                      <div key={idx} className="bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/50 flex items-center justify-center">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                    ))}
                  </div>
                  <p className="text-base font-semibold text-foreground/80 text-center">
                    Four Pillars of Platform Value
                  </p>
                </div>
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
                      <div className={`bg-gradient-to-br ${value.color} flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-primary/20 shadow-xl  group-hover:border-primary/40 transition-all duration-[2500ms] ease-out`}>
                        <IconComponent className="text-primary h-10 w-10" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-5xl font-black text-primary/20 leading-none">{String(index + 1).padStart(2, '0')}</span>
                          <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                          {value.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed pl-24 max-w-2xl">
                      {value.description}
                    </p>
                    <div className="pl-24 pt-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-base font-semibold text-foreground">Core Platform Benefit</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side - Image (Alternates) */}
                  <div className="flex-1 max-w-lg">
                    <div className="relative rounded-2xl overflow-hidden border-2 border-border/50 shadow-xl group-hover:shadow-2xl transition-all duration-[2500ms] ease-out group-">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={value.image}
                          alt={value.title}
                          fill
                          className="object-cover  transition-transform duration-[3000ms] ease-out"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final Summary Statement - Enhanced Design */}
          <div className="mt-12 max-w-5xl mx-auto">
            <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/40 rounded-3xl border-2 border-primary/30 p-10 md:p-12 shadow-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -ml-24 -mb-24" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <div className="bg-primary/20 rounded-full p-2 border border-primary/30">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </div>
                
                <p className="text-foreground text-base md:text-lg leading-relaxed text-center font-medium mb-6">
                  This combination enables organizations to produce{" "}
                  <span className="relative inline-block font-bold text-primary">
                    higher fidelity datasets
                    <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/20" viewBox="0 0 200 8" fill="none">
                      <path d="M0 4 Q50 0, 100 4 T200 4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  ,{" "}
                  <span className="relative inline-block font-bold text-primary">
                    more consistent models
                    <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/20" viewBox="0 0 200 8" fill="none">
                      <path d="M0 4 Q50 0, 100 4 T200 4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  , and{" "}
                  <span className="relative inline-block font-bold text-primary">
                    faster iteration cycles
                    <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/20" viewBox="0 0 200 8" fill="none">
                      <path d="M0 4 Q50 0, 100 4 T200 4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>
                  {" "}ensuring annotation is a force multiplier, not a bottleneck.
                </p>
                
                <div className="flex items-center justify-center gap-3 mt-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  <div className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Platform Value Proposition
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </main>
  );
}
