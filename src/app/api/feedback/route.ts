import { type NextRequest, NextResponse } from "next/server";

// --- Rate limiting ---

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10;
let requestsSinceCleanup = 0;

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Lazy cleanup every 100 requests
  requestsSinceCleanup++;
  if (requestsSinceCleanup >= 100) {
    requestsSinceCleanup = 0;
    for (const [key, value] of rateLimitMap) {
      if (now > value.resetAt) rateLimitMap.delete(key);
    }
  }

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// --- Validation ---

interface FeedbackPayload {
  rating: "positive" | "negative";
  pagePath: string;
  comment?: string;
}

function validatePayload(
  body: unknown,
): { valid: true; data: FeedbackPayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object" };
  }

  const { rating, pagePath, comment } = body as Record<string, unknown>;

  if (rating !== "positive" && rating !== "negative") {
    return {
      valid: false,
      error: 'rating must be "positive" or "negative"',
    };
  }

  if (typeof pagePath !== "string" || !pagePath.startsWith("/docs/")) {
    return {
      valid: false,
      error: 'pagePath must be a string starting with "/docs/"',
    };
  }

  if (comment !== undefined && comment !== null) {
    if (typeof comment !== "string") {
      return { valid: false, error: "comment must be a string" };
    }
    if (comment.length > 1000) {
      return {
        valid: false,
        error: "comment must be 1000 characters or fewer",
      };
    }
  }

  return {
    valid: true,
    data: {
      rating,
      pagePath,
      comment:
        typeof comment === "string" && comment.length > 0 ? comment : undefined,
    },
  };
}

// --- Route handler ---

const GITHUB_REPO = "availproject/docs-fumadocs";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 },
    );
  }

  const result = validatePayload(body);
  if (!result.valid) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { rating, pagePath, comment } = result.data;
  const token = process.env.GITHUB_FEEDBACK_TOKEN;

  if (!token) {
    console.error("GITHUB_FEEDBACK_TOKEN is not set");
    return NextResponse.json(
      { error: "Feedback service unavailable" },
      { status: 500 },
    );
  }

  const emoji = rating === "positive" ? "👍" : "👎";
  const title = `Feedback: ${emoji} ${pagePath}`;
  const labels = ["feedback", `feedback:${rating}`];
  const issueBody = [
    `**Page:** ${pagePath}`,
    `**Rating:** ${rating}`,
    `**Timestamp:** ${new Date().toISOString()}`,
    "",
    comment ? `**Comment:**\n\n${comment}` : "*No comment provided*",
  ].join("\n");

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body: issueBody, labels }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `GitHub API error: ${response.status} ${response.statusText}`,
        errorText,
      );
      return NextResponse.json(
        { error: "Failed to submit feedback" },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to create GitHub issue:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 502 },
    );
  }
}
