import AnnouncementDetailClient from "./announcement-detail-client";

export async function generateStaticParams() {
  try {
    // Fetch all announcements at build time to generate static routes
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://flexibench.io';
    const response = await fetch(`${API_URL}/api/flexibench/resources/announcements`, {
      cache: 'force-cache',
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.data && Array.isArray(data.data)) {
        return data.data.map((announcement: { slug: string }) => ({
          slug: announcement.slug,
        }));
      }
    }
  } catch (error) {
    console.error('Error fetching announcements for static generation:', error);
  }
  
  // Fallback: return placeholder if API fails
  return [{ slug: 'placeholder' }];
}

export default function AnnouncementDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <AnnouncementDetailClient />;
}
