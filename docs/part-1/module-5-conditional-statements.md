---
title: "Module 5: Conditional Statements"
sidebar_label: "Module 5: Conditional Statements"
---

# Module 5: Conditional Statements

In this module, we will learn how to make decisions in our code. Conditional statements allow us to run certain blocks of code only when specific conditions are met.

---

## 5.1 The if Statement

The code inside an `if` block runs only if the condition is **True**.

### Syntax:
```python
if condition:
    # code to run if condition is True
```

:::important Indentation (Spacing)
Python uses spaces (indentation) to group code blocks. The code under the `if` statement must be shifted in by 4 spaces. If you do not indent, Python will throw an `IndentationError`.
:::

### Example:
```python
age = 20
if age >= 18:
    print("You are eligible to vote.") # 4 spaces indentation
```

---

## 5.2 The if else Statement

Use `if-else` to run one block of code if the condition is **True**, and a different block if the condition is **False**.

### Example:
```python
age = 15
if age >= 18:
    print("You are eligible to vote.")
else:
    print("You are not eligible to vote yet.")
```

---

## 5.3 The if elif else Statement

When you have multiple conditions to check, use `elif` (short for "else if").

### Grade Checking Example:
```python
score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: F (Fail)")
```
In this structure, Python checks conditions from top to bottom. It runs the block for the first condition that is **True** and skips the rest.

---

## 5.4 Nested Conditions

Writing an `if` statement inside another `if` statement is called a **Nested Condition**.

### Example:
```python
number = 12

if number > 0:
    print("Positive Number")
    if number % 2 == 0:
        print("And it is Even.")
    else:
        print("And it is Odd.")
else:
    print("Negative Number or Zero")
```

---

## 5.5 Practical Examples

Here are some common examples useful for practice:

### 1. Even or Odd Checker:
```python
num = int(input("Enter a number: "))
if num % 2 == 0:
    print(f"{num} is an Even number.")
else:
    print(f"{num} is an Odd number.")
```

### 2. Leap Year Checker:
```python
year = int(input("Enter a year: "))
if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print(f"{year} is a Leap Year.")
else:
    print(f"{year} is not a Leap Year.")
```
:::tip Think About It
Look at the leap year logic. We combined the logical operators `and` and `or` to check multiple conditions in a single line!
:::
