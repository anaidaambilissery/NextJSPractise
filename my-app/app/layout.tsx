import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://technical-blog-example.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Technical Blog - Web Development & Modern Tech",
    template: "%s | Technical Blog",
  },
  description:
    "A clean, high-performance technical blog covering Next.js, TypeScript, performance optimizations, and web development best practices.",
  keywords: [
    "Next.js",
    "React",
    "Web Development",
    "TypeScript",
    "JavaScript",
    "SEO",
    "Performance",
  ],
  authors: [{ name: "Technical Blog Team" }],
  publisher: "Technical Blog",
  category: "Technology",
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Technical Blog - Web Development & Modern Tech",
    description:
      "A clean, high-performance technical blog covering Next.js, TypeScript, performance optimizations, and web development best practices.",
    url: siteUrl,
    siteName: "Technical Blog",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Blog - Web Development & Modern Tech",
    description:
      "A clean, high-performance technical blog covering Next.js, TypeScript, performance optimizations, and web development best practices.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
