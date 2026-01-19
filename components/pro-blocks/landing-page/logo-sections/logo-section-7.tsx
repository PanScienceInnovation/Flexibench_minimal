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
    <section className="relative border-b py-12 lg:py-16 overflow-hidden bg-white dark:bg-black">
      <div className="container-padding-x container mx-auto relative z-10">
        <div className="flex flex-col items-center gap-8 md:gap-10">
          {/* Header */}
          <div className="section-title-gap flex max-w-2xl flex-col items-center text-center">
            <Tagline variant="ghost" className="mb-2">Trusted by industry leaders</Tagline>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Powering data-driven AI teams across industries
            </h2>
          </div>

          {/* Brands Marquee with Glows */}
          <div className="relative w-full">
            <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] dark:mask-[linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
              <div className="animate-infinite-scroll flex w-max items-center gap-16 md:gap-20 py-6">
                {[...brands, ...brands, ...brands].map((brand, index) => {
                  const uniqueKey = `brand-${brand.id}-${index}`;
                  return (
                    <div
                      key={uniqueKey}
                      className="flex-shrink-0 group relative"
                    >
                      {/* Glow Effect - Theme Aware */}
                      {/* Dark theme: Dark blue glow */}
                      <div 
                        className="hidden dark:block absolute inset-0 -inset-6 rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-300 ease-out blur-2xl"
                        style={{
                          background: 'radial-gradient(circle, oklch(0.35 0.11 252 / 1), oklch(0.35 0.11 252 / 0.6) 50%, transparent 75%)',
                        }}
                      />
                      {/* Light theme: Orange accent glow */}
                      <div 
                        className="block dark:hidden absolute inset-0 -inset-6 rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300 ease-out blur-2xl"
                        style={{
                          background: 'radial-gradient(circle, oklch(0.68 0.15 50 / 0.4), oklch(0.68 0.15 50 / 0.2) 50%, transparent 75%)',
                        }}
                      />
                      
                      {/* Brand Logo */}
                      <div className="relative flex items-center justify-center h-16 md:h-20 lg:h-24 w-auto min-w-[140px] md:min-w-[170px] lg:min-w-[200px] px-5 py-3">
                        <Image
                          src={`/${brand.image}`}
                          alt={brand.name}
                          width={200}
                          height={100}
                          className={`object-contain h-full w-auto transition-all duration-300 ease-out group-hover:scale-110 brightness-0 dark:brightness-0 dark:invert ${
                            ['samsung', 'ibm', 'nvidia'].includes(brand.id)
                              ? 'max-h-20 md:max-h-24 lg:max-h-28 scale-125 md:scale-140 lg:scale-150'
                              : ['krutrim', 'intel'].includes(brand.id)
                              ? 'max-h-18 md:max-h-22 lg:max-h-24 scale-115 md:scale-130 lg:scale-140'
                              : 'max-h-16 md:max-h-20 lg:max-h-22 scale-110 md:scale-125 lg:scale-135'
                          } ${brand.id === 'ibm' ? '-translate-y-0.5 md:-translate-y-1' : ''}`}
                          priority={index < 6}
                        />
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
