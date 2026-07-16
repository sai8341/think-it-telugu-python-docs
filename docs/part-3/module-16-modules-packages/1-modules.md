---
title: "Modules in Python - Python in Telugu | Think IT Telugu"
sidebar_label: "Modules in Python"
description: "Learn about Modules in Python in Python with real-world examples. This Think IT Telugu tutorial explains Modules in Python easily for AI and Data Science beginners."
keywords: ["Python", "Modules in Python", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# Modules in Python

A **Module** is simply a Python file (e.g., `mymodule.py`) that contains functions, variables, and classes. Instead of writing all your code in one massive file, you can split it into multiple modules to keep it clean and organized.

---

## 16.1.1 Creating & Importing a Module

Let us create a simple calculator module.

Create a file named `calculator.py`:
```python
# calculator.py
def add(x, y):
    return x + y

def subtract(x, y):
    return x - y
```

Now, we can import this file and use its functions in another file, say `main.py`:
```python
# main.py
import calculator

result = calculator.add(10, 5)
print("Result:", result) # Output: Result: 15
```

---

## 16.1.2 Ways to Import in Python

Python provides different ways to import module items:

### 1. `import module_name`
Imports the entire module. You must prefix all functions with the module name when calling them.
```python
import math
print(math.sqrt(25)) # Output: 5.0
```

### 2. `from module import specific_item`
Imports only a specific function or variable. You can call it directly without the module name prefix.
```python
from math import sqrt
print(sqrt(16)) # Output: 4.0
```

### 3. `import module_name as alias`
Renames the imported module to a shorter nickname (alias). This is extremely common in data science.
```python
import datetime as dt
print(dt.datetime.now())
```

---

## 16.1.3 Useful Built-in Modules

Python comes with a "batteries included" philosophy, meaning it includes pre-written modules for common tasks:

*   **`math`:** Mathematical operations (like `sqrt`, `pi`, `sin`).
*   **`random`:** Generating random numbers and selections.
*   **`datetime`:** Handling calendar dates and clock times.
*   **`os`:** Directory creations, path checking, and OS tasks.

```python
import random
import os

# Select a random item from a list
fruits = ["Apple", "Banana", "Cherry"]
print("Random choice:", random.choice(fruits))

# Check the current working folder path
current_dir = os.getcwd()
print("Working folder:", current_dir)
```