---
sidebar_position: 1
title: "15 — Lists & Tuples"
---

# Chapter 15: Lists & Tuples

Sequential collections are used to store multiple items in a single variable. This chapter covers two primary sequence types in Python: Lists and Tuples, highlighting the critical concept of mutability vs. immutability.

---

## 1. Lists: Mutable, Ordered Collections 

A **List** is an ordered, changeable collection of items that allows duplicate values.

> **Real-World Analogy: The Shopping List:** A list is like a **grocery shopping list** written on a notepad. As you walk through the store aisles, you can append new items to the bottom, insert an item in the middle, scratch out items you no longer want, or swap one brand of cereal for another. The collection changes dynamically.

```python
# Creating a list of strings
shopping_list = ["Apples", "Bananas", "Milk"]
print(type(shopping_list))  # Output: <class 'list'>

# Modifying lists (CRUD Operations)
shopping_list.append("Coffee")      # Add to end
shopping_list.insert(1, "Bread")    # Insert at index 1
shopping_list[2] = "Almond Milk"    # Update item at index 2
shopping_list.remove("Bananas")     # Remove by value
popped_item = shopping_list.pop()   # Remove and return the last item

print(shopping_list)  # Output: ['Apples', 'Bread', 'Almond Milk']
```

### List Comprehension (One-Line Loops)
Python provides a concise syntax to create and filter lists based on existing iterables:

```python
# Traditional approach
squares = []
for i in range(1, 6):
    squares.append(i ** 2)

# List Comprehension way
squares = [i ** 2 for i in range(1, 6)]
print(squares)  # Output: [1, 4, 9, 16, 25]

# Filtering elements with condition
evens = [x for x in range(1, 11) if x % 2 == 0]
print(evens)  # Output: [2, 4, 6, 8, 10]
```

---

## 2. Tuples: Immutable, Ordered Collections 

A **Tuple** is an ordered, unchangeable collection of items that allows duplicate values. It is defined using parentheses `()`.

> **Real-World Analogy: GPS Coordinates or RGB Colors:** A tuple is like a pair of **GPS Coordinates** (Latitude and Longitude, e.g., `(17.3850, 78.4867)`) or an **RGB Color value** (e.g., `(255, 99, 71)`). If you change the numbers, you are no longer describing the same location or the same color; you are describing an entirely different object. Thus, the collection remains permanent and read-only.

```python
# Creating coordinates tuple
location = (17.3850, 78.4867)

# Accessing values works like lists
print(location[0])  # Output: 17.3850

# Unpacking a tuple
lat, lon = location
print(f"Latitude: {lat}, Longitude: {lon}")
```

---

## 3. The Concept of Mutability & Tuple Assignment Errors ️

The most critical difference between lists and tuples is **mutability**:
*   **Lists are mutable:** You can modify their contents in place without creating a new list.
*   **Tuples are immutable:** Once created, you cannot change, add, or remove their elements.

> If you attempt to update a value inside a tuple, Python will block the operation and throw a runtime error.

```python
# Modifying a list element works fine
user_hobbies = ["Reading", "Gaming"]
user_hobbies[0] = "Coding"  # Valid

# Modifying a tuple element crashes the program
birth_date = (15, "August", 1947)
# birth_date[0] = 16  #  Raises TypeError: 'tuple' object does not support item assignment
```

To create a single-item tuple, you must include a trailing comma (e.g., `single_element = (5,)`). Without the comma, Python will simply treat the parentheses as order-of-operation brackets and assign a plain integer.

---

## Placement & Interview Focus 

*   **Question:** What is the difference between a list and a tuple in Python, and when should you choose one over the other?
*   **Answer:** The primary difference is mutability. Lists are mutable, meaning their size and elements can be changed in place, whereas tuples are immutable. You should choose a tuple when the collection of data is constant and should not be modified during execution (like configuration settings, coordinate pairs, or function return values). Tuples are also slightly faster to iterate over and consume less memory.
*   **Question:** Can a tuple contain a mutable object, and if so, can that object be modified?
*   **Answer:** Yes. While a tuple itself is immutable and its element references cannot be changed, it can contain mutable objects like lists. If a tuple contains a list, you cannot replace the list object with a different list, but you can modify the contents of that list (e.g., appending or removing items).
    ```python
    mixed_tuple = (1, 2, [3, 4])
    mixed_tuple[2].append(5)  #  This is allowed!
    print(mixed_tuple)        # Output: (1, 2, [3, 4, 5])
    ```
