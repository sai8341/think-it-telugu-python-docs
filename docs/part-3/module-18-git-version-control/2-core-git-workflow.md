---
title: "The Core Git Workflow - Python in Telugu | Think IT Telugu"
sidebar_label: "The Core Git Workflow"
description: "Learn about The Core Git Workflow in Python with real-world examples. This Think IT Telugu tutorial explains The Core Git Workflow easily for AI and Data Science beginners."
keywords: ["Python", "The Core Git Workflow", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# The Core Git Workflow

To save snapshots of your files locally, you will follow a simple 3-stage loop: writing code, staging modified files, and committing.

---

## 18.2.1 Understanding the 3 Stages of Git

Before saving anything, Git divides your directory files into three zones:

1.  **Working Directory:** The physical folder on your computer where you write and edit code.
2.  **Staging Area:** A digital staging table. You choose which modified files are ready to be saved in the next snapshot.
3.  **Local Git Repository:** The secure database where all completed snapshots (commits) are permanently stored.

```text
  [ Working Directory ] ───( git add )───> [ Staging Area ] ───( git commit )───> [ Local Repository ]
```

---

## 18.2.2 Step-by-Step Commands

### Step 1: Initialize Git in your Project
Create a folder, open your terminal inside it, and initialize a Git repository:
```bash
git init
```
*(This creates a hidden `.git` folder that tracks all history. Run this only once per project!)*

### Step 2: Check Repository Status
At any point, inspect which files are changed or untracked:
```bash
git status
```

### Step 3: Stage Files (`git add`)
Choose which files should go into your next snapshot:
```bash
# Stage a specific file
git add main.py

# Stage ALL files in the project (Recommended)
git add .
```

### Step 4: Save a Snapshot (`git commit`)
Save your staged files to the repository database with a clear log message:
```bash
git commit -m "Add variables and data types study script"
```
*(The `-m` flag stands for "message". Always write a short, descriptive message explaining what changed).*

### Step 5: View History Log
View the history log of all snapshots saved:
```bash
git log --oneline
```
*(This prints a neat, single-line list of your commits alongside their unique tracking ID hashes).*