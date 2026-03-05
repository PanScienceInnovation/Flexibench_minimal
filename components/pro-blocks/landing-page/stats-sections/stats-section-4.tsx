"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { useEffect, useRef, useState } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(false);

  useEffect(() => {
    if (countRef.current) return;
    countRef.current = true;

    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + increment;
        if (next >= end) {
          clearInterval(timer);
          return end;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{Math.floor(count).toLocaleString()}{suffix}</span>;
}

export function StatsSection4() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section className="relative bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden">
      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className={`mx-auto flex max-w-3xl flex-col items-center text-center gap-6 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <Tagline className="font-mono text-[#737373] border border-[#2A2A2A] rounded-[3px] px-3 py-1">Impact</Tagline>
            <h2 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-display leading-tight text-white">
              Trusted by Data-Driven Teams{" "}
              <span className="text-[#1A1AFF]">Worldwide</span>
            </h2>
            <p className="text-[#737373] dark:text-[#A3A3A3] text-[15px] sm:text-[16px] md:text-[17px] lg:text-lg leading-relaxed font-sans">
              Flexibench enables organizations to produce higher fidelity datasets, more consistent
              models, and faster iteration cycles ensuring annotation is a force multiplier, not a bottleneck.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3 lg:gap-8">
            <Card className={`group relative bg-[#141414] border border-[#2A2A2A] rounded-[4px] p-6 sm:p-8 transition-colors duration-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0ms' }}>
              <CardContent className="relative flex flex-col gap-3 sm:gap-4 p-0">
                <h3 className="text-[#1A1AFF] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  Datasets Annotated
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-display font-bold">
                    <AnimatedCounter end={5000000} suffix="+" duration={2000} />
                  </span>
                </div>
                <div className="h-px bg-[#2A2A2A] my-2" />
                <p className="text-[#737373] dark:text-[#A3A3A3] text-[13px] sm:text-[14px] leading-relaxed font-sans">
                  Enterprise datasets processed across industries with enterprise-grade quality workflows.
                </p>
              </CardContent>
            </Card>

            <Card className={`group relative bg-[#141414] border border-[#2A2A2A] rounded-[4px] p-6 sm:p-8 transition-colors duration-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '200ms' }}>
              <CardContent className="relative flex flex-col gap-3 sm:gap-4 p-0">
                <h3 className="text-[#1A1AFF] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  Quality Score
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-display font-bold">
                    4.9
                  </span>
                  <span className="text-[#737373] dark:text-[#A3A3A3] text-xl sm:text-2xl font-semibold">/5</span>
                </div>
                <div className="h-px bg-[#2A2A2A] my-2" />
                <p className="text-[#737373] dark:text-[#A3A3A3] text-[13px] sm:text-[14px] leading-relaxed font-sans">
                  Average annotation quality score across all projects with multi-tier review pipelines.
                </p>
              </CardContent>
            </Card>

            <Card className={`group relative bg-[#141414] border border-[#2A2A2A] rounded-[4px] p-6 sm:p-8 transition-colors duration-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '400ms' }}>
              <CardContent className="relative flex flex-col gap-3 sm:gap-4 p-0">
                <h3 className="text-[#1A1AFF] font-mono text-[10px] sm:text-[11px] uppercase tracking-widest">
                  Time Saved
                </h3>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-white text-[48px] sm:text-[56px] md:text-[64px] lg:text-[72px] font-display font-bold">
                    <AnimatedCounter end={500000} suffix="+" duration={2000} />
                  </span>
                  <span className="text-[#737373] dark:text-[#A3A3A3] text-base sm:text-lg font-semibold whitespace-nowrap">hours</span>
                </div>
                <div className="h-px bg-[#2A2A2A] my-2" />
                <p className="text-[#737373] dark:text-[#A3A3A3] text-[13px] sm:text-[14px] leading-relaxed font-sans">
                  Manual annotation hours saved through AI-assisted labeling and automated workflows.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
