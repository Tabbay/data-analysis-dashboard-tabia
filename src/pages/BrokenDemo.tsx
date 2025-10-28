import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BrokenDemo() {
  const [showChart, setShowChart] = useState(false);
  const [useEmptyData, setUseEmptyData] = useState(false);
  
  let chartData;
  
  const handleShowChart = () => {
    if (useEmptyData) {
      chartData = [];
    } else {
      chartData = [
        { name: 400, value: 'Jan' },
        { name: 300, value: 'Feb' },
        { name: 600, value: 'Mar' }
      ];
    }
    setShowChart(true);
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Quality Detective Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            This component should display a sales chart, but it has multiple bugs. Can you find them all?
          </p>
          
          <div className="flex gap-2">
            <Button onClick={handleShowChart}>
              {showChart ? 'Show Chart' : 'Hide Chart'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => setUseEmptyData(!useEmptyData)}
            >
              {useEmptyData ? 'Use Sample Data' : 'Use Empty Data'}
            </Button>
          </div>

          {showChart && (
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
