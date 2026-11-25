import { describe, expect, it } from "vitest";
import { apiErrorBody, apiErrorResponse } from "./api-error";

const DETAILS = {
  code: "API_NOT_FOUND",
  message: "No API endpoint exists at the requested path.",
  resolution: "See /openapi.json for available endpoints.",
  path: "/api/missing",
};

describe("API errors", () => {
  it("uses a stable error envelope", () => {
    expect(apiErrorBody(DETAILS)).toEqual({ error: DETAILS });
  });

  it("omits an unavailable path", () => {
    const { path: _path, ...details } = DETAILS;
    expect(apiErrorBody(details)).toEqual({ error: details });
  });

  it("returns JSON with no-store and agent headers", async () => {
    const response = apiErrorResponse(404, DETAILS);

    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe(
      "application/json; charset=utf-8",
    );
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
    expect(response.headers.get("vary")).toBeNull();
    expect(await response.json()).toEqual({ error: DETAILS });
  });
});
