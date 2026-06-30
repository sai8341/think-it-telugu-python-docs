---
title: "Python for Data Science"
sidebar_label: "19.1 Data Science & NumPy"
---

# Python for Data Science & NumPy

In traditional programming, we process data one item at a time. In **Data Science** and **Machine Learning**, we process entire tables and matrices containing millions of data points simultaneously.

Python is the absolute standard language for Data Science because of a mature ecosystem of libraries: **NumPy**, **Pandas**, and **Matplotlib**.

---

## 19.1.1 Why Standard Lists are Too Slow

Python lists are highly flexible because they can store different data types. However, this flexibility makes lists extremely slow and memory-intensive for mathematical computations. 

**NumPy (Numerical Python)** solves this by introducing the **ndarray** (N-dimensional array).

---

## 19.1.2 What is a NumPy Array?

A NumPy array is a grid of values of the **same data type** stored close together in your computer's memory. This allows your computer to run calculations on all elements at once.

### Installing NumPy:
```bash
pip install numpy
```

### Basic Array Operations:
```python
import numpy as np

# Creating an array from a Python list
prices = np.array([100, 200, 300, 400])
print(type(prices)) # Output: <class 'numpy.ndarray'>

# Vectorized Operation: Apply calculations to all elements at once (Broadcasting)
discounted_prices = prices * 0.90
print(discounted_prices)
# Output: [ 90. 180. 270. 360.]

# Finding basic statistical details
print("Average price:", np.mean(prices)) # Output: 250.0
print("Max price:", np.max(prices))       # Output: 400
print("Sum of prices:", np.sum(prices))   # Output: 1000
```

---

## 19.1.3 Common Array Shapes

NumPy arrays can be:
*   **1D Array (Vector):** A single row of numbers (e.g., `[1, 2, 3]`).
*   **2D Array (Matrix):** A grid with rows and columns (e.g., a table with numbers).

```python
# Creating a 2D Array
matrix = np.array([
    [1, 2, 3],
    [4, 5, 6]
])

print("Dimensions:", matrix.ndim) # Output: 2
print("Shape (Rows, Cols):", matrix.shape) # Output: (2, 3)
```
