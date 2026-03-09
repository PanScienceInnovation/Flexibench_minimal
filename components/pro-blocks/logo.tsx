interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={`flex items-center ${className || ""}`}
      style={{
        height: '28px',
      }}
    >
      <img
        src="/Flexibench-logo-transparent.png"
        alt="FlexiBench Logo"
        className="h-full w-auto object-contain object-left"
        style={{
          maxHeight: '28px',
          height: '28px',
          width: 'auto',
          objectFit: 'contain',
          objectPosition: 'left center',
          display: 'block',
        }}
        decoding="async"
      />
    </div>
  );
};
