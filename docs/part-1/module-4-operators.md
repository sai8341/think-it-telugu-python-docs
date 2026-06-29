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

## 4.7 Operator Precedence & The BODMAS Rule (BODMAS నియమం)

When you write an expression with multiple operators (like `5 + 3 * 2`), how does Python decide which one to calculate first?

To understand this easily, we can use the **BODMAS** rule that you learned in school! Python follows almost the exact same priority order:

| BODMAS Letter | Math Meaning | Python Operator | Priority |
| :--- | :--- | :--- | :--- |
| **B** (Brackets) | Parentheses | **`()`** | **1st (Highest)** |
| **O** (Order) | Powers / Exponents | **`**`** | **2nd** |
| **D** / **M** | Division / Multiplication | **`/`, `//`, `%`, `*`** | **3rd** |
| **A** / **S** | Addition / Subtraction | **`+`, `-`** | **4th** |

> **Coding Rule Addition:** After solving all math operators, Python evaluates **Comparison Operators** (like `==`, `!=`, `>`) and finally **Logical Operators** (like `not`, `and`, `or`).

---

### Step-by-Step Tracing Example (BODMAS in action):

Let's trace how Python solves this complex expression:
```python
expression = (2 + 3) * 4 ** 2 // 8
```

1. **Step 1: Solve Brackets `()`**
   * `(2 + 3)` becomes `5`.
   * Expression is now: `5 * 4 ** 2 // 8`
2. **Step 2: Solve Exponents (Powers) `**`**
   * `4 ** 2` (4 square) becomes `16`.
   * Expression is now: `5 * 16 // 8`
3. **Step 3: Solve Multiplication & Division (Left-to-Right)**
   * Since `*` comes first from the left, solve `5 * 16` first = `80`.
   * Expression is now: `80 // 8`
   * Finally, solve the Floor Division `80 // 8` = `10`.
4. **Final Result:** `10`

---

### The Exponentiation `**` Right-to-Left Trap:
Normally, calculations happen from left to right. However, **Exponentiation (`**`) evaluates from right to left**!
```python
# Calculating 2 ** 3 ** 2
# Python evaluates 3 ** 2 first (9)
# Then it calculates 2 ** 9 = 512
result = 2 ** 3 ** 2
print(result) # Output: 512 (Not 64!)
```

### Floor Division vs. Float Division:
- `/` always returns a **Float** (e.g., `5 / 2 = 2.5`).
- `//` returns the **Floor integer** (truncates towards negative infinity, e.g., `5 // 2 = 2`, `-5 // 2 = -3`).

---

## 4.8 Practice Exercises

Try writing and running these programs in your Python Lab:

1. **Even or Odd Checker:**
   Write a program that takes a user-entered number and checks if it is Even or Odd using the modulus operator (`%`).
2. **Leap Year Checker Concept:**
   Determine whether a user-entered year is a leap year (divisible by 4, but not by 100 unless also divisible by 400).
3. **Precedence Testing:**
   Write a Python program to evaluate the expression `10 + 20 * 30 // 5 ** 2` and print the output. Predict the mathematical steps before running!

---

## 4.9 Placement Q&A (Interview Prep)

**Q1. What is the difference between `/` and `//` operators in Python?**  
**Answer:** `/` is float division and always returns a decimal float value (e.g., `10 / 2` is `5.0`). `//` is floor division which rounds down the result to the nearest whole integer (e.g., `10 // 3` is `3`, `-10 // 3` is `-4`).

**Q2. What will be the output of `print(3 * 1 ** 3)`?**  
**Answer:** `3`. Exponentiation (`**`) has higher precedence than multiplication (`*`). So `1 ** 3` is evaluated first (which is `1`), and then `3 * 1` is evaluated, resulting in `3`.

**Q3. What is the difference between `==` and `is` operators?**  
**Answer:** `==` is a value comparison operator. It checks if the values of two objects are equal. `is` is an identity comparison comparison operator. It checks if both variables point to the exact same object in the memory (shares the same memory address).


---

## 4.10 Module 4 Cheat Sheet

* **Arithmetic:** `+`, `-`, `*`, `/` (float), `//` (floor), `%` (remainder), `**` (exponentiation).
* **Assignment:** `=`, `+=`, `-=`, `*=`, `/=`.
* **Comparison:** `==` (equals), `!=` (not equals), `>`, `<`, `>=`, `<=`.
* **Logical:** `and` (both true), `or` (at least one true), `not` (reverses boolean).
* **Membership & Identity:** `in` / `not in` (checks membership); `is` / `is not` (checks memory identity).
* **Precedence:** Parentheses `()` > Exponent `**` > Mult/Div > Add/Sub.

