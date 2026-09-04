import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

const BASE_URL = "https://docs.availproject.org";

/**
 * Routes that exist outside the docs content source. Without these the
 * homepage and the trust anchor pages are absent from the sitemap, leaving
 * agents no way to discover who publishes this site.
 */
const STATIC_ROUTES = ["/", "/about", "/contact", "/privacy"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE_URL}${route}`,
      changeFrequency: "monthly" as const,
    })),
    ...pages.map((page) => ({
      url: `${BASE_URL}${page.url}`,
      changeFrequency: "weekly" as const,
    })),
  ];
}
