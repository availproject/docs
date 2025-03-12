#!/bin/bash

# Path to your app directory containing MDX files
APP_DIR="./app"

# Find all MDX files recursively in the app directory
find "$APP_DIR" -type f -name "*.mdx" | while read -r file; do
  echo "Processing file: $file"
  
  # Check if the file starts with frontmatter (--- at the beginning)
  if grep -q "^---" "$file"; then
    echo "  Found existing frontmatter, adding image property"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Add the first frontmatter delimiter, image property, and preserve existing frontmatter content
    awk '
    BEGIN { found_first_delimiter = 0; printed_image = 0; }
    {
      if (!found_first_delimiter && $0 ~ /^---/) {
        print "---";
        print "image: \"/img/docs-link-preview.png\"";
        found_first_delimiter = 1;
        next;
      }
      print $0;
    }' "$file" > "$temp_file"
    
    # Replace the original file with the modified one
    mv "$temp_file" "$file"
    
  else
    echo "  No frontmatter found, adding new frontmatter"
    
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Add new frontmatter with image property
    cat > "$temp_file" << EOF
---
image: '/img/docs-link-preview.png'
---

EOF
    
    # Append the original file content
    cat "$file" >> "$temp_file"
    
    # Replace the original file with the modified one
    mv "$temp_file" "$file"
  fi
  
  echo "  Completed processing $file"
done

echo "All MDX files have been processed!"
