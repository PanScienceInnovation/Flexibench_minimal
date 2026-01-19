// FlexiBench Resources API Service
// Use relative path for production (will be proxied by Nginx to backend)
// Or use environment variable if set for development
const getApiBaseUrl = () => {
  // If environment variable is set, use it (for development)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // Otherwise use relative path (for production - proxied by Nginx)
  return '';
};

const API_BASE_URL = getApiBaseUrl();
const RESOURCES_API = `${API_BASE_URL}/api/flexibench/resources`;

// Debug: Log API configuration (only in browser)
if (typeof window !== 'undefined') {
  console.log('API Configuration:', {
    API_BASE_URL,
    RESOURCES_API,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });
}

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
  try {
    const url = `${RESOURCES_API}/blogs`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch blogs: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getBlogs:', error);
    throw error;
  }
};

export const getBlogBySlug = async (slug: string): Promise<{ success: boolean; data: Blog }> => {
  const response = await fetch(`${RESOURCES_API}/blogs/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch blog');
  return response.json();
};

// ========== WHITE PAPERS ==========
export const getWhitePapers = async (): Promise<{ success: boolean; data: WhitePaper[] }> => {
  try {
    const url = `${RESOURCES_API}/whitepapers`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch white papers: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch white papers: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getWhitePapers:', error);
    throw error;
  }
};

export const getWhitePaperBySlug = async (slug: string): Promise<{ success: boolean; data: WhitePaper }> => {
  const response = await fetch(`${RESOURCES_API}/whitepapers/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch white paper');
  return response.json();
};

// ========== ANNOUNCEMENTS ==========
export const getAnnouncements = async (): Promise<{ success: boolean; data: Announcement[] }> => {
  try {
    const url = `${RESOURCES_API}/announcements`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch announcements: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch announcements: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getAnnouncements:', error);
    throw error;
  }
};

export const getAnnouncementBySlug = async (slug: string): Promise<{ success: boolean; data: Announcement }> => {
  const response = await fetch(`${RESOURCES_API}/announcements/${slug}`);
  if (!response.ok) throw new Error('Failed to fetch announcement');
  return response.json();
};
