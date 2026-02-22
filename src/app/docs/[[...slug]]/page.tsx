import { ArrowUpRight, CaretRight } from "@phosphor-icons/react/ssr";
import fm from "front-matter";
import { findNeighbour } from "fumadocs-core/page-tree";
import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { OnThisPage } from "@/components/helpers/on-this-page";
import { TrackPageVisit } from "@/components/helpers/track-page-visit";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { PageFooter } from "@/components/mdx/page-footer";
import { Badge } from "@/components/ui/badge";
import { getProductTree } from "@/lib/page-tree-utils";
import { source } from "@/lib/source";

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
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://docs.availproject.org";
  const url = new URL(page.url, baseUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images: [
        {
          url: "/opengraph-preview.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-preview.png"],
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
  const productSlug = params.slug?.[0];
  const navTree =
    productSlug === "da" || productSlug === "nexus"
      ? getProductTree(source.pageTree, productSlug)
      : source.pageTree;
  const neighbours = findNeighbour(navTree, page.url);
  const raw = await page.data.getText("raw");
  const { attributes } = fm(raw);
  const { links, hideFooter } = z
    .object({
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
      hideFooter: z.boolean().optional(),
    })
    .parse(attributes);

  // Build breadcrumbs from the page path
  const breadcrumbs = page.url
    .split("/")
    .filter(Boolean)
    .slice(0, -1)
    .map((segment, index, arr) => {
      if (segment === "docs" && index === 0) {
        return { href: "/", label: "Home" };
      }
      const href = `/${arr.slice(0, index + 1).join("/")}`;
      const pathSoFar = arr.slice(0, index + 1).join("/");
      const segmentLabels: Record<string, string> = {
        "nexus-sdk": "Nexus SDK",
        "api-reference": "API Reference",
      };
      const pathLabels: Record<string, string> = {
        "docs/nexus/nexus-sdk/get-started": "Manual Setup",
        "docs/nexus/nexus-ui-elements/get-started": "Manual Setup",
      };
      const label =
        pathLabels[pathSoFar] ??
        segmentLabels[segment] ??
        segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      return { href, label };
    });

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://docs.availproject.org";
  const pageUrl = new URL(page.url, baseUrl).toString();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: new URL(crumb.href, baseUrl).toString(),
    })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.description || "",
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "Avail",
      url: baseUrl,
    },
  };

  return (
    <div className="flex items-stretch text-base xl:w-full no-scrollbar">
      <TrackPageVisit url={page.url} title={doc.title} />
      <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
      <div className="flex min-w-0 flex-1 flex-col bg-background xl:pl-10 2xl:pl-20">
        <div className="mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-20 px-4 py-20 md:px-0">
          {/* Content sections */}
          <div className="flex flex-col gap-4">
            {/* Header section with breadcrumbs and title */}
            <div className="flex flex-col gap-6">
              {/* Breadcrumbs */}
              {breadcrumbs.length > 0 && (
                <nav className="flex items-center gap-1">
                  {breadcrumbs.map((crumb) => (
                    <span key={crumb.href} className="flex items-center gap-1">
                      <Link
                        href={crumb.href}
                        className="ui-16 text-breadcrumb-previous hover:text-foreground transition-colors"
                      >
                        {crumb.label}
                      </Link>
                      <CaretRight
                        size={20}
                        className="text-breadcrumb-previous"
                      />
                    </span>
                  ))}
                  <span className="ui-16 text-breadcrumb-current">
                    {doc.title}
                  </span>
                </nav>
              )}

              {/* Title and description */}
              <div className="flex flex-col gap-4">
                <h1 className="font-serif text-[28px] font-medium leading-9 tracking-[0.56px] text-brand">
                  {doc.title}
                </h1>
                {doc.description && (
                  <p className="body-16 text-secondary-foreground">
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
            <div className="w-full flex-1 text-secondary-foreground *:data-[slot=alert]:first:mt-0">
              <MDX components={mdxComponents} />
            </div>
          </div>

          {/* Footer section */}
          {!hideFooter && (
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
          )}
        </div>
      </div>

      {/* Right sidebar - On This Page */}
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--header-height)-1px)] xl:w-70 2xl:w-80 flex-col gap-4 ui-16 xl:flex xl:pr-10 2xl:pr-20">
        <div className="h-20 shrink-0" />
        <OnThisPage toc={doc.toc} className="flex-1 min-h-0" />
      </div>
    </div>
  );
}
