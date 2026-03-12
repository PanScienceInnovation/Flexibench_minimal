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
      console.warn(`Internal API not available: ${response.status} ${response.statusText}. Returning empty array.`);
      return { success: true, data: [] };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Internal API not available, returning empty array:', error);
    return { success: true, data: [] };
  }
};

export const getBlogBySlug = async (slug: string): Promise<{ success: boolean; data: Blog | null }> => {
  try {
    const response = await fetch(`${RESOURCES_API}/blogs/${slug}`);
    if (!response.ok) {
      console.warn(`Internal API not available for blog ${slug}: ${response.status}`);
      return { success: false, data: null };
    }
    return response.json();
  } catch (error) {
    console.warn(`Internal API not available for blog ${slug}:`, error);
    return { success: false, data: null };
  }
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
      console.warn(`Internal API not available for white papers: ${response.status} ${response.statusText}. Returning empty array.`);
      return { success: true, data: [] };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Internal API not available for white papers, returning empty array:', error);
    return { success: true, data: [] };
  }
};

export const getWhitePaperBySlug = async (slug: string): Promise<{ success: boolean; data: WhitePaper | null }> => {
  try {
    const response = await fetch(`${RESOURCES_API}/whitepapers/${slug}`);
    if (!response.ok) {
      console.warn(`Internal API not available for white paper ${slug}: ${response.status}`);
      return { success: false, data: null };
    }
    return response.json();
  } catch (error) {
    console.warn(`Internal API not available for white paper ${slug}:`, error);
    return { success: false, data: null };
  }
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
      console.warn(`Internal API not available for announcements: ${response.status} ${response.statusText}. Returning empty array.`);
      return { success: true, data: [] };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Internal API not available for announcements, returning empty array:', error);
    return { success: true, data: [] };
  }
};

export const getAnnouncementBySlug = async (slug: string): Promise<{ success: boolean; data: Announcement | null }> => {
  try {
    const response = await fetch(`${RESOURCES_API}/announcements/${slug}`);
    if (!response.ok) {
      console.warn(`Internal API not available for announcement ${slug}: ${response.status}`);
      return { success: false, data: null };
    }
    return response.json();
  } catch (error) {
    console.warn(`Internal API not available for announcement ${slug}:`, error);
    return { success: false, data: null };
  }
};

// ========== CMS API INTEGRATION ==========
// Collection name: flexibech-blogs (with hyphen)
const CMS_BLOGS_API_BASE_URL = 'https://botza.panscience.xyz/api/v1/public/cms/flexibech-blogs';
// Collection name: news-flexibench (for white papers)
const CMS_WHITEPAPERS_API_BASE_URL = 'https://botza.panscience.xyz/api/v1/public/cms/news-flexibench';

// Get CMS API token from environment variable
const getCmsApiToken = () => {
  if (typeof window !== 'undefined') {
    // Client-side: use NEXT_PUBLIC prefix
    return process.env.NEXT_PUBLIC_CMS_API_TOKEN || process.env.VITE_CMS_API_TOKEN;
  }
  // Server-side: try both prefixes
  return process.env.NEXT_PUBLIC_CMS_API_TOKEN || process.env.VITE_CMS_API_TOKEN || process.env.CMS_API_TOKEN;
};

// CMS API Response Types
export interface CmsBlogItem {
  id: string;
  title: string;
  slug: string;
  content?: string; // Rich text content (HTML)
  heading?: string; // Heading field
  description?: string; // Description field
  heroImage?: string | {
    id: string;
    url: string;
    mimeType: string;
    originalFileName: string;
  };
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  [key: string]: any; // Allow additional fields from API
}

export interface CmsWhitePaperItem {
  id: string;
  title: string;
  slug: string;
  content?: string; // Rich text content (HTML)
  heading?: string; // Heading field
  description?: string; // Description field
  heroImage?: string | {
    id: string;
    url: string;
    mimeType: string;
    originalFileName: string;
  };
  author?: string;
  source?: string; // Source field for white papers
  publishedAt: string;
  updatedAt?: string;
  [key: string]: any; // Allow additional fields from API
}

export interface CmsApiResponse {
  success: boolean;
  data: CmsBlogItem | CmsBlogItem[] | CmsWhitePaperItem | CmsWhitePaperItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  error?: string;
  code?: string;
}

// Fetch CMS content from a collection
export const getCmsCollection = async (
  collectionUrl: string,
  options?: {
    page?: number;
    limit?: number;
    sort?: 'publishedAt' | 'updatedAt';
    includeAssetUrls?: boolean;
    slug?: string;
    id?: string;
  }
): Promise<CmsApiResponse> => {
  try {
    const token = getCmsApiToken();
    if (!token) {
      console.error('CMS API token not found. Please set VITE_CMS_API_TOKEN or NEXT_PUBLIC_CMS_API_TOKEN');
      return { success: false, data: [], error: 'API token not configured' };
    }

    const params = new URLSearchParams();
    if (options?.page) params.append('page', options.page.toString());
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.sort) params.append('sort', options.sort);
    if (options?.includeAssetUrls) params.append('includeAssetUrls', 'true');
    if (options?.slug) {
      // Clean and encode the slug properly
      const cleanSlug = options.slug.trim();
      params.append('slug', cleanSlug);
    }
    if (options?.id) params.append('id', options.id);

    const url = `${collectionUrl}${params.toString() ? `?${params.toString()}` : ''}`;
    console.log('CMS API Request URL:', url);
    console.log('CMS API Request options:', options);
    
    // Add timeout to prevent hanging (10 seconds)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    let response;
    try {
      response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-API-Token': token,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        console.error('CMS API request timed out after 10 seconds');
        return {
          success: false,
          data: [],
          error: 'Request timeout',
        };
      }
      throw error;
    }

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: errorText.substring(0, 200) };
      }
      console.error(`Failed to fetch CMS collection: ${response.status} ${response.statusText}`, {
        url: url,
        status: response.status,
        statusText: response.statusText,
        errorData: errorData,
        requestOptions: options,
        slug: options?.slug
      });
      return {
        success: false,
        data: [],
        error: errorData.error || `Failed to fetch: ${response.status}`,
        code: errorData.code,
      };
    }

    // Check if response is HTML (API might be returning error page)
    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();
    
    if (contentType.includes('text/html') || responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
      console.error('CMS API returned HTML instead of JSON. URL:', url);
      console.error('Response preview:', responseText.substring(0, 500));
      return {
        success: false,
        data: [],
        error: 'API returned HTML instead of JSON - check endpoint URL',
      };
    }

    let data: CmsApiResponse;
    try {
      data = JSON.parse(responseText);
      
      // Log the structure of returned data for debugging
      if (data.success && data.data) {
        if (Array.isArray(data.data)) {
          console.log('CMS API returned array of', data.data.length, 'items');
          if (data.data.length > 0) {
            console.log('First item fields:', Object.keys(data.data[0]));
            console.log('First item slug:', data.data[0].slug, 'type:', typeof data.data[0].slug);
          }
        } else {
          console.log('CMS API returned single item');
          console.log('Item fields:', Object.keys(data.data));
          console.log('Item slug:', (data.data as CmsBlogItem).slug, 'type:', typeof (data.data as CmsBlogItem).slug);
        }
      }
    } catch (parseError) {
      console.error('Failed to parse CMS API response as JSON. URL:', url);
      console.error('Response preview:', responseText.substring(0, 500));
      return {
        success: false,
        data: [],
        error: 'Invalid JSON response from API',
      };
    }
    console.log('CMS API response:', {
      success: data.success,
      dataType: Array.isArray(data.data) ? 'array' : typeof data.data,
      dataLength: Array.isArray(data.data) ? data.data.length : 'single item',
    });
    return data;
  } catch (error) {
    console.error(`Error fetching CMS collection:`, error);
    return {
      success: false,
      data: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

// Fetch all Flexibench CMS blogs from the flexibech-blogs collection
export const getFlexibenchCmsBlogs = async (options?: {
  page?: number;
  limit?: number;
  sort?: 'publishedAt' | 'updatedAt';
  includeAssetUrls?: boolean;
}): Promise<{ success: boolean; data: CmsBlogItem[] }> => {
  try {
    const response = await getCmsCollection(CMS_BLOGS_API_BASE_URL, {
      ...options,
      includeAssetUrls: options?.includeAssetUrls ?? true,
    });

    if (response.success) {
      if (Array.isArray(response.data)) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        // Single item response (shouldn't happen for list, but handle it)
        return {
          success: true,
          data: [response.data],
        };
      }
    }

    return {
      success: false,
      data: [],
    };
  } catch (error) {
    console.error('Error fetching Flexibench CMS blogs:', error);
    return {
      success: false,
      data: [],
    };
  }
};

// Get a single CMS blog item by slug
export const getCmsBlogBySlug = async (
  slug: string
): Promise<{ success: boolean; data: CmsBlogItem | null }> => {
  try {
    // Ensure slug is a string
    let slugString = typeof slug === 'string' ? slug : String(slug || '');
    
    // Fix common slug conversion issues
    if (slugString === '[object Object]' || slugString === 'object-object') {
      // Try to extract slug from the original value if it's an object
      if (slug && typeof slug === 'object' && 'slug' in slug) {
        slugString = String((slug as any).slug || '');
      } else if (slug && typeof slug === 'object' && 'toString' in slug) {
        // Try to get a meaningful value
        slugString = '';
      }
    }
    
    if (!slugString || slugString === '[object Object]') {
      console.error('Invalid slug provided:', slug, 'type:', typeof slug);
      return { success: false, data: null };
    }

    // Decode URL-encoded slug if needed (slug comes from URL path)
    let decodedSlug = slugString;
    try {
      // Try decoding in case it was double-encoded
      decodedSlug = decodeURIComponent(slugString);
      // If decoding changed it, use decoded version
      if (decodedSlug !== slugString) {
        console.log('Decoded slug:', slugString, '->', decodedSlug);
        slugString = decodedSlug;
      }
    } catch (e) {
      // If decoding fails, use original
      console.log('Slug does not need decoding:', slugString);
    }
    
    console.log('Fetching CMS blog by slug:', {
      original: slug,
      processed: slugString,
      slugType: typeof slugString,
      slugLength: slugString.length
    });
    
    const response = await getCmsCollection(CMS_BLOGS_API_BASE_URL, {
      slug: slugString,
      includeAssetUrls: true,
    });
    
    console.log('CMS API response for slug:', {
      slug: slugString,
      success: response.success,
      hasData: !!response.data,
      dataType: Array.isArray(response.data) ? 'array' : typeof response.data,
      error: response.error
    });

    if (response.success) {
      // According to API docs, single item by slug returns { success: true, data: {...} }
      // where data is a single object, not an array
      if (Array.isArray(response.data)) {
        // CMS slug is the full title: "Beyond the Algorithm: How Data Annotation Engineering Drives Real AI Results"
        // Try to find by exact slug match first
        let found = response.data.find(item => {
          const itemSlug = (item.slug || '') as string;
          const itemTitle = stripHtmlTags((item.title || '') as string);
          const titleSlug = slugifyTitle(itemTitle);

          // Try exact match on stored slug
          if (itemSlug && itemSlug.toLowerCase() === slugString.toLowerCase()) return true;

          // Try match on slug derived from title (kebab-case)
          if (titleSlug && titleSlug === slugString.toLowerCase()) return true;

          return false;
        });
        
        // If not found, try matching against title (in case slug field is empty or different)
        if (!found) {
          found = response.data.find(item => {
            const itemTitle = stripHtmlTags((item.title || '') as string);
            const titleSlug = slugifyTitle(itemTitle);

            // Match against clean title or its slug
            return (
              itemTitle === slugString ||
              itemTitle.toLowerCase() === slugString.toLowerCase() ||
              titleSlug === slugString.toLowerCase()
            );
          });
        }
        
        if (found) {
          console.log('Found CMS blog by slug (from array):', { 
            requestedSlug: slugString, 
            cmsSlug: found.slug,
            title: found.title, 
            hasContent: !!found.content,
            contentLength: found.content?.length || 0,
            allFields: Object.keys(found)
          });
          return { success: true, data: found };
        }
        return { success: true, data: response.data[0] || null };
      }
      // Single object response
      const item = response.data as CmsBlogItem;
      console.log('Found CMS blog by slug (single object):', { 
        requestedSlug: slugString,
        cmsSlug: item.slug,
        title: item.title, 
        hasContent: !!item.content,
        contentLength: item.content?.length || 0,
        hasHeading: !!item.heading,
        hasDescription: !!item.description,
        allFields: Object.keys(item)
      });
      return { success: true, data: item };
    }

    console.warn('CMS API returned success:false for slug:', slugString);
    return { success: false, data: null };
  } catch (error) {
    console.error(`Error fetching CMS blog by slug ${slug}:`, error);
    return { success: false, data: null };
  }
};

// Helper function to generate a URL-safe slug from a title
export const slugifyTitle = (value: string): string => {
  if (!value || typeof value !== 'string') return '';

  // Remove HTML tags and decode common entities
  const clean = value
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();

  return clean
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Helper function to strip HTML tags from text (works on both client and server)
const stripHtmlTags = (html: string): string => {
  if (!html || typeof html !== 'string') return '';
  
  // If running in browser, use DOM for better HTML entity decoding
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    try {
      const tmp = document.createElement('DIV');
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || '';
    } catch {
      // Fallback to regex if DOM method fails
    }
  }
  
  // Server-side or fallback: use regex to remove HTML tags
  // Also decode common HTML entities
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();
};

// Convert CMS blog item to internal Blog format
export const convertCmsBlogToBlog = (cmsItem: CmsBlogItem): Blog => {
  // Combine content fields: use content, or combine heading + description if content is missing
  let content = cmsItem.content || '';
  
  // If no content field, try to combine heading and description
  if (!content && (cmsItem.heading || cmsItem.description)) {
    const parts: string[] = [];
    if (cmsItem.heading) parts.push(`<h2>${cmsItem.heading}</h2>`);
    if (cmsItem.description) parts.push(`<p>${cmsItem.description}</p>`);
    content = parts.join('');
  }
  
  // Ensure content is a string
  if (typeof content !== 'string') {
    content = String(content || '');
  }

  // Estimate read time from content (roughly 200 words per minute)
  const wordCount = content ? content.split(/\s+/).length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));
  
  console.log('Converting CMS blog - RAW DATA:', {
    id: cmsItem.id,
    rawSlug: cmsItem.slug,
    slugType: typeof cmsItem.slug,
    slugValue: JSON.stringify(cmsItem.slug),
    title: cmsItem.title,
    hasContent: !!cmsItem.content,
    hasHeading: !!cmsItem.heading,
    hasDescription: !!cmsItem.description,
    allFields: Object.keys(cmsItem),
    allFieldValues: Object.keys(cmsItem).reduce((acc, key) => {
      acc[key] = typeof (cmsItem as any)[key];
      return acc;
    }, {} as Record<string, string>)
  });

  // Strip HTML from title FIRST (before slug generation)
  let title = cmsItem.title || '';
  let cleanTitle = title;
  if (typeof title === 'string' && (title.includes('<') || title.includes('>'))) {
    // If running in browser, use DOM to strip HTML
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      cleanTitle = stripHtmlTags(title);
    } else {
      // Server-side: use regex fallback
      cleanTitle = title.replace(/<[^>]*>/g, '').trim();
    }
    title = cleanTitle; // Use cleaned title
  }

  // Generate URL slug from cleaned title so it is consistent everywhere
  let slug = slugifyTitle(cleanTitle || (cmsItem.slug as string) || '');
  
  if (!slug) {
    console.warn('CMS slug field is invalid or empty, using cleaned title as slug:', {
      id: cmsItem.id,
      rawSlug: cmsItem.slug,
      slugType: typeof cmsItem.slug,
      cleanTitle: cleanTitle
    });
    slug = slugifyTitle(cleanTitle || 'unknown');
  }

  // Format date - ensure it's a valid date string
  // CMS provides publishedAt in ISO format (e.g., "2024-12-20T00:00:00.000Z" or "2024-12-20")
  let formattedDate = cmsItem.publishedAt || '';
  
  // If date is in DD/MM/YYYY format (e.g., "20/12/2024"), convert to ISO format
  if (formattedDate.includes('/')) {
    const parts = formattedDate.split('/');
    if (parts.length === 3) {
      // DD/MM/YYYY -> YYYY-MM-DD
      formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  }
  
  // Ensure date is valid, fallback to current date if invalid
  const dateObj = new Date(formattedDate);
  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date from CMS, using current date:', cmsItem.publishedAt);
    formattedDate = new Date().toISOString();
  } else {
    // Normalize to ISO string format
    formattedDate = dateObj.toISOString();
  }

  return {
    id: parseInt(cmsItem.id) || 0,
    title: title,
    date: formattedDate,
    author: cmsItem.author || 'FlexiBench Team',
    body: content,
    link: null,
    readTime: estimatedReadTime,
    slug: slug,
    published: true,
    createdAt: formattedDate,
    updatedAt: cmsItem.updatedAt || formattedDate,
  };
};

// ========== CMS WHITE PAPERS INTEGRATION ==========

// Fetch all Flexibench CMS white papers from the news-flexibench collection
export const getFlexibenchCmsWhitePapers = async (options?: {
  page?: number;
  limit?: number;
  sort?: 'publishedAt' | 'updatedAt';
  includeAssetUrls?: boolean;
}): Promise<{ success: boolean; data: CmsWhitePaperItem[] }> => {
  try {
    const response = await getCmsCollection(CMS_WHITEPAPERS_API_BASE_URL, {
      ...options,
      includeAssetUrls: options?.includeAssetUrls ?? true,
    });

    if (response.success) {
      if (Array.isArray(response.data)) {
        return {
          success: true,
          data: response.data as CmsWhitePaperItem[],
        };
      } else {
        // Single item response (shouldn't happen for list, but handle it)
        return {
          success: true,
          data: [response.data as CmsWhitePaperItem],
        };
      }
    }

    return {
      success: false,
      data: [],
    };
  } catch (error) {
    console.error('Error fetching Flexibench CMS white papers:', error);
    return {
      success: false,
      data: [],
    };
  }
};

// Get a single CMS white paper item by slug
export const getCmsWhitePaperBySlug = async (
  slug: string
): Promise<{ success: boolean; data: CmsWhitePaperItem | null }> => {
  try {
    // Ensure slug is a string
    let slugString = typeof slug === 'string' ? slug : String(slug || '');
    
    if (!slugString || slugString === '[object Object]') {
      console.error('Invalid slug provided:', slug, 'type:', typeof slug);
      return { success: false, data: null };
    }

    // Decode URL-encoded slug if needed (slug comes from URL path)
    let decodedSlug = slugString;
    try {
      decodedSlug = decodeURIComponent(slugString);
      if (decodedSlug !== slugString) {
        console.log('Decoded slug:', slugString, '->', decodedSlug);
        slugString = decodedSlug;
      }
    } catch (e) {
      console.log('Slug does not need decoding:', slugString);
    }
    
    console.log('Fetching CMS white paper by slug:', {
      original: slug,
      processed: slugString,
      slugType: typeof slugString,
      slugLength: slugString.length
    });
    
    const response = await getCmsCollection(CMS_WHITEPAPERS_API_BASE_URL, {
      slug: slugString,
      includeAssetUrls: true,
    });
    
    console.log('CMS API response for white paper slug:', {
      slug: slugString,
      success: response.success,
      hasData: !!response.data,
      dataType: Array.isArray(response.data) ? 'array' : typeof response.data,
      error: response.error
    });

    if (response.success) {
      if (Array.isArray(response.data)) {
        // CMS slug is the full title
        let found = response.data.find(item => {
          const itemSlug = item.slug || '';
          if (itemSlug === slugString) return true;
          if (itemSlug.toLowerCase() === slugString.toLowerCase()) return true;
          return false;
        });
        
        if (!found) {
          found = response.data.find(item => {
            const itemTitle = (item.title || '').replace(/<[^>]*>/g, '').trim();
            return itemTitle === slugString || 
                   itemTitle.toLowerCase() === slugString.toLowerCase();
          });
        }
        
        if (found) {
          console.log('Found CMS white paper by slug (from array):', { 
            requestedSlug: slugString, 
            cmsSlug: found.slug,
            title: found.title, 
            hasContent: !!found.content,
            contentLength: found.content?.length || 0,
            allFields: Object.keys(found)
          });
          return { success: true, data: found as CmsWhitePaperItem };
        }
        return { success: true, data: (response.data[0] as CmsWhitePaperItem) || null };
      }
      // Single object response
      const item = response.data as CmsWhitePaperItem;
      console.log('Found CMS white paper by slug (single object):', { 
        slug: slugString, 
        title: item.title, 
        hasContent: !!item.content,
        contentLength: item.content?.length || 0,
        hasHeading: !!item.heading,
        hasDescription: !!item.description,
        allFields: Object.keys(item)
      });
      return { success: true, data: item };
    }

    console.warn('CMS API returned success:false for white paper slug:', slugString, 'Error:', response.error);
    return { success: false, data: null };
  } catch (error) {
    console.error(`Error fetching CMS white paper by slug ${slug}:`, error);
    return { success: false, data: null };
  }
};

// Convert CMS white paper item to internal WhitePaper format
export const convertCmsWhitePaperToWhitePaper = (cmsItem: CmsWhitePaperItem): WhitePaper => {
  // Combine content fields: use content, or combine heading + description if content is missing
  let content = cmsItem.content || '';
  
  // If no content field, try to combine heading and description
  if (!content && (cmsItem.heading || cmsItem.description)) {
    const parts: string[] = [];
    if (cmsItem.heading) parts.push(`<h2>${cmsItem.heading}</h2>`);
    if (cmsItem.description) parts.push(`<p>${cmsItem.description}</p>`);
    content = parts.join('');
  }
  
  // Ensure content is a string
  if (typeof content !== 'string') {
    content = String(content || '');
  }

  // Estimate read time from content (roughly 200 words per minute)
  const wordCount = content ? content.split(/\s+/).length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  // Strip HTML from title
  let title = cmsItem.title || '';
  let cleanTitle = title;
  if (typeof title === 'string' && (title.includes('<') || title.includes('>'))) {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      cleanTitle = stripHtmlTags(title);
    } else {
      cleanTitle = title.replace(/<[^>]*>/g, '').trim();
    }
    title = cleanTitle;
  }

  // Generate URL slug from cleaned title so it is consistent everywhere
  let slug = slugifyTitle(cleanTitle || (cmsItem.slug as string) || '');
  
  if (!slug) {
    console.warn('CMS white paper slug field is invalid or empty, using cleaned title as slug:', {
      id: cmsItem.id,
      rawSlug: cmsItem.slug,
      cleanTitle: cleanTitle
    });
    slug = slugifyTitle(cleanTitle || 'unknown');
  }

  // Format date - ensure it's a valid date string
  let formattedDate = cmsItem.publishedAt || '';
  
  // If date is in DD/MM/YYYY format, convert to ISO format
  if (formattedDate.includes('/')) {
    const parts = formattedDate.split('/');
    if (parts.length === 3) {
      formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
    }
  }
  
  // Ensure date is valid, fallback to current date if invalid
  const dateObj = new Date(formattedDate);
  if (isNaN(dateObj.getTime())) {
    console.warn('Invalid date from CMS white paper, using current date:', cmsItem.publishedAt);
    formattedDate = new Date().toISOString();
  } else {
    formattedDate = dateObj.toISOString();
  }

  return {
    id: parseInt(cmsItem.id) || 0,
    title: title,
    source: cmsItem.source || cmsItem.author || 'FlexiBench Team',
    body: content,
    readTime: estimatedReadTime,
    slug: slug,
    published: true,
    createdAt: formattedDate,
    updatedAt: cmsItem.updatedAt || formattedDate,
  };
};