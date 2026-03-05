"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { name: "Blogs" },
  { name: "White Papers" },
];

export function AnimatedResourceCategories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentCategory = categories[currentIndex];

  return (
    <div className="relative inline-block min-h-[70px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="font-display text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] text-[#1A1AFF] whitespace-nowrap"
        >
          {currentCategory.name}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
