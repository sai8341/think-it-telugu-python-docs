---
sidebar_position: 3
title: "07 — Console Input & Output"
---

# Chapter 7: Console Input & Output

To make programs useful, they must interact with the outside world. This chapter covers standard output operations (printing, advanced string formatting, f-strings) and standard input operations (reading user input, converting data types, and preventing program crashes).

---

## 1. Console Output: `print()` in Detail 

The `print()` function is our window to see what is happening inside our code.

> **Real-World Analogy:** Think of the `print()` function like the screen display on a calculator. Whenever you calculate something or encounter an error, you send it to the display screen so the user can see it.

### Standard Printing Behavior
By default, `print()` prints values separated by spaces and appends a newline at the end. We can customize this behavior using the `sep` and `end` arguments:

```python
# Printing multiple values (automatically separated by spaces)
print("Name:", "Ravi", "Age:", 21)
# Output: Name: Ravi Age: 21

# Changing the separator character using 'sep'
print("2026", "06", "22", sep="-")
# Output: 2026-06-22

# Controlling the end of line character using 'end'
# By default, print() ends with a newline (\n). We can change it:
print("Loading", end="")
print("...", end="")
print("Done!")
# Output: Loading...Done! (all on a single line)
```

---

## 2. Professional Output Formatting with F-Strings 

Modern Python uses **f-strings** (formatted string literals) to format variables inside text cleanly.

```python
student_name = "Priya"
score = 92
cgpa = 8.756
large_number = 1500000

# Basic f-string usage
print(f"Student: {student_name}, Score: {score}")
# Output: Student: Priya, Score: 92

# Formatting decimal places (rounding to 2 decimals)
print(f"CGPA: {cgpa:.2f}")
# Output: CGPA: 8.76

# Adding comma separators to large numbers
print(f"Total Amount: ${large_number:,}")
# Output: Total Amount: $1,500,000

# Padding and alignment layout (left < or right > alignment with width)
print(f"{'Subject':<15}{'Score':>8}")
print(f"{'Mathematics':<15}{95:>8}")
print(f"{'Physics':<15}{82:>8}")
# Output:
# Subject          Score
# Mathematics         95
# Physics             82
```

---

## 3. Console Input: `input()` 

To make your programs interactive, you must ask the user for information. We use the `input()` function for this.

```python
user_name = input("Enter your name: ")
print(f"Welcome, {user_name}!")
```

### The Input Type Crash Warning
> **Crucial Concept:** The `input()` function **always** reads and returns user input as a **string** (`str`), even if the user types a number. If you attempt to perform mathematical operations on this input directly, your program will crash.

```python
#  THIS CRASHES:
age = input("Enter age: ")
# print(age + 1)  # TypeError: can only concatenate str (not "int") to str

#  CORRECT: Explicitly convert the input to the appropriate type
age = int(input("Enter age: "))
print(f"Next year you will be {age + 1}!")
```

### Reading Multiple Inputs at Once
You can read multiple inputs in a single line using the `.split()` method:

```python
# Read space-separated values
first_name, last_name = input("Enter first and last name: ").split()
print(f"First: {first_name}, Last: {last_name}")

# Read and unpack numeric inputs
x, y = input("Enter two numbers: ").split()
x, y = int(x), int(y)
print(f"Sum: {x + y}")
```

---

## 4. Placement & Interview Focus 

*   **Question:** What happens if a user inputs "twenty" when your program executes `age = int(input("Enter age: "))`? How do you prevent a program crash?
*   **Answer:** Python will raise a `ValueError` because the text "twenty" cannot be converted into a base-10 integer. To prevent this from crashing the program, we wrap the conversion in a `try-except` block to handle the error gracefully:
    ```python
    try:
        age = int(input("Enter age: "))
    except ValueError:
        print("Invalid input! Please enter a valid number.")
        age = 0  # Fallback default value
    ```
*   **Question:** How does the `print()` function's `end` parameter differ from the default behavior?
*   **Answer:** By default, the `end` parameter is set to `\n` (newline character), which moves the console cursor to the next line after printing. By changing `end` to a custom string (e.g., `end=""` or `end=" "`), we can print subsequent outputs on the same line.
