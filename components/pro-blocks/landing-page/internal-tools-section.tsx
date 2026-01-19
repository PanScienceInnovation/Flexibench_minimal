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
    <section className="relative bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950 section-padding-y border-b overflow-hidden">
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/2 via-transparent to-orange-600/2" />
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 md:gap-16">
        {/* Section Title */}
        <div className={`mx-auto flex max-w-3xl flex-col items-center text-center gap-6 transition-all duration-[3000ms] ease-out ${isVisible ? 'opacity-100 animate-slide-in-subtle' : 'opacity-0'}`}>
          <Tagline>Ecosystem</Tagline>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            Extend Annotation from{" "}
            <span className="text-primary">Tasks</span> to{" "}
            <span className="text-primary">Strategy</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Flexibench is bolstered by internal tools that extend its reach: DataBench for workflow
            orchestration (with advanced modules like Phonex) and FlexiPod for outcome-driven execution.
          </p>
        </div>

        {/* Enhanced 1-2 Grid Layout */}
        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-3">
          {/* Wide Card - DataBench with Visual */}
          <Card className={`group relative bg-gradient-to-br from-secondary/80 via-secondary/40 to-background gap-0 overflow-hidden rounded-2xl border-2 border-border/50 p-10 shadow-xl hover:shadow-2xl transition-all duration-[2500ms] ease-out lg:col-span-2 hover:scale-[1.01] hover:border-primary/30 hover-lift ${isVisible ? 'opacity-100 animate-fade-in-scale' : 'opacity-0'}`} style={{ transitionDelay: '100ms' }}>
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors" />
            
            <CardContent className="relative flex flex-col gap-8 p-0">
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-primary/30 to-primary/10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-primary/30 shadow-lg group-hover:scale-110 transition-transform duration-[2500ms] ease-out">
                  {(() => {
                    const IconComponent = iconMap[internalTools[0].icon];
                    return IconComponent ? <IconComponent className="text-primary h-10 w-10 group-hover:rotate-6 transition-transform duration-[2500ms] ease-out" /> : null;
                  })()}
                </div>
                <div className="flex-1">
                  <h3 className="text-foreground text-xl md:text-2xl font-bold mb-3">
                    {internalTools[0].title}
                  </h3>
                  <p className="text-muted-foreground font-semibold text-base md:text-lg mb-4">
                    {internalTools[0].subtitle}
                  </p>
                </div>
              </div>

              {/* Image/Visual */}
              <div className="relative h-48 rounded-xl border border-border/30 overflow-hidden group/image">
                <Image
                  src="/databench_hero.jpeg"
                  alt="DataBench workflow orchestration dashboard showing dataset management, workflow builder, and review pipelines"
                  fill
                  className="object-cover object-top group-hover/image:scale-110 transition-transform duration-[2500ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg p-3 border border-border/30">
                    <p className="text-base font-semibold text-foreground mb-1">Workflow Orchestration</p>
                    <p className="text-sm text-muted-foreground">Unified dataset repository & pipeline builder</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-3 h-3 bg-orange-500 rounded-full animate-pulse shadow-lg shadow-orange-500/50" />
              </div>

              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {internalTools[0].description}
              </p>
              
              <div className="space-y-4">
                <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 border border-border/30">
                  <p className="font-bold mb-2 text-base text-foreground">Why It Matters</p>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{internalTools[0].whyItMatters}</p>
                </div>
                <div>
                  <p className="font-bold mb-3 text-base text-foreground">Core Capabilities</p>
                  <ul className="space-y-2">
                    {internalTools[0].capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-muted-foreground text-base md:text-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <Link href="/internal-tools" className="text-primary text-base font-semibold hover:underline inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn more about DataBench
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          {/* Two Stacked Cards - Phonex and FlexiPod */}
          <div className="flex flex-col gap-6">
            <Card className="group relative bg-gradient-to-br from-background to-secondary/40 gap-0 overflow-hidden rounded-2xl border border-border/50 p-8 shadow-lg hover:shadow-xl transition-all duration-[2500ms] ease-out flex-1 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16" />
              <CardContent className="relative flex flex-col gap-6 p-0">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-primary/20 shadow-md">
                  {(() => {
                    const IconComponent = iconMap[internalTools[1].icon];
                    return IconComponent ? <IconComponent className="text-primary h-8 w-8" /> : null;
                  })()}
                </div>
                
                {/* Visual Element with Image */}
                <div className="h-32 rounded-lg border border-border/30 overflow-hidden relative group/image">
                  <Image
                    src="/Phonex_hero.png"
                    alt="Phonex voice annotation interface showing audio waveforms, speaker diarization, and transcription tools"
                    fill
                    className="object-cover object-top group-hover/image:scale-110 transition-transform duration-[2500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-sm text-foreground font-semibold bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-center">Voice Annotation Engine</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground text-xl md:text-2xl font-bold mb-2">
                    {internalTools[1].title}
                  </h3>
                  <p className="text-muted-foreground font-semibold text-base md:text-lg mb-3">
                    {internalTools[1].subtitle}
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed line-clamp-4">
                    {internalTools[1].description}
                  </p>
                </div>
                
                <Link href="/internal-tools#phonex" className="text-primary text-base font-semibold hover:underline inline-flex items-center gap-1 mt-auto">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className={`group relative bg-gradient-to-br from-secondary/40 to-background gap-0 overflow-hidden rounded-2xl border border-border/50 p-8 shadow-lg hover:shadow-xl transition-all duration-[2500ms] ease-out flex-1 hover:scale-[1.02] hover:-translate-y-1 hover-lift ${isVisible ? 'opacity-100 animate-fade-in-scale' : 'opacity-0'}`} style={{ transitionDelay: '300ms' }}>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -ml-16 -mb-16" />
              <CardContent className="relative flex flex-col gap-6 p-0">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-primary/20 shadow-md">
                  {(() => {
                    const IconComponent = iconMap[internalTools[2].icon];
                    return IconComponent ? <IconComponent className="text-primary h-8 w-8" /> : null;
                  })()}
                </div>
                
                {/* Visual Element with Image */}
                <div className="h-32 rounded-lg border border-border/30 overflow-hidden relative group/image">
                  <Image
                    src="/Flexipod.png"
                    alt="FlexiPod cross-functional team collaboration showing annotation engineers, data scientists, and domain specialists working together"
                    fill
                    className="object-cover object-top group-hover/image:scale-110 transition-transform duration-[2500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-sm text-foreground font-semibold bg-background/90 backdrop-blur-sm rounded px-2 py-1 text-center">Cross-Functional Teams</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-foreground text-xl md:text-2xl font-bold mb-2">
                    {internalTools[2].title}
                  </h3>
                  <p className="text-muted-foreground font-semibold text-base md:text-lg mb-3">
                    {internalTools[2].subtitle}
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed line-clamp-4">
                    {internalTools[2].description}
                  </p>
                </div>
                
                <Link href="/internal-tools#flexipod" className="text-primary text-base font-semibold hover:underline inline-flex items-center gap-1 mt-auto">
                  Learn more
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
