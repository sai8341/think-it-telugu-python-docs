---
title: "Constructors & Attributes (`__init__`) - Python in Telugu | Think IT Telugu"
sidebar_label: "Constructors & Attributes (`__init__`)"
description: "Learn about Constructors & Attributes (`__init__`) in Python with real-world examples. This Think IT Telugu tutorial explains Constructors & Attributes (`__init__`) easily for AI and Data Science beginners."
keywords: ["Python", "Constructors & Attributes (__init__)", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# Constructors & Attributes (`__init__`)

When you create a new object from a class, you usually want to initialize it with specific details immediately (like giving a new bank account an owner name and starting balance).

In Python, we achieve this using a special initialization function called a **Constructor**, written as **`__init__()`**.

---

## 1. Understanding `__init__` and `self`

Whenever you write `my_car = Car("Red", 120)`, Python automatically runs the `__init__` method inside the class.

Let's break down the two key components:
* **Attributes:** Variables belonging to an object (e.g., color, speed, brand).
* **`self`:** A special parameter that represents the **current object** being created or manipulated.

### Real-Life Analogy: Factory Customization ID Label 🏷️

Imagine a smartphone manufacturing line:
* When Phone #101 is built, the worker attaches a label: `self.color = "Black"`, `self.storage = "256GB"`. Here, `self` refers specifically to **Phone #101**.
* When Phone #102 is built next, `self` now refers to **Phone #102**.

---

## 2. Code Implementation

```python
class Student:
    # Constructor - triggers automatically when Student(...) is called
    def __init__(self, name, age, course):
        self.name = name       # Assigning attribute to this specific object
        self.age = age
        self.course = course
    
    # Instance Method (Action that the object can perform)
    def introduce(self):
        print(f"👋 Hi! I am {self.name}, {self.age} years old, learning {self.course}.")

# Creating two separate objects with different initial data
student1 = Student("Sai Kumar", 22, "Python & AI")
student2 = Student("Ananya", 20, "Data Science")

# Calling methods
student1.introduce()  # Output: 👋 Hi! I am Sai Kumar, 22 years old, learning Python & AI.
student2.introduce()  # Output: 👋 Hi! I am Ananya, 20 years old, learning Data Science.
```

---

## Class Attributes vs. Instance Attributes

Notice the difference between variables shared across all objects versus variables unique to each object:

```python
class Employee:
    company_name = "Think IT Telugu"  # Class Attribute (Shared by ALL employees)
    
    def __init__(self, emp_id, name):
        self.emp_id = emp_id          # Instance Attribute (Unique to each employee)
        self.name = name

emp1 = Employee(101, "Ravi")
emp2 = Employee(102, "Suresh")

print(emp1.company_name, "-", emp1.name) # Output: Think IT Telugu - Ravi
print(emp2.company_name, "-", emp2.name) # Output: Think IT Telugu - Suresh
```