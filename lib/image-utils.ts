/**
 * Generate a blur data URL for Next.js Image placeholder
 * Creates a tiny 1x1 pixel image with the specified color
 */
export function generateBlurDataURL(color: string = "#e5e7eb"): string {
  // Create a 1x1 pixel base64 encoded image
  const svg = `
    <svg width="1" height="1" xmlns="http://www.w3.org/2000/svg">
      <rect width="1" height="1" fill="${color}"/>
    </svg>
  `;
  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Predefined blur placeholders for different color schemes
 */
export const blurPlaceholders = {
  light: generateBlurDataURL("#f3f4f6"), // light gray
  dark: generateBlurDataURL("#1f2937"), // dark gray
  primary: generateBlurDataURL("#fb923c"), // orange
  blue: generateBlurDataURL("#3b82f6"), // blue
  purple: generateBlurDataURL("#8b5cf6"), // purple
  green: generateBlurDataURL("#10b981"), // green
  pink: generateBlurDataURL("#ec4899"), // pink
  default: generateBlurDataURL("#e5e7eb"), // default gray
};

/**
 * Get resource image based on category and slug
 * Uses deterministic hash to ensure same slug always gets same image
 */
export const getResourceImage = (
  category: "Blogs" | "White Papers" | "Announcements",
  slug: string
): string => {
  const categoryImages: Record<typeof category, string[]> = {
    "Blogs": ["/use-cases/Media.png", "/use-cases/Media3.png", "/use-cases/Legal.png"],
    "White Papers": ["/use-cases/Legal.png", "/use-cases/legal2.png", "/use-cases/manufacturing3.png"],
    "Announcements": ["/use-cases/Media.png", "/use-cases/manufacturing3.png", "/use-cases/legal2.png"],
  };

  // Use slug to deterministically pick an image (hash-based)
  const images = categoryImages[category];
  const hash = slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return images[hash % images.length];
};