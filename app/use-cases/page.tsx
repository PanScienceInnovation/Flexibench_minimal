"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useCases, industries, modalities } from "@/lib/flexibench-content";
import { FileText, Image as ImageIcon, Video, Music, Search, ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { blurPlaceholders } from "@/lib/image-utils";

const modalityIcons: Record<string, typeof FileText> = {
  Text: FileText,
  Image: ImageIcon,
  Video: Video,
  Audio: Music,
};

export default function UseCasesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All Industries");
  const [selectedModality, setSelectedModality] = useState<string>("All Modalities");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredUseCases = useMemo(() => {
    return useCases.filter((useCase) => {
      const matchesIndustry =
        selectedIndustry === "All Industries" || useCase.industry === selectedIndustry;
      const matchesModality =
        selectedModality === "All Modalities" || useCase.modality === selectedModality;
      const matchesSearch =
        searchQuery === "" ||
        useCase.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        useCase.industry.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesIndustry && matchesModality && matchesSearch;
    });
  }, [selectedIndustry, selectedModality, searchQuery]);

  // Unique images for each use case - using local images from public/use-cases folder
  const useCaseImages: Record<number, string> = {
    1: "/use-cases/Healthcare2.png", // Clinical notes - Diagnostic Report
    2: "/use-cases/infrastructure3.jpg", // Pedestrian tracking - AV Safety (Smart vehicle)
    3: "/use-cases/Healthcare.png", // Telehealth - Training Dashboard
    4: "/use-cases/Healthcare2.png", // Radiology - Diagnostic Report
    5: "/use-cases/infrastructure2.png", // Road Sign - Infrastructure monitoring
    6: "/use-cases/finance3.png", // Product Attribute - Finance dashboard
    7: "/use-cases/finance2.png", // Shelf Planogram - Finance dashboard
    8: "/use-cases/Legal.png", // Contract Clause - Legal case
    9: "/use-cases/legal2.png", // KYC Document - Legal document
    10: "/use-cases/manufacturing.png", // Solder Joint - Manufacturing dashboard
    11: "/use-cases/manufacturing2.png", // Worker Safety - Maintenance system
    12: "/use-cases/Media3.png", // Sports Player - Video analytics
    13: "/use-cases/media2.png", // Game Chat - AI-Enhanced Video Editing
    14: "/use-cases/finance.png", // Support Ticket - Finance dashboard (dark)
    15: "/use-cases/Media.png", // Call Center - Media landing
    16: "/use-cases/infrastructure.png", // Satellite Crop - Urban Flood Prediction
    17: "/use-cases/infrastructure2.png", // Surveillance - Infrastructure monitoring
    18: "/use-cases/manufacturing3.png", // Package Damage - Training Modules
    19: "/use-cases/manufacturing2.png", // Conveyor Jam - Maintenance system (logistics)
    20: "/use-cases/finance2.png", // Grounding Signal - Finance dashboard
    21: "/use-cases/Media.png", // Multilingual Toxicity - Media landing
  };

  const industryColors: Record<string, { gradient: string; glow: string; accent: string }> = {
    "Healthcare & Life Sciences": { 
      gradient: "from-red-500/18 via-rose-500/12 to-pink-500/18", 
      glow: "from-red-500/25 to-rose-500/18",
      accent: "red"
    },
    "Automotive & Mobility": { 
      gradient: "from-blue-500/18 via-cyan-500/12 to-indigo-500/18", 
      glow: "from-blue-500/25 to-cyan-500/18",
      accent: "blue"
    },
    "Retail & E-commerce": { 
      gradient: "from-purple-500/18 via-violet-500/12 to-fuchsia-500/18", 
      glow: "from-purple-500/25 to-violet-500/18",
      accent: "purple"
    },
    "Financial Services": { 
      gradient: "from-emerald-500/18 via-teal-500/12 to-green-500/18", 
      glow: "from-emerald-500/25 to-teal-500/18",
      accent: "emerald"
    },
    "Manufacturing & Robotics": { 
      gradient: "from-amber-500/18 via-yellow-500/12 to-orange-500/18", 
      glow: "from-amber-500/25 to-yellow-500/18",
      accent: "amber"
    },
    "Media, Entertainment & Gaming": { 
      gradient: "from-pink-500/18 via-rose-500/12 to-fuchsia-500/18", 
      glow: "from-pink-500/25 to-rose-500/18",
      accent: "pink"
    },
    "Telecom & Customer Experience": { 
      gradient: "from-orange-500/18 via-amber-500/12 to-yellow-500/18", 
      glow: "from-orange-500/25 to-amber-500/18",
      accent: "orange"
    },
    "Public Sector & Defense": { 
      gradient: "from-slate-500/18 via-gray-500/12 to-zinc-500/18", 
      glow: "from-slate-500/25 to-gray-500/18",
      accent: "slate"
    },
    "Logistics & Supply Chain": { 
      gradient: "from-cyan-500/18 via-teal-500/12 to-blue-500/18", 
      glow: "from-cyan-500/25 to-teal-500/18",
      accent: "cyan"
    },
    "Cross-Industry": { 
      gradient: "from-indigo-500/18 via-purple-500/12 to-violet-500/18", 
      glow: "from-indigo-500/25 to-purple-500/18",
      accent: "indigo"
    },
  };

  return (
    <main className="relative">
      <LpNavbar1 />
      
      {/* Breadcrumbs */}
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <Breadcrumbs items={[{ label: "Use Cases" }]} />
      </div>
      
      {/* Extraordinary Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-900 via-rose-800 to-red-800 section-padding-y border-b overflow-hidden min-h-[90vh] flex items-center" style={{ paddingTop: '80px' }}>
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-600/10 via-rose-600/8 to-red-600/10" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl" />
        </div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'gridMove 20s linear infinite'
        }} />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col gap-8 text-white">
              <div className="section-title-gap-lg flex flex-col animate-fade-in-up">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Tagline variant="white" className="mb-0">Use Cases</Tagline>
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <Sparkles className="h-4 w-4 text-pink-300" />
                    <span className="text-xs font-bold text-white">22 Real-World Cases</span>
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                  Explore{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-pink-300 via-rose-300 to-red-300 bg-clip-text text-transparent">
                      Annotation
                    </span>
                    <svg className="absolute -bottom-3 left-0 w-full h-4 text-pink-400/40" viewBox="0 0 400 16" fill="none">
                      <path d="M2 12 C100 4, 200 8, 300 12 C350 14, 380 12, 398 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>{" "}
                  Use Cases
                </h1>
                <p className="text-white/90 text-xl lg:text-2xl leading-relaxed max-w-2xl font-medium">
                  Discover real-world annotation workflows that solve enterprise challenges across industries and modalities.
                </p>
              </div>
              
              {/* Stats Pills */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                  <TrendingUp className="h-5 w-5 text-pink-300" />
                  <div>
                    <div className="text-2xl font-bold text-white">22+</div>
                    <div className="text-xs text-white/70">Use Cases</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                  <Zap className="h-5 w-5 text-rose-300" />
                  <div>
                    <div className="text-2xl font-bold text-white">10+</div>
                    <div className="text-xs text-white/70">Industries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
                  <Sparkles className="h-5 w-5 text-red-300" />
                  <div>
                    <div className="text-2xl font-bold text-white">4</div>
                    <div className="text-xs text-white/70">Modalities</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 group">
                {/* Animated Border Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/12 via-rose-500/12 to-red-500/12 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out -z-10" />
                
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=900&fit=crop&q=80"
                    alt="Use cases across industries showing various annotation workflows"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.pink}
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-[3500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-950/85 via-pink-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/12 via-transparent to-red-500/12" />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extraordinary Filters Section */}
      <section className="relative bg-gradient-to-b from-background via-secondary/30 to-background section-padding-y border-b overflow-visible -mt-20 pb-8">
        <div className="container-padding-x container mx-auto relative z-20">
          {/* Glassmorphism Filter Bar */}
          <div className="relative bg-background/80 backdrop-blur-xl rounded-3xl border-2 border-border/50 shadow-2xl p-6 md:p-8 animate-fade-in-up mb-6">
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-[3000ms] ease-out" />
            
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search use cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-base border-2 focus:border-primary/50 transition-colors bg-background/50"
                />
              </div>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full md:w-[220px] h-14 text-base border-2 bg-background/50">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedModality} onValueChange={setSelectedModality}>
                <SelectTrigger className="w-full md:w-[220px] h-14 text-base border-2 bg-background/50">
                  <SelectValue placeholder="Modality" />
                </SelectTrigger>
                <SelectContent>
                  {modalities.map((modality) => (
                    <SelectItem key={modality} value={modality}>
                      {modality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results Count Badge - Moved outside filter bar */}
          <div className="flex justify-center">
            <div className="px-6 py-2 bg-primary/90 backdrop-blur-md rounded-full border-2 border-primary/30 shadow-lg">
              <span className="text-sm font-bold text-white">
                {filteredUseCases.length} of {useCases.length} use cases
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Extraordinary Use Cases Grid */}
      <section className="relative bg-gradient-to-b from-pink-900 via-rose-800 to-red-800 section-padding-y border-b overflow-hidden pt-16">
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Enhanced Floating Gradient Orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-500/10 via-transparent to-red-500/10 rounded-full blur-3xl" />
        
        <div className="container-padding-x container mx-auto relative z-10">
          {filteredUseCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 use-cases-grid">
              {filteredUseCases.map((useCase, index) => {
                const IconComponent = modalityIcons[useCase.modality] || FileText;
                const colors = industryColors[useCase.industry] || { 
                  gradient: "from-primary/20 to-primary/10", 
                  glow: "from-primary/30 to-primary/20",
                  accent: "primary"
                };
                const imageUrl = useCaseImages[useCase.id] || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop&q=80";
                
                // Staggered animation
                const animationDelay = index * 100;
                const rowIndex = Math.floor(index / 3);
                const isEvenRow = rowIndex % 2 === 0;
                
                return (
                  <Card
                    key={useCase.id}
                    className={`group relative bg-gradient-to-br from-background to-secondary/60 backdrop-blur-sm gap-0 overflow-hidden rounded-3xl border-2 border-border/60 p-0 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-[3000ms] ease-out hover:border-primary/60 use-case-card`}
                    style={{
                      animationDelay: `${animationDelay}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {/* Enhanced Animated Background Glow - Always Visible */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out rounded-3xl`} />
                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${colors.glow} rounded-full blur-3xl -mr-24 -mt-24 opacity-20 group-hover:opacity-100 transition-opacity duration-[3500ms] ease-out`} />
                    <div className={`absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr ${colors.glow} rounded-full blur-2xl -ml-20 -mb-20 opacity-20 group-hover:opacity-100 transition-opacity duration-[3500ms] ease-out`} style={{ animationDelay: '0.2s' }} />
                    
                    {/* Animated Border Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-[3000ms] ease-out -z-10" />
                    
                    {/* Enhanced Image Header with 3D Effect */}
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={`${useCase.industry} use case: ${useCase.title}`}
                        fill
                        placeholder="blur"
                        blurDataURL={blurPlaceholders.default}
                        loading="lazy"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-[3500ms] ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out" />
                      
                      {/* Icon Badge with 3D Transform */}
                      <div className="absolute top-6 left-6">
                        <div className="bg-background/95 backdrop-blur-md flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-primary/30 shadow-2xl transform group-hover:scale-[1.02] group-hover:rotate-2 transition-all duration-[2500ms] ease-out">
                          <IconComponent className="text-primary h-8 w-8" />
                        </div>
                      </div>
                      
                      {/* Floating Tags */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-white bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30 shadow-lg transform transition-transform duration-[2500ms] ease-out">
                            {useCase.industry.split(" ")[0]}
                          </span>
                          <span className="text-xs text-white/60">•</span>
                          <span className="text-xs font-semibold text-slate-800 dark:text-slate-900 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 shadow-lg transform transition-transform duration-[2500ms] ease-out">
                            {useCase.modality}
                          </span>
                        </div>
                      </div>
                      
                      {/* Shine Effect on Hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[4000ms] ease-out" />
                    </div>
                    
                    <CardContent className="relative flex flex-col gap-5 p-8 bg-gradient-to-b from-transparent to-background/50">
                      <h3 className="text-foreground text-2xl font-bold leading-tight group-hover:text-primary transition-colors duration-[2500ms] ease-out line-clamp-2">
                        {useCase.title}
                      </h3>
                      
                      <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-border/30 group-hover:border-primary/30 transition-colors duration-[2500ms] ease-out shadow-lg">
                          <h4 className="text-xs font-bold text-primary mb-2 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Problem
                          </h4>
                          <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed line-clamp-2 font-medium">{useCase.problem}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 mt-auto border-t border-border/40 group-hover:border-primary/40 transition-colors duration-[2500ms] ease-out">
                        <Link 
                          href={`/use-cases/${useCase.id}`} 
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-bold transition-all duration-[2500ms] ease-out group/link border border-primary/20 hover:border-primary/40"
                        >
                          <span>View Full Case Study</span>
                          <ArrowRight className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform duration-[2500ms] ease-out" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-32">
              <div className="bg-background/80 backdrop-blur-xl rounded-3xl p-16 border-2 border-border/50 shadow-2xl max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">No use cases found</h3>
                  <p className="text-muted-foreground text-lg">
                    Try adjusting your search criteria or filters to find what you're looking for.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer1 />
      
      {/* Extraordinary Animation Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) translateX(5px);
            opacity: 0.6;
          }
        }
        
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
        
        @keyframes cardReveal {
          from {
            opacity: 0;
            transform: translateY(80px) scale(0.9) rotateX(10deg);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
            filter: blur(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .use-case-card {
          animation: cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        
        .use-case-card:hover {
          transform: translateY(-16px) scale(1.03) rotateY(2deg);
        }
        
        .use-cases-grid {
          opacity: 1;
        }
      `}</style>
    </main>
  );
}
