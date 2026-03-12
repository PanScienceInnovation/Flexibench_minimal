"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Calendar, User, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatedResourceCategories } from "@/components/animated-resource-categories";
import { getBlogs, getWhitePapers, getFlexibenchCmsBlogs, getFlexibenchCmsWhitePapers, convertCmsBlogToBlog, convertCmsWhitePaperToWhitePaper, type Blog, type WhitePaper } from "@/lib/api/resources";

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
      // Use Promise.allSettled to handle failures gracefully
      const [blogsRes, whitePapersRes, cmsBlogsRes, cmsWhitePapersRes] = await Promise.allSettled([
        getBlogs(),
        getWhitePapers(),
        getFlexibenchCmsBlogs({ includeAssetUrls: true }),
        getFlexibenchCmsWhitePapers({ includeAssetUrls: true }),
      ]);

      // Extract successful results
      const blogs = blogsRes.status === 'fulfilled' && blogsRes.value?.success && blogsRes.value?.data 
        ? blogsRes.value.data 
        : [];
      const whitePapers = whitePapersRes.status === 'fulfilled' && whitePapersRes.value?.success && whitePapersRes.value?.data 
        ? whitePapersRes.value.data 
        : [];
      const cmsBlogs = cmsBlogsRes.status === 'fulfilled' && cmsBlogsRes.value?.success && cmsBlogsRes.value?.data 
        ? cmsBlogsRes.value.data 
        : [];
      const cmsWhitePapers = cmsWhitePapersRes.status === 'fulfilled' && cmsWhitePapersRes.value?.success && cmsWhitePapersRes.value?.data 
        ? cmsWhitePapersRes.value.data 
        : [];

      console.log('Blogs response:', blogsRes);
      console.log('White papers response:', whitePapersRes);
      console.log('CMS blogs response:', cmsBlogsRes);
      console.log('CMS white papers response:', cmsWhitePapersRes);
      console.log(`Loaded ${blogs.length} blogs, ${whitePapers.length} white papers, ${cmsBlogs.length} CMS blogs, ${cmsWhitePapers.length} CMS white papers`);

      // Convert CMS blogs to internal Blog format
      const convertedCmsBlogs = cmsBlogs.map(convertCmsBlogToBlog);
      // Convert CMS white papers to internal WhitePaper format
      const convertedCmsWhitePapers = cmsWhitePapers.map(convertCmsWhitePaperToWhitePaper);

      const unifiedResources: UnifiedResource[] = [
        ...blogs.map((blog) => ({
          slug: typeof blog.slug === 'string' ? blog.slug : String(blog.slug || ''),
          category: "Blogs" as ResourceCategory,
          title: blog.title,
          author: blog.author,
          date: formatDate(blog.date),
          readTime: blog.readTime || 5,
        })),
        ...convertedCmsBlogs.map((blog) => {
          // Use the CMS slug directly - it's the full title: "Beyond the Algorithm: How Data Annotation Engineering Drives Real AI Results"
          // The slug will be URL-encoded when used in the link, so spaces and special chars are fine
          let slug = typeof blog.slug === 'string' ? blog.slug : String(blog.slug || '');
          
          // Final safety check - strip any HTML that might have slipped through
          if (slug && (slug.includes('<') || slug.includes('>'))) {
            console.warn('Slug contains HTML, stripping:', slug);
            slug = slug.replace(/<[^>]*>/g, '').trim();
          }
          
          // Validate slug - CMS slug should be the full title, so it might have spaces and special chars
          if (!slug || slug === '[object Object]' || slug === 'object-object' || slug.length === 0) {
            console.error('Invalid slug after conversion:', {
              title: blog.title,
              slug: blog.slug,
              slugType: typeof blog.slug,
              blogId: blog.id
            });
            // Use title as fallback slug (CMS slug might be the title)
            slug = (blog.title || '').replace(/<[^>]*>/g, '').trim() || 'unknown';
            console.log('Using title as slug:', slug);
          }
          
          console.log('Final slug for blog (will be URL-encoded in link):', {
            title: blog.title,
            slug: slug,
            id: blog.id
          });
          
          return {
            slug: slug, // This is the CMS slug (full title), will be URL-encoded in the link
            category: "Blogs" as ResourceCategory,
            title: blog.title,
            author: blog.author,
            date: formatDate(blog.date),
            readTime: blog.readTime || 5,
          };
        }),
        ...whitePapers.map((paper) => ({
          slug: paper.slug,
          category: "White Papers" as ResourceCategory,
          title: paper.title,
          source: paper.source,
          date: formatDate(paper.createdAt, whitePaperDates[paper.title]),
          readTime: paper.readTime || 5,
        })),
        ...convertedCmsWhitePapers.map((paper) => {
          // Use the CMS slug directly - it's the full title
          let slug = typeof paper.slug === 'string' ? paper.slug : String(paper.slug || '');
          
          // Final safety check - strip any HTML that might have slipped through
          if (slug && (slug.includes('<') || slug.includes('>'))) {
            console.warn('White paper slug contains HTML, stripping:', slug);
            slug = slug.replace(/<[^>]*>/g, '').trim();
          }
          
          // Validate slug
          if (!slug || slug === '[object Object]' || slug === 'object-object' || slug.length === 0) {
            console.error('Invalid white paper slug after conversion:', {
              title: paper.title,
              slug: paper.slug,
              slugType: typeof paper.slug,
              paperId: paper.id
            });
            slug = (paper.title || '').replace(/<[^>]*>/g, '').trim() || 'unknown';
          }
          
          return {
            slug: slug, // This is the CMS slug (full title), will be URL-encoded in the link
            category: "White Papers" as ResourceCategory,
            title: paper.title,
            source: paper.source,
            date: formatDate(paper.createdAt),
            readTime: paper.readTime || 5,
          };
        }),
      ];

      // Only show error if ALL sources failed
      if (unifiedResources.length === 0) {
        setError('No resources available. Please check your connection and try again.');
      }

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

  // Debug: Log current state
  if (typeof window !== 'undefined') {
    console.log('ResourcesPage render:', { loading, error, resourcesCount: resources.length, filteredCount: filteredResources.length });
  }

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
      <section className="relative bg-[#F7F6F3] pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-[#E3E3E0] overflow-hidden">
        <div className="container-padding-x container mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Section Label */}
            <div className="border border-[#E3E3E0] bg-white px-3 py-1 rounded-[3px] font-mono text-[11px] text-[#737373] uppercase tracking-widest mb-4 sm:mb-6 inline-block">
              RESOURCES
            </div>

            {/* Headline */}
            <div className="flex flex-col items-center gap-0 mb-8">
              <h1 className="font-display text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] leading-[1.1] text-[#0A0A0A]">
                Explore Our
              </h1>
              <div className="relative inline-block min-h-[70px] flex items-center justify-center">
                <AnimatedResourceCategories />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E3E3E0] mt-6 sm:mt-8 mb-6 sm:mb-8 max-w-xs mx-auto w-full" />

            {/* Body Text */}
            <p className="font-sans text-[15px] sm:text-[16px] md:text-[17px] text-[#737373] leading-[1.7] max-w-2xl mx-auto font-light">
              Comprehensive content curated to accelerate your understanding of
              high-quality annotation workflows, best practices, and real-world
              implementation strategies.
            </p>

            {/* Stats Row */}
            <div className="mt-8 sm:mt-10 flex flex-row justify-center gap-0 border border-[#E3E3E0] rounded-[4px] bg-white inline-flex mx-auto flex-wrap sm:flex-nowrap">
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-r border-[#E3E3E0] text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A]">12+</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] uppercase tracking-widest mt-1">Blogs</div>
              </div>
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-r border-[#E3E3E0] text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A]">8+</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] uppercase tracking-widest mt-1">White Papers</div>
              </div>
              <div className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-center">
                <div className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-[#0A0A0A]">6+</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#A3A3A3] uppercase tracking-widest mt-1">Best Practices</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="bg-[#F7F6F3] dark:bg-[#0A0A0A] border-b border-[#E3E3E0] dark:border-[#2A2A2A] py-6 sticky top-[64px] z-40">
        <div className="container-padding-x container mx-auto">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {resourceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] rounded-[3px] font-mono text-[11px] uppercase tracking-widest transition-colors duration-200
                  ${activeTab === category
                    ? "text-[#0A0A0A] dark:text-[#F7F6F3] border-[#0A0A0A] dark:border-[#F7F6F3]"
                    : "text-[#737373] dark:text-[#A3A3A3] hover:text-[#0A0A0A] dark:hover:text-[#F7F6F3] hover:border-[#0A0A0A] dark:hover:border-[#F7F6F3]"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="relative bg-[#F7F6F3] dark:bg-[#0A0A0A] py-12 md:py-16">
        <div className="container-padding-x container mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#0A0A0A] dark:text-[#F7F6F3]" />
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#737373] dark:text-[#A3A3A3]">Loading resources...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-[#0A0A0A] dark:text-[#F7F6F3] text-lg mb-4">{error}</p>
              <button
                onClick={fetchAllResources}
                className="px-4 py-2 border border-[#E3E3E0] dark:border-[#2A2A2A] bg-white dark:bg-[#141414] rounded-[3px] font-mono text-[11px] uppercase tracking-widest text-[#0A0A0A] dark:text-[#F7F6F3] hover:border-[#0A0A0A] dark:hover:border-[#F7F6F3] transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#0A0A0A] dark:text-[#F7F6F3] text-lg mb-2">No {activeTab.toLowerCase()} found.</p>
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#737373] dark:text-[#A3A3A3]">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredResources.map((resource, index) => {
                return (
                  <div
                    key={`${resource.category}-${resource.slug}`}
                    className="group relative bg-white dark:bg-[#141414] border border-[#E3E3E0] dark:border-[#2A2A2A] rounded-[3px] overflow-hidden hover:border-[#0A0A0A] dark:hover:border-[#F7F6F3] transition-colors duration-200"
                  >
                    <div className="flex flex-col gap-3 p-5">
                      {/* Metadata */}
                      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#737373] dark:text-[#A3A3A3]">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          <span>{resource.date}</span>
                        </div>
                        <span>•</span>
                        <span>{resource.readTime} min read</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-[18px] leading-[1.2] text-[#0A0A0A] dark:text-[#F7F6F3] line-clamp-2 group-hover:text-[#1A1AFF] dark:group-hover:text-[#1A1AFF] transition-colors duration-200">
                        {typeof resource.title === 'string' && resource.title.includes('<') 
                          ? resource.title.replace(/<[^>]*>/g, '').trim()
                          : resource.title}
                      </h3>

                      {/* Author/Source and Read More */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#E3E3E0] dark:border-[#2A2A2A]">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3 w-3 text-[#737373] dark:text-[#A3A3A3]" />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#737373] dark:text-[#A3A3A3]">
                            {resource.author || resource.source || 'FlexiBench Team'}
                          </span>
                        </div>

                        {/* Read More Link */}
                        <Link 
                          href={`/resources/${resource.category.toLowerCase().replace(/\s+/g, '-')}/${encodeURIComponent(resource.slug)}`}
                          className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A] dark:text-[#F7F6F3] hover:text-[#1A1AFF] dark:hover:text-[#1A1AFF] flex items-center gap-1.5 group/link transition-colors duration-200"
                        >
                          Read More
                          <ArrowRight className="h-3 w-3 group-hover/link:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>
                  </div>
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
