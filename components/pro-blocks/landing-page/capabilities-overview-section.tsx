"use client";

import { FileText, Image as ImageIcon, Video, Music, ArrowRight } from "lucide-react";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { capabilities } from "@/lib/flexibench-content";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { blurPlaceholders } from "@/lib/image-utils";

const iconMap: Record<string, typeof FileText> = {
  FileText,
  Image: ImageIcon,
  Video,
  Music,
};

export function CapabilitiesOverviewSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const capabilityColors = [
    "from-slate-600/15 to-slate-600/8",
    "from-indigo-600/15 to-indigo-600/8",
    "from-orange-600/15 to-orange-600/8",
    "from-blue-900/15 to-blue-900/8",
  ];

  return (
    <section
      className="relative bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950 section-padding-y border-b overflow-hidden"
      id="capabilities"
    >
      {/* Enhanced Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-900/6 rounded-full blur-3xl" />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/4 via-transparent to-orange-600/4" />
      </div>

      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 md:gap-16">
        <div className={`mx-auto flex max-w-3xl flex-col items-center text-center gap-6 transition-all duration-[3000ms] ease-out ${isVisible ? 'opacity-100 animate-slide-in-subtle' : 'opacity-0'}`}>
          <Tagline>Capabilities</Tagline>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            Multimodal Annotation Built for{" "}
            <span className="text-primary">Real-World</span> Model Training
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Flexibench supports deep, configurable, and scalable annotation workflows across Text,
            Image, Video, and Audio with tooling designed for quality, governance, and model-aligned outputs.
          </p>
        </div>

        {/* Horizontal marquee-style scroll for capabilities tiles */}
        <div className="relative w-full">
          <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]">
            <div className="animate-infinite-scroll flex w-max items-stretch gap-6 py-2">
              {[...capabilities, ...capabilities].map((capability, index) => {
                const IconComponent = iconMap[capability.icon] || FileText;
                const colorClass = capabilityColors[index % capabilityColors.length];

                return (
                  <Card
                    key={`${capability.type}-${index}`}
                    className="group relative bg-gradient-to-br from-background to-secondary/40 border border-border/50 overflow-hidden rounded-2xl p-0 shadow-md hover:shadow-lg transition-all duration-[2500ms] ease-out flex-shrink-0 w-72 hover-lift"
                  >
                    {/* Background Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out`}
                    />

                    {/* Image Header */}
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={
                          capability.type === "Text"
                            ? "/text_annotation.png"
                            : capability.type === "Image"
                            ? "/image_annotation.png"
                            : capability.type === "Video"
                            ? "/video_annotation.png"
                            : "/audio_annotation.png"
                        }
                        alt={`${capability.type} annotation interface`}
                        fill
                        placeholder="blur"
                        blurDataURL={blurPlaceholders.default}
                        loading="lazy"
                        className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <div className="bg-background/90 backdrop-blur-sm rounded-lg p-2 border border-border/30 shadow group-hover:scale-110 transition-transform duration-[2500ms] ease-out">
                          <IconComponent className="text-primary h-5 w-5 group-hover:rotate-6 transition-transform duration-[2500ms] ease-out" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-5 flex flex-col gap-3">
                      <h3 className="text-foreground font-semibold text-xl md:text-2xl group-hover:text-primary transition-colors">
                        {capability.type} Annotation
                      </h3>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                        {capability.whatItDoes}
                      </p>
                      <Link
                        href={`/capabilities/${capability.type.toLowerCase()}`}
                        className="text-primary text-sm font-semibold hover:underline mt-1 inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                      >
                        Learn more
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-[2500ms] ease-out" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
