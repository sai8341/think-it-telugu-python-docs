---
sidebar_position: 4
title: "08 — Operators & Casting"
---

# Chapter 8: Operators & Type Conversion

Operators are symbols that perform computations on variables and values, while type conversion allows us to convert data from one type to another. This chapter details arithmetic, relational, logical, and assignment operators, along with automatic and manual type casting.

---

## 1. Arithmetic Operators ️

Arithmetic operators are used to perform standard mathematical calculations.

| Operator | Name | Example | Behavior |
| :--- | :--- | :--- | :--- |
| `+` | Addition | `10 + 5` | Adds two values. |
| `-` | Subtraction | `10 - 5` | Subtracts the right value from the left. |
| `*` | Multiplication | `10 * 5` | Multiplies two values. |
| `/` | Division | `10 / 4` | Divides and **always returns a float** (`2.5`). |
| `//` | Floor Division | `10 // 4` | Divides and truncates the decimal part, returning an integer (`2`). |
| `%` | Modulus | `10 % 4` | Returns the remainder of division (`2`). |
| `**` | Exponentiation | `2 ** 3` | Raises the left value to the power of the right (`8`). |

```python
a = 15
b = 4

# Division vs Floor Division vs Modulus
print(a / b)   # Output: 3.75 (Floating-point result)
print(a // b)  # Output: 3 (Drops the decimals completely)
print(a % b)   # Output: 3 (Remainder of the division)
```

---

## 2. Relational (Comparison) Operators 

Relational operators compare two values and evaluate to a boolean (`True` or `False`).

```python
x = 10
y = 20

print(x == y)  # Equal to: False
print(x != y)  # Not equal to: True
print(x > y)   # Greater than: False
print(x <= y)  # Less than or equal to: True
```

> **Comparison vs. Assignment Caution:** 
> Do not confuse the assignment operator `=` (used to store a value, e.g., `x = 5`) with the relational comparison operator `==` (used to check equality, e.g., `x == 5`).

### Python's Chained Comparisons
Python allows you to chain comparison operators together in a single statement, making code cleaner and more readable.

```python
age = 25

# Traditional way in Java/C++
is_valid_standard = age >= 18 and age <= 60

# The Pythonic chained way
is_valid_chained = 18 <= age <= 60
print(is_valid_chained)  # Output: True
```

---

## 3. Logical Operators 

Logical operators combine conditional statements:
*   **`and`**: Evaluates to `True` only if **both** conditions are `True`.
*   **`or`**: Evaluates to `True` if **at least one** condition is `True`.
*   **`not`**: Inverts the boolean value.

```python
has_marks = True
has_attendance = False

print(has_marks and has_attendance)  # Output: False
print(has_marks or has_attendance)   # Output: True
print(not has_marks)                 # Output: False
```

---

## 4. Compound Assignment Operators 

Compound assignment operators combine an arithmetic operation with assignment to write shorter code:

```python
score = 10
score += 5   # Equivalent to: score = score + 5 (score becomes 15)
score *= 2   # Equivalent to: score = score * 2 (score becomes 30)
score //= 3  # Equivalent to: score = score // 3 (score becomes 10)
```

---

## 5. Operator Precedence (BODMAS for Coders) 

When multiple operators appear in an expression, Python evaluates them in a specific order of importance:
1.  **Parentheses `()`** (Highest Precedence)
2.  **Exponentiation `**`**
3.  **Multiplication `*`, Division `/`, Floor Division `//`, Modulus `%`**
4.  **Addition `+`, Subtraction `-`**

> **Best Practice:** Do not waste time memorizing operator precedence. Always group your math expressions using parentheses `()` to guarantee correct execution and make your code readable.

---

## 6. Type Conversion (Casting) 

### Implicit Type Conversion (Automatic)
Python automatically converts narrower types to wider types to prevent data loss (e.g., converting an integer to a float when adding them).

```python
num_int = 10
num_float = 3.5

result = num_int + num_float
print(result)        # Output: 13.5
print(type(result))  # Output: <class 'float'>
```

### Explicit Type Conversion (Manual Casting)
We can manually force a value to convert to another data type using built-in functions:
*   `int(value)`: Converts to integer (truncates decimal values).
*   `float(value)`: Converts to float.
*   `str(value)`: Converts to string.
*   `bool(value)`: Converts to boolean.

```python
# Converting string to float
price = float("99.99")

# Truncating a float (drops decimals entirely, does not round!)
pi = int(3.99)
print(pi)  # Output: 3
```

---

## Placement & Interview Focus 

*   **Question:** What is the difference between `/` and `//` in Python?
*   **Answer:** The single slash `/` performs classic division and always returns a floating-point number, even if the division is exact (e.g., `10 / 2` returns `5.0`). The double slash `//` performs floor division, which discards any fractional part and returns the largest whole number (e.g., `10 // 3` returns `3` and `10.0 // 3` returns `3.0`).
*   **Question:** Does Python's `int()` function round numbers when casting a float to an integer?
*   **Answer:** No. The `int()` function does not round numbers. It truncates the value by chopping off the decimal part completely. For example, `int(3.99)` evaluates to `3`, not `4`. To round numbers, use the `round()` function instead.
