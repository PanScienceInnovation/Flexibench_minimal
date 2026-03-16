import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

// Base URL - update this to your actual domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexibench.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flexibench — Enterprise Data Annotation Platform",
    template: "%s | Flexibench"
  },
  description:
    "Modern multimodal annotation platform for AI model training data with quality workflows and integrated tooling.",
  keywords: [
    "data annotation",
    "AI training data",
    "multimodal annotation",
    "enterprise annotation platform",
    "data quality",
    "machine learning",
    "AI model training",
    "annotation workflows"
  ],
  authors: [{ name: "Flexibench" }],
  creator: "Flexibench",
  publisher: "Flexibench",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Flexibench",
    title: "Flexibench — Enterprise Data Annotation Platform",
    description: "Modern multimodal annotation platform for AI model training data with quality workflows and integrated tooling.",
    images: [
      {
        url: `${siteUrl}/fb-feviconlogo.png`,
        width: 1200,
        height: 630,
        alt: "Flexibench Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flexibench — Enterprise Data Annotation Platform",
    description: "Modern multimodal annotation platform for AI model training data with quality workflows and integrated tooling.",
    images: [`${siteUrl}/fb-feviconlogo.png`],
    creator: "@flexibench",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/fb-feviconlogo.png', type: 'image/png', sizes: 'any' },
      { url: '/fb-feviconlogo.png', type: 'image/png', sizes: '32x32' },
      { url: '/fb-feviconlogo.png', type: 'image/png', sizes: '16x16' },
    ],
    shortcut: '/fb-feviconlogo.png',
    apple: '/fb-feviconlogo.png',
  },
  // Chatbot search index optimization
  other: {
    "chatbot:index": "true",
    "chatbot:searchable": "true",
    "chatbot:category": "enterprise-software",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className="scroll-smooth light">
        <head>
          <link rel="icon" href="/fb-feviconlogo.png" type="image/png" sizes="any" />
          <link rel="icon" href="/fb-feviconlogo.png" type="image/png" sizes="32x32" />
          <link rel="icon" href="/fb-feviconlogo.png" type="image/png" sizes="16x16" />
          <link rel="shortcut icon" href="/fb-feviconlogo.png" type="image/png" />
          <link rel="apple-touch-icon" href="/fb-feviconlogo.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
          {/* Structured Data - Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Flexibench",
                "url": siteUrl,
                "logo": `${siteUrl}/fb-feviconlogo.png`,
                "description": "Enterprise data annotation platform for AI model training",
                "foundingDate": "2024",
                "sameAs": [],
              }),
            }}
          />
          {/* Structured Data - WebSite (for rich results) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Flexibench",
                "url": siteUrl,
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${siteUrl}/?q={search_term_string}`
                  },
                  "query-input": "required name=search_term_string"
                }
              }),
            }}
          />
          {/* Structured Data - SoftwareApplication */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "Flexibench",
                "url": siteUrl,
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "Modern multimodal annotation platform for AI model training data with quality workflows and integrated tooling."
              }),
            }}
          />
        </head>
        <body className={`${onest.variable} relative antialiased`}>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Skip to main content
          </a>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
