import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock source and products before importing the module under test
const mockPages = [
  {
    url: "/docs/da/get-started",
    data: {
      title: "Get Started",
      description: "Welcome to Avail DA",
      getText: vi.fn().mockResolvedValue("# Get Started\n\nWelcome content"),
    },
  },
  {
    url: "/docs/da/build/networks",
    data: {
      title: "Networks",
      description: "Network configuration",
      getText: vi.fn().mockResolvedValue("# Networks\n\nNetwork content"),
    },
  },
  {
    url: "/docs/da/build/interact/faucet",
    data: {
      title: "Faucet",
      description: "",
      getText: vi.fn().mockResolvedValue("# Faucet\n\nFaucet content"),
    },
  },
  {
    url: "/docs/nexus/get-started",
    data: {
      title: "Nexus Get Started",
      description: "Welcome to Nexus",
      getText: vi
        .fn()
        .mockResolvedValue("# Nexus Get Started\n\nNexus content"),
    },
  },
];

vi.mock("@/lib/source", () => ({
  source: {
    getPages: () => mockPages,
  },
}));

vi.mock("@/lib/products", () => ({
  products: [
    {
      slug: "da",
      label: "Avail DA",
      basePath: "/docs/da",
      startUrl: "/docs/da/get-started",
      logoKey: "avail-da",
    },
    {
      slug: "nexus",
      label: "Avail Nexus",
      basePath: "/docs/nexus",
      startUrl: "/docs/nexus/get-started",
      logoKey: "avail-nexus",
    },
  ],
}));

import { generateLlmsFullTxt, generateLlmsTxt } from "./llms";

describe("generateLlmsTxt", () => {
  let output: string;

  beforeEach(() => {
    output = generateLlmsTxt();
  });

  it("starts with heading", () => {
    expect(output.startsWith("# Avail Documentation")).toBe(true);
  });

  it("has Quick Reference section with RPC URLs", () => {
    expect(output).toContain("## Quick Reference");
    expect(output).toContain("https://mainnet-rpc.avail.so/rpc");
  });

  it('has "If you want to..." section', () => {
    expect(output).toContain("## If you want to...");
  });

  it("has All pages section listing pages per product", () => {
    expect(output).toContain("## All pages");
    expect(output).toContain("### Avail DA");
    expect(output).toContain("### Avail Nexus");
  });

  it("links use correct /docs/ prefix", () => {
    const links = output.match(/\]\(\/docs\/[^)]+\)/g) || [];
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toMatch(/\]\(\/docs\//);
    }
  });

  it("pages with descriptions use title: description format", () => {
    // "Get Started" has description "Welcome to Avail DA"
    expect(output).toContain(
      "- [Get Started](/docs/da/get-started): Welcome to Avail DA",
    );
  });

  it("pages without descriptions use title-only format", () => {
    // "Faucet" has empty description
    expect(output).toContain("- [Faucet](/docs/da/build/interact/faucet)");
    // Make sure there's no trailing colon
    expect(output).not.toContain("- [Faucet](/docs/da/build/interact/faucet):");
  });

  it("includes all 9 Nexus concept URLs", () => {
    const conceptUrls = [
      "/docs/nexus/concepts/chain-abstraction",
      "/docs/nexus/concepts/intent",
      "/docs/nexus/concepts/intent-lifecycle",
      "/docs/nexus/concepts/solvers",
      "/docs/nexus/concepts/xcs-swaps",
      "/docs/nexus/concepts/allowances",
      "/docs/nexus/concepts/bridge-v-swap",
      "/docs/nexus/concepts/nexus-ops",
      "/docs/nexus/concepts/source-chain-selection",
    ];
    for (const url of conceptUrls) {
      expect(output).toContain(url);
    }
  });

  it("references /api/reference.json and /llms-full.txt", () => {
    expect(output).toContain("/api/reference.json");
    expect(output).toContain("/llms-full.txt");
  });
});

describe("generateLlmsFullTxt", () => {
  it("without section, includes pages from all products", async () => {
    const output = await generateLlmsFullTxt();
    expect(output).toContain("## Avail DA");
    expect(output).toContain("## Avail Nexus");
    expect(output).toContain("### Get Started");
    expect(output).toContain("### Nexus Get Started");
  });

  it("with section da/build, only includes pages under /docs/da/build/", async () => {
    const output = await generateLlmsFullTxt("da/build");
    expect(output).toContain("### Networks");
    expect(output).toContain("### Faucet");
    // Should NOT include top-level da pages or nexus pages
    expect(output).not.toContain("### Get Started");
    expect(output).not.toContain("### Nexus Get Started");
  });

  it("with nonexistent section, returns header only", async () => {
    const output = await generateLlmsFullTxt("nonexistent/section");
    expect(output).toContain("# Avail Documentation");
    expect(output).not.toContain("## Avail DA");
    expect(output).not.toContain("## Avail Nexus");
  });

  it("section filtering is case-insensitive", async () => {
    const output = await generateLlmsFullTxt("DA/BUILD");
    expect(output).toContain("### Networks");
    expect(output).toContain("### Faucet");
  });

  it("includes filtered-section note", async () => {
    const output = await generateLlmsFullTxt("da/build");
    expect(output).toContain("Filtered to section: da/build");
  });
});
