"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use light theme logo (with stylized X and arrow) for light theme
  // Use dark theme logo (current optimized one) for dark theme
  const logoSrc = mounted && theme === "dark" 
    ? "/flexibench-logo-optimized.svg" 
    : "/flexibench-logo.svg";

  // Apply filter to make logo black in light theme (if logo is white/light)
  // For light theme: make it black using brightness(0) or invert if needed
  // For dark theme: no filter needed (logo should be light/white)
  const logoFilter = mounted && theme === "light" 
    ? "brightness(0)" // Makes logo black
    : "none";

  return (
    <img
      src={logoSrc}
      alt="FlexiBench Logo"
      className={`h-14 w-auto object-contain object-left ${className || ""}`}
      style={{ filter: logoFilter }}
      decoding="async"
    />
  );
};
