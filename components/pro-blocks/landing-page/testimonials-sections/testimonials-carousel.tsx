"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { testimonials } from "@/lib/flexibench-content";

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Calculate how many cards to show based on screen size
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1); // Mobile: 1 card
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2); // Tablet: 2 cards
      } else {
        setCardsToShow(3); // Desktop: 3 cards
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, testimonials.length - cardsToShow);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, cardsToShow]);

  const goToNext = () => {
    setIsAutoPlaying(false);
    const maxIndex = Math.max(0, testimonials.length - cardsToShow);
    setCurrentIndex((prev) => prev >= maxIndex ? 0 : prev + 1);
  };

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    const maxIndex = Math.max(0, testimonials.length - cardsToShow);
    setCurrentIndex((prev) => prev <= 0 ? maxIndex : prev - 1);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  return (
    <section
      className="relative container-padding-x section-padding-y flex flex-col items-center border-b overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background"
      aria-labelledby="testimonials-title"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-7xl">
        {/* Section Title */}
        <div className="text-center mb-4">
          <h2 id="testimonials-title" className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Trusted by leading AI teams worldwide
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-20 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-background hover:border-primary/50 shadow-lg transition-all duration-300"
            onClick={goToPrevious}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-20 h-10 w-10 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 hover:bg-background hover:border-primary/50 shadow-lg transition-all duration-300"
            onClick={goToNext}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Testimonial Cards Container */}
          <div className="relative overflow-hidden px-8 md:px-12">
            <div
              className="flex gap-4 md:gap-6"
              style={{
                transform: `translate3d(-${currentIndex * (100 / cardsToShow)}%, 0, 0)`,
                transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                perspective: '1000px',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{
                    width: `${100 / cardsToShow}%`,
                    minWidth: 0,
                  }}
                >
                  <Card className="h-full bg-background/80 backdrop-blur-sm border-border/50 hover:border-primary/50 shadow-md hover:shadow-lg transition-all duration-300 group will-change-auto">
                    <CardContent className="p-6 flex flex-col gap-4 h-full">
                      {/* Quote Icon */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                          </svg>
                        </div>
                      </div>

                      {/* Testimonial Quote */}
                      <blockquote className="text-sm md:text-base font-medium leading-relaxed text-foreground flex-1">
                        &quot;{testimonial.quote}&quot;
                      </blockquote>

                      {/* Author Information */}
                      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                        {/* Author Avatar */}
                        <Avatar className="h-10 w-10 rounded-lg ring-2 ring-primary/20 flex-shrink-0">
                          <AvatarImage src={testimonial.avatarSrc} alt={testimonial.authorName} />
                        </Avatar>

                        {/* Author Details */}
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-sm font-semibold text-foreground truncate">
                            {testimonial.authorName}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {testimonial.authorRole}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
