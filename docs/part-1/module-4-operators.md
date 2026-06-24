---
title: "Module 4: Operators"
sidebar_label: "Module 4: Operators"
---

# Module 4: Operators

In this module, we will learn about operators. Operators are symbols used to perform calculations, make comparisons, and run logical tests in Python.

---

## 4.1 Arithmetic Operators

These operators are used for basic mathematical calculations:

| Operator | Name | Description | Example ($x = 10, y = 3$) | Result |
| :--- | :--- | :--- | :--- | :--- |
| `+` | Addition | Adds two numbers | `x + y` | `13` |
| `-` | Subtraction | Subtracts one number from another | `x - y` | `7` |
| `*` | Multiplication | Multiplies two numbers | `x * y` | `30` |
| `/` | Division | Divides numbers (always returns a float) | `x / y` | `3.3333` |
| `//` | Floor Division | Divides numbers and rounds down to the nearest whole number | `x // y` | `3` |
| `%` | Modulus | Returns the remainder of a division | `x % y` | `1` |
| `**` | Exponentiation | Calculates power ($x$ raised to the power $y$) | `x ** y` (i.e. $10^3$) | `1000` |

```python
x = 10
y = 3
print("Division:", x / y)       # Output: 3.3333333333333335
print("Floor Division:", x // y) # Output: 3
print("Remainder:", x % y)       # Output: 1
print("Power:", x ** y)          # Output: 1000
```

---

## 4.2 Assignment Operators

These operators are used to store or update values in variables:

| Operator | Example | Equivalent to |
| :--- | :--- | :--- |
| `=` | `x = 5` | `x = 5` |
| `+=` | `x += 3` | `x = x + 3` |
| `-=` | `x -= 3` | `x = x - 3` |
| `*=` | `x *= 3` | `x = x * 3` |
| `/=` | `x /= 3` | `x = x / 3` |
| `%=` | `x %= 3` | `x = x % 3` |

```python
a = 10
a += 5  # Adds 5 to a and saves it
print(a) # Output: 15
```

---

## 4.3 Comparison Operators

These operators are used to compare two values. They always return a boolean value: **True** or **False**.

| Operator | Name | Example ($a = 10, b = 20$) | Result |
| :--- | :--- | :--- | :--- |
| `==` | Equal to | `a == b` | `False` |
| `!=` | Not Equal to | `a != b` | `True` |
| `>` | Greater Than | `a > b` | `False` |
| `<` | Less Than | `a < b` | `True` |
| `>=` | Greater Than or Equal to | `a >= b` | `False` |
| `<=` | Less Than or Equal to | `a <= b` | `True` |

```python
x = 15
y = 15
print(x == y) # Output: True
print(x != y) # Output: False
```

---

## 4.4 Logical Operators

These operators are used to combine multiple conditions:

* **`and`:** Returns **True** only if both conditions are True.
* **`or`:** Returns **True** if at least one condition is True.
* **`not`:** Reverses the result (returns False if the result is True, and vice versa).

```python
x = 10
print(x > 5 and x < 20) # True and True => Output: True
print(x > 15 or x < 20) # False or True => Output: True
print(not(x == 10))     # not(True) => Output: False
```

---

## 4.5 Membership Operators

These operators check if a value is present in a collection (like a list or string):

* **`in`:** Returns **True** if the value is found.
* **`not in`:** Returns **True** if the value is not found.

```python
fruits = ["apple", "banana", "mango"]

print("apple" in fruits)     # Output: True
print("grapes" in fruits)    # Output: False
print("grapes" not in fruits) # Output: True
```

---

## 4.6 Identity Operators

These operators check if two variables point to the same memory location (or the same object):

* **`is`:** Returns **True** if both variables are the exact same object.
* **`is not`:** Returns **True** if they are different objects.

```python
x = [1, 2, 3]
y = [1, 2, 3]
z = x

# x and y have the same values, but they are different list objects in memory
print(x == y) # Output: True (values are the same)
print(x is y) # Output: False (different memory locations)

print(x is z) # Output: True (z is assigned to x, so they point to the same memory)
```
