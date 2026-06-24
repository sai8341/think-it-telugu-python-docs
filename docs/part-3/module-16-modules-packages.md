---
title: "Module 16: Modules & Packages"
sidebar_label: "Module 16: Modules & Packages"
---

# Module 16: Modules & Packages

In this module, we will learn how to organize our code by splitting it across multiple files, and how to download and install packages made by other developers from the internet.

---

## 16.1 What is a Module?

A **Module** is simply a Python file (e.g., `mymodule.py`) that contains functions and variables. We can import this file into other Python files to reuse its code.

### Example:
Let us create a file named `calculator.py`:
```python
# calculator.py
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y
```
Now, we can import and use these functions in another file, say `main.py`:
```python
# main.py
import calculator

result = calculator.add(10, 5)
print(result) # Output: 15
```

---

## 16.2 The import Statement

There are different ways to import code from a module:

### 1. `import module_name`:
Imports the entire module. You must write `module_name.function_name()` to use its features.
```python
import math
print(math.sqrt(25)) # Output: 5.0
```

### 2. `from module import function_name`:
Imports only a specific function from the module. You do not need to type the module name when calling it.
```python
from math import sqrt
print(sqrt(16)) # Output: 4.0
```

### 3. `import module_name as alias`:
Renames the imported module to a shorter name (alias).
```python
import datetime as dt
print(dt.datetime.now())
```

---

## 16.3 Built-in Modules

Python comes with many useful built-in modules that are ready to use:

* **`math`:** Provides mathematical functions (like `sqrt`, `pi`, `sin`).
* **`random`:** Used to generate random numbers.
* **`datetime`:** Used to work with dates and times.
* **`os`:** Used to interact with your operating system (creating folders, getting file paths).

```python
import random
import os

# Generate a random integer between 1 and 10
secret_number = random.randint(1, 10)
print("Random Number:", secret_number)

# Get current folder path
current_path = os.getcwd()
print("Current Path:", current_path)
```

---

## 16.4 Packages & pip

Sometimes you need features that are not built into Python (for example: downloading web pages, calling AI models). Developers share these features as **Packages**.

* **Package:** A collection of related modules grouped inside a folder.
* **pip:** The official **Package Manager** for Python. It allows you to download and install packages from PyPI (Python Package Index).

### How to install a package:
Open your terminal or Command Prompt and run:
```bash
pip install requests
```
This downloads and installs the `requests` package, which we will use in Module 18.
