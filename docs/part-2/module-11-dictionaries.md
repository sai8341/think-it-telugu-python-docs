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
* **Valid Key Types:** Keys must be immutable data types like Strings, Numbers, or Tuples. Lists and dictionaries cannot be used as keys!
* Dictionaries are **Mutable** (you can change values or add new pairs after creation).
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

## 11.3 Dictionary Methods & Operations

Python provides built-in methods and syntax to manage dictionary data easily:

### Adding vs. Updating Items
If you assign a value to a key that **already exists**, Python updates its value. If the key **does not exist**, Python adds it as a new pair.
```python
student = {"name": "Sai", "age": 22}

# Updating an existing key
student["age"] = 23

# Adding a new key
student["city"] = "Hyderabad"

print(student)
# Output: {'name': 'Sai', 'age': 23, 'city': 'Hyderabad'}
```

### 1. keys()
Returns a view of all the keys present inside the dictionary.
* **Syntax:** `dict.keys()`
```python
user = {"name": "Ram", "role": "Admin"}
print(user.keys()) # Output: dict_keys(['name', 'role'])
```

### 2. values()
Returns a view of all the values stored inside the dictionary.
* **Syntax:** `dict.values()`
```python
user = {"name": "Ram", "role": "Admin"}
print(user.values()) # Output: dict_values(['Ram', 'Admin'])
```

### 3. items()
Returns all key-value pairs as tuples inside a list-like view.
* **Syntax:** `dict.items()`
```python
user = {"name": "Ram", "role": "Admin"}
print(user.items()) 
# Output: dict_items([('name', 'Ram'), ('role', 'Admin')])
```

### 4. update()
Merges another dictionary (or key-value pairs) into the current dictionary.
* **Syntax:** `dict.update(new_dict)`
```python
profile = {"name": "Kiran"}
extra_info = {"age": 25, "country": "India"}
profile.update(extra_info)
print(profile)
# Output: {'name': 'Kiran', 'age': 25, 'country': 'India'}
```

### 5. pop()
Removes the specified key and returns its associated value.
* **Syntax:** `dict.pop(key)`
```python
cart = {"item": "Laptop", "price": 50000}
removed_price = cart.pop("price")
print("Removed:", removed_price) # Output: Removed: 50000
print("Cart:", cart)             # Output: {'item': 'Laptop'}
```

### 6. copy()
Creates a separate independent duplicate of the dictionary.
* **Syntax:** `dict.copy()`
```python
original = {"brand": "Apple", "model": "iPhone"}
backup = original.copy()
print(backup) # Output: {'brand': 'Apple', 'model': 'iPhone'}
```

### Dictionary Iteration (Looping)
You can easily loop through a dictionary using a `for` loop:
```python
scores = {"Maths": 90, "Science": 85}

# Looping through both keys and values using .items()
for subject, marks in scores.items():
    print(f"{subject}: {marks}")
# Output:
# Maths: 90
# Science: 85
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

---

## 11.6 Dictionary vs List (Key Differences)

| Feature | List | Dictionary |
| :--- | :--- | :--- |
| **Syntax** | Uses square brackets `[ ]`. | Uses curly braces `{key: value}`. |
| **Accessing Data** | Accessed via numeric index (`list[0]`). | Accessed via unique keys (`dict["name"]`). |
| **Order** | Ordered sequence of items. | Key-value mapping. |
| **Use Case** | Storing a simple collection of items (e.g., list of fruit names). | Storing structured labeled data (e.g., user profile details). |
