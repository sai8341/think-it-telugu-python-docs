---
title: "Module 19: Practice & Interview Q&A - Python in Telugu | Think IT Telugu"
sidebar_label: "Module 19: Practice & Interview Q&A"
description: "Learn about Practice & Interview Q&A in Python with real-world examples. This Think IT Telugu tutorial explains Practice & Interview Q&A easily for AI and Data Science beginners."
keywords: ["Python", "Module 19: Practice & Interview Q&A", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# Module 19: Practice & Interview Q&A

Practice your data science skills and check typical interview questions regarding NumPy, Pandas, and Matplotlib.

---

## 19.5.1 Practice Exercises

1.  **NumPy Math:**
    Create a NumPy array from the list `[10, 15, 20, 25, 30]`. Write a Python script to compute the standard deviation and the mean of this array.
2.  **Pandas Columns & Filtering:**
    Create a CSV file `students.csv` with three columns: `Name,Age,Score`. Write a Pandas script to:
    *   Read the CSV file.
    *   Add 5 bonus points to all student scores (`Score + 5`).
    *   Filter out and print only the students who scored above 80.
3.  **Visualization:**
    Plot a bar chart showing the scores of these students using Matplotlib and save the plot as `student_scores.png`.

---

## 19.5.2 Placement Q&A (Interview Prep)

Test your knowledge with this quick interactive quiz:

<Quiz
  question="Why are NumPy arrays faster than standard Python lists?"
  options={[
    "Because they use multiple processor cores automatically",
    "Because they allocate contiguous memory for homogeneous data types and support vectorization",
    "Because they convert Python code into native Java code",
    "Because they can store different data types inside the same array block"
  ]}
  correctIndex={1}
  explanation="NumPy arrays are stored in contiguous memory blocks and enforce a single homogeneous data type (e.g., all integers or all floats). This allows vectorized operations without the overhead of Python's dynamic type checking and slow item loops."
/>

Click on the questions below to reveal more answers:

<details>
<summary>Q1. Why are NumPy arrays faster than normal Python lists?</summary>
<div>

NumPy arrays are faster because:
*   They store elements of the same data type (homogeneous), allowing contiguous memory allocation.
*   They support vectorization (applying operations to the whole array at once) without requiring slow Python `for` loops.
*   They avoid the memory overhead of storing individual Python object references.

</div>
</details>

<details>
<summary>Q2. What is the difference between a Series and a DataFrame in Pandas?</summary>
<div>

*   **Series:** A one-dimensional labeled array capable of holding data of any type. It represents a single column of data.
*   **DataFrame:** A two-dimensional labeled data structure with columns of potentially different types, resembling an Excel table or database table.

</div>
</details>

<details>
<summary>Q3. What does `df.describe()` do in Pandas?</summary>
<div>

The `describe()` method compiles a quick summary of the numerical columns in a DataFrame, displaying statistical metrics such as count, mean, standard deviation, minimum, maximum, and the 25%, 50%, and 75% percentiles.

</div>
</details>

<details>
<summary>Q4. Why is `plt.savefig()` called before `plt.show()` in Matplotlib?</summary>
<div>

When `plt.show()` is called, it clears the current figure state from memory to release resources. If you call `plt.savefig()` after `plt.show()`, the saved image will be blank because the graph canvas has already been reset.

</div>
</details>