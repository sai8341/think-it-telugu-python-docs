---
title: "Module 15: JSON"
sidebar_label: "Module 15: JSON"
---

# Module 15: JSON

In this module, we will learn about **JSON**. JSON is the most popular format used to send and receive data across the internet between different applications.

---

## 15.1 What is JSON?

**JSON** stands for **JavaScript Object Notation**. It is a lightweight data format that is easy for humans to read and write, and easy for computers to parse.

* **Real World Use:** When you check the weather or score on an app, the data is fetched from a server in the JSON format.
* Python has a built-in module named **`json`** to handle JSON data.

---

## 15.2 JSON Structure

JSON data is structured as key-value pairs, which looks very similar to a Python dictionary.

```json
{
  "name": "Sai Kumar",
  "age": 22,
  "skills": ["Python", "JavaScript"],
  "is_student": false
}
```
### Differences (Python Dictionary vs JSON):
1. In JSON, keys must always use double quotes (`"..."`). Single quotes are invalid.
2. Boolean values in JSON are lowercase (`true`, `false`). In Python, they are capitalized (`True`, `False`).
3. JSON uses `null` to represent nothing, which maps to `None` in Python.

---

## 15.3 Reading JSON

Converting JSON text (usually from the web) into a Python dictionary is called **Deserialization** or **Parsing**. We use `json.loads()` for this.

```python
import json

# JSON text as a string
json_string = '{"name": "Sai", "age": 22, "is_student": true}'

# Parsing JSON string to Python Dictionary
data = json.loads(json_string)

print(type(data)) # Output: <class 'dict'>
print(data["name"]) # Output: Sai
print(data["is_student"]) # Output: True (automatically converted)
```

### Reading from a JSON File:
If the JSON data is stored in a file, use `json.load()`:
```python
with open("user.json", "r") as file:
    data = json.load(file)
    print(data)
```

---

## 15.4 Writing JSON

Converting a Python dictionary into a JSON string is called **Serialization**. We use `json.dumps()` for this.

```python
import json

student_dict = {
    "name": "Ram",
    "age": 25,
    "pass": True
}

# Converting Python Dictionary to JSON String
json_data = json.dumps(student_dict, indent=4) # indent makes it look clean
print(json_data)
print(type(json_data)) # Output: <class 'str'>
```

### Saving to a JSON File:
To save a Python dictionary directly into a file as JSON, use `json.dump()`:
```python
with open("student.json", "w") as file:
    json.dump(student_dict, file, indent=4)
```

---

## 15.5 Why AI Uses JSON

In modern AI development, JSON is extremely important:

1. **Structured Outputs:** When we ask AI models (like Gemini or OpenAI) to generate data, we often tell them to respond in JSON. This makes it easy for our code to parse and use the AI's response.
2. **Function Calling:** AI agents communicate which tools or functions they want to run by sending parameters in the JSON format.
