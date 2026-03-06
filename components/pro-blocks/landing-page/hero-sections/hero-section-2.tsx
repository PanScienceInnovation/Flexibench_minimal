"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Link from "next/link";
import { DataFlowCanvas } from "./data-flow-canvas";

export function HeroSection2() {
  return (
    <section
      className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-[#E3E3E0] dark:border-[#2A2A2A]"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto relative z-10 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-0">
          
          {/* Left Column - Content */}
          <div className="flex flex-1 flex-col gap-3 md:gap-4 lg:gap-5 w-full lg:pr-6 lg:max-w-[55%]">
            {/* Tagline with Badge Style */}
            <div className="inline-flex items-center gap-2 w-fit mb-1">
              <Tagline className="mb-0">Enterprise Annotation Platform</Tagline>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] text-[#737373] dark:text-[#A3A3A3] font-mono text-[11px] rounded-[3px]">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="font-semibold">AI-Powered</span>
              </div>
            </div>
            
            {/* Main Heading - Tighter Line Spacing */}
            <div className="space-y-2 md:space-y-2.5">
              <h1 id="hero-heading" className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] leading-[0.95] font-display text-[#0A0A0A] dark:text-[#F7F6F3] font-bold tracking-tight">
                Build{" "}
                <span className="relative inline-block text-[#1A1AFF]">
                  Model-Ready
                </span>{" "}
                Data
              </h1>
            </div>
            
            {/* Description - Tighter to Headline */}
            <p className="text-[#737373] dark:text-[#A3A3A3] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed max-w-xl font-light font-sans mt-1 md:mt-2">
              Modern multimodal annotation platform for AI model training data with
              quality workflows, AI-assisted labeling, and enterprise-grade governance
            </p>

            {/* Feature Cards - Tighter Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-2 md:mt-3">
              <div className="group relative flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-[4px] bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] hover:border-[#1A1AFF] transition-colors duration-400">
                <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 md:p-3 mt-0.5 flex-shrink-0">
                  <Check className="text-[#0A0A0A] dark:text-[#F7F6F3] h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm md:text-base mb-1 md:mb-1.5 text-[#0A0A0A] dark:text-[#F7F6F3]">Multimodal Support</p>
                  <p className="text-[#737373] dark:text-[#A3A3A3] text-sm md:text-base leading-relaxed">Text, Image, Video, Audio annotation in one platform</p>
                </div>
              </div>

              <div className="group relative flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-[4px] bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] hover:border-[#1A1AFF] transition-colors duration-400">
                <div className="bg-[#F0EFE9] dark:bg-[#1A1A1A] rounded-[3px] p-2 md:p-3 mt-0.5 flex-shrink-0">
                  <Zap className="text-[#0A0A0A] dark:text-[#F7F6F3] h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm md:text-base mb-1 md:mb-1.5 text-[#0A0A0A] dark:text-[#F7F6F3]">AI-Assisted Labeling</p>
                  <p className="text-[#737373] dark:text-[#A3A3A3] text-sm md:text-base leading-relaxed">80% faster with quality workflows built-in</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons - Tighter to Content */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-5">
              <Button 
                asChild 
                size="lg" 
                className="text-sm md:text-base px-6 md:px-8 py-5 md:py-6 h-auto bg-[#0A0A0A] dark:bg-[#F7F6F3] text-white dark:text-[#0A0A0A] hover:bg-[#1A1AFF] dark:hover:bg-[#1A1AFF] dark:hover:text-white rounded-[3px] font-mono text-[13px] transition-colors duration-400 whitespace-nowrap"
              >
                <Link href="/contact" className="group/btn flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="text-sm md:text-base px-6 md:px-8 py-5 md:py-6 h-auto border border-[#E3E3E0] dark:border-[#2A2A2A] text-[#0A0A0A] dark:text-[#F7F6F3] bg-transparent hover:bg-[#F0EFE9] dark:hover:bg-[#1A1A1A] rounded-[3px] font-mono text-[13px] transition-colors duration-400 whitespace-nowrap"
              >
                <Link href="/#platform" className="group/btn flex items-center justify-center">
                  Explore Platform
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Connecting Element - Subtle Vertical Line */}
          <div className="hidden lg:block w-px h-full bg-gradient-to-b from-transparent via-[#E3E3E0] dark:via-[#2A2A2A] to-transparent mx-2 flex-shrink-0" />

          {/* Right Column - Data Flow Canvas with Overlap & Effects */}
          <div className="w-full flex-1 relative lg:max-w-[45%] lg:-ml-6 lg:pl-6 mt-8 lg:mt-0">
            {/* Animation Panel with Shadow & Frosted Glass Effect */}
            <div className="relative">
              {/* Subtle connecting gradient bridge */}
              <div className="absolute -left-6 top-0 bottom-0 w-6 bg-gradient-to-r from-[#F7F6F3] dark:from-[#0A0A0A] to-transparent pointer-events-none z-10" />
              
              {/* Panel with shadow and frosted glass */}
              <div className="relative shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] rounded-[4px] overflow-hidden">
                {/* Right edge gradient fade */}
                <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-[#F7F6F3]/90 dark:from-[#0A0A0A]/90 via-transparent to-transparent pointer-events-none z-20" />
                
                <DataFlowCanvas />
              </div>
            </div>

            {/* Stats Bar - Integrated into Hero, Tighter Alignment */}
            <div className="mt-4 md:mt-5 flex flex-row gap-0 justify-start lg:justify-center flex-wrap sm:flex-nowrap border-t border-[#E3E3E0] dark:border-[#2A2A2A] pt-4 md:pt-5">
              <div className="px-4 sm:px-6 pl-0 flex flex-col items-start lg:items-center text-left lg:text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A] dark:text-[#F7F6F3]">1,247</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mt-1">Active Projects</div>
              </div>
              <div className="border-r border-[#E3E3E0] dark:border-[#2A2A2A] px-4 sm:px-6 flex flex-col items-start lg:items-center text-left lg:text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A] dark:text-[#F7F6F3]">2.4M</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mt-1">Annotations</div>
              </div>
              <div className="border-r border-[#E3E3E0] dark:border-[#2A2A2A] px-4 sm:px-6 flex flex-col items-start lg:items-center text-left lg:text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A] dark:text-[#F7F6F3]">4.9/5</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mt-1">Quality Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
