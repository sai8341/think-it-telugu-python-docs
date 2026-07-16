---
title: "Data Manipulation with Pandas - Python in Telugu | Think IT Telugu"
sidebar_label: "Data Manipulation with Pandas"
description: "Learn about Data Manipulation with Pandas in Python with real-world examples. This Think IT Telugu tutorial explains Data Manipulation with Pandas easily for AI and Data Science beginners."
keywords: ["Python", "Data Manipulation with Pandas", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# Data Manipulation with Pandas

While NumPy is excellent for numbers, **Pandas** is the ultimate library for handling tabular data (rows and columns), similar to working with SQL tables or Excel sheets.

---

## 19.2.1 Series vs. DataFrames

Pandas has two primary data structures:
*   **Series:** A single column of data.
*   **DataFrame:** A two-dimensional table composed of multiple columns (Series).

```text
       DataFrame
   ┌─────────┬──────────┐
   │ Product │ Price    │ ───> Column (Series)
   ├─────────┼──────────┤
   │ Laptop  │ 50000    │
   │ Mouse   │ 1000     │
   └─────────┴──────────┘
```

---

## 19.2.2 Basic Operations

### Installing Pandas:
```bash
pip install pandas
```

### Creating and Mutating DataFrames:
```python
import pandas as pd

# 1. Create a DataFrame manually
data = {
    "Product": ["Laptop", "Mouse", "Keyboard"],
    "Price": [50000, 1000, 2000],
    "Quantity": [2, 10, 5]
}
df = pd.DataFrame(data)
print("Initial DataFrame:")
print(df)

# 2. Add a calculated column
df["Total_Cost"] = df["Price"] * df["Quantity"]
print("\nWith Total Cost:")
print(df)
```

### Output:
```text
Initial DataFrame:
    Product  Price  Quantity
0    Laptop  50000         2
1     Mouse   1000        10
2  Keyboard   2000         5

With Total Cost:
    Product  Price  Quantity  Total_Cost
0    Laptop  50000         2      100000
1     Mouse   1000        10       10000
2  Keyboard   2000         5       10000
```

---

## 19.2.3 Filtering and Aggregations

One of the main strengths of Pandas is the ease of filtering rows and aggregating column values:

```python
# 1. Filtering: Get products with a price greater than 1500
expensive_items = df[df["Price"] > 1500]
print("Expensive items:")
print(expensive_items)

# 2. Aggregation: Calculate summaries
print("Total revenue:", df["Total_Cost"].sum()) # Output: 120000
print("Average quantity:", df["Quantity"].mean()) # Output: 5.66
```