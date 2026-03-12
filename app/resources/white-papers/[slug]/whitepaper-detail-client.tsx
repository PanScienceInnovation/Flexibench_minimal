"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft, ArrowRight, Share2, BookmarkPlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getWhitePaperBySlug, getCmsWhitePaperBySlug, getFlexibenchCmsWhitePapers, convertCmsWhitePaperToWhitePaper, type WhitePaper } from "@/lib/api/resources";
import { Calendar } from "lucide-react";

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

export default function WhitePaperDetailClient() {
  const params = useParams();
  // Ensure slug is a string, not an object
  let slug = typeof params?.slug === 'string' ? params.slug : String(params?.slug || '');
  
  // Decode URL-encoded slug (in case it was encoded in the URL)
  if (slug && typeof window !== 'undefined') {
    try {
      slug = decodeURIComponent(slug);
    } catch (e) {
      console.warn('Failed to decode slug:', slug, e);
    }
  }
  
  // Fix common slug issues
  if (slug === 'object-object' || slug === '[object Object]' || !slug) {
    console.error('Invalid slug detected:', params?.slug);
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      const slugIndex = pathParts.indexOf('white-papers');
      if (slugIndex >= 0 && pathParts[slugIndex + 1]) {
        slug = decodeURIComponent(pathParts[slugIndex + 1]);
        console.log('Extracted slug from URL:', slug);
      }
    }
  }
  
  console.log('WhitePaperDetailClient - slug:', slug, 'params:', params);
  const [whitepaper, setWhitepaper] = useState<WhitePaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchWhitePaper();
    }
  }, [slug]);

  const fetchWhitePaper = async () => {
    setLoading(true);
    setError(null);
    try {
      // Decode the slug from URL (CMS slug is the full title, URL-encoded)
      let decodedSlug = slug;
      try {
        decodedSlug = decodeURIComponent(slug);
        if (decodedSlug !== slug) {
          console.log('Decoded slug from URL:', slug, '->', decodedSlug);
        }
      } catch (e) {
        console.log('Slug does not need decoding:', slug);
      }
      
      // Check if this is an old slug format
      const isOldSlug = slug.includes('h2-class') || slug.includes('cms-richtext') || slug.includes('cms-heading');
      
      // If it's an old slug, fetch all white papers and find the correct one
      if (isOldSlug) {
        console.log('Detected old slug format, fetching all white papers to find correct slug:', slug);
        const allCmsWhitePapers = await getFlexibenchCmsWhitePapers({ includeAssetUrls: true });
        if (allCmsWhitePapers.success && allCmsWhitePapers.data && allCmsWhitePapers.data.length > 0) {
          const foundPaper = allCmsWhitePapers.data[0];
          const convertedPaper = convertCmsWhitePaperToWhitePaper(foundPaper);
          
          // Redirect to correct URL
          const correctSlug = encodeURIComponent(convertedPaper.slug);
          if (typeof window !== 'undefined' && window.location.pathname !== `/resources/white-papers/${correctSlug}`) {
            console.log('Redirecting from old slug to correct slug:', slug, '->', convertedPaper.slug);
            window.history.replaceState(null, '', `/resources/white-papers/${correctSlug}`);
            setWhitepaper(convertedPaper);
            return;
          }
          setWhitepaper(convertedPaper);
          return;
        }
      }
      
      // First try internal API
      const internalResponse = await getWhitePaperBySlug(decodedSlug);
      if (internalResponse.success && internalResponse.data) {
        setWhitepaper(internalResponse.data);
        return;
      }
      
      console.log('Internal API did not find white paper, trying CMS...');

      // If not found in internal API, try CMS with decoded slug
      const cmsResponse = await getCmsWhitePaperBySlug(decodedSlug);
      if (cmsResponse.success && cmsResponse.data) {
        const convertedPaper = convertCmsWhitePaperToWhitePaper(cmsResponse.data);
        console.log('CMS white paper fetched:', {
          title: convertedPaper.title,
          slug: convertedPaper.slug,
          bodyLength: convertedPaper.body?.length,
        });
        setWhitepaper(convertedPaper);
        return;
      }

      // If still not found, try fetching all CMS white papers and finding by slug
      console.log('Fetching all CMS white papers to find by slug:', decodedSlug);
      const allCmsWhitePapers = await getFlexibenchCmsWhitePapers({ includeAssetUrls: true });
      if (allCmsWhitePapers.success && allCmsWhitePapers.data) {
        let foundPaper = allCmsWhitePapers.data.find((item) => {
          const itemSlug = item.slug || '';
          if (itemSlug === decodedSlug || itemSlug === slug) return true;
          if (itemSlug.toLowerCase() === decodedSlug.toLowerCase() || itemSlug.toLowerCase() === slug.toLowerCase()) return true;
          return false;
        });
        
        if (!foundPaper) {
          foundPaper = allCmsWhitePapers.data.find((item) => {
            const itemTitle = (item.title || '').replace(/<[^>]*>/g, '').trim();
            return itemTitle === decodedSlug || itemTitle === slug || 
                   itemTitle.toLowerCase() === decodedSlug.toLowerCase() || 
                   itemTitle.toLowerCase() === slug.toLowerCase();
          });
        }
        
        if (foundPaper) {
          const convertedPaper = convertCmsWhitePaperToWhitePaper(foundPaper);
          console.log('CMS white paper found in list:', {
            title: convertedPaper.title,
            slug: convertedPaper.slug,
            requestedSlug: slug,
          });
          setWhitepaper(convertedPaper);
          return;
        }
      }

      setError(`White paper not found. Requested slug: "${slug}"`);
    } catch (err) {
      console.error('Error fetching white paper:', err);
      setError('Failed to load white paper. Please try again later.');
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
          <p className="text-muted-foreground">Loading white paper...</p>
        </div>
        <Footer1 />
      </main>
    );
  }

  if (error || !whitepaper) {
    return (
      <main id="main-content">
        <LpNavbar1 />
        <div className="container mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">White Paper Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || 'The white paper you\'re looking for doesn\'t exist.'}</p>
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
            { label: "White Papers" },
            { label: whitepaper.title }
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
            White Paper
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {whitepaper.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <span className="font-medium">{whitepaper.source}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(whitepaper.createdAt, whitePaperDates[whitepaper.title])}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{whitepaper.readTime} min read</span>
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

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12 whitepaper-content"
          dangerouslySetInnerHTML={{ __html: whitepaper.body || '' }}
        />
        <style jsx global>{`
          .whitepaper-content {
            line-height: 1.8;
          }
          .whitepaper-content p {
            margin-bottom: 1.5rem;
            font-size: 1.125rem;
            line-height: 1.8;
          }
          .whitepaper-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            color: inherit;
          }
          .whitepaper-content h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            line-height: 1.3;
            color: inherit;
          }
          .whitepaper-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.4;
            color: inherit;
          }
          .whitepaper-content h4 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            line-height: 1.4;
            color: inherit;
          }
          .whitepaper-content ul,
          .whitepaper-content ol {
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          .whitepaper-content li {
            margin-bottom: 0.75rem;
            line-height: 1.8;
          }
          .whitepaper-content strong {
            font-weight: 700;
          }
          .whitepaper-content em {
            font-style: italic;
          }
          .whitepaper-content a {
            color: oklch(0.68 0.15 50);
            text-decoration: underline;
          }
          .whitepaper-content a:hover {
            color: oklch(0.68 0.15 50 / 0.8);
          }
          .whitepaper-content img {
            display: none;
          }
        `}</style>

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
