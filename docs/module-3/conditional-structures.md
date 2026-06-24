---
sidebar_position: 1
title: "09 — Conditional Decisions"
---

# Chapter 9: Conditional Decisions

Control flow is how a program decides which path of code to execute. This chapter covers decision-making using conditional structures like `if`, `else`, `elif`, nested conditions, ternary operators, and Python's modern `match-case` syntax.

---

## 1. Controlling the Code Flow 

Normally, a computer executes code sequentially, line-by-line from top to bottom. However, real-world systems need to choose different paths based on conditions.

> **Real-World Analogy: The Water Dam:** Think of a water dam. If the water level rises above a certain threshold, the floodgates are opened. If the water level is normal, the gates remain closed. The dam's operator controls the water flow based on conditions. Similarly, conditional statements act as gatekeepers for your code.

---

## 2. Python's Strict Indentation Rules 

In other programming languages (like C++, Java, or JavaScript), blocks of code that belong together are grouped using curly brackets `{}`. 

In Python, this grouping is done strictly through **indentation** (typically four spaces).

> Python's indentation is syntax, not just formatting. If your indentation is incorrect, the program will throw an `IndentationError` and refuse to run.

```python
age = 20

if age >= 18:
    # These two lines are inside the if block because they are indented
    print("You are eligible to vote!")
    print("Please register online.")

# This line is outside the if block because it is not indented
print("This statement runs no matter what.")
```

When you type a control flow statement ending with a colon (`:`) and press "Enter" in modern IDEs like VS Code, the editor will automatically indent the next line for you.

---

## 3. Decision Structures: `if`, `else`, and `elif` 

### The Simple `if`
Executes a block of code only if the condition evaluates to `True`.

### The `if-else` Alternative
Executes the `if` block if the condition is `True`, otherwise it executes the `else` block.

### The `elif` Ladder (Mutual Priority Check)
For checking multiple mutually exclusive conditions in order.

> **Real-World Analogy: Mom's Pocket:** Imagine you want money from your mom. 
> * First, you ask: *"Mom, do you have Rs 100?"* (`if`)
> * If she doesn't, you ask: *"Do you have Rs 50?"* (`elif`)
> * If she doesn't, you ask: *"Do you have Rs 10?"* (`elif`)
> * If she doesn't have anything, she gives you Rs 0 (`else`).
> The moment one of your requests is satisfied, you stop asking and leave. This is exactly how the `elif` ladder operates.

```python
score = 85

if score >= 90:
    grade = "A+"
elif score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "F"

print(f"Grade: {grade}")  # Output: Grade: A
```

---

## 4. Nested Conditions & Ternary Operators 

### Nested Conditions
You can place conditional blocks inside other conditional blocks to build multi-layered checks.

```python
is_student = True
has_id_card = False

if is_student:
    if has_id_card:
        print("Welcome to the college library!")
    else:
        print("Please show your student ID card to enter.")
else:
    print("Visitors must register at the reception desk.")
```

### The Ternary Operator (One-Line if-else)
For simple, short conditional assignments, Python allows a clean, inline ternary operator:

```python
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # Output: Adult
```

---

## 5. Modern Pattern Matching: `match-case` 

Introduced in Python 3.10, the `match-case` statement serves as a clean, structured alternative to long `elif` ladders (similar to `switch-case` in other languages).

```python
command = "stop"

match command:
    case "start":
        print("System starting...")
    case "stop":
        print("System stopping...")
    case "pause":
        print("System paused.")
    case _:
        # The wildcard case _ acts as the default fallback
        print("Unknown command!")
```

---

## Placement & Interview Focus 

*   **Question:** What is the difference between writing multiple sequential `if` statements vs. an `if-elif-else` ladder?
*   **Answer:** Sequential `if` statements check every single condition independently, even if a previous condition has already evaluated to `True`. An `if-elif-else` ladder stops evaluating conditions as soon as it finds one that is `True`, making it more efficient and logically distinct.
*   **Question:** Why does Python enforce strict indentation, and what error is raised if it is violated?
*   **Answer:** Python enforces indentation to keep the source code highly readable and clean, eliminating the visual clutter of curly braces `{}`. If indentation is mismatched or missing, Python raises an `IndentationError` during compilation and the program will not run.
