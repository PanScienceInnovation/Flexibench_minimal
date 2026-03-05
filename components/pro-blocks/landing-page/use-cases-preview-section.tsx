"use client";

import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { useCases } from "@/lib/flexibench-content";
import { FileText, Image as ImageIcon, Video, Music, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const modalityIcons: Record<string, typeof FileText> = {
  Text: FileText,
  Image: ImageIcon,
  Video: Video,
  Audio: Music,
};

export function UseCasesPreviewSection() {
  // Get 3 featured use cases (first from different industries)
  const featuredUseCases = [
    useCases[0], // Healthcare - Text
    useCases[1], // Automotive - Video (Pedestrian Occlusion Track Annotation)
    useCases[7], // Retail - Image
  ];

  const industryColors: Record<string, string> = {
    "Healthcare & Life Sciences": "from-slate-600/10 to-slate-600/5",
    "Automotive & Mobility": "from-orange-600/10 to-orange-600/5",
    "Retail & E-commerce": "from-indigo-600/10 to-indigo-600/5",
  };

  return (
    <section className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden">
      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-4 sm:gap-6">
          <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] text-[#737373] dark:text-[#A3A3A3]">
            Use Cases
          </div>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3]">
            Annotation Use Cases Across{" "}
            <span className="text-[#1A1AFF]">Industries</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] text-center max-w-2xl">
            Explore real-world annotation workflows that solve enterprise challenges across industries and modalities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 max-w-7xl mx-auto">
          {featuredUseCases.map((useCase, index) => {
            const IconComponent = modalityIcons[useCase.modality] || FileText;
            
            return (
              <div
                key={useCase.id}
                className="bg-white border border-[#E3E3E0] rounded-[4px] overflow-hidden hover:border-[#1A1AFF] transition-colors duration-200"
              >
                {/* Image Section */}
                <div className="relative h-40 overflow-hidden border-b border-[#E3E3E0]">
                  <Image
                    src={
                      useCase.id === 1
                        ? "/use-cases/Healthcare2.png"
                        : useCase.id === 2
                        ? "/use-cases/infrastructure3.jpg"
                        : useCase.id === 8
                        ? "/use-cases/Legal.png"
                        : "/use-cases/Healthcare2.png"
                    }
                    alt={`${useCase.industry} use case: ${useCase.title} showing ${useCase.modality.toLowerCase()} annotation workflow`}
                    fill
                    className="object-cover object-top grayscale-[10%] brightness-[1.05]"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="bg-white rounded-[3px] p-2 border border-[#E3E3E0]">
                      <IconComponent className="h-5 w-5 text-[#0A0A0A]" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-start gap-2">
                    <span className="font-mono text-[10px] border border-[#E3E3E0] bg-[#F7F6F3] px-2 py-1 rounded-[2px] text-[#0A0A0A]">
                      {useCase.industry.split(" ")[0]}
                    </span>
                    <span className="font-mono text-[10px] border border-[#E3E3E0] bg-[#F7F6F3] px-2 py-1 rounded-[2px] text-[#0A0A0A]">
                      {useCase.modality}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="font-mono text-[11px] text-[#A3A3A3] mb-1">
                    {String(index + 1).padStart(2, '0')} /
                  </div>
                  <h3 className="font-display text-[20px] text-[#0A0A0A] mb-3">
                    {useCase.title}
                  </h3>
                  <div>
                    <p className="font-mono text-[10px] text-[#A3A3A3] uppercase tracking-widest mb-2">PROBLEM</p>
                    <p className="font-sans text-[15px] text-[#737373] leading-[1.7]">
                      {useCase.problem}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Link href="/use-cases">
            <Button variant="outline" size="lg" className="gap-2 border border-[#E3E3E0] text-[#0A0A0A] bg-transparent hover:bg-[#F0EFE9] rounded-[3px] font-mono">
              Explore All {useCases.length} Use Cases
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
