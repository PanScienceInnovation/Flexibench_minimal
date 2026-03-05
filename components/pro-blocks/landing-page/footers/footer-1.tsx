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
      const response = await fetch(`/api/flexibench/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 409) {
          setStatus({
            type: "error",
            message: data.message || "This email is already subscribed to our newsletter.",
          });
        } else {
          setStatus({
            type: "error",
            message: data.message || "Failed to subscribe. Please try again.",
          });
        }
        return;
      }

      setStatus({
        type: "success",
        message: data.message || "Successfully subscribed to our newsletter!",
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
      className="relative bg-[#0A0A0A] section-padding-y border-t border-[#2A2A2A] overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-padding-x container mx-auto relative z-10 flex flex-col gap-8 sm:gap-12 lg:gap-16">
        {/* Top Section */}
        <div className="flex w-full flex-col items-center gap-8 sm:gap-12 text-center">
          {/* Logo Section */}
          <Link href="/" aria-label="Go to homepage" className="group">
            <div className="transform transition-colors duration-400">
              <Logo className="invert dark:invert-0 h-12 sm:h-14 w-auto" />
            </div>
          </Link>

          {/* Main Navigation */}
          <nav
            className="flex flex-col items-center gap-4 sm:gap-6 text-base md:flex-row md:gap-6 lg:gap-8 flex-wrap justify-center"
            aria-label="Footer navigation"
          >
            <Link
              href="/"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[13px] sm:text-[14px]"
            >
              Home
            </Link>
            <Link
              href="#why-flexibench"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[14px]"
            >
              Why Flexibench
            </Link>
            <Link
              href="/platform"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[14px]"
            >
              Platform
            </Link>
            <Link
              href="/capabilities"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[14px]"
            >
              Capabilities
            </Link>
            <Link
              href="/internal-tools"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[14px]"
            >
              Internal Tools
            </Link>
            <Link
              href="/use-cases"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[14px]"
            >
              Use Cases
            </Link>
            <Link
              href="#quality-governance"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[14px]"
            >
              Quality & Governance
            </Link>
            <Link
              href="/resources"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[14px]"
            >
              Resources
            </Link>
            <Link
              href="/contact"
              className="text-[#A3A3A3] hover:text-white transition-colors font-sans text-[14px]"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col items-center gap-6 text-center max-w-md mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-5 w-5 text-[#1A1AFF]" />
              <h3 className="text-xl font-display font-bold text-white">Stay Updated</h3>
            </div>
            <p className="text-[#A3A3A3] text-base font-sans">
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
                className="flex-1 h-11 bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder:text-[#737373] focus:border-[#1A1AFF] focus:ring-[#1A1AFF]/20 rounded-[3px]"
                disabled={isSubmitting}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-6 bg-[#1A1AFF] text-white hover:bg-[#1A1AFF]/90 font-mono rounded-[3px] transition-colors duration-400 disabled:opacity-50"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            
            {status.type && (
              <div
                className={`flex items-center gap-2 p-3 rounded-[3px] text-base ${
                  status.type === "success"
                    ? "bg-[#0A0A0A] border border-[#0A0A0A] text-white"
                    : "bg-red-500/10 border border-red-500 text-red-400"
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
        <Separator className="bg-[#2A2A2A]" role="presentation" />

        {/* Bottom Section */}
        <div className="flex w-full flex-col-reverse items-center gap-8 text-base lg:flex-row lg:justify-between lg:gap-6">
          {/* Copyright Text */}
          <p className="text-[#737373] text-center lg:text-left font-mono text-[11px]">
            © {new Date().getFullYear()} Flexibench. All rights reserved.
          </p>

          {/* Legal Navigation */}
          <nav
            className="flex flex-col items-center gap-6 text-base md:flex-row md:gap-8"
            aria-label="Legal links"
          >
            <Link
              href="/privacy"
              className="text-[#737373] hover:text-white transition-colors font-mono text-[11px]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#737373] hover:text-white transition-colors font-mono text-[11px]"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-[#737373] hover:text-white transition-colors font-mono text-[11px]"
            >
              Cookies Settings
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
