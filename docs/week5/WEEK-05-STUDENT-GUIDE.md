
# 📚 Week 5 Student Guide: Charts & Data Visualization

---


## Review: Week 4 Assignment Solution (DataAnalyzer Component)

Welcome to Week 5! Last week we learned about Data Processing and Analysis. This week we will how we can visualize that data into charts.

Before we start building charts, let's review the solution to last week's assignment. This will help you understand how your analysis work connects to data visualization.

---

### Step 0: Setting Up the Component
- Start by creating a new file called `DataAnalyzer.tsx` in your components folder. Import React hooks and your UI components:
```tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

---

### Step 1: State Setup
Tracks the selected dataset and analysis results.
```tsx
const [analysis, setAnalysis] = useState(null);
const [currentDataset, setCurrentDataset] = useState('temperatures');
const datasets = {
  temperatures: [72, 75, 68, 80, 77, 74, 69, 78, 76, 73],
  testScores: [88, 92, 79, 95, 87, 90, 84, 89, 93, 86],
  salesFigures: [1200, 1450, 980, 1680, 1250, 1520, 1100, 1400]
};
```

### Step 2: Dataset Selection
Lets you choose between temperatures, test scores, or sales figures.
```tsx
<select
  value={currentDataset}
  onChange={(e) => setCurrentDataset(e.target.value)}
  className="w-full p-2 border rounded"
>
  <option value="temperatures">Temperatures (°F)</option>
  <option value="testScores">Test Scores</option>
  <option value="salesFigures">Sales Figures ($)</option>
</select>
```

### Step 3: Analysis Logic
Filters out non-numeric values, calculates all required statistics, and handles errors.
```tsx
const analyzeData = () => {
  const data = datasets[currentDataset];
  const validNumbers = data.filter(item => typeof item === 'number' && !isNaN(item));
  if (validNumbers.length === 0) {
    setAnalysis({ error: 'No valid numbers found' });
    return;
  }
  const sum = validNumbers.reduce((total, num) => total + num, 0);
  const average = sum / validNumbers.length;
  const maximum = Math.max(...validNumbers);
  const minimum = Math.min(...validNumbers);
  const range = maximum - minimum;
  const sorted = [...validNumbers].sort((a, b) => a - b);
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)];
  setAnalysis({
    sum,
    average: Number(average.toFixed(2)),
    maximum,
    minimum,
    range,
    median: Number(median.toFixed(2)),
    count: validNumbers.length
  });
};
```

### Step 4: UI
Dropdown for dataset, button to run analysis, and a grid to display results.
```tsx
<Button onClick={analyzeData} className="w-full">Analyze Data</Button>
{analysis && (
  <div>
    {analysis.error ? (
      <div className="p-3 bg-red-50 text-red-800 rounded">{analysis.error}</div>
    ) : (
      <div className="grid grid-cols-2 gap-3 p-4 bg-blue-50 rounded">
        <div><strong>Count:</strong> {analysis.count}</div>
        <div><strong>Sum:</strong> {analysis.sum}</div>
        <div><strong>Average:</strong> {analysis.average}</div>
        <div><strong>Median:</strong> {analysis.median}</div>
        <div><strong>Maximum:</strong> {analysis.maximum}</div>
        <div><strong>Minimum:</strong> {analysis.minimum}</div>
        <div><strong>Range:</strong> {analysis.range}</div>
        <div><strong>Data Points:</strong> {analysis.count}</div>
      </div>
    )}
  </div>
)}
```

### Step 5: Error Handling
If no valid numbers are found, shows a clear error message.
```tsx
if (validNumbers.length === 0) {
  setAnalysis({ error: 'No valid numbers found' });
  return;
}
```

### Step 6: Result Display
Shows sum, average, min, max, median, range, and count in a readable format.

**Why is this important?**
- This component is the foundation for visualizing your data with charts. You need clean, well-structured data before you can build great visualizations!

---

## Getting Your Starter Code

Before you move on to building charts, make sure you have the starter code ready. Here’s a step-by-step guide for syncing with the template and handling branches:

### 1. Check Your Branches
See what branches you have:
``` 
git branch
```

### 2. Switch to Your Sync Branch
If you created a branch for syncing updates (for example, `sync/merge-template`), switch to it:
```
git checkout sync/merge-template
```
If you haven’t created it yet:
```
git checkout -b "sync/merge-template"
```

### 3. Fetch Latest Changes
Get the latest updates from upstream (the original class repo):
```
git fetch upstream
```

### 4. Pull and Sync With Upstream
Pull the latest changes from upstream’s main branch into your sync branch:
```
git pull upstream main
```

### 5. Resolving Merge Conflicts
If you see a conflict message, open the files listed and look for lines like:
- Go to the file that was flagged 
- Click "resolve in merge editor" blue button
- If you and the incoming changes made an edit to the same line it will be a conflict. You need to pick which change you want to keep.
- Current changes are you changes, incoming change are what are coming from the template
- Pick which edit you would like and then save the file

Once merge conflicts are resolved
- git commit -m "chore: merged upstream"
- git push

If you see an error about upstream not yet set. Run the command the terminal provides


### 6. Merge Into Main
Switch to your main branch:
```
git checkout main
```
Merge your sync branch into main:
```
git merge sync/template
```

### 7. Final Steps
Open your project in VS Code and run:
```sh
npm install
npm run dev
```
This will start your app with the latest template and updates.

---

## 0:00 - 0:10 Welcome & Check-In
- Ice Breaker: "What’s your favorite chart type?"
- Bridge: "Numbers tell stories, but charts make stories visible!"

---

## 0:10 - 0:30 Concept Overview


### Chart Types & Principles



**Bar Chart:**
Shows comparisons between categories. Each bar represents a value for a category.

See official docs: [BarChart](https://recharts.org/en-US/examples/SimpleBarChart)
```jsx
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="sales" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
```



**Line Chart:**
Shows trends over time. Points are connected by lines to show changes.

See official docs: [LineChart](https://recharts.org/en-US/examples/SimpleLineChart)
```jsx
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="sales" stroke="#10b981" />
  </LineChart>
</ResponsiveContainer>
```



**Pie Chart:**
Shows parts of a whole. Each slice represents a percentage of the total.

See official docs: [PieChart](https://recharts.org/en-US/examples/SimplePieChart)
```jsx
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```



**Scatter Chart:**
Shows relationships between two variables. Each dot represents a data point.

See official docs: [ScatterChart](https://recharts.org/en-US/examples/SimpleScatterChart)
```jsx
<ResponsiveContainer width="100%" height={300}>
  <ScatterChart>
    <CartesianGrid />
    <XAxis dataKey="x" name="X" />
    <YAxis dataKey="y" name="Y" />
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    <Scatter name="Sales" data={data} fill="#f59e42" />
  </ScatterChart>
</ResponsiveContainer>
```
---

**General Recharts Documentation:**
- [Recharts Main Docs](https://recharts.org/en-US)

**Best Practices:**
- Keep charts simple
- Use color meaningfully
- Label axes and data
- Make charts responsive

---


### Recharts Component Explanations

**BarChart, LineChart, PieChart, ScatterChart:** Main chart containers for each type.
**Bar, Line, Pie, Scatter:** The actual data series drawn inside the chart.
**XAxis, YAxis:** Axes for labeling and scaling data.
**CartesianGrid:** Adds grid lines for easier reading.
**Tooltip:** Shows data details when you hover over chart elements.
**Legend:** Displays chart series labels (optional).
**ResponsiveContainer:** Makes charts resize automatically to fit their container.

---

### Common Chart Props Explained

- **strokeDasharray**: Controls the pattern of dashes and gaps used to draw lines (e.g., grid lines). `'3 3'` means 3px dash, 3px gap.
- **dataKey**: Specifies which property in your data objects to use for a chart element (e.g., `dataKey="sales"` uses the `sales` value).
- **fill**: Sets the fill color for bars, pie slices, or scatter points (e.g., `fill="#3b82f6"`).
- **stroke**: Sets the color of lines (e.g., `stroke="#10b981"`).
- **type**: For lines, controls the curve style (e.g., `type="monotone"`).
- **cx, cy, outerRadius**: For PieChart, controls the center and size of the pie.
- **nameKey**: For PieChart, sets the label for each slice.
- **Cell**: Used in PieChart to set individual slice colors.

---

### Bar Chart Example
```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 200 }
];
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="sales" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
```

### Line Chart Example
```jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 200 }
];
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="sales" stroke="#10b981" />
  </LineChart>
</ResponsiveContainer>
```

### Pie Chart Example
```jsx
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
const data = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 150 },
  { name: 'Mar', value: 200 }
];
const COLORS = ['#3b82f6', '#10b981', '#f59e42'];
<ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```

### Scatter Chart Example
```jsx
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { x: 1, y: 100 },
  { x: 2, y: 150 },
  { x: 3, y: 200 }
];
<ResponsiveContainer width="100%" height={300}>
  <ScatterChart>
    <CartesianGrid />
    <XAxis dataKey="x" name="X" />
    <YAxis dataKey="y" name="Y" />
    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
    <Scatter name="Sales" data={data} fill="#f59e42" />
  </ScatterChart>
</ResponsiveContainer>
```

---

### Recharts Basics
```jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 200 }
];
<ResponsiveContainer width="100%" height={300}>
  <BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="sales" fill="#3b82f6" />
  </BarChart>
</ResponsiveContainer>
```



### Data Transformation Example

Suppose you have an array of scores:
```js
const scores = [85, 92, 78, 96, 88, 94, 82];
```
To use this data in a chart, you need to convert it into an array of objects, where each object represents a data point:
```js
const chartData = scores.map((score, index) => ({
  student: `Student ${index + 1}`,
  score
}));
// chartData = [
//   { student: 'Student 1', score: 85 },
//   { student: 'Student 2', score: 92 },
//   ...
// ]
```
This format allows you to use `student` for the X axis and `score` for the Y axis in your chart.

**Quiz Solution Example:**
```js
const ages = [21, 25, 19, 30];
const chartData = ages.map((age, idx) => ({
  person: `Person ${idx + 1}`,
  age
}));
```
**Explanation:**
- Start with a simple array of ages: `[21, 25, 19, 30]`.
- Use `.map()` to create a new array of objects, each with a `person` label and an `age` value.
- This lets you use `person` for the X axis and `age` for the Y axis in your chart.
- This transformation is a key step for making your data chart-ready.

---


### Responsive Design
Wrap your chart in a `ResponsiveContainer` so it automatically resizes to fit its parent element:
```jsx
<ResponsiveContainer width="100%" height={300}>
  {/* Chart goes here */}
</ResponsiveContainer>
```
This ensures your chart looks good on any screen size.

---

## 0:30 - 1:15 Build Time: Chart Component


### Step 1: Create SimpleChart.tsx
Create a new file `src/components/SimpleChart.tsx` and import Recharts components:
```jsx
import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
```
Add sample data:
```js
const barLineData = [
  { month: 'Jan', sales: 100 },
  { month: 'Feb', sales: 150 },
  { month: 'Mar', sales: 200 }
];
const pieData = [
  { name: 'Jan', value: 100 },
  { name: 'Feb', value: 150 },
  { name: 'Mar', value: 200 }
];
const scatterData = [
  { x: 1, y: 100 },
  { x: 2, y: 150 },
  { x: 3, y: 200 }
];
const COLORS = ['#3b82f6', '#10b981', '#f59e42'];
```

### Step 2: Add Chart Type Selector
Add buttons to let users choose the chart type:
```jsx
const [chartType, setChartType] = useState('bar');

<div>
  <button onClick={() => setChartType('bar')}>Bar</button>
  <button onClick={() => setChartType('line')}>Line</button>
  <button onClick={() => setChartType('pie')}>Pie</button>
  <button onClick={() => setChartType('scatter')}>Scatter</button>
</div>
```

### Step 3: Render the Selected Chart
Use conditional rendering to show the selected chart:
```jsx
<ResponsiveContainer width="100%" height={300}>
  {chartType === 'bar' && (
    <BarChart data={barLineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="sales" fill="#3b82f6" />
    </BarChart>
  )}
  {chartType === 'line' && (
    <LineChart data={barLineData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="sales" stroke="#10b981" />
    </LineChart>
  )}
  {chartType === 'pie' && (
    <PieChart>
      <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  )}
  {chartType === 'scatter' && (
    <ScatterChart>
      <CartesianGrid />
      <XAxis dataKey="x" name="X" />
      <YAxis dataKey="y" name="Y" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="Sales" data={scatterData} fill="#f59e42" />
    </ScatterChart>
  )}
</ResponsiveContainer>
```

### Step 4: Connect to Real Data
Replace the sample data with results from your DataAnalyzer component:
```js
// Example: transform your analysis results for charting
const chartData = analysisResults.map((result, idx) => ({
  label: result.label,
  value: result.value
}));
```

### Step 5: Customize Styles
Change colors, add labels, and experiment with chart props like `fill`, `stroke`, and `strokeDasharray` to make your chart unique.

---

## 1:15 - 1:45 Group Share & Troubleshooting
- Share your charts
- Compare chart types
- Discuss which chart tells the story best
- Common issues: imports, data format, responsiveness

---

## 1:45 - 2:00 Wrap Up & Next Steps
- Celebrate progress
- Homework: Create a chart with your own data
- Challenge: Add a new chart type or customize your chart
- Preview next week: "Next week, your charts will get smarter with AI insights!"

---

**Tips:**
- Follow along with code examples
- Try each step in your editor
- Ask questions if you’re stuck
- Experiment with chart types and styles
