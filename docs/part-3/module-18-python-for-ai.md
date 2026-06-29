---
title: "Module 18: Python for AI Foundation"
sidebar_label: "Module 18: Python for AI"
---

# Module 18: Python for AI Foundation

Welcome to the final and most exciting module! Here, we will learn how Python is used to call AI models, fetch data from the web, and what you should learn next.

---

## 18.1 How AI Uses Python

Python is the preferred language for Artificial Intelligence (AI) and Machine Learning (ML) because of two main reasons:

1. **Massive Library Support:** Ready-to-use packages for training models and calling APIs.
2. **Easy Data Processing:** Simple tools to load, clean, and organize large sets of data.

---

## 18.2 What is a Library & API?

* **Library:** A package of code written by others that we can import to perform tasks easily (e.g., fetching web pages).
* **API (Application Programming Interface):** A bridge that allows two different software programs to communicate with each other.
  * *Analogy:* Think of a waiter in a restaurant. You make a request (order) to the waiter, the waiter tells the kitchen, and returns with your response (food). The waiter is the API.

---

## 18.3 The requests Library

To fetch data from a web server or trigger an API, we use the popular **`requests`** library.

### Making a basic request:
```python
import requests

# Fetching user info from Github's public API
response = requests.get("https://api.github.com/users/thinkittelugu")

# Check status code (200 means success)
print("Status:", response.status_code) # Output: 200
```

---

## 18.4 Reading JSON APIs

Web APIs send responses as JSON. We can parse this JSON directly into a Python dictionary:

```python
import requests

response = requests.get("https://api.github.com/users/thinkittelugu")

if response.status_code == 200:
    data = response.json() # Converts JSON text to a Python Dictionary
    print("User Name:", data["name"])
    print("Public Repos:", data["public_repos"])
else:
    print("Failed to fetch data.")
```

---

## 18.5 Calling AI Models

Here is a simple example showing how Python code calls an AI model (like Google Gemini) using its official library:

```python
# To run this, install the Google AI package first:
# pip install google-generativeai

import google.generativeai as genai

# Setup your API key
genai.configure(api_key="YOUR_GEMINI_API_KEY")

# Choose the model
model = genai.GenerativeModel('gemini-1.5-flash')

# Send a prompt to the AI
response = model.generate_content("Explain Python in one sentence.")

print(response.text)
# Output: Python is a popular, easy-to-learn programming language used for web dev, automation, and AI.
```

---

## 18.6 Python Virtual Environments (venv)

When working on professional Python projects, different projects might require different versions of libraries (e.g., Project A needs `requests` v2.20, but Project B needs `requests` v2.30). 
To avoid conflicts, we use **Virtual Environments** (`venv`) to create isolated folders for each project.

### 1. Creating a Virtual Environment:
Open your terminal in your project directory and run:
```bash
# Windows / macOS / Linux
python -m venv myenv
```
*(This creates a folder named `myenv` containing a copy of Python and pip).*

### 2. Activating the Environment:
Before installing packages, you must activate it:
*   **Windows (PowerShell):**
    ```bash
    .\myenv\Scripts\Activate.ps1
    ```
*   **Windows (Command Prompt):**
    ```cmd
    .\myenv\Scripts\activate.bat
    ```
*   **macOS / Linux (Terminal):**
    ```bash
    source myenv/bin/activate
    ```
*(Once activated, you will see `(myenv)` written in front of your terminal command prompt).*

### 3. Deactivating:
To exit the virtual environment and return to global Python, simply type:
```bash
deactivate
```

---

## 18.7 Practice Exercises

1. **Venv Setup Practice:**
   Create a new directory locally, initialize a virtual environment named `venv-test`, activate it, and run `pip list` to verify it is completely empty of external packages.
2. **Local JSON File parsing:**
   Write a Python script that parses a mock JSON string representing a product catalog and prints the name and price of items costing more than $50.

---

## 18.8 Placement Q&A (Interview Prep)

**Q1. What is a Virtual Environment in Python and why is it used?**  
**Answer:** A virtual environment is an isolated directory tree that contains a specific Python installation and a set of additional packages. It is used to prevent dependency conflicts between different Python projects running on the same machine.

**Q2. What is an API and how does Python interact with it?**  
**Answer:** An API (Application Programming Interface) is a software intermediary that allows two applications to talk to each other. Python interacts with APIs by sending HTTP requests (GET, POST, etc.) using libraries like `requests` and parsing the returned JSON data.

**Q3. How do you install third-party packages in Python?**  
**Answer:** Using `pip` (Python package installer) by running `pip install package_name` in the terminal.

---

## 18.9 Module 18 Cheat Sheet

* **Library:** Reusable code package written by others.
* **API:** Bridge for software communication.
* **requests:** `requests.get(url)` to fetch web data; `.json()` to parse JSON response.
* **Virtual Environment:** `python -m venv env_name` (creation); `deactivate` (exit).
* **Next Steps:** NumPy & Pandas (Data Science/AI), FastAPI (Web Backend), Playwright (Automation).

