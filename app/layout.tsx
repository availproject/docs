import { Layout, Navbar, Link } from 'nextra-theme-docs'
import { Footer } from "@components/Footer/Footer";
import { Head, Search, Banner } from 'nextra/components'
import { Metadata } from "next";
import { ReactNode } from "react";
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { CustomNavbar } from '@components/Navbar';
import { sharedMetadata } from '@components/lib/metadata';
import Script from 'next/script'


// Metadata for the website
export const metadata = sharedMetadata

const footer = <Footer/>

const defaultSearchOptions = {
  preload: true,
  verbose: false,
  filters: {},
  sort: {}
};

const banner = (
  <Banner dismissible={true}>
    Avail Nexus is now live!{" "}
    <Link href="https://docs.availproject.org/api-reference/avail-nexus-sdk" className="text-current!">
    Check out our docs
    </Link>
     to get started.
  </Banner>
)
 
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
      <meta property="og:image" content="/img/docs-link-preview.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:image" content="/img/docs-link-preview.png" />
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={
            <Navbar
              logo={
                <CustomNavbar/>
              }
              projectLink="https://github.com/availproject/docs"
              chatLink="https://twitter.com/AvailProject"
              chatIcon={
                <svg width="24" height="24" viewBox="0 0 248 204">
                  <path
                      fill="currentColor"
                      d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
                    />
                  </svg>
                }
            />
          }
          
          navigation={{
            prev: true,
            next: true
          }}  
          
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/availproject/docs/tree/main"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true, toggleButton: true }}
          footer={footer}
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
        <Script
          id="cookbook-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  function initAskCookbook() {
    const PUBLIC_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWVmNjQ4MzI0OTAwMDkyN2MxMWJjNDQiLCJpYXQiOjE3MTAxODc2NTEsImV4cCI6MjAyNTc2MzY1MX0.FUjNryJOMucu7VoqOFP940qFeD7w_5kBEkvTVaP38tA";
    let el = document.getElementById("__cookbook");
    if (!el) {
      el = document.createElement("div");
      el.id = "__cookbook";
      el.dataset.apiKey = PUBLIC_API_KEY;
      document.body.appendChild(el);
    }
    let s = document.getElementById("__cookbook-script");
    if (!s) {
      s = document.createElement("script");
      s.id = "__cookbook-script";
      s.src = "https://cdn.jsdelivr.net/npm/@cookbookdev/docsbot/dist/standalone/index.cjs.js";
      s.async = true;
      document.head.appendChild(s);
    }
    const blocker = (e) => e.stopPropagation();
    document.addEventListener("cookbook:modal:state:change", (e) => {
      const isOpen = e.detail?.isOpen;
      if (isOpen) document.body.addEventListener("keydown", blocker, { capture: true });
      else document.body.removeEventListener("keydown", blocker, { capture: true });
    });
  }
  if (document.readyState === "complete") initAskCookbook();
  else window.addEventListener("load", initAskCookbook);
})();`,
          }}
        />
      </body>
    </html>
  );
}