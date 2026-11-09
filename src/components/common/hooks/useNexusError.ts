import { NexusError } from "@avail-project/nexus-core";

function handler(err: unknown) {
  if (err instanceof NexusError) {
    return {
      code: err.code,
      message: err.message,
      context:
        err.context ?? (err as { data?: { context?: unknown } })?.data?.context,
      details:
        err.details ?? (err as { data?: { details?: unknown } })?.data?.details,
    };
  } else {
    console.error("Unexpected error:", err);
    return {
      code: "unexpected_error",
      message: "Oops! Something went wrong. Please try again.",
      context: undefined,
      details: undefined,
    };
  }
}
export function useNexusError() {
  return handler;
}
