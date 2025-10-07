import React from "react";

// map example
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// filter example
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
];
const adults = users.filter(user => user.age >= 18); // [{ name: 'Alice', age: 25 }, { name: 'Charlie', age: 30 }]

// reduce example
const sum = numbers.reduce((total, num) => total + num, 0); // 15

// Calculate statistics example
const scores = [85, 92, 78, 96, 88, 94, 82];
const sumScores = scores.reduce((total, score) => total + score, 0);
const averageScores = scores.length > 0 ? sumScores / scores.length : 0;
const maximumScores = Math.max(...scores);
const minimumScores = Math.min(...scores);
const countScores = scores.length;

// Edge cases and error handling
const empty = [];
const averageEmpty = empty.length > 0 ? empty.reduce((a, b) => a + b, 0) / empty.length : 'No data';
const mixed = [1, 'hello', 3, null, 5];
const validMixed = mixed.filter(item => typeof item === 'number' && !isNaN(item));
const sumMixed = validMixed.length > 0 ? validMixed.reduce((a: number, b: number) => a + b, 0) : 'No valid numbers';

const Week4LiveDemo = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-4">Week 4 Live Demo</h1>
      <div className="mb-6 p-4 bg-white rounded shadow w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">.map() Example</h2>
        <p className="mb-1">Original numbers: {numbers.join(", ")}</p>
        <p>Doubled numbers: {doubled.join(", ")}</p>
      </div>
      <div className="mb-6 p-4 bg-white rounded shadow w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">.filter() Example</h2>
        <p className="mb-1">Users: {users.map(u => `${u.name} (${u.age})`).join(", ")}</p>
        <p>Adults (age ≥ 18): {adults.map(u => `${u.name} (${u.age})`).join(", ")}</p>
      </div>
      <div className="mb-6 p-4 bg-white rounded shadow w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">.reduce() Example</h2>
        <p className="mb-1">Numbers: {numbers.join(", ")}</p>
        <p>Sum: {sum}</p>
      </div>
      <div className="mb-6 p-4 bg-white rounded shadow w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">Calculate Statistics Example</h2>
        <p className="mb-1">Scores: {scores.join(", ")}</p>
        <p>Sum: {sumScores}</p>
        <p>Average: {averageScores}</p>
        <p>Maximum: {maximumScores}</p>
        <p>Minimum: {minimumScores}</p>
        <p>Count: {countScores}</p>
      </div>
      <div className="mb-6 p-4 bg-white rounded shadow w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">Edge Cases & Error Handling</h2>
        <p className="mb-1">Empty array average: {averageEmpty}</p>
  <p className="text-sm text-gray-500">Explanation: This checks if the array is empty. If not, it adds up all the numbers and divides by the length to get the average. If the array is empty, it returns 'No data' to avoid dividing by zero.</p>
        <p>Mixed array: {mixed.join(", ")}</p>
        <p>Valid numbers from mixed: {validMixed.join(", ")}</p>
  <p className="text-sm text-gray-500">Explanation: This filters the mixed array to keep only valid numbers, ignoring strings and nulls. It uses typeof and isNaN to make sure only real numbers are included.</p>
        <p>Sum of valid numbers: {sumMixed}</p>
      </div>
    </div>
  );
};

export default Week4LiveDemo;