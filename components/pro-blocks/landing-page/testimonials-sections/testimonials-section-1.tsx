"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface TestimonialsSection1Props {
  quote?: string;
  authorName?: string;
  authorRole?: string;
  avatarSrc?: string;
  variant?: "rose" | "amber";
}

export default function TestimonialsSection1({
  quote = "Flexibench finally gave us consistent labels we can trust for our models. The quality control workflows alone were a game-changer.",
  authorName = "Head of ML",
  authorRole = "Global Fintech",
  avatarSrc = "/placeholder-user.jpg",
  variant = "rose",
}: TestimonialsSection1Props) {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const gradientClass = variant === "rose" 
    ? "from-rose-50/60 via-pink-50/40 to-fuchsia-50/30"
    : "from-orange-50/55 via-amber-50/35 to-yellow-50/25";
  
  const orbColor = variant === "rose"
    ? "bg-rose-400/15"
    : "bg-orange-400/18";

  return (
    <section
      className="relative bg-white section-padding-y border-b border-[#E3E3E0] overflow-hidden"
      aria-labelledby="testimonial-title"
    >
      {/* Content Container */}
      <div ref={sectionRef} className="container-padding-x container mx-auto relative z-10 flex max-w-3xl flex-col items-center gap-10">
        {/* Quote Icon */}
        <div className={`flex items-center justify-center w-12 h-12 rounded-[3px] bg-[#F0EFE9] border border-[#E3E3E0] transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <svg className="w-6 h-6 text-[#1A1AFF]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>

        {/* Testimonial Quote */}
        <blockquote
          id="testimonial-title"
          className={`text-center text-[28px] font-display leading-relaxed text-[#0A0A0A] transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
          style={{ transitionDelay: '100ms' }}
        >
          &quot;{quote}&quot;
        </blockquote>

        {/* Author Information */}
        <div className={`flex flex-col items-center gap-4 transition-all duration-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '200ms' }}>
          {/* Author Avatar */}
          <Avatar className="h-16 w-16 rounded-full border border-[#E3E3E0]">
            <AvatarImage src={avatarSrc} alt={authorName} />
          </Avatar>

          {/* Author Details */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="font-display text-[16px] text-[#0A0A0A]">
              {authorName}
            </span>
            <span className="font-mono text-[12px] text-[#737373]">{authorRole}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
