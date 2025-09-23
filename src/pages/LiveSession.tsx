import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// 🎯 Basic Counter Component
const BasicCounter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">1. Basic Counter</CardTitle>
        <p className="text-sm text-gray-600">Simple useState with button click</p>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">{count}</div>
          <div className="space-x-2">
            <Button onClick={() => setCount(count + 1)}>+1</Button>
            <Button variant="outline" onClick={() => setCount(0)}>Reset</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 🎯 Multi-Button State Component
const MultiButtonTracker = () => {
  const [clicks, setClicks] = useState(0);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">2. Multi-Button State</CardTitle>
        <p className="text-sm text-gray-600">Multiple buttons affecting same state</p>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <div>
            <span className="text-2xl font-bold">Total clicks: </span>
            <Badge variant="secondary" className="text-xl px-3 py-1">{clicks}</Badge>
          </div>
          <div className="space-x-2">
            <Button onClick={() => setClicks(clicks + 1)}>+1</Button>
            <Button onClick={() => setClicks(clicks + 5)}>+5</Button>
            <Button variant="destructive" onClick={() => setClicks(clicks - 1)}>-1</Button>
            <Button variant="outline" onClick={() => setClicks(0)}>Reset</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 🎯 Form Input with State
const NameTracker = () => {
  const [name, setName] = useState('');
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">3. Form Input State</CardTitle>
        <p className="text-sm text-gray-600">Controlled input with real-time updates</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="text-center">
            <p className="text-lg">
              Hello, <span className="font-bold text-blue-600">{name || 'stranger'}</span>! 👋
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 🎯 Interactive Event Handling Playground
const EventPlayground = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue');
  const [message, setMessage] = useState('Welcome!');
  
  // Multiple event handlers working together
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length > 0) {
      setMessage(`Hello ${e.target.value}! You have ${count} points.`);
    } else {
      setMessage('Welcome!');
    }
  };
  
  const handleCountChange = (amount: number) => {
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">4. Interactive Event Playground</CardTitle>
        <p className="text-sm text-gray-600">Multiple states working together with conditional logic</p>
      </CardHeader>
      <CardContent>
        <div 
          className="p-6 rounded-lg border-2 space-y-4" 
          style={{ borderColor: color, backgroundColor: `${color}10` }}
        >
          <h3 className="text-xl font-bold" style={{ color: color }}>{message}</h3>
          
          <div className="flex items-center space-x-4">
            <input 
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <Badge variant="outline">Count: {count}</Badge>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => handleCountChange(1)}>+1 Point</Button>
            <Button onClick={() => handleCountChange(5)}>+5 Points</Button>
            <Button variant="destructive" onClick={() => handleCountChange(-1)}>-1 Point</Button>
            <Button variant="outline" onClick={() => setCount(0)}>Reset Count</Button>
          </div>
          
          <p className="text-sm text-gray-600">
            🎯 Try typing your name and clicking buttons! Watch how everything connects!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// 🎯 Upload Progress Simulator (from main project)
const UploadProgressSimulator = () => {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.random() * 15 + 5; // Random progress chunks
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        
        return newProgress;
      });
    }, 300);
  };

  const resetProgress = () => {
    setProgress(0);
    setIsUploading(false);
  };

  const addProgress = () => {
    if (!isUploading && progress < 100) {
      setProgress(prev => Math.min(prev + 25, 100));
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">5. Upload Progress Simulator</CardTitle>
        <p className="text-sm text-gray-600">Complex state with intervals and conditional rendering</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Progress Text and Status */}
          <div className="text-center">
            <span className="text-3xl font-bold text-blue-600">{Math.round(progress)}%</span>
            <div className="text-sm text-gray-600 mt-2">
              {isUploading && "📤 Uploading file..."}
              {!isUploading && progress === 0 && "📁 Ready to upload"}
              {!isUploading && progress > 0 && progress < 100 && "⏸️ Upload paused"}
              {!isUploading && progress === 100 && "✅ Upload complete!"}
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex justify-center gap-2 flex-wrap">
            <Button 
              onClick={startUpload}
              disabled={isUploading || progress === 100}
            >
              {isUploading ? 'Uploading...' : 'Start Upload'}
            </Button>
            
            <Button 
              variant="secondary"
              onClick={addProgress}
              disabled={isUploading || progress >= 100}
            >
              +25%
            </Button>
            
            <Button 
              variant="outline"
              onClick={resetProgress}
              disabled={isUploading}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 🎯 Toggle and Boolean State
const ToggleDemo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">6. Boolean State & Toggles</CardTitle>
        <p className="text-sm text-gray-600">Working with true/false states</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Show secret message</span>
              <Button 
                variant={isVisible ? "default" : "outline"}
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? 'Hide' : 'Show'}
              </Button>
            </div>
            
            {isVisible && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                🎉 Secret: React state is awesome!
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span>Dark mode</span>
              <Button 
                variant={isDarkMode ? "default" : "outline"}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? 'Light' : 'Dark'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <Button 
                variant={notifications ? "default" : "outline"}
                onClick={() => setNotifications(!notifications)}
              >
                {notifications ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div className="text-sm text-gray-600">
            Current state: Dark={isDarkMode ? 'true' : 'false'}, 
            Notifications={notifications ? 'true' : 'false'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// 🎯 Main Live Session Page Component
export default function LiveSession() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            Week 2: Live Session Playground
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive React state examples for hands-on learning. Try each component and watch state in action!
          </p>
          <Badge variant="secondary" className="mt-2">
            🎯 Copy any code you want to experiment with
          </Badge>
        </div>

        {/* Components Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <BasicCounter />
          <MultiButtonTracker />
          <NameTracker />
          <EventPlayground />
          <UploadProgressSimulator />
          <ToggleDemo />
        </div>

        {/* React Developer Tools Instructions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-center">🔍 React Developer Tools Challenge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold mb-2">Try This:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Press F12 to open browser developer tools</li>
                  <li>Click the "Components" tab (React DevTools)</li>
                  <li>Find any component above (like BasicCounter)</li>
                  <li>Click buttons and watch state change in real-time!</li>
                  <li>See how React tracks every state variable</li>
                </ol>
              </div>
              <p className="text-center text-gray-600">
                This is how professional React developers debug their applications! 🛠️
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Code Examples Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">📋 Copy-Paste Code Examples</CardTitle>
            <p className="text-center text-gray-600">Ready-to-use code for your own experiments</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-bold">Basic Patterns:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Simple counter with useState</li>
                  <li>• Form input handling</li>
                  <li>• Boolean toggles</li>
                  <li>• Multiple buttons, one state</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold">Advanced Patterns:</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Multiple states working together</li>
                  <li>• Conditional rendering</li>
                  <li>• Progress simulation with intervals</li>
                  <li>• Dynamic styling based on state</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}