"use client";

import { LpNavbar1 } from "@/components/pro-blocks/landing-page/lp-navbars/lp-navbar-1";
import { Footer1 } from "@/components/pro-blocks/landing-page/footers/footer-1";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Share2, BookmarkPlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getBlogBySlug, type Blog } from "@/lib/api/resources";

export default function BlogDetailClient() {
  const params = useParams();
  const slug = params?.slug as string;
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
      const response = await getBlogBySlug(slug);
      setBlog(response.data);
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
        <div 
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: blog.body || '' }}
        />

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
