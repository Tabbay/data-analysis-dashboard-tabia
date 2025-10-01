# 🎓 WEEK 3 STUDENT GUIDE
**Interactive Components & User Input**

## 📅 This Week's Mission
Build components that can accept and validate user input! You'll learn how to create forms, handle text input, and provide real-time feedback to users.

## 🎯 Learning Goals
- ✅ Create controlled form components in React
- ✅ Handle different types of user input (text, buttons, forms)
- ✅ Implement real-time form validation 
- ✅ Understand controlled vs uncontrolled components
- ✅ Build a complete name input with validation

## 🔄 Pre-Session Check
- [ ] Your counter from Week 2 should be working
- [ ] You should understand useState and event handlers
- [ ] Development environment should run without issues

**Quick test**: Your counter should increment, decrement, and reset properly.

## 📚 Key Concepts This Week



### Controlled Components
In React, form inputs should be "controlled" by component state:

// Uncontrolled input (not recommended)
```jsx
<input type="text" />
```

// Controlled input (recommended)
```jsx
const [name, setName] = useState("");
<input type="text" value={name} onChange={e => setName(e.target.value)} />
```

// Full controlled input example:
```jsx
import { useState } from "react";

function ControlledInputDemo() {
  const [value, setValue] = useState("");
  return (
    <div>
      <label htmlFor="demo-input">Type something:</label>
      <input
        id="demo-input"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <p>You typed: {value}</p>
    </div>
  );
}
```

**Why controlled?**
- React controls the input value
- You can validate in real-time
- You can transform input as user types
- State and UI stay synchronized

---

Let’s look at event handling.  
Here’s a sample handler:  
```jsx
const handleChange = (e) => {
  console.log('Event object:', e);
  console.log('Input value:', e.target.value);
  setName(e.target.value);
};
```
---

### Event Handling in React
Event handlers let your components respond to user actions like typing, clicking, or submitting a form.

**Common event types:**
- `onChange`: When input value changes (typing)
- `onClick`: When a button is clicked
- `onSubmit`: When a form is submitted
- `onFocus` / `onBlur`: When input gains/loses focus

---

## Event Handling: See It In Action!

You can experiment with this example in your app to see how `handleChange`, `e`, and `e.target.value` work:

```jsx
import { useState } from "react";

function HandleChangeDemo() {
  const [name, setName] = useState("");
  const [log, setLog] = useState("");

  const handleChange = (e) => {
    setLog(
      `Event: ${JSON.stringify(e.type)} | Target: ${e.target.tagName} | Value: ${e.target.value}`
    );
    setName(e.target.value);
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 20, border: "1px solid #ccc" }}>
      <label htmlFor="nameInput">Type your name:</label>
      <input
        id="nameInput"
        type="text"
        value={name}
        onChange={handleChange}
        onFocus={() => setLog("Input focused!")}
        onBlur={() => setLog("Input blurred!")}
        style={{ marginLeft: 8 }}
      />
      <p>Hello, {name || "stranger"}!</p>
      <pre style={{ background: "#f9f9f9", padding: 10 }}>{log}</pre>
    </div>
  );
}
```

### What is `e` and `e.target.value`?
- `e` is the event object React gives your handler. It contains info about what happened.
- `e.target` is the DOM element that triggered the event (here, the input).
- `e.target.value` is the current value of the input field.

**Try typing in the box above and watch the log update!**

### What does `onFocus` do?
- `onFocus` fires when the input is selected (clicked or tabbed into).
- You can use it to show hints, highlight, or start validation.

**This demo also logs when the input is focused or blurred.**

---

### Conditional Rendering
Show or hide UI based on state or conditions:

```jsx
{error && <p className="text-red-600">{error}</p>}
{greeting ? <p>Hello, {name}!</p> : null}
```

**Pattern:** `condition ? whenTrue : whenFalse`

---

### Types of Validation
- **Required fields**: Can't be empty
- **Format validation**: e.g., email must contain `@` and `.`
- **Length validation**: Minimum/maximum characters
- **Real-time vs submit-time**: Show errors as user types or only on submit

**Example:**
```jsx
const isValid = name.length >= 2;
const errorMessage = name.length === 0 ? "Name is required" :
  name.length < 2 ? "Name must be at least 2 characters" : "";
```


## 🛠️ Today's Hands-On Project: Week3Live Interactive Demo

### Assignment: Build a Single Component with 5 Interactive Buttons

**File:** `src/components/Week3LiveDemo.tsx`

**Features:**
- Counter Button: A simple +1 counter
- Name Input: Text input that shows "Hello [name]"
- Color Picker: Buttons that change background color
- Toggle Switch: Show/hide a message
- Reset All: Button that resets everything back to defaults

**Solution Example:**
```tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const COLORS = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];

const Week3LiveDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [nameError, setNameError] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [showMsg, setShowMsg] = useState(true);

  const handleReset = () => {
    setCount(0);
    setName("");
    setGreeting("");
    setNameError("");
    setBgColor("#fff");
    setShowMsg(true);
  };

  const handleNameSubmit = () => {
    setNameError("");
    if (!name.trim()) {
      setNameError("Please enter your name");
      return;
    }
    if (name.trim().length < 2) {
      setNameError("Name must be at least 2 characters");
      return;
    }
    setGreeting(`Hello, ${name.trim()}!`);
  };

  return (
    <Card className="max-w-xl mx-auto" style={{ background: bgColor }}>
      <CardHeader>
        <CardTitle>Week 3 Interactive Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Counter Button */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-semibold">Counter: {count}</span>
          <Button onClick={() => setCount(count + 1)}>+1</Button>
        </div>

        {/* Name Input */}
        <div className="flex flex-col items-center gap-2">
          <Input
            placeholder="Enter your name"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setGreeting("");
              setNameError("");
            }}
          />
          <Button onClick={handleNameSubmit}>Say Hello</Button>
          {nameError && <p className="text-red-600 text-sm">{nameError}</p>}
          {greeting && <p className="text-green-600 font-medium">{greeting}</p>}
        </div>

        {/* Color Picker */}
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold">Pick a background color:</span>
          <div className="flex gap-2">
            {COLORS.map(color => (
              <button
                key={color}
                style={{ background: color, width: 32, height: 32, borderRadius: "50%", border: "2px solid #fff" }}
                onClick={() => setBgColor(color)}
                aria-label={`Pick ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Toggle Switch */}
        <div className="flex flex-col items-center gap-2">
          <Button variant="outline" onClick={() => setShowMsg(v => !v)}>
            {showMsg ? "Hide Message" : "Show Message"}
          </Button>
          {showMsg && <p className="text-blue-600">This message can be toggled!</p>}
        </div>

        {/* Reset All */}
        <div className="flex flex-col items-center gap-2">
          <Button variant="destructive" onClick={handleReset}>Reset All</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Week3LiveDemo;
```

**Practice:**
- Try customizing each button
- Add more features if time allows


### Step 2: Add to the Search Page (Not Homepage!)
**File**: `src/pages/Week3Live.tsx` (or the page with the search bar)

Add the import and component:
```tsx
import NameInput from "@/components/NameInput";

// Add NameInput above or near the search bar for a realistic form experience
<div className="mb-8">
  <NameInput />
</div>
```
If you see a search bar, add your NameInput above it. This helps you practice integrating forms into real app pages.

### Step 3: Test Your Form
Try these scenarios:
- Type nothing - no error, button disabled
- Type "A" - error message appears
- Type "John" - validation passes, button enabled
- Submit valid name - greeting appears
- Type while greeting shows - greeting disappears

## 🏠 Homework Assignments

### Required Tasks
- [ ] **Task 1**: Add minimum length validation (at least 3 characters)
- [ ] **Task 2**: Add maximum length validation (no more than 30 characters)  
- [ ] **Task 3**: Show character count as user types
- [ ] **Task 4**: Add a "Clear" button that resets the form

### Stretch Goals (Optional)
- [ ] **Challenge 1**: Add email validation (must contain @ and .)
- [ ] **Challenge 2**: Create different greeting messages based on name length
- [ ] **Challenge 3**: Add a "favorite color" dropdown input
- [ ] **Challenge 4**: Remember the last entered name using localStorage

### Advanced Challenge: Multi-Field Form
Create a form with:
- Name input (required, 2-50 characters)
- Age input (number, 13-120)
- Email input (must be valid email format)
- Submit only when ALL fields are valid

---

**Next Week Preview**: We'll learn JavaScript array methods (map, filter, reduce) to process and analyze data - the foundation for your data analysis tool! 📊
