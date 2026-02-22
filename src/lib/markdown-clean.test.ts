import { describe, expect, it } from "vitest";
import { cleanMarkdownForAgents } from "./markdown-clean";

// ---------------------------------------------------------------------------
// Callout transforms
// ---------------------------------------------------------------------------

describe("Callout", () => {
  it("transforms basic callout to blockquote with Note label", () => {
    const input = `<Callout>
Some content here.
</Callout>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("> **Note**");
    expect(result).toContain("> Some content here.");
  });

  it("uses type label for info/warning/error", () => {
    const input = `<Callout type="warning">
Watch out!
</Callout>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("> **Warning**");
    expect(result).toContain("> Watch out!");
  });

  it("uses custom title when provided", () => {
    const input = `<Callout type="info" title="Important">
Read this carefully.
</Callout>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("> **Important**");
    expect(result).toContain("> Read this carefully.");
  });

  it("preserves multi-line content with markdown", () => {
    const input = `<Callout>
**Prerequisites:** Before running the code above, you'll need:
- [Testnet AVAIL tokens](/docs/da/build/interact/faucet) — free from the faucet
- [An App ID](/docs/da/build/interact/app-id) — identifies your data namespace
</Callout>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("> **Prerequisites:**");
    expect(result).toContain("> - [Testnet AVAIL tokens]");
    expect(result).toContain("> - [An App ID]");
  });
});

// ---------------------------------------------------------------------------
// Tabs transforms
// ---------------------------------------------------------------------------

describe("Tabs", () => {
  it("transforms tabs into headed sections", () => {
    const input = `<Tabs defaultValue="typescript">
  <TabsList>
    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
    <TabsTrigger value="rust">Rust</TabsTrigger>
  </TabsList>
  <TabsContent value="typescript">

TypeScript code here.

  </TabsContent>
  <TabsContent value="rust">

Rust code here.

  </TabsContent>
</Tabs>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("#### TypeScript");
    expect(result).toContain("TypeScript code here.");
    expect(result).toContain("#### Rust");
    expect(result).toContain("Rust code here.");
    // JSX tags should be gone
    expect(result).not.toContain("<Tabs");
    expect(result).not.toContain("<TabsList");
    expect(result).not.toContain("<TabsTrigger");
    expect(result).not.toContain("<TabsContent");
  });

  it("transforms three-tab block (TypeScript/Rust/Go)", () => {
    const input = `<Tabs defaultValue="typescript">
  <TabsList>
    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
    <TabsTrigger value="rust">Rust</TabsTrigger>
    <TabsTrigger value="go">Go</TabsTrigger>
  </TabsList>
  <TabsContent value="typescript">TS content</TabsContent>
  <TabsContent value="rust">Rust content</TabsContent>
  <TabsContent value="go">Go content</TabsContent>
</Tabs>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("#### TypeScript");
    expect(result).toContain("#### Rust");
    expect(result).toContain("#### Go");
  });

  it("transforms CodeTabs the same as Tabs", () => {
    const input = `<CodeTabs>
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">

Run the CLI command.

  </TabsContent>
  <TabsContent value="manual">

Do it manually.

  </TabsContent>
</CodeTabs>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("#### CLI");
    expect(result).toContain("#### Manual");
    expect(result).not.toContain("<CodeTabs");
  });
});

// ---------------------------------------------------------------------------
// Card transforms
// ---------------------------------------------------------------------------

describe("Cards", () => {
  it("transforms self-closing IconCard to bullet link", () => {
    const input = `<IconCard
    icon={<Compass />}
    title="Get Started"
    description="An overview of Avail DA and quick links."
    href="/docs/da/get-started"
  />`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain(
      "- [**Get Started**](/docs/da/get-started) — An overview of Avail DA and quick links.",
    );
  });

  it("transforms ConceptCard the same way", () => {
    const input = `<ConceptCard
    title="Data Availability"
    description="Learn how data is stored."
    href="/docs/da/concepts"
  />`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain(
      "- [**Data Availability**](/docs/da/concepts) — Learn how data is stored.",
    );
  });

  it("transforms cards inside grid wrapper into a list", () => {
    const input = `<IconCardGrid>
  <IconCard
    icon={<Send />}
    title="Post Data"
    description="Full read & write tutorial."
    href="/docs/da/build/interact/read-write-on-avail"
  />
  <IconCard
    icon={<Cube />}
    title="Deploy a Rollup"
    description="Launch a rollup on Avail DA."
    href="/docs/da/build/rollups"
  />
</IconCardGrid>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("- [**Post Data**]");
    expect(result).toContain("- [**Deploy a Rollup**]");
    expect(result).not.toContain("<IconCardGrid");
    expect(result).not.toContain("<IconCard");
  });

  it("handles card with no description", () => {
    const input = `<LinkCard title="Read More" href="/docs/da/concepts" />`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("- [**Read More**](/docs/da/concepts)");
    expect(result).not.toContain(" — ");
  });
});

// ---------------------------------------------------------------------------
// Wrapper unwrapping
// ---------------------------------------------------------------------------

describe("Wrappers", () => {
  it("unwraps Steps, keeping children", () => {
    const input = `<Steps>

### Step 1: Install

Run the install command.

### Step 2: Configure

Set up the config.

</Steps>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("### Step 1: Install");
    expect(result).toContain("### Step 2: Configure");
    expect(result).not.toContain("<Steps");
  });

  it("unwraps CodeCollapsibleWrapper, keeping code block", () => {
    const input = `<CodeCollapsibleWrapper className="mt-4">

\`\`\`ts title="DepositWidgetProps"
interface DepositWidgetProps {
  heading?: string;
}
\`\`\`

</CodeCollapsibleWrapper>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("interface DepositWidgetProps");
    expect(result).not.toContain("<CodeCollapsibleWrapper");
  });
});

// ---------------------------------------------------------------------------
// Code block safety
// ---------------------------------------------------------------------------

describe("Code block safety", () => {
  it("does NOT modify JSX-like content inside code fences", () => {
    const input = `Some text.

\`\`\`tsx
<Callout type="info">
  This is JSX inside a code block.
</Callout>

<Tabs defaultValue="a">
  <TabsTrigger value="a">A</TabsTrigger>
</Tabs>
\`\`\`

More text.`;
    const result = cleanMarkdownForAgents(input);
    // The code block content should be preserved exactly
    expect(result).toContain('<Callout type="info">');
    expect(result).toContain("<Tabs");
    expect(result).toContain("<TabsTrigger");
  });

  it("preserves code blocks while transforming surrounding content", () => {
    const input = `<Callout type="warning">
Watch out!
</Callout>

\`\`\`tsx
<IconCard title="Example" href="/test" />
\`\`\`

<IconCard title="Real Card" description="This is real." href="/docs/da" />`;
    const result = cleanMarkdownForAgents(input);
    // Callout outside code should be transformed
    expect(result).toContain("> **Warning**");
    // Code block content should be preserved
    expect(result).toContain('<IconCard title="Example"');
    // Card outside code should be transformed
    expect(result).toContain("- [**Real Card**](/docs/da)");
  });
});

// ---------------------------------------------------------------------------
// Noise stripping
// ---------------------------------------------------------------------------

describe("Noise stripping", () => {
  it("strips import statements", () => {
    const input = `import { useAccount } from "wagmi";
import { SDK } from "avail-js-sdk";

## Content

This is the actual content.`;
    const result = cleanMarkdownForAgents(input);
    expect(result).not.toContain("import");
    expect(result).toContain("## Content");
    expect(result).toContain("This is the actual content.");
  });

  it("strips ComponentPreview and ComponentSource", () => {
    const input = `## Preview

<ComponentPreview
  name="deposit"
  description="A deposit flow."
  align="center"
  className="some-class"
  chromeLessOnMobile={true}
/>

## Features

Good stuff here.`;
    const result = cleanMarkdownForAgents(input);
    expect(result).not.toContain("<ComponentPreview");
    expect(result).toContain("## Preview");
    expect(result).toContain("Good stuff here.");
  });

  it("strips className attributes from HTML tags", () => {
    const input = `<a href="/docs/nexus/get-started" target="_blank" className="underline">
  here
</a>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).not.toContain("className");
    expect(result).toContain("here");
  });

  it("strips showLineNumbers from code fences", () => {
    const input = "```tsx showLineNumbers\nconst x = 1;\n```";
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("```tsx");
    expect(result).not.toContain("showLineNumbers");
    expect(result).toContain("const x = 1;");
  });

  it("strips <ins> tags, keeping text", () => {
    const input = `[<ins>Optimism Documentation</ins>](https://docs.optimism.io)`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain(
      "[Optimism Documentation](https://docs.optimism.io)",
    );
    expect(result).not.toContain("<ins>");
  });

  it('strips JSX whitespace expressions {" "}', () => {
    const input = `View instructions{" "}here`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("View instructions here");
  });

  it("strips PageFooter entirely", () => {
    const input = `Some content.

<PageFooter
  previous={{
    title: "What is Chain Abstraction?",
    description: "Eliminate manual bridging.",
    href: "/docs/nexus/concepts/chain-abstraction"
  }}
  next={{
    title: "What are Solvers?",
    description: "Agents that compete.",
    href: "/docs/nexus/concepts/solvers"
  }}
/>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).not.toContain("<PageFooter");
    expect(result).not.toContain("previous=");
    expect(result).toContain("Some content.");
  });

  it("strips <br/> variants to newlines", () => {
    const input = `**BEFORE WE START**<br/>First point.`;
    const result = cleanMarkdownForAgents(input);
    expect(result).not.toContain("<br");
    expect(result).toContain("**BEFORE WE START**\nFirst point.");
  });

  it("strips div wrappers", () => {
    const input = `<div data-slot="code" className="my-4">

Some content.

</div>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).not.toContain("<div");
    expect(result).not.toContain("</div");
    expect(result).toContain("Some content.");
  });
});

// ---------------------------------------------------------------------------
// Standalone Step tags
// ---------------------------------------------------------------------------

describe("Step tags", () => {
  it("converts standalone <Step> to bold text", () => {
    const input = `<Step className="font-serif text-lg">
  Don't forget to wrap your app with NexusProvider
</Step>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain(
      "**Don't forget to wrap your app with NexusProvider**",
    );
    expect(result).not.toContain("<Step");
  });
});

// ---------------------------------------------------------------------------
// Passthrough
// ---------------------------------------------------------------------------

describe("Passthrough", () => {
  it("returns plain markdown unchanged (except trailing newline)", () => {
    const input = `## Hello World

This is plain markdown with a [link](/docs/da) and **bold text**.

- Item 1
- Item 2`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toBe(`${input}\n`);
  });
});

// ---------------------------------------------------------------------------
// Nested components
// ---------------------------------------------------------------------------

describe("Nested components", () => {
  it("handles Callout inside TabsContent", () => {
    const input = `<Tabs defaultValue="a">
  <TabsList>
    <TabsTrigger value="a">Option A</TabsTrigger>
  </TabsList>
  <TabsContent value="a">

<Callout type="warning">
Be careful with this option.
</Callout>

Some content.

  </TabsContent>
</Tabs>`;
    const result = cleanMarkdownForAgents(input);
    expect(result).toContain("#### Option A");
    expect(result).toContain("> **Warning**");
    expect(result).toContain("> Be careful with this option.");
    expect(result).toContain("Some content.");
    expect(result).not.toContain("<Tabs");
    expect(result).not.toContain("<Callout");
  });

  it("collapses excessive blank lines", () => {
    const input = `First paragraph.



\n\n\n\nSecond paragraph.`;
    const result = cleanMarkdownForAgents(input);
    // Should have at most one blank line between paragraphs
    expect(result).not.toMatch(/\n{4,}/);
  });
});

// ---------------------------------------------------------------------------
// Integration: real-world get-started page pattern
// ---------------------------------------------------------------------------

describe("Integration", () => {
  it("cleans a real get-started page pattern", () => {
    const input = `Avail DA is a modular data availability layer.

## Quick Look

<Tabs defaultValue="typescript">
  <TabsList>
    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
    <TabsTrigger value="rust">Rust</TabsTrigger>
  </TabsList>
  <TabsContent value="typescript">

\`\`\`typescript
const sdk = await SDK.New("wss://turing-rpc.avail.so/ws");
\`\`\`

  </TabsContent>
  <TabsContent value="rust">

\`\`\`rust
let sdk = SDK::new("wss://turing-rpc.avail.so/ws").await?;
\`\`\`

  </TabsContent>
</Tabs>

<Callout>
**Prerequisites:** You'll need testnet tokens.
</Callout>

## Choose Your Path

<IconCardGrid>
  <IconCard
    icon={<Send />}
    title="Post Data"
    description="Full tutorial."
    href="/docs/da/build/interact/read-write-on-avail"
  />
  <IconCard
    icon={<Cube />}
    title="Deploy a Rollup"
    description="Launch a rollup."
    href="/docs/da/build/rollups"
  />
</IconCardGrid>`;

    const result = cleanMarkdownForAgents(input);

    // Structure checks
    expect(result).toContain("## Quick Look");
    expect(result).toContain("#### TypeScript");
    expect(result).toContain("#### Rust");
    expect(result).toContain("> **Note**");
    expect(result).toContain("> **Prerequisites:**");
    expect(result).toContain("## Choose Your Path");
    expect(result).toContain(
      "- [**Post Data**](/docs/da/build/interact/read-write-on-avail) — Full tutorial.",
    );
    expect(result).toContain(
      "- [**Deploy a Rollup**](/docs/da/build/rollups) — Launch a rollup.",
    );

    // Code blocks preserved
    expect(result).toContain("```typescript");
    expect(result).toContain("SDK.New");
    expect(result).toContain("```rust");
    expect(result).toContain("SDK::new");

    // No JSX leaks
    expect(result).not.toMatch(/<[A-Z]\w+/);
    expect(result).not.toContain("icon={");
  });
});
