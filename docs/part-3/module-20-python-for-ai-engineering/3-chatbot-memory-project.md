---
title: "Project: Chatbot with Memory"
sidebar_label: "20.3 AI Chatbot Project"
---

# Project: Interactive Chatbot with Memory

When you call an AI API directly, the model evaluates your prompt in isolation. It does not remember what you asked in the previous sentence. To build a conversational chatbot, we must preserve and send the chat history along with each new prompt.

In this project, we will use the official Google Generative AI SDK to build an interactive terminal chatbot.

---

## 20.3.1 Installing the SDK

First, install the Google Generative AI package:
```bash
pip install google-generativeai python-dotenv
```

Make sure your `.env` file contains your credentials:
```text
GEMINI_API_KEY=AIzaSyYourActualAPIKey
```

---

## 20.3.2 Chatbot Script (`chatbot.py`)

Create a script and write the following code:

```python
import os
from dotenv import load_dotenv
import google.generativeai as genai

# 1. Load Configurations
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    print("❌ Error: GEMINI_API_KEY not found in the environment configurations.")
    exit(1)

# 2. Configure SDK
genai.configure(api_key=API_KEY)

# 3. Initialize the Model and Chat Session
# We start with an empty history list. The SDK will automatically append messages.
model = genai.GenerativeModel('gemini-1.5-flash')
chat = model.start_chat(history=[])

print("====================================================")
print("🤖 Think IT Telugu AI Chatbot is Online!")
print("Write your questions. Type 'exit' to quit.")
print("====================================================")

while True:
    # Get user message input
    user_input = input("\nYou: ")
    
    # Check for exit condition
    if user_input.lower() == 'exit':
        print("🤖 Chatbot: Goodbye! Keep learning.")
        break
    
    # Ignore empty inputs
    if not user_input.strip():
        continue
    
    try:
        # Send user message. The SDK updates conversation history internally.
        response = chat.send_message(user_input)
        print(f"\nAI: {response.text}")
        
    except Exception as e:
        print(f"\n❌ API Error: {e}")
```

---

## 20.3.3 How Conversation History Works Under the Hood

If you inspect `chat.history`, you will see that it contains a list of dictionary-like structures tracking roles and contents:
```python
[
  {"role": "user", "parts": ["Hi, my name is Sai."]},
  {"role": "model", "parts": ["Hello Sai! How can I help you today?"]},
  {"role": "user", "parts": ["What is my name?"]}
]
```
By feeding this accumulated list back to the API during every turn, the AI maintains context and correctly answers: *"Your name is Sai!"*
