---
title: "GitHub & Secrets Security - Python in Telugu | Think IT Telugu"
sidebar_label: "GitHub & Secrets Security"
description: "Learn about GitHub & Secrets Security in Python with real-world examples. This Think IT Telugu tutorial explains GitHub & Secrets Security easily for AI and Data Science beginners."
keywords: ["Python", "GitHub & Secrets Security", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# GitHub & Secrets Security

Once you have saved commits locally, you should back them up online to **GitHub** and configure rules to keep secret files safe.

---

## 18.3.1 Pushing Code to GitHub

To push your local repository online, you must link your local Git database to a remote GitHub repository.

### Step 1: Create a Repo on GitHub
1.  Go to [github.com](https://github.com) and log in.
2.  Click **New** to create a repository.
3.  Name it (e.g., `my-first-app`) and leave the initialization checkboxes (README, .gitignore) unchecked. Click **Create Repository**.

### Step 2: Link Remote & Push
Copy the commands displayed on GitHub and run them in your local terminal:
```bash
# Rename default branch to main
git branch -M main

# Link your local repo to the remote GitHub repo URL
git remote add origin https://github.com/YOUR_USERNAME/my-first-app.git

# Push your commits online
git push -u origin main
```
*(Subsequent pushes only require running `git push`!).*

---

## 18.3.2 Protecting Secrets: The .gitignore File

In programming (especially AI development), you will work with sensitive credentials, such as API keys. **You must never publish these secrets to GitHub.**

To prevent Git from tracking and uploading specific files, we create a file named exactly **`.gitignore`** in the root of your project directory.

### Common items to ignore:
Create a `.gitignore` file and paste the following content:

```text
# Ignore local environment keys containing secrets
.env

# Ignore virtual environments containing megabytes of downloaded libraries
.venv/
myenv/

# Ignore compiled python bytecode caches
__pycache__/
*.pyc

# Ignore OS metadata files
.DS_Store
Thumbs.db
```

:::warning Critical Rule
Always create and write your `.gitignore` file **before** running `git add .`. If you commit a file once, Git will continue to track it even if you add it to `.gitignore` later.
:::