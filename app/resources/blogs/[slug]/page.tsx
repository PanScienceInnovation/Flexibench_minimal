import BlogDetailClient from "./blog-detail-client";

export async function generateStaticParams() {
  try {
    // Fetch all blogs at build time to generate static routes
    // Use localhost during build, production URL in production
    const API_URL = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://flexibench.io' : 'http://localhost:3000');
    const response = await fetch(`${API_URL}/api/flexibench/resources/blogs`, {
      // Don't cache - fetch fresh data during build
      cache: 'no-store',
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data && Array.isArray(data.data)) {
        console.log(`[generateStaticParams] Found ${data.data.length} blogs to generate`);
        return data.data.map((blog: { slug: string }) => ({
          slug: blog.slug,
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching blogs for static generation:', error);
  }
  
  // Fallback: return placeholder if API fails
  return [{ slug: 'placeholder' }];
}

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BlogDetailClient />;
}
