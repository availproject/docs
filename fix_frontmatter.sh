#!/bin/bash

# Directory to search in
APP_DIR="./app"

# Find all MDX files recursively
find "$APP_DIR" -type f -name "*.mdx" | while read -r file; do
  echo "Processing: $file"
  
  # Check if the file has frontmatter (starts with ---)
  if grep -q "^---" "$file"; then
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Use awk to process the file and remove empty lines before closing frontmatter
    awk '
      BEGIN { in_frontmatter = 0; content = ""; }
      
      # Start of frontmatter
      /^---/ && !in_frontmatter { 
        in_frontmatter = 1; 
        print $0; 
        next; 
      }
      
      # Inside frontmatter
      in_frontmatter { 
        if (/^---/) {
          # Found closing frontmatter, print it
          in_frontmatter = 0;
          print $0;
        } else if (/^[ \t]*$/) {
          # Empty line, buffer it instead of printing
          content = content "\n";
        } else {
          # Non-empty line, print buffered content and current line
          printf "%s%s\n", content, $0;
          content = "";
        }
        next;
      }
      
      # Outside frontmatter, print everything
      { print $0; }
    ' "$file" > "$temp_file"
    
    # Replace original file with modified one
    mv "$temp_file" "$file"
    
    echo "  Fixed frontmatter in $file"
  else
    echo "  No frontmatter found in $file"
  fi
done

echo "All MDX files processed!"