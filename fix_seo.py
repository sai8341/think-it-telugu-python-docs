import os
import re

directories = [
    'docs/part-3/module-13-error-handling',
    'docs/part-3/module-14-file-handling',
    'docs/part-3/module-15-json'
]

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the frontmatter and remove it
    fm_match = re.search(r'^---\n(.*?)\n---', content, re.DOTALL)
    if fm_match:
        content = content.replace(fm_match.group(0), '', 1).strip()
        
    # Find the first H2 to use as title
    h2_match = re.search(r'^##\s+(?:\d+\.\d+\s+)?(.+)$', content, re.MULTILINE)
    
    if h2_match:
        clean_title = h2_match.group(1).strip()
    else:
        # Fallback if no H2
        clean_title = os.path.basename(filepath).replace('.mdx', '').replace('.md', '').replace('-', ' ').title()
        
    seo_title = f"{clean_title} - Python in Telugu | Think IT Telugu"
    sidebar = clean_title
    desc = f"Learn about {clean_title} in Python with real-world examples. This Think IT Telugu tutorial explains {clean_title} easily for AI and Data Science beginners."
    
    new_fm = f"""---
title: "{seo_title}"
sidebar_label: "{sidebar}"
description: "{desc}"
keywords: ["Python", "{clean_title}", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---
"""
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_fm + '\n' + content + '\n')
    print(f"Fixed: {filepath}")

for d in directories:
    if os.path.exists(d):
        for root, dirs, files in os.walk(d):
            for file in files:
                if file.endswith('.md') or file.endswith('.mdx'):
                    fix_file(os.path.join(root, file))
