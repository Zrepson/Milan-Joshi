// chatgpt-api.js (Node + Express)
import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.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,
});
const openai = new OpenAIApi(configuration);

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4", // or "gpt-3.5-turbo" for cheaper use
      messages: [{ role: "user", content: message }],
    });

    res.json({ reply: completion.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("API running on port 5000"));
