import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flexibench.io';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Flexibench. Request a demo, contact sales, or reach out to our team for enterprise data annotation solutions.",
  openGraph: {
    title: "Contact Us | Flexibench",
    description: "Get in touch with Flexibench. Request a demo, contact sales, or reach out to our team for enterprise data annotation solutions.",
    type: "website",
    url: `${siteUrl}/contact`,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "chatbot:index": "false", // Contact pages typically don't need chatbot indexing
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
