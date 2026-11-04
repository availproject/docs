import { afterEach, describe, expect, it, vi } from "vitest";
import { getClientIp } from "./rate-limit";

function requestWith(headers: Record<string, string>) {
  return new Request("https://docs.test/api/feedback", { headers });
}

describe("getClientIp", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses the last entry by default, so a client value is ignored", () => {
    const request = requestWith({ "x-forwarded-for": "6.6.6.6, 1.1.1.1" });
    expect(getClientIp(request)).toBe("1.1.1.1");
  });

  it("counts trusted proxies from the right", () => {
    vi.stubEnv("TRUSTED_PROXY_HOPS", "2");
    const request = requestWith({
      "x-forwarded-for": "6.6.6.6, 1.1.1.1, 2.2.2.2",
    });
    expect(getClientIp(request)).toBe("1.1.1.1");
  });

  it("uses the first entry when the list is shorter than the hop count", () => {
    vi.stubEnv("TRUSTED_PROXY_HOPS", "2");
    const request = requestWith({ "x-forwarded-for": "1.1.1.1" });
    expect(getClientIp(request)).toBe("1.1.1.1");
  });

  it.each(["", "0", "-1", "abc"])("treats hop count %j as 1", (hops) => {
    vi.stubEnv("TRUSTED_PROXY_HOPS", hops);
    const request = requestWith({ "x-forwarded-for": "6.6.6.6, 1.1.1.1" });
    expect(getClientIp(request)).toBe("1.1.1.1");
  });

  it("falls back to x-real-ip, then unknown", () => {
    expect(getClientIp(requestWith({ "x-real-ip": "1.1.1.1" }))).toBe(
      "1.1.1.1",
    );
    expect(getClientIp(requestWith({}))).toBe("unknown");
  });
});
