"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, BookmarkPlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getBlogBySlug, getCmsBlogBySlug, convertCmsBlogToBlog, getFlexibenchCmsBlogs, type Blog } from "@/lib/api/resources";

export default function BlogDetailClient() {
  const params = useParams();
  // Ensure slug is a string, not an object
  let slug = typeof params?.slug === 'string' ? params.slug : String(params?.slug || '');
  
  // Decode URL-encoded slug (in case it was encoded in the URL)
  if (slug && typeof window !== 'undefined') {
    try {
      slug = decodeURIComponent(slug);
    } catch (e) {
      // If decoding fails, use the original slug
      console.warn('Failed to decode slug:', slug, e);
    }
  }
  
  // Fix common slug issues
  if (slug === 'object-object' || slug === '[object Object]' || !slug) {
    console.error('Invalid slug detected:', params?.slug);
    // Try to get slug from URL if available
    if (typeof window !== 'undefined') {
      const pathParts = window.location.pathname.split('/');
      const slugIndex = pathParts.indexOf('blogs');
      if (slugIndex >= 0 && pathParts[slugIndex + 1]) {
        slug = decodeURIComponent(pathParts[slugIndex + 1]);
        console.log('Extracted slug from URL:', slug);
      }
    }
  }
  
  console.log('BlogDetailClient - slug:', slug, 'params:', params, 'URL:', typeof window !== 'undefined' ? window.location.pathname : 'N/A');
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
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
      
      // Check if this is an old slug format (contains HTML class names)
      const isOldSlug = slug.includes('h2-class') || slug.includes('cms-richtext') || slug.includes('cms-heading');
      
      // If it's an old slug, fetch all blogs and find the correct one, then redirect
      if (isOldSlug) {
        console.log('Detected old slug format, fetching all blogs to find correct slug:', slug);
        const allCmsBlogs = await getFlexibenchCmsBlogs({ includeAssetUrls: true });
        if (allCmsBlogs.success && allCmsBlogs.data && allCmsBlogs.data.length > 0) {
          // Use the first blog (or find by title if we can match it)
          const foundBlog = allCmsBlogs.data[0]; // For now, use first blog
          const convertedBlog = convertCmsBlogToBlog(foundBlog);
          
          // Redirect to correct URL
          const correctSlug = encodeURIComponent(convertedBlog.slug);
          if (typeof window !== 'undefined' && window.location.pathname !== `/resources/blogs/${correctSlug}`) {
            console.log('Redirecting from old slug to correct slug:', slug, '->', convertedBlog.slug);
            window.history.replaceState(null, '', `/resources/blogs/${correctSlug}`);
            setBlog(convertedBlog);
            return;
          }
          setBlog(convertedBlog);
          return;
        }
      }
      
      // First try internal API
      const internalResponse = await getBlogBySlug(decodedSlug);
      if (internalResponse.success && internalResponse.data) {
        setBlog(internalResponse.data);
        return;
      }
      
      console.log('Internal API did not find blog, trying CMS...');

      // If not found in internal API, try CMS with decoded slug
      const cmsResponse = await getCmsBlogBySlug(decodedSlug);
      if (cmsResponse.success && cmsResponse.data) {
        // Convert CMS blog to internal Blog format
        const convertedBlog = convertCmsBlogToBlog(cmsResponse.data);
        console.log('CMS blog fetched:', {
          title: convertedBlog.title,
          slug: convertedBlog.slug,
          bodyLength: convertedBlog.body?.length,
          bodyPreview: convertedBlog.body?.substring(0, 200),
        });
        setBlog(convertedBlog);
        return;
      }

      // If still not found, try fetching all CMS blogs and finding by slug
      console.log('Fetching all CMS blogs to find by slug:', decodedSlug);
      const allCmsBlogs = await getFlexibenchCmsBlogs({ includeAssetUrls: true });
      if (allCmsBlogs.success && allCmsBlogs.data) {
        console.log('All CMS blogs fetched:', {
          count: allCmsBlogs.data.length,
          slugs: allCmsBlogs.data.map(item => item.slug),
          titles: allCmsBlogs.data.map(item => item.title?.replace(/<[^>]*>/g, '').trim())
        });
        
        // CMS slug is the full title: "Beyond the Algorithm: How Data Annotation Engineering Drives Real AI Results"
        // Try exact match first (CMS slug is the full title)
        let foundCmsBlog = allCmsBlogs.data.find((item) => {
          const itemSlug = item.slug || '';
          // Try exact match
          if (itemSlug === decodedSlug || itemSlug === slug) return true;
          // Try case-insensitive match
          if (itemSlug.toLowerCase() === decodedSlug.toLowerCase() || itemSlug.toLowerCase() === slug.toLowerCase()) return true;
          return false;
        });
        
        // If not found, try matching against title (in case slug field is empty)
        if (!foundCmsBlog) {
          foundCmsBlog = allCmsBlogs.data.find((item) => {
            const itemTitle = (item.title || '').replace(/<[^>]*>/g, '').trim();
            return itemTitle === decodedSlug || itemTitle === slug || 
                   itemTitle.toLowerCase() === decodedSlug.toLowerCase() || 
                   itemTitle.toLowerCase() === slug.toLowerCase();
          });
        }
        
        if (foundCmsBlog) {
          const convertedBlog = convertCmsBlogToBlog(foundCmsBlog);
          console.log('CMS blog found in list:', {
            title: convertedBlog.title,
            slug: convertedBlog.slug,
            requestedSlug: slug,
            bodyLength: convertedBlog.body?.length,
          });
          setBlog(convertedBlog);
          return;
        } else {
          console.error('Blog not found. Available slugs:', allCmsBlogs.data.map(item => item.slug));
          console.error('Requested slug:', slug);
        }
      }

      // If still not found
              // Show helpful error with available slugs
              const allCmsBlogsForError = await getFlexibenchCmsBlogs({ includeAssetUrls: true });
              if (allCmsBlogsForError.success && allCmsBlogsForError.data) {
                const availableSlugs = allCmsBlogsForError.data.map(item => item.slug).filter(Boolean);
                console.error('Blog not found. Available slugs in CMS:', availableSlugs);
                console.error('Requested slug:', slug);
                setError(`Blog not found. Available slugs: ${availableSlugs.join(', ')}`);
              } else {
                setError('Blog not found');
              }
            } catch (err) {
              console.error('Error fetching blog:', err);
              setError('Blog not found');
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
          <p className="text-muted-foreground">Loading blog...</p>
        </div>
        <Footer1 />
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main id="main-content">
        <LpNavbar1 />
        <div className="container mx-auto px-4 sm:px-6 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-muted-foreground mb-8">{error || 'The blog you\'re looking for doesn\'t exist.'}</p>
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
            { label: "Blogs" },
            { label: blog.title }
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
            Blog
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{blog.readTime} min read</span>
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
        {blog.body && (
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-12 blog-content"
            dangerouslySetInnerHTML={{ 
              __html: typeof blog.body === 'string' ? blog.body : String(blog.body || '')
            }}
          />
        )}
        {!blog.body && (
          <div className="mb-12">
            <p className="text-muted-foreground">No content available for this blog.</p>
          </div>
        )}
        <style jsx global>{`
          .blog-content {
            line-height: 1.8;
            color: var(--foreground);
          }
          
          /* CMS Richtext Styles */
          .blog-content .cms-richtext {
            line-height: 1.8;
            color: var(--foreground);
          }
          
          .blog-content .cms-p,
          .blog-content p {
            margin-bottom: 1.5rem;
            font-size: 1.125rem;
            line-height: 1.8;
            color: var(--foreground);
          }
          
          .blog-content .cms-heading-h1,
          .blog-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-top: 3rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            color: var(--foreground);
          }
          
          .blog-content .cms-heading-h2,
          .blog-content h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            line-height: 1.3;
            color: var(--foreground);
          }
          
          .blog-content .cms-heading-h3,
          .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-top: 2rem;
            margin-bottom: 1rem;
            line-height: 1.4;
            color: var(--foreground);
          }
          
          .blog-content .cms-heading-h4,
          .blog-content h4 {
            font-size: 1.25rem;
            font-weight: 700;
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
            line-height: 1.4;
            color: var(--foreground);
          }
          
          .blog-content .cms-heading-h5,
          .blog-content h5 {
            font-size: 1.125rem;
            font-weight: 700;
            margin-top: 1.25rem;
            margin-bottom: 0.75rem;
            line-height: 1.4;
            color: var(--foreground);
          }
          
          .blog-content .cms-heading-h6,
          .blog-content h6 {
            font-size: 1rem;
            font-weight: 700;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
            line-height: 1.4;
            color: var(--foreground);
          }
          
          .blog-content .cms-list-ul,
          .blog-content ul {
            list-style-type: disc;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          
          .blog-content .cms-list-ol,
          .blog-content ol {
            list-style-type: decimal;
            margin-top: 1.5rem;
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
          }
          
          .blog-content .cms-list-item,
          .blog-content li {
            margin-bottom: 0.75rem;
            line-height: 1.8;
            color: var(--foreground);
          }
          
          .blog-content .cms-code-block {
            background: #111827;
            color: #e5e7eb;
            padding: 0.75rem 1rem;
            border-radius: 0.375rem;
            overflow-x: auto;
            margin: 1rem 0;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.875rem;
          }
          
          .blog-content .cms-code {
            background: #f3f4f6;
            color: #1f2937;
            padding: 0.125rem 0.375rem;
            border-radius: 0.25rem;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 0.875rem;
          }
          
          .dark .blog-content .cms-code {
            background: #1f2937;
            color: #e5e7eb;
          }
          
          .blog-content .cms-quote {
            border-left: 4px solid var(--border);
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: var(--muted-foreground);
          }
          
          .blog-content .cms-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
            overflow-x: auto;
          }
          
          .blog-content .cms-table-row {
            border-bottom: 1px solid var(--border);
          }
          
          .blog-content .cms-table-cell {
            padding: 0.75rem;
            text-align: left;
          }
          
          .blog-content .cms-figure-image img,
          .blog-content .cms-image {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 1.5rem 0;
          }
          
          .blog-content strong,
          .blog-content .cms-richtext strong {
            font-weight: 700;
          }
          
          .blog-content em,
          .blog-content .cms-richtext em {
            font-style: italic;
          }
          
          .blog-content a,
          .blog-content .cms-richtext a {
            color: oklch(0.68 0.15 50);
            text-decoration: underline;
          }
          
          .blog-content a:hover,
          .blog-content .cms-richtext a:hover {
            color: oklch(0.68 0.15 50 / 0.8);
          }
        `}</style>

        {/* External Link */}
        {blog.link && (
          <div className="mt-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-lg">
            <p className="text-sm text-muted-foreground mb-2">Continue reading:</p>
            <a 
              href={blog.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:underline flex items-center gap-2"
            >
              Read full article on external site
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        )}

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
