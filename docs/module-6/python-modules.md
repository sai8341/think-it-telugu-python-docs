---
sidebar_position: 3
title: "21 — Modules & Standard Library"
---

# Chapter 21: Modules & Exception Handling

A robust application must be organized and resilient to failures. This chapter covers importing standard library modules, managing external packages via pip, and implementing structured exception handling (`try-except`) to gracefully recover from runtime errors.

---

## 1. Importing Python Modules 

Modules are files containing pre-written Python code (functions, variables, classes) that you can reuse in your projects.

> **Real-World Analogy: The Carpenter's Toolbox:** Instead of manufacturing your own screws and saws, you buy a ready-made toolbox from a hardware store. Similarly, Python modules like `math` (for mathematical calculations) or `datetime` (for working with time) are ready-made toolboxes that you can import and use instantly.

### Common Import Syntax
```python
# Method 1: Importing the entire module
import math
print(math.sqrt(16))  # Output: 4.0

# Method 2: Importing specific items directly (no module prefix needed)
from math import sqrt, pi
print(sqrt(9))  # Output: 3.0

# Method 3: Importing with an alias (for shorter names)
import datetime as dt
print(dt.datetime.now())
```

---

## 2. Managing Packages with `pip` 

While Python comes with a rich standard library, the developer community publishes thousands of open-source libraries to the **Python Package Index (PyPI)**. We use the tool `pip` to manage these packages.

```bash
# Installing requests library for web APIs
pip install requests
```

```python
import requests

# Making an HTTP GET request to check a web API status
response = requests.get("https://api.github.com")
print(response.status_code)  # Output: 200 (OK)
```

---

## 3. Exception Handling: Preventing Crashes ️

No matter how good your code is, errors will happen at runtime: a user might type a word instead of a number, a file you want to read might be deleted, or an external API might go offline. If these errors are not handled, your program will crash.

> We use **`try-except` blocks** to catch exceptions and handle them gracefully, preventing the entire application from crashing.

```python
try:
    # Code that might raise an exception
    numerator = 10
    denominator = int(input("Enter divisor: "))
    result = numerator / denominator
    print(f"Result: {result}")
except ZeroDivisionError:
    # Executes only if division by zero occurs
    print(" Error: You cannot divide a number by zero!")
except ValueError:
    # Executes only if type conversion fails
    print(" Error: Please enter a valid integer numeric value!")
```

---

## 4. Graceful Recovery Patterns 

In production systems, exception handling is used to execute **fallback logic** when a critical service fails.

### Example: API Failure Fallback
Imagine an application that fetches live weather data from an external API. If the user's internet is down or the weather API crashes, we don't want the user's dashboard to crash. Instead, we catch the network error and fall back to loading local cache or mock data.

```python
import json
import requests

LIVE_API_URL = "https://api.weather.com/v1/current"

def get_dashboard_data():
    try:
        print(" Attempting to fetch live weather data...")
        # Simulating API request (raising connection error for demo)
        response = requests.get(LIVE_API_URL, timeout=3)
        response.raise_for_status()
        return response.json()
    except (requests.RequestException, Exception) as e:
        print(f"️ Live API failed: {e}")
        print(" Recovering gracefully: Loading offline mock backup data...")
        
        # Graceful fallback: load mock backup database locally
        offline_backup = {
            "temperature": "28°C",
            "condition": "Partly Cloudy (Offline Mode)",
            "source": "Local Backup Cache"
        }
        return offline_backup

data = get_dashboard_data()
print(f"Weather Report: {data['temperature']} - {data['condition']}")
```

---

## Placement & Interview Focus 

*   **Question:** What is the difference between Syntax Errors and Exceptions?
*   **Answer:** Syntax Errors occur when Python's parsing stage detects incorrect grammar rules in the code (like a missing parenthesis). The program will not run at all. Exceptions are runtime errors that occur during code execution (like `ZeroDivisionError` or `FileNotFoundError`), even though the code's syntax is perfectly valid. Exceptions can be caught and handled, whereas syntax errors must be fixed in the code.
*   **Question:** Explain the purpose of the `finally` block in a `try-except` structure.
*   **Answer:** The `finally` block is optional and is guaranteed to execute after the `try` and `except` blocks run, regardless of whether an exception was raised or caught. It is typically used to perform cleanup actions, such as closing database connections, closing network sockets, or releasing file handlers.
