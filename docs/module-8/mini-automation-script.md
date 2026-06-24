---
sidebar_position: 4
title: "Project 4: Mini Automation Script"
---

#  Project 4: Mini Automation Script

## Project Overview 

**Difficulty:**  Intermediate | **Time:** ~1.5 hours | **Concepts:** File I/O, os module, Automation, String Processing

> In this project, you will build a **File Organizer + Bulk Renamer + Report Generator**. In the real world, developers write scripts like this daily to automate boring, repetitive tasks!

---

## Complete Code 

```python
"""
 Think IT Telugu - Mini Automation Toolkit
Capstone Project 4
File organizer, bulk renamer, and text analyzer
"""

import os
import shutil
from datetime import datetime
from collections import Counter

# ==========================================
# TOOL 1: File Organizer
# ==========================================
def organize_files(source_dir):
    """
    Organizes files into subfolders based on their file extensions.
    For example, Images → images/, Documents → docs/, etc.
    """
    
    if not os.path.exists(source_dir):
        print(f" Directory '{source_dir}' not found!")
        return
    
    # Extension to folder mapping
    categories = {
        "images": [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp"],
        "documents": [".pdf", ".doc", ".docx", ".txt", ".ppt", ".pptx", ".xls", ".xlsx"],
        "videos": [".mp4", ".avi", ".mkv", ".mov", ".wmv"],
        "audio": [".mp3", ".wav", ".flac", ".aac", ".ogg"],
        "code": [".py", ".js", ".html", ".css", ".java", ".cpp", ".c"],
        "archives": [".zip", ".rar", ".7z", ".tar", ".gz"],
        "data": [".csv", ".json", ".xml", ".sql", ".db"],
    }
    
    moved_count = 0
    
    for filename in os.listdir(source_dir):
        filepath = os.path.join(source_dir, filename)
        
        # Skip directories
        if os.path.isdir(filepath):
            continue
        
        # Find category
        ext = os.path.splitext(filename)[1].lower()
        target_folder = "others"
        
        for category, extensions in categories.items():
            if ext in extensions:
                target_folder = category
                break
        
        # Create folder and move
        target_path = os.path.join(source_dir, target_folder)
        os.makedirs(target_path, exist_ok=True)
        
        dest = os.path.join(target_path, filename)
        # Avoid overwrite
        if os.path.exists(dest):
            name, ext = os.path.splitext(filename)
            dest = os.path.join(target_path, f"{name}_{datetime.now().strftime('%H%M%S')}{ext}")
        
        shutil.move(filepath, dest)
        moved_count += 1
        print(f"   {filename} → {target_folder}/")
    
    print(f"\n Organized {moved_count} files!")


# ==========================================
# TOOL 2: Bulk File Renamer
# ==========================================
def bulk_rename(directory, prefix="file", start_num=1):
    """
    Sequentially renames all files inside a directory.
    For example: photo_001.jpg, photo_002.jpg, etc.
    """
    
    if not os.path.exists(directory):
        print(f" Directory '{directory}' not found!")
        return
    
    files = [f for f in os.listdir(directory) if os.path.isfile(os.path.join(directory, f))]
    files.sort()
    
    if not files:
        print(" No files found!")
        return
    
    print(f"\n Preview ({len(files)} files):")
    rename_plan = []
    
    for i, filename in enumerate(files, start_num):
        ext = os.path.splitext(filename)[1]
        new_name = f"{prefix}_{i:03d}{ext}"
        rename_plan.append((filename, new_name))
        print(f"  {filename} → {new_name}")
    
    confirm = input(f"\n Rename {len(files)} files? (y/n): ").lower()
    
    if confirm == "y":
        for old_name, new_name in rename_plan:
            old_path = os.path.join(directory, old_name)
            new_path = os.path.join(directory, new_name)
            os.rename(old_path, new_path)
        print(f" Renamed {len(files)} files!")
    else:
        print(" Cancelled!")


# ==========================================
# TOOL 3: Text File Analyzer
# ==========================================
def analyze_text(filepath):
    """
    Analyzes a text file and generates statistics like word count and frequency.
    """
    
    if not os.path.exists(filepath):
        print(f" File '{filepath}' not found!")
        return
    
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    lines = content.split("\n")
    words = content.split()
    chars = len(content)
    chars_no_space = len(content.replace(" ", "").replace("\n", ""))
    
    # Word frequency
    word_freq = Counter(w.lower().strip(".,!?;:'\"") for w in words if w.strip(".,!?;:'\""))
    
    # Sentence count (approximate)
    sentences = content.count(".") + content.count("!") + content.count("?")
    
    # Generate report
    print(f"\n{'='*45}")
    print(f"   TEXT ANALYSIS REPORT")
    print(f"{'='*45}")
    print(f"  File: {os.path.basename(filepath)}")
    print(f"  Size: {os.path.getsize(filepath):,} bytes")
    print(f"{'─'*45}")
    print(f"   Lines          : {len(lines):,}")
    print(f"   Words          : {len(words):,}")
    print(f"   Characters     : {chars:,}")
    print(f"   Chars (no space): {chars_no_space:,}")
    print(f"   Sentences (est): {sentences:,}")
    print(f"   Avg words/line : {len(words)/max(len(lines),1):.1f}")
    print(f"   Avg word length: {chars_no_space/max(len(words),1):.1f}")
    print(f"{'─'*45}")
    print(f"   TOP 10 WORDS:")
    for word, count in word_freq.most_common(10):
        bar = "█" * min(count, 20)
        print(f"    {word:<15} {count:>4} {bar}")
    print(f"{'='*45}")


# ==========================================
# TOOL 4: Directory Report Generator
# ==========================================
def directory_report(path):
    """
    Generates a summary report of directory contents recursively.
    """
    
    if not os.path.exists(path):
        print(f" Path '{path}' not found!")
        return
    
    total_files = 0
    total_size = 0
    ext_count = Counter()
    largest_files = []
    
    for root, dirs, files in os.walk(path):
        for filename in files:
            filepath = os.path.join(root, filename)
            try:
                size = os.path.getsize(filepath)
                ext = os.path.splitext(filename)[1].lower() or "(no ext)"
                
                total_files += 1
                total_size += size
                ext_count[ext] += 1
                largest_files.append((filepath, size))
            except (OSError, PermissionError):
                continue
    
    # Sort largest files
    largest_files.sort(key=lambda x: x[1], reverse=True)
    
    # Size formatting
    def format_size(bytes_size):
        for unit in ["B", "KB", "MB", "GB"]:
            if bytes_size < 1024:
                return f"{bytes_size:.1f} {unit}"
            bytes_size /= 1024
        return f"{bytes_size:.1f} TB"
    
    print(f"\n{'='*50}")
    print(f"   DIRECTORY REPORT")
    print(f"{'='*50}")
    print(f"  Path: {path}")
    print(f"  Total Files: {total_files:,}")
    print(f"  Total Size : {format_size(total_size)}")
    print(f"{'─'*50}")
    print(f"   FILE TYPES:")
    for ext, count in ext_count.most_common(10):
        bar = "█" * min(count, 20)
        print(f"    {ext:<10} {count:>5} files {bar}")
    print(f"{'─'*50}")
    print(f"   TOP 5 LARGEST FILES:")
    for filepath, size in largest_files[:5]:
        name = os.path.basename(filepath)
        print(f"    {name:<30} {format_size(size):>10}")
    print(f"{'='*50}")


# ==========================================
# MAIN MENU
# ==========================================
def main():
    print("""
╔══════════════════════════════════════════╗
║    THINK IT TELUGU AUTOMATION TOOLKIT ║
╚══════════════════════════════════════════╝
    """)
    
    while True:
        print("""
   TOOLS:
  1.  File Organizer (by extension)
  2.  Bulk File Renamer
  3.  Text File Analyzer
  4.  Directory Report Generator
  0.  Exit
""")
        choice = input("  Choose tool (0-4): ").strip()
        
        if choice == "0":
            print("\n Happy Automating! ")
            break
        
        elif choice == "1":
            path = input("  Enter directory path: ").strip()
            organize_files(path)
        
        elif choice == "2":
            path = input("  Enter directory path: ").strip()
            prefix = input("  Prefix for files (default: 'file'): ").strip() or "file"
            bulk_rename(path, prefix)
        
        elif choice == "3":
            path = input("  Enter text file path: ").strip()
            analyze_text(path)
        
        elif choice == "4":
            path = input("  Enter directory path: ").strip()
            directory_report(path)
        
        else:
            print(" Invalid choice!")
        
        input("\n  Press Enter to continue...")

if __name__ == "__main__":
    main()
```

---

## Concepts Used 

| Concept | Where Used |
|---------|-----------|
| **os module** | File/directory operations |
| **shutil** | File moving |
| **Collections.Counter** | Word frequency, file type counting |
| **Functions** | Each tool is modular |
| **File I/O** | Text reading, report generation |
| **String Methods** | Text processing |
| **os.walk()** | Recursive directory traversal |
| **Exception Handling** | Permission/OS errors |

---

##  Course Complete!

**Congratulations!**  You have successfully completed the "Think IT Telugu - Python for College Students" course!

### What You Can Do Now:
-  Write Python programs with confidence
-  Solve complex logic building problems
-  Build real projects using OOP concepts
-  Read, write, and manipulate files
-  Write automation scripts for repetitive tasks
-  Prepare effectively for placement interviews

### Next Steps 
1. **Practice daily**: Solve coding problems on HackerRank or LeetCode.
2. **Build projects**: Create unique personal projects and upload them to GitHub.
3. **Explore advanced topics**: Dive into Web Development (Flask/Django), Data Science (Pandas), or Machine Learning.
4. **Contribute**: Look for open-source Python projects on GitHub and contribute.

> *"The best way to learn programming is by programming."* - Keep coding, keep growing! 
