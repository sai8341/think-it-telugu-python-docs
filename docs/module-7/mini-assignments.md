---
sidebar_position: 2
title: Mini Assignments
---

#  Mini-Assignments for Continuous Evolution

## Assignment 1: Student Report Generator 

**Task:** Create a program that takes 5 students' names and marks for 3 subjects, then generates a formatted report card for each student with grades and class rank.

**Requirements:**
- Input: Student name, 3 subject marks
- Calculate: Total, percentage, grade
- Output: Formatted report card with rank

```python
"""
 STUDENT REPORT GENERATOR
Try this yourself first, then check the solution below!
"""

def get_grade(percentage):
    if percentage >= 90: return "A+", ""
    elif percentage >= 80: return "A", ""
    elif percentage >= 70: return "B", ""
    elif percentage >= 60: return "C", ""
    elif percentage >= 35: return "D", ""
    else: return "F", ""

students = []
subjects = ["Maths", "Science", "English"]

for i in range(3):
    name = input(f"\nStudent {i+1} name: ")
    marks = {}
    for sub in subjects:
        marks[sub] = int(input(f"  {sub} marks: "))
    
    total = sum(marks.values())
    pct = total / len(subjects)
    grade, emoji = get_grade(pct)
    
    students.append({
        "name": name, "marks": marks,
        "total": total, "pct": pct,
        "grade": grade, "emoji": emoji
    })

# Sort by total (ranking)
students.sort(key=lambda s: s["total"], reverse=True)

# Display
for rank, s in enumerate(students, 1):
    print(f"\n{'='*35}")
    print(f" #{rank} {s['emoji']} {s['name']}")
    print(f"{'='*35}")
    for sub, mark in s["marks"].items():
        print(f"  {sub:<12}: {mark}")
    print(f"  {'Total':<12}: {s['total']}")
    print(f"  {'Percentage':<12}: {s['pct']:.1f}%")
    print(f"  {'Grade':<12}: {s['grade']}")
```

---

## Assignment 2: Password Generator 

**Task:** Build a customizable password generator.

```python
import random
import string

def generate_password(length=12, use_upper=True, use_digits=True, use_special=True):
    chars = string.ascii_lowercase
    if use_upper: chars += string.ascii_uppercase
    if use_digits: chars += string.digits
    if use_special: chars += "!@#$%^&*"
    
    password = ''.join(random.choice(chars) for _ in range(length))
    
    # Strength meter
    strength = 0
    if any(c.isupper() for c in password): strength += 1
    if any(c.islower() for c in password): strength += 1
    if any(c.isdigit() for c in password): strength += 1
    if any(c in "!@#$%^&*" for c in password): strength += 1
    if length >= 12: strength += 1
    
    return password, strength

print(" PASSWORD GENERATOR")
length = int(input("Length (8-32): "))
pwd, strength = generate_password(length)
bar = "" * strength + "" * (5 - strength)
print(f"\n Password: {pwd}")
print(f" Strength: {bar} ({strength}/5)")
```

---

## Assignment 3: Expense Tracker 

**Task:** Build a daily expense tracker with categories and summary.

```python
expenses = []
categories = [" Food", " Travel", " Recharge", " Study", " Fun"]

def add_expense():
    print("\nCategories:")
    for i, cat in enumerate(categories, 1):
        print(f"  {i}. {cat}")
    
    cat_idx = int(input("Category (1-5): ")) - 1
    amount = float(input("Amount ₹: "))
    desc = input("Description: ")
    
    expenses.append({
        "category": categories[cat_idx],
        "amount": amount,
        "desc": desc
    })
    print(f" ₹{amount:.0f} added to {categories[cat_idx]}")

def show_summary():
    if not expenses:
        print(" No expenses yet!")
        return
    
    total = sum(e["amount"] for e in expenses)
    
    print(f"\n EXPENSE SUMMARY")
    print(f"{'='*40}")
    
    # Category-wise
    for cat in categories:
        cat_total = sum(e["amount"] for e in expenses if e["category"] == cat)
        if cat_total > 0:
            pct = (cat_total / total) * 100
            bar = "█" * int(pct / 5)
            print(f"  {cat:<15} ₹{cat_total:>8,.0f} ({pct:.0f}%) {bar}")
    
    print(f"{'='*40}")
    print(f"  {'TOTAL':<15} ₹{total:>8,.0f}")

# Main loop
while True:
    print("\n EXPENSE TRACKER")
    print("1. Add  2. Summary  3. Exit")
    ch = input("Choice: ")
    if ch == "1": add_expense()
    elif ch == "2": show_summary()
    elif ch == "3": break
```

---

## Assignment 4: Quiz Game 

**Task:** Build an interactive quiz with scoring and timer feel.

```python
questions = [
    {"q": "Who developed Python?", "options": ["James Gosling", "Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup"], "answer": 1},
    {"q": "Are Python lists mutable?", "options": ["True", "False"], "answer": 0},
    {"q": "When was Python 3 released?", "options": ["2000", "2005", "2008", "2010"], "answer": 2},
    {"q": "Where is Python used?", "options": ["Web Development", "AI & Data Science", "Automation", "All of the above"], "answer": 3},
    {"q": "Are tuples immutable?", "options": ["True", "False"], "answer": 0},
]

import random
random.shuffle(questions)

score = 0
total = len(questions)

print(" PYTHON QUIZ")
print(f"Total Questions: {total}\n")

for i, q in enumerate(questions, 1):
    print(f"Q{i}. {q['q']}")
    for j, opt in enumerate(q["options"]):
        print(f"   {j+1}. {opt}")
    
    ans = int(input("Your answer (number): ")) - 1
    
    if ans == q["answer"]:
        score += 1
        print(" Correct!\n")
    else:
        print(f" Wrong! Answer: {q['options'][q['answer']]}\n")

pct = (score / total) * 100
print(f"{'='*30}")
print(f"Score: {score}/{total} ({pct:.0f}%)")
if pct >= 80: print(" Excellent!")
elif pct >= 60: print(" Good job!")
else: print(" Need more practice!")
```

---

:::tip  Assignment Tips
- **Try it yourself first**: Do not look at the solution immediately. Attempt to write it on your own first!
- **Add more features**: Once the basic version works, try adding extra features (like saving data to a file, adding search capabilities, or visual formatting).
- **Include error handling**: Handle invalid or unexpected inputs gracefully so your program doesn't crash.
- **Write clean code**: Use proper variable/function names, clean formatting, and helpful comments.
:::

---

**Next up:** [Timed Challenges →](./timed-challenges)

