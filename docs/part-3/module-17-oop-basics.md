---
title: "Module 17: Object-Oriented Programming Basics"
sidebar_label: "Module 17: OOP Basics"
---

# Module 17: Object-Oriented Programming Basics

In this module, we will learn the basics of **Object-Oriented Programming (OOP)**. OOP helps us organize our code by representing real-world things as objects in our programs.

---

## 17.1 Why OOP?

Most simple programs run line-by-line from top to bottom. However, as programs grow larger, this approach becomes difficult to manage. 

OOP allows us to group related variables and functions into containers called "objects". This makes our code easier to reuse and organize.

---

## 17.2 Classes and Objects

These are the two main concepts of OOP:

* **Class:** A blueprint or a design template (e.g., the architectural design blueprint of a car).
* **Object:** The actual item built using that blueprint (e.g., the real car driving on the road).

```python
# 1. Defining a Class
class Car:
    pass

# 2. Creating Objects (Instances)
car1 = Car()
car2 = Car()

print(type(car1)) # Output: <class '__main__.Car'>
```

---

## 17.3 Constructors & Attributes

To give our objects default values when they are created, we use a special function called a **Constructor**. In Python, this is written as **`__init__()`**.

* **Attributes:** Variables inside a class that store object details (e.g., name, color, speed).
* **`self`:** A keyword that represents the current object being created or modified.

```python
class Student:
    # Constructor - runs automatically when a new student is created
    def __init__(self, name, age):
        self.name = name # Attribute
        self.age = age   # Attribute
    
    # Method (A function inside a class)
    def introduce(self):
        print(f"Hi, my name is {self.name} and I am {self.age} years old.")

# Creating objects
student1 = Student("Sai Kumar", 22)
student2 = Student("Ram", 24)

# Accessing attributes and calling methods
print(student1.name) # Output: Sai Kumar
student2.introduce() # Output: Hi, my name is Ram and I am 24 years old.
```
:::important Note
This is just a simple introduction to OOP. In AI development and data analysis, we mostly use objects created by others. Understanding this basic structure is all you need to get started!
:::
