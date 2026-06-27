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

* **Why Variables are Needed:** Without variables, a program cannot remember or reuse information. For example, if you calculate a tax of 18% in multiple places, saving it as `tax_rate = 0.18` lets you reuse it easily. If the tax changes, you only update it once in the variable, instead of changing it in hundreds of lines of code.

```python
# Creating variables
age = 22
name = "Sai Kumar"

print(age)
print(name)
```
In this code, `age` is a variable name, and `22` is the value stored inside it.

* **Variable Reassignment:** The value inside a variable can be changed or updated (reassigned) at any time during the program:
```python
score = 0
print(score) # Output: 0

score = 10   # The value is now updated to 10
print(score) # Output: 10
```

---

## 2.2 Naming Rules

When naming variables in Python, you must follow these rules:

1. A variable name must start with a letter (a-z, A-Z) or an underscore (`_`).
2. A variable name cannot start with a number.
3. A variable name can only contain letters, numbers, and underscores. Special characters (like `@`, `$`, `%`, `&`) or spaces are not allowed.
4. Python is **Case-Sensitive**. This means `age` and `Age` are two completely different variables.
5. You cannot use reserved keywords (like `if`, `else`, `while`, `for`) as variable names.

* **Valid vs Invalid Examples:**
  * **Valid:** `user_age`, `score_1`, `_total`, `price`
  * **Invalid:** `1score` (starts with a number), `user-age` (contains a hyphen), `user age` (contains a space), `user@email` (contains a special character)

* **Python Constants:** Python does not have strict constants (variables that can never change). However, by convention, developers write constants in **UPPERCASE** to signal that their values should not be modified:
```python
PI = 3.14
MAX_LOGIN_ATTEMPTS = 5
```

---

## 2.3 Data Types Overview

In programming, different values have different natures. A computer needs to know what *type* of data is stored in a variable so it knows what mathematical or logical operations are allowed.

* **Dynamic Typing:** In some programming languages (like C++ or Java), you must declare a variable's type before using it. Python uses **Dynamic Typing**, which means Python automatically detects the data type based on the value you assign to the variable.

### Core Data Types in Python:
* **Integer (int):** Whole numbers (e.g., `10`, `-5`).
* **Float:** Numbers with decimal points (e.g., `3.14`).
* **String (str):** Text values (e.g., `"Hello"`).
* **Boolean (bool):** Logical True or False.
* **NoneType:** Represents the absence of a value.

---

## 2.4 Integer

An **Integer** is a whole number (positive, negative, or zero) without any decimal points.

```python
students_count = 50
temperature = -5
zero_value = 0
```

---

## 2.5 Float

A **Float** is a number that contains a decimal point.

```python
pi = 3.14
price = 99.99
height = 5.8
```

---

## 2.6 String

A **String** is a sequence of characters or text. Strings must be wrapped in double quotes (`"..."`) or single quotes (`'...'`).

```python
channel_name = "Think IT Telugu"
message = 'Welcome to Python'
```

---

## 2.7 Boolean

A **Boolean** represents only one of two values: **True** or **False**.

```python
is_coding_easy = True
has_laptop = False
```
*Note: In Python, `True` and `False` must always start with capital letters.*

---

## 2.8 None

**None** is a special data type that represents "no value yet" or "empty value." It is useful as a placeholder when you want to declare a variable but do not have its value yet.

```python
user_email = None # Email will be collected later
```

---

## 2.9 Checking Data Types using type()

You can check the data type of any variable using the built-in `type()` function.

```python
x = 100
y = 10.5
z = "Python"
is_active = True
no_value = None

print(type(x))        # Output: <class 'int'>
print(type(y))        # Output: <class 'float'>
print(type(z))        # Output: <class 'str'>
print(type(is_active))# Output: <class 'bool'>
print(type(no_value)) # Output: <class 'NoneType'>
```

---

## 2.10 Type Conversion

Converting one data type into another is called **Type Conversion** or **Type Casting**. This is necessary when you have a value in one format (like text `"50"`) but need it in another (like integer `50`) to perform mathematical operations.

```python
# Converting Float to Integer (removes the decimal part)
price = 99.99
integer_price = int(price)
print(integer_price) # Output: 99

# Converting Integer to Float (adds .0)
age = 22
float_age = float(age)
print(float_age) # Output: 22.0

# Converting Number to String (so it can be treated as text)
score = 100
str_score = str(score)
print(type(str_score)) # Output: <class 'str'>

# Converting String to Integer (only works if the text contains digits)
num_str = "45"
num = int(num_str)
print(num + 5) # Output: 50
```

:::caution Warning
If you try to convert a text string that is not a number (like `"hello"`) into an integer, Python will show a `ValueError`.
:::
