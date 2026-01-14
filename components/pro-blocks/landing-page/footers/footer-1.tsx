"use client";

import { Logo } from "@/components/pro-blocks/logo";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";

export function Footer1() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5010";
      const response = await fetch(`${apiUrl}/api/flexibench/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to subscribe");
      }

      setStatus({
        type: "success",
        message: "Successfully subscribed to our newsletter!",
      });
      setEmail("");
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to subscribe. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 section-padding-y border-t border-slate-800 overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-12 lg:gap-16">
        {/* Top Section */}
        <div className="flex w-full flex-col items-center gap-12 text-center">
          {/* Logo Section */}
          <Link href="/" aria-label="Go to homepage" className="group">
            <div className="transform group-hover:scale-105 transition-transform duration-[2500ms] ease-out">
              <Logo width={160} height={40} className="[&_span]:text-white" />
            </div>
          </Link>

          {/* Main Navigation */}
          <nav
            className="flex flex-col items-center gap-6 text-sm md:flex-row md:gap-8"
            aria-label="Footer navigation"
          >
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="#why-flexibench"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Why Flexibench
            </Link>
            <Link
              href="/platform"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Platform
            </Link>
            <Link
              href="/capabilities"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Capabilities
            </Link>
            <Link
              href="/internal-tools"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Internal Tools
            </Link>
            <Link
              href="/use-cases"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Use Cases
            </Link>
            <Link
              href="#quality-governance"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Quality & Governance
            </Link>
            <Link
              href="/resources"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col items-center gap-6 text-center max-w-md mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-white">Stay Updated</h3>
            </div>
            <p className="text-slate-400 text-sm">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
          </div>
          
          <form onSubmit={handleNewsletterSubmit} className="w-full flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-11 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-primary/50 focus:ring-primary/20"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-[2500ms] ease-out disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            
            {status.type && (
              <div
                className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                  status.type === "success"
                    ? "bg-green-950/30 border border-green-500/30 text-green-400"
                    : "bg-red-950/30 border border-red-500/30 text-red-400"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                )}
                <span>{status.message}</span>
              </div>
            )}
          </form>
        </div>

        {/* Section Divider */}
        <Separator className="bg-slate-800" role="presentation" />

        {/* Bottom Section */}
        <div className="flex w-full flex-col-reverse items-center gap-8 text-sm lg:flex-row lg:justify-between lg:gap-6">
          {/* Copyright Text */}
          <p className="text-slate-400 text-center lg:text-left">
            © {new Date().getFullYear()} Flexibench. All rights reserved.
          </p>

          {/* Legal Navigation */}
          <nav
            className="flex flex-col items-center gap-6 text-sm md:flex-row md:gap-8"
            aria-label="Legal links"
          >
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cookies Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
