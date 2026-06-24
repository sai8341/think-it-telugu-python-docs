---
sidebar_position: 1
title: "Project 1: CLI Calculator"
---

#  Project 1: CLI Calculator

## Project Overview 

**Difficulty:**  Beginner | **Time:** ~1 hour | **Concepts:** Functions, Loops, Conditionals, Error Handling

> In this project, you will build a full-featured **command-line calculator**. Starting with basic arithmetic, we will add advanced operations and history tracking!

---

## Complete Code 

```python
"""
 Think IT Telugu - CLI Calculator
Capstone Project 1
A full-featured command-line calculator with history
"""

import math

# History tracking
history = []

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        return " Error: Division by zero!"
    return a / b

def power(a, b):
    return a ** b

def modulus(a, b):
    if b == 0:
        return " Error: Division by zero!"
    return a % b

def floor_divide(a, b):
    if b == 0:
        return " Error: Division by zero!"
    return a // b

def square_root(a):
    if a < 0:
        return " Error: Cannot find square root of negative number!"
    return math.sqrt(a)

def factorial(n):
    if n < 0:
        return " Error: Factorial of negative number!"
    if n != int(n):
        return " Error: Factorial only for integers!"
    return math.factorial(int(n))

def save_to_history(expression, result):
    history.append(f"{expression} = {result}")

def show_history():
    if not history:
        print(" No calculations yet!")
        return
    print("\n CALCULATION HISTORY")
    print("-" * 40)
    for i, entry in enumerate(history, 1):
        print(f"  {i}. {entry}")
    print("-" * 40)

def show_menu():
    print("""
╔════════════════════════════════════════╗
║      THINK IT TELUGU CALCULATOR     ║
╠════════════════════════════════════════╣
║  1.  Addition                        ║
║  2.  Subtraction                     ║
║  3. ️  Multiplication                  ║
║  4.  Division                        ║
║  5.  Power (x^y)                    ║
║  6.  Square Root                    ║
║  7.  Factorial                      ║
║  8.  Modulus (%)                    ║
║  9.  Floor Division (//)            ║
║ 10.  History                        ║
║  0.  Exit                           ║
╚════════════════════════════════════════╝
""")

def get_two_numbers():
    """Safely get input for two numbers"""
    try:
        a = float(input("  Enter first number: "))
        b = float(input("  Enter second number: "))
        return a, b
    except ValueError:
        print(" Invalid input! Please enter numbers only.")
        return None, None

def get_one_number():
    """Safely get input for one number"""
    try:
        a = float(input("  Enter number: "))
        return a
    except ValueError:
        print(" Invalid input! Please enter a number.")
        return None

# ===== MAIN PROGRAM =====
def main():
    print("\n Welcome to Think IT Telugu Calculator!")
    print("   Built with Python \n")
    
    while True:
        show_menu()
        choice = input("  Enter your choice (0-10): ").strip()
        
        if choice == "0":
            print("\n Thank you for using our calculator!")
            print("   Keep coding, keep learning! ")
            break
        
        elif choice in ["1", "2", "3", "4", "5", "8", "9"]:
            a, b = get_two_numbers()
            if a is None:
                continue
            
            operations = {
                "1": (add, "+"),
                "2": (subtract, "-"),
                "3": (multiply, "×"),
                "4": (divide, "÷"),
                "5": (power, "^"),
                "8": (modulus, "%"),
                "9": (floor_divide, "//"),
            }
            
            func, symbol = operations[choice]
            result = func(a, b)
            expression = f"{a} {symbol} {b}"
            
            print(f"\n   {expression} = {result}")
            save_to_history(expression, result)
        
        elif choice == "6":
            a = get_one_number()
            if a is None:
                continue
            result = square_root(a)
            expression = f"√{a}"
            print(f"\n   {expression} = {result}")
            save_to_history(expression, result)
        
        elif choice == "7":
            a = get_one_number()
            if a is None:
                continue
            result = factorial(a)
            expression = f"{int(a)}!"
            print(f"\n   {expression} = {result}")
            save_to_history(expression, result)
        
        elif choice == "10":
            show_history()
        
        else:
            print(" Invalid choice! Please enter 0-10.")
        
        input("\n  Press Enter to continue...")

if __name__ == "__main__":
    main()
```

---

## Concepts Used 

| Concept | Where Used |
|---------|-----------|
| **Functions** | Each operation is a separate function |
| **Dictionaries** | Operation mapping |
| **Loops** | Main menu loop |
| **Conditionals** | Choice handling, error checking |
| **Error Handling** | try-except for invalid input |
| **Lists** | History tracking |
| **f-strings** | Formatted output |
| **Modules** | `math` module for sqrt, factorial |

---

## Enhancement Ideas 

- **Add an Expression Parser**: Parse complex expressions directly (e.g., `"2 + 3 * 4"`).
- **Save History to File**: Write the calculation history to a text file so it persists after exit.
- **Implement Memory Functions**: Add standard calculator memory options (like `M+`, `M-`, `MR`).
- **Include Unit Conversions**: Add options to convert weight, length, or temperature.

---

**Next Project:** [Student Management System →](./student-management-system)
