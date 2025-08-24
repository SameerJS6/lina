import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "@/app/globals.css";

import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Refined & Responsive Scroll Area - Lina",
  description: "A responsive scroll area that feels native on touch, and custom where it matters.",
  keywords: [
    "radix ui",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Components",
    "shadcn",
    "scroll-area",
    "ScrollArea",
    "base ui",
    "adaptive",
    "responsive",
  ],
  creator: "SameerJS6",
  authors: [
    {
      name: "SameerJS6",
      url: "https://sameer.sh",
    },
  ],
  openGraph: {
    title: "Refined & Responsive Scroll Area - Lina",
    description: "A responsive scroll area that feels native on touch, and custom where it matters.",
    type: "website",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
        width: 1280,
        height: 630,
        alt: "Lina",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refined & Responsive Scroll Area - Lina",
    description: "A responsive scroll area that feels native on touch, and custom where it matters.",
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`],
    creator: "@sameerjs6",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL,
  },
  manifest: `${process.env.NEXT_PUBLIC_BASE_URL}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <ThemeProvider defaultTheme="system" attribute="class" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
