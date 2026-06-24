---
sidebar_position: 3
title: "Project 3: To-Do List App"
---

#  Project 3: To-Do List Application

## Project Overview 

**Difficulty:**  Intermediate | **Time:** ~1.5 hours | **Concepts:** Lists, File I/O, Functions, CRUD, Date handling

---

## Complete Code 

```python
"""
 Think IT Telugu - To-Do List Application
Capstone Project 3
Task management with priorities and file persistence
"""

import json
import os
from datetime import datetime

TODO_FILE = "todos.json"

def load_todos():
    if os.path.exists(TODO_FILE):
        with open(TODO_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_todos(todos):
    with open(TODO_FILE, "w", encoding="utf-8") as f:
        json.dump(todos, f, indent=2, ensure_ascii=False)

def add_task(todos):
    print("\n ADD NEW TASK")
    title = input("  Task title: ").strip()
    if not title:
        print(" Title cannot be empty!")
        return
    
    print("  Priority: 1. High  2. Medium  3. Low")
    priority_map = {"1": "high", "2": "medium", "3": "low"}
    p_choice = input("  Choose (1-3): ").strip()
    priority = priority_map.get(p_choice, "medium")
    
    category = input("  Category (study/work/personal): ").lower().strip() or "general"
    
    todo = {
        "id": len(todos) + 1,
        "title": title,
        "priority": priority,
        "category": category,
        "done": False,
        "created": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "completed_at": None
    }
    
    todos.append(todo)
    save_todos(todos)
    print(f" Task added: '{title}'")

def view_tasks(todos, show_done=False):
    if not todos:
        print(" No tasks yet! Add one with option 1.")
        return
    
    # Filter
    if show_done:
        filtered = todos
    else:
        filtered = [t for t in todos if not t["done"]]
    
    if not filtered:
        print(" All tasks completed! Great job!")
        return
    
    priority_icons = {"high": "", "medium": "", "low": ""}
    
    print(f"\n{'='*55}")
    print(f"   TO-DO LIST ({len(filtered)} tasks)")
    print(f"{'='*55}")
    
    # Sort by priority
    priority_order = {"high": 0, "medium": 1, "low": 2}
    sorted_todos = sorted(filtered, key=lambda t: (t["done"], priority_order.get(t["priority"], 1)))
    
    for t in sorted_todos:
        icon = priority_icons.get(t["priority"], "")
        status = "" if t["done"] else ""
        title = t["title"]
        if t["done"]:
            title = f"~~{title}~~"
        print(f"  {status} [{t['id']:>2}] {icon} {title} ({t['category']})")
    
    print(f"{'='*55}")
    
    # Stats
    total = len(todos)
    done = sum(1 for t in todos if t["done"])
    pending = total - done
    print(f"   Total: {total} |  Done: {done} |  Pending: {pending}")
    if total > 0:
        progress = (done / total) * 100
        bar = "█" * int(progress / 5) + "░" * (20 - int(progress / 5))
        print(f"   Progress: |{bar}| {progress:.0f}%")

def complete_task(todos):
    view_tasks(todos)
    try:
        task_id = int(input("\n Enter task ID to complete: "))
        for t in todos:
            if t["id"] == task_id and not t["done"]:
                t["done"] = True
                t["completed_at"] = datetime.now().strftime("%Y-%m-%d %H:%M")
                save_todos(todos)
                print(f" '{t['title']}' completed!")
                return
        print(" Task not found or already completed!")
    except ValueError:
        print(" Invalid ID!")

def delete_task(todos):
    view_tasks(todos, show_done=True)
    try:
        task_id = int(input("\n️ Enter task ID to delete: "))
        for i, t in enumerate(todos):
            if t["id"] == task_id:
                confirm = input(f"  Delete '{t['title']}'? (y/n): ").lower()
                if confirm == "y":
                    todos.pop(i)
                    save_todos(todos)
                    print(" Task deleted!")
                return
        print(" Task not found!")
    except ValueError:
        print(" Invalid ID!")

def search_tasks(todos):
    query = input("\n Search: ").lower()
    results = [t for t in todos if query in t["title"].lower() or query in t["category"]]
    
    if results:
        print(f"\n Found {len(results)} result(s):")
        for t in results:
            status = "" if t["done"] else ""
            print(f"  {status} [{t['id']}] {t['title']} ({t['category']})")
    else:
        print(" No matching tasks!")

def clear_completed(todos):
    completed = [t for t in todos if t["done"]]
    if not completed:
        print(" No completed tasks to clear!")
        return
    
    confirm = input(f"️ Clear {len(completed)} completed tasks? (y/n): ").lower()
    if confirm == "y":
        todos[:] = [t for t in todos if not t["done"]]
        save_todos(todos)
        print(f" Cleared {len(completed)} completed tasks!")

def main():
    todos = load_todos()
    
    while True:
        print("""
╔═══════════════════════════════════╗
║     THINK IT TELUGU TO-DO      ║
╠═══════════════════════════════════╣
║  1.  Add Task                  ║
║  2.  View Pending Tasks       ║
║  3.  View All Tasks           ║
║  4.  Complete Task             ║
║  5. ️  Delete Task              ║
║  6.  Search Tasks             ║
║  7.  Clear Completed          ║
║  0.  Exit                     ║
╚═══════════════════════════════════╝
""")
        choice = input("  Choice: ").strip()
        
        if choice == "0":
            pending = sum(1 for t in todos if not t["done"])
            if pending:
                print(f"\n️ You have {pending} pending tasks!")
            print(" Bye! Stay productive! ")
            break
        elif choice == "1": add_task(todos)
        elif choice == "2": view_tasks(todos)
        elif choice == "3": view_tasks(todos, show_done=True)
        elif choice == "4": complete_task(todos)
        elif choice == "5": delete_task(todos)
        elif choice == "6": search_tasks(todos)
        elif choice == "7": clear_completed(todos)
        else: print(" Invalid choice!")
        
        input("\n  Press Enter to continue...")

if __name__ == "__main__":
    main()
```

---

## Concepts Used 

| Concept | Where Used |
|---------|-----------|
| **Lists** | Task storage |
| **Dictionaries** | Individual task records |
| **File I/O (JSON)** | Persistent storage |
| **Functions** | Each operation modular |
| **List Comprehensions** | Filtering, searching |
| **Datetime** | Timestamps |
| **String Methods** | Search, formatting |

---

**Next Project:** [Mini Automation Script →](./mini-automation-script)
