---
title: "Module 7: Strings"
sidebar_label: "Module 7: Strings"
---

# Module 7: Strings

In this module, we will learn how to work with text (called **Strings**) in Python, how to access parts of a string, and how to use common string methods.

---

## 7.1 What is a String?

A **String** is a sequence of characters wrapped in single quotes (`'...'`) or double quotes (`"..."`).

```python
channel = "Think IT Telugu"
greeting = 'Hello'
```

---

## 7.2 String Indexing

Every character in a string has a position number, which is called its **Index**. In Python, indexing starts at **0** from the left.

### Example ($s = \text{"PYTHON"}$):

| Character | P | Y | T | H | O | N |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Positive Index** | `0` | `1` | `2` | `3` | `4` | `5` |
| **Negative Index** | `-6` | `-5` | `-4` | `-3` | `-2` | `-1` |

```python
s = "PYTHON"
print(s[0])  # Output: P (first character)
print(s[5])  # Output: N (last character)
print(s[-1]) # Output: N (first character from the end)
print(s[-2]) # Output: O (second character from the end)
```

---

## 7.3 String Slicing

Cutting out a part of a string (a substring) is called **Slicing**.

### Syntax:
```python
string[start_index : stop_index : step]
```
*Note: Slicing stops just before the `stop_index`. The character at the `stop_index` is not included.*

```python
s = "PythonCourse"

# Get characters from index 0 to 5
print(s[0:6]) # Output: Python

# Get characters from index 6 to the end
print(s[6:])  # Output: Course

# Get every 2nd character (step = 2)
print(s[0:6:2]) # Output: Pto

# Reverse the entire string (very useful)
print(s[::-1]) # Output: esruoCNohtyp
```

---

## 7.4 Common String Methods

Python provides built-in methods to manipulate strings easily. Here are the most important string methods every beginner must know:

### 1. upper()
Converts all characters in a string to uppercase letters.
* **Syntax:** `string.upper()`
```python
text = "hello python"
print(text.upper())
# Output: HELLO PYTHON
```
* **Real-World Use Case:** Standardizing user input (like coupon codes or PAN card numbers) to uppercase.

### 2. lower()
Converts all characters in a string to lowercase letters.
* **Syntax:** `string.lower()`
```python
text = "WELCOME"
print(text.lower())
# Output: welcome
```
* **Real-World Use Case:** Converting email addresses to lowercase before checking them in a database.

### 3. title()
Capitalizes the first letter of every word in the string.
* **Syntax:** `string.title()`
```python
name = "sai kumar"
print(name.title())
# Output: Sai Kumar
```
* **Real-World Use Case:** Formatting user names nicely on profile pages.

### 4. capitalize()
Capitalizes only the very first letter of the entire string.
* **Syntax:** `string.capitalize()`
```python
msg = "python is easy"
print(msg.capitalize())
# Output: Python is easy
```

### 5. strip()
Removes extra spaces from the beginning and the end of a string.
* **Syntax:** `string.strip()`
```python
user_input = "   Think IT Telugu   "
print(user_input.strip())
# Output: Think IT Telugu
```
* **Real-World Use Case:** Cleaning up accidental extra spaces typed by users in form inputs.

### 6. replace()
Replaces a specific phrase or word with another word inside the string.
* **Syntax:** `string.replace(old_text, new_text)`
```python
sentence = "I love Java"
print(sentence.replace("Java", "Python"))
# Output: I love Python
```

### 7. split()
Splits a string into a list of smaller strings based on a separator (like a space or comma).
* **Syntax:** `string.split(separator)`
```python
msg = "Python is fun"
words = msg.split(" ")
print(words)
# Output: ['Python', 'is', 'fun']
```
* **Real-World Use Case:** Splitting a comma-separated list of tags into individual keywords.

### 8. join()
Combines a list of strings into one single string, using a specific separator between them.
* **Syntax:** `separator.join(list_of_strings)`
```python
words = ['Python', 'is', 'fun']
sentence = " ".join(words)
print(sentence)
# Output: Python is fun
```

### 9. find()
Searches for a word inside a string and returns the index position where it starts. If it is not found, it returns `-1`.
* **Syntax:** `string.find(search_text)`
```python
text = "Learn Python Coding"
print(text.find("Python")) # Output: 6
print(text.find("Java"))   # Output: -1
```

### 10. count()
Counts how many times a specific word or character appears inside the string.
* **Syntax:** `string.count(search_text)`
```python
word = "banana"
print(word.count("a"))
# Output: 3
```

### 11. startswith()
Checks if a string starts with a specific text. Returns `True` or `False`.
* **Syntax:** `string.startswith(check_text)`
```python
url = "https://google.com"
print(url.startswith("https")) # Output: True
```
* **Real-World Use Case:** Verifying if a web address is secure (starts with https).

### 12. endswith()
Checks if a string ends with a specific text. Returns `True` or `False`.
* **Syntax:** `string.endswith(check_text)`
```python
filename = "resume.pdf"
print(filename.endswith(".pdf")) # Output: True
```
* **Real-World Use Case:** Checking uploaded file formats (like ensuring a file ends with `.jpg` or `.pdf`).

---

## 7.5 String Immutability

**Immutable** means "cannot be changed". In Python, strings are immutable. Once you create a string, you cannot modify its characters directly.

```python
s = "Java"
# s[0] = "K" # This will throw a TypeError!
```
To change a string, you must create a new one:
```python
s = "K" + s[1:]
print(s) # Output: Kava
```

---

## 7.6 String Formatting

As we learned in Module 3, the best way to combine text and variables is by using **f-strings**:

```python
topic = "Strings"
status = "Completed"
print(f"Module {topic} is now {status}!")
# Output: Module Strings is now Completed!
```
