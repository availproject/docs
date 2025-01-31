import { Layout, Navbar } from 'nextra-theme-docs'
import { Footer } from "@components/Footer/Footer";
import { Head, Search } from 'nextra/components'
import { Metadata } from "next";
import { ReactNode } from "react";
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Image from 'next/image'
export const metadata: Metadata = {
  title: "Avail docs",
  description: "Avail developer docs built using Nextra V4",
}

const footer = <Footer/>
 
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
      color={{
        hue:195,
        saturation: {
          light: 75,
          dark: 100
        },
        lightness: {
          light: 41,
          dark: 55
        }
      }}
      
    />
      <body>

        <Layout
          navbar={
            <Navbar
              logo={
                <div className="flex flex-row items-center">
                  <Image src={"/group.png"} alt="avail-logo" width={200} height={40} />
                </div>
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
          docsRepositoryBase="https://github.com/availproject/docs/tree/main/docs"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true, toggleButton: true }}
          footer={footer}
        >
          {children}
                    
          {/* <Search
          emptyResult="No matches found."
          loading="Searching..."
          placeholder="Look through Avail's docs...."
          errorText="Unable to fetch search results."
          searchOptions={{
            preload: true,
            verbose: false,
            filters: {},
            sort: {}
          }}
        /> */}
        </Layout>
      </body>
    </html>
  );
}