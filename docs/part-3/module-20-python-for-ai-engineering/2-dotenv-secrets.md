---
title: "Secrets Management"
sidebar_label: "20.2 Secrets & Dotenv"
---

# Secrets Management in AI Engineering

To access AI provider APIs, you are issued private **API Keys**. Because these keys represent your identity and can incur financial charges, **you must never hardcode API keys in your source code.**

If you push raw keys to public repositories like GitHub, automated scrapers will steal them within seconds. Instead, we use **Environment Variables**.

---

## 20.2.1 Storing Keys in a `.env` File

Create a file named exactly **`.env`** in the root of your project directory:

```text
# .env
GEMINI_API_KEY=AIzaSyYourPrivateAPIKeyHere
MODEL_NAME=gemini-1.5-flash
```

:::warning Safety First
Make sure `.env` is added to your `.gitignore` file so Git never tracks or uploads it online!
:::

---

## 20.2.2 Reading Keys in Python using python-dotenv

To read these variables in your code, we use the `python-dotenv` library.

### Installation:
```bash
pip install python-dotenv
```

### Python Script (`app.py`):
```python
import os
from dotenv import load_dotenv

# 1. Load variables from the local .env file into the system environment
load_dotenv()

# 2. Retrieve variables using os.getenv or os.environ.get
api_key = os.getenv("GEMINI_API_KEY")
model_name = os.getenv("MODEL_NAME", "gemini-1.5-flash") # Supports default fallbacks

if not api_key:
    print("❌ Error: API Key missing from environment configurations.")
    exit(1)

print("✅ Credentials verified successfully!")
print("Selected AI model:", model_name)
```

---

## 20.2.3 Creating `.env.example`

Since your `.env` file is hidden from Git, other developers cloning your repository won't know what configuration keys they need. To guide them, create and commit a file named **`.env.example`**:

```text
# .env.example
GEMINI_API_KEY=your-api-key-here
MODEL_NAME=gemini-1.5-flash
```
Other developers can copy this file, rename it to `.env`, and fill in their own private credentials.
