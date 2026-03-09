"use client";

import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { platformModules } from "@/lib/flexibench-content";
import { Network, Sparkles, Shield, Plug } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const iconMap: Record<string, typeof Network> = {
  Network,
  Sparkles,
  Shield,
  Plug,
};

export function PlatformOverviewSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section
      className="relative bg-[#F7F6F3] section-padding-y border-b border-[#E3E3E0] overflow-hidden"
      aria-labelledby="platform-heading"
      id="platform"
    >
      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10">
        {/* Section Header */}
        <div className={`mx-auto flex max-w-3xl flex-col items-center text-center gap-6 mb-16 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] bg-white px-3 py-1 rounded-[3px] text-[#737373]">
            Feature Modules
          </div>
          <h2 id="platform-heading" className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A]">
            Built for{" "}
            <span className="text-[#1A1AFF]">Enterprise Scale</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] text-center max-w-2xl">
            Four core modules that work together to deliver model-ready data with quality, consistency, and governance.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {platformModules.map((module, index) => {
            const IconComponent = iconMap[module.icon] || Network;
            
            return (
              <div
                key={module.id}
                className={`bg-white border border-[#E3E3E0] rounded-[4px] p-6 sm:p-8 hover:border-[#1A1AFF] transition-colors duration-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="font-mono text-[11px] text-[#A3A3A3] mb-3">
                  {String(index + 1).padStart(2, '0')} /
                </div>
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="bg-[#F0EFE9] rounded-[3px] p-2 flex-shrink-0">
                    <IconComponent className="text-[#0A0A0A] h-5 w-5" />
                  </div>
                  <h3 className="font-display text-[18px] sm:text-[20px] md:text-[22px] text-[#0A0A0A] leading-tight">
                    {module.title}
                  </h3>
                </div>
                <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] leading-[1.7] mb-4">
                  {module.whyItMatters}
                </p>
                <div className="pt-4 border-t border-[#E3E3E0]">
                  <div className="font-mono text-[10px] text-[#1A1AFF] uppercase tracking-widest mb-2">
                    KEY FEATURES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {module.keyCapabilities.slice(0, 2).map((capability, idx) => (
                      <span
                        key={idx}
                        className="font-sans text-[12px] sm:text-[13px] text-[#737373] bg-[#F7F6F3] px-2 py-1 rounded-[3px]"
                      >
                        {capability.split(":")[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
