
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DataRow } from '@/types/data';
import { getDataSummary, getColumnValues } from '@/utils/dataAnalysis';

// 📊 Week 6: Professional Data Visualization - Making Your Data Come Alive
// Students - Transform raw data into compelling visual stories! This component showcases advanced React patterns.
// 
// Journey milestone: By now you've built the foundation (Weeks 1-5), now we're adding professional polish!
// 
// Learning objectives:
// - Master React performance optimization with useMemo
// - Create dynamic, responsive charts with Recharts
// - Implement user-controlled data visualization
// - Apply professional UI/UX patterns

interface ChartSectionProps {
  data: DataRow[];
  showAll?: boolean;
}

// Color palette for charts - Week 8 enhancement: Make this theme-aware and customizable
const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

const ChartSection = ({ data, showAll = false }: ChartSectionProps) => {
  // 🚀 React Performance Optimization - Critical for Professional Apps
  // Students - Master the useMemo hook for optimal performance
  // Why do we use useMemo here? What happens without it?
  // Answer: Prevents expensive recalculations on every render, keeping your app fast!
  const summary = useMemo(() => getDataSummary(data), [data]);
  
  // 🎯 Week 6-7: Dynamic User Controls - Professional Dashboard Feature
  // Students - Add user control over which columns to visualize
  // Current: Automatically selects first 2 numeric columns
  // Week 7 enhancement: Let users choose columns, filter data, and save preferences
  const numericColumns = useMemo(() => {
    return Object.entries(summary.columnTypes)
      .filter(([_, type]) => type === 'numeric')
      .map(([column]) => column)
      .slice(0, showAll ? 10 : 2);
  }, [summary, showAll]);

  // 📈 Week 6-8: Smart Data Processing - Handling Real-World Data
  // Students - Learn to handle large datasets professionally
  // Current: Shows first 20 rows (good for demos)
  // Week 8 enhancement: Add pagination, aggregation, and intelligent sampling
  const chartData = useMemo(() => {
    if (numericColumns.length === 0) return [];
    
    // Week 7 improvement: Use meaningful labels instead of "Row 1, Row 2..."
    // Try using actual data values for better chart readability
    return data.slice(0, 20).map((row, index) => {
      const item: any = { name: `Row ${index + 1}` };
      numericColumns.forEach(col => {
        item[col] = typeof row[col] === 'number' ? row[col] : 0;
      });
      return item;
    });
  }, [data, numericColumns]);

  // 💡 Week 3-4: Professional Error Handling
  // Students - Create helpful, actionable error messages
  // Good UX guides users toward success, even when things go wrong
  if (numericColumns.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Charts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No numeric columns found for visualization. Upload data with numeric values to see charts.
          </p>
          {/* Week 4 enhancement: Add helpful tips for data format and examples */}
        </CardContent>
      </Card>
    );
  }

  // 📊 Week 7-8: Advanced Chart Library - Professional Visualization Options
  // Students - Expand your visualization toolkit
  // Current: bar, line, pie charts (solid foundation!)
  // Week 8 additions: scatter plots, area charts, histograms, and interactive features
  const charts = showAll ? [
    { type: 'bar', title: 'Bar Chart' },
    { type: 'line', title: 'Line Chart' },
    { type: 'pie', title: 'Distribution' }
  ] : [{ type: 'bar', title: 'Data Overview' }];

  return (
    <div className={`space-y-6 ${showAll ? 'grid grid-cols-1 lg:grid-cols-2 gap-6' : ''}`}>
      {charts.map(({ type, title }) => (
        <Card key={type}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            {/* Week 8-9: Add professional chart controls (zoom, filter, export) */}
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {/* 🎨 Week 6: Master Chart Selection - Data Visualization Best Practices */}
                {/* Students - Learn when to use bar vs line vs pie charts */}
                {/* Professional tip: Chart choice should match your data story! */}
                {type === 'bar' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {/* Week 7: Add custom tooltip content for better user experience */}
                    {numericColumns.map((column, idx) => (
                      <Bar 
                        key={column} 
                        dataKey={column} 
                        fill={COLORS[idx % COLORS.length]} 
                      />
                    ))}
                  </BarChart>
                ) : type === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {numericColumns.map((column, idx) => (
                      <Line 
                        key={column}
                        type="monotone" 
                        dataKey={column} 
                        stroke={COLORS[idx % COLORS.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                ) : (
                  // 🍰 Week 6-7: Smart Pie Chart Implementation
                  // Students - Learn to handle pie chart data professionally
                  // Current: Uses first numeric column (perfect for learning!)
                  // Week 7: Add multi-column support and intelligent data grouping
                  <PieChart>
                    <Pie
                      data={getColumnValues(data, numericColumns[0]).slice(0, 6).map((value, index) => ({ name: `Item ${index + 1}`, value }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {getColumnValues(data, numericColumns[0]).slice(0, 6).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChartSection;

// 🚀 Week 8-10: Professional Features - Taking Your Charts to Production Level
// Students - Choose your advanced features to implement:
// 
// Week 8-9 Options:
// • Interactive drilling (click charts to explore deeper)
// • Real-time data updates and live dashboards
// • Professional export features (PNG, PDF, sharing)
// • Custom themes that match your brand
// 
// Week 10 Polish:
// • Accessibility excellence (ARIA labels, keyboard navigation)
// • Performance optimization for large datasets
// • Mobile-responsive chart behaviors
