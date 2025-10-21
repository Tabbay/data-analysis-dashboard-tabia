# Week 6 — Insights & Intelligence: Adding AI to Your Dashboard  
**Objective:** Use the AI SDK to add a simple “AI Insight” feature to your data dashboard built in Vite + React.

---

## Setup (10 min)  
1. Ensure your project is running: you should have the dashboard codebase with the CSV upload and charting working.  
2. Go [here](https://platform.openai.com/api-keys) to signup for an OpenAI Developer Account and create an API Key
3. Install the AI SDK package:  
   ```bash
   npm install ai @ai-sdk/openai express cors dotenv
   ```

4. Create a .env file with your AI provider API key, for example:
    ```bash
    OPENAI_API_KEY=your_key_here
    ```

5. Set up an Express backend endpoint: 
- In your project root create a folder server (or api-server) and inside a file insight.js (or insight.ts if using TS) with content like:
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
        console.error(error);
        res.status(500).json({ error: 'AI call failed' });
      }
    });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`AI insight server listening on port ${PORT}`);
    });
    ```
- Run the server (node server/insight.js) and verify that a POST to http://localhost:4000/insight with a body like { "prompt": "…" } returns { "insight": "…" }.


## Build “AI Insight Button” (20 min)

Implement the following tasks:

## Task A: Add the button
- In `/src/components/InsightsPanel.tsx` within `<CardContent>`, add the following code to render a button:
    ```jsx
    <Button>Generate AI Insight</Button>
    ```
- When clicked, it should disable during processing and show a loading indicator.

## Task B: Trigger the AI call

We'll need to add a button click to send a POST request from your React frontend to the Express endpoint. 
- To do so, add this function after the first `getInsightColor` function in `/src/components/InsightsPanel.tsx`:
  ```js
  const handleGenerateInsight = () => {
    fetch('http://localhost:4000/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Generate AI Insight' })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });
  };
  ```
- Update the generate insight button with the onClick handler
    ```jsx
    <Button onClick={handleGenerateInsight}>Generate AI Insight</Button>
    ```
- Ensure your dashboard prompt includes the relevant dataset information (rows, fields, what you want the model to do).
- Ensure both the frontend and backend are running and click the button. Wait a few seconds and you should see insights in the console.log devtools.
  - Run the backend by opening another terminal tab/window and execute `node server/insight.ts`
> You'll see the ai respond but it doesn't know the data to process so let's give it that data

### Pass uploaded data to the AI 
Make these changes in `/src/components/InsightsPanel.tsx`:
- Update the import on `line 5`:
  ```jsx
  import { DataInsight, DataRow } from '@/types/data';
  ```
- Update the interface on `line 19`:
  ```jsx
  interface InsightsPanelProps {
    data: DataRow[];
    insights: DataInsight[];
    showAll?: boolean;
  }
  ```
- In the `handleGenerateInsight` function, update the prompt you send to the AI:
  ```js
      body: JSON.stringify({ prompt: `Be concise and generate insights for the following dataset: ${JSON.stringify(data)}` })
  ```
Make this change in `/src/components/Dashboard.tsx`, wherever `<InsightsPanel /> is used`:
  ```jsx
  <InsightsPanel data={data} insights={insights.slice(0, 6)} />
  ```

### Add a loading state while AI is processing
Make these changes in `/src/components/InsightsPanel.tsx`:
- Add this import on `line 7`:
  ```jsx
  import { useState } from 'react';
  ```
- Add a loading state inside the component:
  ```jsx
    const [isLoading, setIsLoading] = useState(false);
  ```
- Update the `handleGenerateInsight` to update the loading state:
  ```js
    const handleGenerateInsight = () => {
      setIsLoading(true);
      fetch('http://localhost:4000/insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Generate insights for the following dataset: ${JSON.stringify(data)}` })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  ```
- Update the button to show the loading state: 
  ```jsx
  <Button onClick={handleGenerateInsight} disabled={isLoading}>
    {isLoading ? 'Generating...' : 'Generate AI Insight'}
  </Button>
  ```

## Task C: Display the result
Once you receive { insight: string }, display it in the dashboard UI: for example as a new card at the top. Make these changes in `/src/components/InsightsPanel.tsx`:
- Add a new state to save the AI insight:
  ```jsx
  const [aiInsight, setAiInsight] = useState<string>('');
  ```
- Update `handleGenerateInsight` to save the insight to the local state we created:
  ```js
  const handleGenerateInsight = () => {
    setIsLoading(true);
    fetch('http://localhost:4000/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Generate insights for the following dataset: ${JSON.stringify(data)}` })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setAiInsight(data.insight);
    })
    .catch(err => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };
  ```
- Show the AI Insight when it is available
  ```jsx
  {aiInsight && (
    <div className="my-4 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <h4 className="font-medium text-gray-900 mb-1">AI Insight</h4>
      <p className="text-sm text-gray-600 mb-2 text-balance">{aiInsight}</p>
    </div>
  )}
  ```

## Task D (optional / bonus): Use structured output
- Update your endpoint to call the AI SDK’s [generateObject](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object) instead of generateText, with a schema.
- Add the zod package, we'll use this to let the AI know what we want it to give us
  ```bash
  npm i zod
  ```
Make these changes in `server/insight.ts`:
- Add zod and update the import to include `generateObject` 
  ```js
  import { generateObject } from 'ai';
  import { z } from 'zod';
  ```
- Create a schema that the AI will adhere it's response to
  ```js
  const schema = z.object({
    summary: z.string(),
    anomalies: z.array(z.string())
  });
  ```
- Update the AI call to use `generateObject` with our new schema
  ```js
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema,
    prompt,
  });
  res.json({ summary: object.summary, anomalies: object.anomalies });
  ```

We need to update the frontend in `/src/components/InsightsPanel.tsx` with these changes:
- Update the type for the local state we created:
  ```js
  const [aiInsight, setAiInsight] = useState<{ summary: string; anomalies: string[] }>();
  ```
- Update the `handleGenerateInsight` function:
  ```js
  setAiInsight(data);
  ```
- Update the prompt in the frontend to instruct the AI to find any anamolies:
  ```js
  body: JSON.stringify({ prompt: `Be concise and find any anomalies in the following dataset: ${JSON.stringify(data)}` })
  ```
- Update the AI Insight UI:
  ```jsx
  {aiInsight && (
    <div className="my-4 border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <h4 className="font-medium text-gray-900 mb-1">AI Insight</h4>
      <p className="text-sm text-gray-600 mb-2 text-balance">{aiInsight.summary}</p>
      <ul className="list-disc list-inside text-sm text-gray-600 mb-2 text-balance">
        {aiInsight.anomalies.map((anomaly, index) => (
          <li key={index}>{anomaly}</li>
        ))}
      </ul>
    </div>
  )}
  ```
- Then your React code should expect { summary, anomalies } and display both (e.g., summary paragraph + bullet list of anomalies).
> Be sure to restart the backend since we updated that file (`node server/insight.ts`)

## Tips & Considerations
- Keep your prompt precise – ask for “key findings and one anomaly” rather than open-ended.
- Handle errors in UI: if fetch fails, show message (“Unable to get insight, try again”).
- Watch for CORS issues (frontend ↔ backend).
- Think about what insight actually matters: you have raw data; the AI insight should add value.
- Later you can implement streaming responses, tool-calling, or on-device/offline models.

---

## Deliverables
- A working “Generate AI Insight” button in your dashboard.
- A visible result in the UI when clicked (insight displayed).
- (Bonus) Use structured output (summary + anomalies).
- Optional: commit your changes and link your repo for review.


---

## Next Steps
- After this session you may choose to extend further:
- Build multiple “insight” buttons (e.g., “User Demographics Insight”, “Behavioral Insight”).
- Use streaming APIs (streamText) in the backend to show insight as it arrives.
- Add tool-calling: e.g., call an external API to enrich data then feed into AI SDK.
- Deploy your backend and frontend (e.g., to Vercel) and share with peers.