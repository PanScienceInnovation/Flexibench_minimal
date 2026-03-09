import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { InternalToolsSection } from "@/components/pro-blocks/landing-page/internal-tools-section";
import { Card, CardContent } from "@/components/ui/card";
import { internalTools } from "@/lib/flexibench-content";
import { blurPlaceholders } from "@/lib/image-utils";
import { Workflow, Mic, Users } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const iconMap: Record<string, typeof Workflow> = {
  Workflow,
  Mic,
  Users,
};

export default function InternalToolsPage() {
  return (
    <main>
      <LpNavbar1 />
      {/* Breadcrumbs */}
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <Breadcrumbs items={[{ label: "Internal Tools" }]} />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative bg-[#F7F6F3] section-padding-y border-b border-[#E3E3E0] overflow-hidden" style={{ 
        paddingTop: '80px'
      }}>
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col gap-8">
              <div className="section-title-gap-lg flex flex-col">
                <Tagline className="mb-4">Flexibench Ecosystem</Tagline>
                <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] font-bold">
                  Extend Annotation from{" "}
                  <span className="text-[#1A1AFF]">Tasks</span>{" "}
                  to Strategy
                </h1>
                <p className="text-[#737373] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed max-w-2xl font-sans">
                  Flexibench is bolstered by internal tools that extend its reach: DataBench for workflow
                  orchestration (with advanced modules like Phonex) and FlexiPod for outcome-driven execution.
                </p>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0] bg-white">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="/Tasks_to_Strategy.png"
                    alt="Flexibench ecosystem tools: DataBench, Phonex, and FlexiPod workflow orchestration"
                    fill
                    priority
                    placeholder="blur"
                    blurDataURL={blurPlaceholders.primary}
                    className="object-contain object-center"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InternalToolsSection />

      {/* Enhanced Phonex Section */}
      <section className="relative bg-white section-padding-y border-b border-[#E3E3E0] overflow-hidden" id="phonex">
        <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left Column - Image */}
          <div className="flex-1">
            <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0]">
              <AspectRatio ratio={4 / 3}>
                <Image
                  src="/Phonex2.png"
                  alt="Phonex voice annotation engine showing audio waveforms and speech recognition interface"
                  fill
                  className="object-cover object-left-top"
                />
              </AspectRatio>
            </div>
          </div>
          
          {/* Right Column - Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="section-title-gap-lg flex flex-col">
              <Tagline>Phonex</Tagline>
              <h2 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-display leading-[1.1] text-[#0A0A0A] font-bold">
                Voice Annotation Engine{" "}
                <span className="text-[#1A1AFF]">(Inside DataBench)</span>
              </h2>
              <p className="text-[#737373] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed font-sans">
                {internalTools[1].description}
              </p>
            </div>

            <Card className="bg-white rounded-[4px] border border-[#E3E3E0] p-6 md:p-8 hover:border-[#1A1AFF] transition-colors">
              <CardContent className="flex flex-col gap-6 p-0">
                <div>
                  <h3 className="text-[#0A0A0A] text-[20px] sm:text-[24px] font-display font-bold mb-3 flex items-center gap-3">
                    <div className="bg-[#F7F6F3] flex h-10 w-10 items-center justify-center rounded-[3px] border border-[#E3E3E0]">
                      <Mic className="text-[#1A1AFF] h-5 w-5" />
                    </div>
                    Why It Matters
                  </h3>
                  <p className="text-[#737373] text-[15px] sm:text-[16px] leading-relaxed font-sans">{internalTools[1].whyItMatters}</p>
                </div>
                <div>
                  <h3 className="text-[#0A0A0A] text-[20px] sm:text-[24px] font-display font-bold mb-3">Phonex Capabilities</h3>
                  <ul className="list-disc list-inside text-[#737373] space-y-2 font-sans text-[15px] sm:text-[16px]">
                    {internalTools[1].capabilities.map((cap, idx) => (
                      <li key={idx} className="leading-relaxed">{cap}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#F7F6F3] rounded-[4px] p-6 border border-[#E3E3E0]">
                  <h4 className="font-display font-bold text-[#0A0A0A] mb-2">Outcome:</h4>
                  <p className="text-[#737373] text-[15px] sm:text-[16px] leading-relaxed font-sans">
                    Cleaner audio training data, fewer iteration cycles to achieve stable ASR and voice
                    understanding models, and datasets that support voice-first AI with real robustness.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced FlexiPod Section */}
      <section className="relative bg-[#F7F6F3] section-padding-y border-b border-[#E3E3E0] overflow-hidden" id="flexipod">
        <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 lg:flex-row-reverse lg:items-center lg:gap-16">
          {/* Right Column - Image */}
          <div className="flex-1">
            <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0]">
              <AspectRatio ratio={4 / 3}>
                <Image
                  src="/Flexipod.png"
                  alt="FlexiPod cross-functional team collaboration showing annotation engineers, data scientists, and domain specialists"
                  fill
                  className="object-contain object-top"
                />
              </AspectRatio>
            </div>
          </div>
          
          {/* Left Column - Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="section-title-gap-lg flex flex-col">
              <Tagline>FlexiPod</Tagline>
              <h2 className="text-[28px] sm:text-[32px] md:text-[40px] lg:text-[48px] font-display leading-[1.1] text-[#0A0A0A] font-bold">
                Cross-functional talent pods that take{" "}
                <span className="text-[#1A1AFF]">full ownership</span>
              </h2>
              <p className="text-[#737373] text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed font-sans">
                {internalTools[2].description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-white rounded-[4px] border border-[#E3E3E0] p-6 md:p-8 hover:border-[#1A1AFF] transition-colors">
                <CardContent className="flex flex-col gap-4 p-0">
                  <h3 className="text-[#0A0A0A] text-[20px] sm:text-[24px] font-display font-bold flex items-center gap-3">
                    <div className="bg-[#F7F6F3] flex h-10 w-10 items-center justify-center rounded-[3px] border border-[#E3E3E0]">
                      <Users className="text-[#1A1AFF] h-5 w-5" />
                    </div>
                    Why It Matters
                  </h3>
                  <p className="text-[#737373] text-[15px] sm:text-[16px] leading-relaxed font-sans">{internalTools[2].whyItMatters}</p>
                </CardContent>
              </Card>

              <Card className="bg-white rounded-[4px] border border-[#E3E3E0] p-6 md:p-8 hover:border-[#1A1AFF] transition-colors">
                <CardContent className="flex flex-col gap-4 p-0">
                  <h3 className="text-[#0A0A0A] text-[20px] sm:text-[24px] font-display font-bold mb-3">Pod Outcomes Include</h3>
                  <ul className="list-disc list-inside text-[#737373] space-y-2 font-sans text-[15px] sm:text-[16px]">
                    <li className="leading-relaxed">Faster dataset delivery with agreed benchmarks</li>
                    <li className="leading-relaxed">Measurable quality lift across annotation milestones</li>
                    <li className="leading-relaxed">Embedded best practices and QA templates</li>
                    <li className="leading-relaxed">Seamless handoff into training and evaluation pipelines</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer1 />
    </main>
  );
}
