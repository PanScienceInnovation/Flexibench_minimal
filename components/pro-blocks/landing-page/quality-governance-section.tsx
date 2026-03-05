"use client";

import { Target, Users, Layers, BarChart3, FileCheck } from "lucide-react";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { qualityPrinciples } from "@/lib/flexibench-content";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const iconMap: Record<string, typeof Target> = {
  Target,
  Users,
  Layers,
  BarChart3,
  FileCheck,
};

export function QualityGovernanceSection() {
  return (
    <section
      className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden"
      id="quality-governance"
    >
      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 sm:gap-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-4 sm:gap-6">
          <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] text-[#737373] dark:text-[#A3A3A3]">
            Quality & Governance
          </div>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3]">
            Annotation with{" "}
            <span className="text-[#1A1AFF]">Accountability</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] text-center max-w-2xl">
            Built for Trust, Consistency, and Deployable AI. High-quality labels are non-negotiable for reliable models. 
            Flexibench embeds robust quality engineering and governance into every annotation workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {qualityPrinciples
            .filter(principle => 
              principle.title !== "Real-Time Quality Monitoring Dashboards" && 
              principle.title !== "Auditability and Traceability"
            )
            .map((principle, index) => {
            const IconComponent = iconMap[principle.icon] || Target;
            
            return (
              <div
                key={principle.title}
                className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-6 sm:p-8 hover:border-[#1A1AFF] transition-colors duration-200"
              >
                <div className="font-mono text-[10px] sm:text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-3">
                  {String(index + 1).padStart(2, '0')} /
                </div>
                <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 sm:p-3 w-fit mb-4">
                  <IconComponent className="text-[#0A0A0A] dark:text-[#F7F6F3] h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                
                <h3 className="font-display text-[18px] sm:text-[20px] text-[#0A0A0A] dark:text-[#F7F6F3] mb-3">
                  {principle.title}
                </h3>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">
                  {principle.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
