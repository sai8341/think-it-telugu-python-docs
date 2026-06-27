---
title: "Module 10: Sets"
sidebar_label: "Module 10: Sets"
---

# Module 10: Sets

In this module, we will learn about **Sets**. Sets are used to store multiple unique values in a single variable.

---

## 10.1 Introduction to Sets

* A set is created using curly braces (`{ }`) with items separated by commas.
* Sets are **Unordered**, meaning the items do not have a defined order.
* Sets **do not allow duplicate values**. If you add a duplicate item, the set will automatically remove it.
* Sets do not support indexing. You cannot access items using index numbers like `set[0]`.
* Sets are **Mutable**, meaning you can add or remove items after creating the set.

```python
# Creating a set
unique_numbers = {1, 2, 3, 4, 4, 3, 2}
print(unique_numbers) 
# Output: {1, 2, 3, 4} (Duplicates are automatically removed)

# Empty Set Gotcha:
wrong_empty = {}    # This creates an empty DICTIONARY, not a set!
correct_empty = set() # You MUST use set() to create an empty set
print(type(wrong_empty))   # Output: <class 'dict'>
print(type(correct_empty)) # Output: <class 'set'>
```

---

## 10.2 Set Methods

Python provides built-in methods to add, update, and remove items from a set:

### 1. add()
Adds a single new item to the set. If the item already exists, the set remains unchanged.
* **Syntax:** `set.add(item)`
```python
skills = {"Python", "Git"}
skills.add("SQL")
print(skills) # Output: {'Python', 'Git', 'SQL'} (Order may vary)
```

### 2. update()
Adds multiple items (from a list, tuple, or another set) into the current set all at once.
* **Syntax:** `set.update(multiple_items)`
```python
skills = {"Python"}
skills.update(["Java", "SQL", "Git"])
print(skills) # Output: {'Python', 'Java', 'SQL', 'Git'}
```

### 3. remove()
Deletes a specific item from the set. If the item does not exist, it throws a `KeyError`.
* **Syntax:** `set.remove(item)`
```python
colors = {"red", "blue", "green"}
colors.remove("blue")
print(colors) # Output: {'red', 'green'}
```

### 4. discard()
Safely deletes a specific item from the set. If the item does not exist, it does **not** throw an error.
* **Syntax:** `set.discard(item)`
```python
colors = {"red", "green"}
colors.discard("yellow") # "yellow" is missing, but no error happens!
print(colors) # Output: {'red', 'green'}
```
* **Real-World Use Case:** Safely removing a user session when logging out without worrying if it was already deleted.

### 5. pop()
Removes and returns a random item from the set (since sets are unordered, you cannot choose which item gets removed).
* **Syntax:** `set.pop()`
```python
items = {"Apple", "Mango", "Banana"}
removed = items.pop()
print("Removed:", removed)
```

### 6. clear()
Empties the entire set, removing all items.
* **Syntax:** `set.clear()`
```python
numbers = {1, 2, 3}
numbers.clear()
print(numbers) # Output: set()
```

---

## 10.3 Union

A **Union** combines all items from two sets into a single set. We use the `|` symbol or the `.union()` method:

```python
set_a = {1, 2, 3}
set_b = {3, 4, 5}

union_result = set_a | set_b
print(union_result) # Output: {1, 2, 3, 4, 5}
```

---

## 10.4 Intersection

An **Intersection** extracts only the items that are present in both sets. We use the `&` symbol or the `.intersection()` method:

```python
set_a = {1, 2, 3}
set_b = {3, 4, 5}

intersect_result = set_a & set_b
print(intersect_result) # Output: {3}
```

---

## 10.5 Difference

A **Difference** extracts the items that are present in the first set but not in the second set. We use the `-` symbol or the `.difference()` method:

```python
set_a = {1, 2, 3}
set_b = {3, 4, 5}

diff_result = set_a - set_b
print(diff_result) # Output: {1, 2} (since 3 is also in set_b, it is removed)
```

---

## 10.6 Symmetric Difference

A **Symmetric Difference** extracts only the items that are NOT shared between two sets (items present in either set A or set B, but not in both). We use the `^` symbol or the `.symmetric_difference()` method:

```python
set_a = {1, 2, 3}
set_b = {3, 4, 5}

sym_diff = set_a ^ set_b
print(sym_diff) # Output: {1, 2, 4, 5} (number 3 is shared, so it is excluded)
```

:::tip Real-World Use Case
Sets are commonly used to remove duplicate entries from a list, such as generating a list of unique email IDs or user IDs!
:::
