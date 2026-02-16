import { describe, expect, it } from "vitest";
import nextConfig from "../next.config.mjs";

type RedirectRule = {
  source: string;
  destination: string;
  permanent: boolean;
};

async function getRedirectMap() {
  const redirects = (await nextConfig.redirects?.()) as RedirectRule[];
  return new Map(redirects.map((rule) => [rule.source, rule]));
}

describe("next.config redirects", () => {
  it("redirects legacy DA networks page to build/networks", async () => {
    const redirectMap = await getRedirectMap();
    expect(redirectMap.get("/docs/da/concepts/networks")).toEqual({
      source: "/docs/da/concepts/networks",
      destination: "/docs/da/build/networks",
      permanent: true,
    });
  });

  it("redirects legacy Nexus moved routes", async () => {
    const redirectMap = await getRedirectMap();

    expect(redirectMap.get("/docs/nexus/nexus-examples")?.destination).toBe(
      "/docs/nexus/nexus-sdk/examples",
    );
    expect(
      redirectMap.get("/docs/nexus/nexus-examples/bridge-execute")?.destination,
    ).toBe("/docs/nexus/nexus-sdk/examples/bridge-execute");
    expect(redirectMap.get("/docs/nexus/nexus-quickstart")?.destination).toBe(
      "/docs/nexus/nexus-sdk/quickstart",
    );
    expect(
      redirectMap.get("/docs/nexus/nexus-quickstart/nexus-elements/deposit")
        ?.destination,
    ).toBe("/docs/nexus/nexus-ui-elements/components/deposit");
    expect(redirectMap.get("/docs/nexus/nexus-overview")?.destination).toBe(
      "/docs/nexus",
    );
  });
});
