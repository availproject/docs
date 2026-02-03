import { Layout, Navbar } from "nextra-theme-docs";
import { Head, Search, Banner } from "nextra/components";
import { ReactNode, Suspense } from "react";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "./globals.css";
import { CustomNavbar } from "@components/Navbar";
import { sharedMetadata } from "@components/lib/metadata";
import { PHProvider, PostHogPageview } from "@components/providers";

// Metadata for the website
export const metadata = sharedMetadata;

const defaultSearchOptions = {
  preload: true,
  verbose: false,
  filters: {},
  sort: {},
};

const banner = (
  <Banner dismissible={true}>
    Avail Nexus is now live!{" "}
    <a
      href="https://docs.availproject.org/nexus/avail-nexus-sdk"
      className="text-current! underline"
    >
      Check out our docs{" "}
    </a>
    to get started.
  </Banner>
);

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <link
          rel="preload"
          href="/fonts/Thunder-ExtraBoldLC.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <meta property="og:image" content="/img/docs-link-preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/img/docs-link-preview.png" />
      </Head>
      <body>
        <PHProvider>
          <Suspense fallback={null}>
            <PostHogPageview />
          </Suspense>
          <Layout
          banner={banner}
          navbar={
            <Navbar
              logo={<CustomNavbar />}
              projectLink="https://github.com/availproject/docs"
              chatLink="https://x.com/AvailProject"
              chatIcon={
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  />
                </svg>
              }
            />
          }
          navigation={{
            prev: true,
            next: true,
          }}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/availproject/docs/tree/main"
          editLink="Edit this page on GitHub"
          sidebar={{
            defaultMenuCollapseLevel: 1,
            autoCollapse: true,
            toggleButton: true,
          }}
          search={
            <Search
              emptyResult="No matches found."
              loading="Searching..."
              placeholder="Search through Avail's docs...."
              errorText="Unable to fetch search results."
            />
          }
        >
          {children}
        </Layout>
        </PHProvider>
      </body>
    </html>
  );
}
