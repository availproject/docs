import { describe, expect, it } from "vitest";
import { DOCS_REPO_URL, feedbackIssueUrl } from "./feedback-issue";

function params(url: string) {
  expect(url.startsWith(`${DOCS_REPO_URL}/issues/new?`)).toBe(true);
  return new URL(url).searchParams;
}

describe("feedbackIssueUrl", () => {
  it("opens the feedback issue form with the page filled in", () => {
    const query = params(feedbackIssueUrl("/docs/da/build", "negative"));

    expect(query.get("template")).toBe("feedback.yml");
    expect(query.get("title")).toBe("Feedback: 👎 /docs/da/build");
    expect(query.get("page")).toBe("/docs/da/build");
  });

  it("marks positive ratings in the title", () => {
    const query = params(feedbackIssueUrl("/docs/nexus", "positive"));

    expect(query.get("title")).toBe("Feedback: 👍 /docs/nexus");
  });

  it("works without a page", () => {
    const query = params(feedbackIssueUrl());

    expect(query.get("title")).toBe("Feedback: ");
    expect(query.has("page")).toBe(false);
  });

  it("encodes the page path so it cannot add parameters", () => {
    const query = params(feedbackIssueUrl("/docs/a&labels=bug#x"));

    expect(query.get("page")).toBe("/docs/a&labels=bug#x");
    expect(query.has("labels")).toBe(false);
  });
});
