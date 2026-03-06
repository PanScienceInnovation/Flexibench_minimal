"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, Calendar, Sparkles, CheckCircle, Zap } from "lucide-react";
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
    <section className="relative bg-white dark:bg-[#0A0A0A] py-12 md:py-16 lg:py-20 border-b border-[#E3E3E0] dark:border-[#2A2A2A]">
      <div className="container mx-auto flex flex-col gap-8 md:gap-12 lg:flex-row lg:gap-16 px-4 sm:px-6">
        {/* Contact Form */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
            <button
              onClick={() => setFormType("sales")}
              className={`flex-1 h-12 md:h-14 text-[14px] sm:text-[15px] md:text-[16px] font-medium rounded-[4px] border transition-colors ${
                formType === "sales"
                  ? "bg-[#1A1AFF] text-white border-[#1A1AFF] hover:bg-[#0000E6]"
                  : "bg-white dark:bg-[#141414] text-[#0A0A0A] dark:text-[#F7F6F3] border-[#E3E3E0] dark:border-[#2A2A2A] hover:border-[#1A1AFF]"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="truncate">Talk to Sales</span>
              </div>
            </button>
            <button
              onClick={() => setFormType("demo")}
              className={`flex-1 h-12 md:h-14 text-[14px] sm:text-[15px] md:text-[16px] font-medium rounded-[4px] border transition-colors ${
                formType === "demo"
                  ? "bg-[#1A1AFF] text-white border-[#1A1AFF] hover:bg-[#0000E6]"
                  : "bg-white dark:bg-[#141414] text-[#0A0A0A] dark:text-[#F7F6F3] border-[#E3E3E0] dark:border-[#2A2A2A] hover:border-[#1A1AFF]"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Calendar className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                <span className="truncate">Request Demo</span>
              </div>
            </button>
          </div>

          <Card className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-4 sm:p-6 md:p-8 hover:border-[#1A1AFF] transition-colors">
            <CardContent className="flex flex-col gap-6 md:gap-8 p-0">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-[#F7F6F3] dark:bg-[#1A1A1A] flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-[4px] border border-[#E3E3E0] dark:border-[#2A2A2A]">
                  {formType === "sales" ? (
                    <Zap className="text-[#1A1AFF] h-6 w-6 md:h-8 md:w-8" />
                  ) : (
                    <Calendar className="text-[#1A1AFF] h-6 w-6 md:h-8 md:w-8" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[#0A0A0A] dark:text-[#F7F6F3] text-[20px] sm:text-[24px] md:text-[28px] lg:text-[32px] font-display font-bold mb-2 md:mb-3">
                    {formType === "sales" ? "Talk to Sales" : "Request a Demo"}
                  </h2>
                  <p className="text-[#737373] dark:text-[#A3A3A3] text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed">
                    {formType === "sales"
                      ? "Get a tailored demo and learn how Flexibench can fit your annotation needs."
                      : "Choose a time and let us walk you through the platform."}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div className="flex flex-col gap-1.5 md:gap-2">
                    <Label htmlFor="firstName" className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3]">
                      First Name
                    </Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      required 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-11 md:h-14 text-[14px] sm:text-[15px] md:text-[16px] border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[4px] focus:border-[#1A1AFF] focus:ring-0 transition-colors" 
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 md:gap-2">
                    <Label htmlFor="lastName" className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3]">
                      Last Name
                    </Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      required 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-11 md:h-14 text-[14px] sm:text-[15px] md:text-[16px] border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[4px] focus:border-[#1A1AFF] focus:ring-0 transition-colors" 
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <Label htmlFor="email" className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3]">
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11 md:h-14 text-[14px] sm:text-[15px] md:text-[16px] border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[4px] focus:border-[#1A1AFF] focus:ring-0 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <Label htmlFor="phone" className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3]">
                    Phone Number
                  </Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    placeholder="+1 (555) 000-0000" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="h-11 md:h-14 text-[14px] sm:text-[15px] md:text-[16px] border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[4px] focus:border-[#1A1AFF] focus:ring-0 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <Label htmlFor="company" className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3]">
                    Company
                  </Label>
                  <Input 
                    id="company" 
                    placeholder="Your Company Name" 
                    value={formData.company}
                    onChange={handleInputChange}
                    className="h-11 md:h-14 text-[14px] sm:text-[15px] md:text-[16px] border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[4px] focus:border-[#1A1AFF] focus:ring-0 transition-colors" 
                  />
                </div>
                <div className="flex flex-col gap-1.5 md:gap-2">
                  <Label htmlFor="message" className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3]">
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
                    className="resize-none text-[14px] sm:text-[15px] md:text-[16px] border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-[#0A0A0A] dark:text-[#F7F6F3] rounded-[4px] focus:border-[#1A1AFF] focus:ring-0 transition-colors min-h-[100px] md:min-h-[120px]"
                  />
                </div>
                {submitStatus.type && (
                  <div
                    className={`p-3 md:p-4 rounded-[4px] border ${
                      submitStatus.type === "success"
                        ? "bg-[#F0FDF4] dark:bg-[#0A2E1A] border-[#86EFAC] dark:border-[#22C55E] text-[#166534] dark:text-[#86EFAC]"
                        : "bg-[#FEF2F2] dark:bg-[#2E0A0A] border-[#FCA5A5] dark:border-[#EF4444] text-[#991B1B] dark:text-[#FCA5A5]"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {submitStatus.type === "success" ? (
                        <CheckCircle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Mail className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] font-medium flex-1">{submitStatus.message}</p>
                    </div>
                  </div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-12 md:h-14 text-[14px] sm:text-[15px] md:text-[16px] font-medium bg-[#1A1AFF] text-white border border-[#1A1AFF] rounded-[4px] hover:bg-[#0000E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 mt-2"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Submitting...</span>
                  ) : (
                    <>
                      <span className="truncate">{formType === "sales" ? "Contact Sales" : "Schedule Demo"}</span>
                      <ArrowRight className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                    </>
                  )}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Options */}
        <div className="flex flex-col gap-4 md:gap-6 lg:w-96">
          <Card 
            className="bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] p-4 sm:p-6 md:p-8 hover:border-[#1A1AFF] transition-colors"
          >
            <CardContent className="flex flex-col gap-4 md:gap-6 p-0">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-[#F7F6F3] dark:bg-[#1A1A1A] flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-[4px] border border-[#E3E3E0] dark:border-[#2A2A2A]">
                  <Mail className="text-[#1A1AFF] h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[#0A0A0A] dark:text-[#F7F6F3] font-display font-bold text-[18px] sm:text-[20px] md:text-[22px] mb-1">Email Us</h3>
                  <p className="text-[#737373] dark:text-[#A3A3A3] text-[14px] sm:text-[15px] md:text-[16px] truncate">sales@flexibench.com</p>
                </div>
              </div>
              <div className="pt-3 md:pt-4 border-t border-[#E3E3E0] dark:border-[#2A2A2A]">
                <div className="flex items-center gap-2 text-[13px] sm:text-[14px] md:text-[15px] text-[#737373] dark:text-[#A3A3A3]">
                  <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#1A1AFF] flex-shrink-0" />
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

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 lg:py-20 border-b border-[#E3E3E0] dark:border-[#2A2A2A] bg-[#F7F6F3] dark:bg-[#0A0A0A]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 lg:gap-16">
            <div className="flex-1 flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="inline-block border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] mb-2">
                  <span className="font-mono text-[11px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest">Get Started</span>
                </div>
                <h1 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-display leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3] font-bold">
                  Start Building{" "}
                  <span className="text-[#1A1AFF]">Model-Ready Data</span>{" "}
                  Today
                </h1>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7] max-w-2xl font-light">
                  Whether you want a demo, a consultation, or onboarding support, our team is ready to help
                  you succeed with Flexibench.
                </p>
              </div>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 md:gap-3">
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px]">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-[#1A1AFF] flex-shrink-0" />
                  <span className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3] whitespace-nowrap">Expert Consultation</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px]">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-[#1A1AFF] flex-shrink-0" />
                  <span className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3] whitespace-nowrap">Custom Demo</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px]">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-[#1A1AFF] flex-shrink-0" />
                  <span className="text-[13px] sm:text-[14px] md:text-[15px] font-medium text-[#0A0A0A] dark:text-[#F7F6F3] whitespace-nowrap">Fast Onboarding</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full">
              <div className="relative rounded-[4px] overflow-hidden border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414]">
                <AspectRatio ratio={16 / 10}>
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop&q=80"
                    alt="Contact our team for Flexibench consultation and demo"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactFormContent formType={formType} setFormType={setFormType} />
      <Footer1 />
      
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
