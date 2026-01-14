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
  return (
    <section className="relative bg-gradient-to-b from-background via-secondary/30 to-background section-padding-y border-b overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
        backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                          linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
        backgroundSize: '48px 48px'
      }} />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* Contact Form */}
        <div className="flex-1 animate-fade-in-up">
          <div className="flex gap-4 mb-8">
            <Button
              variant={formType === "sales" ? "default" : "outline"}
              onClick={() => setFormType("sales")}
              className={`flex-1 h-14 text-base font-semibold transition-all duration-[2500ms] ease-out ${
                formType === "sales"
                  ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                  : "hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <Zap className="mr-2 h-5 w-5" />
              Talk to Sales
            </Button>
            <Button
              variant={formType === "demo" ? "default" : "outline"}
              onClick={() => setFormType("demo")}
              className={`flex-1 h-14 text-base font-semibold transition-all duration-[2500ms] ease-out ${
                formType === "demo"
                  ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
                  : "hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              <Calendar className="mr-2 h-5 w-5" />
              Request Demo
            </Button>
          </div>

          <Card className="group relative bg-gradient-to-br from-background to-secondary/50 rounded-3xl border-2 border-border/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:border-primary/40 ">
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out rounded-3xl" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -ml-16 -mb-16 opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out" style={{ animationDelay: '0.2s' }} />
            
            <CardContent className="relative flex flex-col gap-8 p-0">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-primary/30 shadow-lg  group-hover:rotate-6 transition-all duration-[2500ms] ease-out">
                  {formType === "sales" ? (
                    <Zap className="text-primary h-8 w-8" />
                  ) : (
                    <Calendar className="text-primary h-8 w-8" />
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-foreground text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {formType === "sales" ? "Talk to Sales" : "Request a Demo"}
                  </h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {formType === "sales"
                      ? "Get a tailored demo and learn how Flexibench can fit your annotation needs."
                      : "Choose a time and let us walk you through the platform."}
                  </p>
                </div>
              </div>

              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <Label htmlFor="firstName" className="text-sm font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      First Name
                    </Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required 
                      className="h-14 text-base border-2 focus:border-primary/50 transition-colors" 
                    />
                  </div>
                  <div className="flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
                    <Label htmlFor="lastName" className="text-sm font-bold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      Last Name
                    </Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      required 
                      className="h-14 text-base border-2 focus:border-primary/50 transition-colors" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <Label htmlFor="email" className="text-sm font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    className="h-14 text-base border-2 focus:border-primary/50 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    placeholder="+1 (555) 000-0000" 
                    className="h-14 text-base border-2 focus:border-primary/50 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <Label htmlFor="company" className="text-sm font-medium flex items-center gap-2">
                    Company
                  </Label>
                  <Input 
                    id="company" 
                    placeholder="Your Company Name" 
                    className="h-14 text-base border-2 focus:border-primary/50 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
                  <Label htmlFor="message" className="text-sm font-medium flex items-center gap-2">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={
                      formType === "sales"
                        ? "Share your specific requirements and how we can help you..."
                        : "Tell us what you'd like to explore in the demo session..."
                    }
                    rows={5}
                    className="resize-none text-base border-2 focus:border-primary/50 transition-colors"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-[2500ms] ease-out hover:-translate-y-0.5 mt-2 animate-fade-in-up"
                  style={{ animationDelay: '0.5s' }}
                >
                  {formType === "sales" ? "Contact Sales" : "Schedule Demo"}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Options */}
        <div className="flex flex-col gap-6 lg:w-96">
          <Card 
            className="group relative bg-gradient-to-br from-background to-secondary/50 rounded-3xl border-2 border-border/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-[2500ms] ease-out hover:border-primary/40 hover:scale-105 hover:-translate-y-2 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/6 to-blue-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out rounded-3xl" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/8 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-[3000ms] ease-out" />
            
            <CardContent className="relative flex flex-col gap-6 p-0">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-500/18 to-blue-500/6 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border-2 border-blue-500/25 shadow-lg  group-hover:rotate-6 transition-all duration-[2500ms] ease-out">
                  <Mail className="text-blue-500 h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-foreground font-bold text-xl mb-1 group-hover:text-blue-500 transition-colors">Email Us</h3>
                  <p className="text-muted-foreground text-sm">sales@flexibench.com</p>
                </div>
              </div>
              <div className="pt-4 border-t border-border/30">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
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
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <Breadcrumbs items={[{ label: "Contact" }]} />
      </div>

      {/* Enhanced Hero Section with Animations */}
      <section className="relative bg-gradient-to-br from-green-900 via-emerald-800 to-teal-800 section-padding-y border-b overflow-hidden" style={{ paddingTop: '80px' }}>
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
        
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col gap-8 text-white animate-fade-in-up">
              <div className="section-title-gap-lg flex flex-col">
                <Tagline variant="white" className="mb-4">Get Started</Tagline>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white">
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
                <p className="text-white/90 text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
                  Whether you want a demo, a consultation, or onboarding support, our team is ready to help
                  you succeed with Flexibench.
                </p>
              </div>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Sparkles className="h-4 w-4 text-green-300" />
                  <span className="text-sm font-semibold text-white">Expert Consultation</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Sparkles className="h-4 w-4 text-green-300" />
                  <span className="text-sm font-semibold text-white">Custom Demo</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Sparkles className="h-4 w-4 text-green-300" />
                  <span className="text-sm font-semibold text-white">Fast Onboarding</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 group">
                {/* Decorative Border Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400/18 via-emerald-400/18 to-teal-400/18 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-[2500ms] ease-out -z-10" />
                
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop&q=80"
                    alt="Contact our team for Flexibench consultation and demo"
                    fill
                    priority
                    className="object-cover  transition-transform duration-[3000ms] ease-out"
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
