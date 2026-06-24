---
sidebar_position: 4
title: "04 — First Python Program & Debugging"
---

# Chapter 4: First Python Program & Debugging

Now that your setup is ready, this chapter covers writing your first script, understanding variables and standard inputs, and learning how to read and debug common Python errors.

---

## 1. Writing Your First Script (Hello World) 

In programming, there is a global tradition dating back to the 1970s: your very first program in any new language should print "Hello, World!" to the screen. It is a simple check to ensure your compiler/interpreter and environment are working correctly.

```python
# This is a comment. Python ignores comments.
print("Hello, World!")
```

### How to Run:
*   Click the **Play Button ️** in the top-right corner of VS Code, or
*   Open the terminal and run: `python hello.py`

---

## 2. Comments - Leaving Notes in Your Code ️

Comments are notes written in plain English to explain what the code is doing. The Python interpreter completely ignores comments when running the code.

```python
# This is a single-line comment. The computer will ignore this.
print("Hello!")  # This is an inline comment explaining this print statement.

"""
This is a multi-line comment.
You can write multiple lines of text
without using # at the start of each line.
"""
```

---

## 3. Deep Dive into the print() Function 

The `print()` function is used to output text or numbers to your screen.

```python
# Basic text printing
print("Welcome to Think IT.")
print("We are learning Python.")

# Printing numbers
print(100)
print(3.14159)

# Doing math inside print
print(10 + 5)     # Output: 15
```

### Printing Multiple Items (f-strings)
You can print multiple variables or values in a single statement by separating them with commas, or by using a modern feature called **f-strings** (formatted strings).

```python
name = "Ravi"
age = 20

# Method 1: Using commas (separates items with a space automatically)
print("My name is", name, "and I am", age, "years old.")

# Method 2: Using f-strings (Modern, cleaner, and preferred!)
print(f"My name is {name} and I am {age} years old.")
```

---

## 4. Reading Console Input from Users 

To make your programs interactive, you must ask the user for information. We use the `input()` function for this.

```python
# Reading string input
name = input("What is your name? ")
print(f"Hello {name}! Welcome to the course. ")
```

> **The Input Type Caution:**
> The `input()` function always reads and returns user input as a **string** (text). If you want to perform math calculations on the input, you must convert it to an integer using `int()` or a decimal using `float()`.

```python
#  WRONG: This will cause an error
age_input = input("Enter age: ")
# print(age_input + 1)  # TypeError: cannot add string and integer

#  CORRECT: Convert string to integer first
age_input = int(input("Enter age: "))
print(age_input + 1)  # Works perfectly!
```

---

## 5. Complete Script: Student Profile Card 

Create a file named `profile_card.py` and run this code to generate a custom profile card based on user inputs:

```python
# Banner
print("=" * 40)
print("   STUDENT PROFILE CARD")
print("=" * 40)

# Reading user inputs
name = input("Enter your name: ")
college = input("Enter your college: ")
branch = input("Enter your branch: ")
cgpa = float(input("Enter your current CGPA: "))

# Displaying the formatted Profile Card
print("\n" + "=" * 40)
print(f"  Name    : {name}")
print(f"  College : {college}")
print(f"  Branch  : {branch}")
print(f"  CGPA    : {cgpa}")
print("=" * 40)
```

---

## 6. Understanding and Debugging Errors 

Errors (bugs) are mistakes in your code. Finding and fixing them is called **debugging**.

### Common Python Errors

#### 1. SyntaxError (Grammar mistake)
This occurs when you write code that violates Python's grammar rules (like leaving a quote unclosed).
```python
#  ERROR
print("Hello World)

#  FIX
print("Hello World")
```

#### 2. NameError (Typo in names)
This occurs when you try to use a variable or function that has not been defined yet.
```python
#  ERROR (assuming 'message' is spelled wrong)
print(mesage)

#  FIX
message = "Hello!"
print(message)
```

#### 3. TypeError (Incompatible data types)
This occurs when you try to mix data types in ways that Python does not allow (like adding a string and a number).
```python
#  ERROR
print("My age is: " + 25)

#  FIX (convert the number to string first or use an f-string)
print(f"My age is: {25}")
```

#### 4. IndentationError (Incorrect spacing)
Python uses spaces (indentation) to group blocks of code. Missing indentation causes errors.
```python
#  ERROR
if True:
print("Hello")

#  FIX (Indent the block with 4 spaces or 1 tab)
if True:
    print("Hello")
```
