"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatedResourceCategories } from "@/components/animated-resource-categories";
import { getBlogs, getWhitePapers, type Blog, type WhitePaper } from "@/lib/api/resources";

type ResourceCategory = "Blogs" | "White Papers";

interface UnifiedResource {
  slug: string;
  category: ResourceCategory;
  title: string;
  author?: string;
  source?: string;
  date: string;
  readTime: number;
}

interface HardcodedResource {
  id: string;
  category: ResourceCategory;
  title: string;
  excerpt?: string;
  author?: string;
  date: string;
  readTime: string;
  image: string;
}

const allResourcesHardcoded: HardcodedResource[] = [
  // Blogs
  {
    id: "blog-1",
    category: "Blogs",
    title: "Best Practices for Multimodal Annotation Workflows",
    excerpt: "Learn how to efficiently manage annotation workflows across text, image, video, and audio data types. Discover proven strategies from enterprise teams.",
    author: "Sarah Chen",
    date: "January 12, 2026",
    readTime: "8 min read",
    image: "/use-cases/Media.png",
  },
  {
    id: "blog-2",
    category: "Blogs",
    title: "Annotation Quality Control: A Framework for AI Excellence",
    excerpt: "Explore comprehensive quality control frameworks that ensure your annotation data meets the highest standards for production AI systems.",
    author: "Michael Torres",
    date: "January 8, 2026",
    readTime: "6 min read",
    image: "/use-cases/Media3.png",
  },
  {
    id: "blog-3",
    category: "Blogs",
    title: "Human-in-the-Loop AI: Balancing Automation and Expertise",
    excerpt: "Discover how leading AI teams leverage human expertise alongside automation to create robust, reliable annotation workflows.",
    author: "Priya Sharma",
    date: "January 5, 2026",
    readTime: "10 min read",
    image: "/use-cases/Legal.png",
  },
  {
    id: "blog-4",
    category: "Blogs",
    title: "The Future of Dataset Engineering in Enterprise AI",
    excerpt: "An in-depth look at how dataset engineering is evolving and what it means for enterprise AI initiatives in 2026 and beyond.",
    author: "James Anderson",
    date: "December 28, 2025",
    readTime: "7 min read",
    image: "/use-cases/manufacturing3.png",
  },
  
  // White Papers
  {
    id: "whitepaper-1",
    category: "White Papers",
    title: "Enterprise Quality Frameworks for AI Annotation",
    excerpt: "A comprehensive guide to implementing quality frameworks that scale across enterprise annotation operations while maintaining consistency.",
    author: "FlexiBench Research Team",
    date: "December 15, 2025",
    readTime: "25 min read",
    image: "/use-cases/Legal.png",
  },
  {
    id: "whitepaper-2",
    category: "White Papers",
    title: "Annotation for Safety-Critical AI Systems",
    excerpt: "Deep dive into annotation practices for AI systems in healthcare, autonomous vehicles, and other safety-critical applications.",
    author: "Dr. Emily Roberts",
    date: "November 20, 2025",
    readTime: "30 min read",
    image: "/use-cases/legal2.png",
  },
  {
    id: "whitepaper-3",
    category: "White Papers",
    title: "Scaling Annotation Workflows: From Prototype to Production",
    excerpt: "Learn how to scale your annotation operations from pilot projects to full production deployments across global teams.",
    author: "FlexiBench Research Team",
    date: "October 18, 2025",
    readTime: "22 min read",
    image: "/use-cases/manufacturing3.png",
  },
  
  // Docs & Guides
  {
    id: "docs-1",
    category: "Docs & Guides",
    title: "Getting Started with FlexiBench API",
    excerpt: "Complete guide to integrating FlexiBench into your annotation pipeline using our REST API and SDKs.",
    author: "Technical Documentation Team",
    date: "January 10, 2026",
    readTime: "15 min read",
    image: "/use-cases/Media.png",
  },
  {
    id: "docs-2",
    category: "Docs & Guides",
    title: "Workflow Configuration Best Practices",
    excerpt: "Step-by-step guide to configuring optimal annotation workflows for different data types and use cases.",
    author: "Technical Documentation Team",
    date: "December 22, 2025",
    readTime: "12 min read",
    image: "/use-cases/Legal.png",
  },
  {
    id: "docs-3",
    category: "Docs & Guides",
    title: "API Reference: Complete Documentation",
    excerpt: "Comprehensive API reference covering all endpoints, authentication methods, and integration patterns.",
    author: "Technical Documentation Team",
    date: "December 1, 2025",
    readTime: "20 min read",
    image: "/use-cases/legal2.png",
  },
  
  // Best Practices
  {
    id: "bestpractice-1",
    category: "Best Practices",
    title: "Data Security in Annotation Workflows",
    excerpt: "Essential security practices for protecting sensitive data throughout the annotation lifecycle.",
    author: "Security Team",
    date: "January 6, 2026",
    readTime: "9 min read",
    image: "/use-cases/manufacturing3.png",
  },
  {
    id: "bestpractice-2",
    category: "Best Practices",
    title: "Team Collaboration Strategies for Distributed Annotation",
    excerpt: "Proven strategies for managing distributed annotation teams across time zones and regions.",
    author: "Operations Team",
    date: "December 18, 2025",
    readTime: "11 min read",
    image: "/use-cases/Media3.png",
  },
  {
    id: "bestpractice-3",
    category: "Best Practices",
    title: "Efficient Labeling Techniques for Complex Data",
    excerpt: "Advanced techniques to improve labeling efficiency while maintaining high quality standards.",
    author: "Quality Team",
    date: "November 25, 2025",
    readTime: "8 min read",
    image: "/use-cases/Legal.png",
  },
];

const resourceCategories: ResourceCategory[] = [
  "Blogs",
  "White Papers",
];

// Fallback dates for white papers when createdAt is null
const whitePaperDates: Record<string, string> = {
  "Ontology Governance Strategies": "2024-12-15",
  "Scaling Annotation Workflows": "2024-11-20",
  "Annotation for Safety-Critical AI": "2024-10-18",
  "Enterprise Quality Frameworks": "2024-09-12",
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

export default function ResourcesPage() {
  const [activeTab, setActiveTab] = useState<ResourceCategory>("Blogs");
  const [resources, setResources] = useState<UnifiedResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllResources();
  }, []);

  const fetchAllResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const [blogsRes, whitePapersRes] = await Promise.all([
        getBlogs(),
        getWhitePapers(),
      ]);

      console.log('Blogs response:', blogsRes);
      console.log('White papers response:', whitePapersRes);

      // Check if responses are successful and have data
      const blogs = blogsRes?.success && blogsRes?.data ? blogsRes.data : [];
      const whitePapers = whitePapersRes?.success && whitePapersRes?.data ? whitePapersRes.data : [];

      console.log(`Loaded ${blogs.length} blogs, ${whitePapers.length} white papers`);

      const unifiedResources: UnifiedResource[] = [
        ...blogs.map((blog) => ({
          slug: blog.slug,
          category: "Blogs" as ResourceCategory,
          title: blog.title,
          author: blog.author,
          date: formatDate(blog.date),
          readTime: blog.readTime || 5,
        })),
        ...whitePapers.map((paper) => ({
          slug: paper.slug,
          category: "White Papers" as ResourceCategory,
          title: paper.title,
          source: paper.source,
          date: formatDate(paper.createdAt, whitePaperDates[paper.title]),
          readTime: paper.readTime || 5,
        })),
      ];

      setResources(unifiedResources);
    } catch (err) {
      console.error('Error fetching resources:', err);
      setError('Failed to load resources. Please try again later.');
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredResources = resources.filter((resource) => resource.category === activeTab);

  return (
    <main id="main-content">
      <LpNavbar1 />

      {/* Breadcrumbs */}
      <div className="container-padding-x container mx-auto pt-8 pb-4">
        <div className="font-mono text-[12px] text-[#A3A3A3] [&_a]:text-[#A3A3A3] [&_a:hover]:text-[#0A0A0A] [&_span]:text-[#A3A3A3] [&_svg]:text-[#E3E3E0]">
          <Breadcrumbs items={[{ label: "Resources" }]} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-[#E3E3E0] dark:border-[#2A2A2A] overflow-hidden">
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Section Label */}
            <div className="border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] px-3 py-1 rounded-[3px] font-mono text-[11px] text-[#737373] dark:text-[#A3A3A3] uppercase tracking-widest mb-4 sm:mb-6 inline-block">
              RESOURCES
            </div>

            {/* Headline */}
            <div className="flex flex-col items-center gap-0 mb-8">
              <h1 className="font-display text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] text-[#0A0A0A] dark:text-[#F7F6F3]">
                Explore Our
              </h1>
              <div className="relative inline-block min-h-[70px] flex items-center justify-center">
                <AnimatedResourceCategories />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E3E3E0] dark:border-[#2A2A2A] mt-6 sm:mt-8 mb-6 sm:mb-8 max-w-xs mx-auto w-full" />

            {/* Body Text */}
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] dark:text-[#A3A3A3] leading-[1.7] max-w-2xl mx-auto font-light">
              Comprehensive content curated to accelerate your understanding of
              high-quality annotation workflows, best practices, and real-world
              implementation strategies.
            </p>

            {/* Stats Row */}
            <div className="mt-8 sm:mt-10 flex flex-row justify-center gap-0 border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[4px] bg-white dark:bg-[#141414] inline-flex mx-auto flex-wrap sm:flex-nowrap">
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-r border-[#E3E3E0] dark:border-[#2A2A2A] text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A] dark:text-[#F7F6F3]">12+</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mt-1">Blogs</div>
              </div>
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-r border-[#E3E3E0] dark:border-[#2A2A2A] text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A] dark:text-[#F7F6F3]">8+</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mt-1">White Papers</div>
              </div>
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A] dark:text-[#F7F6F3]">6+</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] dark:text-[#737373] uppercase tracking-widest mt-1">Best Practices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="bg-background border-b py-6 sticky top-[64px] z-40 backdrop-blur-sm bg-background/95">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {resourceCategories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                onClick={() => setActiveTab(category)}
                className={`relative text-base font-semibold px-4 py-2 rounded-full transition-colors duration-300
                  ${activeTab === category
                    ? "text-[oklch(0.68_0.15_50)] bg-[oklch(0.68_0.15_50)]/10 hover:bg-[oklch(0.68_0.15_50)]/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                {category}
                {activeTab === category && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-[oklch(0.68_0.15_50)] rounded-full animate-fade-in-up" />
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="relative bg-gradient-to-b from-background via-secondary/30 to-background py-12 md:py-16">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }} />

        <div className="container-padding-x container mx-auto relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[oklch(0.68_0.15_50)]" />
              <p className="text-muted-foreground text-lg">Loading resources...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-destructive text-lg">{error}</p>
              <Button onClick={fetchAllResources} variant="outline">
                Try Again
              </Button>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-2">No {activeTab.toLowerCase()} found.</p>
              <p className="text-muted-foreground text-base md:text-lg">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredResources.map((resource, index) => {
                const animationDelay = index * 100;

                return (
                  <Card
                    key={`${resource.category}-${resource.slug}`}
                    className="group relative bg-slate-200 dark:bg-background overflow-hidden rounded-lg border border-border/50 hover:border-[oklch(0.68_0.15_50)]/40 shadow-md hover:shadow-lg transition-all duration-[2500ms] ease-out animate-fade-in-up"
                    style={{
                      animationDelay: `${animationDelay}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <CardContent className="flex flex-col gap-2.5 p-4">
                      {/* Metadata */}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{resource.date}</span>
                        </div>
                        <span>• {resource.readTime} min read</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-[oklch(0.68_0.15_50)] transition-colors duration-[2500ms] ease-out">
                        {resource.title}
                      </h3>

                      {/* Author/Source and Read Time */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/30">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {resource.author || resource.source || 'FlexiBench Team'}
                          </span>
                        </div>

                        {/* Read More Link */}
                        <Link 
                          href={`/resources/${resource.category.toLowerCase().replace(/\s+/g, '-')}/${resource.slug}`}
                          className="text-sm font-semibold text-[oklch(0.68_0.15_50)] hover:text-[oklch(0.68_0.15_50)]/80 flex items-center gap-1 group/link transition-colors duration-[2500ms] ease-out"
                        >
                          Read More
                          <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform duration-[2500ms] ease-out" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer1 />
    </main>
  );
}
