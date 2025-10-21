import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from "recharts";

// Sample data (replace with DataAnalyzer results for real data)
const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const Week6Live = ({ data = sampleData }) => {
  
const [chartType, setChartType] = useState("Bar");

  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No data available for charting.</div>;
  }

  return (
    <div style={{ width: "100%", height: 350 }}>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setChartType("Bar")}>Bar Chart</button>
        <button onClick={() => setChartType("Line")}>Line Chart</button>
        <button onClick={() => setChartType("Pie")}>Pie Chart</button>
        <button onClick={() => setChartType("Scatter")}>Scatter Chart</button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        {(() => {
          switch (chartType) {
            case "Bar":
              return (
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#0088FE" />
                </BarChart>
              );
            case "Line":
              return (
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#00C49F" />
                </LineChart>
              );
            case "Pie":
              return (
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#FFBB28"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              );
            case "Scatter":
              return (
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis dataKey="name" type="category" />
                  <YAxis dataKey="value" />
                  <Tooltip />
                  <Legend />
                  <Scatter name="Values" data={data} fill="#A28EFF" />
                </ScatterChart>
              );
            default:
              return null;
          }
        })()}
      </ResponsiveContainer>
    </div>
    );
}

export default Week6Live