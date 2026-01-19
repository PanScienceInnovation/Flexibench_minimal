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
      className="relative bg-gradient-to-br from-rose-50 via-pink-50/60 to-orange-50/40 dark:from-rose-950 dark:via-pink-950/60 dark:to-orange-950/40 section-padding-y border-b overflow-hidden"
      aria-labelledby="platform-heading"
      id="platform"
    >
      {/* Vibrant Background with Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-rose-400/20 via-pink-400/15 to-orange-400/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-orange-400/25 via-rose-400/18 to-pink-400/12 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        
        {/* Floating Shapes */}
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-500/12 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-1/4 left-1/3 w-36 h-36 bg-rose-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" style={{
          backgroundImage: `linear-gradient(currentColor 1.5px, transparent 1.5px), linear-gradient(90deg, currentColor 1.5px, transparent 1.5px)`,
          backgroundSize: '64px 64px'
        }} />
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>

      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10">
        {/* Section Header - Centered */}
        <div className={`mx-auto flex max-w-3xl flex-col items-center text-center gap-4 mb-12 transition-all duration-[2000ms] ease-out ${isVisible ? 'opacity-100 animate-slide-in-subtle' : 'opacity-0'}`}>
          <Tagline>Feature Modules</Tagline>
          <h2 id="platform-heading" className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-foreground">
            Built for{" "}
            <span className="text-primary">Enterprise Scale</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
            Four core modules that work together to deliver model-ready data with quality, consistency, and governance.
          </p>
        </div>

        {/* Enhanced Grid Layout with Vibrant Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {platformModules.map((module, index) => {
            const IconComponent = iconMap[module.icon] || Network;
            const cardColors = [
              { bg: 'from-rose-100 via-pink-50 to-white dark:from-rose-950/80 dark:via-pink-950/60 dark:to-slate-900', border: 'border-rose-300/60 dark:border-rose-700/60', icon: 'from-rose-500/35 to-pink-500/25 border-rose-400/40', iconColor: 'text-rose-600 dark:text-rose-400', glow: 'bg-rose-400/15' },
              { bg: 'from-orange-100 via-amber-50 to-white dark:from-orange-950/80 dark:via-amber-950/60 dark:to-slate-900', border: 'border-orange-300/60 dark:border-orange-700/60', icon: 'from-orange-500/35 to-amber-500/25 border-orange-400/40', iconColor: 'text-orange-600 dark:text-orange-400', glow: 'bg-orange-400/15' },
              { bg: 'from-pink-100 via-rose-50 to-white dark:from-pink-950/80 dark:via-rose-950/60 dark:to-slate-900', border: 'border-pink-300/60 dark:border-pink-700/60', icon: 'from-pink-500/35 to-rose-500/25 border-pink-400/40', iconColor: 'text-pink-600 dark:text-pink-400', glow: 'bg-pink-400/15' },
              { bg: 'from-amber-100 via-orange-50 to-white dark:from-amber-950/80 dark:via-orange-950/60 dark:to-slate-900', border: 'border-amber-300/60 dark:border-amber-700/60', icon: 'from-amber-500/35 to-orange-500/25 border-amber-400/40', iconColor: 'text-amber-600 dark:text-amber-400', glow: 'bg-amber-400/15' },
            ];
            const colors = cardColors[index % cardColors.length];
            
            return (
              <div
                key={module.id}
                className={`group relative bg-gradient-to-br ${colors.bg} rounded-2xl border-2 ${colors.border} p-6 hover:shadow-2xl transition-all duration-[3000ms] ease-out hover-lift ${isVisible ? 'opacity-100 animate-fade-in-scale' : 'opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Animated Background Glow */}
                <div className={`absolute inset-0 ${colors.glow} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out blur-xl -z-10`} />
                <div className={`absolute top-0 right-0 w-24 h-24 ${colors.glow} rounded-full blur-2xl -mr-8 -mt-8 transition-transform duration-[3000ms] ease-out`} />
                
                {/* Icon Container */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`bg-gradient-to-br ${colors.icon} flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 shadow-lg transition-all duration-[2500ms] ease-out`}>
                    <IconComponent className={`${colors.iconColor} h-6 w-6`} />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl text-foreground leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-current group-hover:to-primary transition-all duration-[2500ms] ease-out">
                    {module.title}
                  </h3>
                </div>
                
                {/* Description */}
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-5 group-hover:text-foreground transition-colors duration-[2500ms] ease-out">
                  {module.whyItMatters}
                </p>
                
                {/* Key Capabilities with Enhanced Design */}
                <div className="flex flex-col gap-3 pt-4 border-t border-current/20">
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-1 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Key Features
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {module.keyCapabilities.slice(0, 2).map((capability, idx) => (
                      <span
                        key={idx}
                        className="text-sm font-medium text-foreground/90 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-current/20 shadow-sm transition-transform duration-[2500ms] ease-out"
                      >
                        {capability.split(":")[0]}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Outcome with Enhanced Styling */}
                <div className="pt-5 mt-5 border-t border-current/20 relative">
                  <div className="absolute -top-px left-0 w-12 h-px bg-gradient-to-r from-primary to-transparent" />
                  <p className="text-sm text-foreground/90 font-medium leading-relaxed group-hover:text-foreground transition-colors duration-[2500ms] ease-out">{module.outcome}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
