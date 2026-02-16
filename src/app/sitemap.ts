import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

const BASE_URL = "https://docs.availproject.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();

  return pages.map((page) => ({
    url: `${BASE_URL}${page.url}`,
    changeFrequency: "weekly" as const,
  }));
}
