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

## 18.6 Next Steps in Your Learning Journey

Congratulations! You have completed the foundational Python course. Here is what you can learn next depending on your goals:

1. **AI & Machine Learning Path:**
   * **NumPy:** For handling matrices and math calculations.
   * **Pandas:** For loading and cleaning tabular data (Excel sheets, CSVs).
   * **Scikit-Learn:** For training your first machine learning models.
2. **AI Agents & Automation:**
   * **CrewAI / LangChain:** For building autonomous AI agents.
   * **Playwright:** For automating browser tasks.
3. **Web Development:**
   * **FastAPI:** For building your own APIs and backend servers.

:::tip Congratulations!
You have successfully built a strong Python foundation. Remember the golden rule: **"Don't just read code, write it!"** Keep practicing!
:::
