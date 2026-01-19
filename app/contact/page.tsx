"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Tagline } from "@/components/pro-blocks/landing-page/tagline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Calendar, Sparkles, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type FormType = "sales" | "demo";

function ContactFormContent({
  formType,
  setFormType,
}: {
  formType: FormType;
  setFormType: (type: FormType) => void;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const payload = {
        type: formType, // "sales" or "demo"
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        message: formData.message || undefined,
      };

      // Remove undefined fields to match server expectations
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined && value !== "")
      );

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5010";
      const response = await fetch(`/api/flexibench/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();

      setSubmitStatus({
        type: "success",
        message: "Thank you! We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Something went wrong. Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-background via-secondary/30 to-background py-12 md:py-16 lg:py-20 border-b overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                          linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: '48px 48px'
      }} />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto relative z-10 flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16 px-4 sm:px-6">
        {/* Contact Form */}
        <div className="flex-1 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <Button
              variant={formType === "sales" ? "default" : "outline"}
              onClick={() => setFormType("sales")}
              className={`flex-1 h-12 md:h-14 text-sm md:text-base font-semibold transition-all duration-[2500ms] ease-out ${
                formType === "sales"
                  ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                  : "hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="truncate">Talk to Sales</span>
            </Button>
            <Button
              variant={formType === "demo" ? "default" : "outline"}
              onClick={() => setFormType("demo")}
              className={`flex-1 h-12 md:h-14 text-sm md:text-base font-semibold transition-all duration-[2500ms] ease-out ${
                formType === "demo"
                  ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                  : "hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <Calendar className="mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
              <span className="truncate">Request Demo</span>
            </Button>
          </div>

          <Card className="group relative bg-gradient-to-br from-background to-secondary/50 rounded-2xl md:rounded-3xl border-2 border-border/50 p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:border-primary/40 ">
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out rounded-2xl md:rounded-3xl" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -ml-16 -mb-16 opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out" style={{ animationDelay: '0.2s' }} />
            
            <CardContent className="relative flex flex-col gap-6 md:gap-8 p-0">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border-2 border-primary/30 shadow-lg  group-hover:rotate-6 transition-all duration-[2500ms] ease-out">
                  {formType === "sales" ? (
                    <Zap className="text-primary h-6 w-6 md:h-8 md:w-8" />
                  ) : (
                    <Calendar className="text-primary h-6 w-6 md:h-8 md:w-8" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-foreground text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-3 group-hover:text-primary transition-colors">
                    {formType === "sales" ? "Talk to Sales" : "Request a Demo"}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {formType === "sales"
                      ? "Get a tailored demo and learn how Flexibench can fit your annotation needs."
                      : "Choose a time and let us walk you through the platform."}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex flex-col gap-1.5 md:gap-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Label htmlFor="firstName" className="text-xs md:text-sm font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      First Name
                    </Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-11 md:h-14 text-sm md:text-base border-2 focus:border-primary/50 transition-colors" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:gap-2 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    <Label htmlFor="lastName" className="text-xs md:text-sm font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      Last Name
                    </Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      required 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-11 md:h-14 text-sm md:text-base border-2 focus:border-primary/50 transition-colors" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <Label htmlFor="email" className="text-xs md:text-sm font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 md:h-14 text-sm md:text-base border-2 focus:border-primary/50 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                  <Label htmlFor="phone" className="text-xs md:text-sm font-medium flex items-center gap-2">
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    placeholder="+1 (555) 000-0000" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 md:h-14 text-sm md:text-base border-2 focus:border-primary/50 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <Label htmlFor="company" className="text-xs md:text-sm font-medium flex items-center gap-2">
                    Company
                  </Label>
                  <Input 
                    id="company" 
                    placeholder="Your Company Name" 
                    value={formData.company}
                    onChange={handleInputChange}
                    className="h-11 md:h-14 text-sm md:text-base border-2 focus:border-primary/50 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                  <Label htmlFor="message" className="text-xs md:text-sm font-medium flex items-center gap-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={
                      formType === "sales"
                        ? "Share your specific requirements and how we can help you..."
                        : "Tell us what you'd like to explore in the demo session..."
                    }
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="resize-none text-sm md:text-base border-2 focus:border-primary/50 transition-colors min-h-[100px] md:min-h-[120px]"
                  />
                </div>
                {submitStatus.type && (
                  <div
                    className={`p-3 md:p-4 rounded-lg border-2 ${
                      submitStatus.type === "success"
                        ? "bg-green-50 dark:bg-green-950/20 border-green-500/50 text-green-700 dark:text-green-400"
                        : "bg-red-50 dark:bg-red-950/20 border-red-500/50 text-red-700 dark:text-red-400"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Mail className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-xs md:text-sm font-medium flex-1">{submitStatus.message}</p>
                    </div>
                  </div>
                )}
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="h-12 md:h-14 text-sm md:text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-[2500ms] ease-out hover:-translate-y-0.5 mt-2 animate-fade-in-up disabled:opacity-50 disabled:cursor-not-allowed w-full"
                  style={{ animationDelay: '0.5s' }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-pulse">Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span className="truncate">{formType === "sales" ? "Contact Sales" : "Schedule Demo"}</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Options */}
        <div className="flex flex-col gap-4 md:gap-6 lg:w-96">
          <Card 
            className="group relative bg-gradient-to-br from-background to-secondary/50 rounded-2xl md:rounded-3xl border-2 border-border/50 p-4 sm:p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:border-primary/40 lg:hover:scale-105 lg:hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/6 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out rounded-2xl md:rounded-3xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/8 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out" />
            
            <CardContent className="relative flex flex-col gap-4 md:gap-6 p-0">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-blue-500/18 to-blue-500/6 flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border-2 border-blue-500/25 shadow-lg  group-hover:rotate-6 transition-all duration-[2500ms] ease-out">
                  <Mail className="text-blue-500 h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground font-bold text-lg md:text-xl mb-1 group-hover:text-blue-500 transition-colors">Email Us</h3>
                  <p className="text-muted-foreground text-xs md:text-sm truncate">sales@flexibench.com</p>
                </div>
              </div>
              <div className="pt-3 md:pt-4 border-t border-border/30">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-blue-500 flex-shrink-0" />
                  <span>Response within 24 hours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ContactPageContent() {
  const searchParams = useSearchParams();
  const initialFormType: FormType = searchParams?.get("type") === "sales" ? "sales" : "demo";
  const [formType, setFormType] = useState(initialFormType);

  return (
    <>
      <LpNavbar1 />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto pt-6 md:pt-8 pb-3 md:pb-4 px-4 sm:px-6">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      {/* Enhanced Hero Section with Animations */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-800 py-12 md:py-16 lg:py-20 border-b overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-500/10 via-transparent to-teal-500/10 rounded-full blur-3xl" />
        
        {/* Animated Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/10 to-transparent" />
          <div className="absolute top-2/4 right-0 w-px h-full bg-gradient-to-b from-transparent via-teal-400/10 to-transparent" />
        </div>
        
        <div className="container mx-auto relative z-10 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col gap-6 md:gap-8 text-white animate-fade-in-up">
              <div className="flex flex-col gap-4 md:gap-6">
                <Tagline variant="white" className="mb-0">Get Started</Tagline>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
                  Start Building{" "}
                  <span className="relative inline-block">
                    Model-Ready Data
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/50" viewBox="0 0 300 12" fill="none">
                      <path d="M2 8 Q75 4, 150 8 T298 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </span>{" "}
                  <span className="bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 bg-clip-text text-transparent">
                    Today
                  </span>
                </h1>
                <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
                  Whether you want a demo, a consultation, or onboarding support, our team is ready to help
                  you succeed with Flexibench.
                </p>
              </div>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-green-300 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">Expert Consultation</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-green-300 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">Custom Demo</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-green-300 flex-shrink-0" />
                  <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">Fast Onboarding</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 group">
                {/* Decorative Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/18 via-emerald-400/18 to-teal-400/18 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out -z-10" />
                
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop&q=80"
                    alt="Contact our team for Flexibench consultation and demo"
                    fill
                    priority
                    className="object-cover transition-transform duration-[3000ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-950/85 via-green-950/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-green-500/12 via-transparent to-teal-500/12" />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFormContent formType={formType} setFormType={setFormType} />
      <Footer1 />
      
      {/* Enhanced Animation Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </>
  );
}

export default function ContactPage() {
  return (
    <main id="main-content">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }>
        <ContactPageContent />
      </Suspense>
    </main>
  );
}
