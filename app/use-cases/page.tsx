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

  // Unified color scheme with orange accents on navy blue
  const industryColors: Record<string, { gradient: string; glow: string; accent: string }> = {
    "Healthcare & Life Sciences": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Automotive & Mobility": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Retail & E-commerce": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Financial Services": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Manufacturing & Robotics": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Media, Entertainment & Gaming": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Telecom & Customer Experience": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Public Sector & Defense": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Logistics & Supply Chain": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
    "Cross-Industry": { 
      gradient: "from-[oklch(0.68_0.15_50)]/18 via-[oklch(0.68_0.15_50)]/12 to-[oklch(0.68_0.15_50)]/18", 
      glow: "from-[oklch(0.68_0.15_50)]/25 to-[oklch(0.68_0.15_50)]/18",
      accent: "[oklch(0.68_0.15_50)]"
    },
  };

  return (
    <main className="relative">
      <LpNavbar1 />
      
      {/* Breadcrumbs */}
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <Breadcrumbs items={[{ label: "Use Cases" }]} />
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden" style={{ 
        paddingTop: '80px'
      }}>
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col gap-8">
              <div className="section-title-gap-lg flex flex-col">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] text-[#737373] dark:text-[#A3A3A3]">
                    Use Cases
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-[3px] bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A]">
                    <Sparkles className="h-4 w-4 text-[#1A1AFF]" />
                    <span className="font-mono text-[11px] text-[#737373] dark:text-[#A3A3A3] font-semibold">21 Real-World Cases</span>
                  </div>
                </div>
                <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1]">
                  <span className="text-[#0A0A0A] dark:text-[#F7F6F3]">Explore</span>{" "}
                  <span className="text-[#1A1AFF]">Annotation</span>{" "}
                  <span className="text-[#0A0A0A] dark:text-[#F7F6F3]">Use Cases</span>
                </h1>
                <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] leading-relaxed max-w-2xl">
                  Discover real-world annotation workflows that solve enterprise challenges across industries and modalities.
                </p>
              </div>
              
              {/* Stats Pills */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px]">
                  <TrendingUp className="h-5 w-5 text-[#1A1AFF]" />
                  <div>
                    <div className="font-display text-2xl font-bold text-[#0A0A0A] dark:text-[#F7F6F3]">21+</div>
                    <div className="font-mono text-[11px] text-[#737373] dark:text-[#A3A3A3] uppercase">Use Cases</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px]">
                  <Zap className="h-5 w-5 text-[#1A1AFF]" />
                  <div>
                    <div className="font-display text-2xl font-bold text-[#0A0A0A] dark:text-[#F7F6F3]">10+</div>
                    <div className="font-mono text-[11px] text-[#737373] dark:text-[#A3A3A3] uppercase">Industries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px]">
                  <Sparkles className="h-5 w-5 text-[#1A1AFF]" />
                  <div>
                    <div className="font-display text-2xl font-bold text-[#0A0A0A] dark:text-[#F7F6F3]">4</div>
                    <div className="font-mono text-[11px] text-[#737373] dark:text-[#A3A3A3] uppercase">Modalities</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0]">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=900&fit=crop&q=80"
                    alt="Use cases across industries showing various annotation workflows"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.pink}
                    className="object-cover object-top grayscale-[10%] brightness-[1.05]"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="relative bg-white dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-visible -mt-16 sm:-mt-20 pb-6 sm:pb-8">
        <div className="container-padding-x container mx-auto relative z-20">
          {/* Filter Bar */}
          <div className="relative bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-4 sm:p-6 md:p-8 mb-4 sm:mb-6">
            <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#737373]" />
                <Input
                  placeholder="Search use cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 sm:pl-12 h-12 sm:h-14 text-sm sm:text-base border border-[#E3E3E0] dark:border-[#2A2A2A] focus:border-[#1A1AFF] transition-colors bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[3px] font-sans"
                />
              </div>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full md:w-[220px] h-12 sm:h-14 text-sm sm:text-base border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[3px] font-sans">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A]">
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry} className="text-[#0A0A0A] dark:text-[#F7F6F3] hover:bg-[#F0EFE9] dark:hover:bg-[#1A1A1A]">
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedModality} onValueChange={setSelectedModality}>
                <SelectTrigger className="w-full md:w-[220px] h-12 sm:h-14 text-sm sm:text-base border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#0A0A0A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[3px] font-sans">
                  <SelectValue placeholder="Modality" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A]">
                  {modalities.map((modality) => (
                    <SelectItem key={modality} value={modality} className="text-[#0A0A0A] dark:text-[#F7F6F3] hover:bg-[#F0EFE9] dark:hover:bg-[#1A1A1A]">
                      {modality}
                    </SelectItem>
                  ))}
                </SelectContent>
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
          
          {/* Results Count Badge */}
          <div className="flex justify-center">
            <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#0A0A0A] dark:bg-[#141414] rounded-[3px] border border-[#E3E3E0] dark:border-[#2A2A2A]">
              <span className="font-mono text-[10px] sm:text-[11px] font-bold text-white dark:text-[#F7F6F3] uppercase">
                {filteredUseCases.length} of {useCases.length} use cases
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className={`relative ${filteredUseCases.length > 0 ? 'bg-[#F7F6F3] dark:bg-[#0A0A0A]' : 'bg-white dark:bg-[#0A0A0A]'} section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden pt-12 sm:pt-16`}>
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(to right, rgba(59,130,246,0.3) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(59,130,246,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
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
              <div
                key={useCase.id}
                className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] overflow-hidden hover:border-[#1A1AFF] transition-colors duration-200"
              >
                {/* Image Header */}
                <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <Image
                    src={imageUrl}
                    alt={`${useCase.industry} use case: ${useCase.title}`}
                    fill
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.default}
                    loading="lazy"
                    className="object-cover object-top grayscale-[10%] brightness-[1.05] dark:brightness-[0.9]"
                  />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <div className="bg-white dark:bg-[#141414] rounded-[3px] p-1.5 sm:p-2 border border-[#E3E3E0] dark:border-[#2A2A2A]">
                      <IconComponent className="text-[#0A0A0A] dark:text-[#F7F6F3] h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                      <span className="font-mono text-[9px] sm:text-[10px] bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[2px] text-[#0A0A0A] dark:text-[#F7F6F3]">
                        {useCase.industry.split(" ")[0]}
                      </span>
                      <span className="text-[#E3E3E0] dark:text-[#2A2A2A]">•</span>
                      <span className="font-mono text-[9px] sm:text-[10px] bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-[2px] text-[#0A0A0A] dark:text-[#F7F6F3]">
                        {useCase.modality}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4">
                  <h3 className="font-display text-[18px] sm:text-[20px] text-[#0A0A0A] dark:text-[#F7F6F3] leading-tight line-clamp-2">
                    {useCase.title}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="p-3 sm:p-4 bg-[#F7F6F3] dark:bg-[#1A1A1A] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px]">
                      <h4 className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] dark:text-[#737373] mb-2 uppercase tracking-widest">
                        Problem
                      </h4>
                      <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7] line-clamp-2">{useCase.problem}</p>
                    </div>
                  </div>
                </div>
              </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 sm:py-32">
              <div className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-12 sm:p-16 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[4px] bg-[#F0EFE9] dark:bg-[#1A1A1A] flex items-center justify-center">
                    <Search className="h-8 w-8 sm:h-10 sm:w-10 text-[#1A1AFF]" />
                  </div>
                  <h3 className="font-display text-[24px] sm:text-[28px] text-[#0A0A0A] dark:text-[#F7F6F3]">No use cases found</h3>
                  <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3]">
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
