---
title: "Module 3: Input & Output"
sidebar_label: "Module 3: Input & Output"
---

# Module 3: Input & Output

In this module, we will learn how to show output on the screen using `print()` and take input from the user using `input()`.

---

## 3.1 The print() Function

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

## 3.2 The input() Function

The `input()` function lets the user type information into the program using the keyboard.

```python
user_name = input("Enter your name: ")
print("Welcome", user_name)
```

:::warning Important Note
The `input()` function always saves the user's input as a **String**. If you want to take a number and perform calculations, you must convert it to an integer or float first.
:::

```python
# Taking integer inputs
number_1 = int(input("Enter first number: "))
number_2 = int(input("Enter second number: "))

total = number_1 + number_2
print("Total sum:", total)
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
Always use **f-Strings** for formatting text in Python. It is the modern and clean way.
:::
