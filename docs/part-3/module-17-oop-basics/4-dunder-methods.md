---
title: "Magic & Dunder Methods (`__str__`, `__repr__`) - Python in Telugu | Think IT Telugu"
sidebar_label: "Magic & Dunder Methods (`__str__`, `__repr__`)"
description: "Learn about Magic & Dunder Methods (`__str__`, `__repr__`) in Python with real-world examples. This Think IT Telugu tutorial explains Magic & Dunder Methods (`__str__`, `__repr__`) easily for AI and Data Science beginners."
keywords: ["Python", "Magic & Dunder Methods (__str__, __repr__)", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# Magic & Dunder Methods (`__str__`, `__repr__`)

In Python, methods starting and ending with double underscores are called **Dunder Methods** (short for **D**ouble **Under**score) or **Magic Methods**. You already know the most famous one: `__init__()`.

Dunder methods allow custom objects to interact seamlessly with built-in Python syntax like `print()`, `len()`, `+`, or `==`.

---

## 1. Why Do We Need `__str__`?

If you print a custom object without defining how it should be displayed, Python outputs an unreadable memory address:

```python
class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

my_book = Book("Python Mastery", 350)
print(my_book)  # Output: <__main__.Book object at 0x000001F8C9E4B1C0> ❌ Ugly!
```

To fix this, define `__str__()` to return a human-readable string representation:

```python
class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    # Defines what happens when print() is called on the object
    def __str__(self):
        return f"📘 '{self.title}' ({self.pages} pages)"

my_book = Book("Python Mastery", 350)
print(my_book)  # Output: 📘 'Python Mastery' (350 pages) ✅ Clean!
```

---

## 2. Commonly Used Dunder Methods Table

Here are the most essential dunder methods you will use in advanced software development:

| Dunder Method | Triggered By | Purpose | Example Use Case |
| :--- | :--- | :--- | :--- |
| `__init__(self, ...)` | `Object(...)` | Constructor | Initializing attributes on creation. |
| `__str__(self)` | `print(obj)` or `str(obj)` | User-friendly text | Displaying clean info to end-users. |
| `__repr__(self)` | `repr(obj)` or terminal | Developer debug representation | Accurate string representation for debugging logs. |
| `__len__(self)` | `len(obj)` | Object length | Returning the size of a custom playlist or collection. |
| `__eq__(self, other)` | `obj1 == obj2` | Equality comparison | Checking if two custom user objects have matching IDs. |

---

## 3. Practical Code Example: Custom Playlist

```python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []

    def add_song(self, song_title):
        self.songs.append(song_title)

    # Magic method for print()
    def __str__(self):
        return f"🎵 Playlist: {self.name} ({len(self.songs)} tracks)"

    # Magic method for len()
    def __len__(self):
        return len(self.songs)

my_music = Playlist("Telugu Super Hits")
my_music.add_song("Naatu Naatu")
my_music.add_song("Samajavaragamana")

print(my_music)      # Output: 🎵 Playlist: Telugu Super Hits (2 tracks)
print(len(my_music)) # Output: 2
```