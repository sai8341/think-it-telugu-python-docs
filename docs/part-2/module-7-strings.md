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

Python provides several built-in methods to manipulate strings:

```python
s = " Think IT Telugu "

print(s.upper())      # Output: " THINK IT TELUGU " (converts to uppercase)
print(s.lower())      # Output: " think it telugu " (converts to lowercase)
print(s.strip())      # Output: "Think IT Telugu" (removes spaces from start and end)
print(s.replace("Telugu", "Coding")) # Output: " Think IT Coding " (replaces text)

# Splitting a string into a list of words
msg = "Python is fun"
words = msg.split(" ")
print(words) # Output: ['Python', 'is', 'fun']
```

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
