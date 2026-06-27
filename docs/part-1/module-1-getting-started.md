---
title: "Module 1: Getting Started with Python"
sidebar_label: "Module 1: Getting Started"
---

# Module 1: Getting Started with Python

In this module, we will learn how to install Python on your computer, set up VS Code to write code, and run your very first Python program.

---

## 1.1 Installing Python

To run Python code on your computer, you need to install the Python software.

### How to install on Windows:
1. Go to the official website [python.org](https://www.python.org/).
2. Hover over the **Downloads** menu and click on the Windows option to download the latest version (Python 3.x).
3. Open the downloaded installer file.
4. **IMPORTANT:** Make sure to check the box that says **"Add Python.exe to PATH"** at the bottom of the window. If you do not do this, your computer will not recognize Python commands.
5. Click **"Install Now"** and wait for the installation to finish.

### How to verify the installation:
Open your Command Prompt (cmd), type the following command, and press Enter:
```bash
python --version
```
If you see something like `Python 3.x.x` printed on the screen, Python is successfully installed!

:::warning PATH Troubleshooting
If typing `python --version` returns an error like `"python is not recognized as an internal or external command"`, it means Python was installed but the PATH was not configured. To fix this, simply run the Python installer file again, select **Modify**, and make sure the **Add Python to PATH** checkbox is selected.
:::

---

## 1.2 Installing VS Code

We need a code editor to write our programs. **VS Code (Visual Studio Code)** is a free and highly popular editor used by developers.

### How to install and setup:
1. Go to [code.visualstudio.com](https://code.visualstudio.com/) and download the installer for your operating system.
2. Install it and open VS Code.
3. Click on the **Extensions** icon on the left sidebar (it looks like four squares).
4. Search for **Python** in the search bar and install the official Python extension made by Microsoft.

---

## 1.3 Running Your First Program

Now, let us write and run our first Python code!

1. **Create a Project Folder:** Create a new folder on your computer (for example, on your Desktop) and name it `PythonCourse`.
2. **Open the Folder in VS Code:** Open VS Code, click on **File** in the top menu, select **Open Folder**, navigate to your `PythonCourse` folder, and click **Select Folder**.
3. **Create Your First Python File:** Hover your mouse over the folder name in the VS Code sidebar and click the **New File** icon (or click **File -> New Text File**, then save it as `hello.py`). All Python files must end with the `.py` file extension.
4. **Write the Code:** Type the following code in the file:
```python
print("Hello World!")
print("Welcome to your coding journey!")
```
5. **Open the Integrated Terminal:** Click on **Terminal** in the top menu of VS Code, and select **New Terminal** (or press ``Ctrl + ` ``). You will see a terminal pane open at the bottom.
6. **How to run the code:**
   * **Option A (Easiest):** Click the **Run/Play** button in the top-right corner of VS Code.
   * **Option B (Terminal Command):** Inside the terminal pane at the bottom, type `python hello.py` and press **Enter**.
7. You will see the following output in the terminal:
```text
Hello World!
Welcome to your coding journey!
```

---

## 1.4 Understanding Python Syntax

**Syntax** is the set of rules (like grammar rules) for writing code in a programming language.

* **No Semicolons:** Python does not need a semicolon (`;`) at the end of a line.
* **Readable:** Python code is easy to read because it looks like regular English.
* **Case-Sensitivity:** Python is case-sensitive. This means capital letters and lowercase letters are treated differently. For example, `print("Hello")` will work, but `Print("Hello")` with a capital `P` will cause a syntax error.
* **Indentation (Spacing):** Python does not use curly braces (`{ }`) to group blocks of code. Instead, it uses spaces (usually four spaces or one Tab). We will learn more about this when we write conditions and loops.

---

## 1.5 Comments in Python

**Comments** are notes we write in the code to explain what it does. The computer completely ignores comments when running the program.

* **Single-line Comment:** Starts with the `#` symbol.
```python
# This line prints a welcome message
print("Think IT Telugu")
```

* **Multi-line Comment:** Wrapped inside triple quotes (`"""` or `'''`).
```python
"""
This program prints
a simple text to show
how comments work.
"""
print("Comments are useful!")
```

---

## 1.6 Understanding Errors

If you write code that violates the syntax rules, Python will show an error.

### Example:
```python
prnt("Hello") # Here, "print" is spelled incorrectly
```
Running this will show:
```text
NameError: name 'prnt' is not defined. Did you mean: 'print'?
```
Do not worry when you see errors. Reading error messages helps you find and fix mistakes in your code. This is called **debugging**.
