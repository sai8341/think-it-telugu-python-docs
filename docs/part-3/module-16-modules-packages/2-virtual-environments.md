---
title: "Virtual Environments"
sidebar_label: "16.2 Virtual Environments"
---

# Virtual Environments (venv)

When building Python applications, different projects often require different versions of the same external library. If you install all packages globally, upgrading a library for Project A might break Project B.

To solve this, we use **Virtual Environments** (`venv`) to create isolated python workspace folders for each project.

---

## 16.2.1 Why Use an Isolated Environment?

```text
Global Python Installation (pip global)
   ├── Project A (requires requests v2.20)  <── Conflict!
   └── Project B (requires requests v2.30)  <── Conflict!

With Virtual Environments:
   ├── Project A ── [venv A] ── requests v2.20 (Isolated)
   └── Project B ── [venv B] ── requests v2.30 (Isolated)
```

By isolating environments, you guarantee that your project behaves exactly the same way, regardless of what other software is installed on your computer.

---

## 16.2.2 Setup Guide: Step-by-Step

### Step 1: Create the Virtual Environment
Open your terminal inside your project directory and run:
```bash
# Creates a folder named "myenv" containing isolated Python and pip binaries
python -m venv myenv
```

### Step 2: Activate the Environment
Before you can use the environment, you must activate it. Run the command matching your operating system:

*   **Windows (PowerShell):**
    ```bash
    .\myenv\Scripts\Activate.ps1
    ```
*   **Windows (Command Prompt):**
    ```cmd
    .\myenv\Scripts\activate.bat
    ```
*   **macOS / Linux (Terminal):**
    ```bash
    source myenv/bin/activate
    ```

:::note Visual Check
Once activated, you will see `(myenv)` displayed in parentheses at the beginning of your terminal prompt line. This confirms that all packages you install now will go to your isolated workspace!
:::

### Step 3: Deactivate the Environment
If you want to leave the isolated environment and return to your global computer environment, run:
```bash
deactivate
```
This restores your terminal back to the standard global Python path.
