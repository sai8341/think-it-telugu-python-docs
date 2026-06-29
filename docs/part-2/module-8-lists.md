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

Python provides built-in methods to easily add, remove, organize, and search items inside a list. Here are the most essential list methods:

### 1. append()
Adds a single new item to the very end of the list.
* **Syntax:** `list.append(item)`
```python
names = ["Sai", "Ram"]
names.append("Kiran")
print(names)
# Output: ['Sai', 'Ram', 'Kiran']
```
* **Real-World Use Case:** Adding a new product to a user's shopping cart.

### 2. extend()
Adds all items from another list to the end of the current list.
* **Syntax:** `list.extend(another_list)`
```python
team1 = ["Sai", "Ram"]
team2 = ["Charan", "Kiran"]
team1.extend(team2)
print(team1)
# Output: ['Sai', 'Ram', 'Charan', 'Kiran']
```

### 3. insert()
Adds an item at a specific index position inside the list.
* **Syntax:** `list.insert(index, item)`
```python
fruits = ["apple", "mango"]
fruits.insert(1, "banana") # Inserts at index 1
print(fruits)
# Output: ['apple', 'banana', 'mango']
```

### 4. remove()
Deletes the first occurrence of a specific item by its value.
* **Syntax:** `list.remove(item)`
```python
colors = ["red", "blue", "red", "green"]
colors.remove("red") # Removes only the first 'red'
print(colors)
# Output: ['blue', 'red', 'green']
```

### 5. pop()
Removes and returns the item at a specific index position. If no index is given, it removes the very last item.
* **Syntax:** `list.pop(index)`
```python
tasks = ["Coding", "Reading", "Sleeping"]
completed = tasks.pop() # Removes the last item
print("Done:", completed) # Output: Done: Sleeping
print("Remaining:", tasks) # Output: ['Coding', 'Reading']
```

### 6. clear()
Empties the entire list, removing all items.
* **Syntax:** `list.clear()`
```python
cart = ["Shoes", "Watch"]
cart.clear()
print(cart) # Output: []
```

### 7. index()
Searches for an item and returns its index position.
* **Syntax:** `list.index(item)`
```python
vowels = ['a', 'e', 'i', 'o', 'u']
print(vowels.index('o')) # Output: 3
```

### 8. count()
Counts how many times a specific item appears inside the list.
* **Syntax:** `list.count(item)`
```python
scores = [10, 20, 10, 30, 10]
print(scores.count(10)) # Output: 3
```

### 9. sort()
Sorts the items of the list in alphabetical or numerical order directly (changes the original list).
* **Syntax:** `list.sort()`
```python
numbers = [40, 10, 30, 20]
numbers.sort()
print(numbers) # Output: [10, 20, 30, 40]
```
* **Real-World Use Case:** Sorting customer orders from lowest price to highest price.

### 10. sorted()
A built-in function that returns a **new** sorted list without modifying the original list.
* **Syntax:** `sorted(list)`
```python
original = [3, 1, 2]
new_sorted = sorted(original)
print("Original:", original)     # Output: [3, 1, 2]
print("New Sorted:", new_sorted) # Output: [1, 2, 3]
```

### 11. reverse()
Reverses the order of the items in the list directly.
* **Syntax:** `list.reverse()`
```python
letters = ['A', 'B', 'C']
letters.reverse()
print(letters) # Output: ['C', 'B', 'A']
```

### 12. copy()
Creates a separate independent copy of the list.
* **Syntax:** `list.copy()`
```python
list1 = ["Apple", "Mango"]
list2 = list1.copy()
list2.append("Banana")

print("List 1:", list1) # Output: ['Apple', 'Mango'] (Unchanged!)
print("List 2:", list2) # Output: ['Apple', 'Mango', 'Banana']
```
* **Real-World Use Case:** Creating a backup of data before making modifications to it.

### 13. len()
A built-in function that returns the total number of items inside the list.
* **Syntax:** `len(list)`
```python
items = ["Pen", "Book", "Laptop"]
print(len(items)) # Output: 3
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

---

## 8.6 List Comprehensions

**List Comprehension** is a concise, "Pythonic" way to create new lists based on existing sequences or loops. It allows you to write loops in a single line!

### Syntax:
```python
new_list = [expression for item in iterable if condition]
```

### Traditional Loop vs. List Comprehension:
```python
# Traditional Loop (5 lines)
squares = []
for x in range(1, 6):
    squares.append(x ** 2)
print(squares) # Output: [1, 4, 9, 16, 25]

# List Comprehension (1 line!)
squares_short = [x ** 2 for x in range(1, 6)]
print(squares_short) # Output: [1, 4, 9, 16, 25]
```

### List Comprehension with Condition (Filter):
```python
# Extract even numbers
nums = [1, 2, 3, 4, 5, 6]
evens = [x for x in nums if x % 2 == 0]
print(evens) # Output: [2, 4, 6]
```

---

## 8.7 Mutability Referencing & Copying Quirks

Since lists are **Mutable** (modifiable), when you assign a list to a new variable, Python does **not** create a new list. It simply creates a reference (link) to the same memory location!

```python
list_a = [1, 2, 3]
list_b = list_a # B points to the exact same list in memory!

list_b.append(4)

print("List A:", list_a) # Output: [1, 2, 3, 4] (A changed too!)
print("List B:", list_b) # Output: [1, 2, 3, 4]
```

### How to create an independent copy:
To avoid this side effect, always use the `.copy()` method or slicing `[:]`:
```python
list_a = [1, 2, 3]
list_c = list_a.copy() # Creates a separate, independent copy

list_c.append(4)

print("List A:", list_a) # Output: [1, 2, 3] (Remains unchanged!)
print("List C:", list_c) # Output: [1, 2, 3, 4]
```

---

## 8.8 Practice Exercises

1. **Find Duplicates:**
   Write a program that takes a list of numbers with duplicates and prints a new list containing only the unique numbers.
2. **Matrix Row Sum:**
   Write a program that calculates the sum of each row in a nested list matrix `[[1, 2], [3, 4]]`.
3. **List filter:**
   Create a list of numbers from 1 to 20. Use list comprehension to create a list of numbers divisible by 3.

---

## 8.9 Placement Q&A (Interview Prep)

**Q1. What is the difference between `list.append()` and `list.extend()`?**  
**Answer:** `append()` adds its argument as a single element at the end of the list (e.g., `[1, 2].append([3, 4])` results in `[1, 2, [3, 4]]`). `extend()` iterates over its argument and adds each item, merging the sequences (e.g., `[1, 2].extend([3, 4])` results in `[1, 2, 3, 4]`).

**Q2. Explain the mutability of lists and how it affects memory assignment.**  
**Answer:** Lists in Python are mutable, meaning their values can be modified in place. When a list is assigned to another variable (e.g., `B = A`), both variables reference the same memory object. Modifying the list through one variable affects the other. To avoid this, an explicit copy must be created using `A.copy()` or `A[:]`.

**Q3. What is the output of `[x for x in range(5) if x % 2 != 0]`?**  
**Answer:** `[1, 3]`. This list comprehension filters odd numbers from 0 to 4.

---

## 8.10 Module 8 Cheat Sheet

* **Creation:** `my_list = [1, "two", 3.0]`
* **Mutability:** Elements can be accessed and modified via indexing (e.g., `my_list[0] = 10`).
* **Slicing:** `list[start:stop:step]` (stop is exclusive).
* **Key Methods:** `append()`, `insert()`, `remove()`, `pop()`, `sort()`, `copy()`, `len()`.
* **List Comprehension:** `[expression for item in iterable if condition]`.

