"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

export function FaqSection2() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  return (
    <section
      className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] section-padding-y border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden"
      aria-labelledby="faq-heading"
      id="faq"
    >
      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12">
        {/* First Row: Left (Intro) + Right (General FAQ) */}
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16 lg:items-start">
          {/* Left Column - Intro */}
          <div className={`flex flex-col lg:max-w-md lg:flex-shrink-0 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            {/* Category Tag */}
            <div className="mb-4">
              <div className="font-mono text-[11px] uppercase tracking-widest border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] text-[#737373] dark:text-[#A3A3A3] inline-block">
                FAQ
              </div>
            </div>
            {/* Main Title */}
            <h1 id="faq-heading" className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] font-display text-[#0A0A0A] dark:text-[#F7F6F3] mb-4">
              Frequently asked questions about Flexibench
            </h1>
            {/* Section Description */}
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3]">
              Find answers to common questions about our annotation platform, capabilities, and how it
              can help your team. Can&apos;t find what you&apos;re looking for?{" "}
              <Link href="/contact" className="text-[#1A1AFF] underline hover:text-[#1A1AFF]/80 transition-colors">
                Contact us.
              </Link>
            </p>
          </div>

          {/* Right Column - Both FAQ Sections (Aligned) */}
          <div className={`flex-1 flex flex-col gap-8 min-w-0 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '100ms' }}>
            {/* General FAQ Section */}
            <div className="flex flex-col gap-4">
              {/* Section Title */}
              <h2 className="font-mono text-[12px] sm:text-[13px] uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373]">
                General
              </h2>
              {/* FAQ Accordion */}
              <Accordion
                type="single"
                collapsible
                defaultValue="item-1"
                aria-label="General FAQ items"
                className="w-full"
              >
                {/* FAQ Item 1 */}
                <AccordionItem value="item-1" className="border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <AccordionTrigger className="text-left pr-8 hover:no-underline font-sans text-[15px] sm:text-[16px] text-[#0A0A0A] dark:text-[#F7F6F3] font-medium">
                    What makes Flexibench different from other annotation platforms?
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] pt-2">
                    Flexibench treats annotation as data engineering, not just task management. We
                    integrate deeply with training workflows, enforce consistent ontologies across
                    projects, support auditable quality pipelines, and provide feedback signals back
                    into model training. Our platform is built for enterprise-grade governance and
                    model-ready datasets.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 2 */}
                <AccordionItem value="item-2" className="border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <AccordionTrigger className="text-left pr-8 hover:no-underline font-sans text-[15px] sm:text-[16px] text-[#0A0A0A] dark:text-[#F7F6F3] font-medium">
                    What annotation modalities does Flexibench support?
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] pt-2">
                    Flexibench supports comprehensive annotation workflows across Text, Image, Video,
                    and Audio modalities. Each modality includes specialized tooling and workflows
                    designed for quality, governance, and model-aligned outputs. Our platform handles
                    everything from named entity extraction in text to temporal tracking in video.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 3 */}
                <AccordionItem value="item-3" className="border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <AccordionTrigger className="text-left pr-8 hover:no-underline font-sans text-[15px] sm:text-[16px] text-[#0A0A0A] dark:text-[#F7F6F3] font-medium">
                    How does AI-assisted labeling work?
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] pt-2">
                    Flexibench embeds model-driven pre-label suggestions into annotation workflows.
                    Models generate pre-labels for repetitive tasks with confidence scores that guide
                    human review priorities. Our active learning integration focuses labeling efforts
                    on high-impact data, reducing manual effort while maintaining human oversight for
                    quality.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 4 */}
                <AccordionItem value="item-4" className="border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <AccordionTrigger className="text-left pr-8 hover:no-underline font-sans text-[15px] sm:text-[16px] text-[#0A0A0A] dark:text-[#F7F6F3] font-medium">
                    What quality control features are available?
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] pt-2">
                    Flexibench includes multi-stage review pipelines, consensus scoring across
                    annotators, benchmark and gold standard comparisons, real-time quality monitoring
                    dashboards, and full auditability. Every label, edit, and review action is
                    tracked with metadata (who, when, how) for compliance and governance.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Technical FAQ Section - Aligned with General */}
            <div className="flex flex-col gap-4">
              {/* Section Title */}
              <h2 className="font-mono text-[12px] sm:text-[13px] uppercase tracking-widest text-[#A3A3A3] dark:text-[#737373]">
                Technical
              </h2>
              {/* FAQ Accordion */}
              <Accordion
                type="single"
                collapsible
                defaultValue=""
                aria-label="Technical FAQ items"
                className="w-full"
              >
                {/* FAQ Item 1 */}
                <AccordionItem value="technical-1" className="border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <AccordionTrigger className="text-left pr-8 hover:no-underline font-sans text-[15px] sm:text-[16px] text-[#0A0A0A] dark:text-[#F7F6F3] font-medium">
                    How do I integrate Flexibench with my ML training pipeline?
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] pt-2">
                    Flexibench provides REST APIs and Python SDK for seamless integration with your
                    ML workflows. You can import raw data, export annotated datasets with tags and
                    metadata, and integrate with TensorFlow, PyTorch, and ML orchestration systems.
                    Our APIs support batch operations and active learning loops for iterative model
                    development.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 2 */}
                <AccordionItem value="technical-2" className="border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <AccordionTrigger className="text-left pr-8 hover:no-underline font-sans text-[15px] sm:text-[16px] text-[#0A0A0A] dark:text-[#F7F6F3] font-medium">
                    Can I customize annotation workflows for my use case?
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] pt-2">
                    Yes, Flexibench is designed to adapt to your specific annotation requirements.
                    You can configure multi-stage review workflows, define custom ontologies and
                    taxonomies with version control, set up task routing rules, and customize
                    annotator interfaces. The platform supports use case-specific configurations
                    rather than one-size-fits-all solutions.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 3 */}
                <AccordionItem value="technical-3" className="border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <AccordionTrigger className="text-left pr-8 hover:no-underline font-sans text-[15px] sm:text-[16px] text-[#0A0A0A] dark:text-[#F7F6F3] font-medium">
                    What is DataBench and how does it relate to Flexibench?
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] pt-2">
                    DataBench is a central workspace within the Flexibench ecosystem for building,
                    refining, and governing enterprise datasets. It provides unified dataset
                    repositories, workflow builders, labelset management, review dashboards, and
                    experiment integration. DataBench includes specialized modules like Phonex for
                    voice annotation.
                  </AccordionContent>
                </AccordionItem>

                {/* FAQ Item 4 */}
                <AccordionItem value="technical-4" className="border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <AccordionTrigger className="text-left pr-8 hover:no-underline font-sans text-[15px] sm:text-[16px] text-[#0A0A0A] dark:text-[#F7F6F3] font-medium">
                    Does Flexibench support on-premise deployment?
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-[14px] sm:text-[15px] text-[#737373] dark:text-[#A3A3A3] pt-2">
                    Flexibench is available as a cloud platform with enterprise-grade security and
                    compliance features. For specific on-premise deployment requirements, please
                    contact our sales team to discuss custom deployment options tailored to your
                    security and compliance needs.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
