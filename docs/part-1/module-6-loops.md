---
title: "Module 6: Loops"
sidebar_label: "Module 6: Loops"
---

# Module 6: Loops

In this module, we will learn about loops. Loops are used to run a block of code multiple times. This saves us from writing duplicate code.

---

## 6.1 Why Loops?

**Problem:** You want to print your name on the screen 100 times.
* **Without Loops:** You have to write `print("Sai")` 100 times.
* **With Loops:** You can do it in just 2 lines of code.

---

## 6.2 The for Loop

A **for loop** is used to iterate over a sequence (like a list, a string, or a range of numbers).

### Using the range() Function:
The `range(start, stop, step)` function generates a sequence of numbers.
```python
# Print numbers from 1 to 5
for i in range(1, 6):
    print(f"Number is {i}")
```

### Looping Through a String:
```python
name = "PYTHON"
for char in name:
    print(char)
# Output: Prints P, Y, T, H, O, N on separate lines
```

---

## 6.3 The while Loop

A **while loop** runs as long as a specified condition remains **True**.

### Example:
```python
count = 1
while count <= 5:
    print(f"Count is {count}")
    count += 1 # Updates the count so the loop can stop eventually
```

:::danger Infinite Loop Warning
If you forget to update the loop variable (like `count += 1`), the condition remains `True` forever. This creates an **Infinite Loop** that never stops. Press `Ctrl + C` in the terminal to force-stop it.
:::

---

## 6.4 The break Statement

The `break` statement is used to stop and exit the loop immediately, even if the loop condition is still True.

```python
for i in range(1, 10):
    if i == 5:
        break # Exits the loop when i becomes 5
    print(i)
# Output: 1, 2, 3, 4
```

---

## 6.5 The continue Statement

The `continue` statement skips the rest of the code in the current iteration and jumps directly to the next cycle of the loop.

```python
for i in range(1, 6):
    if i == 3:
        continue # Skips printing 3 and moves to the next iteration
    print(i)
# Output: 1, 2, 4, 5
```

---

## 6.6 The pass Statement

In Python, writing an empty loop or condition causes an error. We use the `pass` statement as a placeholder to do nothing and avoid errors.

```python
for i in range(1, 5):
    if i == 2:
        pass # Placeholder for future logic
    print(i)
```

---

## 6.7 Nested Loops

Writing a loop inside another loop is called a **Nested Loop**.

### Pattern Printing Example:
```python
# Prints a grid of stars
for i in range(1, 4):     # Outer loop (controls rows)
    for j in range(1, 4): # Inner loop (controls columns)
        print("*", end=" ")
    print() # Prints a new line after each row
```
### Output:
```text
* * * 
* * * 
* * * 
```
:::tip Think About It
Every time the outer loop runs once, the inner loop runs completely (3 times). Practicing nested loops is a great way to improve your logic skills!
:::
