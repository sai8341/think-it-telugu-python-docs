import os
import re

directories = ['docs/part-2', 'docs/part-3']

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the frontmatter
    fm_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    # Find the H1
    h1_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    
    if not h1_match:
        return # Skip if no H1
        
    h1_text = h1_match.group(1).strip()
    
    # Remove old frontmatter
    if fm_match:
        content = content.replace(fm_match.group(0), '', 1).strip()
        
    # Clean the H1 to make it a good keyword
    clean_h1 = h1_text.replace('Module ', '').split(':')[-1].strip()
        
    seo_title = f"{h1_text} - Python in Telugu | Think IT Telugu"
    sidebar = h1_text
    
    desc = f"Learn about {clean_h1} in Python with real-world examples. This Think IT Telugu tutorial explains {clean_h1} easily for AI and Data Science beginners."
    
    # Create the new frontmatter
    new_fm = f"""---
title: "{seo_title}"
sidebar_label: "{sidebar}"
description: "{desc}"
keywords: [Python, {clean_h1}, Telugu tutorial, Learn Python in Telugu, AI, Data Science]
---
"""
    
    new_content = new_fm + '\n' + content
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated: {filepath}")

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith('.md') or file.endswith('.mdx'):
                process_file(os.path.join(root, file))
