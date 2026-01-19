"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, BookmarkPlus, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getAnnouncementBySlug, type Announcement } from "@/lib/api/resources";
import { getResourceImage } from "@/lib/image-utils";

// Fallback dates for announcements when createdAt is null
const announcementDates: Record<string, string> = {
  "Upcoming Webinar: Best Practices for Multimodal Annotation": "2025-01-15",
  "Integration Partnership: Seamless Workflow with Leading ML Platforms": "2025-01-03",
  "Expanding Our Global Annotation Network": "2024-12-20",
  "New Enterprise Features: Advanced Analytics and Reporting": "2024-12-10",
  "FlexiBench 3.0: Next-Generation Annotation Platform": "2024-11-28",
};

// Helper function to format date safely
const formatDate = (dateString: string | null | undefined, fallbackDate?: string): string => {
  if (!dateString && !fallbackDate) {
    return "Invalid Date";
  }
  
  const dateToUse = dateString || fallbackDate || '';
  if (!dateToUse) {
    return "Invalid Date";
  }
  
  const date = new Date(dateToUse);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function AnnouncementDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchAnnouncement();
    }
  }, [slug]);

  const fetchAnnouncement = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAnnouncementBySlug(slug);
      setAnnouncement(response.data);
    } catch (err) {
      console.error('Error fetching announcement:', err);
      setError('Announcement not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main id="main-content">
        <LpNavbar1 />
        <div className="container mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading announcement...</p>
        </div>
        <Footer1 />
      </main>
    );
  }

  if (error || !announcement) {
    return (
      <main id="main-content">
        <LpNavbar1 />
        <div className="container mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Announcement Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || 'The announcement you\'re looking for doesn\'t exist.'}</p>
          <Button asChild>
            <Link href="/resources">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resources
            </Link>
          </Button>
        </div>
        <Footer1 />
      </main>
    );
  }

  return (
    <main id="main-content">
      <LpNavbar1 />

      {/* Breadcrumbs */}
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <Breadcrumbs 
          items={[
            { label: "Resources", href: "/resources" },
            { label: "Announcements" },
            { label: announcement.title }
          ]} 
        />
      </div>

      {/* Article Header */}
      <article className="container mx-auto px-4 sm:px-6 max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/resources" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
        </Button>

        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full">
            Announcement
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {announcement.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(announcement.createdAt, announcementDates[announcement.title])}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{announcement.readTime} min read</span>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <BookmarkPlus className="h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
          <Image
            src={getResourceImage("Announcements", announcement.slug)}
            alt={announcement.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: announcement.body || '' }}
        />

        {/* Call to Action */}
        <div className="mt-16 mb-16 p-8 md:p-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Experience the power of FlexiBench for your annotation workflows. Start your free trial today.
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link href="/contact">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </article>

      <Footer1 />
    </main>
  );
}
