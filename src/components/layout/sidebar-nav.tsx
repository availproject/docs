"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Root, Item, Node } from "fumadocs-core/page-tree";
import { ChevronDown } from "lucide-react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface SidebarNavProps extends React.ComponentProps<typeof Sidebar> {
  tree: Root;
}

// Sidebar item component for pages/files
function SidebarItem({
  item,
  isActive,
  depth = 0,
}: {
  item: Item;
  isActive: boolean;
  depth?: number;
}) {
  return (
    <Link
      href={item.url}
      className={cn(
        "flex h-10 w-full items-center gap-2 px-4 py-2.5 text-base transition-colors",
        isActive
          ? "bg-sidebar-item-background-active text-sidebar-item-foreground-active font-medium"
          : "bg-transparent text-sidebar-item-foreground hover:bg-sidebar-item-background-hover",
        depth > 0 && "pl-8",
      )}
    >
      <span className="truncate leading-5">{item.name}</span>
    </Link>
  );
}

// Sidebar folder component with expandable children
function SidebarFolder({
  name,
  children,
  defaultExpanded = false,
  depth = 0,
  indexItem,
  isIndexActive,
}: {
  name: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  depth?: number;
  indexItem?: Item;
  isIndexActive?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="flex flex-col w-full">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex h-10 w-full items-center gap-2 px-4 py-2.5 text-base transition-colors",
          "bg-transparent text-sidebar-item-foreground hover:bg-sidebar-item-background-hover",
          depth > 0 && "pl-8",
        )}
      >
        <span className="flex-1 truncate text-left leading-5">{name}</span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-sidebar-item-foreground transition-transform duration-200",
            isExpanded && "rotate-180",
          )}
        />
      </button>
      {isExpanded && <div className="flex flex-col">{children}</div>}
    </div>
  );
}

// Divider component
function SidebarDivider() {
  return <div className="h-px w-full bg-border my-6" />;
}

export default function SidebarNav({ tree, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  // Check if a node or its children contain the active path
  const isNodeActive = (node: Node): boolean => {
    if (node.type === "page") {
      return pathname === node.url || pathname.startsWith(node.url + "/");
    }
    if (node.type === "folder") {
      if (
        node.index &&
        (pathname === node.index.url ||
          pathname.startsWith(node.index.url + "/"))
      ) {
        return true;
      }
      return node.children.some(isNodeActive);
    }
    return false;
  };

  // Recursive render function for tree nodes
  const renderNode = (node: Node, depth = 0): React.ReactNode => {
    if (node.type === "page") {
      const isActive = pathname === node.url;
      return (
        <SidebarItem
          key={node.$id ?? node.url}
          item={node}
          isActive={isActive}
          depth={depth}
        />
      );
    }

    if (node.type === "folder") {
      const folderId = node.$id ?? `folder-${node.name}`;
      const hasChildren = node.children.length > 0;
      const isActive = node.index ? pathname === node.index.url : false;
      const shouldExpand = isNodeActive(node);

      // Folder with only index, no children - render as a simple item
      if (!hasChildren && node.index) {
        return (
          <SidebarItem
            key={folderId}
            item={node.index}
            isActive={isActive}
            depth={depth}
          />
        );
      }

      return (
        <SidebarFolder
          key={folderId}
          name={node.name?.toString() ?? ""}
          defaultExpanded={shouldExpand}
          depth={depth}
          indexItem={node.index}
          isIndexActive={isActive}
        >
          {/* If folder has an index, show it as first item */}
          {node.index && (
            <SidebarItem
              item={{
                ...node.index,
                name: "Overview" as React.ReactNode,
              }}
              isActive={pathname === node.index.url}
              depth={depth + 1}
            />
          )}
          {node.children.map((child) => renderNode(child, depth + 1))}
        </SidebarFolder>
      );
    }

    if (node.type === "separator") {
      return (
        <div
          key={node.$id ?? `sep-${node.name}`}
          className="px-4 pt-6 pb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-item-foreground"
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
          <SidebarItem
            key={item.$id ?? item.url}
            item={item}
            isActive={isActive}
          />
        );
      }

      if (item.type === "folder") {
        const folderId = item.$id ?? `folder-${index}`;
        const hasChildren = item.children.length > 0;
        const isActive = item.index ? pathname === item.index.url : false;
        const shouldExpand = isNodeActive(item);

        if (!hasChildren && item.index) {
          return (
            <SidebarItem key={folderId} item={item.index} isActive={isActive} />
          );
        }

        return (
          <SidebarFolder
            key={folderId}
            name={item.name?.toString() ?? ""}
            defaultExpanded={shouldExpand}
            indexItem={item.index}
            isIndexActive={isActive}
          >
            {/* If folder has an index, show it as first item */}
            {item.index && (
              <SidebarItem
                item={{
                  ...item.index,
                  name: "Overview" as React.ReactNode,
                }}
                isActive={pathname === item.index.url}
                depth={1}
              />
            )}
            {item.children.map((child) => renderNode(child, 1))}
          </SidebarFolder>
        );
      }

      if (item.type === "separator") {
        return (
          <div
            key={item.$id ?? `sep-${index}`}
            className="px-4 pt-6 pb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-item-foreground"
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
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden w-75 flex-col justify-between overflow-hidden bg-sidebar-background border-r border-border p-6 lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-1">{renderTopLevel()}</div>
      </SidebarContent>

      {/* Footer section */}
      <div className="flex flex-col gap-6 mt-auto">
        <SidebarDivider />
        <div className="flex flex-col gap-1">
          <Link
            href="/docs"
            className={cn(
              "flex h-10 w-full items-center gap-2 px-4 py-3 text-base transition-colors",
              pathname === "/docs"
                ? "text-sidebar-item-foreground-active"
                : "text-sidebar-item-foreground hover:text-sidebar-item-foreground-hover",
            )}
          >
            Docs
          </Link>
          <Link
            href="/docs/components"
            className={cn(
              "flex h-10 w-full items-center gap-2 px-4 py-3 text-base transition-colors",
              pathname.startsWith("/docs/components")
                ? "text-sidebar-item-foreground-active"
                : "text-sidebar-item-foreground hover:text-sidebar-item-foreground-hover",
            )}
          >
            Components
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}
