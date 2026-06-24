---
sidebar_position: 2
title: "06 — Primitive Data Types"
---

# Chapter 6: Primitive Data Types

Every value in Python has a data type. This type determines what operations can be performed on the value. This chapter covers Python's five primitive data types: integers, floats, complex numbers, strings, and booleans.

---

## What is a Data Type? 

> **Real-World Analogy:** Think of your kitchen. You have different containers for different items. You store water in a bottle, rice in a large plastic container, and spices in small glass jars. Putting water in a spice jar doesn't make sense. Similarly, in Python, we store different kinds of values in different **data types** so the computer knows exactly how to treat and process that data.

---

## 1. Integer (`int`) - Whole Numbers 

Integers are whole numbers without decimal places. They can be positive, negative, or zero.

> In Python, integers have **arbitrary precision** (arbitrary size). Unlike other languages like Java or C++ where integers have size limits (e.g., 32-bit or 64-bit limits leading to overflow), Python integers can grow as large as your computer's memory allows!

```python
# Integer Examples
user_age = 21
roll_number = 1045
negative_value = -15

print(type(user_age))  # Output: <class 'int'>

# Python supports arbitrarily large integers!
massive_number = 99999999999999999999999999999999999999
print(massive_number)  # Works perfectly without any overflow!

# Use underscores for readability of large numbers
population = 1_400_000_000  # 1.4 billion
print(population)            # Output: 1400000000
```

---

## 2. Float (`float`) - Decimal Numbers 

Floats represent real numbers containing a decimal point. They are used for measurements, fractional values, and precise calculations.

```python
cgpa = 8.75
pi = 3.14159

print(type(cgpa))  # Output: <class 'float'>

# Dividing two integers always results in a float
result = 10 / 2
print(result)      # Output: 5.0 (even though it divides exactly!)
```

### Floating-Point Precision Issue
Computers store decimal numbers in binary format, which cannot represent certain fractions (like `0.1` or `0.2`) exactly. This sometimes causes tiny rounding errors:

```python
print(0.1 + 0.2)  # Output: 0.30000000000000004 (not exactly 0.3!)

# Solution: Use round() to clean up the representation
print(round(0.1 + 0.2, 1))  # Output: 0.3
```

---

## 3. Complex (`complex`) - Imaginary Numbers 

Python is one of the few languages that supports complex numbers natively. A complex number consists of a real part and an imaginary part, written with a `j` or `J` suffix.

```python
# Creating a complex number
z = 3 + 4j
print(type(z))  # Output: <class 'complex'>

# Extracting real and imaginary parts
print(z.real)  # Output: 3.0
print(z.imag)  # Output: 4.0
```

---

## 4. String (`str`) - Text Data 

A string is a sequence of characters enclosed in single quotes `'` or double quotes `"`.

```python
student_name = "Ravi Kumar"
greeting = 'Hello there!'

# Triple quotes are used for multi-line strings
paragraph = """This is a
multi-line
string."""
```

### String Indexing (Positive and Negative)
Strings in Python are ordered sequences, meaning each character has a specific position (index) starting at `0`.
* **Positive Indexing:** Starts from `0` from the left.
* **Negative Indexing:** Starts from `-1` from the right, which is convenient for accessing elements relative to the end of the string.

```python
text = "PYTHON"

# Positive Indexing
print(text[0])   # Output: P
print(text[2])   # Output: T

# Negative Indexing
print(text[-1])  # Output: N (last character)
print(text[-2])  # Output: O (second to last)
```

### String Slicing
Slicing allows you to extract a portion (substring) of a string. The syntax is `string[start:end:step]`, where the `end` index is **exclusive** (not included).

```python
text = "Think IT Python"

# Slice from index 0 up to (but not including) 5
print(text[0:5])  # Output: Think

# Slice from index 6 to 8
print(text[6:8])  # Output: IT

# Step slicing (skip characters)
print(text[::2])  # Output: Tinki yhn (every 2nd character)

# Reverse a string using slicing step of -1
print(text[::-1]) # Output: nohtyP TI knihT
```

---

## 5. Boolean (`bool`) - Logical States 

A boolean represents one of two values: `True` or `False`. 

```python
is_completed = True
has_failed = False

# Comparisons automatically evaluate to booleans
print(10 > 5)  # Output: True
```

### Truthy and Falsy Values
In Python, values of any data type can evaluate to a boolean when passed to `bool()`.
* **Falsy Values:** Evaluate to `False`. These include `0`, `0.0`, empty collections (like `""`, `[]`, `{}`, `()`), and `None`.
* **Truthy Values:** Evaluate to `True`. Basically, any non-empty container or non-zero number.

```python
print(bool(0))        # Output: False
print(bool(""))       # Output: False
print(bool(1))        # Output: True
print(bool("Hello"))  # Output: True
```

---

## Placement & Interview Focus 

*   **Question:** What makes Python's integer handling unique compared to languages like Java/C++?
*   **Answer:** In Java and C++, integers are restricted to fixed sizes (like 32-bit or 64-bit), leading to overflow if the number exceeds the maximum limit. Python automatically handles memory allocation for integers dynamically, allowing them to grow arbitrarily large without causing overflow.
*   **Question:** Why does `0.1 + 0.2` return `0.30000000000000004` in Python, and how do you resolve it?
*   **Answer:** Floating-point numbers are represented in binary (base-2) format. Fractions like `0.1` and `0.2` do not have exact binary representations, resulting in a repeating fraction that is truncated, causing tiny precision errors. This is resolved by using the `round()` function or the `decimal` module for applications requiring absolute precision (like financial systems).
