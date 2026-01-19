import WhitePaperDetailClient from "./whitepaper-detail-client";

export async function generateStaticParams() {
  try {
    // Fetch all white papers at build time to generate static routes
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://flexibench.io';
    const response = await fetch(`${API_URL}/api/flexibench/resources/whitepapers`, {
      cache: 'force-cache',
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data && Array.isArray(data.data)) {
        return data.data.map((paper: { slug: string }) => ({
          slug: paper.slug,
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching white papers for static generation:', error);
  }
  
  // Fallback: return placeholder if API fails
  return [{ slug: 'placeholder' }];
}

export default function WhitePaperDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <WhitePaperDetailClient />;
}
