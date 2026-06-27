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

### Modulus Example (Even or Odd Check):
A common practical use of the Modulus operator (`%`) is checking if a number is even or odd. If a number is divided by `2` and the remainder is `0`, it is an even number; otherwise, it is odd.
```python
number = 15
remainder = number % 2
print("Remainder is:", remainder) # Output: 1 (Since remainder is 1, 15 is an Odd number)
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
a += 5   # Adds 5 to a and saves the result back into a
print(a) # Output: 15
```

:::danger Warning: `=` vs `==`
Do not confuse variable assignment with comparison.
* **`=` (Single Equals):** Used to **assign** a value to a variable (e.g., `x = 5` stores 5 in x).
* **`==` (Double Equals):** Used to **compare** two values (e.g., `x == 5` checks if x is equal to 5 and returns `True` or `False`).
:::

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
# Real-World Logical Examples:

# 'and' requires BOTH conditions to be True
age = 19
has_id = True
is_eligible_for_discount = (age >= 18) and has_id
print(is_eligible_for_discount) # Output: True

# 'or' requires AT LEAST ONE condition to be True
has_ticket = False
is_vip = True
can_enter_party = has_ticket or is_vip
print(can_enter_party) # Output: True

# 'not' reverses the boolean value
is_raining = False
go_for_walk = not is_raining
print(go_for_walk) # Output: True
```

---

## 4.5 Membership Operators

These operators check if a value is present inside a sequence (like a string):

* **`in`:** Returns **True** if the value is found.
* **`not in`:** Returns **True** if the value is not found.

```python
course = "Python AI Engineering"

print("Python" in course)      # Output: True
print("Java" in course)        # Output: False
print("Java" not in course)    # Output: True
```

---

## 4.6 Identity Operators

These operators check if two variables point to the exact same memory location (or object) in the computer's memory:

* **`is`:** Returns **True** if both variables point to the exact same object.
* **`is not`:** Returns **True** if they point to different objects.

```python
x = [1, 2, 3]
y = [1, 2, 3] # x and y have the same value, but they are stored in different boxes in memory
z = x         # z is assigned to x, so they point to the exact same memory box

# Checking values vs checking identity:
print(x == y) # Output: True  (Their values are identical)
print(x is y) # Output: False (They reside in different memory locations)
print(x is z) # Output: True  (They point to the exact same memory location)
```

---

## 4.7 Operator Precedence

When you write expressions with multiple operators, Python evaluates them in a specific order (similar to mathematical rules like BODMAS or PEMDAS).

### Order of Evaluation (Highest to Lowest Priority):
1. **Parentheses `()`** (Used to group calculations and force evaluation first)
2. **Exponentiation `**`**
3. **Multiplication `*`, Division `/`, Floor Division `//`, Modulus `%`**
4. **Addition `+`, Subtraction `-`**
5. **Comparisons (`==`, `>`, etc.)**
6. **Logical Operators (`not`, `and`, `or`)**

```python
# Example 1: Multiplication evaluates before Addition
result_1 = 5 + 3 * 2
print(result_1) # Output: 11 (Since 3 * 2 is evaluated first)

# Example 2: Parentheses override standard precedence
result_2 = (5 + 3) * 2
print(result_2) # Output: 16
```
