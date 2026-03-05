"use client";

import { whyFlexibenchPoints } from "@/lib/flexibench-content";

export function WhyFlexibenchSection() {
  // Use first 4 cards
  const cards = whyFlexibenchPoints.slice(0, 4);

  return (
        <section
          className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden"
          id="why-flexibench"
        >
      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-16">
        {/* Section Header */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-6">
              <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] text-[#737373] dark:text-[#A3A3A3]">
                Why Flexibench
              </div>
              <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3] text-center max-w-3xl mx-auto">
                High-Quality Data Is the{" "}
                <span className="text-[#1A1AFF]">Foundation</span>{" "}
                of Every Successful AI Model
              </h2>
              <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] text-center max-w-2xl mx-auto">
                Most annotation tools treat labeling as a task. We treat it as data engineering because the
                right labels determine whether a model succeeds, fails, or never gets deployed.
              </p>
        </div>

        {/* Cards Grid - 2x2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto mt-8 sm:mt-12 md:mt-16">
              {cards.map((point, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-6 sm:p-8 hover:border-[#1A1AFF] transition-colors duration-200"
                >
                  <div className="font-mono text-[11px] text-[#A3A3A3] dark:text-[#737373] mb-3">
                    {String(index + 1).padStart(2, '0')} /
                  </div>
                  <h3 className="font-display text-[18px] sm:text-[20px] md:text-[22px] text-[#0A0A0A] dark:text-[#F7F6F3] mb-3">
                    {point.title}
                  </h3>
                  <p className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7]">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
      </div>
    </section>
  );
}
