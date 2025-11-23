import { generateText } from 'ai';
import { createOllama } from 'ollama-ai-provider-v2';

const ollama = createOllama({
  baseURL: 'http://127.0.0.1:11434/api',
});

const model = ollama('qwen3:1.7b');


export const answerMyQuestion = async (
  prompt: string,
) => {
  console.log('loadding model...');
  const { text } = await generateText({
    model,
    providerOptions: {ollama:{think:false}},
    prompt,
  });
 
  return text;
};

const answer = await answerMyQuestion(
  "what is the capital of France?",
);

console.log({answer});
