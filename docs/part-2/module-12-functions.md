---
title: "Module 12: Functions"
sidebar_label: "Module 12: Functions"
---

# Module 12: Functions

In this module, we will learn about **Functions**. A function is a block of reusable code designed to perform a specific task.

---

## 12.1 Why Functions?

* **DRY (Don't Repeat Yourself):** Instead of writing the same lines of code over and over again, you write them once inside a function and call it whenever needed.
* **Code Reusability:** Once a function is created, you can reuse it thousands of times across different parts of your software without re-typing the logic.
* **Organized & Clean Code:** Breaking down a complex program into smaller, logical blocks makes your code much easier to read, test, and fix.

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

Beginners often confuse these two terms, but the difference is simple:

* **Parameter (Placeholder):** The variable name listed inside the parentheses when you **define** the function. It acts as an empty placeholder waiting to receive data.
* **Argument (Actual Value):** The real data value you send into the function when you **call** it.

```python
# "name" is the Parameter (Placeholder defined inside the function)
def greet_user(name):
    print(f"Hello {name}, welcome!")

# "Sai" and "Ram" are the Arguments (Actual data sent during function call)
greet_user("Sai")
greet_user("Ram")
```

---

## 12.4 The return Statement (Why return instead of print?)

A very common beginner question is: **"Why should we use `return` when `print()` already shows the answer?"**

* **print() is only for humans:** It simply displays the text on your screen. Python immediately forgets the value after printing it. You cannot save a printed value into a variable or use it in another math calculation.
* **return is for the software:** It sends the actual calculated result back to your main program so you can store it in a variable, pass it into another function, or reuse it later.

```python
def add(a, b):
    return a + b # Sends the answer back to the program

# We can store the returned answer in a variable and reuse it!
result = add(10, 20)
final_score = result * 2 

print("The final score is:", final_score) # Output: The final score is: 60
```
*Note: A function stops executing immediately when it runs a `return` statement. Any code written below it inside that function will be skipped.*

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

---

## 12.7 Common Beginner Mistakes

When learning functions, beginners frequently run into these common pitfalls:

1. **Forgetting Parentheses when Calling:** Typing `greet` instead of `greet()` will not run the function; Python will only show the function's memory object.
2. **Indentation Errors:** All code inside a function must be indented (4 spaces or 1 Tab). Forgetting to indent causes an `IndentationError`.
3. **Writing Code After return:** Any code placed below a `return` statement inside a function is completely ignored and will never run.
4. **Confusing print() with return:** Expecting a function that only uses `print()` to store data inside a variable (it returns `None` instead!).
