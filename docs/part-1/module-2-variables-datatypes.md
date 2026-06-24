---
title: "Module 2: Variables & Data Types"
sidebar_label: "Module 2: Variables & Data Types"
---

# Module 2: Variables & Data Types

In this module, we will learn how to store data in computer memory using variables and explore the different types of data we can use in Python.

---

## 2.1 Variables

A **Variable** is a container or a box used to store data in a computer's memory.

* **Analogy:** Think of jars in a kitchen. You might label one jar "sugar" and another "salt". In coding, we label variables to store numbers, names, or other values.

```python
# Creating variables
age = 22
name = "Sai Kumar"

print(age)
print(name)
```
In this code, `age` is a variable name, and `22` is the value stored inside it.

---

## 2.2 Naming Rules

When naming variables in Python, you must follow these rules:

1. A variable name must start with a letter (a-z, A-Z) or an underscore (`_`).
2. A variable name cannot start with a number (e.g., `1name` is invalid, but `name1` is valid).
3. A variable name can only contain letters, numbers, and underscores. Special characters (like `@`, `$`, `%`, `&`) are not allowed.
4. Python is **Case-Sensitive**. This means `age` and `Age` are two different variables.
5. You cannot use reserved keywords (like `if`, `else`, `while`, `for`, `print`) as variable names.

---

## 2.3 Integer

An **Integer** is a whole number (positive, negative, or zero) without any decimal points.

```python
students_count = 50
temperature = -5
zero_value = 0
```

---

## 2.4 Float

A **Float** is a number that contains a decimal point.

```python
pi = 3.14
price = 99.99
height = 5.8
```

---

## 2.5 String

A **String** is a sequence of characters or text. Strings must be wrapped in double quotes (`"..."`) or single quotes (`'...'`).

```python
channel_name = "Think IT Telugu"
message = 'Welcome to Python'
```

---

## 2.6 Boolean

A **Boolean** represents only one of two values: **True** or **False**.

```python
is_coding_easy = True
has_laptop = False
```
*Note: In Python, `True` and `False` must always start with capital letters.*

---

## 2.7 Type Function

You can check the data type of any variable using the built-in `type()` function.

```python
x = 100
y = 10.5
z = "Python"
is_active = True

print(type(x))         # Output: <class 'int'>
print(type(y))         # Output: <class 'float'>
print(type(z))         # Output: <class 'str'>
print(type(is_active)) # Output: <class 'bool'>
```

---

## 2.8 Type Conversion

Converting one data type into another is called **Type Conversion** or **Type Casting**.

```python
# Converting Float to Integer
price = 99.99
integer_price = int(price)
print(integer_price) # Output: 99 (decimal part is removed)

# Converting Integer to Float
age = 22
float_age = float(age)
print(float_age) # Output: 22.0

# Converting Number to String
score = 100
str_score = str(score)
print(type(str_score)) # Output: <class 'str'>

# Converting String to Integer (string must contain only digits)
num_str = "45"
num = int(num_str)
print(num + 5) # Output: 50
```
:::caution Warning
If you try to convert a text string (like `"hello"`) into an integer, Python will show a `ValueError`.
:::
