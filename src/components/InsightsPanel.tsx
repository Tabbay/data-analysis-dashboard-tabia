
import { TrendingUp, AlertTriangle, BarChart3, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataInsight } from '@/types/data';

// 📊 Week 4-5: Smart Data Insights - Bringing Your Data to Life
// Students - Transform raw data into meaningful stories! This component showcases professional data presentation patterns.
// 
// Journey milestone: You've learned React basics (Weeks 1-3), now master data analysis and visualization!
// 
// Learning objectives:
// - Build intelligent data analysis systems
// - Create engaging, accessible user interfaces
// - Master conditional rendering and dynamic styling
// - Present complex information clearly and beautifully

interface InsightsPanelProps {
  insights: DataInsight[];
  showAll?: boolean;
}

const InsightsPanel = ({ insights, showAll = false }: InsightsPanelProps) => {
  // 🟢 EASY - Week 3: Icon Mapping Function
  // TODO: Students - Understand switch statements and icon libraries
  // 
  // What's happening here:
  // - We have different types of insights (trend, outlier, correlation)
  // - Each type needs a different icon to help users understand quickly
  // - Instead of writing if/else statements everywhere, we use one function
  //
  // Why do we use a function instead of inline conditionals?
  // - Reusability: We can use this function anywhere we need insight icons
  // - Maintainability: If we want to change an icon, we only change it here
  // - Readability: The code is cleaner and easier to understand
  //
  // Try this: Add a new insight type and its icon!
  const getInsightIcon = (type: DataInsight['type']) => {
    switch (type) {
      case 'trend':
        return <TrendingUp className="h-4 w-4" />;
      case 'outlier':
        return <AlertTriangle className="h-4 w-4" />;
      case 'correlation':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
    // TODO: Week 4 - Add more insight types (seasonal, anomaly, prediction)
  };

  // 🟢 EASY - Week 3: Dynamic Styling Function
  // TODO: Students - Learn about dynamic CSS classes
  // 
  // What's happening here:
  // - Different insight types get different colored badges
  // - Trends are green (positive), outliers are yellow (caution), etc.
  // - We use Tailwind CSS classes to apply colors
  //
  // How does this create different colored badges for different insight types?
  // - The function returns different CSS class strings based on the insight type
  // - These classes are applied to the badge component
  // - Tailwind CSS interprets these classes and applies the appropriate styles
  //
  // Try this: Change the colors or add new insight types with their own colors!
  const getInsightColor = (type: DataInsight['type']) => {
    switch (type) {
      case 'trend':
        return 'bg-green-100 text-green-800';
      case 'outlier':
        return 'bg-yellow-100 text-yellow-800';
      case 'correlation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
    // TODO: Week 4 - Make colors configurable or theme-aware
  };

  // 🟢 EASY - Week 3: Empty State Handling
  // TODO: Students - Always handle empty states gracefully
  // 
  // What's happening here:
  // - Before showing insights, we check if there are any insights to show
  // - If the insights array is empty, we show a helpful message instead
  // - This prevents the user from seeing a blank, confusing screen
  //
  // What makes a good empty state?
  // - Helpful messaging that explains why it's empty
  // - Clear next steps for the user
  // - Consistent styling with the rest of the app
  //
  // Real-world example: Think of when you open a new email app - it doesn't show
  // nothing, it shows "No emails yet" with instructions on how to get started
  if (insights.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No insights available. Upload data to see automated analysis.
          </p>
          {/* TODO: Week 3 - Add loading skeleton when processing data */}
          {/* TODO: Week 4 - Add tips about what kind of data works best */}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Data Insights
          {/* TODO: Week 4 - Add insight count badge */}
          {/* TODO: Week 5 - Add refresh/regenerate insights button */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* 🟡 MEDIUM - Week 4: Dynamic List Rendering */}
          {/* TODO: Students - Understand array mapping and complex layouts */}
          {/* 
          What's happening here:
          - We have an array of insights
          - We want to display each insight as a card
          - We use the .map() function to transform each insight into JSX
          - Each insight gets its own card with icon, title, description, etc.
          
          Why use .map() instead of writing each card manually?
          - Dynamic: Works with any number of insights
          - Maintainable: Change the layout once, applies to all insights
          - Scalable: Can handle 10 insights or 1000 insights
          
          The 'key' prop is important for React's performance optimization
          */}
          {insights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              {/* TODO: Week 4 - Add click handler to expand insight details */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  {/* 🟢 EASY - Week 3: Dynamic Icon and Styling */}
                  {/* Using our helper functions to get the right icon and colors */}
                  <div className={`p-2 rounded-full ${getInsightColor(insight.type)}`}>
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    
                    {/* 🟡 MEDIUM - Week 4: Conditional Rendering */}
                    {/* TODO: Students - When and why do we use conditional rendering? */}
                    {/* 
                    What's happening here:
                    - Not all insights have a 'value' field
                    - We only want to show the badge if there IS a value
                    - The && operator means "if insight.value exists, then show the badge"
                    
                    Why conditional rendering?
                    - Prevents showing empty or undefined values
                    - Makes the UI cleaner and more professional
                    - Avoids layout issues with missing data
                    
                    Try this: What happens if you remove the conditional check?
                    */}
                    {insight.value && (
                      <Badge variant="secondary" className="text-xs">
                        {insight.value}
                      </Badge>
                    )}
                    
                    {/* TODO: Week 5 - Add action buttons (explore, dismiss, share) */}
                  </div>
                </div>
                
                {/* 🟡 MEDIUM - Week 4: Confidence Score Display */}
                {/* TODO: Students - How do confidence scores help users trust insights? */}
                {/* 
                What's happening here:
                - AI-generated insights have confidence scores (0-1)
                - We convert to percentage (0.85 becomes 85%)
                - We round to avoid showing decimals like 84.7%
                
                Why show confidence scores?
                - Helps users understand how reliable the insight is
                - Builds trust in AI-generated content
                - Lets users prioritize which insights to act on
                
                Real-world example: Weather apps show confidence in forecasts
                */}
                {insight.confidence && (
                  <Badge variant="outline" className="text-xs">
                    {insight.confidence} confidence
                  </Badge>
                )}
              </div>
              
              {/* TODO: Week 5 - Add expandable details section */}
              {/* TODO: Week 6 - Add related charts or visualizations */}
            </div>
          ))}
          
          {/* 🟢 EASY - Week 4: Pagination/Truncation Logic */}
          {/* TODO: Students - Understand user experience for long lists */}
          {/* 
          What's happening here:
          - If there are more than 4 insights and we're not showing all
          - We display a message about how many more are available
          - This prevents the interface from becoming overwhelming
          
          Why limit what we show?
          - Too much information can be overwhelming
          - Keeps the interface clean and focused
          - Encourages users to explore more deliberately
          
          Real-world example: Google shows 10 results per page, not 1000
          */}
          {!showAll && insights.length > 4 && (
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                {insights.length - 4} more insights available in the Insights tab
              </p>
              {/* TODO: Week 5 - Add "Show More" button */}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;

// 🔴 ADVANCED - Week 6-8: Component Enhancement Ideas
// TODO: Students - Pick advanced features to implement:
// 
// 1. Interactive Insights
//    - Click to explore insight in detail
//    - Generate related charts on demand
//    - Filter data based on insight
// 
// 2. Insight Management
//    - Save/bookmark important insights
//    - Share insights with others
//    - Export insights to reports
// 
// 3. Advanced Analytics
//    - Trend prediction
//    - Comparative analysis
//    - Statistical significance testing
// 
// 4. User Customization
//    - Choose which insight types to show
//    - Set confidence thresholds
//    - Custom insight templates
