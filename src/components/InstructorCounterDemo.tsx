import { useState } from 'react';

/**
 * 🎓 INSTRUCTOR DEMO COMPONENT
 * 
 * This component is designed for live demonstration during Week 2 Zoom sessions.
 * It shows useState concepts with clear visual feedback and multiple interaction patterns.
 * 
 * Usage Instructions:
 * 1. Navigate to /demo-counter route or import this component
 * 2. Use during "React State Deep Dive" section of Week 2
 * 3. Students can follow along by copying this exact code
 */

export const InstructorCounterDemo = () => {
  // 🎯 STATE 1: Basic Counter (demonstrate useState basics)
  const [count, setCount] = useState(0);
  
  // 🎯 STATE 2: User Name (demonstrate string state and input handling)
  const [userName, setUserName] = useState('');
  
  // 🎯 STATE 3: Demo Mode (demonstrate boolean state and conditional rendering)
  const [isDemoMode, setIsDemoMode] = useState(true);
  
  // 🎯 STATE 4: Click History (demonstrate array state)
  const [clickHistory, setClickHistory] = useState<string[]>([]);

  // 📚 Event Handlers (demonstrate different patterns)
  const incrementCounter = () => {
    const newCount = count + 1;
    setCount(newCount);
    
    // Update history
    setClickHistory(prev => [...prev, `Clicked +1 (total: ${newCount})`]);
  };

  const decrementCounter = () => {
    const newCount = count - 1;
    setCount(newCount);
    
    // Update history
    setClickHistory(prev => [...prev, `Clicked -1 (total: ${newCount})`]);
  };

  const resetCounter = () => {
    setCount(0);
    setClickHistory(prev => [...prev, 'Reset counter to 0']);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const toggleDemoMode = () => {
    setIsDemoMode(!isDemoMode);
  };

  const clearHistory = () => {
    setClickHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          🎓 useState Live Demo
        </h1>
        <p className="text-gray-600">
          Interactive demonstration for Week 2 - React State Management
        </p>
      </div>

      {/* Demo Mode Toggle */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isDemoMode}
            onChange={toggleDemoMode}
            className="w-4 h-4"
          />
          <span className="font-medium">Demo Mode (show extra explanations)</span>
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Counter Demo */}
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              📊 Counter Demo
            </h2>
            
            {/* Current Count Display */}
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {count}
              </div>
              <p className="text-gray-600">Current Count</p>
            </div>

            {/* Counter Controls */}
            <div className="flex gap-3 justify-center mb-4">
              <button
                onClick={decrementCounter}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold text-xl hover:bg-red-600 transition-colors"
              >
                -1
              </button>
              <button
                onClick={resetCounter}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={incrementCounter}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-bold text-xl hover:bg-green-600 transition-colors"
              >
                +1
              </button>
            </div>

            {/* State Explanation (conditional rendering) */}
            {isDemoMode && (
              <div className="bg-yellow-100 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-bold text-yellow-800 mb-2">🔍 What's Happening:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• <code>count</code> state: {count}</li>
                  <li>• <code>setCount</code> triggers re-render</li>
                  <li>• React updates only what changed</li>
                  <li>• Event handlers update state</li>
                </ul>
              </div>
            )}
          </div>

          {/* Name Input Demo */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-4">
              ✏️ Input Handling Demo
            </h3>
            
            <div className="space-y-4">
              <input
                type="text"
                value={userName}
                onChange={handleNameChange}
                placeholder="Enter your name..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              
              <div className="p-3 bg-white rounded border">
                <p className="text-lg">
                  Hello, {userName || 'Anonymous'}! 👋
                </p>
              </div>

              {isDemoMode && userName && (
                <div className="bg-green-100 p-3 rounded border-l-4 border-green-500">
                  <p className="text-sm text-green-700">
                    <strong>State value:</strong> "{userName}" ({userName.length} characters)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Click History */}
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-800">
                📜 Click History
              </h3>
              <button
                onClick={clearHistory}
                className="px-3 py-1 text-sm bg-purple-200 text-purple-800 rounded hover:bg-purple-300 transition-colors"
              >
                Clear
              </button>
            </div>

            <div className="bg-white rounded border h-64 overflow-y-auto p-3">
              {clickHistory.length === 0 ? (
                <p className="text-gray-500 italic">No clicks yet... try the buttons!</p>
              ) : (
                <ul className="space-y-2">
                  {clickHistory.map((action, index) => (
                    <li key={index} className="text-sm p-2 bg-gray-50 rounded">
                      <span className="font-mono text-purple-600">#{index + 1}</span> {action}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {isDemoMode && (
              <div className="mt-4 bg-purple-100 p-3 rounded border-l-4 border-purple-500">
                <p className="text-sm text-purple-700">
                  <strong>Array State:</strong> {clickHistory.length} items | 
                  Using spread operator <code>[...prev, newItem]</code>
                </p>
              </div>
            )}
          </div>

          {/* State Summary */}
          {isDemoMode && (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                🧠 Current State Summary
              </h3>
              
              <div className="space-y-3 font-mono text-sm">
                <div className="p-3 bg-white rounded border">
                  <strong>count:</strong> <span className="text-blue-600">{count}</span>
                </div>
                <div className="p-3 bg-white rounded border">
                  <strong>userName:</strong> <span className="text-green-600">"{userName}"</span>
                </div>
                <div className="p-3 bg-white rounded border">
                  <strong>isDemoMode:</strong> <span className="text-purple-600">{String(isDemoMode)}</span>
                </div>
                <div className="p-3 bg-white rounded border">
                  <strong>clickHistory:</strong> <span className="text-orange-600">[{clickHistory.length} items]</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code Examples for Students */}
      {isDemoMode && (
        <div className="mt-8 bg-gray-900 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-green-400">
            💻 Code You're Seeing Live:
          </h3>
          
          {/* Destructuring Explanation */}
          <div className="mb-6 p-4 bg-blue-900 rounded border-l-4 border-blue-400">
            <h4 className="text-blue-300 font-bold mb-2">🔍 Array Destructuring Explained:</h4>
            <pre className="text-sm text-blue-100">
{`// What useState returns (an array):
const stateArray = useState(0);
// stateArray[0] = current value (0)
// stateArray[1] = setter function

// Destructuring makes it cleaner:
const [count, setCount] = useState(0);
//     ↑        ↑
//  value   setter
//
// Same as writing:
// const count = stateArray[0];
// const setCount = stateArray[1];`}
            </pre>
          </div>
          
          <pre className="text-sm overflow-x-auto">
{`// useState declarations
const [count, setCount] = useState(0);
const [userName, setUserName] = useState('');
const [isDemoMode, setIsDemoMode] = useState(true);
const [clickHistory, setClickHistory] = useState<string[]>([]);

// Event handler example
const incrementCounter = () => {
  const newCount = count + 1;
  setCount(newCount);
  setClickHistory(prev => [...prev, \`Clicked +1 (total: \${newCount})\`]);
};`}
          </pre>
        </div>
      )}
    </div>
  );
};

export default InstructorCounterDemo;