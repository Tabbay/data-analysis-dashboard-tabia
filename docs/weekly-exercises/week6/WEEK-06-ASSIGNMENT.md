# Week 6 Assignment: Add AI Insights to Your Dashboard

## Objective
Enhance your React data dashboard by integrating an "AI Insight" feature using the AI SDK and OpenAI API. You will build a backend endpoint, connect it to your frontend, and display AI-generated insights for your uploaded dataset.

---

## Requirements

### 1. Project Setup
- Make sure your dashboard project is running and supports CSV upload and charting.
- Sign up for an OpenAI Developer Account and create an API Key: https://platform.openai.com/api-keys
- Install required packages:
  ```bash
  npm install ai @ai-sdk/openai express cors dotenv
  ```
- Create a `.env` file with your API key:
  ```bash
  OPENAI_API_KEY=your_key_here
  ```

### 2. Backend: AI Insight Endpoint
- Create a folder called `server` (or `api-server`) in your project root.
- Add a file `insight.js` (or `insight.ts` for TypeScript) with the following code:
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
- Run the server and verify it responds to POST requests at `http://localhost:4000/insight`.

### 3. Frontend: AI Insight Button
- In `/src/components/InsightsPanel.tsx`, add a button:
  ```jsx
  <Button onClick={handleGenerateInsight}>Generate AI Insight</Button>
  ```
- Implement `handleGenerateInsight` to send a POST request to your backend, including the dataset in the prompt:
  ```js
  const handleGenerateInsight = () => {
    fetch('http://localhost:4000/insight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `Generate insights for the following dataset: ${JSON.stringify(data)}` })
    })
    .then(res => res.json())
    .then(data => {
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
- Add a loading state and display the AI insight in the UI.

### 4. Display the AI Insight
- Show the returned insight in your dashboard, e.g. as a new card at the top of the InsightsPanel.

### 5. Error Handling
- Show a message if the AI call fails or if data is missing/invalid.

### 6. Bonus Challenges
- Use structured output (summary + anomalies) with `generateObject` and `zod` schema.
- Allow users to upload their own data for insights.
- Add custom legend/tooltips to your chart.

---

## Deliverables
- A working "Generate AI Insight" button in your dashboard.
- AI-generated insight displayed in the UI.
- (Bonus) Structured output and/or user data upload.
- Commit and push your changes. Share your repo link for review.

---

## Reflection Questions
1. How did you pass your dataset to the AI for analysis?
2. What challenges did you face integrating the backend and frontend?
3. How could you improve the prompt or the insight display?
4. What other types of insights could you generate with AI?

---

## Next Steps
- Try building multiple insight buttons for different types of analysis.
- Explore streaming responses or tool-calling with the AI SDK.
- Deploy your backend and frontend and share with peers.
