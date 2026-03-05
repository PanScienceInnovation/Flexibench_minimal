import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { capabilities } from "@/lib/flexibench-content";
import { FileText, Image as ImageIcon, Video, Music, ArrowRight, Sparkles, Layers, CheckCircle, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { blurPlaceholders } from "@/lib/image-utils";

const iconMap: Record<string, typeof FileText> = {
  FileText,
  Image: ImageIcon,
  Video,
  Music,
};

// Unique images for each annotation type - using local images from public folder
const capabilityImages: Record<string, {
  hero: string;
  core: string;
  clients: string;
  why: string;
}> = {
  Text: {
    hero: "/text_annotation.png",
    core: "/capabilties2.png",
    clients: "/Configurable_Annotator_Workflows.png",
    why: "/why_text_annotation_matters.png",
  },
  Image: {
    hero: "/image_annotation.png",
    core: "/capabilities3.png",
    clients: "/Phonex1.png",
    why: "/core_capabilities_video.png",
  },
  Video: {
    hero: "/video_annotation.png",
    core: "/core_capabilities_video.png",
    clients: "/what_client_gets_video.png",
    why: "/why_video_annotation_matters.png",
  },
  Audio: {
    hero: "/audio_annotation.png",
    core: "/Core_capabilities_audio.png",
    clients: "/what_client_gets_audio.png",
    why: "/why_audio_annotation_matters.png",
  },
};

// Unified gradient based on primary color
const capabilityGradients: Record<string, string> = {
  Text: "from-primary/90 via-primary/80 to-primary/70",
  Image: "from-primary/90 via-primary/80 to-primary/70",
  Video: "from-primary/90 via-primary/80 to-primary/70",
  Audio: "from-primary/90 via-primary/80 to-primary/70",
};

export default function CapabilitiesPage() {
  return (
    <main id="main-content">
      <LpNavbar1 />
      {/* Breadcrumbs */}
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <Breadcrumbs items={[{ label: "Capabilities" }]} />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden" style={{ 
        paddingTop: '60px'
      }}>
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-8">
              <div className="section-title-gap-lg flex flex-col">
                <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] bg-white px-3 py-1 rounded-[3px] text-[#737373] inline-block mb-4">
                  Capabilities
                </div>
                <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3]">
                  Multimodal annotation capabilities built for{" "}
                  <span className="text-[#1A1AFF]">real-world</span> model training
                </h1>
                <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-2xl">
                  Flexibench supports deep, configurable, and scalable annotation workflows across Text,
                  Image, Video, and Audio with tooling designed for quality, governance, and model-aligned outputs.
                </p>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="flex-1 w-full">
              <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0]">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="/core_capabilities.jpeg"
                    alt="Multimodal annotation capabilities showing text, image, video, and audio annotation interfaces"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.purple}
                    className="object-cover object-top grayscale-[10%] brightness-[1.05]"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Annotation Types - One After Another with Unique Designs */}
      {capabilities.map((capability, index) => {
        const IconComponent = iconMap[capability.icon] || FileText;
        const isEven = index % 2 === 0;
        const gradient = capabilityGradients[capability.type] || capabilityGradients.Text;
        
        return (
          <section
            key={capability.type}
            className={`relative ${index % 2 === 0 ? 'bg-white dark:bg-[#0A0A0A]' : 'bg-[#F7F6F3] dark:bg-[#0A0A0A]'} section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden`}
          >
            <div className="container-padding-x container mx-auto relative z-10">
              {/* Hero Section for Each Capability */}
              <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                {/* Text Content */}
                <div className="flex-1 flex flex-col gap-8">
                  <div className="section-title-gap-lg flex flex-col">
                    <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] text-[#737373] dark:text-[#A3A3A3] inline-block mb-4">
                      {capability.type} Annotation
                    </div>
                    <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3]">
                      {capability.type} Annotation for{" "}
                      <span className="text-[#1A1AFF]">
                        {capability.type === "Text" ? "Language" : capability.type === "Image" ? "Vision" : capability.type === "Video" ? "Temporal" : "Audio"}
                      </span>{" "}
                      Models
                    </h2>
                    <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-2xl">
                      {capability.whatItDoes}
                    </p>
                  </div>
                </div>
                
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0]">
                    <AspectRatio ratio={16 / 10}>
                      <Image
                        src={capabilityImages[capability.type]?.hero || capabilityImages.Text.hero}
                        alt={`${capability.type} annotation interface and workflows`}
                        fill
                        priority={index === 0}
                        placeholder="blur"
                        blurDataURL={blurPlaceholders.purple}
                        className="object-cover object-top grayscale-[10%] brightness-[1.05]"
                      />
                    </AspectRatio>
                  </div>
                </div>
              </div>

              {/* Content Section with Sharp Cards */}
              <div className="mt-20 flex flex-col gap-8">
                {/* Core Capabilities and What Clients Get - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-6 sm:p-8 hover:border-[#1A1AFF] transition-colors duration-200">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 sm:p-3">
                        <IconComponent className="text-[#0A0A0A] dark:text-[#F7F6F3] h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <h3 className="font-display text-[18px] sm:text-[20px] md:text-[22px] text-[#0A0A0A] dark:text-[#F7F6F3]">Core Capabilities</h3>
                    </div>
                    <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                      {capability.coreCapabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-3 font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] dark:bg-[#F7F6F3] mt-1.5 shrink-0" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Mini Image */}
                    <div className="relative h-32 sm:h-40 rounded-[4px] overflow-hidden border border-[#E3E3E0] dark:border-[#2A2A2A]">
                      <Image
                        src={capabilityImages[capability.type]?.core || capabilityImages.Text.core}
                        alt="Core capabilities visualization"
                        fill
                        className="object-cover object-top grayscale-[10%] brightness-[1.05] dark:brightness-[0.9]"
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-6 sm:p-8 hover:border-[#1A1AFF] transition-colors duration-200">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 sm:p-3">
                        <Sparkles className="text-[#0A0A0A] dark:text-[#F7F6F3] h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <h3 className="font-display text-[18px] sm:text-[20px] md:text-[22px] text-[#0A0A0A] dark:text-[#F7F6F3]">What Clients Get</h3>
                    </div>
                    <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7] mb-4 sm:mb-6">{capability.whatClientsGet}</p>
                    
                    {/* Mini Image */}
                    <div className="relative h-48 sm:h-64 rounded-[4px] overflow-hidden border border-[#E3E3E0] dark:border-[#2A2A2A]">
                      <Image
                        src={capabilityImages[capability.type]?.clients || capabilityImages.Text.clients}
                        alt="Client benefits visualization"
                        fill
                        className="object-cover object-top grayscale-[10%] brightness-[1.05] dark:brightness-[0.9]"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                {/* Why It Matters Section - Full Width */}
                <div className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] overflow-hidden hover:border-[#1A1AFF] transition-colors duration-200">
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex-1 p-6 sm:p-8 lg:p-12 flex flex-col gap-4 sm:gap-6">
                      <div className="flex items-center gap-3 sm:gap-4 mb-4">
                        <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 sm:p-3">
                          <IconComponent className="text-[#0A0A0A] dark:text-[#F7F6F3] h-6 w-6 sm:h-8 sm:w-8" />
                        </div>
                        <h3 className="font-display text-[18px] sm:text-[20px] md:text-[22px] text-[#0A0A0A] dark:text-[#F7F6F3]">Why {capability.type} Annotation Matters</h3>
                      </div>
                      <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">
                        {capability.whyItMatters}
                      </p>
                    </div>
                    <div className="flex-1 relative h-48 sm:h-64 lg:h-auto min-h-[300px] sm:min-h-[400px] border-t lg:border-t-0 lg:border-l border-[#E3E3E0] dark:border-[#2A2A2A]">
                      <Image
                        src={capabilityImages[capability.type]?.why || capabilityImages.Text.why}
                        alt="Why it matters visualization"
                        fill
                        className="object-cover object-top grayscale-[10%] brightness-[1.05] dark:brightness-[0.9]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Platform-Wide Capabilities Section */}
      <section className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden">
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="section-title-gap-lg mx-auto flex max-w-3xl flex-col items-center text-center mb-16 relative z-10">
            <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] text-[#737373] dark:text-[#A3A3A3] inline-block mb-4">
              Platform-Wide Capabilities
            </div>
            <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3]">
              Capabilities That{" "}
              <span className="text-[#1A1AFF]">Span All Modalities</span>
            </h2>
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed mt-4 max-w-2xl">
              Powerful features that work seamlessly across Text, Image, Video, and Audio annotation workflows
            </p>
          </div>

          {/* Enhanced Capabilities Grid - Sharp Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
            {[
              { 
                title: "AI-Assisted Pre-Labeling", 
                desc: "Model suggestions speed up human review", 
                icon: Sparkles, 
                image: "/capabilties2.png",
                color: "from-[oklch(0.68_0.15_50)]/20 to-[oklch(0.68_0.15_50)]/10",
              },
              { 
                title: "Configurable Annotator Workflows", 
                desc: "Tailor interfaces per task", 
                icon: Layers, 
                image: "/Configurable_Annotator_Workflows.png",
                color: "from-[oklch(0.68_0.15_50)]/20 to-[oklch(0.68_0.15_50)]/10",
              },
              { 
                title: "Dynamic Taxonomy Support", 
                desc: "Reuse ontologies across projects", 
                icon: CheckCircle, 
                image: "/Dynamic_Taxonomy_Support.png",
                color: "from-[oklch(0.68_0.15_50)]/20 to-[oklch(0.68_0.15_50)]/10",
              },
              { 
                title: "Quality Control and Review Gates", 
                desc: "Multi-tier validation pipelines", 
                icon: CheckCircle, 
                image: "/Quality_Control_and_Review_Gates.png",
                color: "from-[oklch(0.68_0.15_50)]/20 to-[oklch(0.68_0.15_50)]/10",
              },
              { 
                title: "Unified Data Management", 
                desc: "Consistent datasets for training and deployment", 
                icon: Layers, 
                image: "/Unified_Data_Management.png",
                color: "from-[oklch(0.68_0.15_50)]/20 to-[oklch(0.68_0.15_50)]/10",
              },
              { 
                title: "Real-time Collaboration", 
                desc: "Seamless team coordination and workflow management", 
                icon: Zap, 
                image: "/capabilities3.png",
                color: "from-[oklch(0.68_0.15_50)]/20 to-[oklch(0.68_0.15_50)]/10",
              },
            ].map((capability, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] overflow-hidden hover:border-[#1A1AFF] transition-colors duration-200"
              >
                {/* Image Header */}
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <Image
                    src={capability.image}
                    alt={capability.title}
                    fill
                    className="object-cover object-top grayscale-[10%] brightness-[1.05] dark:brightness-[0.9]"
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <div className="bg-white dark:bg-[#141414] rounded-[3px] p-1.5 sm:p-2 border border-[#E3E3E0] dark:border-[#2A2A2A]">
                      <capability.icon className="text-[#0A0A0A] dark:text-[#F7F6F3] h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <div className="font-mono text-[10px] sm:text-[11px] border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[2px] text-[#0A0A0A] dark:text-[#F7F6F3]">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-4">
                  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                    <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 sm:p-3 flex-shrink-0">
                      <capability.icon className="text-[#0A0A0A] dark:text-[#F7F6F3] h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-[18px] sm:text-[20px] text-[#0A0A0A] dark:text-[#F7F6F3] mb-2">
                        {capability.title}
                      </h3>
                      <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">
                        {capability.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-8 sm:p-10 md:p-12 text-center">
              <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
                <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 sm:p-3">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-[#0A0A0A] dark:text-[#F7F6F3]" />
                </div>
              </div>
              
              <h3 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3] mb-4 sm:mb-6">
                Ready to Transform Your{" "}
                <span className="text-[#1A1AFF]">Annotation Workflows?</span>
              </h3>
              <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                Start building model-ready datasets with Flexibench's enterprise-grade annotation platform
              </p>
              
              <Button asChild size="lg" className="text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-8 bg-[#0A0A0A] dark:bg-[#F7F6F3] text-white dark:text-[#0A0A0A] hover:bg-[#1A1AFF] dark:hover:bg-[#1A1AFF] dark:hover:text-white rounded-[3px] font-mono transition-colors duration-400">
                <Link href="/contact" className="flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
              
              {/* Additional CTA Links */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap">
                <Link href="/platform" className="font-sans text-[13px] sm:text-[14px] md:text-[15px] text-[#737373] dark:text-[#A3A3A3] hover:text-[#0A0A0A] dark:hover:text-[#F7F6F3] underline underline-offset-4 transition-colors">
                  Learn More
                </Link>
                <span className="text-[#E3E3E0] dark:text-[#2A2A2A]">•</span>
                <Link href="/use-cases" className="font-sans text-[13px] sm:text-[14px] md:text-[15px] text-[#737373] dark:text-[#A3A3A3] hover:text-[#0A0A0A] dark:hover:text-[#F7F6F3] underline underline-offset-4 transition-colors">
                  View Use Cases
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </main>
  );
}
