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
    <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 dark:from-slate-900 dark:via-indigo-900 dark:to-slate-900 section-padding-y border-b overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10">
        <div className="flex flex-col gap-12 md:gap-16">
          <div className={`mx-auto flex max-w-3xl flex-col items-center text-center gap-6 transition-all duration-[3000ms] ease-out ${isVisible ? 'opacity-100 animate-slide-in-subtle' : 'opacity-0'}`}>
            <Tagline>Impact</Tagline>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white">
              Trusted by Data-Driven Teams{" "}
              <span className="text-cyan-400">Worldwide</span>
            </h2>
            <p className="text-blue-100 dark:text-blue-200 text-lg leading-relaxed">
              Flexibench enables organizations to produce higher fidelity datasets, more consistent
              models, and faster iteration cycles ensuring annotation is a force multiplier, not a bottleneck.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            <Card className={`group relative bg-gradient-to-br from-background to-secondary/40 rounded-2xl border-2 border-border/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-primary/30 hover-lift ${isVisible ? 'opacity-100 animate-fade-in-scale' : 'opacity-0'}`} style={{ transitionDelay: '0ms' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl -mr-12 -mt-12" />
              <CardContent className="relative flex flex-col gap-4 p-0">
                <div className="bg-gradient-to-br from-indigo-600/20 to-indigo-600/5 rounded-xl p-3 w-fit">
                  <h3 className="text-indigo-600 dark:text-indigo-400 font-bold text-base uppercase tracking-wide">
                    Datasets Annotated
                  </h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-foreground text-4xl md:text-5xl font-bold">
                    <AnimatedCounter end={5000000} suffix="+" duration={2000} />
                  </span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Enterprise datasets processed across industries with enterprise-grade quality workflows.
                </p>
              </CardContent>
            </Card>

            <Card className={`group relative bg-gradient-to-br from-secondary/40 via-background to-secondary/40 rounded-2xl border-2 border-border/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-primary/30 hover-lift ${isVisible ? 'opacity-100 animate-fade-in-scale' : 'opacity-0'}`} style={{ transitionDelay: '200ms' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/10 rounded-full blur-2xl -mr-12 -mt-12" />
              <CardContent className="relative flex flex-col gap-4 p-0">
                <div className="bg-gradient-to-br from-orange-600/20 to-orange-600/5 rounded-xl p-3 w-fit">
                  <h3 className="text-orange-600 dark:text-orange-400 font-bold text-base uppercase tracking-wide">
                    Quality Score
                  </h3>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-foreground text-4xl md:text-5xl font-bold">
                    4.9
                  </span>
                  <span className="text-muted-foreground text-2xl font-semibold">/5</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  Average annotation quality score across all projects with multi-tier review pipelines.
                </p>
              </CardContent>
            </Card>

            <Card className={`group relative bg-gradient-to-br from-background to-secondary/40 rounded-2xl border-2 border-border/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:scale-[1.02] hover:-translate-y-1 hover:border-primary/30 hover-lift ${isVisible ? 'opacity-100 animate-fade-in-scale' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-600/10 rounded-full blur-2xl -mr-12 -mt-12" />
              <CardContent className="relative flex flex-col gap-4 p-0">
                <div className="bg-gradient-to-br from-slate-600/20 to-slate-600/5 rounded-xl p-3 w-fit">
                  <h3 className="text-slate-600 dark:text-slate-400 font-bold text-base uppercase tracking-wide">
                    Time Saved
                  </h3>
                </div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-foreground text-4xl md:text-5xl font-bold">
                    <AnimatedCounter end={500000} suffix="+" duration={2000} />
                  </span>
                  <span className="text-muted-foreground text-lg font-semibold whitespace-nowrap">hours</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
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
