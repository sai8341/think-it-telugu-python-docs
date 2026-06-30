---
title: "Package Management & uv"
sidebar_label: "16.3 Packages & uv"
---

# Package Management & Astral's uv

A **Package** is a collection of related modules grouped inside a folder. The official repository where developers publish Python packages is called **PyPI** (Python Package Index).

---

## 16.3.1 Installing Packages with pip

**`pip`** is the default package manager built into Python. You can search, download, and install external libraries using single terminal commands:

```bash
# Install a package (e.g., requests)
pip install requests

# Install a specific version
pip install requests==2.31.0

# Export installed packages list to a file
pip freeze > requirements.txt

# Install all packages listed in requirements.txt
pip install -r requirements.txt
```

---

## 16.3.2 The Modern Standard: Astral's uv

In professional AI engineering setups, developers are replacing standard `pip` and `venv` tools with **`uv`** (an ultra-fast Python package installer and resolver written in Rust).

*   **Why `uv`?** It is up to 10-100x faster than `pip` and manages python versions, virtual environments, and project configurations automatically under a single tool.

### Core `uv` Workflow Commands:

1.  **Initialize a new project:**
    ```bash
    uv init my-project
    ```
    This automatically creates a standard directory structure along with a config file named `pyproject.toml` (which replaces `requirements.txt` and manages configuration settings in one place).

2.  **Add a package:**
    ```bash
    uv add requests
    ```
    *(This automatically creates a virtual environment folder `.venv` if one does not exist, downloads the package, and updates the `pyproject.toml` dependencies file).*

3.  **Run scripts safely:**
    ```bash
    uv run python main.py
    ```
    *(This runs your script utilizing the project's isolated environment automatically without requiring you to run manual activation scripts).*
    
4.  **Manage global tool CLI tools:**
    ```bash
    uv tool install black
    ```
