---
# 📚 Week 4 Student Guide: Data Processing & Analysis

## Learning Objectives
By the end of this week, you will:
- Understand JavaScript array methods (`map`, `filter`, `reduce`)
- Process and analyze numerical data
- Calculate statistics (average, min, max, sum, median)
- Handle edge cases and errors
- Build a complete data analysis component

---

## 0:00 - 0:10: Welcome & Check-In
- Ice Breaker: "What's the most interesting data you've worked with?"
- Examples: Sports stats, grades, social media, weather, sales
- Bridge: "You've learned to collect data with forms. Now let's analyze it!"

---

## Step-by-Step Example: NameInput Solution

**Simpler Example: Basic Name Input**

**Description:**
This example is designed for beginners who are new to React forms. It shows how to:
- Create a text input that is connected to React state (a "controlled component")
- Check if the user's input is valid (at least 2 characters)
- Show helpful error messages when the input is invalid
- Display a friendly greeting when the input is valid
- Reset the form with a Clear button

By practicing with this example, you'll learn the basics of handling user input, validating data, and giving feedback to users in a React app. This is a great foundation for building more advanced forms later!

```tsx
import { useState } from 'react';

const SimpleNameInput = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 2) {
      setError('Name must be at least 2 characters');
      setGreeting('');
    } else {
      setError('');
      setGreeting(`Hello, ${name}!`);
    }
  };

  const handleClear = () => {
    setName('');
    setError('');
    setGreeting('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleClear}>Clear</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {greeting && <div style={{ color: 'green' }}>{greeting}</div>}
    </form>
  );
};

export default SimpleNameInput;
```

**Line-by-Line Explanation (Functions & Display):**

```tsx
const handleSubmit = (e) => {
  e.preventDefault(); // Prevents the page from reloading when the form is submitted
  if (name.length < 2) {
    setError('Name must be at least 2 characters'); // Show error if name is too short
    setGreeting(''); // Clear any previous greeting
  } else {
    setError(''); // Clear any previous error
    setGreeting(`Hello, ${name}!`); // Show greeting if name is valid
  }
};

const handleClear = () => {
  setName(''); // Reset the input field
  setError(''); // Remove any error message
  setGreeting(''); // Remove any greeting message
};

// In the form's JSX:
{error && <div style={{ color: 'red' }}>{error}</div>} // If error is not empty, show it in red
{greeting && <div style={{ color: 'green' }}>{greeting}</div>} // If greeting is not empty, show it in green
```

- `handleSubmit` runs when you click Submit. It checks the name and sets either an error or a greeting.
- `handleClear` runs when you click Clear. It resets everything to blank.
- The `{error && ...}` and `{greeting && ...}` lines display messages only if those values are set, using color for clarity.

Try changing the name and see what happens. Enter a short name to see the error, and a valid name to see the greeting. Click Clear to reset!

---
## 0:10 - 0:30: Concept Overview

### JavaScript Array Methods

#### 1. `.map()` - Transform every item
```js
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// Real example: Extract ages from user data
const users = [{name: 'Alice', age: 25}, {name: 'Bob', age: 30}];
const ages = users.map(user => user.age); // [25, 30]
```

#### 2. `.filter()` - Keep only items that match condition
```js
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(num => num % 2 === 0); // [2, 4]

// Real example: Find adults
const adults = users.filter(user => user.age >= 18);
```


#### 3. `.reduce()` - Combine all items into one result
The `reduce` method lets you process every item in an array and combine them into a single result. It takes two arguments:

1. **Callback function:**
  - **Accumulator** (e.g., `total`): The running result so far.
  - **Current value** (e.g., `num`): The current item from the array.
  - **Current index** (optional): The index of the current item.
  - **Original array** (optional): The array being processed.
  Example:
  ```js
  (accumulator, currentValue, index, array) => { ... }
  ```
2. **Initial value:**
  The starting value for the accumulator (e.g., `0` for a sum).

**How it works:**
- The callback function is called for every item in the array.
- The accumulator starts with the initial value you provide.
- On each run, the callback receives the accumulator and the current item, and returns the new accumulator value.
- After all items are processed, `reduce` returns the final accumulator.

**Example:**
```js
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, num) => total + num, 0); // 15
// total starts at 0, then adds each number in turn
```

// Real example: Calculate total sales
const sales = [100, 250, 175, 300];
const totalSales = sales.reduce((total, sale) => total + sale, 0); // 825
```

### Statistical Calculations
```js
const scores = [85, 92, 78, 96, 88, 94, 82];
const sum = scores.reduce((total, score) => total + score, 0);
const average = sum / scores.length;
const maximum = Math.max(...scores);
const minimum = Math.min(...scores);
const count = scores.length;
```

### Error Handling & Edge Cases
```js
// Empty array
const empty = [];
const average = empty.reduce((a, b) => a + b, 0) / empty.length; // NaN

// Non-numeric data
const mixed = [1, 'hello', 3, null, 5];
const sum = mixed.reduce((a, b) => a + b, 0); // "1hello3null5"

// Missing values
const withMissing = [1, 2, undefined, 4, 5];

// How to handle gracefully
if (data.length === 0) {
  return { error: 'No data to analyze' };
}
const numbers = data.filter(item => typeof item === 'number' && !isNaN(item));
const average = numbers.length > 0 ? sum / numbers.length : 0;
```

---

## 0:30 - 1:15: Build Time — Data Analyzer Component

### Phase 1: Create Basic Data Analyzer

#### Step 1: File setup and sample data
```tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataAnalyzer = () => {
  const [analysis, setAnalysis] = useState(null);
  // Sample data to work with
  const sampleData = [23, 45, 67, 89, 34, 56, 78, 90, 12, 45, 67, 89];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Sample data: {sampleData.join(', ')}</p>
        {/* Analysis will go here */}
      </CardContent>
    </Card>
  );
};

export default DataAnalyzer;
```

#### Step 2: Add analysis function
```tsx
const analyzeData = () => {
  // Calculate statistics
  const sum = sampleData.reduce((total, num) => total + num, 0);
  const average = sum / sampleData.length;
  const maximum = Math.max(...sampleData);
  const minimum = Math.min(...sampleData);
  const count = sampleData.length;

  setAnalysis({
    sum,
    average: average.toFixed(2),
    maximum,
    minimum,
    count
  });
};
```

#### Step 3: Display results
```tsx
{analysis && (
  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
    <div><strong>Count:</strong> {analysis.count}</div>
    <div><strong>Sum:</strong> {analysis.sum}</div>
    <div><strong>Average:</strong> {analysis.average}</div>
    <div><strong>Maximum:</strong> {analysis.maximum}</div>
    <div><strong>Minimum:</strong> {analysis.minimum}</div>
    <div><strong>Range:</strong> {analysis.maximum - analysis.minimum}</div>
  </div>
)}
```

### Phase 2: Add to Homepage
```tsx
// In src/pages/Index.tsx
import DataAnalyzer from '@/components/DataAnalyzer';
<DataAnalyzer />
```

### Phase 3: Add Error Handling
```tsx
const analyzeData = () => {
  // Filter out non-numbers
  const validNumbers = sampleData.filter(item => typeof item === 'number' && !isNaN(item));
  if (validNumbers.length === 0) {
    setAnalysis({ error: 'No valid numbers found in the data' });
    return;
  }
  // Proceed with analysis...
  const sum = validNumbers.reduce((total, num) => total + num, 0);
  // ... rest of analysis
};
```

---

## 1:15 - 1:45: Group Share & Troubleshooting
- Share your analysis results
- Compare different datasets
- Try these challenges:
  - Find all numbers greater than 50
  - Double all numbers
  - Find the product of all numbers

### Common Issues & Solutions
- Confused by `reduce()`? Start with simple examples, explain accumulator
- Spread operator (`...`): Unpacks arrays for Math functions
- NaN results: Use type checking and filtering

---

## 1:45 - 2:00: Wrap Up & Next Steps
- Celebrate your new data skills!
- Homework: Analyze a different dataset (temperatures, test scores, sales figures)
- Challenge: Calculate median, numbers above/below average, standard deviation
- Next week: Data visualization with charts!

---

## Complete Working Solution Example
```tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DataAnalyzer = () => {
  const [analysis, setAnalysis] = useState(null);
  const [currentDataset, setCurrentDataset] = useState('temperatures');
  const datasets = {
    temperatures: [72, 75, 68, 80, 77, 74, 69, 78, 76, 73],
    testScores: [88, 92, 79, 95, 87, 90, 84, 89, 93, 86],
    salesFigures: [1200, 1450, 980, 1680, 1250, 1520, 1100, 1400]
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Analysis Tool</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Choose Dataset:</label>
          <select
            value={currentDataset}
            onChange={(e) => setCurrentDataset(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="temperatures">Temperatures (°F)</option>
            <option value="testScores">Test Scores</option>
            <option value="salesFigures">Sales Figures ($)</option>
          </select>
        </div>
        <div className="p-3 bg-gray-50 rounded">
          <strong>Data:</strong> {datasets[currentDataset].join(', ')}
        </div>
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
      </CardContent>
    </Card>
  );
};

export default DataAnalyzer;
```

---

## Advanced Statistical Functions (for reference)
```js
// Standard deviation calculation
const calculateStandardDeviation = (numbers) => {
  const average = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const squaredDifferences = numbers.map(num => Math.pow(num - average, 2));
  const variance = squaredDifferences.reduce((a, b) => a + b, 0) / numbers.length;
  return Math.sqrt(variance);
};

// Percentile calculation
const calculatePercentile = (numbers, percentile) => {
  const sorted = [...numbers].sort((a, b) => a - b);
  const index = (percentile / 100) * (sorted.length - 1);
  if (Number.isInteger(index)) {
    return sorted[index];
  } else {
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
  }
};
```

---

## Assessment Rubric
- **A:** Working analyzer, extra stats, error handling, explains methods
- **B:** Working analyzer, basic stats, handles errors
- **C:** Needs guidance, working solution, some effort
- **D:** Not working, needs help

---

## What to Watch For
- Students testing with their own datasets
- Explaining array methods to others
- Connecting analysis to real-world scenarios
- Red flags: confusion about map/filter/reduce, accumulator, conditional rendering

---

**Instructor Tip:** This session is where you start thinking like a data scientist! Practice, ask questions, and help classmates if you can.
