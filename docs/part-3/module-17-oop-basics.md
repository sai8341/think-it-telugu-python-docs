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

---

## 17.4 The 4 Pillars of OOP (placement Essentials)

To build professional and scalable software, you must understand the four primary pillars of Object-Oriented Programming.

### 1. Inheritance
**Inheritance** allows a new class (Child Class) to inherit all variables and methods from an existing class (Parent Class). This promotes code reuse.

*   **Syntax:** `class ChildClass(ParentClass):`
*   **The `super()` function:** Used to call the constructor (`__init__`) of the parent class.

```python
# Parent Class
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating.")

# Child Class inherits Animal
class Dog(Animal):
    def __init__(self, name, breed):
        # Call parent constructor
        super().__init__(name)
        self.breed = breed

    def bark(self):
        print(f"{self.name} is barking!")

my_dog = Dog("Sheru", "Labrador")
my_dog.eat()  # Inherited method -> Output: Sheru is eating.
my_dog.bark() # Child method     -> Output: Sheru is barking!
```

---

### 2. Polymorphism
**Polymorphism** means "many forms." It allows different classes to have methods with the same name, but with different implementations. 

*   **Method Overriding:** A child class can rewrite a method inherited from the parent class to define its own specific behavior.

```python
class Cat:
    def make_sound(self):
        print("Meow!")

class Cow:
    def make_sound(self):
        print("Moo!")

# A single helper function can take any object and trigger the same method name!
def play_sound(animal_object):
    animal_object.make_sound()

cat = Cat()
cow = Cow()

play_sound(cat) # Output: Meow!
play_sound(cow) # Output: Moo!
```

---

### 3. Encapsulation
**Encapsulation** is the practice of hiding an object's internal data and restricting direct access from outside. This protects the data from accidental modification.

*   **Private Attributes:** In Python, prefixing an attribute name with double underscores (`__attribute`) makes it private.
*   **Getters and Setters:** Special methods used to safely read or write private data.

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance # Private attribute (cannot be accessed directly)

    # Getter method to read balance
    def get_balance(self):
        return self.__balance

    # Setter method to update balance safely with validation
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
        else:
            print("Invalid deposit amount!")

account = BankAccount("Sai", 1000)
# print(account.__balance) # Error! Direct access is blocked.

account.deposit(500)
print(account.get_balance()) # Output: 1500
```

---

### 4. Abstraction
**Abstraction** means hiding complex execution details and only showing the essential features to the user. 
*   In Python, we achieve abstraction by creating **Abstract Classes** using the built-in `abc` module. An abstract class cannot be instantiated directly—it serves as a strict rulebook for child classes.

```python
from abc import ABC, abstractmethod

class Vehicle(ABC): # Abstract Class
    @abstractmethod
    def start_engine(self):
        pass

class Bike(Vehicle):
    def start_engine(self):
        print("Kick-starting the bike engine!")

# my_vehicle = Vehicle() # Error! You cannot create an object of an abstract class directly.
my_bike = Bike()
my_bike.start_engine() # Output: Kick-starting the bike engine!
```

---

## 17.5 Practice Exercises

1. **School System Inheritance:**
   Create a base class `Person` with `name` and `age` attributes. Inherit a child class `Teacher` that adds a `subject` attribute and has a method to print teacher details.
2. **Encapsulated Car Speed:**
   Create a class `Car` with private attribute `__speed` starting at 0. Write methods `accelerate()` and `get_speed()` to safely increase and view the speed.
3. **Abstract Shape:**
   Create an abstract class `Shape` with an abstract method `area()`. Inherit a class `Square` and implement the `area()` calculations.

---

## 17.6 Placement Q&A (Interview Prep)

**Q1. What is the difference between a Class and an Object?**  
**Answer:** A Class is a structural design template or blueprint that defines the variables (attributes) and functions (methods) common to all objects of that type. An Object (Instance) is a physical entity created from that class blueprint that resides in memory and contains real data.

**Q2. Explain the difference between Inheritance and Polymorphism.**  
**Answer:** Inheritance is a mechanism where a new class inherits properties and behaviors from a parent class, promoting code reusability. Polymorphism is the ability of different objects to respond to the same method call in different ways, typically implemented via method overriding.

**Q3. How do you implement private variables in Python?**  
**Answer:** By adding double underscores (`__`) before the variable name inside a class. This triggers name mangling, which prevents external code from directly modifying or reading the variable (e.g., `self.__data`).

---

## 17.7 Module 17 Cheat Sheet

* **Class:** Blueprint (`class ClassName:`)
* **Object:** Instance (`obj = ClassName()`)
* **Constructor (`__init__`):** Runs automatically on object creation; initializes attributes.
* **self:** Points to the current object instance.
* **Inheritance:** `class Child(Parent):`
* **Polymorphism:** Having different classes execute the same method name.
* **Encapsulation:** Prefixing with `__` for private data; using getter/setter methods.
* **Abstraction:** Hiding logic using Abstract Classes from the `abc` module.

