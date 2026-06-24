---
sidebar_position: 1
title: "05 — Variables & Memory"
---

# Chapter 5: Variables & Memory Storage

In programming, we constantly work with data—numbers, text, files, and images. But how does a computer hold onto this data while running a program? This chapter explains variables, how Python labels memory locations, and how variables work under the hood.

---

## What is a Variable? 

If you want to drink water, you cannot hold it in your bare hands forever, nor can you point to a random water molecule in the air. Instead, you pour it into a water bottle, slap a label on it, and carry it around. 

In Python, a **variable** is like a **Milton Water Bottle**. 

> A **variable** is a labeled container in memory used to store data values. Instead of remembering the exact location in the computer's RAM where our data is saved, we give that location a friendly name (a variable).

```python
# Creating variables
water_bottle = "Mineral Water"
user_age = 21
is_active = True

# Accessing the data using its label
print(water_bottle)  # Output: Mineral Water
print(user_age)      # Output: 21
```

### The Assignment Operator (`=`)
The `=` sign in Python is not the mathematical "equal to" sign. It is the **assignment operator**. 
* It tells the computer: *"Take whatever value is on the right side, and put it inside the container on the left side."*
* Writing `x = 10` is correct. Writing `10 = x` will crash the program because `10` is a value, not a container!

---

## Identifiers: Variable Naming Rules 

An **identifier** is simply the technical name for any label we create in our code (variable names, function names, class names). While Python gives us freedom to name our variables, there are strict syntax rules we must follow.

### The Rules (If you break these, your code crashes):
1. **Must start with a letter or an underscore (`_`)**. It cannot start with a number.
2. **Can only contain alphanumeric characters and underscores** (`a-z`, `A-Z`, `0-9`, and `_`). No spaces, no hyphens (`-`), no dollar signs (`$`), etc.
3. **Case-Sensitive:** `age`, `Age`, and `AGE` are three completely different variables.
4. **Cannot use Reserved Keywords:** Python has reserved 35 words (like `if`, `else`, `while`, `def`, `class`, `import`) for its own internal syntax. You cannot use these as variable names.

```python
#  VALID names
student_name = "Ravi"
total_score = 95
_private_id = 9876
max_limit = 100

#  INVALID names (will raise a SyntaxError)
# 1st_place = "Gold"   # Cannot start with a number
# user-email = "a@b.c"  # Cannot contain a hyphen
# class = "Python"     # 'class' is a reserved keyword
# user name = "John"   # Cannot contain spaces
```

### Naming Conventions (Professional Best Practices)
To write code that other developers can read easily, follow these industry standards:
* **snake_case:** Combine lowercase words using underscores. This is the **standard convention** in Python for variable and function names (e.g., `student_age`, `calculate_total`).
* **PascalCase:** Capitalize the first letter of each word. This is strictly reserved for Class names (e.g., `StudentDatabase`).
* **UPPERCASE:** Use all capital letters for constants—values that should never change during program execution (e.g., `PI = 3.14159`, `MAX_RETRIES = 5`).

---

## How Memory Works Under the Hood 

Unlike languages like C++ or Java, Python uses a system called **Dynamic Typing** and manages memory using references.

### 1. Dynamic Typing
In Java or C++, you must declare the data type before creating a variable (e.g., `int age = 21;`). 
In Python, you do not declare types. Python is smart enough to detect the data type automatically based on the value you put inside the container.

```python
x = 100       # Python knows this is an integer (int)
x = "Python"  # Now it's a string (str). No errors!
```

### 2. Variable References (The Locker Analogy)
Think of your computer's RAM as a giant locker room. Every locker has a unique number called a **Memory Address**.
When you write `x = 10`, Python does not store the number `10` inside the variable `x`.
1. It creates an integer object `10` inside a locker (e.g., address `14072`).
2. It hangs a name tag `x` on that locker.

If you write `y = 10`, Python optimizes memory by hanging the name tag `y` on the **same locker** where `10` is already stored!

```python
x = 10
y = 10

# We can check the memory address using the id() function
print(id(x))  # Output: 140723146482256 (example address)
print(id(y))  # Output: 140723146482256 (reused address!)
```

If you change `x` to `20` (`x = 20`), Python does not modify the number `10` inside the locker. It creates a new object `20` in a different locker and moves the name tag `x` to that new locker. The value `10` remains untouched, and `y` still points to it.

---

## Variable Swapping 

In older languages like C++ or Java, swapping the values of two variables requires a temporary "middleman" variable to prevent data from being overwritten:

```python
# The Traditional Way (C++/Java style)
a = 10
b = 20

temp = a  # temp gets 10
a = b     # a gets 20
b = temp  # b gets 10
```

Python provides a cleaner, single-line trick using tuple unpacking:

```python
# The Pythonic Way
a = 10
b = 20

a, b = b, a
print(a, b)  # Output: 20 10
```

---

## Placement & Interview Focus 

*   **Question:** What does it mean that Python is a "dynamically typed" language, and what is a potential risk of this?
*   **Answer:** Dynamically typed means variables do not have a fixed type; their type is determined at runtime based on the value assigned to them. The risk is that a variable's type can accidentally change, leading to unexpected runtime errors. For example:
    ```python
    price = 100
    # ... later in the code ...
    price = "one hundred"
    total = price * 2  # Prints "one hundredone hundred" instead of crashing or outputting 200!
    ```
*   **Question:** How does Python optimize memory for small integers?
*   **Answer:** Python pre-allocates and caches integer objects from `-5` to `256` in memory. When you assign any value in this range to variables, they will point to the exact same memory address (`id()`), saving allocation time and space.
