"use client";

import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Image from "next/image";

const brands = [
  { name: "Krutrim", id: "krutrim", image: "Krutrim.png", color: "from-purple-500 to-indigo-600" },
  { name: "Databricks", id: "databricks", image: "databricks.png", color: "from-orange-500 to-red-600" },
  { name: "Intel", id: "intel", image: "Intel.png", color: "from-blue-500 to-cyan-600" },
  { name: "Samsung", id: "samsung", image: "Samsung.png", color: "from-gray-800 to-gray-900" },
  { name: "NVIDIA", id: "nvidia", image: "NVIDIA.png", color: "from-green-500 to-emerald-600" },
  { name: "IBM", id: "ibm", image: "IBM.png", color: "from-blue-600 to-blue-800" },
];

export function LogoSection10() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950 dark:from-indigo-950 dark:via-purple-950 dark:to-violet-950 border-b py-24 lg:py-32 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '64px 64px'
        }} />
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      <div className="container-padding-x container mx-auto relative z-10">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          {/* Enhanced Header */}
          <div className="section-title-gap-lg flex max-w-2xl flex-col items-center text-center opacity-0 animate-fade-in-up">
            <Tagline variant="ghost" className="mb-2">Trusted by industry leaders</Tagline>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Powering data-driven AI teams across industries
            </h2>
          </div>

          {/* Premium Brands Marquee */}
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
            
            <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
              <div className="animate-infinite-scroll flex w-max items-center gap-20 py-8">
                {[...brands, ...brands, ...brands].map((brand, index) => {
                  const uniqueKey = `brand-${brand.id}-${index}`;
                  return (
                    <div
                      key={uniqueKey}
                      className="flex-shrink-0 group relative"
                    >
                      {/* Brand Container with White Background for Better Contrast */}
                      <div className="relative px-8 py-5 rounded-2xl bg-white dark:bg-slate-900 border border-border/50 shadow-lg backdrop-blur-sm hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:scale-110 hover:-translate-y-2">
                        {/* Gradient Glow Effect */}
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${brand.color} opacity-0 group-hover:opacity-10 transition-opacity duration-[2500ms] ease-out blur-xl`} />
                        
                        {/* Brand Logo */}
                        <div className="relative flex items-center justify-center h-12 md:h-16 w-auto min-w-[120px] md:min-w-[160px]">
                          <Image
                            src={`/${brand.image}`}
                            alt={brand.name}
                            width={160}
                            height={64}
                            className={`object-contain h-full w-auto transition-all duration-[2500ms] ease-out group-hover:scale-105 brightness-0 dark:brightness-0 dark:invert ${
                              ['samsung', 'ibm', 'nvidia'].includes(brand.id)
                                ? 'max-h-16 md:max-h-24 scale-150 md:scale-200'
                                : ['krutrim', 'intel'].includes(brand.id)
                                ? 'max-h-16 md:max-h-20 scale-125 md:scale-150'
                                : 'max-h-12 md:max-h-16'
                            } ${brand.id === 'ibm' ? '-translate-y-1 md:-translate-y-1.5' : ''}`}
                            priority={index < 6}
                          />
                        </div>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out delay-100" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-33.333%));
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
          will-change: transform;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
