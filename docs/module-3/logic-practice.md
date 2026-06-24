---
sidebar_position: 3
title: "11 — Hands-on Logic Practice"
---

# Chapter 11: Hands-on Logic Practice

This chapter covers key logical coding problems frequently asked in placement exams and technical interviews. We will walk through calculating factorials, testing prime numbers, reversing strings, and building a complete number guessing game using control flow.

---

## 1. Factorial of a Number (Iterative Approach) 

The factorial of a non-negative integer N (written as N!) is the product of all positive integers less than or equal to N. For example, 5! = 1 * 2 * 3 * 4 * 5 = 120.

> **Logic:** We initialize an accumulator variable `factorial = 1` and loop from 1 to N, multiplying our accumulator by the current loop index at each step.

```python
# Read input
n = int(input("Enter a positive number: "))

# Initialize accumulator
factorial = 1

# Loop starts at 1 and goes up to n (inclusive)
for i in range(1, n + 1):
    factorial *= i

print(f"{n}! = {factorial}")
```

---

## 2. Optimized Prime Number Tester 

A prime number is a number greater than 1 that is divisible only by 1 and itself (e.g., 2, 3, 5, 7, 11).

> **Optimized Logic:** Instead of checking divisibility up to N-1, we only need to test divisors up to the square root of N. If a number has a factor larger than its square root, it must also have a matching factor smaller than its square root.

```python
num = int(input("Enter number to check: "))

if num < 2:
    print(f"{num} is NOT a prime number.")
else:
    is_prime = True
    
    # Check divisors from 2 up to the square root of num (inclusive)
    limit = int(num ** 0.5) + 1
    for i in range(2, limit):
        if num % i == 0:
            is_prime = False
            break  # Exit early if a divisor is found
            
    if is_prime:
        print(f"{num} is a PRIME number!")
    else:
        print(f"{num} is a composite number (divisible by {i}).")
```

---

## 3. String Reversal & Palindrome Checker 

A palindrome is a string that reads the same backward as forward (e.g., "radar", "madam").

> **Logic:** We can reverse a string using two distinct methods: a custom index traversal loop (to show how string building works) and Python's fast slicing notation.

```python
text = input("Enter a string: ").lower()

# Method 1: Using an indexing loop
reversed_text = ""
for i in range(len(text) - 1, -1, -1):
    reversed_text += text[i]

# Method 2: The fast Pythonic slice way
# reversed_text = text[::-1]

print(f"Reversed: {reversed_text}")

if text == reversed_text:
    print("Yes! It is a Palindrome.")
else:
    print("No, it is not a palindrome.")
```

---

## 4. Number Guessing Game 

Let's combine loops, random number generation, input conversion, and conditional statements into a complete console application.

> **Logic:** The computer generates a secret number between 1 and 100. The user has 7 attempts to guess it. With each guess, the computer provides feedback ("Too High" or "Too Low"). A `while` loop controls the attempts, and a loop-else block handles the failure state.

```python
import random

# Generate a secret number between 1 and 100
secret_number = random.randint(1, 100)
attempts = 0
max_attempts = 7

print("I am thinking of a number between 1 and 100.")
print(f"Can you guess it within {max_attempts} attempts?\n")

while attempts < max_attempts:
    attempts += 1
    guess = int(input(f"Attempt {attempts}/{max_attempts} - Enter guess: "))
    
    if guess == secret_number:
        print(f" Correct! You guessed it in {attempts} attempts!")
        break
    elif guess < secret_number:
        print("Too LOW! Try a higher number.")
    else:
        print("Too HIGH! Try a lower number.")
else:
    # This runs only if the loop finishes without hitting the 'break'
    print(f"\nGame Over! The correct number was {secret_number}.")
```

---

## Placement & Interview Focus 

*   **Question:** Why do we check only up to the square root of N when testing if a number N is prime?
*   **Answer:** If N is divisible by some integer a, then N = a * b. If both a and b were greater than the square root of N, then a * b would be greater than N, which is a contradiction. Therefore, at least one of the factors must be less than or equal to the square root of N. Searching past the square root of N is redundant and reduces algorithm efficiency from O(N) to O(sqrt(N)).
*   **Question:** What is the time complexity of reversing a string of length L in Python using `[::-1]` slicing?
*   **Answer:** The complexity is O(L) because it must copy each character of the string to a new memory object. Because Python strings are immutable, any reversal operation creates a brand new string in memory.
