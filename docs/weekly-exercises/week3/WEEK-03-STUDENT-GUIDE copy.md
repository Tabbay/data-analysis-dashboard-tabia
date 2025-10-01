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

```jsx
const [name, setName] = useState("");
// The input value comes from state
// Changes update the state
<input 
  value={name} 
  onChange={(e) => setName(e.target.value)} 
/>
```

**Why controlled?**
- React controls the input value
- You can validate in real-time
- You can transform input as user types
- State and UI stay synchronized

---

### Event Handling in React
Event handlers let your components respond to user actions like typing, clicking, or submitting a form.

**Common event types:**
- `onChange`: When input value changes (typing)
- `onClick`: When a button is clicked
- `onSubmit`: When a form is submitted
- `onFocus` / `onBlur`: When input gains/loses focus


**Live Demo (see `src/components/NameInput.tsx`):**
```jsx
import { useState } from 'react';

function DemoHandleChange() {
  const [name, setName] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
    setOutput(""); // Clear output when typing
  };

  const handleClick = () => {
    setOutput(`You typed: ${name}`);
  };

  return (
    <div>
      <input value={name} onChange={handleChange} placeholder="Type your name" />
      <button onClick={handleClick} style={{ marginLeft: 8 }}>Show Value</button>
      {output && <div style={{ marginTop: 8, color: 'green' }}>{output}</div>}
    </div>
  );
}
```
This example shows how typing updates state, and clicking the button displays the current value. Try adding a similar pattern to your own components!

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

## 🛠️ Today's Hands-On Project: Name Input with Validation

### Step 1: Create NameInput Component
**File**: `src/components/NameInput.tsx`

```tsx
import { useState } from 'react';

const NameInput = () => {
  // State for the input value
  const [name, setName] = useState("");
  
  // State for showing greeting
  const [showGreeting, setShowGreeting] = useState(false);

  // Validation logic
  const isValid = name.length >= 2 && name.length <= 50;
  const isEmpty = name.length === 0;
  
  // Error message logic
  const getErrorMessage = () => {
    if (isEmpty) return "";
    if (name.length < 2) return "Name must be at least 2 characters";
    if (name.length > 50) return "Name must be less than 50 characters";
    return "";
  };

  // Handle input changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setShowGreeting(false); // Hide greeting when typing
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    if (isValid) {
      setShowGreeting(true);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold mb-4">Name Input Demo</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Enter Your Name:
          </label>
          
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Type your name here..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              isEmpty ? 'border-gray-300 focus:ring-blue-500' :
              isValid ? 'border-green-500 focus:ring-green-500' :
              'border-red-500 focus:ring-red-500'
            }`}
          />
          <div className="text-xs text-gray-500 mt-1">
            {name.length}/50 characters
          </div>
          {getErrorMessage() && (
            <div className="text-red-500 text-sm mt-1">
              {getErrorMessage()}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-2 px-4 rounded-md font-medium ${
            isValid 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Generate Greeting
        </button>
      </form>
      {showGreeting && isValid && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-md">
          <p className="text-green-800">
            Hello, {name}! Welcome to the Data Discovery Tool! 🎉
          </p>
        </div>
      )}
    </div>
  );
};

export default NameInput;
```


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
