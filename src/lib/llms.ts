import type { Node, Item, Folder } from 'fumadocs-core/page-tree';
import { source } from '@/lib/source';
import { products } from '@/lib/products';
import { getProductTree } from '@/lib/page-tree-utils';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract a plain-text string from a page-tree node's name (ReactNode). */
function nodeText(node: { name: React.ReactNode }): string {
  if (typeof node.name === 'string') return node.name;
  return String(node.name ?? '');
}

/** Extract a plain-text description from a page-tree node, if present. */
function nodeDescription(node: Item | Folder): string | undefined {
  if (typeof node.description === 'string' && node.description.length > 0) {
    return node.description;
  }
  return undefined;
}

/** Format a single page link as a markdown bullet. */
function bulletLink(name: string, url: string, description?: string): string {
  if (description) {
    return `- [${name}](${url}): ${description}`;
  }
  return `- [${name}](${url})`;
}

// ---------------------------------------------------------------------------
// generateLlmsTxt — lightweight navigation guide
// ---------------------------------------------------------------------------

export function generateLlmsTxt(): string {
  const lines: string[] = [
    '# Avail Documentation',
    '',
    '> Avail is a modular blockchain focused on data availability and cross-chain interoperability. This documentation covers Avail DA (data availability layer) and Avail Nexus (cross-chain unification).',
    '',
    '- [Full documentation for LLMs](/llms-full.txt): Complete content for all documentation pages',
  ];

  for (const product of products) {
    lines.push('', `## ${product.label}`, '');
    const tree = getProductTree(source.pageTree as any, product.slug);
    walkNav(tree.children, lines, 0);
  }

  return lines.join('\n');
}

/** Recursively walk the tree and emit navigation bullets. */
function walkNav(nodes: Node[], lines: string[], depth: number): void {
  for (const node of nodes) {
    if (node.type === 'separator') continue;

    if (node.type === 'folder') {
      const folder = node as Folder;
      const name = nodeText(folder);

      if (depth === 0) {
        lines.push(`### ${name}`, '');
      }

      // Emit the folder's index page as a bullet if it exists
      if (folder.index) {
        const desc = nodeDescription(folder) ?? nodeDescription(folder.index);
        lines.push(bulletLink(name, folder.index.url, desc));
      }

      walkNav(folder.children, lines, depth + 1);

      // Add a blank line after top-level sections
      if (depth === 0) lines.push('');
    }

    if (node.type === 'page') {
      const item = node as Item;
      const desc = nodeDescription(item);
      lines.push(bulletLink(nodeText(item), item.url, desc));
    }
  }
}

// ---------------------------------------------------------------------------
// generateLlmsFullTxt — full content organized by section
// ---------------------------------------------------------------------------

export async function generateLlmsFullTxt(): Promise<string> {
  const lines: string[] = [
    '# Avail Documentation',
    '',
    '> Avail is a modular blockchain focused on data availability and cross-chain interoperability. This documentation covers Avail DA (data availability layer) and Avail Nexus (cross-chain unification).',
  ];

  for (const product of products) {
    lines.push('', `## ${product.label}`);
    const tree = getProductTree(source.pageTree as any, product.slug);
    await walkFull(tree.children, lines, 0);
  }

  return lines.join('\n');
}

/** Recursively walk the tree and emit full page content. */
async function walkFull(
  nodes: Node[],
  lines: string[],
  depth: number,
): Promise<void> {
  for (const node of nodes) {
    if (node.type === 'separator') continue;

    if (node.type === 'folder') {
      const folder = node as Folder;
      lines.push('', `### ${nodeText(folder)}`, '');

      // Emit index page content if present
      if (folder.index) {
        await emitPageContent(folder.index, lines);
      }

      await walkFull(folder.children, lines, depth + 1);
    }

    if (node.type === 'page') {
      await emitPageContent(node as Item, lines);
    }
  }
}

/** Resolve a page-tree item to its full processed text and append it. */
async function emitPageContent(item: Item, lines: string[]): Promise<void> {
  const page = source.getNodePage(item);
  if (!page) return;

  const content = await page.data.getText('processed');
  lines.push(`#### ${page.data.title}`, '', content, '');
}
