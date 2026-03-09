interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={`flex items-center ${className || ""}`}
      style={{
        height: '36px',
        backgroundColor: 'transparent',
      }}
    >
      <img
        src="/Flexibench-logo.png"
        alt="FlexiBench Logo"
        className="h-full w-auto object-contain object-left"
        style={{
          maxHeight: '36px',
          height: '36px',
          width: 'auto',
          objectFit: 'contain',
          objectPosition: 'left center',
          display: 'block',
          backgroundColor: 'transparent',
          mixBlendMode: 'multiply',
          filter: 'contrast(1.3) brightness(0.9) saturate(1.2)',
        }}
        decoding="async"
      />
    </div>
  );
};
