import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/reference.json", () => {
  it("returns valid JSON with correct Content-Type", async () => {
    const res = GET();
    expect(res.headers.get("content-type")).toContain("application/json");
    const data = await res.json();
    expect(data).toBeDefined();
  });

  it("has _meta with lastUpdated and version", async () => {
    const data = await GET().json();
    expect(data._meta).toBeDefined();
    expect(data._meta.lastUpdated).toBeDefined();
    expect(data._meta.version).toBeDefined();
  });

  it("has required top-level keys", async () => {
    const data = await GET().json();
    expect(data).toHaveProperty("_meta");
    expect(data).toHaveProperty("da");
    expect(data).toHaveProperty("nexus");
    expect(data).toHaveProperty("links");
  });

  it("da.networks mainnet has required fields", async () => {
    const data = await GET().json();
    const mainnet = data.da.networks.mainnet;
    expect(mainnet.status).toBe("active");
    expect(mainnet.rpc).toBeInstanceOf(Array);
    expect(mainnet.rpc.length).toBeGreaterThan(0);
    expect(mainnet.ws).toBeInstanceOf(Array);
    expect(mainnet.explorer).toBeDefined();
    expect(mainnet.chainSpec).toBeDefined();
  });

  it("da.contracts addresses are valid Ethereum addresses", async () => {
    const data = await GET().json();
    const ethRegex = /^0x[0-9a-fA-F]{40}$/;
    for (const [, contracts] of Object.entries(
      data.da.contracts as Record<string, Record<string, string>>,
    )) {
      for (const [, address] of Object.entries(contracts)) {
        expect(address).toMatch(ethRegex);
      }
    }
  });

  it("da.sdks entries have required fields", async () => {
    const data = await GET().json();
    for (const [, sdk] of Object.entries(
      data.da.sdks as Record<
        string,
        { package: string; version: string; install: string; docs: string }
      >,
    )) {
      expect(sdk.package).toBeDefined();
      expect(sdk.version).toBeDefined();
      expect(sdk.install).toBeDefined();
      expect(sdk.docs).toBeDefined();
    }
  });

  it("da.apis entries have docs field pointing to doc paths", async () => {
    const data = await GET().json();
    for (const [, api] of Object.entries(
      data.da.apis as Record<string, { docs: string }>,
    )) {
      expect(api.docs).toMatch(/^\/docs\//);
    }
  });

  it("nexus.vault_contracts has mainnet and testnet arrays with valid addresses", async () => {
    const data = await GET().json();
    const ethRegex = /^0x[0-9a-fA-F]{40}$/;

    expect(data.nexus.vault_contracts.mainnet).toBeInstanceOf(Array);
    expect(data.nexus.vault_contracts.mainnet.length).toBe(12);
    expect(data.nexus.vault_contracts.testnet).toBeInstanceOf(Array);
    expect(data.nexus.vault_contracts.testnet.length).toBe(8);

    for (const entry of data.nexus.vault_contracts.mainnet) {
      expect(entry.address).toMatch(ethRegex);
      expect(entry.chainId).toBeTypeOf("number");
    }
    for (const entry of data.nexus.vault_contracts.testnet) {
      expect(entry.address).toMatch(ethRegex);
      expect(entry.chainId).toBeTypeOf("number");
    }
  });

  it("nexus.token_contracts has USDC and USDT with valid addresses", async () => {
    const data = await GET().json();
    const ethRegex = /^0x[0-9a-fA-F]{40}$/;

    expect(data.nexus.token_contracts.usdc.mainnet).toBeInstanceOf(Array);
    expect(data.nexus.token_contracts.usdc.testnet).toBeInstanceOf(Array);
    expect(data.nexus.token_contracts.usdt.mainnet).toBeInstanceOf(Array);
    expect(data.nexus.token_contracts.usdt.testnet).toBeInstanceOf(Array);

    for (const entry of data.nexus.token_contracts.usdc.mainnet) {
      expect(entry.address).toMatch(ethRegex);
    }
    for (const entry of data.nexus.token_contracts.usdt.mainnet) {
      expect(entry.address).toMatch(ethRegex);
    }
  });

  it("nexus.supported_chains entries have required fields", async () => {
    const data = await GET().json();

    for (const chain of data.nexus.supported_chains.mainnet) {
      expect(chain.chainId).toBeTypeOf("number");
      expect(chain.nativeToken).toBeDefined();
      expect(chain.supportedTokens).toBeInstanceOf(Array);
      expect(chain.supportedTokens.length).toBeGreaterThan(0);
    }
    for (const chain of data.nexus.supported_chains.testnet) {
      expect(chain.chainId).toBeTypeOf("number");
      expect(chain.nativeToken).toBeDefined();
      expect(chain.supportedTokens).toBeInstanceOf(Array);
      expect(chain.supportedTokens.length).toBeGreaterThan(0);
    }
  });

  it("nexus.tokens entries have symbol and valid decimals", async () => {
    const data = await GET().json();

    for (const token of data.nexus.tokens) {
      expect(token.symbol).toBeDefined();
      expect(token.decimals).toBeTypeOf("number");
      expect(token.decimals).toBeGreaterThanOrEqual(0);
      expect(token.decimals).toBeLessThanOrEqual(18);
    }
  });

  it("nexus.sdks entries have docs path", async () => {
    const data = await GET().json();

    expect(data.nexus.sdks.nexus_core.package).toBeDefined();
    expect(data.nexus.sdks.nexus_core.docs).toMatch(/^\/docs\//);
    expect(data.nexus.sdks.nexus_elements.registry).toBeDefined();
    expect(data.nexus.sdks.nexus_elements.docs).toMatch(/^\/docs\//);
  });

  it("links is present at root level", async () => {
    const data = await GET().json();
    expect(data.links).toBeDefined();
    expect(data.links.github).toBeDefined();
    expect(data.links.docs).toBeDefined();
  });

  it("has Content-Signal and Cache-Control headers", () => {
    const res = GET();
    expect(res.headers.get("Content-Signal")).toBe(
      "ai-train=yes, search=yes, ai-input=yes",
    );
    expect(res.headers.get("Cache-Control")).toContain("public");
  });

  it("all URL values in da.networks are valid protocols", async () => {
    const data = await GET().json();
    const urlRegex = /^(https?|wss?):\/\//;

    for (const [, net] of Object.entries(
      data.da.networks as Record<string, { rpc?: string[]; ws?: string[] }>,
    )) {
      for (const rpc of net.rpc ?? []) {
        expect(rpc).toMatch(urlRegex);
      }
      for (const ws of net.ws ?? []) {
        expect(ws).toMatch(urlRegex);
      }
    }
  });
});
