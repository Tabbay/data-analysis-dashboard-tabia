
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 📚 Week 1: Foundation Building - React Application Entry Point
// Students - This is where your React journey begins! This file is the entry point of your data analysis platform.
// 
// Learning objectives for your 10-week journey:
// - Master React fundamentals and modern patterns
// - Build a professional data analysis dashboard
// - Integrate advanced features like AI chat and real-time insights
//
// What's happening in this file:
// 1. We import React's createRoot function (the modern React 18 approach)
// 2. We import our main App component (the heart of your application)
// 3. We import global CSS styles that create your app's visual foundation
// 4. We tell React to render your App inside the HTML element with id="root"
//
// Why this matters:
// - Every React app needs an entry point - this is yours!
// - The createRoot API is React 18's modern way to start applications
// - This pattern is used in virtually every React project you'll encounter
//
// Your next steps in Week 1:
// 1. Explore App.tsx to see how components work together
// 2. Check out index.css to understand your design system
// 3. Run `npm run dev` to see your app come to life

createRoot(document.getElementById("root")!).render(<App />);

// 💡 HINT: The exclamation mark (!) tells TypeScript we're certain the element exists
// This is called a "non-null assertion operator"
// We know the element exists because it's defined in index.html
