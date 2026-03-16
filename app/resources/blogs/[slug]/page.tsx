import BlogDetailClient from "./blog-detail-client";
import { slugifyTitle } from "@/lib/api/resources";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    // Fetch CMS blogs for static generation
    // Collection name: flexibech-blogs (with hyphen)
    const CMS_API_BASE_URL = 'https://botza.panscience.xyz/api/v1/public/cms/flexibech-blogs';
    const token = process.env.NEXT_PUBLIC_CMS_API_TOKEN || process.env.VITE_CMS_API_TOKEN;
    
    if (!token) {
      console.warn('[generateStaticParams] CMS API token not found');
      // Return placeholder to avoid build error with static export
      return [{ slug: 'placeholder' }];
    }

    const response = await fetch(`${CMS_API_BASE_URL}?limit=100&includeAssetUrls=true`, {
      headers: {
        'X-API-Token': token,
        'Content-Type': 'application/json',
      },
      // Don't cache during build - fetch fresh data
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data && Array.isArray(data.data)) {
        const slugs = data.data.map((blog: { slug?: string; title?: string }) => ({
          // Use kebab-case slug derived from title so URLs are stable
          slug: slugifyTitle(blog.slug || blog.title || ""),
        }));
        console.log(`[generateStaticParams] Found ${slugs.length} CMS blogs to generate`);
        return slugs;
      }
    } else {
      console.warn(`[generateStaticParams] CMS API returned ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('[generateStaticParams] Error fetching CMS blogs:', error);
  }
  
  // Return placeholder to avoid build error with static export
  return [{ slug: 'placeholder' }];
}

// Add this function to generate metadata for each blog
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexibench.io';
  
  try {
    const CMS_API_BASE_URL = 'https://botza.panscience.xyz/api/v1/public/cms/flexibech-blogs';
    const token = process.env.NEXT_PUBLIC_CMS_API_TOKEN || process.env.VITE_CMS_API_TOKEN;
    
    if (token) {
      const response = await fetch(`${CMS_API_BASE_URL}?limit=100&includeAssetUrls=true`, {
        headers: {
          'X-API-Token': token,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && Array.isArray(data.data)) {
          const blog = data.data.find((b: any) => 
            slugifyTitle(b.slug || b.title || "") === slug
          );
          
          if (blog) {
            const title = typeof blog.title === 'string' 
              ? blog.title.replace(/<[^>]*>/g, '').trim() 
              : 'Blog Post';
            const description = blog.excerpt || blog.description || 
              `Read ${title} on Flexibench - Enterprise data annotation insights.`;
            
            return {
              title: title,
              description: description,
              openGraph: {
                title: title,
                description: description,
                type: "article",
                publishedTime: blog.createdAt || blog.date,
                authors: blog.author ? [blog.author] : undefined,
                images: blog.imageUrl ? [blog.imageUrl] : undefined,
                url: `${siteUrl}/resources/blogs/${slug}`,
              },
              twitter: {
                card: "summary_large_image",
                title: title,
                description: description,
                images: blog.imageUrl ? [blog.imageUrl] : undefined,
              },
              other: {
                "chatbot:index": "true",
                "chatbot:searchable": "true",
                "chatbot:category": "blog",
                "article:author": blog.author || "",
                "article:published_time": blog.createdAt || blog.date || "",
              },
            };
          }
        }
      }
    }
  } catch (error) {
    console.error('[generateMetadata] Error fetching blog metadata:', error);
  }
  
  // Fallback metadata
  return {
    title: "Blog Post",
    description: "Read this blog post on Flexibench",
    other: {
      "chatbot:index": "true",
      "chatbot:searchable": "true",
      "chatbot:category": "blog",
    },
  };
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Handle both Promise and direct params (Next.js 15+ uses Promise)
  if (params instanceof Promise) {
    return <BlogDetailClient />;
  }
  return <BlogDetailClient />;
}
