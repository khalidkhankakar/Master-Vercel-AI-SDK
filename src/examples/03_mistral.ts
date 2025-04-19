import { createMistral } from '@ai-sdk/mistral';
import {  streamText } from 'ai';

const mistral = createMistral({
    baseURL:"https://models.inference.ai.azure.com",
    apiKey: process.env.MISTRAL_API_KEY,
});

export const answerMyQuestion = async (
    prompt: string,
  ) => {

    const { textStream } = await streamText({
      model: mistral('Mistral-large-2411'),
      prompt,
    });
   
    for await (const text of textStream) {
        process.stdout.write(text);
      }
    
      return textStream;
  };

await answerMyQuestion(
    "what is the chemical formula for dihydrogen monoxide?",
  );