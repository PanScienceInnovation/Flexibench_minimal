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
import { getBlogs, getWhitePapers, getAnnouncements, type Blog, type WhitePaper, type Announcement } from "@/lib/api/resources";

type ResourceCategory = "Blogs" | "White Papers" | "Announcements";

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
  
  // Announcements
  {
    id: "announcement-1",
    category: "Announcements",
    title: "FlexiBench 3.0: Next-Generation Annotation Platform",
    excerpt: "Introducing FlexiBench 3.0 with AI-assisted labeling, enhanced collaboration tools, and 10x faster processing.",
    author: "Product Team",
    date: "January 15, 2026",
    readTime: "5 min read",
    image: "/use-cases/Media.png",
  },
  {
    id: "announcement-2",
    category: "Announcements",
    title: "New Integration: AWS SageMaker Ground Truth",
    excerpt: "FlexiBench now integrates seamlessly with AWS SageMaker Ground Truth for enhanced ML workflows.",
    author: "Product Team",
    date: "January 3, 2026",
    readTime: "4 min read",
    image: "/use-cases/manufacturing3.png",
  },
  {
    id: "announcement-3",
    category: "Announcements",
    title: "Enterprise Plan: Advanced Security & Compliance",
    excerpt: "Announcing our new Enterprise Plan with SOC 2 Type II certification, HIPAA compliance, and dedicated support.",
    author: "Product Team",
    date: "December 10, 2025",
    readTime: "6 min read",
    image: "/use-cases/legal2.png",
  },
];

const resourceCategories: ResourceCategory[] = [
  "Blogs",
  "White Papers",
  "Announcements",
];

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
      const [blogsRes, whitePapersRes, announcementsRes] = await Promise.all([
        getBlogs(),
        getWhitePapers(),
        getAnnouncements(),
      ]);

      console.log('Blogs response:', blogsRes);
      console.log('White papers response:', whitePapersRes);
      console.log('Announcements response:', announcementsRes);

      // Check if responses are successful and have data
      const blogs = blogsRes?.success && blogsRes?.data ? blogsRes.data : [];
      const whitePapers = whitePapersRes?.success && whitePapersRes?.data ? whitePapersRes.data : [];
      const announcements = announcementsRes?.success && announcementsRes?.data ? announcementsRes.data : [];

      console.log(`Loaded ${blogs.length} blogs, ${whitePapers.length} white papers, ${announcements.length} announcements`);

      const unifiedResources: UnifiedResource[] = [
        ...blogs.map((blog) => ({
          slug: blog.slug,
          category: "Blogs" as ResourceCategory,
          title: blog.title,
          author: blog.author,
          date: new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: blog.readTime || 5,
        })),
        ...whitePapers.map((paper) => ({
          slug: paper.slug,
          category: "White Papers" as ResourceCategory,
          title: paper.title,
          source: paper.source,
          date: new Date(paper.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: paper.readTime || 5,
        })),
        ...announcements.map((announcement) => ({
          slug: announcement.slug,
          category: "Announcements" as ResourceCategory,
          title: announcement.title,
          date: new Date(announcement.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          readTime: announcement.readTime || 5,
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
        <Breadcrumbs items={[{ label: "Resources" }]} />
      </div>

      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 pt-8 pb-16 sm:pt-10 sm:pb-20 md:pt-12 md:pb-24 border-b overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-cyan-500/8 rounded-full blur-3xl" />

        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 text-white animate-fade-in-up max-w-4xl mx-auto">
            {/* Enhanced Resources Badge */}
            <div className="relative group mb-6 sm:mb-8">
              {/* Glowing background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-teal-400/20 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500" />
              
              {/* Main badge */}
              <div className="relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-teal-500/10 backdrop-blur-sm rounded-full border border-white/20 shadow-lg group-hover:border-white/40 transition-all duration-300">
                <svg 
                  className="h-4 w-4 text-emerald-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
                <span className="text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-emerald-200 via-cyan-200 to-teal-200 bg-clip-text text-transparent">
                  Resources
                </span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>
            
            {/* Title with animated categories */}
            <div className="flex flex-col items-center gap-4 sm:gap-6 w-full mb-8 sm:mb-12 md:mb-16">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
                Explore Our
              </h1>
              <div className="w-full flex justify-center px-4">
                <AnimatedResourceCategories />
              </div>
            </div>

            <p className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed font-medium max-w-3xl px-4 mt-4">
              Comprehensive content curated to accelerate your understanding of high-quality annotation
              workflows, best practices, and real-world implementation strategies.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4 mt-4">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-300 flex-shrink-0" />
                <span className="text-sm md:text-base font-semibold text-white whitespace-nowrap">Expert Insights</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-300 flex-shrink-0" />
                <span className="text-sm md:text-base font-semibold text-white whitespace-nowrap">Best Practices</span>
              </div>
              <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-300 flex-shrink-0" />
                <span className="text-sm md:text-base font-semibold text-white whitespace-nowrap">Technical Guides</span>
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
                    ? "text-primary bg-primary/10 hover:bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
              >
                {category}
                {activeTab === category && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-primary rounded-full animate-fade-in-up" />
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
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                    className="group relative bg-slate-200 dark:bg-background overflow-hidden rounded-lg border border-border/50 hover:border-primary/40 shadow-md hover:shadow-lg transition-all duration-[2500ms] ease-out animate-fade-in-up"
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
                      <h3 className="text-base font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-[2500ms] ease-out">
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
                          className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 group/link transition-colors duration-[2500ms] ease-out"
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
