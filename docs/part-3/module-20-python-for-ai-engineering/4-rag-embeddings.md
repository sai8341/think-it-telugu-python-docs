---
title: "RAG & Vector Databases"
sidebar_label: "20.4 RAG & Vector DBs"
---

# RAG & Vector Databases

Large Language Models (LLMs) are trained on general internet data up to a specific date. They do not know about:
1.  **Private data:** Your internal company codebase, personal documents, or student profiles.
2.  **Real-time information:** News events that occurred after the model was trained.

To solve this without spending millions of dollars retraining the model, we use **RAG (Retrieval-Augmented Generation)**.

---

## 20.4.1 What is RAG?

RAG is a design pattern where we search an external database to retrieve relevant context files matching a user's question, and then prepend that context directly into the prompt sent to the LLM.

```text
                  ┌──────────────────────┐
                  │   Private PDF Docs   │
                  └──────────┬───────────┘
                             │
                             ▼
  [ User Prompt ] ──> [ Retrieve Context ] ──> [ Combined Prompt ] ──> [ LLM API ] ──> [ Answer ]
```

---

## 20.4.2 The RAG Architecture Steps

Building a RAG application involves four main steps:

### 1. Document Chunking
Long documents (like a 100-page PDF manual) are too large to fit inside a single prompt. We split the text into smaller, overlapping segments called **chunks** (e.g., 500 characters each).

### 2. Vector Embeddings
We convert each text chunk into a list of floating-point numbers (a vector) using an embedding model.
*   **What is an Embedding?** It is a mathematical representation of the semantic meaning of the text. Sentences with similar meanings (e.g., *"Python is great"* and *"I love coding in Python"*) will have vectors that point in nearly the same direction in vector space.

### 3. Vector Databases (e.g., ChromaDB, Pinecone)
We store these embedding vectors inside a specialized **Vector Database**. Unlike traditional databases that search for exact word matches, vector databases search for **semantic similarity** (meaning matches).

### 4. Query & Generation
When a user asks a question:
1.  The question is converted into a vector.
2.  The vector database retrieves the top 3 most similar text chunks.
3.  The chunks are appended to the LLM prompt:
    ```text
    Answer the user query based ONLY on the provided context details.
    Context: {Retrieved_Chunks}
    User Query: {User_Question}
    ```
4.  The LLM generates an accurate response based on your private data!
