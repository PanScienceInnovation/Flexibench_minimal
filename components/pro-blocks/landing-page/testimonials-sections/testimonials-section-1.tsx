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
    ? "from-rose-50/60 via-pink-50/40 to-fuchsia-50/30 dark:from-rose-950 dark:via-pink-950 dark:to-fuchsia-950"
    : "from-orange-50/55 via-amber-50/35 to-yellow-50/25 dark:from-orange-950 dark:via-amber-950 dark:to-yellow-950";
  
  const orbColor = variant === "rose"
    ? "bg-rose-400/15"
    : "bg-orange-400/18";

  return (
    <section
      className={`relative container-padding-x section-padding-y flex flex-col items-center border-b overflow-hidden bg-gradient-to-br ${gradientClass}`}
      aria-labelledby="testimonial-title"
    >
      {/* Enhanced Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${orbColor} rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute top-0 right-0 w-64 h-64 ${orbColor} rounded-full blur-2xl animate-pulse`} style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className={`absolute bottom-0 left-0 w-64 h-64 ${orbColor} rounded-full blur-2xl animate-pulse`} style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content Container */}
      <div ref={sectionRef} className="relative z-10 flex max-w-3xl flex-col items-center gap-10">
        {/* Quote Icon */}
        <div className={`flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 transition-all duration-[3000ms] ease-out hover:scale-110 hover:bg-primary/30 ${isVisible ? 'opacity-100 animate-fade-in-scale' : 'opacity-0'}`}>
          <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
          </svg>
        </div>

        {/* Testimonial Quote */}
        <blockquote
          id="testimonial-title"
          className={`text-center text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed text-foreground transition-all duration-[3000ms] ease-out ${isVisible ? 'opacity-100 animate-slide-in-subtle' : 'opacity-0'}`}
          style={{ transitionDelay: '200ms' }}
        >
          &quot;{quote}&quot;
        </blockquote>

        {/* Author Information */}
        <div className={`flex flex-col items-center gap-5 transition-all duration-[3000ms] ease-out ${isVisible ? 'opacity-100 animate-fade-in-scale' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
          {/* Author Avatar */}
          <Avatar className="h-16 w-16 rounded-2xl ring-4 ring-primary/20 shadow-lg md:h-20 md:w-20 hover:scale-110 transition-transform duration-[2500ms] ease-out">
            <AvatarImage src={avatarSrc} alt={authorName} />
          </Avatar>

          {/* Author Details */}
          <div className="flex flex-col items-center gap-2 text-center">
            <span className="text-lg font-bold text-foreground">
              {authorName}
            </span>
            <span className="text-base text-muted-foreground font-medium">{authorRole}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
