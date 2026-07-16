import os
import re

directories = ['docs/part-2', 'docs/part-3']

def fix_keywords(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the keywords array that might be unquoted and causing issues.
    # Look for: keywords: [Python, ..., Telugu tutorial, Learn Python in Telugu, AI, Data Science]
    # We will replace the entire keywords line with a safely quoted version.
    
    # Extract the clean_h1 from the title or sidebar_label
    title_match = re.search(r'^sidebar_label:\s*"(.*?)"', content, re.MULTILINE)
    if not title_match:
        return
        
    clean_h1 = title_match.group(1).strip()
    
    # We need to replace the line starting with keywords: [
    def replace_keywords(match):
        return f'keywords: ["Python", "{clean_h1.replace("`", "")}", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]'
        
    new_content = re.sub(r'^keywords:\s*\[.*?\].*$', replace_keywords, content, flags=re.MULTILINE)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed keywords in: {filepath}")

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith('.md') or file.endswith('.mdx'):
                fix_keywords(os.path.join(root, file))
