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

  return (
    <img
      src={logoSrc}
      alt="FlexiBench Logo"
      className={`h-14 w-auto object-contain object-left ${className || ""}`}
      style={{ filter: 'none' }}
      decoding="async"
    />
  );
};
