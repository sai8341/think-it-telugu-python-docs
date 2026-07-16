---
title: "Project: Weather Data Analyzer App - Python in Telugu | Think IT Telugu"
sidebar_label: "Project: Weather Data Analyzer App"
description: "Learn about Weather Data Analyzer App in Python with real-world examples. This Think IT Telugu tutorial explains Weather Data Analyzer App easily for AI and Data Science beginners."
keywords: ["Python", "Project: Weather Data Analyzer App", "Telugu tutorial", "Learn Python in Telugu", "AI", "Data Science"]
---

# Project: Weather Data Analyzer App

Now, let us bring everything we have learned together. We will build a data pipeline script that:
1.  Calls a free Web API (`Open-Meteo`) to fetch Paris weather data for the past 7 days.
2.  Loads the JSON response into a Pandas DataFrame table.
3.  Calculates an additional calculated column (`Avg_Temp`).
4.  Plots a line chart showcasing Max, Min, and Avg temperatures.
5.  Saves the chart as a `.png` file and the dataset as a `.csv` spreadsheet.

---

## 19.4.1 Project Directory Structure

Ensure your directory contains a `data` folder (the script will create it if missing):
```text
weather-app/
├── weather_analyzer.py
└── data/
    ├── weather_chart.png   (Generated)
    └── paris_weather.csv   (Generated)
```

---

## 19.4.2 Complete Script (`weather_analyzer.py`)

Create a script and write the following code:

```python
import requests
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import os

# Step 1: Calculating Date Ranges
today = datetime.now()
week_ago = today - timedelta(days=7)

start_date = week_ago.strftime("%Y-%m-%d")
end_date = today.strftime("%Y-%m-%d")

# Step 2: Fetch Weather Data from API
latitude = 48.85 # Paris
longitude = 2.35

url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&start_date={start_date}&end_date={end_date}&daily=temperature_2m_max,temperature_2m_min"

print("📡 Fetching weather data from API...")
response = requests.get(url)

if response.status_code != 200:
    print("❌ Error fetching data")
    exit(1)

data = response.json()
daily_data = data['daily']

# Step 3: Load & Process Data in Pandas
df = pd.DataFrame({
    'Date': pd.to_datetime(daily_data['time']),
    'Max_Temp': daily_data['temperature_2m_max'],
    'Min_Temp': daily_data['temperature_2m_min']
})

# Calculate Average Temperature column
df['Avg_Temp'] = (df['Max_Temp'] + df['Min_Temp']) / 2
print("\n📊 Processed Weather DataFrame:")
print(df)

# Step 4: Create Data Visualization Chart
print("\n📈 Plotting weather trends...")
plt.figure(figsize=(10, 6))
plt.plot(df['Date'], df['Max_Temp'], 'r-o', label='Max Temp')
plt.plot(df['Date'], df['Min_Temp'], 'b-o', label='Min Temp')
plt.plot(df['Date'], df['Avg_Temp'], 'g--', label='Average Temp')

# Styling the graph
plt.xlabel('Date')
plt.ylabel('Temperature (°C)')
plt.title('Paris Weather History - Past 7 Days')
plt.legend()
plt.grid(True, alpha=0.3)
plt.xticks(rotation=45)
plt.tight_layout()

# Step 5: Save Files Locally
if not os.path.exists('data'):
    os.makedirs('data')

# Save PNG and CSV
plt.savefig('data/weather_chart.png')
df.to_csv('data/paris_weather.csv', index=False)

print("\n✅ Execution completed successfully! Saved:")
print("- data/weather_chart.png")
print("- data/paris_weather.csv")
print(f"Mean Weekly Temp: {df['Avg_Temp'].mean():.2f}°C")
```