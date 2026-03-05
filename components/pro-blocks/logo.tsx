interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img
      src="/flexibench-logo-optimized.svg"
      alt="FlexiBench Logo"
      className={`h-14 w-auto object-contain object-left ${className || ""}`}
      style={{ filter: 'none' }}
      decoding="async"
    />
  );
};
