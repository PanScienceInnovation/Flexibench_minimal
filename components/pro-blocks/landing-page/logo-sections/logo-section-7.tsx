"use client";

import Image from "next/image";

const brands = [
  { name: "Krutrim", id: "krutrim", image: "Krutrim.png" },
  { name: "Databricks", id: "databricks", image: "databricks.png" },
  { name: "Intel", id: "intel", image: "Intel.png" },
  { name: "Samsung", id: "samsung", image: "Samsung.png" },
  { name: "NVIDIA", id: "nvidia", image: "NVIDIA.png" },
  { name: "IBM", id: "ibm", image: "IBM.png" },
];

export function LogoSection10() {
  // Duplicate brands for seamless loop
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="relative border-t border-b border-[#E3E3E0] dark:border-[#2A2A2A] py-8 sm:py-12 overflow-hidden bg-white dark:bg-[#0A0A0A]">
      <div className="container-padding-x container mx-auto relative z-10">
        {/* Label Row */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="font-mono text-[10px] sm:text-[11px] text-[#A3A3A3] dark:text-[#737373] tracking-widest uppercase">
            TRUSTED BY INDUSTRY LEADERS
          </div>
        </div>

        {/* Moving Logo Line - All Visible */}
        <div className="overflow-hidden w-full">
          <div className="marquee-track flex items-center">
            {marqueeBrands.map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="mx-8 sm:mx-12 md:mx-16 flex items-center justify-center h-12 sm:h-16 flex-shrink-0"
              >
                <Image
                  src={`/${brand.image}`}
                  alt={brand.name}
                  width={160}
                  height={64}
                  className="object-contain h-12 sm:h-16 w-auto grayscale brightness-0 opacity-40 dark:brightness-0 dark:invert dark:opacity-60 hover:opacity-70 dark:hover:opacity-80 transition-opacity duration-200"
                  priority={index < 6}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        
        .marquee-track:hover {
          animation-play-state: paused;
        }
        
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
