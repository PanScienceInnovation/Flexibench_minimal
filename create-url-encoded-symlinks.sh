#!/bin/bash

# Script to create URL-encoded symlinks for Next.js static export files
# This allows Nginx to serve files whether URLs are encoded or not

OUT_DIR="/home/ubuntu/Flexibench_new/Flexibench_minimal/out"
RESOURCES_DIRS=("resources/blogs" "resources/white-papers")

for dir in "${RESOURCES_DIRS[@]}"; do
    FULL_DIR="${OUT_DIR}/${dir}"
    if [ -d "$FULL_DIR" ]; then
        echo "Processing directory: $FULL_DIR"
        cd "$FULL_DIR"
        
        # Find all HTML files
        find . -maxdepth 1 -name "*.html" -type f | while read -r file; do
            filename=$(basename "$file" .html)
            
            # Skip if filename doesn't contain spaces or special chars
            if [[ "$filename" == *" "* ]] || [[ "$filename" == *":"* ]] || [[ "$filename" == *","* ]]; then
                # Create URL-encoded version
                encoded_filename=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$filename', safe=''))")
                encoded_file="${encoded_filename}.html"
                
                # Create symlink if it doesn't exist
                if [ ! -e "$encoded_file" ] && [ ! -L "$encoded_file" ]; then
                    ln -s "$(basename "$file")" "$encoded_file"
                    echo "Created symlink: $encoded_file -> $(basename "$file")"
                fi
            fi
        done
    fi
done

echo "Symlink creation complete!"
