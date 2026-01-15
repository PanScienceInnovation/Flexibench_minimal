"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Blogs", color: "from-blue-400 via-cyan-400 to-teal-400" },
  { name: "White Papers", color: "from-purple-400 via-pink-400 to-rose-400" },
  { name: "Announcements", color: "from-indigo-400 via-violet-400 to-purple-400" },
];

export function AnimatedResourceCategories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const currentCategory = categories[currentIndex];

  return (
    <div className="relative inline-block min-h-[70px] sm:min-h-[85px] flex items-center justify-center w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0,
            y: 20,
          }}
          animate={{ 
            opacity: 1,
            y: 0,
          }}
          exit={{ 
            opacity: 0,
            y: -20,
          }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="relative px-2 w-full flex justify-center"
        >
          {/* Static glow effect - no animation */}
          <div 
            className="absolute inset-0 blur-3xl opacity-30 -z-10"
          >
            <div className={`w-full h-full bg-gradient-to-r ${currentCategory.color}`} />
          </div>

          {/* Main text with gradient - no background animation */}
          <span
            className={`relative z-10 bg-gradient-to-r ${currentCategory.color} bg-clip-text text-transparent font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap`}
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {currentCategory.name}
          </span>

          {/* Simple static sparkles - no animation */}
          <div className="hidden sm:block absolute -top-2 -right-2 w-2 h-2 rounded-full bg-white/60" />
          <div className="hidden sm:block absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-white/60" />
          <div className="hidden md:block absolute top-1/2 -right-4 w-1 h-1 rounded-full bg-white/60" />
        </motion.div>
      </AnimatePresence>

      {/* Progress indicators */}
      <div className="absolute -bottom-6 sm:-bottom-7 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 justify-center">
        {categories.map((_, index) => (
          <motion.div
            key={index}
            className="relative h-0.5 sm:h-1 w-6 sm:w-8 bg-white/20 rounded-full overflow-hidden"
          >
            {index === currentIndex && (
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${currentCategory.color} rounded-full`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 3.5, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            )}
            {index < currentIndex && (
              <div className="absolute inset-0 bg-white/40 rounded-full" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
