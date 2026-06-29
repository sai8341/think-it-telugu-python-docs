---
title: "Module 13: Error Handling"
sidebar_label: "Module 13: Error Handling"
---

# Module 13: Error Handling

In this module, we will learn about **Error Handling**. We will learn how to handle unexpected crashes (errors/exceptions) in our programs so that the code runs smoothly without stopping.

---

## 13.1 What are Errors?

Errors are mistakes in code. In Python, errors are grouped into two main categories:

1. **Syntax Errors:** Mistakes in writing code rules. These prevent the program from running at all.
2. **Runtime Errors (Exceptions):** Mistakes that happen while the program is running, even if the syntax is correct.

---

## 13.2 Syntax Errors

These happen when you violate the grammar rules of Python. The code cannot execute until you fix these.

```python
# if age >= 18 # Missing the colon (:) at the end
#     print("Vote")
```
**Error message:** `SyntaxError: expected ':'`

---

## 13.3 Runtime Errors (Exceptions)

The code syntax is correct, but something goes wrong during execution based on user inputs or system states.

### Examples:
* **`ZeroDivisionError`:** Trying to divide a number by zero.
```python
# result = 10 / 0 # Throws ZeroDivisionError
```
* **`ValueError`:** Passing an invalid value for conversion.
```python
# num = int("hello") # Throws ValueError (cannot convert text to integer)
```
* **`FileNotFoundError`:** Trying to read a file that does not exist.

---

## 13.4 Using try and except

We use the `try-except` block to catch and handle runtime errors so that our program does not crash.

* **`try` Block:** Put the code that might cause an error here.
* **`except` Block:** Put the code to run if an error happens here.

```python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print("Result is:", result)
except ZeroDivisionError:
    print("Error: You cannot divide by zero!")
except ValueError:
    print("Error: Please enter a valid number!")
except Exception as e:
    print("An unexpected error occurred:", e)
```
Now, if the user inputs `0` or text, the program prints a helpful error message instead of crashing.

---

## 13.5 The finally Block

The `finally` block runs no matter what. It executes whether an error occurs or not. It is typically used for cleanup tasks like closing open files or database connections.

```python
try:
    print("Opening database...")
    x = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
finally:
    print("Closing database connection... (Always Runs)")
```

### Output:
```text
Opening database...
Cannot divide by zero!
Closing database connection... (Always Runs)
```
:::tip Golden Rule
Never trust user inputs. Always use **try-except** blocks to protect your programs from crashing due to unexpected input values!
:::

---

## 13.6 Raising Exceptions (The raise keyword)

Sometimes, you want to trigger an error manually when a specific condition is violated in your program (e.g., a user enters a negative value for age). We do this using the **`raise`** keyword.

```python
def check_age(age):
    if age < 0:
        # Manually throw an error
        raise ValueError("Age cannot be negative!")
    print(f"Age {age} is valid.")

try:
    check_age(-5)
except ValueError as e:
    print("Caught manual error:", e)
# Output: Caught manual error: Age cannot be negative!
```

---

## 13.7 Practice Exercises

1. **Custom ValueError Checker:**
   Write a function `validate_username(username)` that raises a `ValueError` if the username is less than 5 characters. Handle the exception using a `try-except` block.
2. **Safe List Access:**
   Write a program that prompts the user to enter an index, and prints the item from a list `my_list = [10, 20, 30]`. Use error handling to catch `IndexError` if the index is out of bounds, and `ValueError` if the user enters a non-numeric index.

---

## 13.8 Placement Q&A (Interview Prep)

**Q1. What is the difference between Syntax Errors and Exceptions in Python?**  
**Answer:** Syntax Errors are grammar mistakes in the code that prevent Python from compiling or running it (e.g., missing colons). Exceptions are runtime errors that occur during execution even though the syntax is valid (e.g., dividing by zero or converting a bad string to integer).

**Q2. What is the purpose of the `finally` block?**  
**Answer:** The `finally` block runs regardless of whether an exception was raised or handled. It is typically used to perform cleanup actions, such as closing file streams, sockets, or database connections.

**Q3. How do you trigger an exception manually in Python?**  
**Answer:** You use the `raise` keyword followed by the exception class and an optional error message, e.g., `raise ValueError("Invalid number")`.

---

## 13.9 Module 13 Cheat Sheet

* **Syntax vs. Runtime:** Syntax errors prevent execution; Exceptions happen while running.
* **try-except:** `try` runs risky code; `except` handles specific runtime errors.
* **finally:** Code that is guaranteed to run after try/except.
* **raise:** Triggers an exception manually (`raise TypeError("...")`).

