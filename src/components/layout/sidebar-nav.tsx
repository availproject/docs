"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Root, Item, Node } from "fumadocs-core/page-tree";
import { CaretUp, CaretDown } from "@phosphor-icons/react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useAnalytics } from "@/hooks/use-analytics";
import { getActiveProduct } from "@/lib/products";
import { getProductTree } from "@/lib/page-tree-utils";

interface SidebarNavProps extends React.ComponentProps<typeof Sidebar> {
  tree: Root;
}

// Sidebar item component for pages/files
function SidebarItem({
  item,
  isActive,
  depth = 0,
  onNavigate,
}: {
  item: Item;
  isActive: boolean;
  depth?: number;
  onNavigate?: (title: string, path: string) => void;
}) {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate(
        typeof item.name === "string" ? item.name : String(item.name),
        item.url
      );
    }
  };

  return (
    <Link
      href={item.url}
      onClick={handleClick}
      className={cn(
        "flex h-10 w-full min-w-0 items-center gap-2 px-4 py-2.5 text-base transition-colors",
        isActive
          ? "bg-sidebar-item-background-active text-sidebar-item-foreground-active"
          : "bg-transparent text-sidebar-item-foreground hover:bg-sidebar-item-background-hover",
      )}
    >
      <span className="flex-1 min-w-0 truncate leading-5">{item.name}</span>
    </Link>
  );
}

// Sidebar folder component with expandable children
function SidebarFolder({
  name,
  children,
  defaultExpanded = false,
  isActive = false,
  href,
  onToggle,
  onNavigate,
}: {
  name: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  isActive?: boolean;
  href?: string;
  onToggle?: (folderName: string) => void;
  onNavigate?: (title: string, path: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    if (onToggle) {
      onToggle(name);
    }
  };

  const handleNameClick = (e: React.MouseEvent) => {
    if (isActive && isExpanded) {
      // Already on this page and expanded — collapse and don't navigate
      e.preventDefault();
      setIsExpanded(false);
    } else {
      // Expand (if collapsed) and navigate
      if (!isExpanded) {
        setIsExpanded(true);
      }
      if (onNavigate && href) {
        onNavigate(name, href);
      }
    }
  };

  const chevron = isExpanded ? (
    <CaretUp size={20} className="shrink-0 text-sidebar-item-foreground" />
  ) : (
    <CaretDown size={20} className="shrink-0 text-sidebar-item-foreground" />
  );

  return (
    <div className="flex flex-col w-full min-w-0">
      <div
        className={cn(
          "flex h-10 w-full min-w-0 items-center gap-2 px-4 py-2.5 text-base transition-colors",
          isActive
            ? "bg-sidebar-item-background-active text-sidebar-item-foreground-active"
            : "bg-transparent text-sidebar-item-foreground hover:bg-sidebar-item-background-hover",
        )}
      >
        {href ? (
          <Link
            href={href}
            onClick={handleNameClick}
            className="flex-1 min-w-0 truncate text-left leading-5"
          >
            {name}
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 min-w-0 truncate text-left leading-5"
          >
            {name}
          </button>
        )}
        <button
          type="button"
          onClick={handleToggle}
          className="shrink-0 p-0.5"
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          {chevron}
        </button>
      </div>
      {isExpanded && (
        <div className="flex gap-1 pl-4 min-w-0">
          {/* Vertical line */}
          <div className="w-px shrink-0 bg-border" />
          {/* Children wrapper */}
          <div className="flex flex-col flex-1 min-w-0">{children}</div>
        </div>
      )}
    </div>
  );
}

// Divider component
function SidebarDivider() {
  return <div className="h-px w-full bg-border" />;
}

export default function SidebarNav({ tree, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const { trackEvent } = useAnalytics();

  const activeProduct = getActiveProduct(pathname);
  const displayTree = activeProduct
    ? getProductTree(tree, activeProduct.slug)
    : tree;

  const handleNavigation = (title: string, path: string) => {
    trackEvent("nav_sidebar_item_clicked", {
      item_type: "page",
      item_title: title,
      destination_path: path,
    });
  };

  const handleFolderToggle = (folderName: string) => {
    trackEvent("nav_sidebar_item_clicked", {
      item_type: "folder",
      item_title: folderName,
    });
  };

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
          onNavigate={handleNavigation}
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
            onNavigate={handleNavigation}
          />
        );
      }

      return (
        <SidebarFolder
          key={folderId}
          name={node.name?.toString() ?? ""}
          defaultExpanded={shouldExpand}
          isActive={isActive}
          href={node.index?.url}
          onToggle={handleFolderToggle}
          onNavigate={handleNavigation}
        >
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
    return displayTree.children.map((item, index) => {
      if (item.type === "page") {
        const isActive = pathname === item.url;
        return (
          <SidebarItem
            key={item.$id ?? item.url}
            item={item}
            isActive={isActive}
            onNavigate={handleNavigation}
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
            <SidebarItem
              key={folderId}
              item={item.index}
              isActive={isActive}
              onNavigate={handleNavigation}
            />
          );
        }

        return (
          <SidebarFolder
            key={folderId}
            name={item.name?.toString() ?? ""}
            defaultExpanded={shouldExpand}
            isActive={isActive}
            href={item.index?.url}
            onToggle={handleFolderToggle}
            onNavigate={handleNavigation}
          >
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
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100vh-var(--header-height)-1px)] w-75 flex-col justify-between overflow-hidden bg-sidebar-background border-r border-border p-6 ui-16 lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-1 min-w-0">{renderTopLevel()}</div>
      </SidebarContent>

      {/* Footer section */}
      <div className="flex flex-col gap-6 mt-auto">
        <SidebarDivider />
        <div className="flex flex-col gap-1">
          <Link
            href="/docs/da/welcome-to-avail-docs"
            onClick={() => handleNavigation("Docs", "/docs/da/welcome-to-avail-docs")}
            className={cn(
              "flex h-10 w-full items-center gap-2 px-4 py-3 text-base transition-colors",
              pathname === "/docs/da/welcome-to-avail-docs"
                ? "text-sidebar-item-foreground-active"
                : "text-sidebar-item-foreground hover:text-sidebar-item-foreground-hover",
            )}
          >
            Docs
          </Link>
          <Link
            href="/docs/components"
            onClick={() => handleNavigation("Components", "/docs/components")}
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
