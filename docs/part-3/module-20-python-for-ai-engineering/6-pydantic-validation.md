---
title: "Data Validation with Pydantic"
sidebar_label: "20.5 Pydantic & Type Hints"
---

# Data Validation with Pydantic & Type Hints

When building modern **AI Engineering applications** (using OpenAI, Gemini, LangChain, or FastAPI), dealing with raw data dictionaries (`dict`) can lead to severe production bugs. 

Large Language Models (LLMs) and external APIs often return unpredictable or misformatted data. If your AI expects an integer age but receives a string like `"twenty-five"`, a standard Python script will crash!

To build rock-solid, production-grade AI applications, industry leaders rely on **Pydantic** and **Type Hints**.

---

## 1. Why Standard Dictionaries Fail in AI

Consider receiving user profile data from an LLM response or API call:

```python
# Unsafe raw dictionary approach
user_data = {
    "username": "sai_telugu",
    "age": "25",  # Notice this is a String, not an Integer!
    "is_active": "yes"  # Notice this is a String, not a Boolean!
}

# If your code expects an integer age:
next_year_age = user_data["age"] + 1  # ❌ TypeError: can only concatenate str (not "int") to str!
```

Without validation, errors happen deep inside your application where they are hard to track down.

---

## 2. Enter Pydantic: The Security Guard of Data 🛡️

**Pydantic** is Python's most popular data validation library. You define the exact shape and data types your application expects using a **`BaseModel`**, and Pydantic automatically validates, cleans, and converts the data for you!

### Real-Life Analogy: Club Bouncer / Event Security 🎟️

Think of your application as an exclusive VIP event:
* **Raw Dictionary:** Letting anyone walk into the event without checking IDs. People might bring illegal items or enter the wrong room.
* **Pydantic `BaseModel`:** A strict, professional **Bouncer at the entrance**. The bouncer checks ID cards, verifies ages, ensures proper dress code, and denies entry immediately if something is wrong!

---

## 3. Creating Your First Pydantic Model

You can install Pydantic easily using standard package managers:
```bash
pip install pydantic
```

Here is how Pydantic protects and transforms your data:

```python
from pydantic import BaseModel, EmailStr, Field

# 1. Define the Blueprint (Schema)
class UserProfile(BaseModel):
    username: str
    age: int = Field(gt=0, description="Age must be greater than 0")
    email: str
    is_active: bool = True  # Default value if not provided

# 2. Simulate messy data received from an AI or User Input
incoming_data = {
    "username": "sai_kumar",
    "age": "25",          # Pydantic will auto-convert string "25" -> int 25!
    "email": "sai@example.com",
    "is_active": "true"   # Pydantic will auto-convert string "true" -> bool True!
}

# 3. Validate and Parse
validated_user = UserProfile(**incoming_data)

print("Validated Username:", validated_user.username)
print("Validated Age (Next Year):", validated_user.age + 1)  # ✅ Perfectly works: 26!
print("Is Active Status:", type(validated_user.is_active), validated_user.is_active)
```

### What happens if bad data is sent?

If someone sends `"age": "invalid_number"`, Pydantic immediately halts execution and raises a very clear `ValidationError` explaining exactly which field failed and why.

---

## 4. Why Pydantic is the Core of Modern AI Stack

If you look at world-class AI frameworks, Pydantic is everywhere:

1. **Structured LLM Outputs (Function Calling / Tool Use):**
   When asking models like OpenAI or Google Gemini to return JSON data (e.g., extracting flight booking details from a chat), you feed them a Pydantic `BaseModel`. The AI uses your model definition to guarantee structured, reliable JSON output.
2. **FastAPI Backend Servers:**
   FastAPI uses Pydantic models to automatically validate incoming HTTP API requests and generate interactive OpenAPI / Swagger documentation.
3. **LangChain & LlamaIndex:**
   Data retrieval schemas and agent workflows use Pydantic to pass verified messages between multi-agent systems.

---

## Summary Checklist

* Always use **Type Hints** (`str`, `int`, `bool`) to make your code readable and self-documenting.
* Replace fragile dictionaries with **Pydantic `BaseModel`** whenever handling API inputs, database records, or LLM responses.
* Remember: *Clean data in, reliable AI out!*
