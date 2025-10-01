# 🎓 WEEK 2 STUDENT GUIDE
**State Management & Interactive Components**

## 📅 This Week's Mission
Learn how to make your React components interactive! You'll discover the magic of React state and build a data upload progress simulator that will be part of your data analysis platform.

## 🎯 Learning Goals
- ✅ Understand what React state is and why components need memory
- ✅ Use the useState hook to create interactive features
- ✅ Handle button clicks and update component state  
- ✅ Watch how state changes trigger automatic re-renders
- ✅ **Explore how components communicate via props**
- ✅ **Install and use React Developer Tools for debugging**
- ✅ **Practice event handling with interactive demos**
- ✅ Build a working upload progress simulator from scratch

## 🔄 Pre-Session Check
- [ ] Your app from Week 1 should be running without errors
- [ ] You should have successfully personalized the homepage
- [ ] Node.js and development server should work properly

**Quick test**: Run `npm run dev` and visit `http://localhost:5173`

---

## 📚 FOLLOW ALONG: Week 1 Solutions Review (0:10-0:40)

### Exercise 1: Your Customized Title *(8 minutes)*
**What your instructor is showing:**
- How JSX lets you change content inside React components
- The difference between the original title and your personalized version
- How React automatically updates when you save changes

**🎯 Your Turn:** Type your custom title in chat when asked!

### Exercise 2: Your Personal Subtitle *(10 minutes)*  
**What your instructor is demonstrating:**
- CSS classes that control spacing, text size, and centering
- How `max-w-2xl mx-auto` keeps content centered and readable
- Visual hierarchy using different text sizes

**🎯 Your Turn:** Be ready to screen share your homepage when called on!

### Exercise 3: Explore Component Props *(15 minutes)*

**🔍 FOLLOW ALONG: Props Investigation**

Your instructor will guide you through examining the `DataUpload` component:

**Step 1: Open the File**
- Navigate to `src/components/DataUpload.tsx` in VS Code
- Look for the `DataUploadProps` interface around line 21

**Step 2: Find the Props Interface**
```tsx
interface DataUploadProps {
  onDataLoad: (data: DataRow[], fileName: string) => void;
}
```
**❓ Question:** What does this interface tell us?
**💡 Answer:** This component expects ONE prop called `onDataLoad` that's a function

**Step 3: Trace How Props Are Used**
Look for this pattern in the component:
```tsx
const DataUpload = ({ onDataLoad }: DataUploadProps) => {
  // Find where onDataLoad is called
  const handleFileLoad = (data: DataRow[], file: File) => {
    onDataLoad(data, file.name); // ← HERE! Calling the parent's function
  };
```

**Step 4: See Parent-Child Connection**
Switch to `src/pages/Index.tsx` and find:
```tsx
const handleDataLoad = (loadedData: DataRow[], name: string) => {
  setData(loadedData);
  setFileName(name);
};

<DataUpload onDataLoad={handleDataLoad} />
```

**🎯 Student Activity:** Find where `onDataLoad` is called and type the line number in chat!

**💡 Key Concept:** Data flows DOWN via props, events flow UP via function calls!

### Exercise 4: React Developer Tools Setup *(5 minutes)*

**🛠️ Install React Developer Tools:**

**Chrome Users:**
1. Go to Chrome Web Store
2. Search "React Developer Tools"  
3. Click "Add to Chrome"

**Firefox Users:**
1. Go to Firefox Add-ons
2. Search "React Developer Tools"
3. Click "Add to Firefox"

**🎯 Test Your Tools:**
1. Press F12 to open developer tools
2. Look for new "Components" and "Profiler" tabs
3. Click "Components" tab
4. Find `DataUpload` in the component tree
5. Upload a file and watch state change in real-time!

**💬 Chat Check:** Type "REACT MAGIC" when you see state updating live!

---

## ☕ BREAK (0:40-0:50)
*Stretch, grab water, and get ready for hands-on React state building!*

---

## 🧠 FOLLOW ALONG: React State Deep Dive (0:50-1:20)

### State Concept Introduction *(8 minutes)*

**🎭 What Your Instructor is Explaining:**
> *"State is like giving your components memory!"*

**📊 The Analogy:**
```
🧠 COMPONENT WITHOUT STATE = Robot with no memory
   - Shows same thing every time
   - Can't remember what happened
   - Can't respond to changes

🤖 COMPONENT WITH STATE = Smart robot with memory  
   - Remembers past interactions
   - Changes based on what happens
   - Responds to user actions
```

**💻 Live Demo You're Watching:**
Your instructor will build a counter from scratch:

```jsx
// Step 1: Static version (no memory)
const Counter = () => {
  return (
    <div>
      <p>Count: 0</p>
      <button>Click me!</button>
    </div>
  );
};

// Step 2: Add useState (give it memory!)
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  //     ↑        ↑           ↑
  //  current  function   starting
  //   value  to change    value
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
};
```

**🔍 Follow the State Breakdown:**
1. **Import:** `import { useState } from 'react'`
2. **Declaration:** `const [count, setCount] = useState(0)`
3. **Usage:** Use `{count}` in JSX, call `setCount()` to change
4. **Re-rendering:** React automatically updates the UI

### useState Pattern Deep Dive *(10 minutes)*

**🎯 Interactive Learning:** Your instructor will ask these questions - be ready to answer in chat!

**Question 1:** *"What would useState(10) create?"*
- A) Number starting at 10
- B) Array with 10 items  
- C) String '10'

**Question 2:** *"If I call setCount(5), when does the component re-render?"*
- Type 'NOW' for immediately
- Type 'NEXT' for next cycle
- Type 'NEVER' for never

**Question 3:** *"I want to track likes on a post. What useState line would I write?"*
Put your answer in chat!

**💻 Live Patterns You'll See:**
```jsx
// Different data types
const [name, setName] = useState('');           // String
const [isVisible, setIsVisible] = useState(false);  // Boolean
const [items, setItems] = useState([]);         // Array

// Common patterns
const toggleOpen = () => setIsOpen(!isOpen);    // Toggle boolean
const handleChange = (e) => setText(e.target.value);  // Input handling
```

### Event Handling with State *(12 minutes)*

**🎯 HANDS-ON SECTION: Code Along!**

**Step 1: Multi-Button Counter**
Your instructor will build this - **follow along in your code**:

```jsx
const MultiTracker = () => {
  const [clicks, setClicks] = useState(0);
  
  return (
    <div>
      <p>Total clicks: {clicks}</p>
      <button onClick={() => setClicks(clicks + 1)}>+1</button>
      <button onClick={() => setClicks(clicks + 5)}>+5</button>
      <button onClick={() => setClicks(0)}>Reset</button>
    </div>
  );
};
```

**Step 2: Form Input State**
```jsx
const NameTracker = () => {
  const [name, setName] = useState('');
  
  return (
    <div>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name || 'stranger'}!</p>
    </div>
  );
};
```

**🎯 Breakout Room Practice *(5 minutes)*:**
- **Your Task:** In pairs, create a counter that goes up AND down
- **Partner Role:** Help with suggestions and catch typos
- **Success:** Two buttons (+ and -) that change a number

### Interactive Event Handling Playground *(7 minutes)*

**🚀 LIVE CODING DEMO - Watch and Learn!**

Your instructor will demonstrate this advanced component that shows multiple states working together:

```jsx
const EventPlayground = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue');
  const [message, setMessage] = useState('Welcome!');
  
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length > 0) {
      setMessage(`Hello ${e.target.value}! You have ${count} points.`);
    } else {
      setMessage('Welcome!');
    }
  };
  
  const handleCountChange = (amount) => {
    const newCount = count + amount;
    setCount(newCount);
    if (name) {
      setMessage(`Hello ${name}! You have ${newCount} points.`);
    }
    // Change color based on count
    if (newCount >= 10) {
      setColor('green');
    } else if (newCount <= -5) {
      setColor('red');
    } else {
      setColor('blue');
    }
  };
  
  return (
    <div style={{ padding: '20px', border: '2px solid ' + color }}>
      <h3 style={{ color: color }}>{message}</h3>
      
      <div style={{ margin: '10px 0' }}>
        <input 
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          style={{ padding: '5px', marginRight: '10px' }}
        />
        <span>Count: {count}</span>
      </div>
      
      <div>
        <button onClick={() => handleCountChange(1)}>+1 Point</button>
        <button onClick={() => handleCountChange(5)}>+5 Points</button>
        <button onClick={() => handleCountChange(-1)}>-1 Point</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      
      <p style={{ fontSize: '12px', marginTop: '10px' }}>
        🎯 Try typing your name and clicking buttons! Watch how everything connects!
      </p>
    </div>
  );
};
```

**🎯 What to Observe:**
- Multiple states working together
- Events updating multiple states  
- State driving both content AND styling
- Everything updates instantly

**💬 Engagement:** Type 'CONNECTED' when you see how typing + clicking = dynamic UI!

---

## 🛠️ FOLLOW ALONG: Build Upload Progress Component (1:20-1:50)

### Component Planning *(5 minutes)*

**🎭 What Your Instructor is Saying:**
> *"Now we build a real interactive component together! This will demonstrate everything we've learned about state management for your data analysis platform."*

**📊 Feature Planning:**
Your instructor will collect suggestions from chat for what an upload progress component should do:

```
📋 Upload Progress Component Requirements:
✅ Show progress percentage (0-100%)
✅ Visual progress bar that fills up
✅ Start Upload button to begin simulation
✅ Reset button to try again
✅ Status messages that change based on progress
✅ Different states: ready, uploading, complete
✅ Realistic simulation with random progress chunks
```

**🎯 State Architecture Planning:**
Before coding, think about what data the component needs to remember:
- Current progress percentage?
- Whether upload is currently running?
- What status message to show?

### Step-by-Step Build *(20 minutes)*

**Step 1: Create the Component File**
Follow along as your instructor creates `src/components/UploadProgressSimulator.tsx`:

```tsx
import { useState } from 'react';

const UploadProgressSimulator = () => {
  // State to track upload progress and status
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">File Upload Simulator</h2>
      
      {/* Progress Bar Container */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress Text and Status */}
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-blue-600">{progress}%</span>
        <div className="text-sm text-gray-600 mt-2">
          {isUploading && "📤 Uploading file..."}
          {!isUploading && progress === 0 && "📁 Ready to upload"}
          {!isUploading && progress > 0 && progress < 100 && "⏸️ Upload paused"}
          {!isUploading && progress === 100 && "✅ Upload complete!"}
        </div>
      </div>

      {/* We'll add buttons here next */}
    </div>
  );
};

export default UploadProgressSimulator;
```

**Step 2: Add Upload Logic**
Your instructor will add the simulation logic:

```tsx
// Function to simulate file upload progress
const startUpload = () => {
  setIsUploading(true);
  setProgress(0);
  
  // Simulate upload progress with intervals
  const interval = setInterval(() => {
    setProgress(prevProgress => {
      const newProgress = prevProgress + Math.random() * 15 + 5; // Random chunks
      
      // Complete upload when we reach 100%
      if (newProgress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        return 100;
      }
      
      return newProgress;
    });
  }, 300); // Update every 300ms for smooth animation
};

// Function to reset progress
const resetProgress = () => {
  setProgress(0);
  setIsUploading(false);
};
```

**Step 3: Add Control Buttons**
```tsx
{/* Control buttons */}
<div className="flex justify-center gap-3">
  <button 
    onClick={startUpload}
    disabled={isUploading || progress === 100}
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    {isUploading ? 'Uploading...' : 'Start Upload'}
  </button>
  
  <button 
    onClick={resetProgress}
    disabled={isUploading}
    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
  >
    Reset
  </button>
</div>
```

### Integration with Main App *(5 minutes)*

**📋 STEP-BY-STEP INTEGRATION:**

Your instructor will guide you through adding this to your main app:

**Step A: Import to Homepage**
In `src/pages/Index.tsx`, add this import:
```tsx
import UploadProgressSimulator from '@/components/UploadProgressSimulator';
```

**Step B: Add to Page**
Find the grid section and add your component as a new card:
```tsx
<Card className="bg-white/50 backdrop-blur-sm border-purple-200">
  <CardHeader>
    <CardTitle className="flex items-center">
      <Upload className="mr-3 h-6 w-6 text-purple-600" />
      Interactive Progress Demo
    </CardTitle>
    <CardDescription>
      Try our upload progress simulator built with React state!
    </CardDescription>
  </CardHeader>
  <CardContent>
    <UploadProgressSimulator />
  </CardContent>
</Card>
```

**Step C: Import Upload Icon**
Add `Upload` to the icon imports:
```tsx
import { Upload, FileText, BarChart3, Brain, Zap, Database } from "lucide-react";
```

**🎯 Test Your Work:**
1. Save both files
2. Check your browser - you should see a new card
3. Click "Start Upload" - watch it animate!
4. Use React Developer Tools to watch state changes

---

## 🎮 Practice Playground

### 🌐 Live Examples Access
Visit your live playground at: **http://localhost:5173/live-session**

This page has interactive examples you can experiment with:
- ✅ Basic counter patterns
- ✅ Multi-button state management
- ✅ Form input handling
- ✅ Boolean toggles and conditional rendering
- ✅ Advanced event handling playground
- ✅ Complete upload progress simulator

### 🔥 Copy-Paste Code Examples

**Basic Counter Pattern:**
```tsx
const BasicCounter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <div>Count: {count}</div>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};
```

**Form Input Pattern:**
```tsx
const NameInput = () => {
  const [name, setName] = useState('');
  
  return (
    <div>
      <input 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <p>Hello, {name || 'stranger'}!</p>
    </div>
  );
};
```

---

## 🏠 Week 2 Practice & Week 3 Prep

### 🎯 **Quick Recap Assignment: Interactive Button Collection**
Build a simple component that lets you practice all the useState patterns we covered today.

**What you'll build:**
A single component with 5 different interactive buttons that each demonstrate a useState pattern.

**Requirements:**
- [ ] **Counter Button**: A simple +1 counter (review basic useState)
- [ ] **Name Input**: Text input that shows "Hello [name]" (review controlled inputs)
- [ ] **Color Picker**: Buttons that change background color (review conditional styling)
- [ ] **Toggle Switch**: Show/hide a message (review boolean state)
- [ ] **Reset All**: Button that resets everything back to defaults

**💡 Optional Exploration:**
If you finish early, try adding these to your practice component:

### 💡 Success Tips

**✅ Getting Started:**
1. **Create the file**: Make `src/components/homework/InteractivePractice.tsx`
2. **Copy the starter code**: Use the template above as your starting point
3. **Test each section**: Make sure each button/input works before moving on
4. **Add to homepage**: Import and display your component

**✅ Week 3 Prep Benefits:**
- **Event handling practice**: You'll work with different types of user events
- **Form handling**: Text inputs will be second nature  
- **State patterns**: You'll have practiced all the common useState patterns
- **Conditional rendering**: Dynamic UI based on state values

**🎯 Week 3 Prep Challenge (Optional):**
If you want to get ahead for next week, add these event-driven features:

- [ ] **Smart Click Counter**: Show different messages based on count
  - 1-3 clicks: "Just getting started..."
  - 4-7 clicks: "You're getting the hang of it! 👍"  
  - 8+ clicks: "React state master! 🏆"

- [ ] **Keyboard-Aware Name Input**: Handle keyboard events
  - Show character count as user types
  - Display "Press Enter to save" hint
  - Handle Enter key to show confirmation message

- [ ] **Hover Effects**: Buttons that respond to mouse events
  - Change appearance on hover (`onMouseEnter`/`onMouseLeave`)
  - Show tooltips or additional info on hover
  - Different styling for active vs hover states

**💡 Why This Prepares You for Week 3:**
Next week we'll build data table components with sorting, filtering, and search - all using the same event handling and conditional rendering patterns you'll practice here!

**Starter Code for Week 3 Prep:**
```tsx
// src/components/homework/InteractivePractice.tsx
import { useState } from 'react';

const InteractivePractice = () => {
  // Week 2 Review States
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState('white');
  const [isVisible, setIsVisible] = useState(true);
  
  // Week 3 Prep States (Optional Challenge)
  const [isHovering, setIsHovering] = useState(false);
  const [showSaveHint, setShowSaveHint] = useState(false);
  const [savedName, setSavedName] = useState('');

  const resetAll = () => {
    setCount(0);
    setName('');
    setBgColor('white');
    setIsVisible(true);
    setSavedName('');
    setShowSaveHint(false);
  };

  // Week 3 Prep: Smart Counter Messages
  const getCounterMessage = (clickCount) => {
    if (clickCount >= 8) return "React state master! 🏆";
    if (clickCount >= 4) return "You're getting the hang of it! 👍";
    if (clickCount >= 1) return "Just getting started...";
    return "Click the button to begin!";
  };

  // Week 3 Prep: Keyboard Event Handling
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSavedName(name);
      setShowSaveHint(false);
      alert(`Saved: ${name}`);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setShowSaveHint(e.target.value.length > 0);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: bgColor }}>
      <h2 className="text-2xl font-bold mb-6">🎮 Interactive Practice</h2>
      
      {/* Week 2 Review Sections */}
      <div className="space-y-4">
        {/* Smart Counter with Messages */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Smart Counter: {count}</h3>
          <p className="text-sm text-gray-600 mb-2">{getCounterMessage(count)}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            +1
          </button>
        </div>

        {/* Keyboard-Aware Name Input */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Keyboard-Aware Input</h3>
          <input 
            type="text"
            value={name}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your name and press Enter"
            className="border p-2 rounded mr-2 w-full mb-2"
          />
          <div className="text-sm space-y-1">
            <p>Characters: {name.length}</p>
            {showSaveHint && <p className="text-blue-600">💡 Press Enter to save!</p>}
            {savedName && <p className="text-green-600">✅ Last saved: {savedName}</p>}
          </div>
        </div>

        {/* Hover-Aware Color Picker */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Hover-Aware Color Picker</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setBgColor('lightblue')}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`px-3 py-2 rounded transition-all duration-200 ${
                isHovering ? 'bg-blue-300 scale-105' : 'bg-blue-200'
              }`}
            >
              Blue {isHovering && '✨'}
            </button>
            <button 
              onClick={() => setBgColor('lightgreen')} 
              className="px-3 py-2 bg-green-200 hover:bg-green-300 hover:scale-105 transition-all duration-200 rounded"
            >
              Green
            </button>
            <button 
              onClick={() => setBgColor('lightcoral')} 
              className="px-3 py-2 bg-red-200 hover:bg-red-300 hover:scale-105 transition-all duration-200 rounded"
            >
              Red
            </button>
            <button 
              onClick={() => setBgColor('white')} 
              className="px-3 py-2 bg-gray-200 hover:bg-gray-300 transition-all duration-200 rounded"
            >
              Default
            </button>
          </div>
          {isHovering && (
            <p className="text-sm text-gray-600 mt-2">👆 Hover detected! This is how you'll make interactive table headers.</p>
          )}
        </div>

        {/* Toggle with Enhanced Feedback */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Toggle with Feedback</h3>
          <button 
            onClick={() => setIsVisible(!isVisible)}
            className={`px-4 py-2 text-white rounded transition-all duration-200 ${
              isVisible 
                ? 'bg-purple-500 hover:bg-purple-600' 
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            {isVisible ? 'Hide Message' : 'Show Message'}
          </button>
          {isVisible && (
            <div className="mt-2 p-3 bg-purple-100 rounded border-l-4 border-purple-500">
              <p className="text-purple-700">🎉 This message uses conditional rendering!</p>
              <p className="text-sm text-purple-600">Perfect for showing/hiding search results next week!</p>
            </div>
          )}
        </div>

        {/* Reset Button */}
        <button 
          onClick={resetAll}
          className="w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
        >
          🔄 Reset Everything
        </button>
      </div>

      {/* Week 3 Skills Preview */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
        <h4 className="font-semibold text-yellow-800 mb-2">🟡 Week 3 Skills Preview</h4>
        <p className="text-sm text-yellow-700 mb-2">
          The event patterns you just practiced will be used for:
        </p>
        <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
          <li><strong>onClick</strong> → Sort table columns by clicking headers</li>
          <li><strong>onKeyPress</strong> → Search-as-you-type in data tables</li>
          <li><strong>onMouseEnter/Leave</strong> → Interactive hover states for buttons</li>
          <li><strong>Conditional rendering</strong> → Show/hide search results and filters</li>
        </ul>
      </div>
    </div>
  );
};

export default InteractivePractice;
```

**✅ Submission:**
- [ ] Component works and has all required features
- [ ] Added to your homepage so instructor can see it
- [ ] Clean code with good variable names
- [ ] Bonus search feature works (if attempted)

**🎯 Time Estimate:** 30-45 minutes for basic version, +15 minutes for bonus features

**� Need Help?**
- **Office Hours**: Tuesdays 3-4 PM  
- **Discord**: #week2-homework channel
- **Reference**: Check `/live-session` page for working examples

### 🎯 Success Criteria & Learning Outcomes
After completing this practice assignment, you will have:

**✅ Week 2 Review Mastery:**
- Confidently used `useState` with different data types (numbers, strings, booleans)
- Handled form inputs with controlled components
- Updated state based on user interactions
- Applied conditional rendering and styling

**✅ Week 3 Preparation:**
- Practiced different types of event handling (click, keyboard, mouse)
- Built conditional rendering based on dynamic state values
- Created responsive UI that gives user feedback
- Mastered the event patterns you'll use for data table interactions

**✅ React Development Skills:**
- Built a single component with multiple interactive features
- Organized state management for related data
- Created clean, user-friendly interfaces
- Applied consistent styling and layout

---

**Next Week Preview**: We'll use these exact event handling patterns to build interactive data tables! You'll add click-to-sort headers, search-as-you-type functionality, and dynamic filtering - all building on the event handling skills you practiced this week. 🚀

*Week 2 Guide - Updated September 2025*

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