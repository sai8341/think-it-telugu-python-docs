---
title: "Python for AI Engineering"
sidebar_label: "20.1 AI APIs & Requests"
---

# AI Engineering & REST APIs

As an **AI Engineer**, you do not spend weeks compiling terabytes of data to train a Large Language Model (LLM) from scratch. Instead, you utilize pre-trained models (like Google Gemini, Claude, or GPT) via **APIs** and integrate them with databases, user interfaces, and business logic.

---

## 20.1.1 What is an API?

An **API (Application Programming Interface)** is a bridge that allows different software applications to talk to one another. When building AI apps:
1.  Your Python code sends a **request** containing a user's prompt to the AI provider's server.
2.  The provider's server processes the prompt through their LLM.
3.  Their server sends back a **response** containing the generated text answer.

---

## 20.1.2 Request Types: GET vs. POST

Web APIs use standard HTTP request methods to transfer data:

*   **GET Request:** Used to retrieve data *from* a server. All parameters are passed directly inside the URL query string (e.g., fetching weather forecasts).
*   **POST Request:** Used to send data *to* a server to create or process something. AI APIs always use **POST** requests because prompts are long, complex, and need to be sent securely inside the request body.

---

## 20.1.3 HTTP Headers & Bearer Tokens

When sending a POST request to an AI provider, your request must include **HTTP Headers** to provide metadata:

1.  **`Content-Type: application/json`:** Tells the server that the request body is formatted as a JSON object.
2.  **`Authorization: Bearer YOUR_API_KEY`:** Authenticates your request. The API key behaves like a passport, identifying you and checking if you have permissions to use the model.

---

## 20.1.4 API Payloads (JSON)

An API payload is the data block sent inside the request body. In AI, this is formatted as a **JSON** object (which is read in Python as a nested dictionary):

```json
{
  "model": "gemini-1.5-flash",
  "contents": [
    {
      "parts": [
        {"text": "Write a 3-word poem about coding."}
      ]
    }
  ]
}
```

The server processes this JSON body, runs the prompt, and returns a JSON response containing the generated text answer.
