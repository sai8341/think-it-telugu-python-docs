---
title: "Module 3: Input & Output"
sidebar_label: "Module 3: Input & Output"
---

# Module 3: Input & Output

In this module, we will learn how programs communicate with the outside world by displaying output on the screen and taking input from the user.

* **Input:** Getting data from the outside world into our program (e.g., a user typing on a keyboard).
* **Output:** Displaying or sending data from our program to the outside world (e.g., printing messages on the screen).

---

## 3.1 The print() Function (Output)

The `print()` function displays messages or values on the screen.

### Basic Print:
```python
print("Hello Think IT Telugu!")
```

### Printing Multiple Values:
You can print multiple values at once by separating them with commas (`,`). Python automatically adds a space between them.
```python
name = "Sai"
age = 22
print("Name is:", name, "and Age is:", age)
# Output: Name is: Sai and Age is: 22
```

### Escape Characters:
Escape characters are special codes inside a string that let you format text. They start with a backslash (`\`).
* **`\n` (New Line):** Moves the cursor to the next line.
* **`\t` (Tab):** Adds a horizontal tab (4 spaces gap).

```python
# \n example
print("Hello\nWorld!")
# Output:
# Hello
# World!

# \t example
print("Name:\tSai")
# Output: Name:   Sai
```

### `sep` and `end` Parameters:
* **`sep` (Separator):** Defines what separates the printed values (default is a space `" "`).
* **`end`:** Defines what is printed at the end of the line (default is a new line `\n`).

```python
# sep example
print("Python", "AI", "ML", sep=" - ")
# Output: Python - AI - ML

# end example
print("Think", end="")
print("IT", end="")
print("Telugu")
# Output: ThinkITTelugu (prints on the same line without spaces)
```

---

## 3.2 The input() Function (Input)

The `input()` function lets the user type information into the program using the keyboard at runtime.

### Hardcoded Values vs. User Input:
* **Hardcoded Values:** Storing fixed values directly in the code (e.g., `age = 22`). The program runs exactly the same way every time.
* **User Input:** Capturing values from the user dynamically (e.g., `age = input("Enter age: ")`). This makes your program interactive.

```python
user_name = input("Enter your name: ")
print("Welcome", user_name)
```

### Why input() Always Returns a String:
Python does not know if the user is going to type numbers, text, or special characters. To prevent crashes, Python plays it safe and captures everything typed from the keyboard as a **String** (text).

### The Concatenation Trap (Common Mistake):
If you try to add two inputs without converting them to numbers first, Python will glue them together as text (concatenation) instead of adding them.

```python
# Common Mistake:
number_1 = input("Enter first number: ")  # User types 10
number_2 = input("Enter second number: ") # User types 20

total = number_1 + number_2
print("Total sum:", total)
# Output: Total sum: 1020 (glued together as text!)
```

### Correct Way (Using Type Conversion):
To perform math calculations, you must wrap `input()` in `int()` (for whole numbers) or `float()` (for decimal numbers) to convert the text to numbers:

```python
# Correct Way:
number_1 = int(input("Enter first number: "))
number_2 = int(input("Enter second number: "))

total = number_1 + number_2
print("Total sum:", total)
# Output: Total sum: 30
```

---

## 3.3 Formatting Output

There are different ways to display text combined with variables neatly.

### Old Method (`%` Formatting):
```python
name = "Sai"
score = 95
print("Hello %s, your score is %d" % (name, score))
# Output: Hello Sai, your score is 95
```

### The `.format()` Method:
```python
name = "Sai"
age = 22
print("My name is {} and I am {} years old".format(name, age))
# Output: My name is Sai and I am 22 years old
```

---

## 3.4 f-Strings (Modern Formatting)

Introduced in Python 3.6, **f-Strings (Formatted String Literals)** are the easiest and fastest way to format text.

To write an f-string, add an `f` before the opening quotes and put variables inside curly braces `{ }`.

```python
name = "Sai Kumar"
age = 22
language = "Python"

# Using f-string
message = f"Hello, my name is {name}. I am {age} years old and learning {language}."
print(message)
# Output: Hello, my name is Sai Kumar. I am 22 years old and learning Python.

# You can also run simple math inside the braces
print(f"5 + 10 adds up to: {5 + 10}")
# Output: 5 + 10 adds up to: 15
```

:::tip Best Practice
Always use **f-Strings** for formatting text in Python. It is the modern, clean, and recommended way.
:::
