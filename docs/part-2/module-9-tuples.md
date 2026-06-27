---
title: "Module 9: Tuples"
sidebar_label: "Module 9: Tuples"
---

# Module 9: Tuples

In this module, we will learn about **Tuples**. A tuple is used to store multiple items in a single variable, similar to a list. However, tuples have some key differences.

---

## 9.1 Introduction to Tuples

* A tuple is created using parentheses or round brackets (`( )`) with items separated by commas.
* Tuples are **Immutable**. This means once a tuple is created, you cannot change, add, or remove its items.
* Tuples are faster and use less memory than lists.

```python
# Creating tuples
coordinates = (10.5, 20.8)
colors = ("red", "green", "blue")

# Single-element tuple gotcha:
wrong_tuple = (5)   # Without comma, Python treats this as just the integer 5!
correct_tuple = (5,) # You MUST add a comma to make it a tuple
print(type(wrong_tuple))   # Output: <class 'int'>
print(type(correct_tuple)) # Output: <class 'tuple'>
```

---

## 9.2 Tuple Operations

Since tuples cannot be changed, they support limited operations.

### Accessing Items:
```python
fruits = ("apple", "banana", "mango")
print(fruits[0])  # Output: apple
print(fruits[-1]) # Output: mango
```

### Trying to modify a tuple:
```python
# fruits[1] = "grapes" # This will throw a TypeError!
```

### Joining Tuples (Concatenation):
You can combine two tuples to create a new one:
```python
t1 = (1, 2)
t2 = (3, 4)
t3 = t1 + t2
print(t3) # Output: (1, 2, 3, 4)
```

### Tuple Packing:
Assigning multiple values to a single variable without parentheses automatically creates (packs) a tuple:
```python
person = "Sai", 22, "Hyderabad"
print(person) # Output: ('Sai', 22, 'Hyderabad')
```

### Tuple Unpacking:
Extracting the values back out of a tuple into individual variables:
```python
user = ("Ram", 25)
name, age = user # Unpacks "Ram" into name and 25 into age
print("Name:", name) # Output: Name: Ram
print("Age:", age)   # Output: Age: 25
```

---

## 9.3 Tuple Methods

Tuples only have two built-in methods because their values cannot be changed:

1. **`count()`:** Counts how many times a specific value appears in the tuple.
2. **`index()`:** Returns the position (index) of the first occurrence of a specific value.

```python
numbers = (1, 2, 3, 2, 4, 2, 5)

print(numbers.count(2)) # Output: 3 (number 2 appears three times)
print(numbers.index(4)) # Output: 4 (number 4 is at index 4)
```

---

## 9.4 Tuple vs List (Key Differences)

Understanding when to use a list and when to use a tuple is very important:

| Feature | List | Tuple |
| :--- | :--- | :--- |
| **Syntax** | Uses square brackets `[ ]`. | Uses round brackets `( )`. |
| **Mutability** | **Mutable** (can be changed). | **Immutable** (cannot be changed). |
| **Speed** | Slower performance. | Faster performance. |
| **Memory** | Uses more memory. | Uses less memory. |
| **Use Case** | Use when data needs to change. | Use for constant values (data that never changes). |

### Why are Tuples faster and more memory efficient?
Because tuples cannot be changed after creation, Python does not need to allocate extra memory for future additions. This makes tuples slightly fixed, compact, and quicker to read than lists.

### Side-by-Side Comparison Example:
```python
# List (Mutable - can change)
cart_list = ["Shoes", "Watch"]
cart_list[0] = "Bag" # Valid! List is updated.

# Tuple (Immutable - cannot change)
days_tuple = ("Monday", "Tuesday")
# days_tuple[0] = "Sunday" # Throws TypeError! Cannot change constant data.
```

### Real-World Use Case:
* The names of the days of the week (Monday, Tuesday...) never change. We should store them in a **Tuple**.
* Items in a user's shopping cart change frequently. We should store them in a **List**.
