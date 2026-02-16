import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/source", () => ({
  source: {
    getPages: () => [
      { url: "/docs/da/get-started" },
      { url: "/docs/da/build/networks" },
      { url: "/docs/nexus/get-started" },
    ],
  },
}));

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("returns entries with full URLs", () => {
    const entries = sitemap();
    expect(entries.length).toBe(3);
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/docs\.availproject\.org\/docs\//);
    }
  });

  it("sets changeFrequency to weekly", () => {
    const entries = sitemap();
    for (const entry of entries) {
      expect(entry.changeFrequency).toBe("weekly");
    }
  });

  it("includes correct page URLs", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://docs.availproject.org/docs/da/get-started");
    expect(urls).toContain(
      "https://docs.availproject.org/docs/nexus/get-started",
    );
  });
});
