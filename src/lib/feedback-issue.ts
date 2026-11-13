export const DOCS_REPO_URL = "https://github.com/availproject/docs";

export type FeedbackRating = "positive" | "negative";

// Link to a new issue on the docs repo, using the "Docs feedback" issue
// form (.github/ISSUE_TEMPLATE/feedback.yml) with the page filled in.
export function feedbackIssueUrl(
  pagePath?: string,
  rating?: FeedbackRating,
): string {
  const params = new URLSearchParams({ template: "feedback.yml" });
  const emoji =
    rating === "positive" ? "👍 " : rating === "negative" ? "👎 " : "";

  if (pagePath) {
    params.set("title", `Feedback: ${emoji}${pagePath}`);
    params.set("page", pagePath);
  } else {
    params.set("title", "Feedback: ");
  }

  return `${DOCS_REPO_URL}/issues/new?${params.toString()}`;
}
