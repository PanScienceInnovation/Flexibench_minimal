import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { capabilities } from "@/lib/flexibench-content";
import { FileText, Image as ImageIcon, Video, Music, ArrowLeft } from "lucide-react";
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

export function generateStaticParams() {
  return capabilities.map((capability) => ({
    type: capability.type.toLowerCase(),
  }));
}

export default async function CapabilityTypePage({
  params,
}: {
  params: Promise<{ type: string }> | { type: string };
}) {
  // Handle both Promise and direct params (Next.js 15+ compatibility)
  const resolvedParams = params instanceof Promise ? await params : params;
  const type = resolvedParams?.type ? resolvedParams.type.charAt(0).toUpperCase() + resolvedParams.type.slice(1) : '';
  const capability = capabilities.find((c) => c.type === type);

  if (!capability) {
    return (
      <main>
        <LpNavbar1 />
        <section className="bg-secondary section-padding-y">
          <div className="container-padding-x container mx-auto text-center">
            <h1 className="heading-lg">Capability not found</h1>
            <Link href="/capabilities" className="text-primary underline">
              Back to Capabilities
            </Link>
          </div>
        </section>
        <Footer1 />
      </main>
    );
  }

  const IconComponent = iconMap[capability.icon] || FileText;

  return (
    <main id="main-content">
      <LpNavbar1 />
      {/* Breadcrumbs */}
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <Breadcrumbs items={[
          { label: "Capabilities", href: "/capabilities" },
          { label: `${capability.type} Annotation` }
        ]} />
      </div>

      {/* Enhanced Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 section-padding-y border-b overflow-hidden" style={{ paddingTop: '80px' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container-padding-x container mx-auto relative z-10">
          <Link href="/capabilities" className="text-white/80 text-base mb-8 inline-flex items-center gap-2 hover:text-white hover:underline transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Capabilities
          </Link>
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col gap-8 text-white">
              <div className="section-title-gap-lg flex flex-col">
                <Tagline variant="white" className="mb-4">{capability.type} Annotation</Tagline>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                  {capability.type} Annotation for{" "}
                  <span className="relative inline-block">
                    {capability.type === "Text" ? "Language" : capability.type === "Image" ? "Vision" : capability.type === "Video" ? "Temporal" : "Audio"}
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/40" viewBox="0 0 300 12" fill="none">
                      <path d="M2 8 Q75 4, 150 8 T298 8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </span>{" "}
                  Models
                </h1>
                <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
                  {capability.whatItDoes}
                </p>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src={capabilityImages[capability.type]?.hero || capabilityImages.Text.hero}
                    alt={`${capability.type} annotation interface and workflows`}
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.purple}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-indigo-900/30 to-transparent" />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content Section with Images */}
      <section className="relative bg-gradient-to-b from-background via-secondary/20 to-background section-padding-y border-b overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        
        <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-16">
          {/* Icon Header with Image Background */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative bg-gradient-to-br from-primary/20 to-primary/5 flex h-32 w-32 items-center justify-center rounded-3xl border-2 border-primary/30 shadow-2xl">
                <IconComponent className="text-primary h-16 w-16" />
              </div>
            </div>
          </div>

          {/* Two Column Layout with Images */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <Card className="group relative bg-gradient-to-br from-background to-secondary/40 rounded-2xl border-2 border-border/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:border-primary/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="relative flex flex-col gap-6 p-0">
                <h2 className="text-foreground text-xl md:text-2xl font-bold flex items-center gap-3">
                  <div className="bg-primary/20 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20">
                    <IconComponent className="text-primary h-5 w-5" />
                  </div>
                  Core Capabilities
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-3">
                  {capability.coreCapabilities.map((cap, idx) => (
                    <li key={idx} className="leading-relaxed">{cap}</li>
                  ))}
                </ul>
                
                {/* Mini Image */}
                <div className="relative h-40 rounded-xl overflow-hidden border border-border/30 mt-4 group-hover:border-primary/30 transition-colors">
                  <Image
                    src={capabilityImages[capability.type]?.core || capabilityImages.Text.core}
                    alt="Core capabilities visualization"
                    fill
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.default}
                    loading="lazy"
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                </div>
              </CardContent>
            </Card>

            <Card className="group relative bg-gradient-to-br from-background to-secondary/40 rounded-2xl border-2 border-border/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:border-primary/30 overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -ml-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="relative flex flex-col gap-6 p-0">
                <h2 className="text-foreground text-xl md:text-2xl font-bold">What Clients Get</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{capability.whatClientsGet}</p>
                
                {/* Mini Image */}
                <div className="relative h-40 rounded-xl overflow-hidden border border-border/30 mt-4 group-hover:border-primary/30 transition-colors">
                  <Image
                    src={capabilityImages[capability.type]?.clients || capabilityImages.Text.clients}
                    alt="Client benefits visualization"
                    fill
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.default}
                    loading="lazy"
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Why It Matters Section with Large Image */}
          <Card className="group relative bg-gradient-to-br from-background to-secondary/40 rounded-2xl border-2 border-border/50 p-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:border-primary/30 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-8 lg:p-12 flex flex-col gap-6">
                <h2 className="text-foreground text-xl md:text-2xl font-bold">Why It Matters</h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  {capability.whyItMatters}
                </p>
              </div>
              <div className="flex-1 relative h-64 lg:h-auto min-h-[300px]">
                <Image
                  src={capabilityImages[capability.type]?.why || capabilityImages.Text.why}
                  alt="Why it matters visualization"
                  fill
                  placeholder="blur"
                  blurDataURL={blurPlaceholders.default}
                  loading="lazy"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent lg:bg-gradient-to-l" />
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="flex justify-center">
            <Button asChild size="lg" className="text-base h-14 px-8">
              <Link href="/contact">
                Get Started with {capability.type} Annotation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer1 />
    </main>
  );
}
