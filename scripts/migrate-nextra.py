#!/usr/bin/env python3
"""
Migration script: Nextra → Fumadocs

Transforms Avail docs from Nextra format to Fumadocs format:
1. Copies MDX files from docs/app/ to fumadocs/content/docs/
2. Transforms imports: nextra/components → @/components/nextra-compat
3. Transforms components: Tabs.Tab → Tab, Cards.Card → Card
4. Converts _meta.ts → meta.json
5. Renames page.mdx → index.mdx
6. Preserves URL structure

Usage:
    python scripts/migrate-nextra.py [--dry-run]
"""

import os
import re
import json
import shutil
import argparse
from pathlib import Path
from typing import Optional

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
SOURCE_DIR = PROJECT_ROOT.parent / "docs" / "app"
TARGET_DIR = PROJECT_ROOT / "content" / "docs"


def transform_imports(content: str) -> str:
    """Transform Nextra imports to Fumadocs imports."""

    # Pattern to match nextra/components imports
    nextra_import_pattern = r"import\s*\{([^}]+)\}\s*from\s*['\"]nextra/components['\"]"

    def replace_import(match):
        components = match.group(1)
        # Parse components and transform
        comp_list = [c.strip() for c in components.split(',')]

        # Map component names
        mapped = []
        for comp in comp_list:
            if comp:
                # Add base components that we support
                if comp in ['Tabs', 'Cards', 'Callout', 'Steps']:
                    mapped.append(comp)
                elif comp == 'Image':
                    # Next.js Image - handle separately
                    continue
                else:
                    mapped.append(comp)

        if not mapped:
            return ''

        return f"import {{ {', '.join(mapped)} }} from '@/components/nextra-compat'"

    content = re.sub(nextra_import_pattern, replace_import, content)

    # Handle @components/icons imports - map to our FileIcon
    icon_pattern = r"import\s*\{([^}]+)\}\s*from\s*['\"]@components/icons['\"]"

    def replace_icon_import(match):
        icons = match.group(1)
        icon_list = [i.strip() for i in icons.split(',')]
        # Map all icons to FileIcon for now
        return "import { FileIcon } from '@/components/nextra-compat'"

    content = re.sub(icon_pattern, replace_icon_import, content)

    # Handle @components/Youtube import
    youtube_pattern = r"import\s+YouTube\s+from\s*['\"]@components/Youtube['\"]"
    content = re.sub(youtube_pattern, "import { YouTube } from '@/components/nextra-compat'", content)

    # Remove next/image imports (Fumadocs uses standard img or its own Image)
    content = re.sub(r"import\s+Image\s+from\s*['\"]next/image['\"][\s;]*\n?", '', content)

    # Handle @components/SyncedTabs import - just remove it, we'll use existing Tabs
    synced_pattern = r"import\s*\{[^}]+\}\s*from\s*['\"]@components/SyncedTabs['\"][\s;]*\n?"
    content = re.sub(synced_pattern, '', content)

    # Consolidate multiple imports from same source
    def consolidate_imports(content: str) -> str:
        """Merge multiple imports from the same module."""
        import_pattern = r"import\s*\{\s*([^}]+)\s*\}\s*from\s*['\"](@/components/nextra-compat)['\"]"
        imports = set()

        for match in re.finditer(import_pattern, content):
            components = [c.strip() for c in match.group(1).split(',') if c.strip()]
            imports.update(components)

        if not imports:
            return content

        # Remove all individual imports
        content = re.sub(import_pattern + r"[\s;]*\n?", '', content)

        # Add consolidated import after frontmatter
        import_line = f"import {{ {', '.join(sorted(imports))} }} from '@/components/nextra-compat'\n\n"

        # Find end of frontmatter (second ---)
        fm_match = re.match(r'^---\n.*?\n---\n*', content, re.DOTALL)
        if fm_match:
            fm_end = fm_match.end()
            content = content[:fm_end] + import_line + content[fm_end:].lstrip()
        else:
            content = import_line + content

        return content

    content = consolidate_imports(content)

    return content


def transform_components(content: str) -> str:
    """Transform Nextra component syntax to Fumadocs syntax."""

    # Fix unsupported code block languages
    content = re.sub(r'```env\b', '```bash', content)

    # Tabs.Tab → Tab
    content = re.sub(r'<Tabs\.Tab\b', '<Tab', content)
    content = re.sub(r'</Tabs\.Tab>', '</Tab>', content)

    # Cards.Card → Card
    content = re.sub(r'<Cards\.Card\b', '<Card', content)
    content = re.sub(r'</Cards\.Card>', '</Card>', content)

    # SyncedTabs → Tabs with groupId
    # <SyncedTabsProvider>...</SyncedTabsProvider> → remove wrapper
    content = re.sub(r'<SyncedTabsProvider>\s*', '', content)
    content = re.sub(r'\s*</SyncedTabsProvider>', '', content)

    # <SyncedTabs items={[...]}> → <Tabs items={[...]} groupId="synced">
    content = re.sub(r'<SyncedTabs\s+items=', '<Tabs groupId="synced" items=', content)
    content = re.sub(r'</SyncedTabs>', '</Tabs>', content)

    # SyncedTabs.Tab → Tab
    content = re.sub(r'<SyncedTabs\.Tab\b', '<Tab', content)
    content = re.sub(r'</SyncedTabs\.Tab>', '</Tab>', content)

    # Map icon components to FileIcon
    content = re.sub(r'<FilesIcon\s*/>', '<FileIcon />', content)
    content = re.sub(r'\{<FilesIcon\s*/>\}', '{<FileIcon />}', content)

    return content


def extract_title_from_content(content: str) -> Optional[str]:
    """Extract title from first H1 heading in content."""
    # Look for # Title pattern after frontmatter
    match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return None


def ensure_title_in_frontmatter(content: str, fallback_title: str) -> str:
    """Ensure frontmatter has a title field."""

    # Check if frontmatter exists
    if not content.startswith('---'):
        # No frontmatter - add it with title
        title = extract_title_from_content(content) or fallback_title
        return f'---\ntitle: "{title}"\n---\n\n{content}'

    # Check if title already exists in frontmatter
    frontmatter_match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        if re.search(r'^title:', frontmatter, re.MULTILINE):
            # Title exists, return as-is
            return content

        # Title doesn't exist - add it
        title = extract_title_from_content(content) or fallback_title
        # Escape quotes in title
        title = title.replace('"', '\\"')
        new_frontmatter = f'title: "{title}"\n{frontmatter}'
        return f'---\n{new_frontmatter}\n---{content[frontmatter_match.end():]}'

    return content


def transform_frontmatter(content: str) -> str:
    """Transform frontmatter for Fumadocs compatibility."""

    # Fix trailing spaces after frontmatter delimiters: '--- ' -> '---'
    content = re.sub(r'^---\s+$', '---', content, flags=re.MULTILINE)

    # Remove asIndexPage (Fumadocs uses index.mdx naming instead)
    content = re.sub(r'^asIndexPage:\s*true\s*\n', '', content, flags=re.MULTILINE)

    return content


def remove_mdx_layout(content: str) -> str:
    """Remove MdxLayout exports that reference undefined Image."""
    # Remove cloneElement import
    content = re.sub(r"import\s*\{\s*cloneElement\s*\}\s*from\s*['\"]react['\"][\s;]*\n?", '', content)

    # Remove MdxLayout export default function
    mdx_layout_pattern = r"export\s+default\s+function\s+MdxLayout\s*\([^)]*\)\s*\{[^}]*components:\s*\{[^}]*img:\s*Image[^}]*\}[^}]*\}[^}]*\}\s*\n*"
    content = re.sub(mdx_layout_pattern, '', content, flags=re.DOTALL)

    return content


def transform_mdx_content(content: str) -> str:
    """Apply all transformations to MDX content."""
    content = transform_imports(content)
    content = transform_components(content)
    content = transform_frontmatter(content)
    content = remove_mdx_layout(content)
    return content


def parse_meta_ts(content: str) -> dict:
    """Parse TypeScript _meta.ts file to extract navigation structure."""

    # Remove 'export default' and get the object
    content = re.sub(r'export\s+default\s*', '', content)

    # This is a simplified parser - handles common cases
    result = {}

    # Try to parse as JSON-like (after cleaning up TS syntax)
    # Remove trailing commas before closing braces
    content = re.sub(r',(\s*[}\]])', r'\1', content)

    # Handle simple key-value pairs: "key": "value"
    simple_pattern = r'"([^"]+)":\s*"([^"]+)"'
    for match in re.finditer(simple_pattern, content):
        key, value = match.groups()
        result[key] = value

    # Handle object values with display: hidden
    hidden_pattern = r'"([^"]+)":\s*\{\s*"?display"?:\s*"hidden"'
    for match in re.finditer(hidden_pattern, content):
        key = match.group(1)
        result[key] = {"display": "hidden"}

    # Handle object values with title
    title_pattern = r'"([^"]+)":\s*\{\s*(?:"?type"?:\s*"[^"]+",?\s*)?(?:"?title"?:\s*"([^"]+)")'
    for match in re.finditer(title_pattern, content):
        key, title = match.groups()
        if key not in result:
            result[key] = title

    # Handle unquoted keys
    unquoted_pattern = r"'([^']+)':\s*['\"]([^'\"]+)['\"]"
    for match in re.finditer(unquoted_pattern, content):
        key, value = match.groups()
        if key not in result:
            result[key] = value

    return result


def convert_meta_to_json(meta_dict: dict) -> dict:
    """Convert parsed meta dict to Fumadocs meta.json format."""

    # Fumadocs meta.json must be an object with optional 'pages' array
    pages = []

    for key, value in meta_dict.items():
        if isinstance(value, str):
            # Simple title mapping - Fumadocs will use the frontmatter title
            pages.append(key)
        elif isinstance(value, dict):
            if value.get("display") == "hidden":
                # Skip hidden pages from navigation
                continue
            else:
                pages.append(key)

    # Return object format
    if pages:
        return {"pages": pages}
    return {}


def migrate_file(source_path: Path, target_path: Path, dry_run: bool = False) -> None:
    """Migrate a single MDX file."""

    # Read source
    content = source_path.read_text(encoding='utf-8')

    # Generate fallback title from filename
    fallback_title = source_path.parent.name.replace('-', ' ').title()

    # Transform content
    transformed = transform_mdx_content(content)

    # Ensure title exists in frontmatter
    transformed = ensure_title_in_frontmatter(transformed, fallback_title)

    if dry_run:
        print(f"  Would write: {target_path}")
        if content != transformed:
            print(f"    (with transformations)")
    else:
        # Create target directory
        target_path.parent.mkdir(parents=True, exist_ok=True)

        # Write transformed content
        target_path.write_text(transformed, encoding='utf-8')
        print(f"  Migrated: {target_path.relative_to(TARGET_DIR)}")


def migrate_meta_file(source_path: Path, target_dir: Path, dry_run: bool = False) -> None:
    """Convert _meta.ts to meta.json."""

    content = source_path.read_text(encoding='utf-8')
    meta_dict = parse_meta_ts(content)
    meta_json = convert_meta_to_json(meta_dict)

    target_path = target_dir / "meta.json"

    if dry_run:
        print(f"  Would create: {target_path}")
        print(f"    Content: {json.dumps(meta_json, indent=2)[:100]}...")
    else:
        target_dir.mkdir(parents=True, exist_ok=True)
        target_path.write_text(json.dumps(meta_json, indent=2), encoding='utf-8')
        print(f"  Created: {target_path.relative_to(TARGET_DIR)}")


def get_target_path(source_path: Path, source_base: Path, target_base: Path) -> Path:
    """Calculate target path, handling page.mdx → index.mdx conversion."""

    # Get relative path from source base
    rel_path = source_path.relative_to(source_base)

    # Convert page.mdx to index.mdx
    if rel_path.name == "page.mdx":
        rel_path = rel_path.parent / "index.mdx"

    return target_base / rel_path


def migrate_directory(source_dir: Path, target_dir: Path, dry_run: bool = False) -> dict:
    """Migrate all files in a directory recursively."""

    stats = {"mdx": 0, "meta": 0, "skipped": 0}

    # Skip certain directories
    skip_dirs = {"archived-content", "clash-of-nodes", "node_modules", ".next"}

    for item in source_dir.rglob("*"):
        # Skip if in a skipped directory
        if any(skip in item.parts for skip in skip_dirs):
            continue

        if item.is_file():
            if item.suffix == ".mdx":
                target_path = get_target_path(item, source_dir, target_dir)
                migrate_file(item, target_path, dry_run)
                stats["mdx"] += 1
            elif item.name == "_meta.ts":
                target_subdir = target_dir / item.parent.relative_to(source_dir)
                migrate_meta_file(item, target_subdir, dry_run)
                stats["meta"] += 1
            else:
                stats["skipped"] += 1

    return stats


def main():
    parser = argparse.ArgumentParser(description="Migrate Nextra docs to Fumadocs")
    parser.add_argument("--dry-run", action="store_true", help="Preview changes without writing")
    parser.add_argument("--clean", action="store_true", help="Clean target directory first")
    args = parser.parse_args()

    print(f"Source: {SOURCE_DIR}")
    print(f"Target: {TARGET_DIR}")
    print()

    if not SOURCE_DIR.exists():
        print(f"Error: Source directory not found: {SOURCE_DIR}")
        return 1

    if args.clean and not args.dry_run:
        print("Cleaning target directory...")
        if TARGET_DIR.exists():
            # Keep the existing test files
            for item in TARGET_DIR.iterdir():
                if item.name not in ["index.mdx", "test.mdx", "component-test.mdx"]:
                    if item.is_dir():
                        shutil.rmtree(item)
                    else:
                        item.unlink()

    print("Migrating files...")
    stats = migrate_directory(SOURCE_DIR, TARGET_DIR, args.dry_run)

    print()
    print(f"Migration {'preview' if args.dry_run else 'complete'}:")
    print(f"  MDX files: {stats['mdx']}")
    print(f"  Meta files: {stats['meta']}")
    print(f"  Skipped: {stats['skipped']}")

    if args.dry_run:
        print()
        print("Run without --dry-run to apply changes.")

    return 0


if __name__ == "__main__":
    exit(main())
