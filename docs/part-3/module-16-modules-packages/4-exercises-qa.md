---
title: "Module 16: Practice & Interview Q&A - Python in Telugu | Think IT Telugu"
sidebar_label: "Module 16: Practice & Interview Q&A"
description: "Learn about Practice & Interview Q&A in Python with real-world examples. This Think IT Telugu tutorial explains Practice & Interview Q&A easily for AI and Data Science beginners."
keywords: ["Python", "Module 16: Practice & Interview Q&A", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# Module 16: Practice & Interview Q&A

Test your understanding of modules, packages, and virtual environments with these hands-on exercises and placement preparation questions.

---

## 16.4.1 Practice Exercises

1.  **Custom Math Module:**
    Create a file named `shapes.py` with functions to calculate the area of a circle (`circle_area(radius)`) and a square (`square_area(side)`). Import this module inside a separate `app.py` file, call both functions with custom inputs, and print the results.
2. **Local Environment Isolation:**
    Create a new directory named `project-demo`. Open a terminal inside it, create a virtual environment named `venv-test`, activate it, install `requests`, and export the details to a `requirements.txt` file. Finally, deactivate the environment.

---

## 16.4.2 Placement Q&A (Interview Prep)

Click on the questions below to reveal the answers:

<details>
<summary>Q1. What is the difference between a Module and a Package in Python?</summary>
<div>

*   **Module:** A single Python file (`.py` file) containing variables, functions, and classes that can be imported.
*   **Package:** A folder directory that contains multiple modules, along with a special `__init__.py` file (which can be empty) indicating to Python that the folder should be treated as an importable package.

</div>
</details>

<details>
<summary>Q2. What is PyPI, and how does it relate to pip?</summary>
<div>

*   **PyPI (Python Package Index):** The official cloud-based public repository where Python developers publish their open-source libraries.
*   **pip:** The CLI package manager tool that downloads and installs those libraries from the PyPI repository onto your local computer.

</div>
</details>

<details>
<summary>Q3. Why are virtual environments critical in professional Python development?</summary>
<div>

Virtual environments prevent dependency conflicts by creating isolated package installations for each project. For instance, if Project A requires an older version of a package and Project B requires a newer version, virtual environments allow both versions to coexist on the same computer without interfering with each other.

</div>
</details>

<details>
<summary>Q4. What is the role of the requirements.txt file?</summary>
<div>

A `requirements.txt` file acts as a manifest list of all external dependencies and versions used in a project. Running `pip freeze > requirements.txt` saves this list, and other developers can run `pip install -r requirements.txt` to instantly install the exact same packages, ensuring environment reproducibility across machines.

</div>
</details>