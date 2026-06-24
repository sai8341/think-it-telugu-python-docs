---
title: "Module 12: Functions"
sidebar_label: "Module 12: Functions"
---

# Module 12: Functions

In this module, we will learn about **Functions**. A function is a block of reusable code designed to perform a specific task.

---

## 12.1 Why Functions?

* **DRY (Don't Repeat Yourself):** Instead of writing the same code in multiple places, you write it once inside a function and call it whenever needed.
* **Organized Code:** Breaking down a large program into smaller functions makes it easier to read, understand, and debug.

---

## 12.2 Creating & Calling Functions

In Python, we use the `def` keyword (short for "define") to create a function.

### Syntax:
```python
def function_name():
    # code to execute
```

### Example:
```python
# Creating a function
def greet():
    print("Welcome to Think IT Telugu!")

# Calling the function (running it)
greet() # Output: Welcome to Think IT Telugu!
greet() # Running it again
```

---

## 12.3 Parameters vs Arguments

We can pass information into functions using variables:

* **Parameters:** Variables listed inside the parentheses when defining the function.
* **Arguments:** Actual values sent to the function when calling it.

```python
# "name" is a Parameter
def greet_user(name):
    print(f"Hello {name}, welcome!")

# "Sai" and "Ram" are Arguments
greet_user("Sai")
greet_user("Ram")
```

---

## 12.4 The return Statement

Instead of just printing a value, a function can send a value back to the main program using the `return` statement.

```python
def add(a, b):
    return a + b

result = add(10, 20)
print("The sum is:", result) # Output: The sum is: 30
```
*Note: A function stops executing immediately when it runs a `return` statement. Any code written below it will be skipped.*

---

## 12.5 Default Parameters

You can assign a default value to a parameter. If no argument is passed when calling the function, Python will use the default value.

```python
def welcome(name, course="Python"):
    print(f"Hello {name}, welcome to the {course} course.")

welcome("Sai")            # Output: Hello Sai, welcome to the Python course.
welcome("Ram", "Java")    # Output: Hello Ram, welcome to the Java course.
```

---

## 12.6 Scope

**Scope** refers to where a variable can be accessed in your code:

### 1. Local Scope:
Variables created inside a function can only be used inside that function. They are not visible to the outside program.
```python
def my_func():
    msg = "I am local"
    print(msg)

my_func()
# print(msg) # Throws an error! "msg" is not defined outside the function.
```

### 2. Global Scope:
Variables created outside of all functions can be accessed anywhere in the program.
```python
x = 100 # Global variable

def show():
    print("Inside function:", x) # Accessible inside the function

show()
print("Outside function:", x)
```
:::tip Best Practice
Avoid modifying global variables inside functions. Keeping variables local to their functions makes your code cleaner and prevents bugs!
:::
