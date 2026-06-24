---
sidebar_position: 1
title: "12 — Intro to Functions"
---

# Chapter 12: Introduction to Functions

As programs grow larger, writing code in a single linear script becomes unmanageable. This chapter introduces modular programming, the DRY (Don't Repeat Yourself) principle, and how to create and call basic functions in Python.

---

## 1. The Shift to Modular Code 

When you start learning to code, you write code in a linear, step-by-step flow (one long script). However, as your program grows to handle more complex logic—such as calculating totals, formatting data, or querying APIs—writing the exact same lines of code over and over becomes redundant and messy. This is where functions come in.

> A **function** is a reusable block of organized code designed to perform a single, related action. It allows you to write instructions once, name them, and reuse them anywhere in your program.

---

## 2. The DRY Principle 

The core philosophy behind functions is **DRY: Don't Repeat Yourself**.

> **DRY Principle:** Every piece of knowledge or logic within a system must have a single, unambiguous representation. The opposite of DRY is **WET (Write Everything Twice)**. Writing repetitive code makes debugging harder—if a bug appears, you have to find and fix it in every single location where that block was copied.

To understand why we use functions, consider these three analogies:

### Analogy 1: The Recipe 
Think of a function like a recipe for making coffee. Instead of writing out the step-by-step instructions (*boil water, grind beans, brew, pour*) every single time someone orders a coffee, a restaurant writes the recipe down once and names it "make_coffee". When an order arrives, they simply call "make_coffee()".

### Analogy 2: The Keyboard Shortcut ️
Defining a function is like creating a custom keyboard shortcut (like `Ctrl+C`). Instead of manually clicking *Edit -> Selection -> Copy* every time, you map those multiple steps to a single keystroke. Calling the function is like pressing the shortcut key.

### Analogy 3: The Assembly Line 
Instead of one worker building an entire car from scratch (linear coding), a modern factory divides the work among specialized stations (one for the engine, one for wheels, one for painting). Each station acts as a function, performing its specific job when called upon.

---

## 3. Creating & Calling a Function in Python 

In Python, we define a function using the `def` keyword, followed by the function name, parentheses `()`, and a colon `:`. The code block inside the function must be indented.

```python
# 1. Defining the function (like writing the recipe)
def greet_user():
    print("Hello there!")
    print("Welcome to Think IT Python Course. ")

# 2. Calling the function (like executing the recipe)
greet_user()
greet_user()
```

When Python encounters `greet_user()`, it pauses the main program flow, jumps to the function definition, executes the code inside, and then jumps back to where it left off.

---

## Placement & Interview Focus 

*   **Question:** What is the DRY principle, and why is it important in professional software engineering?
*   **Answer:** DRY stands for "Don't Repeat Yourself". It is a software development principle aimed at reducing repetition of code. It is important because it makes code modular and easier to maintain. If the requirements change or a bug is found, you only need to update the logic in one place (inside the function) rather than searching for and fixing every copied instance of the code.
*   **Question:** What does a function call do under the hood in memory?
*   **Answer:** When a function is called, the program suspends its current execution path and pushes a new frame onto the **Call Stack**. This stack frame holds the function's local variables, arguments, and return address. Once the function completes and returns, its frame is popped off the stack, and memory allocated for its local variables is freed.
