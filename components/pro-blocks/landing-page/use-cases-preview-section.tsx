"use client";

import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { useCases } from "@/lib/flexibench-content";
import { FileText, Image as ImageIcon, Video, Music, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const modalityIcons: Record<string, typeof FileText> = {
  Text: FileText,
  Image: ImageIcon,
  Video: Video,
  Audio: Music,
};

export function UseCasesPreviewSection() {
  // Get 3 featured use cases (first from different industries)
  const featuredUseCases = [
    useCases[0], // Healthcare - Text
    useCases[1], // Automotive - Video (Pedestrian Occlusion Track Annotation)
    useCases[7], // Retail - Image
  ];

  const industryColors: Record<string, string> = {
    "Healthcare & Life Sciences": "from-slate-600/10 to-slate-600/5",
    "Automotive & Mobility": "from-orange-600/10 to-orange-600/5",
    "Retail & E-commerce": "from-indigo-600/10 to-indigo-600/5",
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950 section-padding-y border-b overflow-hidden">
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/2 via-transparent to-orange-600/2" />
        {/* Mesh Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 md:gap-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-6">
          <Tagline>Use Cases</Tagline>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight">
            Annotation Use Cases Across{" "}
            <span className="text-primary">Industries</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore real-world annotation workflows that solve enterprise challenges across industries and modalities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featuredUseCases.map((useCase, index) => {
            const IconComponent = modalityIcons[useCase.modality] || FileText;
            const colorClass = industryColors[useCase.industry] || "from-primary/10 to-primary/5";
            const animationDelay = index * 150;
            const animations = ['animate-fade-in-left', 'animate-fade-in-up', 'animate-fade-in-right'];
            return (
              <Card
                key={useCase.id}
                className={`group relative bg-gradient-to-br from-background to-secondary/30 gap-0 overflow-hidden rounded-2xl border-2 border-border/50 p-8 shadow-lg hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:scale-105 hover:-translate-y-2 hover:border-primary/30 opacity-0 ${animations[index % animations.length]}`}
                style={{ animationDelay: `${animationDelay}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out`} />
                
                {/* Image Section */}
                <div className="relative mb-6 h-40 rounded-xl border border-border/30 overflow-hidden group/image">
                  <Image
                    src={
                      useCase.id === 1
                        ? "/use-cases/Healthcare2.png"
                        : useCase.id === 2
                        ? "/use-cases/infrastructure3.jpg"
                        : useCase.id === 8
                        ? "/use-cases/Legal.png"
                        : "/use-cases/Healthcare2.png"
                    }
                    alt={`${useCase.industry} use case: ${useCase.title} showing ${useCase.modality.toLowerCase()} annotation workflow`}
                    fill
                    className="object-cover object-top group-hover/image:scale-110 transition-transform duration-[2500ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg p-2 border border-border/30 shadow-lg">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm font-semibold text-foreground bg-primary/90 backdrop-blur-sm px-2 py-1 rounded">
                        {useCase.industry.split(" ")[0]}
                      </span>
                      <span className="text-sm text-foreground/80">•</span>
                      <span className="text-sm font-medium text-foreground bg-background/90 backdrop-blur-sm px-2 py-1 rounded">
                        {useCase.modality}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="relative flex flex-col gap-4 p-0">
                  <div>
                    <h3 className="text-foreground text-xl md:text-2xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-1">Problem</p>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed line-clamp-2">
                          {useCase.problem}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center pt-4">
          <Link href="/use-cases">
            <Button variant="outline" size="lg" className="gap-2">
              Explore All {useCases.length} Use Cases
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
