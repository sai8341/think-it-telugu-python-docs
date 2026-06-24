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
