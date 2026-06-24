---
sidebar_position: 2
title: "02 — Setup & Installation"
---

# Chapter 2: Setup & Installation

To start writing Python programs, we need two essential tools on our computer:
1. **Python Interpreter:** The engine that translates and runs our code.
2. **VS Code:** The professional text editor where we write our code.

This chapter walks through installing both tools and setting up your first workspace.

---

## 1. Python Installation 

To download and install the latest version of Python:

1. Open your browser and go to the official downloads page: **[python.org/downloads](https://www.python.org/downloads/)**.
2. Click the download button for your operating system (Windows/macOS/Linux).
3. Run the downloaded installer file.

> [!CAUTION]
> **CRITICAL STEP FOR WINDOWS USERS:**
> At the bottom of the installer window, you will see a checkbox:
> 
>  **"Add Python to PATH"** (or **"Add python.exe to PATH"**)
> 
> **You MUST check this box before clicking install!** 
> If you skip this, your command prompt/terminal will not recognize the `python` command, and you will see errors later.

4. Click **Install Now** and complete the installation.

---

## 2. VS Code Setup & Extensions 

While you can write code in a simple program like Notepad, professionals use an editor designed for programming. We will use **Visual Studio Code (VS Code)** by Microsoft because it is free, fast, and the industry standard.

1. Download and install VS Code from **[code.visualstudio.com](https://code.visualstudio.com/)**.
2. Open VS Code.
3. On the left vertical sidebar, click the **Extensions** icon (looks like four small blocks).
4. Search for and install these two extensions:
    *   **Python** (by *Microsoft*): Adds smart autocomplete, code formatting, and debugging.
    *   **Code Runner** (by *Jun Han*): Adds a simple **Play button ️** at the top-right corner, letting you run your code with a single click.

---

## 3. PRO TIP (AI Industry Standard): Virtual Environments ️

:::tip  PRO TIP: Virtual Environments (venv)
When you start working on multiple Python projects, different projects will require different external libraries (like Django for web, or TensorFlow for AI). If you install all these libraries globally on your computer, they will conflict, causing your code to break.

Professional developers and AI engineers solve this by using **Virtual Environments** (using tools like `venv` or `uv`). A virtual environment is like a private, isolated container for each project. Anything you install inside it stays inside it and does not affect the rest of your computer. 

To create one inside your project directory, you run:
```bash
python -m venv .venv
```
This isolates your project's dependencies and guarantees that your code runs identically on any computer in the world!
:::

---

## 4. Writing Your First Program 

Let’s write the traditional first line of code to make sure your environment is configured perfectly.

### Step 1: Create a Project Folder
1. Create a folder on your computer named `think-it-python`.
2. Open VS Code, go to **File → Open Folder...** and select your `think-it-python` folder.

### Step 2: Create a Python File
1. In the VS Code Explorer sidebar, click the **New File** icon.
2. Name the file **`hello.py`** (the `.py` extension is critical—it tells the computer this is a Python file).

### Step 3: Write the Code
Type this line into your `hello.py` file:
```python
# The print() function prints text out to the screen
print("Hello Think IT Telugu Students!")
```

### Step 4: Run the Code
You can run this file in two ways:
1. **The Play Button:** Click the **Play triangle ️** on the top right of your VS Code window (provided by Code Runner).
2. **The Terminal:** Open the integrated terminal (`Ctrl + \`` or `Cmd + \``), type `python hello.py`, and press Enter.

You will see the output print out in the terminal window:
`Hello Think IT Telugu Students!`

---

## Placement & Interview Focus 
- **Question:** What is the purpose of adding Python to the system PATH environment variable?
- **Answer:** Adding Python to PATH registers the python executable location with the operating system. This allows you to run python commands from any directory path in your command prompt or terminal window. Without this, you would have to type the full, absolute file path of the python installation folder every single time you want to execute a script.
