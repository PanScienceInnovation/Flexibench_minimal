// FlexiBench Resources API Service
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5010';
const RESOURCES_API = `${API_BASE_URL}/api/flexibench/resources`;

// Type definitions matching backend
export interface Blog {
  id: number;
  title: string;
  date: string;
  author: string;
  body?: string;
  link: string | null;
  readTime: number;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WhitePaper {
  id: number;
  title: string;
  source: string;
  body?: string;
  readTime: number;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Announcement {
  id: number;
  title: string;
  body?: string;
  readTime: number;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// ========== BLOGS ==========
export const getBlogs = async (): Promise<{ success: boolean; data: Blog[] }> => {
  const response = await fetch(`${RESOURCES_API}/blogs`);
  if (!response.ok) throw new Error('Failed to fetch blogs');
  return response.json();
};

export const getBlogBySlug = async (slug: string): Promise<{ success: boolean; data: Blog }> => {
  const response = await fetch(`${RESOURCES_API}/blogs/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
};

// ========== WHITE PAPERS ==========
export const getWhitePapers = async (): Promise<{ success: boolean; data: WhitePaper[] }> => {
  const response = await fetch(`${RESOURCES_API}/whitepapers`);
  if (!response.ok) throw new Error('Failed to fetch white papers');
  return response.json();
};

export const getWhitePaperBySlug = async (slug: string): Promise<{ success: boolean; data: WhitePaper }> => {
  const response = await fetch(`${RESOURCES_API}/whitepapers/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch white paper');
  return response.json();
};

// ========== ANNOUNCEMENTS ==========
export const getAnnouncements = async (): Promise<{ success: boolean; data: Announcement[] }> => {
  const response = await fetch(`${RESOURCES_API}/announcements`);
  if (!response.ok) throw new Error('Failed to fetch announcements');
  return response.json();
};

export const getAnnouncementBySlug = async (slug: string): Promise<{ success: boolean; data: Announcement }> => {
  const response = await fetch(`${RESOURCES_API}/announcements/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch announcement');
  return response.json();
};
