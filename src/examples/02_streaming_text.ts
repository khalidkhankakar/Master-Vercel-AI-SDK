import { createDeepSeek } from '@ai-sdk/deepseek';
import {  streamText } from "ai";

const deepseek = createDeepSeek({
  baseURL: 'https://models.github.ai/inference',
  apiKey: process.env.DEEPSEEK_API_KEY,
});


export const answerMyQuestion = async (
  prompt: string,
) => {
  const { textStream } = streamText({
    model: deepseek('deepseek/DeepSeek-V3-0324'),
    prompt,
  });
 
  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
};

await answerMyQuestion(
    "What is the color of the sun?",
  );
