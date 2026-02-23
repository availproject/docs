/**
 * Post-processes markdown from getText("processed") to strip MDX/JSX
 * components and convert them to plain markdown equivalents.
 *
 * Runs AFTER the remark pipeline on the serialized string only,
 * so it cannot affect HTML rendering. Used by the markdown API
 * route and llms-full.txt generation.
 */

// ---------------------------------------------------------------------------
// Code-block masking
// ---------------------------------------------------------------------------

const CODE_FENCE = /^(`{3,})[^\n]*\n[\s\S]*?\n\1\s*$/gm;

function maskCodeBlocks(content: string): { masked: string; blocks: string[] } {
  const blocks: string[] = [];
  const masked = content.replace(CODE_FENCE, (match) => {
    blocks.push(match);
    return `<!--CODE_BLOCK_${blocks.length - 1}-->`;
  });
  return { masked, blocks };
}

function restoreCodeBlocks(content: string, blocks: string[]): string {
  return content.replace(/<!--CODE_BLOCK_(\d+)-->/g, (_, idx) => {
    return blocks[Number(idx)] ?? "";
  });
}

// ---------------------------------------------------------------------------
// Phase 2: Strip noise
// ---------------------------------------------------------------------------

function stripImports(s: string): string {
  return s.replace(/^import\s+.*\s+from\s+["'].*["'];?\s*$/gm, "");
}

function stripSelfClosingTags(s: string, tags: string[]): string {
  for (const tag of tags) {
    const re = new RegExp(`<${tag}[\\s\\S]*?/>`, "g");
    s = s.replace(re, "");
  }
  return s;
}

function stripIconExpressions(s: string): string {
  // Strip icon={<ComponentName />} props from JSX tags.
  // Must run BEFORE card transforms because the /> inside icon props
  // prematurely ends the self-closing tag regex match.
  return s.replace(/\s*icon=\{<[A-Z]\w*\s*\/>\}/g, "");
}

function stripShowLineNumbers(s: string): string {
  // Strip showLineNumbers from code fence opening lines.
  // Must run BEFORE code block masking since the attribute is inside fences.
  s = s.replace(/^(```\w+.*?)\s*showLineNumbers\s*/gm, "$1 ");
  return s.replace(/^(```\w+)\s+$/gm, "$1");
}

// ---------------------------------------------------------------------------
// Phase 3: Unwrap transparent wrappers
// ---------------------------------------------------------------------------

function unwrapTags(s: string, tags: string[]): string {
  for (const tag of tags) {
    const re = new RegExp(
      `<${tag}(?:\\s[^>]*)?>\\s*([\\s\\S]*?)\\s*</${tag}>`,
      "g",
    );
    s = s.replace(re, "$1");
  }
  return s;
}

// ---------------------------------------------------------------------------
// Phase 4: Transform semantic components
// ---------------------------------------------------------------------------

const CALLOUT_TYPE_LABELS: Record<string, string> = {
  info: "Note",
  warning: "Warning",
  error: "Error",
  default: "Note",
};

function transformCallouts(s: string): string {
  const re = /<Callout(?:\s[^>]*)?>[\s]*?([\s\S]*?)[\s]*?<\/Callout>/g;

  return s.replace(re, (match, rawContent: string) => {
    // Extract type and title from the opening tag
    const typeMatch = match.match(/type="(\w+)"/);
    const titleMatch = match.match(/title="([^"]*)"/);

    const type = typeMatch?.[1] ?? "default";
    const label = titleMatch?.[1] ?? CALLOUT_TYPE_LABELS[type] ?? "Note";

    const content = rawContent.trim();
    const lines = content.split("\n");
    const quoted = lines.map((l) => `> ${l}`).join("\n");

    return `> **${label}**\n>\n${quoted}`;
  });
}

function extractAttr(tag: string, attr: string): string | undefined {
  const re = new RegExp(`${attr}="([^"]*)"`, "");
  return re.exec(tag)?.[1];
}

function transformCards(s: string): string {
  // Self-closing cards: <IconCard ... /> <ConceptCard ... /> <LinkCard ... /> <Card ... />
  const selfClosing =
    /<(?:IconCard|ConceptCard|LinkCard|Card)\s+([\s\S]*?)\/>/g;
  s = s.replace(selfClosing, (_, attrs: string) => {
    const title = extractAttr(attrs, "title");
    const description = extractAttr(attrs, "description");
    const href = extractAttr(attrs, "href");

    if (!title || !href) return "";

    const desc = description ? ` — ${description}` : "";
    return `- [**${title}**](${href})${desc}`;
  });

  // Cards with children (rare): <IconCard ...>children</IconCard>
  const withChildren =
    /<(?:IconCard|ConceptCard|LinkCard|Card)\s+([\s\S]*?)>([\s\S]*?)<\/(?:IconCard|ConceptCard|LinkCard|Card)>/g;
  s = s.replace(withChildren, (_, attrs: string, children: string) => {
    const title = extractAttr(attrs, "title");
    const href = extractAttr(attrs, "href");
    const childText = children.trim();

    if (!title || !href) return childText;

    const desc = childText ? ` — ${childText}` : "";
    return `- [**${title}**](${href})${desc}`;
  });

  return s;
}

function transformTabs(s: string): string {
  const tabsRe =
    /<(?:Tabs|CodeTabs)[^>]*>\s*([\s\S]*?)\s*<\/(?:Tabs|CodeTabs)>/g;

  return s.replace(tabsRe, (_, inner: string) => {
    // Extract trigger labels: <TabsTrigger value="X">Label</TabsTrigger>
    const triggerRe =
      /<TabsTrigger\s+value="([^"]*)"[^>]*>([\s\S]*?)<\/TabsTrigger>/g;
    const labels = new Map<string, string>();
    for (const match of inner.matchAll(triggerRe)) {
      labels.set(match[1], match[2].trim());
    }

    // Extract content blocks: <TabsContent value="X">...content...</TabsContent>
    const contentRe =
      /<TabsContent\s+value="([^"]*)"[^>]*>\s*([\s\S]*?)\s*<\/TabsContent>/g;
    const sections: string[] = [];
    for (const match of inner.matchAll(contentRe)) {
      const label = labels.get(match[1]) ?? match[1];
      const content = match[2].trim();
      sections.push(`#### ${label}\n\n${content}`);
    }

    return sections.join("\n\n");
  });
}

function stripPageFooter(s: string): string {
  // Self-closing: <PageFooter ... />
  // Multi-line with props spanning lines
  return s.replace(/<PageFooter\s+[\s\S]*?\/>/g, "");
}

// ---------------------------------------------------------------------------
// Phase 5: Cleanup residuals
// ---------------------------------------------------------------------------

function cleanupResiduals(s: string): string {
  // <Step ...>text</Step> → **text**
  s = s.replace(/<Step[^>]*>([\s\S]*?)<\/Step>/g, (_, content: string) => {
    return `**${content.trim()}**`;
  });

  // Self-closing PascalCase JSX tags: <Compass />, <Send />, etc.
  s = s.replace(/<[A-Z]\w*\s*\/>/g, "");

  // Strip className="..." from remaining HTML
  s = s.replace(/\s*className="[^"]*"/g, "");

  // Strip data-slot="..." from remaining HTML
  s = s.replace(/\s*data-slot="[^"]*"/g, "");

  // Strip <div ...> and </div> wrapper tags
  s = s.replace(/<div[^>]*>\s*/g, "");
  s = s.replace(/<\/div>\s*/g, "");

  // Strip <TabsList> and its contents (leftover from nested CodeTabs/Tabs)
  s = s.replace(/<TabsList>[\s\S]*?<\/TabsList>/g, "");

  // {" "} JSX whitespace expressions → space
  s = s.replace(/\{"\s*"\}/g, " ");

  // <br/>, <br>, <br></br> → newline
  s = s.replace(/<br\s*\/?>|<br><\/br>/g, "\n");

  // <ins>text</ins> → text
  s = s.replace(/<ins>([\s\S]*?)<\/ins>/g, "$1");

  // Strip {<Expression />} icon expressions in attributes (leftover from icon props)
  s = s.replace(/\{<[A-Z]\w*\s*\/>\}/g, "");

  // Collapse 3+ consecutive blank lines → 2
  s = s.replace(/\n{3,}/g, "\n\n");

  return s;
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export function cleanMarkdownForAgents(content: string): string {
  // Pre-phase: Strip attributes from code fence lines before masking
  let result = stripShowLineNumbers(content);

  // Phase 1: Mask code blocks to protect them from transforms
  const { masked, blocks } = maskCodeBlocks(result);
  result = masked;

  // Phase 2: Strip noise
  result = stripIconExpressions(result);
  result = stripImports(result);
  result = stripSelfClosingTags(result, [
    "ComponentPreview",
    "ComponentSource",
    "Feedback",
  ]);

  // Phase 3: Unwrap transparent wrappers
  result = unwrapTags(result, ["Steps", "CodeCollapsibleWrapper"]);

  // Phase 4: Transform semantic components (inside-out)
  result = transformCallouts(result);
  result = transformCards(result);
  result = unwrapTags(result, [
    "IconCardGrid",
    "ConceptCardGrid",
    "LinkCardGrid",
    "Cards",
  ]);
  result = transformTabs(result);
  result = stripPageFooter(result);

  // Phase 5: Cleanup residuals
  result = cleanupResiduals(result);

  // Phase 6: Restore code blocks
  result = restoreCodeBlocks(result, blocks);

  return `${result.trim()}\n`;
}
