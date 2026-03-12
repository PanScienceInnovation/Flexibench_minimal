import WhitePaperDetailClient from "./whitepaper-detail-client";
import { slugifyTitle } from "@/lib/api/resources";

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
