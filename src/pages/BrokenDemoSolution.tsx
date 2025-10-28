import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2 } from 'lucide-react';

export default function BrokenDemoSolution() {
  const [showChart, setShowChart] = useState(false);
  const [useEmptyData, setUseEmptyData] = useState(false);
  
  // ✅ BUG #2 FIX: Initialize chartData with proper structure
  // Original bug: let chartData; (undefined)
  const [chartData] = useState([
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 }
  ]);
  
  const handleShowChart = () => {
    setShowChart(true);
  };

  // ✅ BUG #3 FIX: Use proper data structure (name should be string, value should be number)
  // Original bug: { name: 400, value: 'Jan' } - properties were swapped!
  const displayData = useEmptyData ? [] : chartData;

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Quality Detective Challenge - SOLUTION
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              <strong>All 4 bugs have been fixed!</strong> Compare this with the broken version to see what changed.
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm">
            <h3 className="font-semibold">Bugs That Were Fixed:</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li><strong>Bug #1 (Visual):</strong> Button text logic was reversed - now says "Hide Chart" when showing</li>
              <li><strong>Bug #2 (Runtime):</strong> chartData was undefined - now properly initialized</li>
              <li><strong>Bug #3 (Logic):</strong> Chart data had swapped name/value - now correct structure</li>
              <li><strong>Bug #4 (Edge Case):</strong> Empty data crashed chart - now shows helpful message</li>
            </ul>
          </div>
          
          <div className="flex gap-2">
            {/* ✅ BUG #1 FIX: Corrected button text logic */}
            {/* Original bug: {showChart ? 'Show Chart' : 'Hide Chart'} */}
            <Button onClick={handleShowChart}>
              {showChart ? 'Hide Chart' : 'Show Chart'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setUseEmptyData(!useEmptyData)}
            >
              {useEmptyData ? 'Use Sample Data' : 'Use Empty Data'}
            </Button>
          </div>

          {/* ✅ BUG #4 FIX: Handle empty data gracefully */}
          {/* Original bug: No handling for empty array, chart would crash */}
          {showChart && (
            <div className="mt-4">
              {displayData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={displayData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <Alert>
                  <AlertDescription>
                    No data available to display. Click "Use Sample Data" to see the chart.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Takeaways:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Always initialize variables before using them</li>
              <li>Test UI text in all states (showing/hidden)</li>
              <li>Validate data structure matches what components expect</li>
              <li>Handle edge cases like empty data arrays</li>
              <li>Use browser console to catch runtime errors early</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
