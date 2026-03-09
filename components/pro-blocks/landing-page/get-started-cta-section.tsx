"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GetStartedCtaSection() {
  return (
    <section
      className="relative bg-[#F7F6F3] section-padding-y border-t border-[#E3E3E0] overflow-hidden"
      aria-labelledby="get-started-section-title"
      id="get-started"
    >
      <div className="container-padding-x container mx-auto relative z-10">
        <div className="flex flex-col items-center gap-12 md:gap-16">
          {/* Section Header */}
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center gap-6">
            <Tagline className="font-mono border border-[#E3E3E0] rounded-[3px] px-3 py-1">Get Started</Tagline>
            <h2
              id="get-started-section-title"
              className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-tight text-[#0A0A0A]"
            >
              Start Building{" "}
              <span className="text-[#1A1AFF]">
                Model-Ready Data
              </span>{" "}
              Today
            </h2>
            <p className="text-[#737373] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed font-sans">
              Whether you want a demo, a consultation, or onboarding support, our team is ready to help
              you succeed with Flexibench.
            </p>
          </div>

          {/* Two-Column Side-by-Side CTA Cards */}
          <div className="flex w-full flex-col items-center gap-6 md:max-w-4xl md:flex-row md:gap-8">
            <Card className="group relative bg-white border border-[#E3E3E0] rounded-[4px] p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-400 flex-1 w-full">
              <CardContent className="relative flex flex-col gap-6 sm:gap-8 p-0">
                <div className="rounded-[3px] p-4 w-fit">
                  <h3 className="text-[#0A0A0A] text-lg sm:text-xl md:text-2xl font-display font-bold mb-2">
                    Talk to Sales
                  </h3>
                  <p className="text-[#737373] text-sm sm:text-base md:text-lg leading-relaxed max-w-xs font-sans">
                    Get a tailored demo and learn how Flexibench can fit your annotation needs.
                  </p>
                </div>
                <Button asChild size="lg" className="w-full text-sm sm:text-base bg-[#0A0A0A] text-white hover:bg-[#1A1AFF] rounded-[3px] font-mono transition-colors duration-400">
                  <Link href="/contact?type=sales" className="group/btn flex items-center justify-center">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group relative bg-white border border-[#E3E3E0] rounded-[4px] p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-md transition-all duration-400 flex-1 w-full">
              <CardContent className="relative flex flex-col gap-6 sm:gap-8 p-0">
                <div className="rounded-[3px] p-4 w-fit">
                  <h3 className="text-[#0A0A0A] text-lg sm:text-xl md:text-2xl font-display font-bold mb-2">
                    Request a Demo
                  </h3>
                  <p className="text-[#737373] text-sm sm:text-base md:text-lg leading-relaxed max-w-xs font-sans">
                    Choose a time and let us walk you through the platform.
                  </p>
                </div>
                <Button variant="default" asChild size="lg" className="w-full text-sm sm:text-base bg-[#1A1AFF] text-white hover:bg-[#1A1AFF]/90 rounded-[3px] font-mono transition-colors duration-400">
                  <Link href="/contact?type=demo" className="group/btn flex items-center justify-center">
                    Schedule Demo
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
