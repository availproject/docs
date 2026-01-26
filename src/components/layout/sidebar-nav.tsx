"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Root, Item, Node } from "fumadocs-core/page-tree";
import { Tree, Folder } from "@/components/ui/file-tree";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface SidebarNavProps extends React.ComponentProps<typeof Sidebar> {
  tree: Root;
}

// Custom File component that uses Next.js Link for navigation
function NavFile({ item, isActive }: { item: Item; isActive: boolean }) {
  return (
    <Link
      href={item.url}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground font-medium",
      )}
    >
      <span className="truncate">{item.name}</span>
    </Link>
  );
}

export default function SidebarNav({ tree, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  // Get all expanded item IDs based on current path
  const getExpandedIds = (
    nodes: Node[],
    currentPath: string[] = [],
  ): string[] => {
    const ids: string[] = [];

    for (const node of nodes) {
      if (node.type === "folder") {
        const folderId = node.$id ?? `folder-${currentPath.join("-")}`;
        const isInPath = node.index?.url && pathname.startsWith(node.index.url);
        const hasActiveChild = node.children.some((child) => {
          if (child.type === "page") {
            return (
              pathname === child.url || pathname.startsWith(child.url + "/")
            );
          }
          if (child.type === "folder" && child.index) {
            return pathname.startsWith(child.index.url);
          }
          return false;
        });

        if (isInPath || hasActiveChild) {
          ids.push(folderId);
        }

        // Recursively check children
        const childIds = getExpandedIds(node.children, [
          ...currentPath,
          node.name?.toString() ?? "",
        ]);
        if (childIds.length > 0) {
          ids.push(folderId);
          ids.push(...childIds);
        }
      }
    }

    return ids;
  };

  const initialExpandedItems = useMemo(() => {
    return getExpandedIds(tree.children);
  }, [pathname, tree]);

  // Recursive render function for tree nodes
  const renderNode = (node: Node, depth = 0): React.ReactNode => {
    if (node.type === "page") {
      const isActive = pathname === node.url;
      return (
        <div
          key={node.$id ?? node.url}
          style={{ paddingLeft: depth > 0 ? 8 : 0 }}
        >
          <NavFile item={node} isActive={isActive} />
        </div>
      );
    }

    if (node.type === "folder") {
      const folderId = node.$id ?? `folder-${node.name}`;
      const hasChildren = node.children.length > 0;
      const isActive = node.index ? pathname === node.index.url : false;

      if (!hasChildren && node.index) {
        // Folder with only index, no children - render as a file
        return (
          <div key={folderId} style={{ paddingLeft: depth > 0 ? 8 : 0 }}>
            <NavFile item={node.index} isActive={isActive} />
          </div>
        );
      }

      return (
        <Folder
          key={folderId}
          value={folderId}
          element={node.name?.toString() ?? ""}
          isSelectable={true}
        >
          {node.children.map((child) => renderNode(child, depth + 1))}
        </Folder>
      );
    }

    if (node.type === "separator") {
      return (
        <div
          key={node.$id ?? `sep-${node.name}`}
          className="px-2 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
        >
          {node.name}
        </div>
      );
    }

    return null;
  };

  // Render top-level items
  const renderTopLevel = () => {
    return tree.children.map((item, index) => {
      if (item.type === "page") {
        const isActive = pathname === item.url;
        return (
          <div key={item.$id ?? item.url} className="px-1">
            <NavFile item={item} isActive={isActive} />
          </div>
        );
      }

      if (item.type === "folder") {
        const folderId = item.$id ?? `folder-${index}`;
        const hasChildren = item.children.length > 0;

        if (!hasChildren && item.index) {
          const isActive = pathname === item.index.url;
          return (
            <div key={folderId} className="px-1">
              <NavFile item={item.index} isActive={isActive} />
            </div>
          );
        }

        return (
          <Folder
            key={folderId}
            value={folderId}
            element={item.name?.toString() ?? ""}
            isSelectable={true}
          >
            {/* If folder has an index, show it as first item */}
            {item.index && (
              <div className="px-1">
                <NavFile
                  item={{
                    ...item.index,
                    name: "Overview" as React.ReactNode,
                  }}
                  isActive={pathname === item.index.url}
                />
              </div>
            )}
            {item.children.map((child) => renderNode(child, 1))}
          </Folder>
        );
      }

      if (item.type === "separator") {
        return (
          <div
            key={item.$id ?? `sep-${index}`}
            className="px-3 pt-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          >
            {item.name}
          </div>
        );
      }

      return null;
    });
  };

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-1rem)] overscroll-none bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar overflow-y-auto overflow-x-hidden">
        <div className="from-background via-background/80 to-background/50 sticky -top-1 z-10 h-4 shrink-0 bg-linear-to-b" />

        <Tree
          initialSelectedId={pathname}
          initialExpandedItems={initialExpandedItems}
          indicator={true}
          className="px-1"
        >
          {renderTopLevel()}
        </Tree>

        <div className="from-background via-background/80 to-background/50 sticky -bottom-1 z-10 h-8 shrink-0 bg-linear-to-t" />
      </SidebarContent>
    </Sidebar>
  );
}
