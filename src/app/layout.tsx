import "./global.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { PostHogProvider } from "@/providers/PostHogProvider";
import Web3Provider from "@/providers/Web3Provider";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://docs.availproject.org",
  ),
  title: {
    default: "Avail Documentation",
    template: "%s | Avail Docs",
  },
  description:
    "Documentation for Avail - the Web3 infrastructure layer for data availability",
  openGraph: {
    type: "website",
    siteName: "Avail Docs",
    title: {
      default: "Avail Documentation",
      template: "%s | Avail Docs",
    },
    description: "Documentation for Avail - Build with Avail",
    images: [
      {
        url: "/opengraph-preview.png",
        width: 1200,
        height: 630,
        alt: "Avail Docs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Avail Documentation",
      template: "%s | Avail Docs",
    },
    description: "Documentation for Avail - Build with Avail",
    images: ["/opengraph-preview.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          href="/fonts/delight/Web-TT/Delight-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/delight/Web-TT/Delight-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
        >
          Skip to content
        </a>
        <PostHogProvider>
          <Web3Provider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </Web3Provider>
        </PostHogProvider>
      </body>
    </html>
  );
}
