import { Layout, Navbar, useTheme } from "nextra-theme-docs"
import { Footer } from "@components/Footer/Footer"
import { Head, Search } from "nextra/components"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { getPageMap } from "nextra/page-map"
import "nextra-theme-docs/style.css"
import "./globals.css"
import { CustomNavbar } from "@components/Navbar"

export const metadata: Metadata = {
  title: "Avail docs",
  description: "Avail developer docs built using Nextra V4",
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode
}) {

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          themeSwitch={{
            dark: "Dark",
            light: "Light",
            system: "System",
          }}
          navbar={
          <CustomNavbar />
          }
          navigation={{
            prev: true,
            next: true,
          }}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/availproject/docs/tree/main/docs"
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true, toggleButton: true }}
          footer={<Footer />}
          toc={{}}
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
      </body>
    </html>
  )
}

