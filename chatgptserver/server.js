import express from 'express';
import cors from 'cors';
import { ChatGPTAPI } from 'chatgpt'
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';


const configuration = new Configuration({
  apiKey: process.env.OPEN_AI,
});
const api = new ChatGPTAPI({
  apiKey: process.env.OPEN_AI
})
const openai = new OpenAIApi(configuration);

// Set up the server
const app = express();
app.use(bodyParser.json());
app.use(cors())

// Set up the ChatGPT endpoint
app.post("/chat", async (req, res) => {
  // Get the prompt from the request
  const { prompt } = req.body;

  // Generate a response with ChatGPT
  // const completion = await openai.createCompletion({
  //   model: "gpt-3.5-turbo",
  //   prompt: prompt,
  // });
  const response = await api.sendMessage(prompt)
  console.log(response.text)
  res.send(response.text);
});

// Start the server
const port = 8080;
app.listen(port, () => {
  
  console.log(`Server listening on port ${port}`);
});