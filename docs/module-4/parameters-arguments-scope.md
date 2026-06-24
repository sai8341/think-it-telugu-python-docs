---
sidebar_position: 2
title: "13 — Parameters & Scope"
---

# Chapter 13: Parameters, Arguments & Scope

Functions become dynamic when we pass data into them. This chapter covers the difference between parameters and arguments, the various types of parameters in Python (positional, keyword, default, `*args`, and `**kwargs`), and variable scopes (local vs. global).

---

## 1. Parameters vs. Arguments 

Although often used interchangeably, parameters and arguments represent two distinct stages of a function.

> **Real-World Analogy: The Ordering Slip:** Think of a restaurant ordering slip. The chef prints a slip with a blank field called `dish_name`—this is the **parameter** (the placeholder). When you order and fill in the slip with "Biryani", the actual value you write is the **argument** (the real data passed into the placeholder).

```python
# 'name' is the PARAMETER (placeholder defined in the function)
def greet_student(name):
    print(f"Hello, {name}!")

# "Ravi" is the ARGUMENT (actual value passed during the call)
greet_student("Ravi")
```

---

## 2. Parameter Passing Types in Python 

Python provides flexible ways to define parameters and pass values:

### 1. Positional Arguments
Arguments are mapped to parameters based on the order in which they are passed.
```python
def describe_student(name, branch):
    print(f"{name} is from {branch} department.")

describe_student("Ravi", "CSE")  # Correct: Ravi is mapped to name, CSE to branch
describe_student("CSE", "Ravi")  # Wrong: CSE is mapped to name
```

### 2. Keyword Arguments
You can explicitly name the parameters when passing arguments, which allows you to send them in any order.
```python
describe_student(branch="CSE", name="Ravi")  # Works perfectly!
```

### 3. Default Parameters
You can assign default values to parameters. If no argument is passed for that parameter, Python falls back to the default value.
```python
# Default port is 5432
def connect_db(host, port=5432):
    print(f"Connecting to database at {host}:{port}")

connect_db("localhost")        # Output: Connecting to database at localhost:5432
connect_db("192.168.1.1", 80) # Output: Connecting to database at 192.168.1.1:80
```
> **Warning:** Default parameters must always follow non-default parameters in the function definition, otherwise Python will raise a `SyntaxError` (e.g., `def check(a=1, b):` is invalid).

### 4. Arbitrary Arguments (`*args` and `**kwargs`)
When you don't know beforehand how many arguments will be passed, use arbitrary parameters:
*   `*args`: Collects positional arguments into a **tuple**.
*   `**kwargs`: Collects keyword arguments into a **dictionary**.

```python
# *args collects positional arguments
def sum_all(*numbers):
    return sum(numbers)  # numbers is a tuple

print(sum_all(1, 2, 3, 4))  # Output: 10

# **kwargs collects keyword arguments
def show_profile(**details):
    for key, val in details.items():
        print(f"{key}: {val}")  # details is a dictionary

show_profile(name="Ravi", branch="CSE", gpa=8.5)
```

---

## 3. Variable Scope: Local vs. Global 

Scope determines where a variable is visible and accessible in your code.

> **Real-World Analogy: Personal Locker vs. Public Park:**
> *   **Local Scope:** Items inside your personal home locker are only accessible to you. Someone standing in the public park cannot look inside or access your locker.
> *   **Global Scope:** Items in the public park (like a bench) are visible and accessible to everyone in the city.

### Local Scope
Variables defined inside a function are local to that function. They are created when the function starts and destroyed when it finishes.
```python
def compute():
    local_val = 50  # Local variable
    print(local_val)

compute()
# print(local_val)  #  NameError: 'local_val' is not defined (does not exist outside)
```

### Global Scope & The `global` Keyword
Variables defined in the main script body are global. While functions can read global variables naturally, they cannot modify them directly. If you try to modify a global variable, Python will create a new local variable with the same name (shadowing) or crash.

To modify a global variable, you must declare it using the `global` keyword.

```python
count = 0  # Global variable

def increment():
    global count  # Declares intent to modify the global variable
    count += 1

increment()
print(count)  # Output: 1
```

### The UnboundLocalError Crash
If you try to modify a global variable inside a function without declaring it as `global`, Python gets confused and crashes.

```python
x = 10

def crash_function():
    #  Raises UnboundLocalError: local variable 'x' referenced before assignment
    x = x + 1 
```

---

## Placement & Interview Focus 

*   **Question:** What is the difference between `*args` and `**kwargs`?
*   **Answer:** `*args` allows a function to accept any number of positional arguments, which are packed into a tuple inside the function. `**kwargs` allows a function to accept any number of keyword arguments, which are packed into a dictionary inside the function.
*   **Question:** What is variable shadowing in Python?
*   **Answer:** Variable shadowing occurs when a variable defined inside a local scope (like a function) has the same name as a variable in an outer scope (like a global variable). The local variable takes precedence within its scope, "shadowing" or hiding the global variable from access unless the `global` keyword is explicitly used.
