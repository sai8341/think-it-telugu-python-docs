---
sidebar_position: 3
title: "14 — Return Values"
---

# Chapter 14: Return Values & Reusability

Functions are more than just scripts packed under a label; they can return outputs back to the program. This chapter covers the `return` statement, the difference between returning and printing, returning multiple values, and writing short anonymous lambda functions.

---

## 1. The `return` Statement 

A function can process data and send the final output back to the calling code using the `return` statement.

> **Real-World Analogy: The ATM:** Think of an ATM. You insert your card, enter your PIN, and request cash (arguments). The ATM processes your transaction internally, opens the dispenser, and **returns** cash to you. A function works the same way: it takes inputs, performs operations internally, and returns the result back to you.

```python
def calculate_square(number):
    return number ** 2

# The returned value is sent back and stored in a variable
result = calculate_square(5)
print(result)  # Output: 25
```

Once Python executes a `return` statement, it exits the function immediately. Any code written inside the function below the `return` statement will never run.

---

## 2. Return vs. Print 

One of the most common mistakes beginners make is confusing `print()` and `return`.

*   **`print()`** simply displays a value on the screen. It is an end-of-the-road display action. The program cannot use that displayed value in any subsequent calculations.
*   **`return`** sends the value out of the function block. The value can be saved in a variable, modified, passed into other functions, or used in mathematical formulas.

```python
#  Using print()
def add_and_print(a, b):
    print(a + b)

val = add_and_print(10, 5)  # Displays 15 on screen
# print(val + 5)            #  Crashes! TypeError: unsupported operand type for +: 'NoneType' and 'int'

#  Using return
def add_and_return(a, b):
    return a + b

val = add_and_return(10, 5)
print(val + 5)  # Output: 20 (Works perfectly!)
```

If a function does not have a `return` statement, it automatically returns `None` once it completes.

---

## 3. Returning Multiple Values 

In Python, a function can return multiple values separated by commas. Under the hood, Python packs these values into a single **tuple**, which can be unpacked during assignment.

```python
def get_min_max(numbers):
    lowest = min(numbers)
    highest = max(numbers)
    return lowest, highest  # Returns a tuple: (lowest, highest)

# Unpacking the returned values into two separate variables
min_val, max_val = get_min_max([42, 17, 88, 3, 99])
print(f"Min: {min_val}, Max: {max_val}")  # Output: Min: 3, Max: 99
```

---

## 4. Lambda Functions (One-Line Functions) 

Lambda functions are small, anonymous, single-expression functions. They do not use the `def` keyword or require a formal `return` statement; the expression's result is automatically returned.

```python
# Standard function
def double(x):
    return x * 2

# Equivalent Lambda function
double_lambda = lambda x: x * 2
print(double_lambda(5))  # Output: 10
```

Lambdas are commonly used for short, throwaway operations, such as sorting list data:

```python
students = [("Ravi", 85), ("Priya", 92), ("Kiran", 78)]

# Sort students list based on their scores (index 1 of tuple)
sorted_students = sorted(students, key=lambda student: student[1], reverse=True)
print(sorted_students)  # Output: [('Priya', 92), ('Ravi', 85), ('Kiran', 78)]
```

---

## Placement & Interview Focus 

*   **Question:** What does a function return if it lacks an explicit `return` statement?
*   **Answer:** If a function does not contain an explicit `return` statement, or if it execution reaches a blank `return` statement, it returns Python's special constant `None` (an object of class `NoneType`).
*   **Question:** How does Python return multiple values from a function under the hood?
*   **Answer:** Python does not technically return multiple objects. If you return multiple values separated by commas, Python automatically packs them into a single, immutable **tuple** object and returns that tuple. The calling code can then unpack the tuple into individual variables.
