import Link from "next/link";
import { notFound } from "next/navigation";
import { findNeighbour } from "fumadocs-core/page-tree";
import { source } from "@/lib/source";
import { mdxComponents } from "@/components/mdx/mdx-components";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { OnThisPage } from "@/components/helpers/on-this-page";
import fm from "front-matter";
import { z } from "zod";
import { DocsCopyPage } from "@/components/mdx/docs-copy-page";
import { absoluteUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageFooter } from "@/components/mdx/page-footer";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }
  const doc = page.data;
  const title = doc.title || "";
  const description = doc.description || "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5001";
  const url = new URL(page.url, baseUrl).toString();
  const ogParams = `title=${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(description)}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [{ url: `/og?${ogParams}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: `/og?${ogParams}` }],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }
  const doc = page.data;
  const MDX = doc.body;
  const neighbours = findNeighbour(source.pageTree, page.url);
  const raw = await page.data.getText("raw");
  const { attributes } = fm(raw);
  const { links } = z
    .object({
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
    })
    .parse(attributes);

  // Build breadcrumbs from the page path
  const breadcrumbs = page.url
    .split("/")
    .filter(Boolean)
    .slice(0, -1)
    .map((segment, index, arr) => {
      const href = "/" + arr.slice(0, index + 1).join("/");
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return { href, label };
    });

  return (
    <div className="flex items-stretch text-base xl:w-full no-scrollbar">
      <div className="flex min-w-0 flex-1 flex-col bg-background ">
        {/*<div className="h-18 shrink-0" />*/}
        <div className="mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-20 px-4 py-18 md:px-0">
          {/* Content sections */}
          <div className="flex flex-col gap-20">
            {/* Header section with breadcrumbs and title */}
            <div className="flex flex-col gap-6">
              {/* Breadcrumbs */}
              {breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-1">
                  {breadcrumbs.map((crumb, index) => (
                    <span key={crumb.href} className="flex items-center gap-1">
                      <Link
                        href={crumb.href}
                        className="text-base text-breadcrumb-previous hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </Link>
                      <ChevronRight className="size-5 text-breadcrumb-previous" />
                    </span>
                  ))}
                  <span className="text-base text-breadcrumb-current">
                    {doc.title}
                  </span>
                </nav>
              )}

              {/* Title and description */}
              <div className="flex flex-col gap-4">
                <h1 className="font-sans text-[28px] font-medium leading-9 tracking-[0.56px] text-brand">
                  {doc.title}
                </h1>
                {doc.description && (
                  <p className="text-base leading-relaxed text-foreground">
                    {doc.description}
                  </p>
                )}
              </div>

              {/* Links badges */}
              {links ? (
                <div className="flex items-center gap-2">
                  {links?.doc && (
                    <Badge asChild variant="secondary" className="rounded-full">
                      <a href={links.doc} target="_blank" rel="noreferrer">
                        Docs <ArrowUpRight />
                      </a>
                    </Badge>
                  )}
                  {links?.api && (
                    <Badge asChild variant="secondary" className="rounded-full">
                      <a href={links.api} target="_blank" rel="noreferrer">
                        API Reference <ArrowUpRight />
                      </a>
                    </Badge>
                  )}
                </div>
              ) : null}
            </div>

            {/* Main content */}
            <div className="w-full flex-1 text-foreground *:data-[slot=alert]:first:mt-0">
              <MDX components={mdxComponents} />
            </div>
          </div>

          {/* Footer section */}
          <PageFooter
            previous={
              neighbours.previous
                ? {
                    title: neighbours.previous.name?.toString() ?? "",
                    href: neighbours.previous.url,
                  }
                : undefined
            }
            next={
              neighbours.next
                ? {
                    title: neighbours.next.name?.toString() ?? "",
                    href: neighbours.next.url,
                  }
                : undefined
            }
          />
        </div>
      </div>

      {/* Right sidebar - On This Page */}
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-1px)] w-60 flex-col gap-4 overflow-hidden overscroll-none xl:flex">
        <div className="h-18 shrink-0" />
        {doc.toc?.length ? (
          <div className="no-scrollbar overflow-y-auto relative">
            <OnThisPage toc={doc.toc} />
            <div className="h-12" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
