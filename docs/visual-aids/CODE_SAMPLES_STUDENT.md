# 🧩 React Code Samples for Students

**Clean examples to help you learn React step by step**

---

## 🚀 **Getting Started: Building Your First Component**

React components are like LEGO blocks - you build small pieces and combine them to create amazing applications!

### **Step 1: Your First Component**
```jsx
const DataUpload = () => {
  return <div>Hello World!</div>;
};
```
**What you're learning:** Basic component structure - it's just a function that returns JSX!

### **Step 2: Making It Flexible with Props**
```jsx
const DataUpload = ({ message }) => {
  return <div>{message}</div>;
};

// How to use it:
<DataUpload message="Welcome to file upload!" />
<DataUpload message="Ready to analyze your data?" />
```
**What you're learning:** Props let you customize components - same component, different content!

### **Step 3: Adding Interactivity**
```jsx
const DataUpload = ({ onDataLoad, message }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onDataLoad}>Upload File</button>
    </div>
  );
};

// How a parent uses it:
const App = () => {
  const handleFileUpload = () => {
    console.log("File upload started!");
  };

  return (
    <DataUpload 
      message="Ready to upload your data?" 
      onDataLoad={handleFileUpload}
    />
  );
};
```
**What you're learning:** Components can communicate - child components can call functions from their parents!

---

## 📊 **Understanding Component Flow**

### **Data Flows Down, Events Flow Up**
```
Parent Component
    ↓ (sends data via props)
Child Component
    ↑ (sends events via function calls)
Parent Component (receives notification)
```

Think of it like this:
- **Parent gives instructions** → Child receives via props
- **Child reports back** → Parent gets notified via function calls

---

## 🧠 **Adding Memory with State**

Components can remember things using `useState`:

### **Simple Counter Example**
```jsx
import { useState } from 'react';

const Counter = () => {
  // This creates memory for our component
  const [count, setCount] = useState(0);
  //     ↑        ↑           ↑
  //  current  function   starting
  //   value  to change    value
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Add One
      </button>
    </div>
  );
};
```

### **Text Input Example**
```jsx
const NameInput = () => {
  const [name, setName] = useState('');
  
  return (
    <div>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name}!</p>
    </div>
  );
};
```
**Key Insight:** Every time you type, the component remembers what you typed and shows it!

---

## 🎯 **Practice Exercises**

### **Exercise 1: Personalize the Component**
```jsx
// Make this component show YOUR name
const PersonalUpload = ({ studentName }) => {
  return <div>{studentName}'s File Upload Tool</div>;
};

// Try using it like this:
<PersonalUpload studentName="Your Name Here" />
```

### **Exercise 2: Add Color Customization**
```jsx
// Add a color prop to change the text color
const ColorfulMessage = ({ message, color }) => {
  return (
    <div style={{ color: color }}>
      {message}
    </div>
  );
};

// Experiment with different colors:
<ColorfulMessage message="Hello!" color="blue" />
<ColorfulMessage message="Welcome!" color="green" />
```

### **Exercise 3: Build a Simple Calculator**
```jsx
const Calculator = () => {
  const [number, setNumber] = useState(0);
  
  return (
    <div>
      <p>Number: {number}</p>
      <button onClick={() => setNumber(number + 1)}>Add 1</button>
      <button onClick={() => setNumber(number - 1)}>Subtract 1</button>
      <button onClick={() => setNumber(0)}>Reset</button>
    </div>
  );
};
```

---

## 🔄 **Handling User Actions**

### **Button Clicks**
```jsx
const ButtonExample = () => {
  const handleClick = () => {
    alert("Button was clicked!");
  };
  
  return (
    <button onClick={handleClick}>
      Click Me!
    </button>
  );
};
```

### **Form Submissions**
```jsx
const SimpleForm = () => {
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault(); // Stops page from refreshing
    console.log("Email entered:", email);
    setEmail(''); // Clear the form
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## 🎨 **Showing Different Content**

### **Show/Hide Content**
```jsx
const ShowHideExample = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Message
      </button>
      
      {isVisible && <p>Surprise! Here's the hidden message!</p>}
    </div>
  );
};
```

### **Different Messages Based on State**
```jsx
const StatusMessage = () => {
  const [status, setStatus] = useState('waiting');
  
  return (
    <div>
      <button onClick={() => setStatus('loading')}>Start Loading</button>
      <button onClick={() => setStatus('success')}>Mark Success</button>
      <button onClick={() => setStatus('error')}>Mark Error</button>
      
      {status === 'waiting' && <p>⏳ Waiting to start...</p>}
      {status === 'loading' && <p>🔄 Loading...</p>}
      {status === 'success' && <p>✅ Success!</p>}
      {status === 'error' && <p>❌ Something went wrong!</p>}
    </div>
  );
};
```

---

## 📝 **Working with Lists**

### **Simple List**
```jsx
const FruitList = () => {
  const fruits = ['Apple', 'Banana', 'Orange', 'Grape'];
  
  return (
    <div>
      <h3>My Favorite Fruits:</h3>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
  );
};
```

### **List of Objects**
```jsx
const StudentList = () => {
  const students = [
    { id: 1, name: 'Alice', grade: 'A' },
    { id: 2, name: 'Bob', grade: 'B' },
    { id: 3, name: 'Charlie', grade: 'A-' }
  ];
  
  return (
    <div>
      <h3>Class Roster:</h3>
      {students.map(student => (
        <div key={student.id}>
          <strong>{student.name}</strong> - Grade: {student.grade}
        </div>
      ))}
    </div>
  );
};
```

---

## 🔧 **Side Effects with useEffect**

Sometimes you need to do things after your component appears on screen:

### **Run Once When Component Loads**
```jsx
import { useState, useEffect } from 'react';

const WelcomeMessage = () => {
  const [message, setMessage] = useState('');
  
  // This runs once when the component first appears
  useEffect(() => {
    setMessage('Welcome! Component loaded successfully.');
  }, []); // Empty array means "run only once"
  
  return <div>{message}</div>;
};
```

### **Update Page Title**
```jsx
const TitleUpdater = () => {
  const [count, setCount] = useState(0);
  
  // This runs every time count changes
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]); // Run when count changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment (watch the browser tab!)
      </button>
    </div>
  );
};
```

---

## 🎯 **Real Project Examples**

### **File Upload Component (Like Your Project)**
```jsx
const FileUploader = ({ onFileSelected }) => {
  const [fileName, setFileName] = useState('');
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelected(file); // Tell parent component about the file
    }
  };
  
  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileChange}
        accept=".csv"
      />
      {fileName && <p>Selected: {fileName}</p>}
    </div>
  );
};
```

### **Data Display Component**
```jsx
const DataDisplay = ({ data, fileName }) => {
  if (!data) {
    return <p>No data uploaded yet. Please select a file.</p>;
  }
  
  return (
    <div>
      <h3>Data from: {fileName}</h3>
      <div style={{ 
        background: '#f5f5f5', 
        padding: '10px', 
        borderRadius: '5px' 
      }}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};
```

### **Complete Mini App**
```jsx
const MiniDataApp = () => {
  const [data, setData] = useState(null);
  const [fileName, setFileName] = useState('');
  
  const handleFileSelected = (file) => {
    setFileName(file.name);
    // In a real app, you'd process the file here
    setData({ message: `Processed ${file.name}`, rows: 100 });
  };
  
  return (
    <div>
      <h1>Mini Data Analysis App</h1>
      <FileUploader onFileSelected={handleFileSelected} />
      <DataDisplay data={data} fileName={fileName} />
    </div>
  );
};
```

---

## 🏗️ **Building Reusable Components**

### **Card Component**
```jsx
const Card = ({ title, children }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};

// How to use it:
<Card title="User Profile">
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
</Card>
```

### **Button Component**
```jsx
const Button = ({ children, color = 'blue', onClick }) => {
  return (
    <button 
      onClick={onClick}
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );
};

// How to use it:
<Button color="green" onClick={() => console.log('Saved!')}>
  Save
</Button>
<Button color="red" onClick={() => console.log('Deleted!')}>
  Delete
</Button>
```

---

## ❓ **Common Questions & Answers**

### **Q: Why do we need curly braces `{}` in JSX?**
**A:** Curly braces let you use JavaScript inside JSX. Without them, everything is treated as text.
```jsx
<div>Hello {name}</div>     // Uses JavaScript variable
<div>Hello name</div>       // Shows literal text "name"
```

### **Q: What's the difference between props and state?**
**A:** 
- **Props** = Data coming FROM parent components (like function parameters)
- **State** = Data the component remembers for itself (like component memory)

### **Q: When should I use useEffect?**
**A:** Use `useEffect` when you need to:
- Fetch data from an API
- Update the page title
- Set up timers
- Do anything AFTER the component renders

### **Q: Why do I need keys in lists?**
**A:** Keys help React track which items changed, were added, or removed. It makes your app faster and prevents bugs.

---

## 🎯 **Next Steps**

### **What to Practice:**
1. **Create simple components** without props first
2. **Add props** to make them flexible
3. **Add state** to make them interactive
4. **Combine components** to build bigger features

### **Challenge Yourself:**
- Build a todo list app
- Create a simple calculator
- Make a photo gallery
- Build a contact form

### **Resources to Explore:**
- React documentation: [reactjs.org](https://reactjs.org)
- Practice challenges: Try building the examples above
- Ask questions in class or online forums

---

## 💡 **Remember:**

- **Components are just functions** that return JSX
- **Props flow down** from parent to child
- **Events flow up** from child to parent
- **State is component memory** - use it for data that changes
- **Practice makes perfect** - start simple and build up!

---

**Every React developer started exactly where you are now. Keep practicing, ask questions, and have fun building! 🚀**

---

*These examples are from your actual course project. You'll see these patterns everywhere in React development!*