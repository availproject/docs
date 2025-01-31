import { Layout, Navbar } from 'nextra-theme-docs'
import { Footer } from "@components/Footer/Footer";
import { Head } from 'nextra/components'
import { Metadata } from "next";
import { ReactNode } from "react";
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
 
export const metadata: Metadata = {
  title: "Avail docs",
  description: "Avail docs built on Nextra V4",
}

const navbar = (
  <Navbar
    logo={<b>Nextra</b>}
  />
)
const footer = <Footer/>
 
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<h1 className="text-2xl"> Nextra</h1>}
              projectLink="https://github.com/availproject/docs"
            />
          }
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/availproject/docs/tree/main/docs"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}