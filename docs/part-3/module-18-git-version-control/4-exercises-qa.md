---
title: "Practice & Interview Q&A"
sidebar_label: "18.4 Exercises & Q&A"
---

# Module 18: Practice & Interview Q&A

Practice your Git workflows and check typical interview questions regarding version control systems.

---

## 18.4.1 Practice Exercises

1.  **Setting up Git:**
    Create a new directory `vcs-practice`, open a terminal inside, and run `git init`. Create a script `calculator.py` and write a basic function inside. Check the status of your folder.
2.  **Staging and Committing:**
    Add `calculator.py` to the staging area. Commit it with the message `"Add core math library"`. Check the logs to verify your snapshot is saved.
3.  **Ignoring Files:**
    Create a `.env` file containing fake api keys. Verify it is shown in `git status` as untracked. Create a `.gitignore` file, add `.env` to it, and check status again to verify the key file is successfully hidden.

---

## 18.4.2 Placement Q&A (Interview Prep)

Click on the questions below to reveal the answers:

<details>
<summary>Q1. What is the difference between Git status and Git log?</summary>
<div>

*   **`git status`:** Shows the current state of your working directory and staging area. It displays which files are modified but unstaged, staged but uncommitted, or untracked.
*   **`git log`:** Displays the history of all completed commits (saved snapshots) in the repository, showing commit messages, authors, dates, and hash IDs.

</div>
</details>

<details>
<summary>Q2. What is the purpose of the staging area in Git?</summary>
<div>

The staging area (or index) acts as a preview area. It allows you to select exactly which changes and files should be saved in the next commit snapshot, letting you group related changes together rather than saving everything at once.

</div>
</details>

<details>
<summary>Q3. If I accidentally commit my `.env` file containing API keys, is it enough to delete the file and commit again?</summary>
<div>

No. Git preserves the entire history of all commits. Deleting the file and committing again only removes it from the active working directory, but the key remains accessible in the project's historical commits. To resolve this, you must rewrite the git history using tools like `git-filter-repo` or immediately rotate/change the compromised API key.

</div>
</details>

<details>
<summary>Q4. What does `git clone` do?</summary>
<div>

`git clone <repository_url>` downloads a copy of an existing remote Git repository (including all of its files, branches, and commit history) from servers like GitHub to your local machine.

</div>
</details>
