# Week 6 Solution Guide: AI Insights Integration

## Objective
Add an “AI Insight” button to your dashboard that sends your dataset to an AI backend and displays the result.

---

## Step 1: Backend Setup

**Create `server/insight.js`:**
```js
import express from 'express';
import cors from 'cors';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/insight', async (req, res) => {
  try {
    const { prompt } = req.body;
    const { text } = await generateText({
      model: openai('gpt-4o-mini'),
      prompt
    });
    res.json({ insight: text });
  } catch (error) {
    res.status(500).json({ error: 'AI call failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`AI insight server listening on port ${PORT}`);
});
```
- Start the server:  
  ```bash
  node server/insight.js
  ```

---

## Step 2: Frontend Integration

**Update `src/components/InsightsPanel.tsx`:**
```jsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const InsightsPanel = ({ data }) => {
  const [aiInsight, setAiInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateInsight = () => {
    setIsLoading(true);
    setError('');
    fetch('http://localhost:4000/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Generate insights for the following dataset: ${JSON.stringify(data)}` })
    })
      .then(res => res.json())
      .then(result => {
        if (result.insight) {
          setAiInsight(result.insight);
        } else {
          setError(result.error || 'No insight returned');
        }
      })
      .catch(() => {
        setError('Failed to fetch AI insight');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Button onClick={handleGenerateInsight} disabled={isLoading || !data}>
        {isLoading ? 'Generating...' : 'Generate AI Insight'}
      </Button>
      {aiInsight && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <strong>AI Insight:</strong>
          <p>{aiInsight}</p>
        </div>
      )}
      {error && (
        <div className="mt-2 text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default InsightsPanel;
```

---

## Step 3: Connect to Dashboard
- Add `<InsightsPanel data={uploadedData} />` to your dashboard page/component.

---

## Step 4: Test & Troubleshoot
- Upload a dataset, click “Generate AI Insight,” and check the result.
- If you see errors, check your backend server and API key.

---

## Step 5: Reflection
- How did you pass your dataset to the AI?
- What challenges did you face?
- How could you improve the prompt or display?
