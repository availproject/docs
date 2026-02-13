"use client";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import type { Item, Node, Root } from "fumadocs-core/page-tree";
import { ChevronDown, Database, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useAnalytics } from "@/hooks/use-analytics";
import { getProductTree } from "@/lib/page-tree-utils";
import { getActiveProduct } from "@/lib/products";
import { cn } from "@/lib/utils";

const SIDEBAR_TABS = [
  {
    id: "nexus",
    label: " Avail Nexus",
    description: "Crosschain Interoperability Protocol",
    href: "/docs/nexus/introduction-to-nexus",
    pathPrefix: "/docs/nexus",
    icon: Zap,
  },
  {
    id: "da",
    label: "Avail DA",
    description: "Data Availability Layer",
    href: "/docs/da",
    pathPrefix: "/docs/da",
    icon: Database,
  },
];

interface SidebarNavProps extends React.ComponentProps<typeof Sidebar> {
  tree: Root;
}

// Sidebar item component for pages/files
function SidebarItem({
  item,
  isActive,
  depth: _depth = 0,
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
        item.url,
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
  const chevronRef = useRef<HTMLSpanElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    // Chevron click — toggle only, no navigation
    if (chevronRef.current?.contains(e.target as globalThis.Node)) {
      e.preventDefault();
      setIsExpanded((prev) => !prev);
      if (onToggle) onToggle(name);
      return;
    }

    if (href) {
      if (isActive && isExpanded) {
        // Already on this page and expanded — collapse and don't navigate
        e.preventDefault();
        setIsExpanded(false);
      } else {
        // Expand (if collapsed) and navigate
        if (!isExpanded) {
          setIsExpanded(true);
        }
        if (onNavigate) {
          onNavigate(name, href);
        }
      }
    } else {
      setIsExpanded(!isExpanded);
    }
    if (onToggle) {
      onToggle(name);
    }
  };

  const chevron = isExpanded ? (
    <CaretUp size={20} className="shrink-0 text-sidebar-item-foreground" />
  ) : (
    <CaretDown size={20} className="shrink-0 text-sidebar-item-foreground" />
  );

  const rowClassName = cn(
    "flex h-10 w-full min-w-0 items-center gap-2 px-4 py-2.5 text-base transition-colors",
    isActive
      ? "bg-sidebar-item-background-active text-sidebar-item-foreground-active"
      : "bg-transparent text-sidebar-item-foreground hover:bg-sidebar-item-background-hover",
  );

  return (
    <div className="flex flex-col w-full min-w-0">
      {href ? (
        <Link
          href={href}
          onClick={handleClick}
          className={rowClassName}
          aria-expanded={isExpanded}
        >
          <span className="flex-1 min-w-0 truncate text-left leading-5">
            {name}
          </span>
          <span
            ref={chevronRef}
            className="shrink-0 rounded-sm p-0.5 hover:bg-sidebar-item-background-hover"
          >
            {chevron}
          </span>
        </Link>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className={rowClassName}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          <span className="flex-1 min-w-0 truncate text-left leading-5">
            {name}
          </span>
          <span
            ref={chevronRef}
            className="shrink-0 rounded-sm p-0.5 hover:bg-sidebar-item-background-hover"
          >
            {chevron}
          </span>
        </button>
      )}
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

function SidebarTabDropdown({
  activeTab,
}: {
  activeTab: (typeof SIDEBAR_TABS)[number] | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTab = activeTab ?? SIDEBAR_TABS[0];
  const Icon = currentTab.icon;

  return (
    <div
      ref={dropdownRef}
      className="relative pb-4 mb-4 border-b border-border"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
          "bg-sidebar-item-background-active text-sidebar-item-foreground-active",
        )}
      >
        <Icon className="size-4 shrink-0" />
        <div className="flex flex-col flex-1 text-left">
          <span className="font-medium leading-5">{currentTab.label}</span>
          <span className="text-xs text-muted-foreground leading-4">
            {currentTab.description}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 flex flex-col gap-0.5 rounded-lg border border-border bg-sidebar-background p-1 shadow-md">
          {SIDEBAR_TABS.filter((tab) => tab.id !== currentTab.id).map((tab) => {
            const TabIcon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-item-foreground transition-colors hover:bg-sidebar-item-background-hover"
              >
                <TabIcon className="size-4 shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium leading-5">{tab.label}</span>
                  <span className="text-xs text-muted-foreground leading-4">
                    {tab.description}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function SidebarNav({ tree, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const { trackEvent } = useAnalytics();

  const activeProduct = getActiveProduct(pathname);
  const _displayTree = activeProduct
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
      return pathname === node.url || pathname.startsWith(`${node.url}/`);
    }
    if (node.type === "folder") {
      if (
        node.index &&
        (pathname === node.index.url ||
          pathname.startsWith(`${node.index.url}/`))
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

  const activeTab = SIDEBAR_TABS.find((tab) =>
    pathname.startsWith(tab.pathPrefix),
  );

  // Find the active section folder based on the current URL
  const getActiveSectionChildren = (): Node[] => {
    if (!activeTab) return tree.children;

    // Match folder by checking if its index or any child URL starts with the tab prefix
    const matchesTab = (node: Node): boolean => {
      if (node.type === "page")
        return node.url.startsWith(activeTab.pathPrefix);
      if (node.type === "folder") {
        if (node.index?.url?.startsWith(activeTab.pathPrefix)) return true;
        return node.children.some(matchesTab);
      }
      return false;
    };

    const activeFolder = tree.children.find(
      (node) => node.type === "folder" && matchesTab(node),
    );

    if (activeFolder && activeFolder.type === "folder") {
      const items: Node[] = [];
      if (activeFolder.index) {
        items.push({
          ...activeFolder.index,
          name: "Overview" as React.ReactNode,
        } as Item);
      }
      items.push(...activeFolder.children);
      return items;
    }

    // Fallback: show all top-level items
    return tree.children;
  };

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100vh-var(--header-height)-1px)] w-75 flex-col justify-between overflow-hidden bg-sidebar-background border-r border-border p-6 ui-16 lg:flex"
      collapsible="none"
      {...props}
    >
      {/* Sidebar Tab Dropdown */}
      <SidebarTabDropdown activeTab={activeTab} />

      <SidebarContent className="no-scrollbar flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-1">
          {getActiveSectionChildren().map((item) => renderNode(item))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
