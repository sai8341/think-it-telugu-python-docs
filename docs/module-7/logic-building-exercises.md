---
sidebar_position: 1
title: Logic Building Exercises
---

#  Comprehensive Logic Building Exercises

## Difficulty Levels:  Easy →  Medium →  Hard

---

##  Easy Exercises

### Exercise 1: Temperature Converter
```python
"""Convert Celsius  Fahrenheit"""
print("️ TEMPERATURE CONVERTER")
print("1. Celsius → Fahrenheit")
print("2. Fahrenheit → Celsius")

choice = input("Choice: ")

if choice == "1":
    c = float(input("Celsius: "))
    f = (c * 9/5) + 32
    print(f"{c}°C = {f:.1f}°F")
elif choice == "2":
    f = float(input("Fahrenheit: "))
    c = (f - 32) * 5/9
    print(f"{f}°F = {c:.1f}°C")
```

### Exercise 2: Leap Year Checker
```python
year = int(input("Enter year: "))

if (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0):
    print(f" {year} is a Leap Year!")
else:
    print(f" {year} is NOT a Leap Year")
```

### Exercise 3: Sum of Digits
```python
num = int(input("Enter a number: "))
original = num
digit_sum = 0

while num > 0:
    digit = num % 10
    digit_sum += digit
    num //= 10

print(f"Sum of digits of {original} = {digit_sum}")
```

---

##  Medium Exercises

### Exercise 4: Armstrong Number
```python
"""153 = 1³ + 5³ + 3³ = 1 + 125 + 27 = 153"""
num = int(input("Enter number: "))
original = num
digits = len(str(num))
total = 0

while num > 0:
    digit = num % 10
    total += digit ** digits
    num //= 10

if total == original:
    print(f" {original} is an Armstrong number!")
else:
    print(f" {original} is not Armstrong (got {total})")
```

### Exercise 5: Perfect Number
```python
"""6 = 1 + 2 + 3 (divisors sum = number)"""
num = int(input("Enter number: "))
divisors = [i for i in range(1, num) if num % i == 0]
print(f"Divisors of {num}: {divisors}")

if sum(divisors) == num:
    print(f" {num} is a Perfect Number!")
else:
    print(f" Not perfect (divisors sum = {sum(divisors)})")
```

### Exercise 6: Matrix Addition
```python
"""2x2 Matrix Addition"""
print("Matrix A:")
a = [[int(input(f"A[{i}][{j}]: ")) for j in range(2)] for i in range(2)]

print("Matrix B:")
b = [[int(input(f"B[{i}][{j}]: ")) for j in range(2)] for i in range(2)]

result = [[a[i][j] + b[i][j] for j in range(2)] for i in range(2)]

print("\nA + B =")
for row in result:
    print(f"  [{row[0]:3d}, {row[1]:3d}]")
```

---

##  Hard Exercises

### Exercise 7: Binary  Decimal Converter
```python
def decimal_to_binary(n):
    if n == 0: return "0"
    binary = ""
    while n > 0:
        binary = str(n % 2) + binary
        n //= 2
    return binary

def binary_to_decimal(b):
    decimal = 0
    for i, bit in enumerate(reversed(b)):
        decimal += int(bit) * (2 ** i)
    return decimal

# Test
num = 42
binary = decimal_to_binary(num)
back = binary_to_decimal(binary)
print(f"{num} → {binary} → {back}")
```

### Exercise 8: Sorting Without sort()
```python
"""Bubble Sort implementation"""
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

nums = [64, 34, 25, 12, 22, 11, 90]
print(f"Before: {nums}")
sorted_nums = bubble_sort(nums.copy())
print(f"After:  {sorted_nums}")
```

---

:::tip  Logic Building Strategy
1. **Read the problem carefully**: Go through it 2-3 times until you fully understand what is required.
2. **Work out examples on paper**: Take a few sample inputs and trace the expected output manually.
3. **Write pseudo-code first**: Write down the steps of your logic in simple English before coding.
4. **Write the code**: Convert your step-by-step pseudo-code into Python.
5. **Test your code thoroughly**: Run it with different inputs, including edge cases (like zero, negative numbers, or empty strings).
:::

---

**Next up:** [Mini Assignments →](./mini-assignments)

