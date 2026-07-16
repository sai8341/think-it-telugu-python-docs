import os
import re

directories = [
    'docs/part-3/module-13-error-handling',
    'docs/part-3/module-14-file-handling',
    'docs/part-3/module-15-json'
]

def promote_first_heading(filepath):
    # Skip the intro file as it was already rewritten correctly
    if os.path.basename(filepath) == '0-intro.mdx':
        return
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We want to replace the first occurrence of "## [Number] Heading" or "## Heading"
    # only if it is the first heading in the file.
    # Let's search for the first heading starting with ##
    
    # We find the first ## at the beginning of a line
    match = re.search(r'^##\s+(.*)$', content, re.MULTILINE)
    if match:
        heading_text = match.group(1).strip()
        # Clean up any numeric prefixes like "13.1 ", "14.2.3 ", etc.
        clean_heading = re.sub(r'^[0-9.]+\s+', '', heading_text)
        
        # Replace the first occurrence in the content
        # We use re.sub with count=1
        # To avoid replacing other ## headings, we match the exact first line
        escaped_match = re.escape(match.group(0))
        new_content = re.sub(r'^' + escaped_match + r'$', f'# {clean_heading}', content, count=1, flags=re.MULTILINE)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Promoted heading in: {filepath} -> '# {clean_heading}'")

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith('.md') or file.endswith('.mdx'):
                promote_first_heading(os.path.join(root, file))
