# 📚 WEEK 7 STUDENT GUIDE
**Session 7: API Integration & AI Chat Features**

## 🎯 LEARNING OBJECTIVES
By the end of this session, you will:
- ✅ Understand what APIs are and how apps use them
- ✅ Use async/await for asynchronous programming
- ✅ Build a working AI chat interface
- ✅ Handle API errors and loading states
- ✅ Connect AI responses to your data

---

## ⏰ SESSION TIMELINE & ACTIVITIES

### 0:00 - 0:10: Welcome & Check-In
- Share insights from your dataset
- Discuss: "How could AI make these insights better?"
- See examples of AI analyzing data (ChatGPT, Claude, etc.)

### 0:10 - 0:30: Concepts & Code

#### **What Are APIs?**
- APIs are like restaurant waiters: you (the app) ask for something, the waiter (API) brings it from the kitchen (AI service).
- **Definition**: Application Programming Interface—a way for software to talk to other software.
- **Examples**: Weather apps, social media logins, maps.

#### **Async Programming**
- Some operations take time (like waiting for food).
- Use `async` and `await` so your app doesn’t freeze.

```javascript
// ❌ This would freeze the browser
const response = waitForAIResponse(); // Takes 3 seconds
console.log('This runs after 3 seconds');

// ✅ This doesn't freeze the browser
const getAIResponse = async () => {
  setLoading(true);
  const response = await fetch('/api/ai');
  const data = await response.json();
  setLoading(false);
  return data;
};
```

- `async` functions can wait for things
- `await` pauses until a promise resolves
- Loading states keep users informed
- Error handling prevents crashes

#### **Mock AI Implementation**
- Start with a mock AI to learn patterns without API complexity
- No API keys needed, easy to test

```javascript
const mockAIResponse = (question) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (question.includes('average')) {
        resolve('The average value in your dataset is 78.3, which indicates...');
      } else if (question.includes('trend')) {
        resolve('I can see a positive trend in your data, with growth of...');
      } else {
        resolve('That\'s an interesting question about your data...');
      }
    }, 1500);
  });
};
```

### HTTP Methods
- **GET**: Get data
- **POST**: Send new data
- **PUT/PATCH**: Update data
- **DELETE**: Remove data


### Why Use Express and axios?

#### **Express: The Backend API Builder**
- **What is Express?**
  - Express is a popular Node.js framework for building web servers and APIs. It lets you easily create endpoints that your frontend can talk to.
- **Why do we use Express?**
  - It handles HTTP requests (GET, POST, etc.) and responses.
  - It lets you organize your backend logic, connect to databases, and process data before sending it to the frontend.
  - Express is fast, flexible, and widely used in the industry.
- **How does Express fit in?**
  - You write Express code in your server files (like `server.js` or in a backend folder).
  - You define routes (endpoints) like `/api/messages` that your React app can call.
  - Example:
    ```js
    // In your Express backend
    app.post('/api/messages', (req, res) => {
      const { text } = req.body;
      // Save message, then respond
      res.json({ message: text });
    });
    ```
- **Analogy:**
  - Express is like the kitchen in a restaurant. It receives orders (requests), prepares the food (processes data), and sends it back to the waiter (API response).

#### **axios: The Frontend Messenger**
- **What is axios?**
  - axios is a JavaScript library for making HTTP requests from the browser (or Node.js). It’s used in React to talk to your backend APIs.
- **Why do we use axios?**
  - It makes it easy to send GET, POST, PUT, DELETE requests.
  - It handles promises, so you can use async/await for clean code.
  - axios automatically parses JSON responses and lets you send data in the right format.
- **How does axios fit in?**
  - You use axios in your React components to call backend endpoints.
  - Example:
    ```js
    // In your React chat component
    import axios from 'axios';

    const sendMessage = async (text) => {
      const res = await axios.post('/api/messages', { text });
      // res.data contains the response from backend
    };
    ```
- **Analogy:**
  - axios is like the waiter in a restaurant. It takes your order (request) from the table (frontend), brings it to the kitchen (Express backend), and returns with your food (response).

#### **How They Work Together**
- **Express** creates the endpoints and handles the logic on the server.
- **axios** calls those endpoints from your React app, sending and receiving data.
- This separation keeps your code organized: backend logic in Express, frontend interactions in React with axios.

**Where to put them:**
- Express code goes in your server files (e.g., `server.js` or backend folder).
- axios code goes in your React component (e.g., `ChatInterface`).

### Calling an API
```js
import axios from 'axios';
const sendMessage = async (text) => {
  const res = await axios.post('/api/messages', { text });
  // res.data contains the response
};
```

### Creating an API Endpoint
```js
app.post('/api/messages', (req, res) => {
  const { text } = req.body;
  res.json({ message: text });
});
```

### Testing APIs with Postman
- Download Postman
- Enter API URL (e.g., `http://localhost:3000/api/messages`)
- Choose method (GET/POST)
- For POST, add JSON body: `{ "text": "Hello" }`
- Click Send and see the response

---

## 🛠️ BUILD: AI Chat Interface Step-by-Step

### Phase 1: Create Basic Chat Interface
**File:** `src/components/MockAIChat.tsx`

**Step 1:** Component setup and state
```tsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bot, User, Send } from 'lucide-react';

const MockAIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Data Assistant (Mock)
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Chat interface will go here */}
      </CardContent>
    </Card>
  );
};

export default MockAIChat;
```

**Step 2:** Add mock AI response logic
```tsx
const MockAIChat = () => {
  // ...existing code...
  const getMockResponse = async (question) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lowerQ = question.toLowerCase();
    if (lowerQ.includes('average') || lowerQ.includes('mean')) {
      return "Based on your data, the average value appears to be in the mid-range. This suggests a balanced distribution with most values clustering around the center.";
    }
    if (lowerQ.includes('trend') || lowerQ.includes('pattern')) {
      return "I can see an interesting upward trend in your data! There appears to be consistent growth in the later periods, which could indicate improving performance or seasonal effects.";
    }
    if (lowerQ.includes('highest') || lowerQ.includes('maximum') || lowerQ.includes('peak')) {
      return "The highest value in your dataset represents a peak performance period. This could indicate optimal conditions or a particularly successful time period worth studying further.";
    }
    if (lowerQ.includes('lowest') || lowerQ.includes('minimum')) {
      return "The minimum value might represent a challenging period or starting point. Understanding what caused this low point could provide valuable insights for improvement.";
    }
    if (lowerQ.includes('why') || lowerQ.includes('reason')) {
      return "While I can see the patterns in your numbers, determining the 'why' requires domain knowledge. Consider external factors like seasonality, market conditions, or operational changes during those periods.";
    }
    return "That's an interesting question about your data! The patterns I see suggest there are meaningful insights to explore. Could you be more specific about what aspect interests you most?";
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);
    try {
      const aiResponse = await getMockResponse(currentInput);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "Sorry, I'm having trouble processing your request right now. Please try again!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ...existing code...
};
```

**Step 3:** Add chat display and input
```tsx
<CardContent className="space-y-4">
  {/* Chat Messages */}
  <div className="h-64 overflow-y-auto space-y-3 p-3 bg-gray-50 rounded">
    {messages.length === 0 ? (
      <div className="text-center text-gray-500 mt-8">
        <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>Ask me anything about your data!</p>
        <p className="text-sm mt-1">Try: "What's the average?" or "Do you see any trends?"</p>
      </div>
    ) : (
      messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
            msg.type === 'user' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white border shadow-sm'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              {msg.type === 'user' ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
              <span className="text-xs opacity-75">
                {msg.type === 'user' ? 'You' : 'AI Assistant'}
              </span>
            </div>
            <p className="text-sm">{msg.content}</p>
          </div>
        </div>
      ))
    )}
    {loading && (
      <div className="flex justify-start">
        <div className="bg-white border shadow-sm max-w-xs px-3 py-2 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Bot className="h-4 w-4" />
            <span className="text-xs opacity-75">AI Assistant</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <span className="text-xs text-gray-500 ml-2">Thinking...</span>
          </div>
        </div>
      </div>
    )}
  </div>
  {/* Input Area */}
  <div className="flex gap-2">
    <Input
      placeholder="Ask about your data..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
      disabled={loading}
      className="flex-1"
    />
    <Button onClick={handleSend} disabled={loading || !input.trim()}>
      <Send className="h-4 w-4" />
    </Button>
  </div>
  {/* Quick Suggestions */}
  <div className="flex flex-wrap gap-2">
    {["What trends do you see?", "What's the average?", "Any outliers?", "Explain the data"].map(suggestion => (
      <Badge 
        key={suggestion}
        variant="outline" 
        className="cursor-pointer hover:bg-gray-100"
        onClick={() => setInput(suggestion)}
      >
        {suggestion}
      </Badge>
    ))}
  </div>
</CardContent>
```

### Phase 2: Add to Homepage
- Import and display `MockAIChat` in `src/pages/Index.tsx`
```tsx
import MockAIChat from '@/components/MockAIChat';
<MockAIChat />
```
- Test the interface: try questions, see responses, test suggestions, Enter key

### Phase 3: Connect to Data Context
- Make AI aware of your actual data
- Pass data to the AI component
```tsx
const MockAIChat = ({ data = [] }) => {
  // ...existing code...
  const getMockResponse = async (question) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lowerQ = question.toLowerCase();
    if (data.length > 0) {
      const values = data.map(item => 
        typeof item === 'object' ? Object.values(item).find(val => typeof val === 'number') : item
      ).filter(val => typeof val === 'number');
      if (values.length > 0) {
        const average = values.reduce((a, b) => a + b, 0) / values.length;
        const max = Math.max(...values);
        const min = Math.min(...values);
        if (lowerQ.includes('average') || lowerQ.includes('mean')) {
          return `Based on your actual data, the average value is ${average.toFixed(2)}.`;
        }
        if (lowerQ.includes('highest') || lowerQ.includes('maximum')) {
          return `The highest value in your dataset is ${max}.`;
        }
        if (lowerQ.includes('lowest') || lowerQ.includes('minimum')) {
          return `The minimum value in your dataset is ${min}.`;
        }
      }
    }
    // ...rest of mock responses...
  };
  // ...rest of component...
};
```
- Update homepage to pass data:
```tsx
<MockAIChat data={data} />
```

---

## 🏠 HOMEWORK: Integrate AI Endpoint into Chat Homepage

**Goal:**
Add backend AI integration to your chat homepage.

**Instructions:**
1. Use your chat homepage (`src/pages/Index.tsx`).
2. When you send a message, POST it to the AI endpoint you built (`/api/messages`).
   - In this session, you are building the `/api/messages` endpoint for your chat interface. This endpoint will handle chat messages and return AI responses in a conversational format.
   - Last week, you built an `/insight` endpoint for single-shot AI insights for your dashboard.
   - The difference: `/insight` was for one-off data analysis, while `/api/messages` is for ongoing chat between you and the AI.
   - For this assignment, POST each chat message to `/api/messages`. Your backend should process the message and return a reply, so the chat UI can display both sides of the conversation.
   - This transition helps you move from single-shot AI insights to a full conversational AI experience.
3. Display both your message and the AI response in the chat history.
4. Make sure your Express server is running and matches the endpoint.

**Example:**
```js
const handleSend = async () => {
  if (!input.trim()) return;
  setMessages(prev => [...prev, { type: 'user', content: input }]);
  setInput('');
  setLoading(true);
  const res = await axios.post('/api/messages', { text: input });
  setMessages(prev => [...prev, { type: 'ai', content: res.data.text }]);
  setLoading(false);
};
```

**Test:**
- Try sending a message and confirm you see both your message and the AI reply.

**Extra Challenge:**
- Update your backend to keep track of conversation history or make the AI responses smarter.

---

## 🆘 TROUBLESHOOTING TIPS

### Common Issues
1. **Async function not awaited**
```javascript
// ❌ Missing await
const handleSend = async () => {
  const response = getMockResponse(input); // Returns Promise!
  setMessages([...messages, response]); // Wrong!
};
// ✅ Proper await
const handleSend = async () => {
  const response = await getMockResponse(input);
  setMessages([...messages, response]);
};
```

2. **State updates in async functions**
```javascript
// ❌ Stale closure issue
const handleSend = async () => {
  setMessages([...messages, userMessage]); // messages might be stale
  const response = await getMockResponse(input);
  setMessages([...messages, aiMessage]); // messages definitely stale!
};
// ✅ Functional updates
const handleSend = async () => {
  setMessages(prev => [...prev, userMessage]);
  const response = await getMockResponse(input);
  setMessages(prev => [...prev, aiMessage]);
};
```

3. **Memory leaks with async operations**
```javascript
// ❌ Component might unmount during async operation
const handleSend = async () => {
  const response = await getMockResponse(input);
  setMessages([...messages, response]); // Error if component unmounted!
};
// ✅ Check if component still mounted (advanced)
useEffect(() => {
  let isMounted = true;
  const handleSend = async () => {
    const response = await getMockResponse(input);
    if (isMounted) {
      setMessages([...messages, response]);
    }
  };
  return () => { isMounted = false; };
}, []);
```

### Learning Issues
- "Promises are confusing": Use the restaurant waiter analogy, practice with setTimeout
- "When do I use async/await?": Any operation that takes time (API calls, file reading, timers)
- "Loading states seem unnecessary": See examples of apps without loading states (bad UX)

---

## 📊 ASSESSMENT RUBRIC

**A (Exceeds Expectations):**
- Builds a sophisticated AI chat interface
- Uses async/await and error handling correctly
- Adds advanced features (memory, data integration)
- Explains async programming concepts

**B (Meets Expectations):**
- Creates working AI chat with guidance
- Implements basic async functionality
- Understands loading states and user experience
- Connects AI responses to data

**C (Approaching Expectations):**
- Basic chat interface with help
- Async works but needs help with error handling
- Shows effort with conversational UI

**D (Needs Support):**
- Can't create working async interface
- Struggles with Promise and async/await
- Needs extra help

---

## 🔍 WHAT SUCCESS LOOKS LIKE
- You ask about connecting to real AI APIs
- You want to improve AI response quality
- You experiment with conversation patterns
- You understand async programming and user experience

**Red flags:**
- Confused about Promise vs async/await
- Struggling with state management in async functions
- Not understanding loading states
- Trouble with error handling

---

**💡 TIP:** This is one of the most exciting sessions—you're building something that feels truly intelligent! You're learning the same patterns used in real AI apps. Next week, you'll polish your app for production and connect to real AI APIs!
