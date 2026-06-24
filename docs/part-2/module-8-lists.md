---
title: "Module 8: Lists"
sidebar_label: "Module 8: Lists"
---

# Module 8: Lists

In this module, we will learn about **Lists**. A list is one of the most useful data structures in Python. It allows you to store multiple items in a single variable.

---

## 8.1 Introduction to Lists

* A list is created using square brackets (`[ ]`) with items separated by commas.
* Lists can store items of different data types (integers, floats, strings, booleans) together.
* Lists are **Mutable**. This means you can add, remove, or change items in a list after it is created.
* Lists maintain a specific order.

```python
# Creating lists
numbers = [10, 20, 30, 40]
mixed_list = ["Sai", 22, True, 9.8]
empty_list = []
```

---

## 8.2 Accessing List Elements & Indexing

Just like strings, each item in a list has an index starting from **0**.

```python
fruits = ["apple", "banana", "mango", "orange"]

print(fruits[0])  # Output: apple
print(fruits[2])  # Output: mango
print(fruits[-1]) # Output: orange (last item)
```

### Changing values (Mutability):
```python
fruits[1] = "grapes" # Replaces "banana" with "grapes"
print(fruits) # Output: ['apple', 'grapes', 'mango', 'orange']
```

---

## 8.3 List Slicing

You can cut out a section of a list to create a new list:

```python
nums = [10, 20, 30, 40, 50, 60]

print(nums[1:4])  # Output: [20, 30, 40] (from index 1 to 3)
print(nums[:3])   # Output: [10, 20, 30] (first 3 items)
print(nums[3:])   # Output: [40, 50, 60] (from index 3 to end)
print(nums[::-1]) # Output: [60, 50, 40, 30, 20, 10] (reverses the list)
```

---

## 8.4 List Methods

Python has built-in methods to perform operations on lists:

```python
names = ["Sai", "Ram"]

# 1. append() - Adds an item to the end of the list
names.append("Kiran")
print(names) # Output: ['Sai', 'Ram', 'Kiran']

# 2. insert() - Adds an item at a specific index
names.insert(1, "Charan")
print(names) # Output: ['Sai', 'Charan', 'Ram', 'Kiran']

# 3. remove() - Deletes an item by name
names.remove("Ram")
print(names) # Output: ['Sai', 'Charan', 'Kiran']

# 4. pop() - Removes and returns the item at a specific index (removes the last item by default)
removed_item = names.pop(0)
print(removed_item) # Output: Sai
print(names)        # Output: ['Charan', 'Kiran']

# 5. len() - Returns the size (length) of the list
print(len(names)) # Output: 2
```

---

## 8.5 Nested Lists

A list inside another list is called a **Nested List**. This is useful for storing grids, matrices, or tables.

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Accessing number 5 (Row 1, Column 1)
print(matrix[1][1]) # Output: 5

# Accessing number 9 (Row 2, Column 2)
print(matrix[2][2]) # Output: 9
```
:::tip Real-World Analogy
Nested lists are used to represent board games like Tic-Tac-Toe, Chess, or maps in gaming grids!
:::
