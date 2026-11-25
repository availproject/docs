import { AGENT_HEADERS } from "@/lib/agent-headers";

export interface ApiErrorDetails {
  code: string;
  message: string;
  resolution: string;
  path?: string;
}

export const API_ERROR_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Signal": AGENT_HEADERS["Content-Signal"],
  "X-Robots-Tag": AGENT_HEADERS["X-Robots-Tag"],
} as const;

/** Stable JSON error envelope shared by the public documentation APIs. */
export function apiErrorBody(details: ApiErrorDetails) {
  return {
    error: {
      code: details.code,
      message: details.message,
      resolution: details.resolution,
      ...(details.path ? { path: details.path } : {}),
    },
  };
}

/** Creates a structured API error without falling back to an HTML error page. */
export function apiErrorResponse(
  status: number,
  details: ApiErrorDetails,
): Response {
  return new Response(JSON.stringify(apiErrorBody(details)), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...API_ERROR_HEADERS,
    },
  });
}
