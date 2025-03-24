const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

app.post("/api/deepseek", async (req, res) => {
  const { query } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: query },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error("DeepSeek API Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));