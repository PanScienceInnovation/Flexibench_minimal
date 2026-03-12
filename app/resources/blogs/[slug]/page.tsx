import BlogDetailClient from "./blog-detail-client";

export async function generateStaticParams() {
  try {
    // Fetch CMS blogs for static generation
    // Collection name: flexibech-blogs (with hyphen)
    const CMS_API_BASE_URL = 'https://botza.panscience.xyz/api/v1/public/cms/flexibech-blogs';
    const token = process.env.NEXT_PUBLIC_CMS_API_TOKEN || process.env.VITE_CMS_API_TOKEN;
    
    if (!token) {
      console.warn('[generateStaticParams] CMS API token not found');
      return [];
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
        const slugs = data.data.map((blog: { slug: string }) => ({
          slug: blog.slug,
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
  
  // Return empty array - will fallback to 404 for unknown slugs
  return [];
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
