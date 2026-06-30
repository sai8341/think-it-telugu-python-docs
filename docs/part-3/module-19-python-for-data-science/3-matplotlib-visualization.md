---
title: "Matplotlib Visualization"
sidebar_label: "19.3 Matplotlib DataViz"
---

# Data Visualization with Matplotlib

Numbers are harder to interpret than graphs. **Matplotlib** is the foundation of almost all data visualization libraries in Python, allowing you to plot line charts, bar graphs, histograms, and scatter plots.

---

## 19.3.1 Installing Matplotlib

Open your terminal and install Matplotlib:
```bash
pip install matplotlib
```

---

## 19.3.2 Plotting a Basic Chart

Let us plot the temperature changes over a week:

```python
import matplotlib.pyplot as plt

# 1. Define Data
days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
temperatures = [22, 24, 21, 25, 27, 28, 26]

# 2. Create the Plot
# marker='o' adds circular dots at the data coordinates
plt.plot(days, temperatures, marker='o', color='purple', linestyle='-', label='Temp')

# 3. Add Labels, Legend, and Title
plt.xlabel("Days of the Week")
plt.ylabel("Temperature (°C)")
plt.title("Weekly Temperature Trend")
plt.legend() # Displays the 'Temp' label block

# 4. Save and Show
# Always save the chart before calling plt.show()
plt.savefig("temp_chart.png")
plt.show()
```

---

## 19.3.3 Customizing Your Charts

Professional reports require clean layouts. Here are some options you can configure:

*   **Grid:** Add grid lines for background coordinate reference.
    ```python
    plt.grid(True, alpha=0.3) # alpha adjusts transparency (0 to 1)
    ```
*   **Rotation:** Rotate X-axis coordinate labels if they are long.
    ```python
    plt.xticks(rotation=45)
    ```
*   **Multiple Lines:** Plot multiple lines on the same canvas.
    ```python
    plt.plot(days, min_temps, color='blue', label='Min')
    plt.plot(days, max_temps, color='red', label='Max')
    ```
