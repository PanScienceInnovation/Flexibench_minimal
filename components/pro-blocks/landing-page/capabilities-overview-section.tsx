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
      className="relative bg-white section-padding-y border-b border-[#E3E3E0] overflow-hidden"
      id="capabilities"
    >
      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10 flex flex-col gap-16">
        <div className={`mx-auto flex max-w-3xl flex-col items-center text-center gap-6 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] bg-white px-3 py-1 rounded-[3px] text-[#737373]">
            Capabilities
          </div>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A]">
            Multimodal Annotation Built for{" "}
            <span className="text-[#1A1AFF]">Real-World</span> Model Training
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] text-center max-w-2xl">
            Flexibench supports deep, configurable, and scalable annotation workflows across Text,
            Image, Video, and Audio with tooling designed for quality, governance, and model-aligned outputs.
          </p>
        </div>

        {/* Grid Layout - Sharp Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {capabilities.map((capability, index) => {
            const IconComponent = iconMap[capability.icon] || FileText;

            return (
              <div
                key={capability.type}
                className={`bg-white border border-[#E3E3E0] rounded-[4px] overflow-hidden hover:border-[#1A1AFF] transition-colors duration-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image Header */}
                <div className="relative h-32 sm:h-40 overflow-hidden border-b border-[#E3E3E0]">
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
                    className="object-cover object-top grayscale-[20%] brightness-[1.05]"
                  />
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <div className="bg-white rounded-[3px] p-1.5 sm:p-2 border border-[#E3E3E0]">
                      <IconComponent className="text-[#0A0A0A] h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <div className="font-mono text-[9px] sm:text-[10px] border border-[#E3E3E0] bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[2px] text-[#0A0A0A]">
                      {capability.type.toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6 flex flex-col gap-2 sm:gap-3">
                  <div className="font-mono text-[10px] sm:text-[11px] text-[#A3A3A3] mb-1">
                    {String(index + 1).padStart(2, '0')} /
                  </div>
                  <h3 className="font-display text-[18px] sm:text-[20px] text-[#0A0A0A]">
                    {capability.type} Annotation
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] leading-[1.7]">
                    {capability.whatItDoes}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
