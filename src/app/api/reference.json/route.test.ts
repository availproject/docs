import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/reference.json", () => {
  it("returns valid JSON with correct Content-Type", async () => {
    const res = GET();
    expect(res.headers.get("content-type")).toContain("application/json");
    const data = await res.json();
    expect(data).toBeDefined();
  });

  it("has required top-level keys", async () => {
    const data = await GET().json();
    expect(data).toHaveProperty("networks");
    expect(data).toHaveProperty("contracts");
    expect(data).toHaveProperty("sdks");
    expect(data).toHaveProperty("apis");
    expect(data).toHaveProperty("links");
  });

  it("mainnet has required network fields", async () => {
    const data = await GET().json();
    const mainnet = data.networks.mainnet;
    expect(mainnet.status).toBe("active");
    expect(mainnet.rpc).toBeInstanceOf(Array);
    expect(mainnet.rpc.length).toBeGreaterThan(0);
    expect(mainnet.ws).toBeInstanceOf(Array);
    expect(mainnet.explorer).toBeDefined();
    expect(mainnet.chainSpec).toBeDefined();
  });

  it("contract addresses are valid Ethereum addresses", async () => {
    const data = await GET().json();
    const ethRegex = /^0x[0-9a-fA-F]{40}$/;
    for (const [, contracts] of Object.entries(
      data.contracts as Record<string, Record<string, string>>,
    )) {
      for (const [, address] of Object.entries(contracts)) {
        expect(address).toMatch(ethRegex);
      }
    }
  });

  it("SDK entries have required fields", async () => {
    const data = await GET().json();
    for (const [, sdk] of Object.entries(
      data.sdks as Record<
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

  it("API entries have docs field pointing to doc paths", async () => {
    const data = await GET().json();
    for (const [, api] of Object.entries(
      data.apis as Record<string, { docs: string }>,
    )) {
      expect(api.docs).toMatch(/^\/docs\//);
    }
  });

  it("has Content-Signal and Cache-Control headers", () => {
    const res = GET();
    expect(res.headers.get("Content-Signal")).toBe(
      "ai-train=yes, search=yes, ai-input=yes",
    );
    expect(res.headers.get("Cache-Control")).toContain("public");
  });

  it("all URL values are valid protocols", async () => {
    const data = await GET().json();
    const urlRegex = /^(https?|wss?):\/\//;

    // Check network URLs
    for (const [, net] of Object.entries(
      data.networks as Record<string, { rpc?: string[]; ws?: string[] }>,
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
