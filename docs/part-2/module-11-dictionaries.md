---
title: "Module 11: Dictionaries"
sidebar_label: "Module 11: Dictionaries"
---

# Module 11: Dictionaries

In this module, we will learn about **Dictionaries**. A dictionary stores data in **Key-Value Pairs** (like a phonebook where name is the Key and phone number is the Value).

---

## 11.1 Introduction to Dictionaries

* A dictionary is created using curly braces `{ }` with `key: value` pairs separated by commas.
* **Keys must be unique** (you cannot have duplicate keys).
* Dictionaries are **Mutable** (you can change values after creation).
* We access values using their corresponding keys instead of index numbers.

```python
# Creating a dictionary
student = {
    "name": "Sai Kumar",
    "age": 22,
    "course": "Python",
    "is_certified": True
}
```

---

## 11.2 Accessing Data

There are two ways to retrieve values from a dictionary:

### 1. Using Square Brackets:
```python
print(student["name"]) # Output: Sai Kumar
# print(student["marks"]) # If the key does not exist, this throws a KeyError!
```

### 2. Using the get() Method (Safe Way):
```python
# Returns "None" instead of throwing an error if the key is missing
print(student.get("marks")) # Output: None

# You can specify a default value to return if the key is missing
print(student.get("marks", 0)) # Output: 0
```

---

## 11.3 Dictionary Methods

Common methods used to update and delete data in a dictionary:

```python
# 1. Updating a value or adding a new key-value pair
student["age"] = 23 # Updates existing value
student["location"] = "Hyderabad" # Adds a new key-value pair
print(student)

# 2. keys() - Returns a list of all keys in the dictionary
print(student.keys()) 

# 3. values() - Returns a list of all values in the dictionary
print(student.values())

# 4. items() - Returns key-value pairs as a list of tuples
print(student.items())

# 5. pop() - Removes a specific key and its value
student.pop("is_certified")
```

---

## 11.4 Nested Dictionaries

A dictionary inside another dictionary is called a **Nested Dictionary**. This is used to store complex data.

```python
users = {
    "user1": {
        "name": "Sai",
        "role": "Admin"
    },
    "user2": {
        "name": "Ram",
        "role": "Editor"
    }
}

# Accessing Ram's role
print(users["user2"]["role"]) # Output: Editor
```

---

## 11.5 JSON Thinking (Crucial for AI)

When working with APIs, web services, or Artificial Intelligence (AI) models, data is sent and received in a format called **JSON (JavaScript Object Notation)**.

Python **Dictionaries** look and work almost exactly like **JSON**. Learning dictionaries helps you handle data easily when working with AI.

### AI API Response Example:
An AI model (like Gemini or GPT) sends responses in a JSON structure that looks like this:
```python
ai_response = {
    "model": "gemini-1.5-flash",
    "choices": [
        {
            "message": {
                "role": "assistant",
                "content": "Python is a high-level programming language."
            }
        }
    ],
    "usage": {
        "total_tokens": 150
    }
}

# How to extract the AI's answer:
result = ai_response["choices"][0]["message"]["content"]
print(result) 
# Output: Python is a high-level programming language.
```
Handling dictionaries is a key skill for building AI applications!
