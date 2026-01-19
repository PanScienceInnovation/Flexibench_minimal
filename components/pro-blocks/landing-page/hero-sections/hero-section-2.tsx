"use client";

import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Image from "next/image";
import Link from "next/link";
import { blurPlaceholders } from "@/lib/image-utils";

export function HeroSection2() {
  return (
    <section
      className="relative bg-gradient-to-br from-slate-50 via-slate-50/80 to-stone-50/60 dark:from-slate-950 dark:via-slate-950/80 dark:to-stone-950/60 pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b"
      aria-labelledby="hero-heading"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/8 via-slate-300/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-slate-300/8 via-stone-300/6 to-transparent rounded-full blur-3xl" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container mx-auto relative z-10 px-4 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:gap-12 lg:flex-row lg:gap-16 lg:items-start">

          {/* Left Column - Enhanced with Better Spacing */}
          <div className="flex flex-1 flex-col gap-4 md:gap-6 lg:gap-8 w-full">
            {/* Tagline with Badge Style */}
              <div className="inline-flex items-center gap-2 w-fit">
              <Tagline className="mb-0">Enterprise Annotation Platform</Tagline>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/12 to-primary/8 border border-primary/20">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-semibold text-primary">AI-Powered</span>
              </div>
            </div>
            
            {/* Main Heading with Enhanced Typography */}
            <div className="space-y-3 md:space-y-4">
              <h1 id="hero-heading" className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                Build{" "}
                <span className="relative inline-block">
                  Model-Ready
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-3 text-primary/30"
                    viewBox="0 0 400 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8C50 4 150 6 200 8C250 10 350 8 398 10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                Data with{" "}
                <span className="relative inline-block text-primary">
                  Precision & Quality
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-primary/50 to-primary/40 rounded-full blur-sm" />
                </span>
              </h1>
            </div>
            
            {/* Description with Enhanced Styling */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl font-medium">
              Modern multimodal annotation platform for AI model training data with
              quality workflows, AI-assisted labeling, and enterprise-grade governance
            </p>

            {/* Enhanced Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <div className="group relative flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-background/80 to-secondary/40 backdrop-blur-md border border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-[2500ms] ease-out hover-lift">
                <div className="bg-gradient-to-br from-primary/18 to-primary/10 rounded-lg md:rounded-xl p-2 md:p-3 mt-0.5 group-hover:scale-[1.02] transition-transform duration-[2500ms] ease-out flex-shrink-0">
                  <Check className="text-primary h-4 w-4 md:h-5 md:w-5 group-hover:rotate-3 transition-transform duration-[2500ms] ease-out" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm md:text-base mb-1 md:mb-1.5 text-foreground">Multimodal Support</p>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">Text, Image, Video, Audio annotation in one platform</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrendingUp className="h-4 w-4 text-primary/40" />
                </div>
              </div>

              <div className="group relative flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-background/80 to-secondary/40 backdrop-blur-md border border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-[2500ms] ease-out hover-lift">
                <div className="bg-gradient-to-br from-primary/18 to-primary/10 rounded-lg md:rounded-xl p-2 md:p-3 mt-0.5 transition-transform duration-[2500ms] ease-out flex-shrink-0">
                  <Zap className="text-primary h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm md:text-base mb-1 md:mb-1.5 text-foreground">AI-Assisted Labeling</p>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">80% faster with quality workflows built-in</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="h-4 w-4 text-primary/40" />
                </div>
              </div>

              <div className="group relative flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-background/80 to-secondary/40 backdrop-blur-md border border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-[2500ms] ease-out hover-lift">
                <div className="bg-gradient-to-br from-primary/18 to-primary/10 rounded-lg md:rounded-xl p-2 md:p-3 mt-0.5 transition-transform duration-[2500ms] ease-out flex-shrink-0">
                  <Check className="text-primary h-4 w-4 md:h-5 md:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm md:text-base mb-1 md:mb-1.5 text-foreground">Enterprise Governance</p>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">Full auditability, compliance & quality control</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TrendingUp className="h-4 w-4 text-primary/40" />
                </div>
              </div>

              <div className="group relative flex items-start gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-background/80 to-secondary/40 backdrop-blur-md border border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-[2500ms] ease-out hover-lift">
                <div className="bg-gradient-to-br from-primary/18 to-primary/10 rounded-lg md:rounded-xl p-2 md:p-3 mt-0.5 group-hover:scale-[1.02] transition-transform duration-[2500ms] ease-out flex-shrink-0">
                  <Check className="text-primary h-4 w-4 md:h-5 md:w-5 group-hover:rotate-3 transition-transform duration-[2500ms] ease-out" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm md:text-base mb-1 md:mb-1.5 text-foreground">API-First Design</p>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">Seamless ML pipeline integration & automation</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Zap className="h-4 w-4 text-primary/40" />
                </div>
              </div>
            </div>

            {/* Enhanced CTA Buttons with Better Positioning */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6 max-w-md">
              <Button 
                asChild 
                size="lg" 
                className="text-sm md:text-base px-6 md:px-8 py-5 md:py-6 h-auto bg-primary hover:bg-primary/90 shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/15 transition-all duration-[2500ms] ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap"
              >
                <Link href="/contact" className="group/btn flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover/btn:translate-x-0.5 transition-transform duration-[2500ms] ease-out" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="text-sm md:text-base px-6 md:px-8 py-5 md:py-6 h-auto border-2 hover:border-primary/50 hover:bg-primary/5 transition-all duration-[2500ms] ease-out hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 whitespace-nowrap"
              >
                <Link href="/#platform" className="group/btn flex items-center justify-center">
                  Explore Platform
                  <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover/btn:translate-x-0.5 transition-transform duration-[2500ms] ease-out" />
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-4 md:gap-6 pt-3 md:pt-4 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 border-2 border-background" />
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 border-2 border-background" />
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-stone-400 to-stone-500 border-2 border-background" />
                </div>
                <span className="font-medium">Trusted by 500+ teams</span>
              </div>
            </div>
          </div>

          {/* Right Column - Enhanced Visual with Better Design */}
          <div className="w-full flex-1 relative lg:max-w-2xl">
            {/* Data Annotation Workflow Animation - Positioned at Top Right */}
            <div className="absolute top-0 right-0 z-30 hidden xl:block" style={{ width: '500px', height: '260px', pointerEvents: 'none' }}>
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 500 260" 
                className="absolute inset-0"
                style={{ overflow: 'visible' }}
                preserveAspectRatio="xMidYMin meet"
              >
                <defs>
                  {/* Bright Gradient for Data Flow */}
                  <linearGradient id="dataFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="rgb(129, 140, 248)" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="rgb(165, 180, 252)" stopOpacity="0.7" />
                  </linearGradient>
                  
                  {/* Subtle Glow Filter */}
                  <filter id="subtleGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Data Pipeline Flow - Horizontal flow representing annotation workflow */}
                <path
                  d="M 40 130 L 200 130 L 300 130 L 460 130"
                  stroke="url(#dataFlowGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.6"
                  strokeDasharray="8 4"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    values="0;12"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>
                
                {/* Annotation Nodes - Representing different stages */}
                {[
                  { x: 80, y: 130, label: 'Data' },
                  { x: 200, y: 130, label: 'Label' },
                  { x: 300, y: 130, label: 'Review' },
                  { x: 420, y: 130, label: 'Dataset' }
                ].map((node, i) => (
                  <g key={i}>
                    {/* Node Circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="12"
                      fill="rgb(99, 102, 241)"
                      opacity="0.4"
                      filter="url(#subtleGlow)"
                    >
                      <animate
                        attributeName="opacity"
                        values="0.4;0.7;0.4"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${i * 0.3}s`}
                      />
                    </circle>
                    {/* Inner dot */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="4"
                      fill="rgb(99, 102, 241)"
                      opacity="0.8"
                    />
                  </g>
                ))}
                
                {/* Data Points Flowing Through Pipeline */}
                {[0, 0.25, 0.5, 0.75].map((offset, i) => (
                  <circle
                    key={i}
                    r="6"
                    fill="rgb(99, 102, 241)"
                    opacity="0.6"
                  >
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      calcMode="linear"
                      path="M 40 130 L 460 130"
                      begin={`${i * 0.75}s`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0.5;0.8;0.5"
                      dur="1.5s"
                      repeatCount="indefinite"
                      begin={`${i * 0.3}s`}
                    />
                  </circle>
                ))}
                
                {/* Label Tags Being Applied - Vertical movement */}
                {[0, 0.5, 1].map((offset, i) => (
                  <g key={`tag-${i}`}>
                    <rect
                      x={180 + i * 40}
                      y={80}
                      width="24"
                      height="16"
                      rx="3"
                      fill="rgb(129, 140, 248)"
                      opacity="0.55"
                    >
                      <animate
                        attributeName="y"
                        values="80;110;80"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${i * 0.4}s`}
                      />
                      <animate
                        attributeName="opacity"
                        values="0.45;0.75;0.45"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${i * 0.4}s`}
                      />
                    </rect>
                  </g>
                ))}
                
                {/* Quality Check Indicators */}
                <g>
                  <circle
                    cx={300}
                    cy={100}
                    r="8"
                    fill="rgb(99, 102, 241)"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.45;0.75;0.45"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <path
                    d="M 295 100 L 298 103 L 305 96"
                    stroke="rgb(99, 102, 241)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    opacity="0.75"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.55;0.85;0.55"
                      dur="2.5s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              </svg>
              
              {/* Bright Background Glow Effects */}
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-400/15 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute -bottom-24 -left-24 w-[600px] h-48 bg-indigo-400/12 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
            </div>
            
            {/* Main Image Container with Enhanced Effects - Positioned below animation */}
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-border/50 group xl:mt-[272px]">
              {/* Decorative Border Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/18 via-primary/15 to-primary/18 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out -z-10" />
              
              <AspectRatio ratio={16 / 12}>
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=1050&fit=crop&q=90"
                  alt="Enterprise data annotation platform dashboard showing annotation workflows, quality metrics, and AI-assisted labeling interface"
                  fill
                  priority
                  placeholder="blur"
                  blurDataURL={blurPlaceholders.blue}
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-[3000ms] ease-out"
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent dark:from-slate-950/95 dark:via-slate-950/60" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/8" />
                
                {/* Floating Stats Cards */}
                <div className="absolute top-3 md:top-6 left-3 md:left-6 right-3 md:right-6 flex gap-2 md:gap-3">
                  <div className="bg-background/95 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-4 border border-border/50 shadow-xl flex-1 transition-transform duration-[2500ms] ease-out">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                      <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active Projects</p>
                    </div>
                    <p className="text-lg md:text-2xl font-bold text-foreground">1,247</p>
                  </div>
                  <div className="bg-background/95 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-4 border border-border/50 shadow-xl flex-1 transition-transform duration-[2500ms] ease-out">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-2">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                      <p className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wide">Annotations</p>
                    </div>
                    <p className="text-lg md:text-2xl font-bold text-foreground">2.4M</p>
                  </div>
                </div>
                
                {/* Bottom Info Card */}
                <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6">
                  <div className="bg-background/95 backdrop-blur-md rounded-lg md:rounded-xl p-3 md:p-5 border border-border/50 shadow-xl group-hover:shadow-2xl transition-all">
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                      <div className="bg-gradient-to-br from-primary/18 to-primary/10 rounded-md md:rounded-lg p-1.5 md:p-2 flex-shrink-0">
                        <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm md:text-base font-bold text-foreground truncate">Platform Dashboard</p>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">Real-time annotation workflows & quality metrics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-4 pt-2 md:pt-4 border-t border-border/50">
                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">99.9% Uptime</span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">Enterprise Ready</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AspectRatio>
            </div>
            
            {/* Subtle Floating Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/5 rounded-3xl blur-2xl" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-slate-300/8 rounded-full blur-3xl" />
            
            {/* Quick Setup Process and Efficiency Badge - Positioned After Image */}
            <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-8 lg:flex-row lg:items-start lg:justify-end">
            {/* Quick Setup Process Card */}
            <div className="relative bg-background/95 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 border border-border/50 shadow-xl w-full lg:w-auto lg:min-w-[280px]">
              <div className="flex flex-col gap-3 md:gap-4">
                <h3 className="text-sm md:text-base font-bold text-foreground mb-1 md:mb-2 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                  Quick Setup Process
                </h3>
                {[
                  { step: "1", label: "Connect Data Sources", status: "completed" },
                  { step: "2", label: "Configure Workflows", status: "active" },
                  { step: "3", label: "Start Annotation", status: "pending" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 md:gap-3 relative">
                    {/* Connection Line */}
                    {index < 2 && (
                      <div className="absolute left-[11px] md:left-[13px] top-7 md:top-8 w-0.5 h-6 md:h-8 bg-border">
                        <div className={`absolute top-0 left-0 w-full h-full bg-primary transition-all duration-1000 ${
                          item.status === "completed" ? "animate-pulse" : ""
                        }`} style={{
                          height: item.status === "completed" ? "100%" : item.status === "active" ? "50%" : "0%",
                          transitionDelay: `${index * 500}ms`
                        }} />
                      </div>
                    )}
                    {/* Step Number */}
                    <div className={`relative flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-[2500ms] ease-out ${
                      item.status === "completed" 
                        ? "bg-primary text-white shadow-lg shadow-primary/50" 
                        : item.status === "active"
                        ? "bg-primary/20 text-primary border-2 border-primary animate-pulse"
                        : "bg-secondary text-muted-foreground border-2 border-border"
                    }`}>
                      {item.status === "completed" ? (
                        <Check className="h-3 w-3 md:h-4 md:w-4" />
                      ) : (
                        item.step
                      )}
                    </div>
                    {/* Step Label */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm md:text-base font-medium transition-colors ${
                        item.status === "completed" 
                          ? "text-foreground" 
                          : item.status === "active"
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}>
                        {item.label}
                      </p>
                      {item.status === "active" && (
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                          <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-75" />
                          <div className="w-1 h-1 rounded-full bg-primary animate-pulse delay-150" />
                          <span className="text-sm text-muted-foreground ml-2">Processing...</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Floating Indicator */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full border-2 border-background animate-ping" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full border-2 border-background" />
            </div>
            
            {/* +40% Efficiency Badge */}
            <div className="bg-background border-2 border-primary/30 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-xl backdrop-blur-sm w-full lg:w-auto">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm md:text-base font-semibold text-foreground">+40% Efficiency</p>
                  <p className="text-xs md:text-sm text-muted-foreground">AI-Powered</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
}
