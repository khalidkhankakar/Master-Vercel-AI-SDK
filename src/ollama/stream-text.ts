import {  streamText } from "ai";
import { createOllama } from 'ollama-ai-provider-v2';

const ollama = createOllama({
  baseURL: 'http://127.0.0.1:11434/api',
});

const model = ollama('qwen3:1.7b');



export const answerMyQuestion = async (
  prompt: string,
) => {
  const { textStream } = streamText({
    model,
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
