"use client";

import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { whyFlexibenchPoints } from "@/lib/flexibench-content";
import { Database, Lightbulb, Award, Settings, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const iconMap: Record<string, typeof Database> = {
  Database,
  Lightbulb,
  Award,
  Settings,
  ArrowRight,
};

export function WhyFlexibenchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  // Keep opacity at 1 always - no fading
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // Split cards into two columns
  const leftColumnCards = [
    whyFlexibenchPoints[0],
    whyFlexibenchPoints[2],
    whyFlexibenchPoints[4],
  ];
  const rightColumnCards = [
    whyFlexibenchPoints[1],
    whyFlexibenchPoints[3],
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-50 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950 section-padding-y border-b overflow-hidden"
      id="why-flexibench"
    >
      {/* Enhanced Ambient Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Animated Gradient Blobs - Optimized with CSS */}
        <div 
          className="absolute top-1/4 right-1/4 w-[900px] h-[900px] bg-gradient-to-br from-blue-600/15 via-indigo-600/12 to-violet-600/8 rounded-full blur-3xl animate-float-slow"
          style={{ willChange: 'transform' }}
        />
        <div 
          className="absolute bottom-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-violet-600/15 via-purple-600/12 to-indigo-600/8 rounded-full blur-3xl animate-float-slow-delayed"
          style={{ willChange: 'transform' }}
        />

        {/* Animated Grid Pattern - Light Theme */}
        <div className="absolute inset-0 opacity-[0.06] dark:hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
        {/* Animated Grid Pattern - Dark Theme */}
        <div className="absolute inset-0 opacity-[0.04] hidden dark:block">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Animated Dots Pattern - Light Theme - Optimized with CSS */}
        <div
          className="absolute inset-0 opacity-[0.07] dark:hidden animate-dots-move"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.4) 1.5px, transparent 0)`,
            backgroundSize: "60px 60px",
            willChange: 'background-position',
          }}
        />
        {/* Animated Dots Pattern - Dark Theme - Optimized with CSS */}
        <div
          className="absolute inset-0 opacity-[0.05] hidden dark:block animate-dots-move"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1.5px, transparent 0)`,
            backgroundSize: "60px 60px",
            willChange: 'background-position',
          }}
        />
      </div>

      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-16 md:gap-20">
        {/* Section Header - Enhanced with Prominent Animation */}
        <motion.div
          style={{ y: headerY }}
          className="mx-auto flex max-w-5xl flex-col items-center text-center gap-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Tagline className="text-slate-600 dark:text-white/90 font-semibold">Why Flexibench</Tagline>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
            transition={{ 
              duration: 1.2, 
              delay: 0.3, 
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-slate-900 dark:text-white"
            style={{
              textShadow: "0 0 60px rgba(59, 130, 246, 0.4), 0 0 100px rgba(99, 102, 241, 0.3), 0 4px 20px rgba(0, 0, 0, 0.3)",
              filter: "brightness(1.1) contrast(1.1)",
              opacity: 1,
            }}
          >
            High-Quality Data Is the{" "}
            <span className="relative inline-block">
              <motion.span
                className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-300 dark:via-indigo-300 dark:to-violet-300 bg-clip-text text-transparent font-black"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 200%",
                  filter: "drop-shadow(0 0 20px rgba(99, 102, 241, 0.5)) brightness(1.1)",
                }}
              >
                Foundation
              </motion.span>
              <motion.svg
                className="absolute -bottom-3 left-0 w-full h-4 text-blue-600/60 dark:text-blue-400/60"
                viewBox="0 0 200 16"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
              >
                <path
                  d="M0 8 Q50 4, 100 8 T200 8"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>{" "}
            of Every Successful AI Model
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-700 dark:text-white text-base md:text-lg leading-relaxed max-w-4xl font-medium"
            style={{
              textShadow: "0 2px 20px rgba(0, 0, 0, 0.2), 0 0 10px rgba(255, 255, 255, 0.05)",
              filter: "brightness(1.05)",
              opacity: 1,
            }}
          >
            Most annotation tools treat labeling as a task. We treat it as data engineering because the
            right labels determine whether a model succeeds, fails, or never gets deployed.
          </motion.p>
        </motion.div>

        {/* Bidirectional Scrolling Cards with Fade Effects */}
        <div className="relative w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto items-start">
            {/* Left Column - Scrolling Down */}
            <div className="relative h-[800px] md:h-[1000px] overflow-hidden w-full">
              {/* Top Fade Mask */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 via-indigo-50/40 to-transparent dark:from-slate-950 dark:via-indigo-950/40 dark:to-transparent z-20 pointer-events-none" />
              {/* Bottom Fade Mask */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-indigo-50/40 to-transparent dark:from-slate-950 dark:via-indigo-950/40 dark:to-transparent z-20 pointer-events-none" />
              <div className="animate-scroll-down flex flex-col gap-6 w-full">
                {[...leftColumnCards, ...leftColumnCards].map((point, index) => (
                  <AnimatedCard
                    key={`left-${index}`}
                    point={point}
                    index={index}
                    gradientColors="from-blue-500/25 via-indigo-500/20 to-violet-500/15"
                    borderColor="border-blue-400/40"
                    glowColor="bg-blue-500/30"
                    iconColor="text-blue-300"
                    borderIconColor="border-blue-400/50"
                    bgIconGradient="from-blue-500/40 to-indigo-500/30"
                  />
                ))}
              </div>
            </div>

            {/* Right Column - Scrolling Up */}
            <div className="relative h-[800px] md:h-[1000px] overflow-hidden w-full">
              {/* Top Fade Mask */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-50 via-indigo-50/40 to-transparent dark:from-slate-950 dark:via-indigo-950/40 dark:to-transparent z-20 pointer-events-none" />
              {/* Bottom Fade Mask */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 via-indigo-50/40 to-transparent dark:from-slate-950 dark:via-indigo-950/40 dark:to-transparent z-20 pointer-events-none" />
              <div className="animate-scroll-up flex flex-col gap-6 w-full">
                {[...rightColumnCards, ...rightColumnCards].map((point, index) => (
                  <AnimatedCard
                    key={`right-${index}`}
                    point={point}
                    index={index}
                    gradientColors="from-indigo-500/25 via-violet-500/20 to-purple-500/15"
                    borderColor="border-indigo-400/40"
                    glowColor="bg-indigo-500/30"
                    iconColor="text-indigo-300"
                    borderIconColor="border-indigo-400/50"
                    bgIconGradient="from-indigo-500/40 to-violet-500/30"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes scroll-down {
          from {
            transform: translateY(calc(-50% - 12px));
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes scroll-up {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(calc(-50% - 12px));
          }
        }

        .animate-scroll-down {
          animation: scroll-down 30s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }

        .animate-scroll-up {
          animation: scroll-up 30s linear infinite;
          will-change: transform;
          transform: translateZ(0);
        }

        .animate-scroll-down:hover,
        .animate-scroll-up:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

// Animated Card Component
interface AnimatedCardProps {
  point: typeof whyFlexibenchPoints[0];
  index: number;
  gradientColors: string;
  borderColor: string;
  glowColor: string;
  iconColor: string;
  borderIconColor: string;
  bgIconGradient: string;
}

function AnimatedCard({
  point,
  gradientColors,
  borderColor,
  glowColor,
  iconColor,
  borderIconColor,
  bgIconGradient,
}: AnimatedCardProps) {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.02,
        y: -8,
        transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <div
        className="relative rounded-3xl p-8 overflow-hidden h-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 shadow-xl dark:shadow-2xl"
        style={{
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 rounded-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700`}
          style={{
            background: `linear-gradient(135deg, ${gradientColors})`,
          }}
        />

        {/* Animated Gradient Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{
            padding: "2px",
            background: `linear-gradient(135deg, ${gradientColors})`,
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-2 ${glowColor} rounded-3xl blur-2xl -z-10`}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-6">
          {/* Title */}
          <h3 className="text-slate-900 dark:text-white text-xl md:text-2xl font-bold leading-tight">
            {point.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
            {point.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
