---
title: "The 4 Pillars of OOP"
sidebar_label: "17.3 The 4 Pillars of OOP"
---

# The 4 Pillars of Object-Oriented Programming

To build robust, professional software that scales cleanly, Object-Oriented Programming relies on **Four Fundamental Pillars**. Every tech interview and real-world system architecture revolves around these concepts!

---

## 1. Inheritance (Code Reusability) 🧬

**Inheritance** allows a child class to inherit attributes and methods from an existing parent class. This avoids duplicating code across similar classes.

### Real-Life Analogy: Family Traits
Just as a child inherits eye color or facial features from their parents while developing their own unique skills, a `Dog` class inherits basic behaviors (`eat()`, `sleep()`) from an `Animal` class while adding unique behaviors (`bark()`).

```python
# Parent Class
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating food.")

# Child Class inherits Animal
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # 'super()' calls the parent constructor
        self.breed = breed

    def bark(self):
        print(f"{self.name} says: Woof Woof!")

pet = Dog("Sheru", "Golden Retriever")
pet.eat()   # Inherited from Animal -> Output: Sheru is eating food.
pet.bark()  # Defined in Dog -> Output: Sheru says: Woof Woof!
```

---

## 2. Polymorphism (Many Forms) 🎭

**Polymorphism** translates to "having many forms." It allows different classes to share the exact same method name, but each executes it differently.

### Real-Life Analogy: Universal Remote Control 📱
Imagine pressing the "Play" button on a universal remote:
* If pointed at a DVD player, it plays a movie.
* If pointed at a CD player, it plays music.
The exact same action (`play()`) yields different behaviors depending on the target object!

```python
class Cat:
    def make_sound(self):
        return "Meow! 🐱"

class Cow:
    def make_sound(self):
        return "Moo! 🐮"

# Helper function executing polymorphism
def animal_chorus(animal):
    print(animal.make_sound())

animal_chorus(Cat())  # Output: Meow! 🐱
animal_chorus(Cow())  # Output: Moo! 🐮
```

---

## 3. Encapsulation (Data Protection) 🔒

**Encapsulation** means bundling data inside a class and restricting unauthorized external access. In Python, adding double underscores (`__`) before an attribute makes it **private**.

### Real-Life Analogy: ATM Machine 🏧
When using an ATM, you cannot physically open the vault door to grab cash. You must interact with the safe, approved keypad interface (`withdraw()`, `deposit()`).

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance  # Private attribute

    # Getter method
    def get_balance(self):
        return self.__balance

    # Setter method with validation
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"✅ Deposited ₹{amount}. New Balance: ₹{self.__balance}")
        else:
            print("❌ Invalid deposit amount!")

account = BankAccount("Sai", 5000)
# print(account.__balance) # Raises AttributeError! Private data is protected.

account.deposit(1500) # Approved interface works!
```

---

## 4. Abstraction (Hiding Complexity) 🎛️

**Abstraction** involves hiding complex background mechanisms and exposing only a simple interface to the user. We implement this using abstract base classes (`abc`).

### Real-Life Analogy: Driving a Car 🚗
When you turn the ignition key or press the accelerator pedal, the car moves. You don't need to know fuel injection timings or engine spark plug physics to drive!

```python
from abc import ABC, abstractmethod

class PaymentGateway(ABC):  # Abstract Base Class
    @abstractmethod
    def process_payment(self, amount):
        pass  # Enforces that all child classes MUST define this method!

class PhonePe(PaymentGateway):
    def process_payment(self, amount):
        print(f"🟢 Processing ₹{amount} securely via PhonePe UPI.")

payment = PhonePe()
payment.process_payment(499)
```
