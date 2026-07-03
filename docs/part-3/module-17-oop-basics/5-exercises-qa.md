---
title: "Practice Exercises & Placement Q&A"
sidebar_label: "17.5 Exercises & Interview Q&A"
---

# Practice Exercises & Placement Q&A

Test your Object-Oriented Programming mastery with these practical exercises and commonly asked technical interview questions!

---

## Part 1: Practice Exercises 💻

### 1. School System Inheritance
Create a base class `Person` with `name` and `age` attributes. Inherit a child class `Teacher` that adds a `subject` attribute and has a method `get_details()` to print complete teacher info.

### 2. Encapsulated Car Speed
Create a class `Car` with a private attribute `__speed` initialized to `0`. Write methods `accelerate(amount)` and `brake(amount)` with validation rules ensuring speed never drops below `0` or exceeds `200`. Add a getter `get_speed()`.

### 3. Custom Shopping Cart with Dunder Methods
Create a `ShoppingCart` class that holds a list of items. Implement `__len__()` to return item count and `__str__()` to print a summary of the cart.

---

## Part 2: Placement & Technical Interview Q&A 🎯

### Q1. What is the fundamental difference between a Class and an Object?
**Answer:** A **Class** is a conceptual design template or blueprint that defines the variables (attributes) and functions (methods) common to all entities of that type. An **Object (Instance)** is a physical entity created from that class blueprint that resides in memory and holds actual data.

### Q2. Explain the difference between Inheritance and Polymorphism.
**Answer:** **Inheritance** lets a child class inherit properties and behaviors from a parent class, promoting code reusability. **Polymorphism** allows different classes to share the same method signature while executing distinct implementations (often via method overriding).

### Q3. How do you implement private variables in Python, and what is Name Mangling?
**Answer:** By prefixing an attribute name with double underscores (`__`) inside a class (e.g., `self.__balance`). Python applies **Name Mangling** behind the scenes, changing the variable name internally to `_ClassName__variableName`. This prevents external code from directly accessing or modifying the variable.

### Q4. What is the difference between `__str__` and `__repr__`?
**Answer:** `__str__()` is intended for end-users and returns a clean, human-readable description when `print()` is called. `__repr__()` is intended for developers and returns an unambiguous, technical representation useful for debugging and logging.

### Q5. Can you instantiate an Abstract Class directly?
**Answer:** No. An abstract base class (inheriting from `abc.ABC` and containing `@abstractmethod`) serves strictly as an enforced contract or template. Attempting to instantiate it raises a `TypeError`. You must inherit it into a child class and implement all abstract methods before instantiating.
