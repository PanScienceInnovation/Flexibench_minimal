import WhitePaperDetailClient from "./whitepaper-detail-client";
import { slugifyTitle } from "@/lib/api/resources";
import type { Metadata } from "next";

export async function generateStaticParams() {
  try {
    // Fetch CMS white papers for static generation
    // Collection name: news-flexibench (for white papers)
    const CMS_API_BASE_URL = 'https://botza.panscience.xyz/api/v1/public/cms/news-flexibench';
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
        const slugs = data.data.map((paper: { slug?: string; title?: string }) => ({
          // Use kebab-case slug derived from title
          slug: slugifyTitle(paper.slug || paper.title || ""),
        }));
        console.log(`[generateStaticParams] Found ${slugs.length} CMS white papers to generate`);
        return slugs;
      }
    } else {
      console.warn(`[generateStaticParams] CMS API returned ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    console.error('[generateStaticParams] Error fetching CMS white papers:', error);
  }
  
  // Return placeholder to avoid build error with static export
  return [{ slug: 'placeholder' }];
}

// Add this function to generate metadata for each white paper
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const slug = resolvedParams.slug;
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexibench.io';
  
  try {
    const CMS_API_BASE_URL = 'https://botza.panscience.xyz/api/v1/public/cms/news-flexibench';
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
          const paper = data.data.find((p: any) => 
            slugifyTitle(p.slug || p.title || "") === slug
          );
          
          if (paper) {
            const title = typeof paper.title === 'string' 
              ? paper.title.replace(/<[^>]*>/g, '').trim() 
              : 'White Paper';
            const description = paper.excerpt || paper.description || 
              `Read ${title} on Flexibench - Enterprise data annotation insights.`;
            
            return {
              title: title,
              description: description,
              openGraph: {
                title: title,
                description: description,
                type: "article",
                publishedTime: paper.createdAt || paper.date,
                authors: paper.author ? [paper.author] : undefined,
                images: paper.imageUrl ? [paper.imageUrl] : undefined,
                url: `${siteUrl}/resources/white-papers/${slug}`,
              },
              twitter: {
                card: "summary_large_image",
                title: title,
                description: description,
                images: paper.imageUrl ? [paper.imageUrl] : undefined,
              },
              other: {
                "chatbot:index": "true",
                "chatbot:searchable": "true",
                "chatbot:category": "whitepaper",
                "article:author": paper.author || "",
                "article:published_time": paper.createdAt || paper.date || "",
              },
            };
          }
        }
      }
    }
  } catch (error) {
    console.error('[generateMetadata] Error fetching white paper metadata:', error);
  }
  
  // Fallback metadata
  return {
    title: "White Paper",
    description: "Read this white paper on Flexibench",
    other: {
      "chatbot:index": "true",
      "chatbot:searchable": "true",
      "chatbot:category": "whitepaper",
    },
  };
}

export default function WhitePaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  // Handle both Promise and direct params (Next.js 15+ uses Promise)
  if (params instanceof Promise) {
    return <WhitePaperDetailClient />;
  }
  return <WhitePaperDetailClient />;
}
