---
sidebar_position: 2
title: "16 — Dictionaries & Sets"
---

# Chapter 16: Dictionaries & Sets

Python provides associative and unique collections that do not preserve index positions but offer extremely fast data lookups. This chapter covers Dictionaries (key-value maps) and Sets (unique collections), focusing on their API integrations and data deduplication capabilities.

---

## 1. Dictionaries: Key-Value Pairs ️

A **Dictionary** is an unordered collection of key-value pairs. Keys must be unique and immutable (like strings, numbers, or tuples), while values can be of any data type.

> **Real-World Analogy: The Phone Book:** A dictionary is like a **phone directory**. The contact name is the **Key**, and the phone number is the **Value**. You search for a phone number by looking up the name. It is extremely fast to find a number if you know the name, but searching by phone number is slow and inefficient.

### The JSON & API Connection
In modern software engineering, dictionaries are incredibly important because they match the exact structure of **JSON (JavaScript Object Notation)** payloads. This is how web APIs, database records, and AI models (like OpenAI's GPT or Google Gemini outputs) send and receive data.

```python
# Creating a dictionary resembling an API JSON response
user_profile = {
    "username": "coder_ravi",
    "email": "ravi@gmail.com",
    "skills": ["Python", "C++", "SQL"],
    "status": {"verified": True, "active_days": 15}
}

# Accessing dictionary elements
print(user_profile["username"])  # Output: coder_ravi

# Safely accessing keys using .get() (prevents crashes by returning a default value)
print(user_profile.get("phone", "Not Provided"))  # Output: Not Provided
```

### CRUD Operations
```python
profile = {"name": "Ravi", "age": 21}

# Create / Update
profile["branch"] = "CSE"   # Create new key
profile["age"] = 22         # Update existing key

# Delete operations
del profile["branch"]       # Deletes key "branch"
age = profile.pop("age")    # Removes and returns value of "age"
```

---

## 2. Sets: Unique, Unordered Collections 

A **Set** is an unordered collection of unique elements. Sets do not allow duplicate values and do not support indexing.

> **Real-World Analogy: Aadhaar or SSN Registry:** A set is like a **national identification database**. You cannot have duplicate records. Every identification number must be unique. If you try to add an existing number, the registry simply ignores it.

```python
# Creating a set (duplicates are discarded automatically)
roll_numbers = {101, 102, 103, 101, 102}
print(roll_numbers)  # Output: {101, 102, 103}
```

### deduplication of List Data
Sets are incredibly useful for removing duplicates from sequential data in a single step:

```python
raw_emails = ["a@b.com", "c@d.com", "a@b.com", "x@y.com"]

# Deduplicate by casting to a set, then cast back to a list
clean_emails = list(set(raw_emails))
print(clean_emails)  # Output: ['c@d.com', 'x@y.com', 'a@b.com'] (order may vary)
```

### Mathematical Set Operations
Sets support standard mathematical operations, which are highly optimized at the C level in Python:

```python
frontend_devs = {"Ravi", "Priya", "Kiran"}
backend_devs = {"Kiran", "Amit", "Suresh"}

# 1. Union (All unique developers)
print(frontend_devs | backend_devs)  # Output: {'Ravi', 'Priya', 'Kiran', 'Amit', 'Suresh'}

# 2. Intersection (Developers who know both)
print(frontend_devs & backend_devs)  # Output: {'Kiran'}

# 3. Difference (Frontend devs who do not do backend)
print(frontend_devs - backend_devs)  # Output: {'Ravi', 'Priya'}
```

---

## Placement & Interview Focus 

*   **Question:** What is the average time complexity of looking up a key in a Python dictionary or checking membership in a set? Why is it different from a list?
*   **Answer:** The average time complexity is O(1) (constant time). This is because dictionaries and sets use a data structure called a **hash table**. Python runs the key through a hash function to compute a specific memory index, allowing direct access. In contrast, checking membership in a list requires traversing the elements one-by-one, resulting in a time complexity of O(N) (linear time).
*   **Question:** Why can't a list be used as a dictionary key, but a tuple can?
*   **Answer:** Dictionary keys must be **hashable** and **immutable**. If a key's value could change (like a mutable list), its hash value would also change, making it impossible for Python to locate the corresponding value in the hash table. Since lists are mutable, they are unhashable and raise a `TypeError`. Since tuples are immutable, they are hashable and can be safely used as keys.
