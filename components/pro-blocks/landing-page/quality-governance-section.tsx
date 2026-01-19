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
      className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 section-padding-y border-b overflow-hidden"
      id="quality-governance"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-900/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-slate-700/2 rounded-full blur-3xl" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                            linear-gradient(0deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 md:gap-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-6">
          <Tagline>Quality & Governance</Tagline>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-white">
            Annotation with{" "}
            <span className="text-orange-400">Accountability</span>
          </h2>
          <p className="text-slate-300 dark:text-slate-400 text-base md:text-lg leading-relaxed">
            Built for Trust, Consistency, and Deployable AI. High-quality labels are non-negotiable for reliable models. 
            Flexibench embeds robust quality engineering and governance into every annotation workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {qualityPrinciples.map((principle, index) => {
            const IconComponent = iconMap[principle.icon] || Target;
            // Last item spans 2 columns on large screens
            const colSpan = index === 4 ? "lg:col-span-2" : "";
            const animationDelay = index * 120;
            const animations = ['animate-scale-in', 'animate-fade-in-up', 'animate-scale-in', 'animate-fade-in-up', 'animate-scale-in'];
            return (
              <Card
                key={principle.title}
                className={`group relative bg-gradient-to-br from-background to-secondary/30 rounded-2xl border-2 border-border/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:scale-105 hover:-translate-y-2 hover:border-primary/30 opacity-0 ${animations[index % animations.length]} ${colSpan}`}
                style={{ animationDelay: `${animationDelay}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl -mr-10 -mt-10" />
                <CardContent className="relative flex flex-col gap-6 p-0">
                  <div className="bg-gradient-to-br from-primary/20 to-primary/5 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-primary/20 shadow-md group-hover:scale-110 transition-transform">
                    <IconComponent className="text-primary h-8 w-8" />
                  </div>
                  
                  {/* Visual Element with Image - Hidden for Real-Time Quality Monitoring and Auditability cards */}
                  {principle.title !== "Real-Time Quality Monitoring Dashboards" && principle.title !== "Auditability and Traceability" && (
                    <div className="h-24 rounded-lg border border-border/30 overflow-hidden relative group/image">
                      <Image
                        src={`/quality_governance${index + 1}.png`}
                        alt={`${principle.title} - Quality and governance visualization`}
                        fill
                        className="object-cover object-top group-hover/image:scale-110 transition-transform duration-[2500ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    </div>
                  )}

                  <h3 className="text-foreground text-xl md:text-2xl font-bold leading-tight">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed flex-1">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
