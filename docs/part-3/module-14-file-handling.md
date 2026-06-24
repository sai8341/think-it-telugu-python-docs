---
title: "Module 14: File Handling"
sidebar_label: "Module 14: File Handling"
---

# Module 14: File Handling

In this module, we will learn about **File Handling**. This allows us to store data permanently in text files (`.txt`) on the hard disk, so the data remains saved even after the program stops running.

---

## 14.1 What is a File?

Variables and lists store data in RAM. This data is temporary and disappears when the program stops. Files store data permanently on your disk.

We use the built-in `open()` function to work with files.

### Common File Modes:
* **`'r'` (Read):** Opens a file for reading (throws an error if the file does not exist).
* **`'w'` (Write):** Opens a file for writing (creates a new file if missing, or overwrites existing content).
* **`'a'` (Append):** Opens a file for adding data at the end (does not delete existing data).

---

## 14.2 Reading Files

Here is how to open and read a file's content:

```python
# open(file_path, mode)
file = open("sample.txt", "r")
content = file.read()
print(content)
file.close() # Always close the file to free up system resources
```

### The with Statement (Recommended Way):
Using the `with` keyword is safer because Python automatically closes the file for you, even if an error happens.

```python
with open("sample.txt", "r") as file:
    content = file.read()
    print(content)
```

---

## 14.3 Writing Files

To write data into a file, open it in `'w'` mode:

```python
with open("output.txt", "w") as file:
    file.write("Hello, this file is created by Python!\n")
    file.write("Writing code is awesome.")
```
*Note: If `output.txt` already exists, this command clears all its old content and replaces it with the new text.*

---

## 14.4 Appending Files

To add new lines to the end of a file without deleting the old content, use the `'a'` (append) mode:

```python
with open("output.txt", "a") as file:
    file.write("\nAdding this new line at the end using Append mode.")
```

---

## 14.5 Reading a File Line-by-Line

For large files, it is better to read them line-by-line using a `for` loop to save memory:

```python
with open("lines.txt", "r") as file:
    for line in file:
        print(line.strip()) # strip() removes extra blank lines/spaces
```
:::tip Real-World Use Case
File handling is essential for reading server log files, importing CSV reports, or saving simple user preferences!
:::
