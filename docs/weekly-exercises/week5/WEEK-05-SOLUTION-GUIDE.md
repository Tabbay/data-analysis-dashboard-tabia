# Week 5 Solution Guide: SimpleChart Component Assignment

## Assignment Requirements
Create a new component:

- **File:** `src/components/SimpleChart.tsx`
- **Use sample data (array of objects) to start.**
- **Render at least two chart types:**
  - Bar chart
  - Line chart
  - (Bonus: Pie or Scatter chart)
- **Chart Features:**
  - Responsive design (use ResponsiveContainer)
  - Chart type selector (buttons or dropdown)
  - Custom colors and labels
  - Tooltip for data details
- **Connect to real data:**
  - Use results from your DataAnalyzer component (Week 4)
  - Transform data for charting
- **Error Handling:**
  - Show a message if data is missing or invalid
- **Bonus Challenges (optional):**
  - Add a pie or scatter chart
  - Allow user to upload their own data
  - Add chart legend and custom tooltips

---

## Solution Code
```tsx
import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

// Sample data (replace with DataAnalyzer results for real data)
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const SimpleChart = ({ data = sampleData }) => {
  const [chartType, setChartType] = useState("Bar");

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available for charting.</div>;
  }

  return (
    <div style={{ width: "100%", height: 350 }}>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setChartType("Bar")}>Bar Chart</button>
        <button onClick={() => setChartType("Line")}>Line Chart</button>
        <button onClick={() => setChartType("Pie")}>Pie Chart</button>
        <button onClick={() => setChartType("Scatter")}>Scatter Chart</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {(() => {
          switch (chartType) {
            case "Bar":
              return (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              );
            case "Line":
              return (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#00C49F" />
                </LineChart>
              );
            case "Pie":
              return (
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#FFBB28"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              );
            case "Scatter":
              return (
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis dataKey="name" type="category" />
                  <YAxis dataKey="value" />
                  <Tooltip />
                  <Legend />
                  <Scatter name="Values" data={data} fill="#A28EFF" />
                </ScatterChart>
              );
            default:
              return null;
          }
        })()}
      </ResponsiveContainer>
    </div>
    );
 };

export default SimpleChart;
```

## Bonus Challenge
- Try adding error handling for empty data.
- Customize colors or chart type selector.
- Make the component reusable for any dataset.

## Detailed Explanations for Students

### Why Did We Use a Chart Type Switch?
We used a chart type selector (buttons) to let users switch between different chart types (Bar, Line, Pie, Scatter). This makes the component interactive and flexible, allowing users to view their data in multiple ways. Each chart type is rendered using the appropriate Recharts component, and the selected chart type is tracked using React's `useState`. This approach is scalable—if you want to add more chart types in the future, you can simply add another button and chart rendering block.


**Why did we use a switch/case statement in the code?**
- A switch/case statement is a way for the code to choose what to do based on the value of a variable—in this case, which chart type the user selected.
- Instead of writing a bunch of if/else statements, switch/case lets us organize the code so that each chart type (Bar, Line, Pie, Scatter) has its own block.
- When the user clicks a button to select a chart type, the code checks the value and runs the matching block to render the right chart.
- This makes the code easier to read, maintain, and extend. If you want to add more chart types, you just add another case.

### Error Handling
The component checks if the data is missing, invalid, or empty before rendering any chart. If the data is not available or is not an array, it displays a clear error message to the user. This prevents the app from crashing and helps users understand what went wrong. Good error handling is essential for building robust, user-friendly applications.

### Responsive Design
We use Recharts' `ResponsiveContainer` to ensure the chart resizes automatically for any screen size. This is important for modern web apps, which are used on desktops, tablets, and phones.

### Custom Colors, Labels, and Tooltips
Custom colors are applied to chart elements for better visual distinction. Labels and tooltips provide extra information about the data, making the charts more informative and user-friendly. Legends help users understand what each color or symbol represents.

### Connecting to Real Data
While the example uses sample data, the component is designed to accept any data array. You can connect it to the output of your DataAnalyzer component (from Week 4) to visualize real analysis results. This demonstrates how to make reusable, data-driven components in React.

### Assignment Requirements Recap
- Create a new chart component
- Use sample data (array of objects)
- Render at least two chart types (Bar, Line; bonus: Pie, Scatter)
- Responsive design
- Chart type selector
- Custom colors, labels, tooltips
- Connect to real data
- Error handling for missing/invalid data
- Bonus: Pie/Scatter chart, user data upload, custom legend/tooltips