"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { internalTools } from "@/lib/flexibench-content";
import { Workflow, Mic, Users, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const iconMap: Record<string, typeof Workflow> = {
  Workflow,
  Mic,
  Users,
};

export function InternalToolsSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section className="relative bg-white dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden">
      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">
        {/* Section Title */}
        <div className={`mx-auto flex max-w-3xl flex-col items-center text-center gap-4 sm:gap-6 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] text-[#737373] dark:text-[#A3A3A3]">
            Ecosystem
          </div>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3]">
            Extend Annotation from{" "}
            <span className="text-[#1A1AFF]">Tasks</span> to{" "}
            <span className="text-[#1A1AFF]">Strategy</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] text-center max-w-2xl">
            Flexibench is bolstered by internal tools that extend its reach: DataBench for workflow
            orchestration (with advanced modules like Phonex) and FlexiPod for outcome-driven execution.
          </p>
        </div>

        {/* Grid Layout - Sharp Cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 max-w-7xl mx-auto">
          {/* Wide Card - DataBench */}
          <div className={`bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] overflow-hidden hover:border-[#1A1AFF] transition-colors duration-200 lg:col-span-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '100ms' }}>
            <div className="p-6 sm:p-8 flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 sm:p-3 flex-shrink-0">
                  {(() => {
                    const IconComponent = iconMap[internalTools[0].icon];
                    return IconComponent ? <IconComponent className="text-[#0A0A0A] dark:text-[#F7F6F3] h-6 w-6 sm:h-8 sm:w-8" /> : null;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="font-mono text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-2">01 /</div>
                  <h3 className="font-display text-[18px] sm:text-[20px] md:text-[22px] text-[#0A0A0A] dark:text-[#F7F6F3] mb-2">
                    {internalTools[0].title}
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] mb-4">
                    {internalTools[0].subtitle}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-40 sm:h-48 rounded-[4px] border border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden">
                <Image
                  src="/databench_hero.jpeg"
                  alt="DataBench workflow orchestration dashboard"
                  fill
                  className="object-cover object-top grayscale-[10%] brightness-[1.05] dark:brightness-[0.9]"
                />
              </div>

              <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">
                {internalTools[0].description}
              </p>
              
              <div className="pt-4 border-t border-[#E3E3E0] dark:border-[#2A2A2A] space-y-4">
                <div>
                  <p className="font-mono text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-2">WHY IT MATTERS</p>
                  <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">{internalTools[0].whyItMatters}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mb-2">CORE CAPABILITIES</p>
                  <ul className="space-y-2">
                    {internalTools[0].capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-3 font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3]">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] dark:bg-[#F7F6F3] mt-1.5 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Link href="/internal-tools" className="font-sans text-[14px] sm:text-[15px] text-[#1A1AFF] hover:underline inline-flex items-center gap-2">
                Learn more about DataBench
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Two Stacked Cards */}
          <div className="flex flex-col gap-4">
            {/* Phonex */}
            <div className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] overflow-hidden hover:border-[#1A1AFF] transition-colors duration-200">
              <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 w-fit">
                  {(() => {
                    const IconComponent = iconMap[internalTools[1].icon];
                    return IconComponent ? <IconComponent className="text-[#0A0A0A] dark:text-[#F7F6F3] h-5 w-5 sm:h-6 sm:w-6" /> : null;
                  })()}
                </div>
                
                <div className="font-mono text-[10px] sm:text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-1">02 /</div>
                
                <div className="relative h-28 sm:h-32 rounded-[4px] border border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden">
                  <Image
                    src="/Phonex_hero.png"
                    alt="Phonex voice annotation interface"
                    fill
                    className="object-cover object-top grayscale-[10%] brightness-[1.05] dark:brightness-[0.9]"
                  />
                </div>

                <h3 className="font-display text-[18px] sm:text-[20px] text-[#0A0A0A] dark:text-[#F7F6F3]">
                  {internalTools[1].title}
                </h3>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">
                  {internalTools[1].subtitle}
                </p>
                
                <Link href="/internal-tools#phonex" className="font-sans text-[14px] sm:text-[15px] text-[#1A1AFF] hover:underline inline-flex items-center gap-1">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* FlexiPod */}
            <div className={`bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] overflow-hidden hover:border-[#1A1AFF] transition-colors duration-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '300ms' }}>
              <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4">
                <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 w-fit">
                  {(() => {
                    const IconComponent = iconMap[internalTools[2].icon];
                    return IconComponent ? <IconComponent className="text-[#0A0A0A] dark:text-[#F7F6F3] h-5 w-5 sm:h-6 sm:w-6" /> : null;
                  })()}
                </div>
                
                <div className="font-mono text-[10px] sm:text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-1">03 /</div>
                
                <div className="relative h-28 sm:h-32 rounded-[4px] border border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden">
                  <Image
                    src="/Flexipod.png"
                    alt="FlexiPod cross-functional team collaboration"
                    fill
                    className="object-cover object-top grayscale-[10%] brightness-[1.05] dark:brightness-[0.9]"
                  />
                </div>

                <h3 className="font-display text-[18px] sm:text-[20px] text-[#0A0A0A] dark:text-[#F7F6F3]">
                  {internalTools[2].title}
                </h3>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">
                  {internalTools[2].subtitle}
                </p>
                
                <Link href="/internal-tools#flexipod" className="font-sans text-[14px] sm:text-[15px] text-[#1A1AFF] hover:underline inline-flex items-center gap-1">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
