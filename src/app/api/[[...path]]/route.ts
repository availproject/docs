import type { NextRequest } from "next/server";
import { apiErrorResponse } from "@/lib/api-error";

export const dynamic = "force-dynamic";

/** Low-priority fallback: concrete API routes take precedence over this route. */
function unknownApi(request: NextRequest): Response {
  const path = request.nextUrl.pathname;
  return apiErrorResponse(404, {
    code: "API_NOT_FOUND",
    message: `No API endpoint exists at ${path}.`,
    resolution:
      "Fetch /openapi.json for the available endpoints, or /llms.txt for documentation indexes.",
    path,
  });
}

export {
  unknownApi as DELETE,
  unknownApi as GET,
  unknownApi as HEAD,
  unknownApi as OPTIONS,
  unknownApi as PATCH,
  unknownApi as POST,
  unknownApi as PUT,
};
