import { source } from '@/lib/source';
import { SidebarProvider } from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper flex flex-1 flex-col px-2">
      <SidebarProvider
        defaultOpen
        className="min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]"
      >
        <SidebarNav tree={source.pageTree} />
        <main className="h-full w-full">{children}</main>
      </SidebarProvider>
    </div>
  );
}
