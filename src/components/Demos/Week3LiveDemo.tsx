import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const COLORS = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa"];

const Week3LiveDemo = () => {
const [name, setName] = useState('');
const [greeting, setGreeting] = useState('');
const [error, setError] = useState("");

const handleSubmit = () => {
    setError("");
    if(!name.trim()){
        setError("Please enter your name");
        return;
    }
    if(name.trim().length < 2){
        setError('Name must be at least 2 characters');
        return;
    }
    setGreeting(`Hello, ${name.trim()}! Welcome to data analysis!`)
}

return (
    <div>
        {error && (
            <p className="text-center text-red-600 text-sm">
                {error}
            </p>
        )}
        
        {greeting && (
            <p className="text-center text-green-600 font-medium">
                {greeting}
            </p>
        )}
        <Input 
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <Button 
        onClick={() => 
            setGreeting(`Hello, ${name}!`)}
        onSubmit={handleSubmit}
        > Submit 
        </Button>
    </div>
);

}
export default Week3LiveDemo;























//   // Counter state
//   const [count, setCount] = useState(0);
//   // Name input state
//   const [name, setName] = useState("");
//   const [greeting, setGreeting] = useState("");
//   const [nameError, setNameError] = useState("");
//   // Color picker state
//   const [bgColor, setBgColor] = useState("#fff");
//   // Toggle state
//   const [showMsg, setShowMsg] = useState(true);

//   // Reset all
//   const handleReset = () => {
//     setCount(0);
//     setName("");
//     setGreeting("");
//     setNameError("");
//     setBgColor("#fff");
//     setShowMsg(true);
//   };

//   // Name input submit
//   const handleNameSubmit = () => {
//     setNameError("");
//     if (!name.trim()) {
//       setNameError("Please enter your name");
//       return;
//     }
//     if (name.trim().length < 2) {
//       setNameError("Name must be at least 2 characters");
//       return;
//     }
//     setGreeting(`Hello, ${name.trim()}!`);
//   };

//   return (
//     <Card className="max-w-xl mx-auto" style={{ background: bgColor }}>
//       <CardHeader>
//         <CardTitle>Week 3 Interactive Demo</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-8">
//         {/* Counter Button */}
//         <div className="flex flex-col items-center gap-2">
//           <span className="text-lg font-semibold">Counter: {count}</span>
//           <Button onClick={() => setCount(count + 1)}>+1</Button>
//         </div>

//         {/* Name Input */}
//         <div className="flex flex-col items-center gap-2">
//           <Input
//             placeholder="Enter your name"
//             value={name}
//             onChange={e => {
//               setName(e.target.value);
//               setGreeting("");
//               setNameError("");
//             }}
//           />
//           <Button onClick={handleNameSubmit}>Say Hello</Button>
//           {nameError && <p className="text-red-600 text-sm">{nameError}</p>}
//           {greeting && <p className="text-green-600 font-medium">{greeting}</p>}
//         </div>

//         {/* Color Picker */}
//         <div className="flex flex-col items-center gap-2">
//           <span className="font-semibold">Pick a background color:</span>
//           <div className="flex gap-2">
//             {COLORS.map(color => (
//               <button
//                 key={color}
//                 style={{ background: color, width: 32, height: 32, borderRadius: "50%", border: "2px solid #fff" }}
//                 onClick={() => setBgColor(color)}
//                 aria-label={`Pick ${color}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Toggle Switch */}
//         <div className="flex flex-col items-center gap-2">
//           <Button variant="outline" onClick={() => setShowMsg(v => !v)}>
//             {showMsg ? "Hide Message" : "Show Message"}
//           </Button>
//           {showMsg && <p className="text-blue-600">This message can be toggled!</p>}
//         </div>

//         {/* Reset All */}
//         <div className="flex flex-col items-center gap-2">
//           <Button variant="destructive" onClick={handleReset}>Reset All</Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
