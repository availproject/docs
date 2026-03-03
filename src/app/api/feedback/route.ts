import { type NextRequest, NextResponse } from "next/server";
import { getClientIp, isRateLimited } from "./rate-limit";

// --- Validation ---

interface FeedbackPayload {
  rating: "positive" | "negative";
  pagePath: string;
  comment?: string;
  contactInfo?: string;
  imageUrl?: string;
}

function validatePayload(
  body: unknown,
): { valid: true; data: FeedbackPayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body must be a JSON object" };
  }

  const { rating, pagePath, comment, contactInfo, imageUrl } = body as Record<
    string,
    unknown
  >;

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

  if (contactInfo !== undefined && contactInfo !== null) {
    if (typeof contactInfo !== "string") {
      return { valid: false, error: "contactInfo must be a string" };
    }
    if (contactInfo.length > 200) {
      return {
        valid: false,
        error: "contactInfo must be 200 characters or fewer",
      };
    }
  }

  if (imageUrl !== undefined && imageUrl !== null) {
    if (typeof imageUrl !== "string") {
      return { valid: false, error: "imageUrl must be a valid blob URL" };
    }
    try {
      const parsed = new URL(imageUrl);
      if (
        parsed.protocol !== "https:" ||
        !parsed.hostname.endsWith(".public.blob.vercel-storage.com")
      ) {
        return { valid: false, error: "imageUrl must be a valid blob URL" };
      }
    } catch {
      return { valid: false, error: "imageUrl must be a valid blob URL" };
    }
  }

  return {
    valid: true,
    data: {
      rating,
      pagePath,
      comment:
        typeof comment === "string" && comment.length > 0 ? comment : undefined,
      contactInfo:
        typeof contactInfo === "string" && contactInfo.length > 0
          ? contactInfo
          : undefined,
      imageUrl:
        typeof imageUrl === "string" && imageUrl.length > 0
          ? imageUrl
          : undefined,
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

  const { rating, pagePath, comment, contactInfo, imageUrl } = result.data;
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
  const issueBodyParts = [
    `**Page:** ${pagePath}`,
    `**Rating:** ${rating}`,
    `**Timestamp:** ${new Date().toISOString()}`,
    "",
    comment ? `**Comment:**\n\n${comment}` : "*No comment provided*",
  ];

  if (contactInfo) {
    const safeContact = contactInfo.replace(/[`\n\r]/g, "");
    issueBodyParts.push("", `**Contact:** \`${safeContact}\``);
  }

  if (imageUrl) {
    issueBodyParts.push("", `**Screenshot:**\n\n![Screenshot](${imageUrl})`);
  }

  const issueBody = issueBodyParts.join("\n");

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

    const issue = (await response.json()) as { html_url: string };
    return NextResponse.json({ success: true, issueUrl: issue.html_url });
  } catch (error) {
    console.error("Failed to create GitHub issue:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 502 },
    );
  }
}
