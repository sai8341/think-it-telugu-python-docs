---
sidebar_position: 3
title: Timed Coding Challenges
---

# ️ Time-Bound Coding Challenges

## How to Attempt the Challenges? 

1. **Set a timer**: Every challenge has a specific time limit.
2. **Do not search online**: Try solving them completely using your own knowledge.
3. **Use pen and paper**: Sketch and trace your logic on paper first before writing code.
4. **Check the solution later**: Only look at the solution after you have made an honest attempt.

---

##  5-Minute Challenges

### Challenge 1: FizzBuzz (️ 5 min)

**Problem:** Print numbers from 1 to 50. If a number is divisible by 3, print "Fizz". If it is divisible by 5, print "Buzz". If it is divisible by both 3 and 5, print "FizzBuzz".

<details>
<summary> Solution (try first!)</summary>

```python
for i in range(1, 51):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz", end=" ")
    elif i % 3 == 0:
        print("Fizz", end=" ")
    elif i % 5 == 0:
        print("Buzz", end=" ")
    else:
        print(i, end=" ")
```
</details>

---

### Challenge 2: String Reverse (️ 5 min)

**Problem:** Reverse a string entered by the user without using any built-in functions or string slicing (like `[::-1]`).

<details>
<summary> Solution</summary>

```python
text = input("Enter text: ")
reversed_text = ""
for char in text:
    reversed_text = char + reversed_text
print(f"Reversed: {reversed_text}")
```
</details>

---

### Challenge 3: Count Vowels (️ 5 min)

**Problem:** Write a program to count the total number of vowels in a given string.

<details>
<summary> Solution</summary>

```python
text = input("Enter text: ").lower()
vowels = "aeiou"
count = sum(1 for c in text if c in vowels)
print(f"Vowels: {count}")

# Bonus: each vowel count
for v in vowels:
    c = text.count(v)
    if c > 0:
        print(f"  {v}: {c}")
```
</details>

---

##  10-Minute Challenges

### Challenge 4: Second Largest (️ 10 min)

**Problem:** Find the second largest number in a list of integers without using any sorting functions.

<details>
<summary> Solution</summary>

```python
nums = [12, 45, 2, 41, 31, 10, 8, 6, 4]

first = second = float('-inf')
for num in nums:
    if num > first:
        second = first
        first = num
    elif num > second and num != first:
        second = num

print(f"List: {nums}")
print(f"Largest: {first}")
print(f"Second Largest: {second}")
```
</details>

---

### Challenge 5: Pangram Checker (️ 10 min)

**Problem:** Check if a sentence is a pangram (contains all 26 letters of the English alphabet at least once).

<details>
<summary> Solution</summary>

```python
text = input("Enter sentence: ").lower()
alphabet = set("abcdefghijklmnopqrstuvwxyz")
text_letters = set(c for c in text if c.isalpha())

if alphabet.issubset(text_letters):
    print(" Pangram!")
else:
    missing = alphabet - text_letters
    print(f" Not pangram. Missing: {sorted(missing)}")

# Test: "The quick brown fox jumps over the lazy dog" → Pangram!
```
</details>

---

### Challenge 6: Caesar Cipher (️ 10 min)

**Problem:** Implement a Caesar Cipher to encrypt and decrypt a message by shifting each letter by N positions.

<details>
<summary> Solution</summary>

```python
def caesar_cipher(text, shift, mode="encrypt"):
    if mode == "decrypt":
        shift = -shift
    
    result = ""
    for char in text:
        if char.isalpha():
            base = ord('A') if char.isupper() else ord('a')
            shifted = (ord(char) - base + shift) % 26 + base
            result += chr(shifted)
        else:
            result += char
    return result

message = "Hello Python"
encrypted = caesar_cipher(message, 3)
decrypted = caesar_cipher(encrypted, 3, "decrypt")
print(f"Original:  {message}")
print(f"Encrypted: {encrypted}")
print(f"Decrypted: {decrypted}")
```
</details>

---

##  15-Minute Challenges

### Challenge 7: Matrix Transpose (️ 15 min)

**Problem:** Transpose a 3x3 matrix (convert all its rows into columns and vice versa).

<details>
<summary> Solution</summary>

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Method 1: Manual
transpose = [[matrix[j][i] for j in range(3)] for i in range(3)]

print("Original:")
for row in matrix:
    print(f"  {row}")

print("\nTranspose:")
for row in transpose:
    print(f"  {row}")
```
</details>

---

### Challenge 8: Simple Compression (️ 15 min)

**Problem:** Compress a string by replacing consecutive duplicate characters with the character and its frequency. For example: "aaabbbccca" should become "a3b3c3a1" (Run-length encoding).

<details>
<summary> Solution</summary>

```python
def compress(text):
    if not text:
        return ""
    
    result = ""
    count = 1
    
    for i in range(1, len(text)):
        if text[i] == text[i-1]:
            count += 1
        else:
            result += text[i-1] + str(count)
            count = 1
    result += text[-1] + str(count)
    
    # Only return compressed if shorter
    return result if len(result) < len(text) else text

test = "aaabbbccca"
print(f"Original:   '{test}' (length {len(test)})")
print(f"Compressed: '{compress(test)}' (length {len(compress(test))})")
```
</details>

---

## Scoring Guide 

| Challenges Completed | Level |
|---------------------|-------|
| 8/8 in time |  **Python Ninja!** |
| 6-7/8 |  **Advanced** |
| 4-5/8 |  **Intermediate** |
| 2-3/8 |  **Keep Practicing** |
| 0-1/8 |  **Review Modules 1-6** |

---

:::tip  Interview Tips
- **FizzBuzz**: FizzBuzz is asked in almost every entry-level coding interview. You should be able to write it in less than 2 minutes.
- **String manipulation**: Questions about strings are extremely common. Make sure you practice reversing strings, checking for palindromes, and checking anagrams.
- **Explain time complexity**: Discuss if your solution runs in linear time $O(N)$ or quadratic time $O(N^2)$ to show depth of understanding to interviewers.
- **Handle edge cases**: Make sure your code can gracefully handle empty inputs, negative numbers, and unexpected data types.
:::

---

**Module 7 Complete! **

**Next Module:** [Module 8: Capstone Projects →](/module-8/cli-calculator)

