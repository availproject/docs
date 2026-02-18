import Image from "next/image";
import Link from "next/link";
import type * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponentsMap = Record<string, React.ComponentType<any>>;

import {
  ArrowsClockwise,
  ArrowsLeftRight,
  Brain,
  Bridge,
  Code,
  Coins,
  Compass,
  Cube,
  CurrencyEth,
  File as FileIcon,
  GearSix,
  GithubLogo,
  Globe,
  Graph,
  IdentificationBadge,
  Key,
  Link as LinkIcon,
  LinkSimple,
  MetaLogo,
  PaperPlaneTilt,
  PuzzlePiece,
  Scales,
  ShieldCheck,
  Spinner,
  Swap,
  UserCircle,
  UsersThree,
  Wallet,
  YoutubeLogo,
} from "@phosphor-icons/react/ssr";
import { CopyButton } from "@/components/helpers/copy-button";
import { cn } from "@/lib/utils";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Tabs as ShadcnTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { Callout } from "./callout";
import { CodeBlockCommand } from "./code-block-command";
import { CodeCollapsibleWrapper } from "./code-collapsible-wrapper";
import { CodeTabs } from "./code-tabs";
import { ComponentPreview } from "./component-preview";
import { ComponentSource } from "./component-source";
import { ConceptCard, ConceptCardGrid } from "./concept-card";
import { Feedback } from "./feedback";
import { IconCard, IconCardGrid } from "./icon-card";
import { LinkCard, LinkCardGrid } from "./link-card";
import { PageFooter } from "./page-footer";

export const mdxComponents: MDXComponentsMap = {
  // Headings
  h1: ({ className, ...props }: React.ComponentProps<"h1">) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-28 text-3xl font-bold tracking-tight font-serif",
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, id, ...props }: React.ComponentProps<"h2">) => {
    // Use the id from Fumadocs (via rehype-slug) if available, otherwise generate from text
    const headingId =
      id ||
      props.children
        ?.toString()
        .replace(/ /g, "-")
        .replace(/'/g, "")
        .replace(/\?/g, "")
        .toLowerCase();
    return (
      <div className="mt-16 first:mt-0 mb-6 flex flex-col gap-4">
        <h2
          id={headingId}
          className={cn(
            "font-serif text-xl font-medium leading-relaxed tracking-wide text-brand scroll-m-28",
            className,
          )}
          {...props}
        />
        <div className="h-px w-full bg-border" />
      </div>
    );
  },
  h3: ({ className, id, ...props }: React.ComponentProps<"h3">) => {
    // Use the id from Fumadocs (via rehype-slug) if available, otherwise generate from text
    const headingId =
      id ||
      props.children
        ?.toString()
        .replace(/ /g, "-")
        .replace(/'/g, "")
        .replace(/\?/g, "")
        .toLowerCase();
    return (
      <h3
        id={headingId}
        className={cn(
          "mt-12 scroll-m-28 text-lg font-medium tracking-tight",
          className,
        )}
        {...props}
      />
    );
  },
  h4: ({ className, id, ...props }: React.ComponentProps<"h4">) => {
    // Use the id from Fumadocs (via rehype-slug) if available, otherwise generate from text
    const headingId =
      id ||
      props.children
        ?.toString()
        .replace(/ /g, "-")
        .replace(/'/g, "")
        .replace(/\?/g, "")
        .toLowerCase();
    return (
      <h4
        id={headingId}
        className={cn(
          "mt-8 scroll-m-28 text-base font-medium tracking-tight",
          className,
        )}
        {...props}
      />
    );
  },
  h5: ({ className, id, ...props }: React.ComponentProps<"h5">) => {
    const headingId =
      id ||
      props.children
        ?.toString()
        .replace(/ /g, "-")
        .replace(/'/g, "")
        .replace(/\?/g, "")
        .toLowerCase();
    return (
      <h5
        id={headingId}
        className={cn(
          "mt-8 scroll-m-28 text-sm font-medium tracking-tight",
          className,
        )}
        {...props}
      />
    );
  },
  // Text
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <span
      className={cn("leading-relaxed not-first:mt-6", className)}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn(
        "font-medium text-link-foreground underline decoration-[var(--link-underline)] underline-offset-4 hover:decoration-[var(--link-underline-hover)]",
        className,
      )}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
    <img className={cn("mt-6 rounded-md", className)} alt={alt} {...props} />
  ),
  hr: (props: React.ComponentProps<"hr">) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  // Tables
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="overflow-x-auto my-6">
      <table
        className={cn(
          "w-full text-base border-collapse [&_strong]:font-normal [&_a]:text-muted-foreground [&_a]:decoration-muted-foreground/30 [&_a]:font-normal [&_a:hover]:text-brand",
          className,
        )}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }: React.ComponentProps<"thead">) => (
    <thead
      className={cn("bg-muted border-b border-border", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "text-left px-4 py-3 font-normal text-muted-foreground text-xs uppercase tracking-wider",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn("px-4 py-3 border-t border-border", className)}
      {...props}
    />
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr className={cn(className)} {...props} />
  ),
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => {
    return <figure className={cn(className)} {...props} />;
  },
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"figcaption">) => {
    const iconExtension =
      "data-language" in props && typeof props["data-language"] === "string" ? (
        <Code />
      ) : null;

    return (
      <figcaption
        className={cn(
          "text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
          className,
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    );
  },
  // Code
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    return (
      <pre
        className={cn(
          "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-data-[slot=tabs]:p-0",
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    );
  },

  code: ({
    className,
    __raw__,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __src__,
    __npm__,
    __yarn__,
    __pnpm__,
    __bun__,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string;
    __src__?: string;
    __npm__?: string;
    __yarn__?: string;
    __pnpm__?: string;
    __bun__?: string;
    "data-language"?: string;
  }) => {
    // Get language from data attribute
    const language = props["data-language"] as string | undefined;

    // Inline Code.
    if (typeof props.children === "string") {
      return (
        <code
          className={cn(
            "bg-muted relative px-[0.3rem] py-[0.2rem] font-mono text-[0.8rem] wrap-break-word outline-none",
            className,
          )}
          {...props}
        />
      );
    }

    // npm command.
    const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__;
    if (isNpmCommand) {
      return (
        <CodeBlockCommand
          __npm__={__npm__}
          __yarn__={__yarn__}
          __pnpm__={__pnpm__}
          __bun__={__bun__}
        />
      );
    }

    // Default codeblock.
    return (
      <>
        {__raw__ && (
          <CopyButton value={__raw__} language={language} codeType="block" />
        )}
        <code {...props} />
      </>
    );
  },
  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      className={cn("mt-6 rounded-md border", className)}
      src={(src as string) || ""}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ""}
      {...props}
    />
  ),
  Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
    <h3 className={cn("step", className)} {...props} />
  ),
  Steps: ({ ...props }) => <div className="steps" {...props} />,
  // Custom components used across docs
  ComponentPreview,
  ComponentSource,
  CodeCollapsibleWrapper,
  CodeTabs,
  // DepsInstall,
  CopyButton,
  CodeBlockCommand,
  Callout,
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "font-medium text-link-foreground underline decoration-[var(--link-underline)] underline-offset-4 hover:decoration-[var(--link-underline-hover)]",
        className,
      )}
      {...props}
    />
  ),
  // Tabs components (shadcn format)
  Tabs: ({ className, ...props }: React.ComponentProps<typeof ShadcnTabs>) => {
    return (
      <ShadcnTabs
        className={cn("relative mt-6 w-full", className)}
        {...props}
      />
    );
  },
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "inline-flex items-center gap-1 rounded-none bg-muted p-1",
        className,
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "rounded-none px-4 py-2 text-sm font-normal text-muted-foreground transition-colors data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className,
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative mt-4 [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium *:[figure]:first:mt-0 [&>.steps]:mt-6",
        className,
      )}
      {...props}
    />
  ),
  // Card components — IconCard handles icon/title/description/href used across MDX
  Card: IconCard,
  Cards: IconCardGrid,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  // Media and icons
  Youtube: YoutubeLogo,
  YouTube: YoutubeLogo, // Alias for nextra compatibility (uppercase T)
  Github: GithubLogo,
  GithubIcon24: GithubLogo, // Alias for nextra compatibility
  FileIcon,
  LinkIcon,
  LoaderPinwheelIcon: Spinner,
  Link2: LinkSimple,
  Coins,
  Brain,
  CodeIcon: Code,
  Puzzle: PuzzlePiece,
  RefreshCw: ArrowsClockwise,
  Send: PaperPlaneTilt,
  ArrowLeftRight: ArrowsLeftRight,
  Bridge,
  Swap,
  Globe,
  Scale: Scales,
  Graph,
  IdentificationBadge,
  Compass,
  CurrencyEth,
  Cube,
  Gear: GearSix,
  Wallet,
  UserCircle,
  ShieldCheck,
  UsersThree,
  Key,
  MetaLogo,
  // Link cards for documentation navigation
  LinkCard,
  LinkCardGrid,
  // Concept cards for concept/feature display
  ConceptCard,
  ConceptCardGrid,
  // Icon cards for landing pages with icon + title + description
  IconCard,
  IconCardGrid,
  // Feedback component
  Feedback,
  // Page footer with navigation
  PageFooter,

};

export function useMDXComponents(
  components: MDXComponentsMap,
): MDXComponentsMap {
  return { ...mdxComponents, ...components };
}
