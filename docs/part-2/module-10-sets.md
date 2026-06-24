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

```python
# Creating a set
unique_numbers = {1, 2, 3, 4, 4, 3, 2}
print(unique_numbers) 
# Output: {1, 2, 3, 4} (Duplicates are automatically removed)

# Creating an Empty Set
empty_set = set() # Note: empty_set = {} will create an empty dictionary, not a set
```

---

## 10.2 Set Methods

Methods used to add and remove items from a set:

```python
skills = {"Python", "Git"}

# 1. add() - Adds an item to the set
skills.add("SQL")
print(skills) # Output: {'Python', 'Git', 'SQL'} (Order may vary)

# 2. remove() - Deletes an item from the set (throws an error if the item is not found)
skills.remove("Git")
print(skills) # Output: {'Python', 'SQL'}

# 3. discard() - Deletes an item from the set safely (does not throw an error if the item is missing)
skills.discard("Java") # "Java" is not in the set, but no error is thrown
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
:::tip Real-World Use Case
Sets are commonly used to remove duplicate entries from a list, such as generating a list of unique email IDs or user IDs!
:::
