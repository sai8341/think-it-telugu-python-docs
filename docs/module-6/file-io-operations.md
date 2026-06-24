---
sidebar_position: 2
title: "20 — File I/O Operations"
---

# Chapter 20: File I/O Operations

To make data persist beyond the lifecycle of a running program, we must read and write files on disk. This chapter covers text file operations using the safe `with open()` pattern, handling CSV and JSON files, and introduces the Pandas library for loading datasets and exporting to Excel/CSV.

---

## 1. Text File Operations & The `with` Statement 

When you open a file, your operating system allocates system resources and locks the file. You must close the file when finished to free these resources.

> **Best Practice: The `with` Statement:** Python's `with` statement creates a context manager that guarantees the file is closed automatically as soon as the code block exits—even if the program crashes or encounters an error inside the block.

```python
# 1. Writing to a file (Mode "w" overwrites existing content)
with open("notes.txt", "w", encoding="utf-8") as file:
    file.write("Hello from Think IT! \n")
    file.write("Writing data is simple.\n")

# 2. Appending to a file (Mode "a" adds to the bottom)
with open("notes.txt", "a", encoding="utf-8") as file:
    file.write("Appending this new line.\n")

# 3. Reading from a file (Mode "r" reads content)
with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)
```

---

## 2. Structured Data: CSV & JSON 

For structured data, we avoid writing raw strings and instead use standard formats.

### CSV (Comma Separated Values)
```python
import csv

# Writing to CSV
with open("students.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["Name", "Branch", "CGPA"])  # Header
    writer.writerows([["Ravi", "CSE", 8.5], ["Priya", "ECE", 9.1]])

# Reading from CSV
with open("students.csv", "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)  # Each row is returned as a list of strings
```

### JSON (JavaScript Object Notation)
```python
import json

data = {"course": "Python", "active": True, "students": ["Ravi", "Priya"]}

# Writing JSON dictionary to a file
with open("data.json", "w") as f:
    json.dump(data, f, indent=4)

# Reading and parsing JSON file back to a Python dictionary
with open("data.json", "r") as f:
    parsed_data = json.load(f)
    print(parsed_data["students"])  # Output: ['Ravi', 'Priya']
```

---

## 3. High-Performance File Handling with Pandas 

In AI, machine learning, and data science, manual CSV/JSON parsing is replaced by **Pandas**, a powerful data analysis library.

> **What is Pandas?**
> Pandas loads tables of data into an in-memory structure called a **DataFrame** (similar to an Excel spreadsheet). It makes loading, filtering, and saving large datasets simple and fast.

### Installing Pandas
To install Pandas, run the following command in your terminal:
```bash
pip install pandas openpyxl
```

### Reading JSON/CSV and Exporting to Excel with Pandas
```python
import pandas as pd

# 1. Loading JSON data directly into a DataFrame
df = pd.read_json("data.json")

# Display first few rows of the table
print(df.head())

# 2. Exporting the dataset to a CSV file
df.to_csv("exported_data.csv", index=False)

# 3. Exporting the dataset to an Excel file (.xlsx)
# Requires 'openpyxl' package installed
df.to_excel("exported_data.excel.xlsx", index=False)
```

---

## Placement & Interview Focus 

*   **Question:** Why is the `with` statement preferred over manually calling `file.close()`?
*   **Answer:** If you manually call `file.close()`, a runtime error occurring in the lines of code between `open()` and `close()` will prevent `close()` from executing. This leaves the file descriptor open, leaking memory and leaving the file locked in the operating system. The `with` statement utilizes a context manager that guarantees the file descriptor is closed immediately upon exiting the block, even if an unhandled exception is raised.
*   **Question:** What are the advantages of using Pandas for loading datasets over Python's built-in CSV module?
*   **Answer:** While Python's built-in CSV module parses data line-by-line as raw strings, Pandas parses data into strongly-typed DataFrames. Pandas handles missing values automatically, performs vector operations for data manipulation, and supports highly-optimized C-extensions to handle massive files that would cause memory bottlenecks with standard loops.
