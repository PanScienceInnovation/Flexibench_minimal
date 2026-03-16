import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexibench.io';

export const metadata: Metadata = {
  title: "Resources",
  description: "Explore our collection of blogs, white papers, and best practices on data annotation, AI model training, and enterprise data quality workflows.",
  openGraph: {
    title: "Resources | Flexibench",
    description: "Explore our collection of blogs, white papers, and best practices on data annotation, AI model training, and enterprise data quality workflows.",
    type: "website",
    url: `${siteUrl}/resources`,
    images: [
      {
        url: `${siteUrl}/fb-feviconlogo.png`,
        width: 1200,
        height: 630,
        alt: "Flexibench Resources",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Resources | Flexibench",
    description: "Explore our collection of blogs, white papers, and best practices on data annotation, AI model training, and enterprise data quality workflows.",
    images: [`${siteUrl}/fb-feviconlogo.png`],
  },
  other: {
    "chatbot:index": "true",
    "chatbot:searchable": "true",
    "chatbot:category": "resources",
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
