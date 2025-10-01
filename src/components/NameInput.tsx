import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const NameInput = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters");
      return;
    }
    setGreeting(`Hello, ${name.trim()}! Welcome to data analysis!`);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Personalize Your Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleSubmit} className="w-full">
          Say Hello
        </Button>
        {error && (
          <p className="text-center text-red-600 text-sm">{error}</p>
        )}
        {greeting && (
          <p className="text-center text-green-600 font-medium">{greeting}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NameInput;
