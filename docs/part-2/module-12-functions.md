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

---

## 12.8 Arbitrary Arguments (*args & **kwargs)

Sometimes you do not know beforehand how many arguments a user will pass to your function. Python solves this using `*args` and `**kwargs`.

### 1. *args (Arbitrary Positional Arguments):
Accepts any number of positional arguments as a **Tuple**.
```python
def sum_numbers(*args):
    # args behaves like a Tuple: (10, 20, 30)
    return sum(args)

print(sum_numbers(10, 20))         # Output: 30
print(sum_numbers(10, 20, 30, 40)) # Output: 100
```

### 2. **kwargs (Arbitrary Keyword Arguments):
Accepts any number of keyword arguments as a **Dictionary**.
```python
def print_info(**kwargs):
    # kwargs behaves like a Dictionary
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Sai", role="Instructor", topic="Python")
# Output:
# name: Sai
# role: Instructor
# topic: Python
```

---

## 12.9 Lambda Functions (Anonymous Functions)

A **Lambda Function** is a small, one-line anonymous function (a function without a name). It is created using the `lambda` keyword.

### Syntax:
```python
lambda arguments: expression
```

### Example:
```python
# Traditional way
def double(x):
    return x * 2

# Lambda way
double_lambda = lambda x: x * 2

print(double(5))        # Output: 10
print(double_lambda(5)) # Output: 10
```
*Note: Lambdas are commonly used as quick callbacks or inside higher-order functions like `map()` and `filter()`.*

---

## 12.10 Recursion

**Recursion** is a programming technique where a function calls itself to solve a smaller version of the same problem.
*   **Base Case:** The condition that stops the recursion from running forever.
*   **Recursive Case:** The part where the function calls itself.

### Factorial Example (`5! = 5 * 4 * 3 * 2 * 1`):
```python
def factorial(n):
    # Base Case: stop when n is 1
    if n == 1:
        return 1
    # Recursive Case
    return n * factorial(n - 1)

print(factorial(5)) # Output: 120
```

---

## 12.11 Practice Exercises

1. **Check Prime:**
   Write a function `is_prime(num)` that returns `True` if a number is prime, and `False` otherwise.
2. **Reverse String via Recursion:**
   Write a recursive function to reverse a string (e.g., `"abc"` becomes `"cba"`).
3. **Keyword Arguments Calculator:**
   Write a function `calculate(**kwargs)` that accepts operations like `add=True` or `multiply=True` along with a list of numbers and performs the math.

---

## 12.12 Placement Q&A (Interview Prep)

**Q1. What is the difference between `*args` and `**kwargs`?**  
**Answer:** `*args` allows a function to accept any number of positional arguments which are received inside a Tuple. `**kwargs` allows passing any number of keyword arguments (named parameters like `name="Sai"`) which are received inside a Dictionary.

**Q2. What is a Lambda function and when should you use it?**  
**Answer:** A Lambda function is a small, single-expression anonymous function. It is defined using the `lambda` keyword and can take any number of arguments but has only one expression. It is best used for short-lived, simple operations, such as passing a sorting key to `list.sort()`.

**Q3. What is the risk of recursive functions in Python?**  
**Answer:** If a recursive function does not have a correct base case, it will call itself infinitely until the maximum call stack depth is exceeded, throwing a `RecursionError` (Stack Overflow).

---

## 12.13 Module 12 Cheat Sheet

* **Definition:** `def func(param): return value`
* **Default Values:** `def greet(name="User"): ...`
* **Scope:** Local variables exist inside the function; Global variables exist outside.
* **args/kwargs:** `*args` collects positional arguments (Tuple); `**kwargs` collects keyword arguments (Dictionary).
* **Lambda:** `lambda x, y: x + y`
* **Recursion:** Function calling itself with a stopping condition (Base Case).

