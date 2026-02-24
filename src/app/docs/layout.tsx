import { ScrollToTop } from "@/components/helpers/scroll-to-top";
import SidebarNav from "@/components/layout/sidebar-nav";
import Topbar from "@/components/layout/top-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { source } from "@/lib/source";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      defaultOpen
      className="flex min-h-svh flex-col"
      style={{ "--sidebar-width": "300px" } as React.CSSProperties}
    >
      <ScrollToTop />
      <Topbar />
      <div className="container-wrapper flex flex-1 flex-col">
        <div className="min-h-min flex-1 items-start px-0 lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)]">
          <SidebarNav tree={source.pageTree} />
          <main id="main-content" className="h-full w-full bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
