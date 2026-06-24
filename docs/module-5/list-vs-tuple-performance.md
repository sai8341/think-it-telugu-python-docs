---
sidebar_position: 3
title: "18 — Performance & Use Cases"
---

# Chapter 18: Performance & Use Cases

Choosing the right data structure directly impacts the speed and memory consumption of your applications. This chapter covers the memory and creation speed differences between lists and tuples, and details the performance advantages of dictionary lookups over list searches.

---

## 1. List vs. Tuple: Performance Comparison 

While lists and tuples look similar, their underlying memory allocation systems are completely different.

| Feature | List `[]` | Tuple `()` |
| :--- | :--- | :--- |
| **Mutability** | Mutable (elements can be modified) | Immutable (read-only elements) |
| **Memory Allocation** | Dynamic (requires overallocation for growth) | Static (fixed-size block allocation) |
| **Creation Speed** | Slower | **Faster**  |
| **Memory Footprint** | More overhead | **Less overhead** |

### Memory and Speed Verification Script
We can verify these differences programmatically using the `sys` and `timeit` modules:

```python
import sys
import timeit

# 1. Memory Size Check
my_list = [1, 2, 3, 4, 5]
my_tuple = (1, 2, 3, 4, 5)

print(f"List size : {sys.getsizeof(my_list)} bytes")   # e.g., 104 bytes
print(f"Tuple size: {sys.getsizeof(my_tuple)} bytes")  # e.g., 80 bytes
# Tuples require about 20% less memory than lists!

# 2. Object Creation Speed Check (Running 1 million times)
list_time = timeit.timeit("x = [1, 2, 3, 4, 5]", number=1000000)
tuple_time = timeit.timeit("x = (1, 2, 3, 4, 5)", number=1000000)

print(f"List Creation Time : {list_time:.4f}s")
print(f"Tuple Creation Time: {tuple_time:.4f}s")
# Tuples are generated significantly faster than lists!
```

> **Why are Tuples faster and smaller?**
> Because lists are mutable, Python must allocate extra memory space (overallocation) during creation so that future `append()` operations don't require reallocating the entire list in memory every time. Since tuples are immutable, Python allocates the exact amount of memory needed for the elements, resulting in a static, read-only block.

---

## 2. The Dictionary Lookup Performance Tip 

When searching for items in a collection, the choice between using a List or a Dictionary can determine whether your program runs in milliseconds or hours.

### The Problem: List Membership Check (O(N))
When you check if an item is inside a list using the `in` keyword (e.g., `if "item" in my_list:`), Python performs a **Linear Search**. It starts at index 0 and checks every element one-by-one until it finds a match or reaches the end.
*   If the list has 1 million items, Python might need to make 1 million comparison checks!
*   **Time Complexity:** O(N) (linear time).

### The Solution: Dictionary/Set Lookup (O(1))
When you check if a key is inside a dictionary or set using the `in` keyword (e.g., `if "key" in my_dict:`), Python performs a **Hash Table Lookup**.
*   Python hashes the key to compute its exact memory address and jumps directly to that spot.
*   Whether the dictionary has 5 items or 5 million items, it takes the **same fraction of a microsecond** to find the key.
*   **Time Complexity:** O(1) (constant time).

```python
#  SLOW: Checking membership in a list of 1,000,000 items
large_list = list(range(1000000))
# '999999 in large_list' executes a linear search, checking 1 million times!

#  FAST: Checking membership in a set/dictionary of 1,000,000 items
large_set = set(range(1000000))
# '999999 in large_set' hashes the value and jumps directly, executing in one step!
```

---

## Placement & Interview Focus 

*   **Question:** Why are dictionaries and sets faster for membership checks compared to lists?
*   **Answer:** Dictionaries and sets use hash tables. When searching for a key, Python runs the key through a hash function that outputs a memory index. Python directly accesses that memory index, executing the search in O(1) (constant) average time. Lists do not use hashes; they must be traversed element-by-element, resulting in O(N) (linear) time complexity.
*   **Question:** Why does Python allocate more memory to a list than a tuple of the same size?
*   **Answer:** Python lists are dynamic arrays. To make operations like `.append()` efficient, Python allocates extra memory buffer slots beyond the current list length. This prevents the need to resize and copy the array in memory for every single append operation. Tuples are immutable and fixed-size, so they require no extra buffer memory.
