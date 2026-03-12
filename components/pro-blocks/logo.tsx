"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      src="/Flexibench-logo-transparent.png"
      alt="FlexiBench Logo"
      className={cn(
        "h-8 w-auto object-contain object-left",
        className
      )}
      decoding="async"
      loading="eager"
      width={120}
      height={32}
    />
  );
};
