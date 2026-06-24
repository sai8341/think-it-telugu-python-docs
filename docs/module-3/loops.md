---
sidebar_position: 2
title: "10 — Iterative Loops"
---

# Chapter 10: Iterative Control Loops

Loops allow us to repeat a block of code multiple times without writing the same instructions again. This chapter covers `for` loops, `while` loops, the `range()` function, loop control statements (`break`, `continue`, `pass`), and Python's unique `else` block for loops.

---

## 1. Loop Types: `for` vs. `while` 

Python provides two main types of loops: `for` loops (for definite iteration) and `while` loops (for indefinite iteration).

> **Real-World Analogy: The Bucket & Mug:** Imagine you want to empty a large bucket of water using a small mug.
> * **`for` loop:** You look at the bucket and count: *"There is exactly 10 mugs of water here."* Because you know the exact count, you dip the mug and pour exactly 10 times. You know when it will end before you even start.
> * **`while` loop:** The bucket is under a running tap. You don't know the count of mugs it will take. You simply dip the mug and pour *"while there is still water inside the bucket."* You only stop when the bucket is empty.

---

## 2. Definite Iteration: The `for` Loop 

A `for` loop is used to iterate over a sequence (such as a list, string, or range of numbers).

### The `range()` Function
The `range()` function generates a sequence of numbers on the fly:
*   `range(stop)`: Generates numbers from `0` to `stop - 1`.
*   `range(start, stop)`: Generates numbers from `start` to `stop - 1`.
*   `range(start, stop, step)`: Generates numbers with a custom gap (step size).

```python
# Iterating over range(1, 6) -> 1 to 5
for i in range(1, 6):
    print(f"Count: {i}")

# Step sizes (0 to 15, skipping by 5s)
for i in range(0, 20, 5):
    print(i)  # Output: 0, 5, 10, 15

# Counting backwards using a negative step
for i in range(5, 0, -1):
    print(i)  # Output: 5, 4, 3, 2, 1
```

### Iterating Over Sequences
You can loop directly through characters in a string or items in a list:

```python
# Iterating over a string
for char in "Python":
    print(char, end="-")  # Output: P-y-t-h-o-n-

# Iterating over a list
fruits = ["Apple", "Banana", "Grape"]
for fruit in fruits:
    print(fruit)
```

---

## 3. Indefinite Iteration: The `while` Loop 

A `while` loop runs repeatedly as long as a specified condition remains `True`.

```python
count = 3
while count > 0:
    print(f"Countdown: {count}")
    count -= 1  # Crucial: update condition to avoid an infinite loop!
print("Liftoff! ")
```

> **Warning: Infinite Loops:**
> If the `while` condition never becomes `False` and there is no exit mechanism, your program will run forever and freeze your system. Always ensure the loop variable changes inside the block.

---

## 4. Loop Control Statements: `break`, `continue`, and `pass` 

You can change the standard flow of a loop using control statements.

> **Real-World Analogy: Traffic Signals:** 
> *   **`break`** is like a **Red Light**. It forces your car (loop) to stop immediately and exits the road (loop block) completely.
> *   **`continue`** is like a **Yellow Light**. It tells you to skip the current crossing (current loop iteration) and immediately jump to the next crossing (next iteration cycle).
> *   **`pass`** is a **Green Light** with no road signs. It does absolutely nothing—it is just a placeholder to keep Python's syntax happy when you haven't written code inside a block yet.

```python
# 1. Break Example: Search for a specific item and stop
for num in [1, 3, 5, 8, 9]:
    if num % 2 == 0:
        print(f"Found first even number: {num}")
        break  # Loop exits immediately

# 2. Continue Example: Skip odd numbers
for num in range(1, 6):
    if num % 2 != 0:
        continue  # Skips print for odd numbers, moves to next item
    print(f"Even: {num}")

# 3. Pass Example: Placeholder for future code
for i in range(5):
    pass  # Does nothing, prevents IndentationError
```

### Python's Unique `else` Block in Loops
Python loops can have an optional `else` block. The code in the `else` block runs **only if the loop completed naturally** (i.e., it iterated through all items without hitting a `break` statement).

```python
# Checking if a number is prime
num = 7
for i in range(2, num):
    if num % i == 0:
        print(f"{num} is not a prime number.")
        break
else:
    # This runs ONLY if the loop finishes without hitting the 'break'
    print(f"{num} is a prime number!")
```

---

## 5. Placement & Interview Focus 

*   **Question:** What is the difference between `break` and `continue`?
*   **Answer:** `break` terminates the loop execution immediately and transfers control to the statement following the loop. `continue` skips only the remaining statements in the current iteration and jumps directly to the evaluation of the loop's next iteration.
*   **Question:** When does the `else` block associated with a `for` or `while` loop execute?
*   **Answer:** The `else` block associated with a loop executes only when the loop terminates naturally (after iterating through all elements in a `for` loop, or when the condition becomes `False` in a `while` loop). If the loop is terminated prematurely using a `break` statement, the `else` block is completely skipped.
