---
sidebar_position: 2
title: "Project 2: Student Management System"
---

#  Project 2: Student Management System

## Project Overview 

**Difficulty:**  Intermediate | **Time:** ~2 hours | **Concepts:** OOP, File I/O, Dictionaries, CRUD Operations

> In the real world, companies and colleges use Student Management Systems to keep track of admissions, marks, and attendance. Building this project will strengthen your understanding of Object-Oriented Programming (OOP) and file handling in Python!

---

## Complete Code 

```python
"""
 Think IT Telugu - Student Management System
Capstone Project 2
OOP-based student records with file persistence
"""

import json
import os
from datetime import datetime

DATA_FILE = "students_data.json"

class Student:
    """Individual student record"""
    
    def __init__(self, roll, name, branch, year, marks=None):
        self.roll = roll
        self.name = name
        self.branch = branch
        self.year = year
        self.marks = marks or {}
        self.created_at = datetime.now().strftime("%Y-%m-%d")
    
    def add_marks(self, subject, score):
        if 0 <= score <= 100:
            self.marks[subject] = score
            return True
        return False
    
    def get_percentage(self):
        if not self.marks:
            return 0
        return sum(self.marks.values()) / len(self.marks)
    
    def get_grade(self):
        pct = self.get_percentage()
        if pct >= 90: return "A+"
        elif pct >= 80: return "A"
        elif pct >= 70: return "B"
        elif pct >= 60: return "C"
        elif pct >= 35: return "D"
        else: return "F"
    
    def to_dict(self):
        return {
            "roll": self.roll, "name": self.name,
            "branch": self.branch, "year": self.year,
            "marks": self.marks, "created_at": self.created_at
        }
    
    @staticmethod
    def from_dict(data):
        s = Student(data["roll"], data["name"], data["branch"], data["year"], data["marks"])
        s.created_at = data.get("created_at", "N/A")
        return s
    
    def display(self):
        pct = self.get_percentage()
        grade = self.get_grade()
        print(f"\n{'='*40}")
        print(f"   Roll: {self.roll} | {self.name}")
        print(f"{'='*40}")
        print(f"  Branch  : {self.branch}")
        print(f"  Year    : {self.year}")
        print(f"  Added   : {self.created_at}")
        if self.marks:
            print(f"  {'─'*36}")
            for sub, mark in self.marks.items():
                bar = "█" * (mark // 5) + "░" * (20 - mark // 5)
                status = "" if mark >= 35 else ""
                print(f"  {status} {sub:<12} {mark:>3} |{bar}|")
            print(f"  {'─'*36}")
            print(f"  Percentage: {pct:.1f}%")
            print(f"  Grade     : {grade}")
        else:
            print(f"  ️ No marks recorded yet")
        print(f"{'='*40}")


class StudentManager:
    """Manage all student operations"""
    
    def __init__(self):
        self.students = {}
        self.load_data()
    
    def load_data(self):
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, "r") as f:
                data = json.load(f)
                for roll, sdata in data.items():
                    self.students[roll] = Student.from_dict(sdata)
            print(f" Loaded {len(self.students)} students from file")
    
    def save_data(self):
        data = {roll: s.to_dict() for roll, s in self.students.items()}
        with open(DATA_FILE, "w") as f:
            json.dump(data, f, indent=2)
    
    def add_student(self):
        print("\n ADD NEW STUDENT")
        roll = input("  Roll Number: ").strip()
        if roll in self.students:
            print(" Roll number already exists!")
            return
        
        name = input("  Name: ").strip()
        branch = input("  Branch (CSE/ECE/EEE/MECH): ").upper().strip()
        year = int(input("  Year (1-4): "))
        
        student = Student(roll, name, branch, year)
        
        add_marks = input("  Add marks now? (y/n): ").lower()
        if add_marks == "y":
            subjects = ["Maths", "Physics", "Chemistry", "English", "CS"]
            for sub in subjects:
                score = int(input(f"    {sub} marks (0-100): "))
                student.add_marks(sub, score)
        
        self.students[roll] = student
        self.save_data()
        print(f" Student '{name}' added successfully!")
    
    def view_student(self):
        roll = input("\n Enter Roll Number: ").strip()
        if roll in self.students:
            self.students[roll].display()
        else:
            print(" Student not found!")
    
    def view_all(self):
        if not self.students:
            print(" No students registered!")
            return
        
        print(f"\n ALL STUDENTS ({len(self.students)})")
        print(f"{'Roll':<8}{'Name':<15}{'Branch':<8}{'Year':<6}{'Avg':>6}{'Grade':>6}")
        print("─" * 50)
        
        for roll, s in sorted(self.students.items()):
            avg = s.get_percentage()
            grade = s.get_grade() if s.marks else "N/A"
            print(f"{roll:<8}{s.name:<15}{s.branch:<8}{s.year:<6}{avg:>5.1f}{'':>1}{grade:>5}")
    
    def update_marks(self):
        roll = input("\n Enter Roll Number: ").strip()
        if roll not in self.students:
            print(" Student not found!")
            return
        
        student = self.students[roll]
        print(f"  Updating marks for: {student.name}")
        subject = input("  Subject: ")
        score = int(input("  Marks (0-100): "))
        
        if student.add_marks(subject, score):
            self.save_data()
            print(f" Marks updated!")
        else:
            print(" Invalid marks (0-100 only)!")
    
    def delete_student(self):
        roll = input("\n️ Enter Roll Number to delete: ").strip()
        if roll in self.students:
            name = self.students[roll].name
            confirm = input(f"  Delete '{name}'? (y/n): ").lower()
            if confirm == "y":
                del self.students[roll]
                self.save_data()
                print(f" '{name}' deleted!")
        else:
            print(" Student not found!")
    
    def search_students(self):
        query = input("\n Search (name/branch): ").lower().strip()
        results = [s for s in self.students.values() 
                   if query in s.name.lower() or query in s.branch.lower()]
        
        if results:
            print(f"\n Found {len(results)} result(s):")
            for s in results:
                print(f"   {s.roll} - {s.name} ({s.branch}, Year {s.year})")
        else:
            print(" No matches found!")
    
    def show_toppers(self):
        if not self.students:
            print(" No students!")
            return
        
        ranked = sorted(
            [s for s in self.students.values() if s.marks],
            key=lambda s: s.get_percentage(),
            reverse=True
        )[:5]
        
        print("\n TOP 5 STUDENTS")
        medals = {0: "", 1: "", 2: "", 3: "4️⃣", 4: "5️⃣"}
        for i, s in enumerate(ranked):
            print(f"  {medals[i]} {s.name} - {s.get_percentage():.1f}% (Grade: {s.get_grade()})")


def main():
    manager = StudentManager()
    
    while True:
        print("""
╔══════════════════════════════════════╗
║   STUDENT MANAGEMENT SYSTEM      ║
╠══════════════════════════════════════╣
║  1.  Add Student                  ║
║  2. ️  View Student                ║
║  3.  View All Students           ║
║  4.  Update Marks                ║
║  5. ️  Delete Student              ║
║  6.  Search                       ║
║  7.  Top Students                ║
║  0.  Exit                        ║
╚══════════════════════════════════════╝
""")
        choice = input("  Choice: ").strip()
        
        actions = {
            "1": manager.add_student,
            "2": manager.view_student,
            "3": manager.view_all,
            "4": manager.update_marks,
            "5": manager.delete_student,
            "6": manager.search_students,
            "7": manager.show_toppers,
        }
        
        if choice == "0":
            print("\n Goodbye! Keep learning! ")
            break
        elif choice in actions:
            actions[choice]()
        else:
            print(" Invalid choice!")
        
        input("\n  Press Enter to continue...")

if __name__ == "__main__":
    main()
```

---

## Concepts Used 

| Concept | Where Used |
|---------|-----------|
| **OOP (Classes)** | Student, StudentManager classes |
| **File I/O (JSON)** | Data persistence |
| **Dictionaries** | Student storage, marks |
| **Error Handling** | Input validation |
| **Static Methods** | `from_dict()` factory method |
| **List Comprehensions** | Search, filtering |
| **Sorting** | Top students ranking |

---

**Next Project:** [To-Do List App →](./todo-list-app)
